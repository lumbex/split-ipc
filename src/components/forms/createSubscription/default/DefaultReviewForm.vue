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
      <p class="page-title">Review</p>
      <p class="page-sub">Here’s a recap of all your selections.</p>
      <br />
<!--        <p>cost ==> {{currentSubscriptionServiceData.cost}}</p>-->
<!--        <p>cost_currency ==> {{currentSubscriptionServiceData.cost_currency}}</p>-->
      <ReviewBreakdownList :current-subscription-service-data="currentSubscriptionServiceData" />
      <br />
      <div class="space-filler"></div>

      <div class="app-form-base">
        <div @click="checked = !checked" class="custom-checkbox">
          <div class="question">
            I’ve read, understood and agree to the Splitverse
            <a href="#">Rule of Use</a>
          </div>
          <div class="indicator">
            <span v-if="checked"><CheckedIcon /></span>
            <span v-else><UncheckedIcon /></span>
          </div>
        </div>
        <button @click="submit" class="app-btn" :disabled="!(checked === true)">
          Share my Subscription
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ReviewBreakdownList from "@/components/lists/appleMusic/ReviewBreakdownList";
import CheckedIcon from "@/components/icons/CheckedIcon";
import UncheckedIcon from "@/components/icons/UncheckedIcon";
import BackIcon from "@/components/icons/BackIcon";
import ComponentLoader from "@/components/loaders/ComponentLoader";

export default {
  name: "DefaultReviewForm",
  components: {
    ComponentLoader,
    BackIcon,
    UncheckedIcon,
    CheckedIcon,
    ReviewBreakdownList
  },
  data() {
    return { checked: false };
  },
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
    createSubscriptionBody() {
      return StoreUtils.rootGetters("subscription/getCreateSubscriptionBody");
    }
  },
  methods: {
    openUrlInBrowser(url) {
      const message = {
        messageAction: "open_url_in_browser",
        messageBody: JSON.stringify({ url: url })
      };
      StoreUtils.dispatch("ipc/postMessage", message);
    },
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    submit() {
      const payload = { ...this.currentSubscriptionServiceData, ...this.createSubscriptionBody };

      console.log("lubbar => ", payload)
      StoreUtils.dispatch("subscription/createSubscriptionDefault", payload);
    }
  }
};
</script>

<style scoped></style>
