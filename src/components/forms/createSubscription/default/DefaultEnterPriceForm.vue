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
      <NairaDollarAmountInputComponent
              v-if="formBody.paymentMethod === 'us-card'"
              :current-subscription-service-data="currentSubscriptionServiceData"
      />
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";
import NairaDollarAmountInputComponent from "@/components/forms/utilityComponents/NairaDollarAmountInputComponent.vue";

export default {
  name: "DefaultEnterPriceForm",
  components: { NairaDollarAmountInputComponent, BackIcon },
  props: {
      currentSubscriptionServiceData: {
          type: Object,
          required: true
      }
  },
  computed: {
      formBody() {
          return StoreUtils.rootGetters("form/getFormBody");
      }
  },
    mounted() {
        if (this.formBody.paymentMethod === "ng-card") {
            StoreUtils.commit("form/BUILD_FORM_BODY", {
              planPrice: this.currentSubscriptionServiceData.cost
            });
            StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
        }
    },
    methods: {
      goBack() {
          StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
      },
      submit() {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          paymentMethod: this.selectedOption
        });

        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
      },
      setDollarCost() {
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
      }
  }
};
</script>

<style scoped></style>
