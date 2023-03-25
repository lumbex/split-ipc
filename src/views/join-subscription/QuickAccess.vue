<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
      <ComponentLoader v-if="isLoading" title="" sub="" />
      <div v-else class="create-subscription">
        <div v-if="serviceTag === 'spotify'">
          <QuickAccessJoinCard :service-tag="serviceTag"></QuickAccessJoinCard>
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
import PreAuthCard from "@/components/cards/PreAuthCard";

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
    firstMessageReceived() {
      return StoreUtils.rootGetters("ipc/getFirstMessageReceived");
    },
    currentServiceTag() {
      return StoreUtils.rootGetters("service/getCurrentServiceTag");
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
  }
};
</script>
