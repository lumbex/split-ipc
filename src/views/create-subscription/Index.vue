<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
      <ComponentLoader v-if="isLoading" />
      <div v-else class="create-subscription">
        <div
          v-if="serviceTag === 'apple_music' && availableServices.length > 0"
        >
          <CreateIntroForm v-if="formStage === 0" />
          <PaymentMethodForm v-if="formStage === 1" />
          <AppleStoreRegionForm v-if="formStage === 2" />
          <SetAppleMusicPriceForm v-if="formStage === 3" />
          <ActiveMembersForm v-if="formStage === 4" :service-tag="serviceTag" />
          <SubscriptionPlanForm v-if="formStage === 5" />
          <BillingDayForm v-if="formStage === 6" />
          <ConfirmationForm v-if="formStage === 7" />
          <ReviewForm v-if="formStage === 8" :service-tag="serviceTag" />
        </div>

        <div v-if="serviceTag === 'spotify' && availableServices.length > 0">
          <SpotifyCreateIntroForm v-if="formStage === 0" />
          <SpotifyActiveMembersForm
            v-if="formStage === 1"
            :service-tag="serviceTag"
          />
          <SpotifyAddLinkForm v-if="formStage === 2" />
          <SpotifyHomeAddressForm v-if="formStage === 3" />
          <SpotifySubscriptionPlanForm v-if="formStage === 4" />
          <SpotifyBillingDayForm v-if="formStage === 5" />

          <SpotifyReviewForm v-if="formStage === 6" :service-tag="serviceTag" />
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
import ReviewForm from "@/components/forms/createSubscription/appleMusic/ReviewForm";
import ConfirmationForm from "@/components/forms/createSubscription/appleMusic/ConfirmationForm";
import PreAuthCard from "@/components/cards/PreAuthCard";
import AppleStoreRegionForm from "@/components/forms/createSubscription/appleMusic/AppleStoreRegionForm.vue";
import PaymentMethodForm from "../../components/forms/createSubscription/appleMusic/PaymentMethodForm.vue";
import CreateIntroForm from "../../components/forms/createSubscription/appleMusic/CreateIntroForm.vue";
import SetAppleMusicPriceForm from "../../components/forms/createSubscription/appleMusic/SetAppleMusicPriceForm.vue";

import SpotifyCreateIntroForm from "../../components/forms/createSubscription/spotify/SpotifyCreateIntroForm.vue";
import SpotifyActiveMembersForm from "../../components/forms/createSubscription/spotify/SpotifyActiveMembersForm.vue";
import SpotifyAddLinkForm from "../../components/forms/createSubscription/spotify/SpotifyAddLinkForm.vue";
import SpotifyHomeAddressForm from "../../components/forms/createSubscription/spotify/SpotifyHomeAddressForm.vue";
import SpotifySubscriptionPlanForm from "../../components/forms/createSubscription/spotify/SpotifySubscriptionPlanForm.vue";
import SpotifyBillingDayForm from "../../components/forms/createSubscription/spotify/SpotifyBillingDayForm.vue";
import SpotifyReviewForm from "../../components/forms/createSubscription/spotify/SpotifyReviewForm.vue";

export default {
  name: "CreateSubscription",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    PreAuthCard,
    ConfirmationForm,
    ReviewForm,
    BillingDayForm,
    SubscriptionPlanForm,
    ActiveMembersForm,
    BaseLayout,
    ComponentLoader,
    AppleStoreRegionForm,
    PaymentMethodForm,
    CreateIntroForm,
    SetAppleMusicPriceForm,
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
