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
      <img
        class="intro-page-img w-24 mt-0 mb-6 mx-auto"
        src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715174277/splitcash/images/Padlock_2_vufijd.png"
        alt="Subscription Join Link change"
      />
      <p class="page-title-sm text-center">Share your join link</p>
      <p class="text-base text-center text-grey-500 mb-8">
        Keep your subscription join link up to date
        <span class="text-white">easily and securely</span>
      </p>

      <div>
        <div class="sub-credential-hold">
          <div class="sub-credential">
            <div class="value">
              <p class="tit">Join Link</p>
              <p v-if="isSubscriptionJoinLinkEdited" class="subb">
                {{ formBody.newJoinLink }}
              </p>
              <p v-else class="subb">
                {{
                  currentEditSubscriptionInfo.data.subscriptionAccess.joinLink
                }}
              </p>
              <span v-if="isSubscriptionJoinLinkEdited" class="edited"
                >Edited</span
              >
            </div>
            <div @click="editJoinLink" class="icon">
              <img
                src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715677168/splitcash/images/price_astllr.png"
                alt="Edit email"
              />
            </div>
          </div>

          <div class="sub-credential">
            <div class="value">
              <p class="tit">Address</p>
              <p v-if="isSubscriptionJoinLinkEdited" class="subb">
                {{ formBody.newAddress }}
              </p>
              <p v-else class="subb">
                {{
                  currentEditSubscriptionInfo.data.subscriptionAccess.address
                }}
              </p>
              <span v-if="isSubscriptionAddressEdited" class="edited"
                >Edited</span
              >
            </div>
            <div @click="editAddress" class="icon">
              <img
                src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715677168/splitcash/images/price_astllr.png"
                alt="Edit email"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="space-filler"></div>

      <ComponentLoader v-if="componentLoader" />
      <div v-else class="app-form-base">
        <p
          v-if="isSubscriptionJoinLinkEdited || isSubscriptionAddressEdited"
          class="foot-sub"
        >
          Click to save your new subscription join link.
        </p>

        <button
          :disabled="
            !isSubscriptionJoinLinkEdited && !isSubscriptionAddressEdited
          "
          @click="submit"
          class="app-btn light-btn"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import BackIcon from "@/components/icons/BackIcon";
import ComponentLoader from "@/components/loaders/ComponentLoader";

export default {
  name: "ChangeLinkIntroForm",
  components: { BackIcon, ComponentLoader },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return { selectedOption: "" };
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    componentLoader() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    isSubscriptionJoinLinkEdited() {
      return this.formBody.newJoinLink ? true : false;
    },
    isSubscriptionAddressEdited() {
      return this.formBody.newAddress ? true : false;
    },
    currentEditSubscriptionInfo() {
      return StoreUtils.rootGetters("subscription/getEditSubscriptionInfo");
    },
    currentServiceTag() {
      return StoreUtils.rootGetters("service/getCurrentServiceTag");
    }
  },
  methods: {
    goBack() {
      this.$router.push(`/edit-subscription/${this.currentServiceTag}`);
    },
    editJoinLink() {
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    },
    editAddress() {
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_TWO");
    },
    submit() {
      StoreUtils.dispatch("subscription/editSubscriptionCredentials");
    }
  }
};
</script>

<style scoped>
.intro-page-img {
  height: 100px;
  width: 100px;
  margin-bottom: 6px;
  margin-top: 8vh;
}
.foot-sub {
  font-size: 13px;
  line-height: 18px;
  color: rgba(235, 235, 245, 0.6);
  margin-bottom: 10px;
}
</style>
