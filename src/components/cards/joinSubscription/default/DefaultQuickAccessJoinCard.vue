<template>
  <div class="app-card-full-page">

      <img :src="currentSubscriptionServiceData.icon_url" alt="Subscription Service Logo"  class="mt-4 mb-4" />

      <p class="page-title">Join {{currentSubscriptionServiceData.name}} Subscription</p>
      <p class="page-sub">
          Open the join link and follow through the prompt to join the shared plan. Don’t forget to confirm your access
          here on SplitCash
      </p>

      <div class="space-filler"></div>

      <div class="app-card-base">
          <ComponentLoader v-if="componentLoader" />
          <div v-else class="member-email-card">
              <div class="flex justify-center mt-4 mb-4">
                  <a
                          class="flex flex-row text-grey justify-center items-center rounded-lg bg-white text-sm py-1 pl-1 pr-2 fill-grey"
                          @click="openUrlInBrowser(quickAccessInfo.invitationLink)"
                  >
                      <ArrowUpSmIcon /> Open Join Link
                  </a>
              </div>
          </div>

          <!-- <a @click="copyToClipboard(quickAccessInfo.address)">Copy</a> -->

          <button
                  @click="inviteSent"
                  :disabled="
      componentLoader === true || linkOpened === false
    "
                  class="app-btn light-btn"
          >
              I’ve Joined.
          </button>
      </div>


  </div>
</template>

<script>

import StoreUtils from "@/utils/baseUtils/StoreUtils";
import AppUtils from "@/utils/baseUtils/AppUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader";
import ArrowUpSmIcon from "@/components/icons/ArrowUpSmIcon";
export default {
  name: "DefaultQuickAccessJoinCard",
  components: {
    ComponentLoader,
    ArrowUpSmIcon
  },
  props: {
      currentSubscriptionServiceData: {
          type: Object,
          required: true
      }
  },
  data() {
    return {
      copied: false,
      linkOpened: false
    };
  },
  computed: {
    componentLoader() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    quickAccessInfo() {
      return StoreUtils.rootGetters("subscription/getQuickAccessInfo");
    },
    currentSubRef() {
      return StoreUtils.rootGetters("subscription/getCurrentSubscriptionRef");
    }
  },
  created() {
    StoreUtils.commit("loader/SET_COMPONENT_LOADER", true);
    StoreUtils.dispatch("subscription/fetchCurrentSubscriptionRef");
  },
  methods: {
    copyToClipboard(data) {
      AppUtils.copyToClipBoard(data);
      this.copied = true;
    },
    inviteSent() {
      StoreUtils.dispatch("subscription/completeSpotifyQuickAccess");
    },
    openUrlInBrowser(url) {
      this.linkOpened = true;
      const message = {
        messageAction: "open_url_in_browser",
        messageBody: JSON.stringify({ url: url })
      };
      StoreUtils.dispatch("ipc/postMessage", message);
    }
  }
};
</script>

<style scoped></style>
