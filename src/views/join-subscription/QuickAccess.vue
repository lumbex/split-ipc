<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
      <ComponentLoader v-if="componentLoaderTable"  />
      <div v-else class="create-subscription">
        <div v-if="serviceTag === 'spotify'">
          <QuickAccessJoinCard :service-tag="serviceTag"></QuickAccessJoinCard>
        </div>
        <div v-else>
          <DefaultQuickAccessJoinCard
                  :service-tag="serviceTag"
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
import ComponentLoader from "@/components/loaders/ComponentLoader";
import BaseLayout from "@/layout/BaseLayout";
import QuickAccessJoinCard from "@/components/cards/joinSubscription/spotify/QuickAccessJoinCard";
import DefaultQuickAccessJoinCard from "@/components/cards/joinSubscription/default/DefaultQuickAccessJoinCard";

import PreAuthCard from "@/components/cards/PreAuthCard";
import JsonParserUtils from "@/utils/JsonParserUtils";

export default {
  name: "SetupJoinSubscription",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    PreAuthCard,
    QuickAccessJoinCard,
    DefaultQuickAccessJoinCard,
    BaseLayout,
    ComponentLoader
  },
  computed: {
    componentLoaderTable() {
        return StoreUtils.rootGetters("loader/getLoader", "table");
    },
    userAuthenticated() {
      return StoreUtils.rootGetters("user/getUserAuthenticated");
    },
    formStage() {
      return StoreUtils.rootGetters("form/getFormStage");
    },
    firstMessageReceived() {
      return StoreUtils.rootGetters("ipc/getFirstMessageReceived");
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
    serviceObject() {
      return StoreUtils.rootGetters(
        "service/getServiceObject",
        this.serviceTag
      )[0];
    },
    authToken() {
      return StoreUtils.rootGetters("user/getAuthToken");
    },
    userInfo() {
      return StoreUtils.rootGetters("user/getUserInfo");
    }
  },
  created() {
    StoreUtils.commit("service/SET_CURRENT_SERVICE_TAG", this.serviceTag);
  },
  updated() {
      // if (this.userAuthenticated && this.serviceTag !== 'spotify' && this.currentSubscriptionServiceDataNotFetched){
      if (this.userAuthenticated && this.currentSubscriptionServiceDataNotFetched){
          StoreUtils.dispatch("service/fetchSubscriptionServiceDataByTag", this.serviceTag);
      }
  }
};
</script>
