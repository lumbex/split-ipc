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
        What’s your address?
      </p>
      <p class="page-sub">
        Kindly provide your address - as it is on your
        <span class="text-white font-bold">{{
          currentSubscriptionServiceData.name
        }}</span>
        account.
        <br />
        <br />
      </p>

      <form action="#" @submit.prevent="submit">
        <div class="">
          <div class="form-group">
            <div class="flex flex-row justify-start">
              <div class="input-wrap-hold w-[90%] flex-grow-1 flex-basis-0">
                <div class="">
                  <label class="" for="confirm-pass">Address</label>
                </div>

                <div class="flex flex-row items-center">
                  <input
                    type="text"
                    class="alt"
                    v-model="newAddress"
                    v-on:change="isValidInput"
                    required
                    id="pageInput"
                    :placeholder="addressInputPlaceholder"
                    autocomplete="none"
                  />
                </div>
              </div>

              <div @click="pasteAddress" class="input-action ">
                PASTE<span></span>
              </div>
            </div>
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
              Your data is completely safe and only shared with new members of
              your subscription
            </p>
          </div>
          <button
            type="submit"
            class="app-btn light-btn"
            :disabled="inputError !== ''"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import AppUtils from "@/utils/baseUtils/AppUtils";

export default {
  name: "ChangeAddressForm",
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
      newAddress: "",
      inputError: ""
    };
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    componentLoader() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    addressInputPlaceholder() {
      return `Exactly as it is on ${this.currentSubscriptionServiceData.name}.`;
    }
  },
  methods: {
    async pasteAddress() {
      const textFromClipboard = await AppUtils.grabTextFromClipboard();

      this.newAddress += textFromClipboard;
    },
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_TWO");
    },
    isValidInput() {
      // const condition = this.newPassword === this.confrimNewPassword;
      const condition = this.newAddress.length >= 3;

      if (condition) {
        this.inputError = "";
        return true;
      } else {
        this.inputError = "Please enter a valid address!";
        return false;
      }
    },
    submit() {
      if (this.inputError === "") {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          newAddress: this.newAddress
        });

        StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_TWO");
      }
    }
  }
};
</script>

<style scoped>
.input-action {
  display: flex;
  padding: 18px 6px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  background: #4e4e52;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  margin-top: -10px;
  margin-right: -15px;
  color: #ffffff;
}
</style>
