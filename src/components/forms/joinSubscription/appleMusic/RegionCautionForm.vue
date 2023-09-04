<template>
  <div class="app-form-wrapper">
      <div>
          <div class="app-form">
              <img
                  class="w-36 mt-0 mb-6 mx-auto"
                  src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1687637970/splitcash/images/Earth_vbbsnz.png"
                  alt="Change your store region image"
              />
              <p class="page-title-sm text-center">Confirm Apple Store Region</p>
              <p class="text-base text-center text-grey-500 mb-8">
                  Kindly Confirm that you’re in the right region (<span class="text-white">{{ currentSubscriptionRegion }}</span>).
                  There will be no refund if you are in the wrong region.
              </p>

              <div class="">
                  <div class="caution-alert">
                      <div class="icon">
                          <CautionIcon />
                      </div>
                      <div class="text">
                          <p>You can only join 2 Apple families in a year so be very sure you’re in the right region.</p>
                      </div>
                  </div>
              </div>

              <div class="space-filler"></div>

              <div class="app-form-base">
                  <div @click="checked = !checked" class="custom-checkbox">
                      <div class="question">
                          I'm sure im in the right region ({{currentSubscriptionRegion}}).
                      </div>
                      <div class="indicator">
                          <span v-if="checked"><CheckedIcon /></span>
                          <span v-else><UncheckedIcon /></span>
                      </div>
                  </div>
                  <button @click="submit" class="app-btn" :disabled="!(checked === true)">
                      Confirm
                  </button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import NotificationUtils from "../../../../utils/baseUtils/NotificationUtils";
import UncheckedIcon from "@/components/icons/UncheckedIcon.vue";
import CheckedIcon from "@/components/icons/CheckedIcon.vue";
import CautionIcon from "@/components/icons/CautionIcon.vue";

export default {
  name: "RegionCautionForm",
    components: {CautionIcon, CheckedIcon, UncheckedIcon},
  props: {
      currentSubscriptionServiceData: {
          type: Object,
          required: true
      }
  },
  data() {
    return { selectedOption: "", regionError: "", checked: false };
  },
  computed: {
    availableAppleMusicRegion() {
      return StoreUtils.rootGetters(
        "subscription/getAvailableAppleMusicRegion"
      );
    },
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    currentSubscriptionRegion() {
      return StoreUtils.rootGetters(
        "subscription/getCurrentSubscriptionRegion"
      );
    }
  },
  mounted() { },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    submit() {
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped>
.caution-alert {
    display: flex;
    flex-direction: row;
    padding: 8px 12px;
    align-items: center;
    background-color: #2C2C2E;
    color: #BDBDBD;
    border-radius: 6px;
}
.caution-alert .icon{
    margin-right: 8px;
}
.caution-alert .icon svg{
    fill: #BDBDBD;
    width: 32px;
    height: 32px;
}
.caution-alert .text{}
.caution-alert .text p{
    margin: 0;
}
</style>
