<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back"><a @click="goBack"><span class="icon"><BackIcon /></span>Back</a></div>
      <div class="up-next">
<!--          <p>Up Next: <span>Confirmation</span></p>-->
      </div>
    </div>
    <div class="app-form">
      <p class="page-title">What’s the billing date?</p>
      <p class="page-sub">Select the day of the month {{ currentSubscriptionServiceData.name }} bills your account for this subscription.</p>
      <br />
      <p class="page-question">I’m billed every month on the:</p>
      <div @click="launchDateSelectorFromNative" class="question-box">
        <span v-if="selectedBillingDate === ''">Select a day of the month</span>
        <span v-else>{{ selectedBillingDate }}</span>
      </div>
      <br />

      <div class="option-box">
        <div class="option">12th</div>
        <div class="option">13th</div>
        <div class="option">14th</div>
      </div>
      <br />
      <div class="space-filler" style="min-height: 28vh"></div>

      <div class="app-form-base">
        <button @click="submit" class="app-btn light-btn" :disabled="selectedBillingDate === ''">Review</button>
      </div>

    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";

export default {
  name: "DefaultBillingDayForm",
  components: {BackIcon},
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
  data () {
    return { billingDay: "" }
  },
  computed: {
    billingDaySelected() {
      return StoreUtils.rootGetters("subscription/getBillingDaySelected");
    },
    selectedBillingDate() {
      return StoreUtils.rootGetters("subscription/getSelectedBillingDate");
    },
    formBody() {
        return StoreUtils.rootGetters("form/getFormBody");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE")
    },
    launchDateSelectorFromNative() {
      StoreUtils.dispatch("subscription/selectBillingDate")
    },
    submit() {
      StoreUtils.commit("form/BUILD_FORM_BODY", { billingDate: this.selectedBillingDate })
        StoreUtils.commit(
            "subscription/SET_CREATE_SUBSCRIPTION_BODY",
            this.formBody
        );
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE")
    },
  }

}
</script>

<style scoped>

</style>