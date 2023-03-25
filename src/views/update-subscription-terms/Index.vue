<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
      <ComponentLoader v-if="isLoading" />
      <div v-else class="create-subscription">
        <UpdateSubscriptionPlanForm
          v-if="formStage === 0"
          :service-tag="serviceTag"
        />
        <UpdatePaymentMethodForm v-if="formStage === 1" />

        <UpdateAppleMusicPriceForm v-if="formStage === 2" />

        <UpdateTermsSuccessForm
          v-if="formStage === 5"
          :service-tag="serviceTag"
        />

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

import UpdateSubscriptionPlanForm from "@/components/forms/updateSubscriptionTerms/appleMusic/UpdateSubscriptionPlanForm";
import UpdatePaymentMethodForm from "../../components/forms/updateSubscriptionTerms/appleMusic/UpdatePaymentMethodForm.vue";
import UpdateAppleMusicPriceForm from "../../components/forms/updateSubscriptionTerms/appleMusic/UpdateAppleMusicPriceForm.vue";
import UpdateTermsSuccessForm from "@/components/forms/updateSubscriptionTerms/appleMusic/UpdateTermsSuccessForm";

export default {
  name: "UpdateSubscriptionTerms",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    PreAuthCard,
    UpdatePaymentMethodForm,
    UpdateAppleMusicPriceForm,
    UpdateTermsSuccessForm,
    UpdateSubscriptionPlanForm,
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
