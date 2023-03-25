<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Plan</a
        >
      </div>
      <div class="up-next">
        <!-- <p>Up Next: <span>Region</span></p> -->
      </div>
    </div>
    <div class="app-form">
      <p class="page-title">How do You Pay for This Subscription?</p>
      <p class="page-sub">
        Select the method you use to pay for this Apple Music Family
        subscription.
      </p>
      <div class="block-options">
        <div
          v-for="(option, index) in availableAppleMusicPaymentMethods"
          :key="index"
          @click="selectOne(option)"
          class="option big flex flex-row gap-2 p-2 h-10"
          :class="{ active: option.value === selectedOption }"
        >
          <span
            v-if="option.value === currentSubscriptionTerms.paymentMethod"
            class="recommended"
            >Current Method</span
          >
          <img class="h-auto w-10" :src="option.iconUrl" :alt="option.title" />
          <div class="flex flex-col text-white">
            <div class="text-l leading-6 mb-2">{{ option.title }}</div>
            <div class="text-sm leading-4">{{ option.sub }}</div>
          </div>

          <span v-if="option.recommended" class="recommended text-[#F05151]"
            >New</span
          >
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <ComponentLoader v-if="componentLoading" />
        <button
          v-else
          @click="submit"
          class="app-btn light-btn"
          :disabled="selectedOption === ''"
        >
          <span v-if="selectedOption === 'ng-card'">Confrim New Terms</span>
          <span v-else>Continue</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";
import ComponentLoader from "@/components/loaders/ComponentLoader";

export default {
  name: "UpdatePaymentMethodForm",
  components: { BackIcon, ComponentLoader },
  data() {
    return { selectedOption: "" };
  },
  computed: {
    componentLoading() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    availableAppleMusicPaymentMethods() {
      return StoreUtils.rootGetters(
        "subscription/getAvailableAppleMusicPaymentMethods"
      );
    },
    currentSubscriptionTerms() {
      return StoreUtils.rootGetters("subscription/getCurrentSubscriptionTerms");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    selectOne(option) {
      this.selectedOption = option.value;
    },
    submit() {
      const option = this.selectedOption;

      if (option === "ng-card") {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          planPrice: StoreUtils.rootGetters("service/getAppleMusicNGPrice"),
          paymentMethod: option
        });
        StoreUtils.dispatch("subscription/updateAppleMusicSubscriptionTerms");
      }

      if (option === "us-card") {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          paymentMethod: option
        });
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
      }
    }
  }
};
</script>

<style scoped></style>
