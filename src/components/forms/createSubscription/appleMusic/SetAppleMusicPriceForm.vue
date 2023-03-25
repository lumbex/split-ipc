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

    <div class="app-form">
      <p class="page-title">
        How Much do you Pay for this Subscription Every Month?
      </p>
      <p class="page-sub">
        This cost would would be shared equally by all members of this
        subscription in the Splitverse.
      </p>
      <form action="#" @submit.prevent="submit">
        <div class="">
          <div class="form-group">
            <label for="cost">Monthly Cost</label>
            <input
              type="number"
              v-model="cost"
              v-on:input="isValidAmount"
              required
              id="cost"
              placeholder="₦2,600/month"
            />
          </div>
          <p class="form-group-info">
            Enter how much this subscription cost you in Naira
          </p>
          <p v-if="costError.length > 0" class="form-group-error">
            {{ costError }}
          </p>
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
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
export default {
  name: "SetAppleMusicPriceForm",
  components: { BackIcon },
  props: ["serviceTag"],
  data() {
    return { checked: false, cost: "", costError: "" };
  },
  computed: {
    serviceObject() {
      return StoreUtils.rootGetters(
        "service/getServiceObject",
        this.serviceTag
      )[0];
    },
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    }
  },
  mounted() {
    if (this.formBody.paymentMethod === "ng-card") {
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        planPrice: "1500"
      });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    isValidAmount() {
      let maxNairaCost = 12000;
      let minNairaCost = 1499;
      if (this.cost < maxNairaCost && this.cost > minNairaCost) {
        this.costError = "";
        return true;
      } else {
        this.costError =
          "The monthly cost must be between ₦1,500.00 and ₦13,000.00";
        return false;
      }
      // return !!emailAddress.match(regex);
    },
    submit() {
      if (this.isValidAmount() === true) {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          planPrice: this.cost
        });
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
      } else {
        this.costError =
          "The monthly cost must be between ₦1,500.00 and ₦12,000.00";
      }
    }
  }
};
</script>

<style scoped></style>
