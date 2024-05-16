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
      <p class="page-title text-3xl text-white mb-2">
        What's your {{ currentSubscriptionServiceData.name }} credentials?
      </p>
      <p class="page-sub">
        Kindly input your credentials used on your
        <span class="text-white">{{
          currentSubscriptionServiceData.name | firstCaseCapital
        }}</span>
        subscription.
      </p>

      <!-- <img
            class="intro-page-img mt-0 mb-6 mx-auto"
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781762/splitcash/images/Calendar_gzbsdn.png"
            alt="Calender icon"
            />
            <p class="page-title-sm text-center">What's your {{currentSubscriptionServiceData.name}} credentials?</p>
            <p class="text-base text-center text-grey-500 mb-8">
            Members will only be able to join after your next renewal.
            </p> -->

      <form action="#" @submit.prevent="submit">
        <div class="">
          <div class="form-group">
            <label for="pageInput">Subscription email/username</label>
            <input
              type="text"
              v-model="subscriptionUsername"
              required
              id="subscriptionUsername"
              placeholder="jhon@gmail.com"
              autocomplete="none"
            />
          </div>

          <div class="form-group">
            <label for="pageInput">Subscription password</label>
            <input
              type="password"
              v-model="subscriptionPassword"
              required
              id="subscriptionPassword"
              placeholder="******"
              autocomplete="none"
            />
          </div>

          <div class="form-group">
            <label for="pageInput">Confirm subscription password</label>
            <input
              type="password"
              v-model="confrimSubscriptionPassword"
              v-on:change="isValidPasswordInput"
              required
              placeholder="******"
              autocomplete="none"
            />
          </div>

          <p v-if="inputError.length > 0" class="form-group-error">
            {{ inputError }}
          </p>
        </div>
        <div class="space-filler"></div>

        <div class="app-form-base">
          <div class="form-info-box">
            <img
              src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1714034423/splitcash/images/Shield_ydygge.png"
              alt="more info"
            />
            <p>
              Your credentials are verified and securely shared with paying
              members of your subscription
            </p>
          </div>
          <button
            type="submit"
            class="app-btn light-btn"
            :disabled="
              inputError !== '' ||
                subscriptionPassword === '' ||
                subscriptionUsername === '' ||
                confrimSubscriptionPassword === ''
            "
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
  name: "SubscriptionCredentialsForm",
  components: {
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
      subscriptionUsername: "",
      subscriptionPassword: "",
      confrimSubscriptionPassword: "",
      inputError: ""
    };
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    componentLoader() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    isValidPasswordInput() {
      // const slotPrice = parseFloat(this.slotPrice)
      const condition =
        this.subscriptionPassword === this.confrimSubscriptionPassword;

      if (condition) {
        this.inputError = "";
        return true;
      } else {
        this.inputError = "Your subscription passwords do not match!";
        return false;
      }
    },
    submit() {
      if (this.inputError === "") {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          subscriptionUsername: this.subscriptionUsername,
          subscriptionPassword: this.subscriptionPassword
        });

        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
      }
    }
  }
};
</script>

<style scoped>
.number-currency-input {
  display: flex;
  padding: 18px 6px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  background: #4e4e52;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  margin-right: 4px;
  color: #ffffff;
}
</style>
