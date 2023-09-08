<template>
  <div class="app-form-wrapper">
      <div>
          <div class="app-form">
              <img
                  class="page-icon mt-0 mb-6 mx-auto"
                  :src="currentSubscriptionServiceData.icon_url"
                  alt="subscription icon"
              />

              <p class="page-title-sm text-center">Having trouble accessing your {{ currentSubscriptionServiceData.name }}?</p>
              <p class="text-base text-center text-grey-500 mb-8">
                  Follow these steps to resolve trouble with accessing your subscription.
              </p>

              <div class="">
                  <div class="troubleshoot-steps">
                      <ul>
                          <li>
                              <div class="number"><span>1</span></div>
                              <div class="point"><p>Check your email for the invite to join the subscription.</p></div>
                          </li>
                          <li>
                              <div class="number"><span>2</span></div>
                              <div class="point"><p>Accept the invite and join the subscription.</p></div>
                          </li>
                          <li>
                              <div class="number"><span>3</span></div>
                              <div class="point"><p>Confirm if you are a member of the subscription from the subscription family page</p></div>
                          </li>
                          <li>
                              <div class="number"><span>4</span></div>
                              <div class="point"><p>Confirm you are in the same region as the subscription you are joining - if you are not, change your region.</p></div>
                          </li>
                          <li>
                              <div class="number"><span>5</span></div>
                              <div class="point"><p>Sign out of “Media Purchases” and sign in again.</p></div>
                          </li>
                          <li>
                              <div class="number"><span>6</span></div>
                              <div class="point"><p>If you are still having issues accessing your subscription, contact support.</p></div>
                          </li>
                      </ul>
                  </div>
              </div>

              <div class="space-filler"></div>

              <div class="app-form-base">
                  <button @click="submit" class="app-btn light-btn">
                      Contact Support
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
    name: "TroubleshootJoinSubscriptionCard",
    components: {},
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
    }
  },
  mounted() { },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    submit() {
        StoreUtils.dispatch("subscription/contactCustomerSupport");
    }
  }
};
</script>

<style scoped>
.page-icon {
    height: 80px;
}
.troubleshoot-steps {
    margin-top: 20px;
}
.troubleshoot-steps ul{}
.troubleshoot-steps ul li{
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
}
.troubleshoot-steps .number{
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 129.412% */
    letter-spacing: -0.408px;
    color: #FFFFFF;
    margin-right: 8px;
}
.troubleshoot-steps .point{
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 133.333% */
    letter-spacing: -0.24px;
    color: #FFFFFF;
}
</style>
