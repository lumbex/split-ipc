<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Members</a
        >
      </div>
      <div class="up-next">
        <p>Up Next: <span>Billing Date</span></p>
      </div>
    </div>
    <div class="app-form">
      <p class="page-title">How frequently should members be charged?</p>
      <p class="page-sub">
        This is can be a one time charge, <span>yearly</span>, or every
        <span>6 months</span>. Select a plan.
      </p>
      <div class="block-options">
        <div
          v-for="(plan, index) in availablePlanOptions"
          :key="index"
          @click="selectPlan(plan)"
          class="option"
          :class="{ active: plan.value === selectedPlan }"
        >
          {{ plan.title }}
          <span v-if="plan.recommended" class="recommended">Most Popular</span>
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <button
          @click="submit"
          class="app-btn light-btn"
          :disabled="selectedPlan === ''"
        >
          Continue to Billing Date
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";

export default {
  name: "SubscriptionPlanForm",
  components: { BackIcon },
  data() {
    return { selectedPlan: "" };
  },
  computed: {
    availablePlanOptions() {
      return StoreUtils.rootGetters("subscription/getAvailablePlans");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    selectPlan(plan) {
      this.selectedPlan = plan.value;
    },
    submit() {
      StoreUtils.commit("form/BUILD_FORM_BODY", { plan: this.selectedPlan });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
