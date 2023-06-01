<template>
    <div class="app-form">
        <p class="page-title text-3xl text-white mb-2">
            <!--                How Much Does this Subscription Cost Monthly?-->
            How Much do you Pay Monthly?
        </p>
        <p class="page-sub">
            This cost would would be shared equally by all members of this
            subscription in the Splitverse.
        </p>
        <form action="#" @submit.prevent="submit">
            <div class="">
                <div class="form-group alt">
                    <label class="px-2" for="cost">Monthly Cost</label>
                    <div class="px-2 flex flex-row justify-start">
                        <div class="flex-shrink-0 flex items-center"><span>{{inputCurrency}}</span></div>
                        <div class="input-wrap-hold w-[90%] flex-grow-1 flex-basis-0">
                            <input
                                type="number"
                                step=".01"
                                class="alt"
                                v-model="cost"
                                v-on:input="isValidAmount"
                                required
                                id="cost"
                                placeholder="0.0/month"
                            />
                        </div>
                        <div @click="swapCurrency" class="swap-curr flex-shrink-0 flex">
                            <SwapCurrencyIcon  class="cursor-pointer" />
                        </div>
                    </div>

                    <div class="input-group-base text-center">
                        <p class="m-0 text-white text-base">{{ viewCurrency }}{{ convertedValue | moneyFormat }}</p>
                    </div>
                </div>

                <p class="form-group-info">
                    Enter how much this subscription cost you
                </p>

                <p v-if="costError.length > 0" class="form-group-error">
                    {{ costError }}
                </p>

                <ComponentLoader v-if="componentLoader" />
                <div v-else class="rate-used">
                    <h4>Rate Used</h4>

                    <div class="rate-holder">
                        <div class="rate-value">
                            <span>$1 =</span>
                        </div>
                        <div class="rate-input">
                            <input
                                type="number"
                                class="alt"
                                v-model="rateUsed"
                                required
                                placeholder="770"
                            />
                        </div>
                        <div class="rate-control">
                            <span>Edit</span>
                        </div>
                    </div>

                </div>
            </div>

            <div class="space-filler"></div>

            <div class="app-form-base">
                <button
                    type="submit"
                    class="app-btn light-btn"
                    :disabled="cost.length <= 0 || isValidAmount() === false"
                >
                    Continue
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import SwapCurrencyIcon from "@/components/icons/SwapCurrencyIcon.vue";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";

export default {
    name: "NairaDollarAmountInputComponent",
    components: {ComponentLoader, SwapCurrencyIcon },
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            rateUsed: 700,
            inputCurrency: "$", // ₦ or $
            viewCurrency: "₦", // ₦ or $
            cost: 0,
            costError: ""
        };
    },
    computed: {
        componentLoader() {
            return StoreUtils.rootGetters("loader/getLoader", "component");
        },
        formBody() {
            return StoreUtils.rootGetters("form/getFormBody");
        },
        convertedValue() {
            return this.inputCurrency === "$"? this.cost * this.rateUsed : this.cost / this.rateUsed
        }
    },
    created() {
        this.fetchSuggestedDollarRate()
    },
    methods: {
        async fetchSuggestedDollarRate() {
            const rate = await StoreUtils.dispatch("subscription/fetchSuggestedDollarRate")
            this.rateUsed = await rate.rate.rate
        },
        swapCurrency() {
            if(this.inputCurrency === "$") {
                this.inputCurrency = "₦";
                this.viewCurrency = "$";
            } else {
                this.inputCurrency = "$"
                this.viewCurrency = "₦";
            }
        },
        goBack() {
            StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
        },
        isValidAmount() {
            if (this.cost > 0) {
                this.costError = "";
                return true;
            } else {
                this.costError =
                    "The monthly cost must be greater than 0";
                return false;
            }
            // return !!emailAddress.match(regex);
        },
        submit() {
            if (this.isValidAmount() === true) {
                const nairaAmount = this.inputCurrency === "$"? this.convertedValue : this.cost

                StoreUtils.commit("subscription/SET_USED_DOLLAR_TO_NAIRA_RATE", this.rateUsed)

                StoreUtils.commit("form/BUILD_FORM_BODY", {
                    planPrice: nairaAmount
                });
                StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
            } else {
                this.costError =
                    "The monthly cost must be greater than 0";
            }
        }
    }
}
</script>

<style scoped>

</style>