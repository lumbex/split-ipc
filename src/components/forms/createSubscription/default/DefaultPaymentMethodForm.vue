<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next">
<!--        <p>Up Next: <span>Region</span></p>-->
      </div>
    </div>

    <div class="app-form">
          <p class="page-title text-3xl text-white mb-2">How do You Pay for This Subscription?</p>
          <p class="page-sub">
              Select the method you use to pay for this {{ currentSubscriptionServiceData.name }}
              subscription.
          </p>
          <div class="block-options">
              <div
                      v-for="(option, index) in availableAppleMusicPaymentMethods"
                      :key="index"
                      @click="selectOne(option)"
                      class="option big flex flex-row gap-2 py-0 px-2  h-10"
                      :class="{ active: option.value === selectedOption }"
              >
                  <img class="h-auto w-12" :src="option.iconUrl" :alt="option.title" />
                  <div class="flex flex-col text-white">
                      <div class="text-l leading-6 mb-1">{{ option.title }}</div>
                      <div class="text-sm leading-4">{{ option.sub }}</div>
                  </div>

                  <span v-if="option.recommended" class="recommended text-[#F05151]"
                  >New</span
                  >
              </div>
          </div>
          <div class="space-filler"></div>

          <div class="app-form-base">

              <button
                      @click="submit"
                      class="app-btn light-btn"
                      :disabled="selectedOption === ''"
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
  name: "DefaultPaymentMethodForm",
  components: { BackIcon },
  props: {
      currentSubscriptionServiceData: {
          type: Object,
          required: true
      }
  },
  data () {
    return {
        selectedOption: "",
        tagsAllowedToSelectPaymentMethod: ["youtube_premium", "canva"],
        // tagsAllowedToSelectPaymentMethod: [""]
    }
  },
  computed: {
      availableAppleMusicPaymentMethods() {
          return StoreUtils.rootGetters(
              "subscription/getAvailableAppleMusicPaymentMethods"
          );
      }
  },
    mounted() {
        if (!this.tagsAllowedToSelectPaymentMethod.includes(this.currentSubscriptionServiceData.tag)){
            if (this.currentSubscriptionServiceData.cost_currency === "NGN") {
                StoreUtils.commit("form/BUILD_FORM_BODY", {
                    paymentMethod: "ng-card",
                    region: "NG"
                });
            }

            if (this.currentSubscriptionServiceData.cost_currency === "USD") {
                StoreUtils.commit("form/BUILD_FORM_BODY", {
                    paymentMethod: "us-card",
                    region: "US"
                });
            }
            StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
        }
    },
    methods: {
      goBack() {
          StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
      },
      selectOne(option) {
          this.selectedOption = option.value;
      },
      submit() {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          paymentMethod: this.selectedOption,
            region: this.selectedOption === "us-card"? "US": "NG"
        });
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
      }
  }
};
</script>

<style scoped></style>
