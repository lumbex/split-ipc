<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
          <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
          >
      </div>
      <div class="up-next">      </div>
    </div>
    <!-- <p>subscriptionBillingDateCheckedStatus => {{ subscriptionBillingDateCheckedStatus }}</p> -->
    <!-- <p>subscriptionBillingData => {{ subscriptionBillingData }}</p> -->
    <!-- <p>componentLoader => {{ componentLoader }}</p> -->

    <ComponentLoader v-if="componentLoader" />
    <div v-else>
      <div v-if="subscriptionBillingData.isToClose" class="app-form">
        <img
          class="intro-page-img mt-0 mb-6 mx-auto"
          src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781762/splitcash/images/Calendar_gzbsdn.png"
          alt="Calender icon"
        />
        <p class="page-title-sm text-center">Your billing date is close</p>
        <p class="text-base text-center text-grey-500 mb-8">
          Members will only be able to join after your next renewal.
        </p>
       
        <div class="space-filler"></div>
  
        <div class="app-form-base">
          <div @click="checked = !checked" class="custom-checkbox">
            <div class="question">
              <p>
                I understand that my subscription will starts on
                <span class="text-white font-bold">
                  {{ subscriptionBillingData.subscriptionStartDate }}
                </span>
              </p>              
            </div>
            <div class="indicator">
                <span v-if="checked"><CheckedIcon /></span>
                <span v-else><UncheckedIcon /></span>
            </div>
          </div>
          <!-- <div class="form-info-box">
            <img
              src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1697057849/info.square.fill.grey_mg7mdm.png"
              alt="more info"
            />
            <p>
              Members will only be able to join after your next renewal.
              
            </p>
          </div> -->
  
          <button :disabled="!checked" @click="submit" class="app-btn light-btn">Continue</button>
  
          <!-- <button @click="submit" class="app-btn light-btn">Cancel, create later</button> -->
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";

import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import BackIcon from "@/components/icons/BackIcon.vue";
import CheckedIcon from "@/components/icons/CheckedIcon.vue";
import UncheckedIcon from "@/components/icons/UncheckedIcon.vue";



export default {
  name: "BillingDateIsTooCloseForm",
  components: { ComponentLoader, BackIcon, CheckedIcon, UncheckedIcon },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { selectedOption: "", checked: false };
  },
  created() {
    this.checkBillingDate();    
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    componentLoader() {
          return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    subscriptionBillingDateCheckedStatus() {
      return StoreUtils.rootGetters("subscription/getSubscriptionBillingDateCheckedStatus");
    },
    subscriptionBillingData() {
      return StoreUtils.rootGetters("subscription/getSubscriptionBillingData");
    },
    availableAppleMusicPaymentMethods() {
      return StoreUtils.rootGetters("subscription/getAvailableAppleMusicPaymentMethods");
    },

  },
  updated() {
    this.checkIfBillingDateIsNotCloseResult();    
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    checkBillingDate() {
      const payload = {
        billingDate: this.formBody.billingDate,
        frequency: this.formBody.plan
      }

      StoreUtils.dispatch("subscription/checkBillingDate", payload)
    },
    checkIfBillingDateIsNotCloseResult() {
      if (this.subscriptionBillingDateCheckedStatus === true && this.subscriptionBillingData.isToClose ===  false) {
        this.submit();
      }
    },
    submit() {
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    },
  },
};
</script>

<style scoped>
.intro-page-img {
  height: 120px;
  width: 120px;
  margin-bottom: 10px;
  margin-top: 8vh;
}
</style>
