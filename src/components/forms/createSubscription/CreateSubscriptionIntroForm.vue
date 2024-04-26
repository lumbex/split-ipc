<template>
  <div class="app-form-wrapper">
    <div class="app-form">
        <img
                class="intro-page-img w-24 mt-0 mb-6 mx-auto"
                :src="currentSubscriptionServiceData.icon_url"
                alt="Add your subscription to the Splitverse"
        />
      <p class="page-title-sm text-center">Elevate your subscription game</p>
      <p class="text-base text-center text-grey-500 mb-8">
          Earn cash monthly by sharing your
          <span class="text-white">{{ currentSubscriptionServiceData.name | firstCaseCapital }}</span> 
          subscription with friends in the Splitverse.
      </p>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <button @click="submit" class="app-btn light-btn">
          Sweet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";

export default {
  name: "CreateSubscriptionIntroForm",
  components: {},
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
    submit() {
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped>
.intro-page-img {
    height: 80px;
    width: 80px;
    margin-bottom: 10px;
    margin-top: 12vh;
}
</style>
