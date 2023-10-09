<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Region</a
        >
      </div>
      <div class="up-next">
        <a @click="changeInputCurrency()" class="change-input-ccy-btn">Change Currency</a>
      </div>
    </div>


      <div class="app-form">
<!--          <p>suggestedDollarToNairaRate =>> {{suggestedDollarToNairaRate}}</p>-->
<!--          <p>slotPriceInputCurrency =>> {{slotPriceInputCurrency}}</p>-->
<!--          <p>currentSubscriptionServiceData =>> {{currentSubscriptionServiceData}}</p>-->

          <p class="page-title text-3xl text-white mb-2">
              Set What Each Member Pays Monthly
          </p>


          <div class="price-data">
              <div class="min-price">
                  <div class="price-data-title">Min. Listed Price</div>
                  <div class="price-data-base">
                      <MinPriceIcon />
                      <p class="price-data-value"><span>₦</span>{{ currentSubscriptionServiceData.min_price | moneyFormat }}</p>
                  </div>
              </div>
              <div class="max-price">
                  <div class="price-data-title">Max. Listed Price</div>
                  <div class="price-data-base">
                      <MaxPriceIcon />
                      <p class="price-data-value"><span>₦</span>{{ currentSubscriptionServiceData.max_price | moneyFormat}}</p>
                  </div>
              </div>
          </div>

          <form action="#" @submit.prevent="submit">
              <div class="">
                  <div class="form-group alt no-pad">

                      <div class="flex flex-row justify-start">
                          <div @click="decreaseSlotPriceSteady()" class="flex-shrink-0 flex items-center">
                              <DecreaseSlotPriceIcon />
                          </div>

                          <div class="input-wrap-hold w-[90%] flex-grow-1 flex-basis-0">
                              <div class="">
                                  <label class="px-2" for="cost">Slot Price</label>
                              </div>

                              <div class="flex flex-row items-center">
                                  <div class="slot-input-currency px-1">
                                      <span v-if="slotPriceInputCurrency === 'NGN'">₦</span>
                                      <span v-else>$</span>
                                  </div>
                                  <input
                                      type="number"
                                      step=".01"
                                      class="alt"
                                      v-model="slotPrice"
                                      v-on:input="isValidAmount"
                                      required
                                      id="cost"
                                      placeholder="0.0/month"
                                  />
                              </div>

                          </div>
                          <div @click="increaseSlotPriceSteady()" class="swap-curr flex-shrink-0 flex">
                              <IncreaseSlotPriceIcon />
                          </div>
                      </div>

<!--                      <div class="input-group-base text-center">-->
<!--                          <p class="m-0 text-white text-base">Input Currency: {{ slotPriceInputCurrency }}</p>-->
<!--                      </div>-->
                  </div>

<!--                  <p class="form-group-info">-->
<!--                      Enter how much this subscription cost you-->
<!--                  </p>-->

                  <p v-if="slotPriceError.length > 0" class="form-group-error">
                      {{ slotPriceError }}
                  </p>

                  <ComponentLoader v-if="componentLoader" />

                  <div class="settlement-breakdown">
                      <p class="settlement-breakdown-title">Monthly Settlement</p>
                      <div class="settlement-breakdown-table">
                          <ul class="breakdown-data-list divide-y divide-slate-100">
                              <li>
                                  <article
                                      class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
                                  >
                                      <div class="data-box min-w-0 relative flex-auto">
                                          <span class="sr-only">Title</span>
                                          <h2 class="title font-semibold text-slate-900 truncate pr-20">
                                              Price
                                          </h2>
                                          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                                              <div class="absolute top-0 right-0 flex items-center space-x-1">
                                                  <dt class="text-sky-500">
                                                      <span class="sr-only">Value</span>
                                                      <span class="value-span bg-[#575244] rounded-md px-4">{{ slotPrice }}</span>
                                                  </dt>
                                              </div>
                                          </dl>
                                      </div>
                                  </article>
                              </li>

                              <li>
                                  <article
                                      class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
                                  >
                                      <div class="data-box min-w-0 relative flex-auto">
                                          <span class="sr-only">Title</span>
                                          <h2 class="title font-semibold text-slate-900 truncate pr-20">
                                              Available slots
                                          </h2>
                                          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                                              <div class="absolute top-0 right-0 flex items-center space-x-1">
                                                  <dt class="text-sky-500">
                                                      <span class="sr-only">Value</span>
                                                      <span class="value-span bg-[#575244] rounded-md px-4">{{ availableSlots }}</span>
                                                  </dt>
                                              </div>
                                          </dl>
                                      </div>
                                  </article>
                              </li>

                              <li>
                                  <article
                                      class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
                                  >
                                      <div class="data-box min-w-0 relative flex-auto">
                                          <span class="sr-only">Title</span>
                                          <h2 class="title font-semibold text-slate-900 truncate pr-20">
                                              Sub Total
                                          </h2>
                                          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                                              <div class="absolute top-0 right-0 flex items-center space-x-1">
                                                  <dt class="text-sky-500">
                                                      <span class="sr-only">Value</span>
                                                      <span class="value-span bg-[#575244] rounded-md px-4">{{ totalSlotPriceCalculated }}</span>
                                                  </dt>
                                              </div>
                                          </dl>
                                      </div>
                                  </article>
                              </li>

                              <li>
                                  <article
                                      class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
                                  >
                                      <div class="data-box min-w-0 relative flex-auto">
                                          <span class="sr-only">Title</span>
                                          <h2 class="title font-semibold text-slate-900 truncate pr-20">
                                              Fees (-10%)
                                          </h2>
                                          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                                              <div class="absolute top-0 right-0 flex items-center space-x-1">
                                                  <dt class="text-sky-500">
                                                      <span class="sr-only">Value</span>
                                                      <span class="value-span bg-[#575244] rounded-md px-4">-{{ feesCalculated }}</span>
                                                  </dt>
                                              </div>
                                          </dl>
                                      </div>
                                  </article>
                              </li>

                              <li>
                                  <article
                                      class="breakdown-data-card flex items-start space-x-2 p-2 text-white"
                                  >
                                      <div class="data-box min-w-0 relative flex-auto">
                                          <span class="sr-only">Title</span>
                                          <h2 class="title font-semibold text-slate-900 truncate pr-20">
                                              Settlement
                                          </h2>
                                          <dl class="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                                              <div class="absolute top-0 right-0 flex items-center space-x-1">
                                                  <dt class="text-sky-500">
                                                      <span class="sr-only">Value</span>
                                                      <span class="value-span bg-[#575244] rounded-md px-4">{{ totalSettlementCalculated }}/month</span>
                                                  </dt>
                                              </div>
                                          </dl>
                                      </div>
                                  </article>
                              </li>
                          </ul>

                          <p class="settlement-breakdown-warning">You are settled in Naira on your settlement day.</p>
                      </div>
                  </div>

              </div>

              <div class="space-filler"></div>

              <div class="app-form-base">
                  <button
                          type="submit"
                          class="app-btn light-btn"
                          :disabled="isValidAmount() === false"
                  >
                      Continue
                  </button>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import MinPriceIcon from "@/components/icons/MinPriceIcon.vue";
