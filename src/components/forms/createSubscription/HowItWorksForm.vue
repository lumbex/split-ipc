<template>
  <div class="app-form-wrapper">
    <div class="app-form">
      <p class="page-title-sm ">How It Works</p>
      <p class="text-base text-grey-500 mb-8">
        Read the following to understand how sharing your subscription works in
        the Splitverse.
      </p>
      <div class="block-options">
        <div class="option intro flex flex-row gap-2 p-2 h-10">
          <img
            class="h-auto w-8 "
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253235/splitcash/images/List_tt1hyj.png"
            alt="create sub"
          />
          <div class="text-base text-white">
            Tell us about your subscription and how much you want a member to
            pay.
          </div>
        </div>
        <div class="option intro flex flex-row gap-2 p-2 h-10">
          <img
            class="h-auto w-8 "
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253230/splitcash/images/verify_gz9ava.png"
            alt="verify your sub"
          />
          <div class="text-base text-white">
            Next, we verify that your subscription is valid before it enters the
            Splitverse
          </div>
        </div>
        <div class="option intro flex flex-row gap-2 p-2 h-10">
          <img
            class="h-auto w-8 "
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253226/splitcash/images/Control_mhnzfl.png"
            alt="Control access"
          />
          <div class="text-base text-white">
            As the owner, you’re responsible for managing the subscription
          </div>
        </div>
        <div class="option intro flex flex-row gap-2 p-2 h-10">
          <img
            class="h-auto w-8 "
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253332/splitcash/images/banknote_pfdqtr.png"
            alt="monthly settlement"
          />
          <div class="text-base text-white">
            You get members payments every month as
            <span class="font-bold">Settlements</span>
          </div>
        </div>
        <div class="option intro flex flex-row gap-2 p-2 h-10">
          <img
            class="h-auto w-8 "
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253214/splitcash/images/Percentage_ydjgve.png"
            alt="host charge"
          />
          <div class="text-base text-white">
            A 10% fee applies to all members payments
          </div>
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <div @click="checked = !checked" class="custom-checkbox">
          <div class="question">
            I've read and I understand how subscription sharing works.
          </div>
          <div class="indicator">
            <span v-if="checked"><CheckedIcon /></span>
            <span v-else><UncheckedIcon /></span>
          </div>
        </div>

        <button :disabled="!checked" @click="submit" class="app-btn light-btn">
          Sweet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import CheckedIcon from "@/components/icons/CheckedIcon.vue";
import UncheckedIcon from "@/components/icons/UncheckedIcon.vue";

export default {
  name: "HowItWorksForm",
  components: { UncheckedIcon, CheckedIcon },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return { selectedOption: "", checked: false };
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
    submit() {
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
