<template>
  <div class="app-card-full-page">
      <img :src="currentSubscriptionServiceData.icon_url"  class="mt-10 mb-4" />


    <p class="page-title">{{currentSubscriptionServiceData.name}}</p>
    <p class="page-sub">
      Here are the benefits:
    </p>

    <div class="space-filler"></div>

    <div class="app-card-base">
      <button
        @click="okGotIt"
        class="app-btn light-btn"
      >
        Ok, Got It
      </button>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import AppUtils from "@/utils/baseUtils/AppUtils";

export default {
  name: "SubscriptionJoinFeaturesCard",
    components: {},
  props: {
      currentSubscriptionServiceData: {
          type: Object,
          required: true
      }
  },
  data() {
    return {
      copied: false,
      checked: false
    };
  },
  computed: {
    componentLoader() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
  },
  created() {
    StoreUtils.commit("loader/SET_COMPONENT_LOADER", true);
  },
  methods: {
    copyToClipboard(data) {
      AppUtils.copyToClipBoard(data);
      this.copied = true;
    },
    okGotIt() {
        if (this.currentSubscriptionServiceData.join_type === 'instant_access'){
            StoreUtils.dispatch("subscription/completeDefaultNewMemberJoin");
        }

        if (this.currentSubscriptionServiceData.join_type === 'member_get_access'){
            StoreUtils.dispatch("subscription/completeDefaultNewMemberJoin");
        }

        if (this.currentSubscriptionServiceData.join_type === 'host_invite'){
            StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
        }
    }
  }
};
</script>

<style scoped></style>