import MaxPriceIcon from "@/components/icons/MaxPriceIcon.vue";
import DecreaseSlotPriceIcon from "@/components/icons/DecreaseSlotPriceIcon.vue";
import IncreaseSlotPriceIcon from "@/components/icons/IncreaseSlotPriceIcon.vue";
import {th} from "date-fns/locale";

export default {
  name: "SetSlotPriceForm",
  components: {
      IncreaseSlotPriceIcon,
      DecreaseSlotPriceIcon,
      MaxPriceIcon, MinPriceIcon, ComponentLoader, BackIcon },
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
  data() {
    return { checked: false,slotPrice: 0, slotPriceError: "", rateUsed: 700, };
  },
    created() {
        this.fetchSuggestedDollarRate();
        this.initializeSlotPrice();
    },
  computed: {
      formBody() {
          return StoreUtils.rootGetters("form/getFormBody");
      },
      componentLoader() {
          return StoreUtils.rootGetters("loader/getLoader", "component");
      },
      slotPriceInputCurrency() {
          return StoreUtils.rootGetters("subscription/getSlotPriceInputCurrency");
      },
      suggestedDollarToNairaRate() {
          return StoreUtils.rootGetters("subscription/getSuggestedDollarToNairaRate");
      },
      availableSlots() {
          return this.currentSubscriptionServiceData.max_capacity - this.formBody.activeMembers;
      },
      totalSlotPriceCalculated() {
          return this.slotPrice * this.availableSlots;
      },
      feesCalculated() {
          return (10 / 100) * this.totalSlotPriceCalculated;
      },
      totalSettlementCalculated() {
          return this.totalSlotPriceCalculated - this.feesCalculated;
      },
  },
  methods: {
      goBack() {
          StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
      },
      initializeSlotPrice() {
          this.slotPrice = this.currentSubscriptionServiceData.max_price - 200;

          StoreUtils.commit("subscription/SET_SLOT_PRICE_INPUT_CURRENCY", this.currentSubscriptionServiceData.currency)
      },
      decreaseSlotPriceSteady() {
          this.slotPrice -= 50
      },
      increaseSlotPriceSteady() {
          this.slotPrice += 50
      },
      async fetchSuggestedDollarRate() {
          const rate = await StoreUtils.dispatch("subscription/fetchSuggestedDollarRate")
          this.rateUsed = await rate.rate.rate
      },
      isValidAmount() {
          if (this.slotPrice >= this.currentSubscriptionServiceData.min_price_limit && this.slotPrice <= this.currentSubscriptionServiceData.max_price_limit) {
              this.slotPriceError = "";
              return true;
          } else {
              this.slotPriceError =
                  "Price not valid - try another price";
              return false;
          }
          // return !!emailAddress.match(regex);
      },
      changeInputCurrency() {
          if (this.slotPriceInputCurrency === 'NGN'){
              StoreUtils.commit("subscription/SET_SLOT_PRICE_INPUT_CURRENCY", "USD")
          } else if (this.slotPriceInputCurrency === 'USD') {
              StoreUtils.commit("subscription/SET_SLOT_PRICE_INPUT_CURRENCY", "NGN")
          }
      },
      submit() {

          if (this.isValidAmount() === true) {


              StoreUtils.commit("form/BUILD_FORM_BODY", {
                  slotPrice: this.slotPrice,
                  availableSlots: this.availableSlots,
                  fees: this.feesCalculated,
                  totalSettlement: this.totalSettlementCalculated,
                  slotPriceInputCurrency: this.slotPriceInputCurrency
              });

              if (this.currentSubscriptionServiceData.tag === 'canva') {
                  StoreUtils.commit("form/BUILD_FORM_BODY", {
                      region:  "NG"
                  });
              }
              StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
          } else {
              this.costError =
                  "Price not valid - try another price";
          }
      }
  }
};
</script>

<style scoped></style>
