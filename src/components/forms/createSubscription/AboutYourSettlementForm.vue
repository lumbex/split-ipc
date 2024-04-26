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

    
    <div class="app-form">
      <img
        class="intro-page-img mt-0 mb-6 mx-auto"
        src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781759/splitcash/images/Money_2_togbux.png"
        alt="Settlements icon"
      />
      <p class="page-title-sm text-center">More on settlements</p>
      <p class="text-base text-center text-grey-500 mb-8">
        You’re paid at the end of each month’s usage for keeping the subscription active. 
      </p>

      <div class="block-options">
        <div class="option intro flex flex-row gap-2 p-2 h-10">
            <img
                    class="h-auto w-6"
                    src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781758/splitcash/images/Date_zvessz.png"
                    alt="first settlement date"
            />
            <div class="option-text text-white">
              Your first settlement is on: 
              <span class="text-white font-bold">
                {{ subscriptionBillingData.subscriptionStartDate }}
              </span>
            </div>
        </div>

        <div class="option intro flex flex-row gap-2 p-2 h-10">
            <img
                    class="h-auto w-6 "
                    src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781755/splitcash/images/money_bag_dhq5af.png"
                    alt="Settlement amount"
            />
            <div class="option-text text-white">
              You’d be receiving about: 
              <span class="text-white font-bold">
                <!-- ₦5,575 -->
                <AppCurrencyReaderComponent :currency="formBody.slotPriceInputCurrency" />{{ hostPotentialSettlement | moneyFormat }}
        
              </span>
            </div>
        </div>
    </div>
      
      <div class="space-filler"></div>

      <div class="app-form-base">
        <button @click="submit" class="app-btn light-btn">Okay, got it</button>

        <!-- <button @click="submit" class="app-btn light-btn">Cancel, create later</button> -->
      </div>
    </div>
    
    
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";

import BackIcon from "@/components/icons/BackIcon.vue";
import AppCurrencyReaderComponent from "@/components/forms/utilityComponents/AppCurrencyReaderComponent.vue";




export default {
  name: "AboutYourSettlementForm",
  components: { BackIcon, AppCurrencyReaderComponent },
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
    // this.checkBillingDate();    
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    availableSlots() {
          return this.currentSubscriptionServiceData.max_capacity - this.formBody.activeMembers;
    },
    subscriptionBillingDateCheckedStatus() {
      return StoreUtils.rootGetters("subscription/getSubscriptionBillingDateCheckedStatus");
    },
    subscriptionBillingData() {
      return StoreUtils.rootGetters("subscription/getSubscriptionBillingData");
    },
    hostPotentialSettlement() {
      const pricePerMonth = this.formBody.slotPrice
      const daysTillNextBillingDate = this.subscriptionBillingData.daysTillNextBillingDate
    
      const daysInMonth = 30
      const pricePerDay = (pricePerMonth / daysInMonth)
      // Calculate the price for a member from the start date to the next billing date:

      const aMemberPrice = pricePerDay * daysTillNextBillingDate

      return aMemberPrice * this.availableSlots;
    },
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
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
  margin-top: 6vh;
}
.option-text {
  font-size: 14px;
}
</style>
