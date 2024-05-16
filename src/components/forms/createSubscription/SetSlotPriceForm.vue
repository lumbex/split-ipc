<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next">
        <a @click="changeInputCurrency()" class="change-input-ccy-btn"
          >Change Currency</a
        >
      </div>
    </div>

    <div class="app-form">
      <!--          <p>suggestedDollarToNairaRate =>> {{suggestedDollarToNairaRate}}</p>-->
      <!--          <p>slotPriceInputCurrency =>> {{slotPriceInputCurrency}}</p>-->
      <!--          <p>currentSubscriptionServiceData =>> {{currentSubscriptionServiceData}}</p>-->

      <p class="page-title text-3xl text-white mb-2">
        How much will each member pay monthly?
      </p>

      <ComponentLoader v-if="componentLoader" />

      <div v-if="!componentLoader" class="price-data">
        <div class="min-price">
          <div class="price-data-title">Min. Listed Price</div>
          <div class="price-data-base">
            <MinPriceIcon />
            <p class="price-data-value">
              <AppCurrencyReaderComponent
                :currency="slotPriceInputCurrency"
              />{{ minPriceLimit | moneyFormat }}
            </p>
          </div>
        </div>
        <div class="max-price">
          <div class="price-data-title">Max. Listed Price</div>
          <div class="price-data-base">
            <MaxPriceIcon />
            <p class="price-data-value">
              <AppCurrencyReaderComponent
                :currency="slotPriceInputCurrency"
              />{{ maxPriceLimit | moneyFormat }}
            </p>
          </div>
        </div>
      </div>

      <form v-if="!componentLoader" action="#" @submit.prevent="submit">
        <div class="">
          <div class="form-group alt no-pad">
            <div class="flex flex-row justify-start">
              <div
                @click="decreaseSlotPriceSteady()"
                class="flex-shrink-0 flex items-center"
              >
                <DecreaseSlotPriceIcon />
              </div>

              <div class="input-wrap-hold w-[90%] flex-grow-1 flex-basis-0">
                <div class="">
                  <label class="px-2" for="cost">Slot Price</label>
                </div>

                <div class="flex flex-row items-center">
                  <div class="slot-input-currency px-1">
                    <AppCurrencyReaderComponent
                      :currency="slotPriceInputCurrency"
                    />
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
              <div
                @click="increaseSlotPriceSteady()"
                class="swap-curr flex-shrink-0 flex"
              >
                <IncreaseSlotPriceIcon />
              </div>
            </div>
          </div>

          <p v-if="slotPriceError.length > 0" class="form-group-error">
            {{ slotPriceError }}
          </p>

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
                      <h2
                        class="title font-semibold text-slate-900 truncate pr-20"
                      >
                        Available slots
                      </h2>
                      <dl
                        class="mt-2 flex flex-wrap text-sm leading-6 font-medium"
                      >
                        <div
                          class="absolute top-0 right-0 flex items-center space-x-1"
                        >
                          <dt class="text-sky-500">
                            <span class="sr-only">Value</span>
                            <span
                              class="value-span bg-[#575244] rounded-md px-4"
                              >{{ availableSlots }}</span
                            >
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
                      <h2
                        class="title font-semibold text-slate-900 truncate pr-20"
                      >
                        Sub Total
                      </h2>
                      <dl
                        class="mt-2 flex flex-wrap text-sm leading-6 font-medium"
                      >
                        <div
                          class="absolute top-0 right-0 flex items-center space-x-1"
                        >
                          <dt class="text-sky-500">
                            <span class="sr-only">Value</span>
                            <span
                              class="value-span bg-[#575244] rounded-md px-4"
                              ><AppCurrencyReaderComponent
                                :currency="slotPriceInputCurrency"
                              />{{
                                totalSlotPriceCalculated | moneyFormat
                              }}</span
                            >
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
                      <h2
                        class="title font-semibold text-slate-900 truncate pr-20"
                      >
                        Fees (-10%)
                      </h2>
                      <dl
                        class="mt-2 flex flex-wrap text-sm leading-6 font-medium"
                      >
                        <div
                          class="absolute top-0 right-0 flex items-center space-x-1"
                        >
                          <dt class="text-sky-500">
                            <span class="sr-only">Value</span>
                            <span
                              class="value-span bg-[#575244] rounded-md px-4"
                              >-<AppCurrencyReaderComponent
                                :currency="slotPriceInputCurrency"
                              />{{ feesCalculated | moneyFormat }}</span
                            >
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
                      <h2
                        class="title font-semibold text-slate-900 truncate pr-20"
                      >
                        Settlement
                      </h2>
                      <dl
                        class="mt-2 flex flex-wrap text-sm leading-6 font-medium"
                      >
                        <div
                          class="absolute top-0 right-0 flex items-center space-x-1"
                        >
                          <dt class="text-sky-500">
                            <span class="sr-only">Value</span>
                            <span
                              class="value-span bg-[#575244] rounded-md px-4"
                              ><AppCurrencyReaderComponent
                                :currency="slotPriceInputCurrency"
                              />{{
                                totalSettlementCalculated | moneyFormat
                              }}/month</span
                            >
                          </dt>
                        </div>
                      </dl>
                    </div>
                  </article>
                </li>
              </ul>

              <p
                v-if="slotPriceInputCurrency === 'USD'"
                class="settlement-breakdown-warning"
              >
                NB: You receive your settlements in Naira.
              </p>
            </div>
          </div>
        </div>

        <div class="space-filler"></div>

        <div class="app-form-base">
          <button
            type="submit"
            class="app-btn light-btn"
            :disabled="slotPriceError !== ''"
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
import { th } from "date-fns/locale";
import AppCurrencyReaderComponent from "@/components/forms/utilityComponents/AppCurrencyReaderComponent.vue";

