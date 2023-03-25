<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div v-if="!componentLoading" class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Confirm</a
        >
      </div>
      <div class="up-next"></div>
    </div>
    <ComponentLoader v-if="componentLoading" />
    <div v-else class="app-form">
      <p class="page-title">Review</p>
      <p class="page-sub">Here’s a recap of all your selections.</p>
      <br />
      <SpotifyReviewBreakdownList :service-tag="serviceTag" />
      <br />
      <div class="space-filler"></div>

      <div class="app-form-base">
        <div @click="checked = !checked" class="custom-checkbox">
          <div class="question">
            I’ve read, understood and agree to the
            <a href="#">Rule of Use</a> and Spotify’s
            <a
              @click="
                openLinkInBrowser(
                  `https://www.spotify.com/ng/legal/end-user-agreement/`
                )
              "
              >Terms of Service</a
            >
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
import SpotifyReviewBreakdownList from "@/components/lists/spotify/SpotifyReviewBreakdownList";
import CheckedIcon from "@/components/icons/CheckedIcon";
import UncheckedIcon from "@/components/icons/UncheckedIcon";
import BackIcon from "@/components/icons/BackIcon";
import ComponentLoader from "@/components/loaders/ComponentLoader";

export default {
  name: "SpotifyReviewForm",
  components: {
    ComponentLoader,
    BackIcon,
    UncheckedIcon,
    CheckedIcon,
    SpotifyReviewBreakdownList
  },
  data() {
    return { checked: false };
  },
  props: ["serviceTag"],
  computed: {
    componentLoading() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    serviceObject() {
      return StoreUtils.rootGetters(
        "service/getServiceObject",
        this.serviceTag
      )[0];
    },
    createSubscriptionBody() {
      return StoreUtils.rootGetters("subscription/getCreateSubscriptionBody");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    submit() {
      const payload = { ...this.serviceObject, ...this.createSubscriptionBody };
      StoreUtils.dispatch("subscription/createSpotifySubscription", payload);
    },
    openUrlInBrowser(url) {
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
