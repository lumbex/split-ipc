<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next"></div>
    </div>
    <div class="app-form">
      <img
        class="intro-page-img w-24 mt-0 mb-6 mx-auto"
        src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715174278/splitcash/images/Money_Sack_vaf5fe.png"
        alt="Subscription price confirmation Link change"
      />
      <p class="page-title-sm text-center">Confirm slot price change</p>
      <p class="text-base text-center text-grey-500 mb-8">
        You’re about to change your subscription slot price - kindly confirm
      </p>

      <div>
        <div class="new-price-confirmer">
          <div class="old-price">
            <p class="tag">Old price</p>
            <div class="price-box">
              <AppCurrencyReaderComponent
                :currency="
                  currentEditSubscriptionInfo.data.subscriptionPrice
                    .currentCurrency
                "
              />{{
                currentEditSubscriptionInfo.data.subscriptionPrice.currentPrice
                  | moneyFormat
              }}
            </div>
          </div>
          <div class="joiner">
            <img
              src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715815873/splitcash/images/Line_5_gz6dmh.png"
              alt="join line"
            />
          </div>
          <div class="new-price">
            <p class="tag">New price</p>
            <div class="price-box">
              <AppCurrencyReaderComponent
                :currency="formBody.slotPriceInputCurrency"
              />{{ formBody.slotPrice | moneyFormat }}
            </div>
          </div>
        </div>
      </div>

      <div class="space-filler"></div>

      <ComponentLoader v-if="componentLoader" />
      <div v-else class="app-form-base">
        <div @click="checked = !checked" class="custom-checkbox">
          <div class="question">
            I agree to and accept my new slot price.
          </div>
          <div class="indicator">
            <span v-if="checked"><CheckedIcon /></span>
            <span v-else><UncheckedIcon /></span>
          </div>
        </div>

        <button :disabled="!checked" @click="submit" class="app-btn light-btn">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";
import CheckedIcon from "@/components/icons/CheckedIcon.vue";
import UncheckedIcon from "@/components/icons/UncheckedIcon.vue";
import ComponentLoader from "@/components/loaders/ComponentLoader";

import AppCurrencyReaderComponent from "@/components/forms/utilityComponents/AppCurrencyReaderComponent.vue";

export default {
  name: "ChangePriceConfirmationForm",
  components: {
    BackIcon,
    ComponentLoader,
    AppCurrencyReaderComponent,
    UncheckedIcon,
    CheckedIcon
  },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return { checked: false };
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    componentLoader() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    currentEditSubscriptionInfo() {
      return StoreUtils.rootGetters("subscription/getEditSubscriptionInfo");
    },
    hasPendingPrice() {
      return this.currentEditSubscriptionInfo.data.subscriptionPrice
        .pendingPrice
        ? true
        : false;
    },
    currentServiceTag() {
      return StoreUtils.rootGetters("service/getCurrentServiceTag");
    }
  },
  methods: {
    goBack() {
      this.$router.push(`/edit-subscription/${this.currentServiceTag}`);
    },
    submit() {
      StoreUtils.dispatch("subscription/editSubscriptionPrice");
    }
  }
};
</script>

<style scoped>
.intro-page-img {
  height: 100px;
  width: 100px;
  margin-bottom: 6px;
  margin-top: 8vh;
}
.foot-sub {
  font-size: 13px;
  line-height: 18px;
  color: rgba(235, 235, 245, 0.6);
  margin-bottom: 10px;
}
</style>
