<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <!-- <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Members</a
        > -->
      </div>
      <div class="up-next"></div>
    </div>
    <div class="app-form">
      <p class="page-title">Change this Subscription Plan</p>
      <p class="page-sub">
        This is how frequently members contribute for this subscription.
        <br />
        <br />
        Select a plan.
      </p>
      <!-- <p>Up Next: {{ serviceTag }}</p> -->
      <div class="block-options">
        <div
          v-for="(plan, index) in availablePlanOptions"
          :key="index"
          @click="selectPlan(plan)"
          class="option"
          :class="{ active: plan.value === selectedPlan }"
        >
          {{ plan.title }}
          <span
            v-if="plan.value === currentSubscriptionTerms.plan"
            class="recommended"
            >Current Plan</span
          >
        </div>
        <div class="flex justify-center mt-0">
          <a
            v-if="selectedPlan !== '' && serviceTag !== 'spotify'"
            class="alt-btn-sm flex flex-row bg-[#414145] justify-center items-center rounded-lg text-white text-sm py-1 px-2 fill-grey gap-2"
            @click="changeCost()"
          >
            <SwapSmIcon /> Change Cost
          </a>
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <ComponentLoader v-if="componentLoading" />
        <button
          v-else
          @click="submit"
          class="app-btn light-btn"
          :disabled="selectedPlan === ''"
        >
          Confirm New Terms
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader";
import SwapSmIcon from "../../../icons/SwapSmIcon.vue";

export default {
  name: "UpdateSubscriptionPlanForm",
  components: { ComponentLoader, SwapSmIcon },
  data() {
    return { selectedPlan: "" };
  },
  props: ["serviceTag"],
  computed: {
    availablePlanOptions() {
      return StoreUtils.rootGetters("subscription/getAvailablePlans");
    },
    componentLoading() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    currentSubscriptionTerms() {
      return StoreUtils.rootGetters("subscription/getCurrentSubscriptionTerms");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    selectPlan(plan) {
      this.selectedPlan = plan.value;
    },
    changeCost() {
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        plan: this.selectedPlan
      });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    },
    submit() {
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        plan: this.selectedPlan,
        planPrice: this.currentSubscriptionTerms.planPrice,
        paymentMethod: this.currentSubscriptionTerms.paymentMethod
      });
      StoreUtils.dispatch("subscription/updateAppleMusicSubscriptionTerms");
    }
  }
};
</script>

<style scoped>
.alt-btn-sm {
  background: #414141;
}
</style>
