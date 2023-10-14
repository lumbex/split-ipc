<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div v-if="!componentLoading" class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next"></div>
    </div>
    <ComponentLoader v-if="componentLoading" />
    <div v-else class="app-form">
      <p class="page-title text-3xl text-white mb-2">Review</p>
      <p class="page-sub">Here’s a recap of all your selections.</p>
      <br />
      <ReviewBreakdownList :current-subscription-service-data="currentSubscriptionServiceData" :service-tag="serviceTag" />
      <br />
      <div class="space-filler"></div>

      <div class="app-form-base">
        <button @click="submit" class="app-btn">
          Change Subscription Terms
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ReviewBreakdownList from "@/components/lists/appleMusic/ReviewBreakdownList";
import BackIcon from "@/components/icons/BackIcon";
import ComponentLoader from "@/components/loaders/ComponentLoader";

export default {
  name: "ReviewSubscriptionUpdateForm",
  components: {
    ComponentLoader,
    BackIcon,
    ReviewBreakdownList
  },
  data() {
    return { checked: false };
  },
  // props: ["serviceTag"],
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        },
        serviceTag: {
            type: String,
            defaults: "apple_music"
        }
    },
  computed: {
    componentLoading() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    submit() {
      const payload = { ...this.currentSubscriptionServiceData, ...this.formBody };
      StoreUtils.dispatch("subscription/updateSubscriptionTerms", payload);
    }
  }
};
</script>

<style scoped></style>
