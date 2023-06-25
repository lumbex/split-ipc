<template>
  <div class="app-form-wrapper">
      <div>
          <div class="app-form">
              <img
                  class="w-36 mt-0 mb-6 mx-auto"
                  src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1687637970/splitcash/images/Earth_vbbsnz.png"
                  alt="Change your store region image"
              />
              <p class="page-title-sm text-center">Change Your Region</p>
              <p class="text-base text-center text-grey-500 mb-8">
                  You have to change your App Store region to <span class="text-white">{{ currentSubscriptionRegion }}</span> before you can join this subscription
              </p>

              <div class="">
                  <h4 class="ft-title">Here is how:</h4>
                  <div class="sub-features">
                      <ul>
                          <li>
                              <div class="icon"><span>1</span></div>
                              <div class="point"><p>Open the "App Store" app and click on your profile</p></div>
                          </li>
                          <li>
                              <div class="icon"><span>2</span></div>
                              <div class="point"><p>Click on "Your Name" and then "Country/Region"</p></div>
                          </li>
                          <li>
                              <div class="icon"><span>3</span></div>
                              <div class="point"><p>Click "Change Country or Region" and select "{{ currentSubscriptionRegion }}"</p></div>
                          </li>
                      </ul>

                  </div>
              </div>
<!--              <div class="block-steps">-->
<!--                  <p></p>-->
<!--                  <div class="how-step"></div>-->
<!--              </div>-->
              <div class="space-filler"></div>

              <div class="app-form-base">
                  <div @click="checked = !checked" class="custom-checkbox">
                      <div class="question">
                          I have switched my App Store region <br /> to {{currentSubscriptionRegion}}.
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

export default {
  name: "ChangeRegionForm",
    components: {CheckedIcon, UncheckedIcon},
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
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          region: this.currentSubscriptionRegion
        });
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");

    }
  }
};
</script>

<style scoped></style>
