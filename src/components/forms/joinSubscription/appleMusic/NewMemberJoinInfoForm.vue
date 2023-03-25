<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Service</a
        >
      </div>
      <div class="up-next">
        <p>Up Next: <span>How it Works</span></p>
      </div>
    </div>

    <div class="app-form">
      <p class="page-title">What’s your Apple ID Email?</p>
      <p class="page-sub">
        The subscription owner will invite you to their Apple Family via this
        email.
      </p>
      <form action="#" @submit.prevent="submit">
        <div class="form-group">
          <label for="account-no">Email</label>
          <input
            type="email"
            v-model="email"
            v-on:input="isEmail"
            required
            id="email"
            placeholder="stanley.kubric@email.com"
          />
        </div>
        <p class="form-group-info">
          You will receive an invite to the subscription here
        </p>
        <p v-if="emailError.length > 0" class="form-group-error">
          {{ emailError }}
        </p>

        <div class="space-filler"></div>

        <div class="app-form-base">
          <div @click="checked = !checked" class="custom-checkbox">
            <div class="question text-left">
              I confirm that I'm a family member to the subscription owner
            </div>
            <div class="indicator">
              <span v-if="checked"><CheckedIcon /></span>
              <span v-else><UncheckedIcon /></span>
            </div>
          </div>

          <button
            type="submit"
            class="app-btn light-btn"
            :disabled="
              !(email.length > 3 && isEmail(email) === true && checked === true)
            "
          >
            How it Works
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon";
import CheckedIcon from "@/components/icons/CheckedIcon";
import UncheckedIcon from "@/components/icons/UncheckedIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import EmailValidator from "email-validator";
export default {
  name: "NewMemberJoinInfoForm",
  components: { UncheckedIcon, CheckedIcon, BackIcon },
  props: ["serviceTag"],
  data() {
    return { checked: false, email: "", emailError: "" };
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
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    selectOption(n) {
      this.activeMembers = n;
    },
    isEmail() {
      if (EmailValidator.validate(this.email)) {
        this.emailError = "";
        return true;
      } else {
        this.emailError = "Must be a valid email";
        return false;
      }
    },
    submit() {
      if (this.email.length > 3 && this.isEmail(this.email) === true) {
        StoreUtils.dispatch("subscription/sendAppleMusicNewMemberJoinInfo", {
          email: this.email,
          region: this.formBody.region
        });
      } else {
        this.emailError = "Must be a valid email";
      }
    }
  }
};
</script>

<style scoped></style>
