<template>
  <div class="app-form-wrapper">
    <div class="app-form">
        <img
                class="w-24 mt-0 mb-6 mx-auto"
                :src="currentSubscriptionServiceData.icon_url"
                alt="Add your subscription to the Splitverse"
        />
      <p class="page-title-sm text-center">Be the Boss of your Subscription</p>
      <p class="text-base text-center text-grey-500 mb-8">
        You’re about to list your
        <span class="text-white">{{ currentSubscriptionServiceData.name }}</span> subscription in the
        Splitverse.
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

<style scoped></style>
