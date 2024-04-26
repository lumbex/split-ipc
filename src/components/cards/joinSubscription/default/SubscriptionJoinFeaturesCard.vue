<template>
  <div class="app-card-full-page sm">
      <div>
          <img :src="currentSubscriptionServiceData.icon_url" alt="Subscription Service Logo"  class="sub-icon mt-10 mb-4" />


          <p class="page-title-sm">Shared account</p>
          <p class="page-sub-sm">
              You’ll be invited to join a shared plan once your  subscription payment is confirmed.
          </p>
      </div>

<!--      <p>description => {{ featureDescriptions }}</p>-->
    <div class="sub-features-hold">
        <h4 class="ft-title">What you enjoy</h4>
        <div class="sub-features">
            <ul>
                <li v-for="(feature, i) in featureDescriptions" :key="i">
                    <div class="icon"><img :src="feature.icon" alt="feature"></div>
                    <div class="point">{{ feature.title }}</div>
                </li>
            </ul>

        </div>
    </div>

    <div class="space-filler"></div>

    <div class="app-card-base">
      <button
        @click="okGotIt"
        class="app-btn light-btn"
      >
        Sweet
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
    featureDescriptions() {
      return JSON.parse(this.currentSubscriptionServiceData.description)
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
            // StoreUtils.dispatch("subscription/completeDefaultNewMemberJoin");
            StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE"); 
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

<style scoped>

</style>
