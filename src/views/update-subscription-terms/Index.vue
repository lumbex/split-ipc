<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
<!--      <ComponentLoader v-if="isLoading" />-->
      <div class="create-subscription">
<!--          <p>formStage => {{ formStage }}</p>-->
<!--          <p>currentSubscriptionTerms => {{ currentSubscriptionTerms }}</p>-->
          <UpdateSubscriptionIntroForm v-if="formStage === 0" :current-subscription-service-data="currentSubscriptionServiceData" />
          <UpdateMembersPaymentPlanForm v-if="formStage === 1" :current-subscription-service-data="currentSubscriptionServiceData" />
          <UpdateSlotPriceForm v-if="formStage === 2" :current-subscription-service-data="currentSubscriptionServiceData" />
          <ReviewSubscriptionUpdateForm v-if="formStage === 3" :current-subscription-service-data="currentSubscriptionServiceData" />
          <UpdateTermsSuccessForm v-if="formStage === 4"  />


        <!-- <div v-if="serviceTag === 'spotify'"></div> -->
      </div>
    </div>
  </BaseLayout>
</template>
<style scoped></style>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BaseLayout from "@/layout/BaseLayout";
import PreAuthCard from "@/components/cards/PreAuthCard";

import UpdateTermsSuccessForm from "@/components/forms/updateSubscriptionTerms/UpdateTermsSuccessForm.vue";
import UpdateMembersPaymentPlanForm from "@/components/forms/updateSubscriptionTerms/UpdateMembersPaymentPlanForm.vue";
import UpdateSubscriptionIntroForm from "@/components/forms/updateSubscriptionTerms/UpdateSubscriptionIntroForm.vue";
import UpdateSlotPriceForm from "@/components/forms/updateSubscriptionTerms/UpdateSlotPriceForm.vue";
import JsonParserUtils from "@/utils/JsonParserUtils";
import ReviewSubscriptionUpdateForm from "@/components/forms/updateSubscriptionTerms/ReviewSubscriptionUpdateForm.vue";

export default {
  name: "UpdateSubscriptionTerms",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
      ReviewSubscriptionUpdateForm,
      UpdateTermsSuccessForm,
      UpdateSlotPriceForm,
      UpdateSubscriptionIntroForm,
      UpdateMembersPaymentPlanForm,
    PreAuthCard,
    BaseLayout,
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
      currentSubscriptionServiceData() {
          return StoreUtils.rootGetters(
              "service/getCurrentSubscriptionServiceData");
      },
      currentSubscriptionServiceDataNotFetched() {
          return JsonParserUtils.isObjectEmpty(this.currentSubscriptionServiceData)
      },
      currentSubscriptionTerms() {
      return StoreUtils.rootGetters("subscription/getCurrentSubscriptionTerms");
    }
  },
  created() {
    StoreUtils.commit("service/SET_CURRENT_SERVICE_TAG", this.serviceTag);
  },
    updated() {
        if (this.userAuthenticated && this.currentSubscriptionServiceDataNotFetched){
            StoreUtils.dispatch("service/fetchSubscriptionServiceDataByTag", this.serviceTag);
        }
    }
};
</script>
