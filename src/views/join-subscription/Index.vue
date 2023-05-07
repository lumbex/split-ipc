<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
      <ComponentLoader v-if="isLoading" />
      <div v-else class="create-subscription">
        <div v-if="serviceTag === 'apple_music'|| serviceTag === 'youtube_premium'">
          <SelectRegionForm v-if="formStage === 0" />
          <NewMemberJoinInfoForm
            v-if="formStage === 1"
            :service-tag="serviceTag"
          />
        </div>
        <div v-if="serviceTag === 'spotify'">
          <MemberTermsConfirmationCard />
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
import NewMemberJoinInfoForm from "@/components/forms/joinSubscription/appleMusic/NewMemberJoinInfoForm";
import PreAuthCard from "@/components/cards/PreAuthCard";
import SelectRegionForm from "../../components/forms/joinSubscription/appleMusic/SelectRegionForm.vue";
import MemberTermsConfirmationCard from "../../components/cards/joinSubscription/spotify/MemberTermsConfirmationCard.vue";

export default {
  name: "JoinSubscription",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    PreAuthCard,
    NewMemberJoinInfoForm,
    BaseLayout,
    ComponentLoader,
    SelectRegionForm,
    MemberTermsConfirmationCard
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
