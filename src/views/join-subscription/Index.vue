<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
      <ComponentLoader v-if="componentLoaderTable" />
      <div v-else class="create-subscription">
        <!--          <p>availableServices: {{availableServices[0]}}</p>-->
        <!--          <p>currentSubscriptionServiceData: {{currentSubscriptionServiceData}}</p> <br />-->
        <!--          <p>userAuthenticated: {{userAuthenticated}}</p> <br />-->
        <!--          <p>serviceTag: {{serviceTag}}</p> <br />-->

        <div v-if="currentSubscriptionServiceData.join_type === 'host_invite'">
          <div v-if="serviceTag === 'apple_music'">
            <SubscriptionJoinFeaturesCard
              v-if="formStage === 0"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />
            <SelectRegionForm
              v-if="formStage === 1"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />
            <ChangeRegionForm
              v-if="formStage === 2"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />
            <RegionCautionForm
              v-if="formStage === 3"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />

            <NewMemberJoinInfoForm
              v-if="formStage === 4"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
              :service-tag="serviceTag"
            />
          </div>
          <div v-else>
            <SubscriptionJoinFeaturesCard
              v-if="formStage === 0"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />
            <NewMemberJoinEmailForm
              v-if="formStage === 1"
              :service-tag="serviceTag"
            />
          </div>
        </div>

        <div
          v-if="currentSubscriptionServiceData.join_type === 'instant_access'"
        >
          <div v-if="serviceTag === 'spotify'">
            <SubscriptionJoinFeaturesCard
              v-if="formStage === 0"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />

            <MemberTermsConfirmationCard
              v-if="formStage === 1"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />

            <SubscriptionNameForm
              v-if="formStage === 2"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />
          </div>
          <div v-else>
            <SubscriptionJoinFeaturesCard
              v-if="formStage === 0"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />

            <SubscriptionNameForm
              v-if="formStage === 1"
              :current-subscription-service-data="
                currentSubscriptionServiceData
              "
            />
          </div>
        </div>

        <div
          v-if="
            currentSubscriptionServiceData.join_type === 'member_get_access'
          "
        >
          <SubscriptionJoinFeaturesCard
            v-if="formStage === 0"
            :current-subscription-service-data="currentSubscriptionServiceData"
          />
          <!--            <NewMemberJoinEmailForm v-if="formStage === 1" :service-tag="serviceTag" />-->
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
<style scoped></style>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import JsonParserUtils from "@/utils/JsonParserUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader";
import BaseLayout from "@/layout/BaseLayout";

import PreAuthCard from "@/components/cards/PreAuthCard";

import SelectRegionForm from "../../components/forms/joinSubscription/appleMusic/SelectRegionForm.vue";

import NewMemberJoinInfoForm from "@/components/forms/joinSubscription/appleMusic/NewMemberJoinInfoForm";

import MemberTermsConfirmationCard from "../../components/cards/joinSubscription/spotify/MemberTermsConfirmationCard.vue";

import NewMemberJoinEmailForm from "../../components/forms/joinSubscription/default/NewMemberJoinEmailForm.vue";
import SubscriptionJoinFeaturesCard from "@/components/cards/joinSubscription/default/SubscriptionJoinFeaturesCard.vue";
import ChangeRegionForm from "@/components/forms/joinSubscription/appleMusic/ChangeRegionForm.vue";
import RegionCautionForm from "@/components/forms/joinSubscription/appleMusic/RegionCautionForm.vue";

import SubscriptionNameForm from "@/components/forms/joinSubscription/default/SubscriptionNameForm.vue";

export default {
  name: "JoinSubscription",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    RegionCautionForm,
    ChangeRegionForm,
    SubscriptionJoinFeaturesCard,
    PreAuthCard,
    NewMemberJoinInfoForm,
    BaseLayout,
    ComponentLoader,
    SelectRegionForm,
    MemberTermsConfirmationCard,
    NewMemberJoinEmailForm,
    SubscriptionNameForm
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
        "service/getCurrentSubscriptionServiceData"
      );
    },
    currentSubscriptionServiceDataNotFetched() {
      return JsonParserUtils.isObjectEmpty(this.currentSubscriptionServiceData);
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
    // StoreUtils.dispatch("service/fetchSubscriptionServiceDataByTag", this.serviceTag);
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
