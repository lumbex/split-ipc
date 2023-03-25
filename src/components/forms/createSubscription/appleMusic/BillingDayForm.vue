<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back"><a @click="goBack"><span class="icon"><BackIcon /></span>Plan</a></div>
      <div class="up-next"><p>Up Next: <span>Confirmation</span></p></div>
    </div>
    <div class="app-form">
      <p class="page-title">What’s the billing date?</p>
      <p class="page-sub">Select the day of the month Apple bills your account for your subscription.</p>
      <br />
      <p class="page-question">I’m billed every month on the:</p>
      <div @click="launchDateSelectorFromNative" class="question-box">
        <span v-if="selectedBillingDate === ''">Select a day of the month</span>
        <span v-else>{{ selectedBillingDate }}</span>
      </div>
      <br />
<!--      <select v-model="billingDay">-->
<!--        <option value="1">1st</option>-->
<!--        <option value="2">2nd</option>-->
<!--        <option value="3">3rd</option>-->
<!--        <option value="4">4th</option>-->
<!--      </select>-->
      <div class="option-box">
        <div class="option">12th</div>
        <div class="option">13th</div>
        <div class="option">14th</div>
      </div>
      <br />
      <div class="space-filler"></div>

      <div class="app-form-base">
        <button @click="submit" class="app-btn light-btn" :disabled="selectedBillingDate === ''">Review</button>
      </div>
<!--      <button v-if="!billingDaySelected" @click="submit" class="app-btn light-btn">Review</button>-->
<!--      <button @click="submit" v-else class="app-btn light-btn" disabled>Review</button>-->

    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";

export default {
  name: "BillingDayForm",
  components: {BackIcon},
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
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE")
    },
  }

}
</script>

<style scoped>

</style>