export default {
  name: "SetSlotPriceForm",
  components: {
    AppCurrencyReaderComponent,
    IncreaseSlotPriceIcon,
    DecreaseSlotPriceIcon,
    MaxPriceIcon,
    MinPriceIcon,
    ComponentLoader,
    BackIcon
  },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checked: false,
      slotPrice: "",
      slotPriceError: "",
      minPriceLimit: 0,
      maxPriceLimit: 0,
      nairaStepValue: 50,
      dollarStepValue: 0.2
    };
  },
  created() {
    this.fetchSuggestedDollarRate();
    this.initializeSlotPrice();
    this.initializeSlotPriceInputCurrency();
    this.initializeSlotPriceLimiters();
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
      return StoreUtils.rootGetters(
        "subscription/getSuggestedDollarToNairaRate"
      );
    },
    availableSlots() {
      return (
        this.currentSubscriptionServiceData.max_capacity -
        this.formBody.activeMembers
      );
    },
    totalSlotPriceCalculated() {
      return this.slotPrice * this.availableSlots;
    },
    feesCalculated() {
      return (10 / 100) * this.totalSlotPriceCalculated;
    },
    totalSettlementCalculated() {
      return this.totalSlotPriceCalculated - this.feesCalculated;
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    initializeSlotPrice() {
      const maxSlotPrice = parseFloat(
        this.currentSubscriptionServiceData.max_price
      );
      const tenPercentOfMaxSlotPrice =
        (10 / 100) * parseFloat(this.currentSubscriptionServiceData.max_price);

      this.slotPrice = (maxSlotPrice - tenPercentOfMaxSlotPrice).toFixed(2);
    },
    initializeSlotPriceInputCurrency() {
      StoreUtils.commit(
        "subscription/SET_SLOT_PRICE_INPUT_CURRENCY",
        this.currentSubscriptionServiceData.currency
      );
    },
    initializeSlotPriceLimiters() {
      const minPriceLimit = parseFloat(
        this.currentSubscriptionServiceData.min_price_limit
      );
      const maxPriceLimit = parseFloat(
        this.currentSubscriptionServiceData.max_price_limit
      );

      this.minPriceLimit = minPriceLimit;
      this.maxPriceLimit = maxPriceLimit;
    },
    convertSlotPriceToDollar() {
      const slotPrice = parseFloat(this.slotPrice);
      const dollarRate = parseFloat(this.suggestedDollarToNairaRate.rate);
      const minPriceLimit = parseFloat(this.minPriceLimit);
      const maxPriceLimit = parseFloat(this.maxPriceLimit);

      this.slotPrice = parseFloat((slotPrice / dollarRate).toFixed(2));
      this.minPriceLimit = (minPriceLimit / dollarRate).toFixed(2);
      this.maxPriceLimit = (maxPriceLimit / dollarRate).toFixed(2);
    },
    convertSlotPriceToNaira() {
      const slotPrice = parseFloat(this.slotPrice);
      const dollarRate = parseFloat(this.suggestedDollarToNairaRate.rate);
      const minPriceLimit = parseFloat(this.minPriceLimit);
      const maxPriceLimit = parseFloat(this.maxPriceLimit);

      this.slotPrice = (slotPrice * dollarRate).toFixed(2);
      this.minPriceLimit = (minPriceLimit * dollarRate).toFixed(2);
      this.maxPriceLimit = (maxPriceLimit * dollarRate).toFixed(2);
    },
    changeInputCurrency() {
      if (this.slotPriceInputCurrency === "NGN") {
        this.convertSlotPriceToDollar();
        StoreUtils.commit("subscription/SET_SLOT_PRICE_INPUT_CURRENCY", "USD");
      } else if (this.slotPriceInputCurrency === "USD") {
        this.convertSlotPriceToNaira();
        StoreUtils.commit("subscription/SET_SLOT_PRICE_INPUT_CURRENCY", "NGN");
      }
    },

    decreaseSlotPriceSteady() {
      let slotPrice = parseFloat(this.slotPrice);
      const nairaStepValue = parseFloat(this.nairaStepValue);
      const dollarStepValue = parseFloat(this.dollarStepValue);

      this.slotPriceInputCurrency === "NGN"
        ? (slotPrice -= nairaStepValue)
        : (slotPrice -= dollarStepValue);

      slotPrice < 0
        ? (this.slotPrice = "0.00")
        : (this.slotPrice = slotPrice.toFixed(2));

      this.isValidAmount();
    },
    increaseSlotPriceSteady() {
      let slotPrice = parseFloat(this.slotPrice);
      const nairaStepValue = parseFloat(this.nairaStepValue);
      const dollarStepValue = parseFloat(this.dollarStepValue);

      this.slotPriceInputCurrency === "NGN"
        ? (slotPrice += nairaStepValue)
        : (slotPrice += dollarStepValue);

      this.slotPrice = slotPrice.toFixed(2);
      this.isValidAmount();
    },
    fetchSuggestedDollarRate() {
      StoreUtils.dispatch("subscription/fetchSuggestedDollarRate");
    },
    isValidAmount() {
      const slotPrice = parseFloat(this.slotPrice);
      const minPriceLimit = parseFloat(this.minPriceLimit);
      const maxPriceLimit = parseFloat(this.maxPriceLimit);
      const condition =
        slotPrice >= minPriceLimit && slotPrice <= maxPriceLimit;

      // console.log("<===== isValidAmount =======>")
      // console.log("typeof.slotPrice =>", typeof slotPrice)
      // console.log("this.slotPrice =>", slotPrice)
      // console.log("typeof.minPriceLimit =>", typeof minPriceLimit)
      // console.log("this.minPriceLimit =>", minPriceLimit)
      // console.log("typeof.slotPrice =>", typeof minPriceLimit)
      // console.log("this.minPriceLimit =>", minPriceLimit)
      // console.log("typeof.maxPriceLimit =>", typeof maxPriceLimit)
      // console.log("this.maxPriceLimit =>", maxPriceLimit)
      // console.log("this.condition =>", condition)
      // console.log("this.conditionPt1 =>", conditionPt1)
      // console.log("this.conditionPt2 =>", conditionPt2)
      // console.log("<============>")

      if (condition) {
        this.slotPriceError = "";
        return true;
      } else {
        this.slotPriceError = "Price not valid - try something else";
        return false;
      }
    },
    submit() {
      if (this.slotPriceError === "") {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          slotPrice: this.slotPrice,
          slotPriceInputCurrency: this.slotPriceInputCurrency,
          availableSlots: this.availableSlots,
          fees: this.feesCalculated,
          totalSettlement: this.totalSettlementCalculated
        });

        if (this.currentSubscriptionServiceData.tag === "canva") {
          StoreUtils.commit("form/BUILD_FORM_BODY", {
            region: "NG"
          });
        }
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
      } else {
        this.costError = "Price not valid - try another price";
      }
    }
  }
};
</script>

<style scoped></style>
