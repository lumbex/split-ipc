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
        What’s your New Email?
      </p>
      <p class="page-sub">
        Kindly provide the
        <span class="text-white font-bold">Email or Username</span> to your
        <span class="text-white font-bold">{{
          currentSubscriptionServiceData.name
        }}</span>
        subscription - make sure its accurate for smooth sailing.
      </p>

      <form action="#" @submit.prevent="submit">
        <div class="">
          <div class="form-group">
            <label for="pageInput">New Email or Username</label>
            <input
              type="text"
              v-model="newEmail"
              required
              v-on:change="isValidInput"
              id="pageInput"
              placeholder="Shalli@pluto.com"
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
              Your data is completely safe and only shared with active members
              of your subscription
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

export default {
  name: "ChangeCredentialEmailForm",
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
      newEmail: "",
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
    isValidInput() {
      // const slotPrice = parseFloat(this.slotPrice)
      const condition = this.newEmail.length >= 3;

      if (condition) {
        this.inputError = "";
        return true;
      } else {
        this.inputError = "Please enter a valid username or email";
        return false;
      }
    },
    submit() {
      if (this.inputError === "") {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          newEmail: this.newEmail
        });

        StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
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
