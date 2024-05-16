<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next">
        <!--                <p>Up Next: <span>Accessibility</span></p>-->
      </div>
    </div>
    <div class="app-form">
      <p class="page-title">How will members join your subscription?</p>
      <p class="page-sub">
        Select how you want members to join your subscription.
        <br />
        <br />
        Select one option.
      </p>
      <div class="block-options">
        <div
          @click="selectOne('public')"
          class="option big flex flex-row gap-2 py-0 px-2  h-10"
          :class="{ active: selectedOption === 'public' }"
        >
          <img
            class="h-auto w-12"
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696254452/splitcash/images/open-access_e5djtz.png"
            alt="public"
          />
          <div class="flex flex-col text-white">
            <div class="text-l leading-6 mb-1">Open Sesame!</div>
            <div class="text-sm leading-4">
              Your subscription is open for anyone in the Splitverse to join.
            </div>
          </div>

          <span class="recommended text-[#F05151]">Recommended</span>
        </div>

        <div
          @click="selectOne('private')"
          class="option big flex flex-row gap-2 py-0 px-2  h-10"
          :class="{ active: selectedOption === 'private' }"
        >
          <img
            class="h-auto w-12"
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696254452/splitcash/images/close-access_htwz5r.png"
            alt="private"
          />
          <div class="flex flex-col text-white">
            <div class="text-l leading-6 mb-1">Private Party</div>
            <div class="text-sm leading-4">
              Only people you share your subscription invite link with can join
              your subscription
            </div>
          </div>
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <div class="form-info-box">
          <img
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1697057849/info.square.fill.grey_mg7mdm.png"
            alt="more info"
          />
          <p>You can always change this later in the subscription settings</p>
        </div>

        <button
          @click="submit"
          class="app-btn light-btn"
          :disabled="selectedOption === ''"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon.vue";
import StoreUtils from "@/utils/baseUtils/StoreUtils";

export default {
  name: "SubscriptionAccessTypeForm",
  components: { BackIcon },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return { selectedOption: "" };
  },
  computed: {
    availableAppleMusicPaymentMethods() {
      return StoreUtils.rootGetters(
        "subscription/getAvailableAppleMusicPaymentMethods"
      );
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    selectOne(option) {
      this.selectedOption = option;
    },
    submit() {
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        privacy: this.selectedOption
      });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
