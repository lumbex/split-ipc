<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next">
        <!--        <p>Up Next: <span>Plan</span></p>-->
      </div>
    </div>

    <div class="app-form">
      <p class="page-title">
        Enter your Spotify Home Address.
      </p>
      <p class="page-sub">
        This address is used by new members to join your subscription after
        making payment.
      </p>

      <form action="#" @submit.prevent="submit">
        <div class="">
          <div class="form-group">
            <label for="pageInput">Your Address</label>
            <input
              type="text"
              v-model="pageInput"
              required
              id="pageInput"
              :placeholder="addressInputPlaceholder"
            />
          </div>
          <!-- <p class="form-group-info">
            You can find this address in the "Manage Members" section of your
            Spotify account.
          </p> -->
          <p v-if="inputError.length > 0" class="form-group-error">
            {{ inputError }}
          </p>
          <div class="flex justify-center mt-4 mb-4">
            <a
              class="flex flex-row text-grey justify-center items-center rounded-lg bg-white text-sm py-1 pl-1 pr-2 fill-grey"
              @click="
                openUrlInBrowser('https://www.spotify.com/ph-en/account/family')
              "
            >
              <ArrowUpSmIcon /> Open Spotify Web
            </a>
          </div>
        </div>

        <div class="space-filler"></div>

        <div class="app-form-base">
          <div class="custom-checkbox">
            <div class="indicator">
              <span><PadLockIcon /></span>
            </div>
            <div class="text-sm">
              Your data is safe and only shared with members when joining your
              subscription.
            </div>
          </div>

          <button
            type="submit"
            class="app-btn light-btn"
            :disabled="pageInput.length < 4"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon.vue";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import PadLockIcon from "../../icons/PadLockIcon.vue";
import ArrowUpSmIcon from "../../icons/ArrowUpSmIcon.vue";
export default {
  name: "SubscriptionHomeAddressForm",
  components: { BackIcon, PadLockIcon, ArrowUpSmIcon },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checked: false,
      pageInput: "",
      inputError: ""
    };
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    addressInputPlaceholder() {
      return `Exactly as it is on ${this.currentSubscriptionServiceData.name}.`;
    }
  },
  methods: {
    openUrlInBrowser(url) {
      const message = {
        messageAction: "open_url_in_browser",
        messageBody: JSON.stringify({ url: url })
      };
      StoreUtils.dispatch("ipc/postMessage", message);
    },
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    isValidInput() {
      if (this.pageInput.length >= 4) {
        this.inputError = "";
        return true;
      } else {
        this.inputError = `Address is invalid. Be sure to enter your address exactly how it is on ${this.currentSubscriptionServiceData.name}`;
        return false;
      }
    },
    submit() {
      if (this.isValidInput() === true) {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          address: this.pageInput
        });
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
      }
    }
  }
};
</script>

<style scoped></style>
