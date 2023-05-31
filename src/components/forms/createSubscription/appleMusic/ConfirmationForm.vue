<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Billing Date</a
        >
      </div>
      <div class="up-next">
        <p>Up Next: <span>Review</span></p>
      </div>
    </div>
    <div class="app-form">
      <p class="page-title text-3xl text-white mb-2">Confirm you are only sharing Apple Music</p>
      <p class="page-sub">
        Only Apple Music should be shared and not iCloud storage to use this
        service.
      </p>
      <br />
      <img
        src="@/assets/img/apple-confirmation-img.png"
        alt="apple service confirmation image"
        class="page-img"
      />
      <br />
      <div class="space-filler"></div>

      <div class="app-form-base">
        <button @click="submit" class="app-btn light-btn">
          Continue, I've Confirmed
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";

export default {
  name: "ConfirmationForm",
  components: { BackIcon },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    submit() {
      StoreUtils.commit(
        "subscription/SET_CREATE_SUBSCRIPTION_BODY",
        this.formBody
      );
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
