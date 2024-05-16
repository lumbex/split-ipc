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
          <ChangeHostContactForm
            v-if="formStage === 0"
            :current-subscription-service-data="currentSubscriptionServiceData"
          />
          <ChangeContactSuccessForm
            v-if="formStage === 1"
            :current-subscription-service-data="currentSubscriptionServiceData"
          />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
<style scoped></style>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import JsonParserUtils from "@/utils/JsonParserUtils";

import PreAuthCard from "@/components/cards/PreAuthCard";

import BaseLayout from "@/layout/BaseLayout";
import ComponentLoader from "@/components/loaders/ComponentLoader";

import ChangeHostContactForm from "@/components/forms/editSubscription/contact/ChangeHostContactForm.vue";
import ChangeContactSuccessForm from "@/components/forms/editSubscription/contact/ChangeContactSuccessForm.vue";

export default {
  name: "ChangeContactNumber",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    ChangeHostContactForm,
    ChangeContactSuccessForm,

    PreAuthCard,
    BaseLayout,
    ComponentLoader
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
        "service/getCurrentSubscriptionServiceData"
      );
    },
    currentSubscriptionServiceDataNotFetched() {
      return JsonParserUtils.isObjectEmpty(this.currentSubscriptionServiceData);
    },
    availableServices() {
      return StoreUtils.rootGetters("service/getAvailableServices");
    }
  },
  created() {
    StoreUtils.commit("service/SET_CURRENT_SERVICE_TAG", this.serviceTag);
  },
  updated() {
    if (
      this.userAuthenticated &&
      this.currentSubscriptionServiceDataNotFetched
    ) {
      StoreUtils.dispatch(
        "service/fetchSubscriptionServiceDataByTag",
        this.serviceTag
      );
    }
  }
};
</script>
