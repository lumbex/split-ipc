<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Region</a
        >
      </div>
      <div class="up-next">
        <p>Up Next: <span>Members</span></p>
      </div>
    </div>

<!--      <p>paymentMethod {{ formBody.paymentMethod  }}</p>-->
    <NairaDollarAmountInputComponent :current-subscription-service-data="currentSubscriptionServiceData" />
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import NairaDollarAmountInputComponent from "@/components/forms/utilityComponents/NairaDollarAmountInputComponent.vue";
export default {
  name: "SetAppleMusicPriceForm",
  components: {NairaDollarAmountInputComponent, BackIcon },
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
  data() {
    return { checked: false, cost: "", costError: "" };
  },
  computed: {
      formBody() {
          return StoreUtils.rootGetters("form/getFormBody");
      }
  },
  mounted() {
    if (this.formBody.paymentMethod === "ng-card") {
      // StoreUtils.commit("form/BUILD_FORM_BODY", {
      //   planPrice: "1500"
      // });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
