<template>
  <div class="app-form-wrapper">
      <div>
          <div class="top-nav">
              <div class="go-back">
                  <a><span class="icon"></span> </a>
              </div>
              <div class="up-next">
                  <p>Up Next: <span>Email</span></p>
              </div>
          </div>
          <div class="app-form">
              <p class="page-title">Confirm your Apple Store Region</p>
              <p class="page-sub">
<!--                  This is the location of your Apple Store. -->
                  All members must be in the same region to share this subscription. <br />
                  <br />
                  Select your region.
              </p>
<!--              <p>currentSubscriptionServiceData: {{currentSubscriptionServiceData}}</p> <br /> <br />-->
<!--              <p>currentSubscriptionRegion: {{ currentSubscriptionRegion }}</p>-->

              <div class="block-options">
                  <div
                          v-for="(region, index) in availableAppleMusicRegion"
                          :key="index"
                          @click="selectOne(region)"
                          class="option flex flex-row gap-2 p-2"
                          :class="{ active: region.value === selectedOption }"
                  >
                      <img
                              class="h-8 w-8 rounded-full"
                              :src="region.iconUrl"
                              :alt="region.title"
                      />
                      <div class="">{{ region.title }}</div>

                      <span v-if="region.recommended" class="recommended">Recommended</span>
                  </div>

                  <p class="mt-2"><span class="font-bold">HOW TO CHECK</span>: Settings app > Your name > Payment & Shipping</p>
              </div>
              <div class="space-filler"></div>

              <div class="app-form-base">
                  <button
                          @click="submit"
                          class="app-btn light-btn"
                          :disabled="selectedOption === ''"
                  >
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

export default {
  name: "SelectRegionForm",
  props: {
      currentSubscriptionServiceData: {
          type: Object,
          required: true
      }
  },
  data() {
    return { selectedOption: "", regionError: "" };
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
  mounted() {
    if (this.formBody.paymentMethod === "ng-card") {
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        planPrice: "1500",
        region: "NG"
      });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    selectOne(region) {
      this.selectedOption = region.value;
    },
    isValidRegion() {
      if (this.selectedOption !== this.currentSubscriptionRegion) {
        this.regionError =
          "Your region doesn't match with that of this subscription";
        return false;
      } else {
        return true;
      }
      // return !!emailAddress.match(regex);
    },
    submit() {
      if (this.isValidRegion() === true) {
        StoreUtils.commit("form/BUILD_FORM_BODY", {
          region: this.selectedOption
        });
        StoreUtils.commit("form/INCREASE_FORM_STAGE_BY", 2);
      } else {
        // NotificationUtils.addNotificationSlide(
        //   `Only users in ${this.currentSubscriptionRegion} region can use this subscription. Be sure to change your region before joining this sub.`,
        //   NotificationUtils.type.WARNING
        // );
          StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");

      }
    }
  }
};
</script>

<style scoped></style>
