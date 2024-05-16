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
        :src="currentSubscriptionServiceData.icon_url"
        alt="Subscription Join Link change"
      />
      <p class="page-title-sm text-center">Change your slot price</p>
      <p class="text-base text-center text-grey-500 mb-8">
        You’re about to change how much each member pays you for your
        subscription
      </p>

      <div>
        <div v-if="hasPendingPrice" class="pending-price">
          <div class="icon">
            <img
              src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715812316/splitcash/images/Vector_4_rvuiwu.png"
              alt="pending price info"
            />
          </div>
          <div class="info">
            <p class="lead">Pending slot price</p>
            <p class="val">
              <AppCurrencyReaderComponent
                :currency="
                  currentEditSubscriptionInfo.data.subscriptionPrice
                    .pendingCurrency
                "
              />{{
                currentEditSubscriptionInfo.data.subscriptionPrice.pendingPrice
                  | moneyFormat
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <div class="form-info-box">
          <img
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781753/splitcash/images/info_filled_ual8im.png"
            alt="more info"
          />
          <p>
            The new slot price you set will take effect after the current plan
            expires
            <!-- on the 12th April 2024 -->
          </p>
        </div>

        <button @click="submit" class="app-btn light-btn">
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";
import AppCurrencyReaderComponent from "@/components/forms/utilityComponents/AppCurrencyReaderComponent.vue";

export default {
  name: "ChangePriceIntroForm",
  components: { BackIcon, AppCurrencyReaderComponent },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return { selectedOption: "" };
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
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        activeMembers: 1
      });

      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
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
