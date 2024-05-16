<template>
  <div class="app-form-wrapper">
    <div class="app-form">
      <img
        class="intro-page-img w-24 mt-0 mb-6 mx-auto"
        src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715174277/splitcash/images/image_2_wofia4.png"
        alt="Action Successful"
      />
      <p class="page-title-sm text-center">Slot price changed</p>
      <p class="text-base text-center text-grey-500 mb-8">
        <!-- Your price for this subscription has been updated successfully!  -->
        Members will be notified against the next renewal.
      </p>

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
  name: "ChangePriceSuccessForm",
  components: {},
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return { selectedOption: "" };
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    currentEditSubscriptionInfo() {
      return StoreUtils.rootGetters("subscription/getEditSubscriptionInfo");
    },
    currentServiceTag() {
      return StoreUtils.rootGetters("service/getCurrentServiceTag");
    }
  },
  methods: {
    submit() {
      StoreUtils.dispatch("form/resetForm");
      this.$router.push(`/edit-subscription/${this.currentServiceTag}`);
    }
  }
};
</script>

<style scoped>
.intro-page-img {
  height: 120px;
  width: 120px;
  margin-bottom: 8px;
  margin-top: 10vh;
}
</style>
