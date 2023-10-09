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


        <div v-if="currentSubscriptionServiceData.join_type === 'host_invite'">

            <CreateSubscriptionIntroForm v-if="formStage === 0" :current-subscription-service-data="currentSubscriptionServiceData" />
            <HowItWorksForm v-if="formStage === 1" :current-subscription-service-data="currentSubscriptionServiceData"/>
            <SubscriptionAccessTypeForm v-if="formStage === 2" :current-subscription-service-data="currentSubscriptionServiceData"/>
            <ActiveMembersForm v-if="formStage === 3" :current-subscription-service-data="currentSubscriptionServiceData" />
            <BillingDayForm v-if="formStage === 4" :current-subscription-service-data="currentSubscriptionServiceData" />
            <SetSlotPriceForm v-if="formStage === 5" :current-subscription-service-data="currentSubscriptionServiceData" />
            <SubscriptionPlanForm v-if="formStage === 6" :current-subscription-service-data="currentSubscriptionServiceData" />


<!--            Type Specific-->
            <SelectSubscriptionRegionForm  v-if="formStage === 7" :current-subscription-service-data="currentSubscriptionServiceData" />
            <ConfirmationForm v-if="formStage === 8" :current-subscription-service-data="currentSubscriptionServiceData" /><!--            Type Specific-->
<!--            Type Specific END-->

            <ReviewSubscriptionForm v-if="formStage === 9" :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />



<!--            <div v-if="serviceTag === 'apple_music'">-->
<!--                <CreateIntroForm v-if="formStage === 0" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <PaymentMethodForm v-if="formStage === 1" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <AppleStoreRegionForm v-if="formStage === 2" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <SetAppleMusicPriceForm v-if="formStage === 3" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <ActiveMembersForm v-if="formStage === 4" :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />-->
<!--                <SubscriptionPlanForm v-if="formStage === 5" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <BillingDayForm v-if="formStage === 6" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <ConfirmationForm v-if="formStage === 7" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <ReviewForm v-if="formStage === 8" :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />-->
<!--            </div>-->

<!--            <div v-else>-->
<!--                <DefaultCreateIntroForm v-if="formStage === 0" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <DefaultPaymentMethodForm v-if="formStage === 1" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <DefaultEnterPriceForm v-if="formStage === 2" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <DefaultActiveMembersForm v-if="formStage === 3" :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />-->
<!--                <DefaultSubscriptionPlanForm v-if="formStage === 4" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <DefaultBillingDayForm v-if="formStage === 5" :current-subscription-service-data="currentSubscriptionServiceData" />-->
<!--                <DefaultReviewForm v-if="formStage === 6" :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />-->
<!--            </div>-->
        </div>



        <div v-if="currentSubscriptionServiceData.join_type === 'instant_access'">
            <div v-if="serviceTag === 'spotify'">
                <SpotifyCreateIntroForm v-if="formStage === 0" :current-subscription-service-data="currentSubscriptionServiceData" />
                <SpotifyActiveMembersForm
                        v-if="formStage === 1"
                        :current-subscription-service-data="currentSubscriptionServiceData"
                />
                <SpotifyAddLinkForm v-if="formStage === 2" :current-subscription-service-data="currentSubscriptionServiceData" />
                <SpotifyHomeAddressForm v-if="formStage === 3" :current-subscription-service-data="currentSubscriptionServiceData" />
                <SpotifySubscriptionPlanForm v-if="formStage === 4" :current-subscription-service-data="currentSubscriptionServiceData" />
                <SpotifyBillingDayForm v-if="formStage === 5" :current-subscription-service-data="currentSubscriptionServiceData" />

                <SpotifyReviewForm v-if="formStage === 6" :current-subscription-service-data="currentSubscriptionServiceData" />
            </div>

            <div v-else>
                <DefaultCreateIntroForm v-if="formStage === 0" :current-subscription-service-data="currentSubscriptionServiceData" />
                <DefaultPaymentMethodForm v-if="formStage === 1" :current-subscription-service-data="currentSubscriptionServiceData" />
                <DefaultEnterPriceForm v-if="formStage === 2" :current-subscription-service-data="currentSubscriptionServiceData" />
                <DefaultActiveMembersForm v-if="formStage === 3" :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />
                <DefaultSubscriptionJoinLinkForm v-if="formStage === 4" :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />
                <DefaultSubscriptionPlanForm v-if="formStage === 5" :current-subscription-service-data="currentSubscriptionServiceData" />
                <DefaultBillingDayForm v-if="formStage === 6" :current-subscription-service-data="currentSubscriptionServiceData" />
                <DefaultReviewForm v-if="formStage === 7" :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />
            </div>
        </div>


        <div v-if="currentSubscriptionServiceData.join_type === 'member_get_access'">

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
import ActiveMembersForm from "@/components/forms/createSubscription/appleMusic/ActiveMembersForm";
import SubscriptionPlanForm from "@/components/forms/createSubscription/appleMusic/SubscriptionPlanForm";
import BillingDayForm from "@/components/forms/createSubscription/appleMusic/BillingDayForm";
// import ReviewForm from "@/components/forms/createSubscription/appleMusic/ReviewForm";
import ConfirmationForm from "@/components/forms/createSubscription/appleMusic/ConfirmationForm";
import PreAuthCard from "@/components/cards/PreAuthCard";

