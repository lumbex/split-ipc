<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
      <ComponentLoader v-if="isLoading" />
      <div v-else class="create-subscription">
          <SubscriptionInfoConfirmationForm v-if="formStage === 0" :service-tag="serviceTag" />

          <ValidationIntroForm v-if="formStage === 1" :service-tag="serviceTag"/>

          <ValidationScreenshotStepsForm v-if="formStage === 2" :service-tag="serviceTag"/>

        <!-- <div v-if="serviceTag === 'spotify'"></div> -->
      </div>
    </div>
  </BaseLayout>
</template>
<style scoped></style>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader";
import BaseLayout from "@/layout/BaseLayout";
import PreAuthCard from "@/components/cards/PreAuthCard";

import SubscriptionInfoConfirmationForm
    from "@/components/forms/validateSubscription/SubscriptionInfoConfirmationForm.vue";
import ValidationIntroForm from "@/components/forms/validateSubscription/ValidationIntroForm.vue";
import ValidationScreenshotStepsForm from "@/components/forms/validateSubscription/ValidationScreenshotStepsForm.vue";

export default {
  name: "ValidateSubscription",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
      ValidationScreenshotStepsForm,
      ValidationIntroForm,
      SubscriptionInfoConfirmationForm,
    PreAuthCard,
    BaseLayout,
    ComponentLoader
  },
  computed: {
    userAuthenticated() {
      return StoreUtils.rootGetters("user/getUserAuthenticated");
    },
    formStage() {
      return StoreUtils.rootGetters("form/getFormStage");
    },
    currentServiceTag() {
      return StoreUtils.rootGetters("service/getCurrentServiceTag");
    },
    availableServices() {
      return StoreUtils.rootGetters("service/getAvailableServices");
    }
  },
  created() {
    StoreUtils.commit("service/SET_CURRENT_SERVICE_TAG", this.serviceTag);
  }
};
</script>
