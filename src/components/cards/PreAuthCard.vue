<template>
  <div>
    <div
      v-if="networkError"
      class="network-error-box text-center text-white mt-12 p-3"
    >
      <h4 class="text-lg">Something Went Worng!!</h4>
      <p class="text-sm mt-1">There was a network error. Please try again.</p>
      <div class="flex justify-center mt-2 mb-4">
        <a
          class="flex flex-row text-grey justify-center items-center rounded-lg bg-white text-sm py-1 pl-1 pr-2 fill-grey"
          @click="tryAgain()"
        >
          <RetryIcon /> Try Again
        </a>
      </div>
    </div>

    <div v-else>
      <p class="page-sub mt-12">
        You need to be authenticated to continue.
      </p>
    </div>

    <!--  <p class="intro">Message Received Token: {{firstMessageReceived}}</p> <br />-->
    <!--  <p class="intro">Auth Token: {{authToken}}</p> <br />-->
    <!--  <p class="intro">User Authenticated: {{userAuthenticated}}</p> <br />-->
    <!--  <p class="intro">User Info: {{userInfo}}</p> <br />-->
    <!--  <p class="intro">Service Tag: {{currentServiceTag}}</p> <br />-->
    <!--  <p class="intro">Available Services: {{availableServices}}</p> <br />-->
    <!--  <p class="intro">Available Services Length: {{availableServices.length}}</p> <br />-->
    <!--  <br />-->
    <!--  <p class="intro">Service Object: {{serviceObject}}</p>-->
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import RetryIcon from "@/components/icons/RetryIcon";

export default {
  name: "PreAuthCard",
  components: { RetryIcon },
  computed: {
    userAuthenticated() {
      return StoreUtils.rootGetters("user/getUserAuthenticated");
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
    },
    networkError() {
      return StoreUtils.rootGetters("appSetup/getAppNetworkError");
    }
  },
  methods: {
    tryAgain() {
      StoreUtils.dispatch("user/validateToken");
    }
  }
};
</script>

<style scoped>
.page-sub {
  text-align: center;
}
</style>
