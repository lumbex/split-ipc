<template>
  <div class="app-form-wrapper">
    <div class="app-form">
      <img
        class="w-36 mt-2 mb-4 mx-auto"
        src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1677350645/splitcash/images/Add_apps_perspective_matte_2_trbuyx.png"
        alt="Add your subscription to the Splitverse"
      />
      <p class="page-title text-center">Be the Boss of your Subscription</p>
      <p class="-text-base text-center text-grey-500">
        You’re about to list your
        <span class="text-white">Spotify Premium</span> subscription in the
        Splitverse.
      </p>
      <div class="block-options">
        <div class="option intro flex flex-row gap-2 p-2 h-10">
          <img
            class="h-auto w-10 "
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1677350644/splitcash/images/Link_gltwkv.png"
            alt="connect and share"
          />
          <div class="text-base text-white">
            Connect and share the cost of this subscription with family &
            friends.
          </div>
        </div>

        <div class="option intro flex flex-row gap-2 p-2 h-10">
          <img
            class="h-auto w-10 "
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1677350644/splitcash/images/Control_werhf4.png"
            alt="connect and share"
          />
          <div class="text-base text-white">
            Manage access to your subscription. You are in control.
          </div>
        </div>

        <div class="option intro flex flex-row gap-2 p-2 h-10">
          <img
            class="h-auto w-10 "
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1677350644/splitcash/images/wallet_skffsn.png"
            alt="connect and share"
          />
          <div class="text-base text-white">
            Everyone’s contributions is credited to your card monthly.
          </div>
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <button @click="submit" class="app-btn light-btn">
          Sweet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";

export default {
  name: "SpotifyCreateIntroForm",
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
  components: {},
  data() {
    return { selectedOption: "" };
  },
  computed: {
    availableAppleMusicPaymentMethods() {
      return StoreUtils.rootGetters(
        "subscription/getAvailableAppleMusicPaymentMethods"
      );
    }
  },
  methods: {
    submit() {
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
