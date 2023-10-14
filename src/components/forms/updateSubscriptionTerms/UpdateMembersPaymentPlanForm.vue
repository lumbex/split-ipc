<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next">
<!--        <p>Up Next: <span>Billing Date</span></p>-->
      </div>
    </div>
    <div class="app-form">
      <p class="page-title text-3xl text-white mb-2">Change members payment plan</p>
      <p class="page-sub">
          The payment plan is how often members make payment for your subscription
          <br /> <br /> Choose a payment plan.
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
            <span v-if="plan.value === currentSubscriptionTerms.plan" class="recommended">
                Current Plan
            </span>
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <button
          @click="submit"
          class="app-btn light-btn"
          :disabled="selectedPlan === ''"
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

export default {
  name: "UpdateMembersPaymentPlanForm",
  components: { BackIcon },
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
  data() {
    return { selectedPlan: "" };
  },
  computed: {
    availablePlanOptions() {
      return StoreUtils.rootGetters("subscription/getAvailablePlans");
    },
      currentSubscriptionTerms() {
          return StoreUtils.rootGetters(
              "subscription/getCurrentSubscriptionTerms"
          );
      }
  },
    created() {
      this.selectedPlan = this.currentSubscriptionTerms.plan
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