import SpotifyCreateIntroForm from "../../components/forms/createSubscription/spotify/SpotifyCreateIntroForm.vue";
import SpotifyActiveMembersForm from "../../components/forms/createSubscription/spotify/SpotifyActiveMembersForm.vue";
import SpotifyAddLinkForm from "../../components/forms/createSubscription/spotify/SpotifyAddLinkForm.vue";
import SpotifyHomeAddressForm from "../../components/forms/createSubscription/spotify/SpotifyHomeAddressForm.vue";
import SpotifySubscriptionPlanForm from "../../components/forms/createSubscription/spotify/SpotifySubscriptionPlanForm.vue";
import SpotifyBillingDayForm from "../../components/forms/createSubscription/spotify/SpotifyBillingDayForm.vue";
import SpotifyReviewForm from "../../components/forms/createSubscription/spotify/SpotifyReviewForm.vue";
import JsonParserUtils from "@/utils/JsonParserUtils";

import DefaultCreateIntroForm from "@/components/forms/createSubscription/default/DefaultCreateIntroForm.vue";
import DefaultPaymentMethodForm from "@/components/forms/createSubscription/default/DefaultPaymentMethodForm.vue";
import DefaultActiveMembersForm from "@/components/forms/createSubscription/default/DefaultActiveMembersForm.vue";
import DefaultSubscriptionPlanForm from "@/components/forms/createSubscription/default/DefaultSubscriptionPlanForm.vue";
import DefaultBillingDayForm from "@/components/forms/createSubscription/default/DefaultBillingDayForm.vue";
import DefaultReviewForm from "@/components/forms/createSubscription/default/DefaultReviewForm.vue";
import DefaultEnterPriceForm from "@/components/forms/createSubscription/default/DefaultEnterPriceForm.vue";
// import SpotifyReviewBreakdownList from "@/components/lists/spotify/SpotifyReviewBreakdownList.vue";
import DefaultSubscriptionJoinLinkForm
    from "@/components/forms/createSubscription/default/DefaultSubscriptionJoinLinkForm.vue";
import HowItWorksForm from "@/components/forms/createSubscription/HowItWorksForm.vue";
import SubscriptionAccessTypeForm from "@/components/forms/createSubscription/SubscriptionAccessTypeForm.vue";
import SetSlotPriceForm from "@/components/forms/createSubscription/SetSlotPriceForm.vue";
import SelectSubscriptionRegionForm from "@/components/forms/createSubscription/SelectSubscriptionRegionForm.vue";
import CreateSubscriptionIntroForm from "@/components/forms/createSubscription/CreateSubscriptionIntroForm.vue";
import ReviewSubscriptionForm from "@/components/forms/createSubscription/ReviewSubscriptionForm.vue";

export default {
  name: "CreateSubscription",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
      ReviewSubscriptionForm,
      CreateSubscriptionIntroForm,
      SelectSubscriptionRegionForm,
      SetSlotPriceForm,
      SubscriptionAccessTypeForm,
      HowItWorksForm,
      DefaultSubscriptionJoinLinkForm,
      DefaultEnterPriceForm,
      DefaultReviewForm,
      DefaultBillingDayForm,
      DefaultSubscriptionPlanForm,
      DefaultActiveMembersForm,
      DefaultPaymentMethodForm,
      DefaultCreateIntroForm,
    PreAuthCard,
    ConfirmationForm,
    // ReviewForm,
    BillingDayForm,
    SubscriptionPlanForm,
    ActiveMembersForm,
    BaseLayout,
    ComponentLoader,
    // AppleStoreRegionForm,
    // PaymentMethodForm,
    // CreateIntroForm,
    // SetAppleMusicPriceForm,
    SpotifyCreateIntroForm,
    SpotifyActiveMembersForm,
    SpotifyAddLinkForm,
    SpotifyHomeAddressForm,
    SpotifySubscriptionPlanForm,
    SpotifyBillingDayForm,
    SpotifyReviewForm
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
    },
    currentFormBody() {
      return StoreUtils.rootGetters("form/getFormBody");
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
