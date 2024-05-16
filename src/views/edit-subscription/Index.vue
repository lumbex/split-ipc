<template>
  <BaseLayout>
    <PreAuthCard v-if="!userAuthenticated" />
    <div v-else class="app-page full-page">
      <ComponentLoader v-if="componentLoaderTable" />
      <!--      <div v-else class="create-subscription">-->
      <div v-else class="">
        <!-- <p> currentSubRef ==> {{ currentSubRef }}</p> -->
        <!-- <p> currentEditSubscriptionInfo ==> {{ currentEditSubscriptionInfo }}</p> -->
        <!-- <p> join_type ==> {{ currentSubscriptionServiceData.join_type }}</p> -->
        <!-- <p> currentSubscriptionData ==> {{ currentSubscriptionServiceData }}</p> -->
        <!-- <p> currentFormBody ==> {{ currentFormBody }}</p> -->
        <!-- <p> formStage ==> {{ formStage }}</p> -->

        <div>
          <div class="app-form-wrapper">
            <div>
              <div class="app-form">
                <img
                  class="page-icon mt-0 mb-6 mx-auto"
                  src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715174278/splitcash/images/Create_File_lidzhe.png"
                  alt="subscription icon"
                />

                <p class="page-title-sm text-center">Control center</p>
                <p class="text-base text-center text-grey-500 mb-8">
                  Keep your subscription information up to date for smooth
                  sailing in the Splitverse.
                </p>

                <div class="">
                  <AppActionableList
                    :current-subscription-service-data="
                      currentSubscriptionServiceData
                    "
                  />
                </div>

                <div class="space-filler"></div>

                <div class="app-form-base">
                  <br />
                  <br />
                  <!-- <button @click="submit" class="app-btn light-btn">
                    Contact Support
                  </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader";
import AppActionableList from "@/components/lists/utility/AppActionableList";
import BaseLayout from "@/layout/BaseLayout";

import PreAuthCard from "@/components/cards/PreAuthCard";

import JsonParserUtils from "@/utils/JsonParserUtils";

export default {
  name: "EditSubscription",
  props: ["serviceTag"],
  data() {
    return {
      isLoading: false
    };
  },
  components: {
    PreAuthCard,
    BaseLayout,
    ComponentLoader,
    AppActionableList
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
    },
    currentSubRef() {
      return StoreUtils.rootGetters("subscription/getCurrentSubscriptionRef")
        .subRef;
    },
    currentEditSubscriptionInfo() {
      return StoreUtils.rootGetters("subscription/getEditSubscriptionInfo");
    }
  },
  created() {
    StoreUtils.commit("service/SET_CURRENT_SERVICE_TAG", this.serviceTag);
    // StoreUtils.dispatch("subscription/fetchCurrentSubscriptionRef");
    // StoreUtils.dispatch("suscription/fetchEditSubscriptionInfo");
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
<style scoped>
.page-icon {
  height: 80px;
}
</style>
