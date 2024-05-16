<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next">
        <!--        <p>Up Next: <span>Cost</span></p>-->
      </div>
    </div>
    <div class="app-form">
      <p class="page-title">What’s the Region of Your Subscription?</p>
      <p class="page-sub">
        Select the region of your
        <span class="text-white">{{
          currentSubscriptionServiceData.name | firstCaseCapital
        }}</span>
        subscription.
        <br /><br />
        Select a region.
      </p>

      <div class="block-options">
        <div
          v-for="(region, index) in availableAppleMusicRegion"
          :key="index"
          @click="selectOne(region)"
          class="option flex flex-row gap-2 p-2"
          :class="{ active: region.value === selectedOption }"
        >
          <img class="h-auto w-6" :src="region.iconUrl" :alt="region.title" />
          <div class="">{{ region.title }}</div>

          <span v-if="region.recommended" class="recommended">Recommended</span>
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <div class="form-info-box">
          <img
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1697057849/info.square.fill.grey_mg7mdm.png"
            alt="more info"
          />
          <p>
            All members must be in the same region to share this Subscription.
          </p>
        </div>

        <button
          @click="submit"
          class="app-btn light-btn"
          :disabled="selectedOption === ''"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";
import NotificationUtils from "@/utils/baseUtils/NotificationUtils";

export default {
  name: "SelectSubscriptionRegionForm",
  components: { BackIcon },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return { selectedOption: "", regionError: "" };
  },
  computed: {
    availableAppleMusicRegion() {
      return StoreUtils.rootGetters(
        "subscription/getAvailableAppleMusicRegion"
      );
    },
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    }
  },
  mounted() {
    if (this.formBody.paymentMethod === "ng-card") {
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        planPrice: "1500",
        region: "NG"
      });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    selectOne(region) {
      this.selectedOption = region.value;
    },
    submit() {
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        region: this.selectedOption
      });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
