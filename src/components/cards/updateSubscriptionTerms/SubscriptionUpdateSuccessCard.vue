<template>
  <div class="app-card-full-page">
    <SuccessBigIcon class="mt-4 mb-4" />

    <p class="page-title">You have Updated your Subscription Terms</p>
    <p class="page-sub">
      New terms will take effect when you complete the renewal of this
      subscription.
    </p>

    <div class="space-filler"></div>

    <div class="app-form-base">
      <button @click="finish" class="app-btn">
        Complete Renewal
      </button>
    </div>
  </div>
</template>

<script>
import SuccessBigIcon from "@/components/icons/SuccessBigIcon";

import StoreUtils from "@/utils/baseUtils/StoreUtils";
export default {
  name: "SubscriptionUpdateSuccessCard",
  components: { SuccessBigIcon },
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
  methods: {
    finish() {
      StoreUtils.dispatch("subscription/completeSubscriptionTermsUpdate");
    }
  }
};
</script>

<style scoped></style>
