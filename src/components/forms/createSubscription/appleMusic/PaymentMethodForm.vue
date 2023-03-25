<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Intro</a
        >
      </div>
      <div class="up-next">
        <p>Up Next: <span>Region</span></p>
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
          <img class="h-auto w-12" :src="option.iconUrl" :alt="option.title" />
          <div class="flex flex-col text-white">
            <div class="text-l leading-6 mb-1">{{ option.title }}</div>
            <div class="text-sm leading-4">{{ option.sub }}</div>
          </div>

          <span v-if="option.recommended" class="recommended text-[#F05151]"
            >New</span
          >
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <div @click="checked = !checked" class="custom-checkbox">
          <div class="question">
            I confirm that I am the owner of this Apple Music Family
            subscription
          </div>
          <div class="indicator">
            <span v-if="checked"><CheckedIcon /></span>
            <span v-else><UncheckedIcon /></span>
          </div>
        </div>
        <button
          @click="submit"
          class="app-btn light-btn"
          :disabled="selectedOption === '' || checked === false"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";
import CheckedIcon from "@/components/icons/CheckedIcon";
import UncheckedIcon from "@/components/icons/UncheckedIcon";

export default {
  name: "PaymentMethodForm",
  components: { BackIcon, UncheckedIcon, CheckedIcon },
  data() {
    return { selectedOption: "", checked: false };
  },
  computed: {
    availableAppleMusicPaymentMethods() {
      return StoreUtils.rootGetters(
        "subscription/getAvailableAppleMusicPaymentMethods"
      );
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
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        paymentMethod: this.selectedOption
      });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
