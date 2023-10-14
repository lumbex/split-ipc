<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
      <ComponentLoader v-if="componentLoaderTable" />
<!--      <div v-else class="create-subscription">-->
      <div v-else class="">

<!--          <p> join_type ==> {{ currentSubscriptionServiceData.join_type }}</p>-->
<!--          <p> cost_currency ==> {{ currentSubscriptionServiceData.cost_currency }}</p>-->
<!--          <p> currentFormBody ==> {{ currentFormBody }}</p>-->
<!--          <p> formStage ==> {{ formStage }}</p>-->

        <div>

            <CreateSubscriptionIntroForm v-if="formStage === 0" :current-subscription-service-data="currentSubscriptionServiceData" />
            <HowItWorksForm v-if="formStage === 1" :current-subscription-service-data="currentSubscriptionServiceData"/>
            <SubscriptionAccessTypeForm v-if="formStage === 2" :current-subscription-service-data="currentSubscriptionServiceData"/>
            <SubscriptionMembersCountForm v-if="formStage === 3" :current-subscription-service-data="currentSubscriptionServiceData" />
            <SubscriptionBillingDayForm v-if="formStage === 4" :current-subscription-service-data="currentSubscriptionServiceData" />
            <SetSlotPriceForm v-if="formStage === 5" :current-subscription-service-data="currentSubscriptionServiceData" />
            <MembersPaymentPlanForm v-if="formStage === 6" :current-subscription-service-data="currentSubscriptionServiceData" />


<!--            Type Specific-->
            <TypeSpecificInputFormOne v-if="formStage === 7" :current-subscription-service-data="currentSubscriptionServiceData" />
            <TypeSpecificInputFormTwo v-if="formStage === 8" :current-subscription-service-data="currentSubscriptionServiceData" />
<!--            Type Specific END-->

            <ReviewSubscriptionForm v-if="formStage === 9" :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />

        </div>
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

import JsonParserUtils from "@/utils/JsonParserUtils";

import HowItWorksForm from "@/components/forms/createSubscription/HowItWorksForm.vue";
import SubscriptionAccessTypeForm from "@/components/forms/createSubscription/SubscriptionAccessTypeForm.vue";
import SetSlotPriceForm from "@/components/forms/createSubscription/SetSlotPriceForm.vue";

import CreateSubscriptionIntroForm from "@/components/forms/createSubscription/CreateSubscriptionIntroForm.vue";
import ReviewSubscriptionForm from "@/components/forms/createSubscription/ReviewSubscriptionForm.vue";
import TypeSpecificInputFormOne from "@/components/forms/createSubscription/utility/TypeSpecificInputFormOne.vue";
import TypeSpecificInputFormTwo from "@/components/forms/createSubscription/utility/TypeSpecificInputFormTwo.vue";
import MembersPaymentPlanForm from "@/components/forms/createSubscription/MembersPaymentPlanForm.vue";
import SubscriptionBillingDayForm from "@/components/forms/createSubscription/SubscriptionBillingDayForm.vue";
import SubscriptionMembersCountForm from "@/components/forms/createSubscription/SubscriptionMembersCountForm.vue";

export default {
  name: "CreateSubscription",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
      SubscriptionMembersCountForm,
      SubscriptionBillingDayForm,
      MembersPaymentPlanForm,
      TypeSpecificInputFormTwo,
      TypeSpecificInputFormOne,
      ReviewSubscriptionForm,
      CreateSubscriptionIntroForm,
      SetSlotPriceForm,
      SubscriptionAccessTypeForm,
      HowItWorksForm,
      PreAuthCard,
      BaseLayout,
      ComponentLoader,
  },
  computed: {
    userAuthenticated() {
      return StoreUtils.rootGetters("user/getUserAuthenticated");
    },
    componentLoaderTable() {
        return StoreUtils.rootGetters("loader/getLoader", "table");
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
    availableServices() {
      return StoreUtils.rootGetters("service/getAvailableServices");
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
