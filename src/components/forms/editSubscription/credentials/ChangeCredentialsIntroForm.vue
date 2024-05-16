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
        alt="Add your subscription to the Splitverse"
      />
      <p class="page-title-sm text-center">Share your credentials</p>
      <p class="text-base text-center text-grey-500 mb-8">
        Keep members up to date on your subscription credentials
        <span class="text-white">easily and securely</span>
      </p>

      <div>
        <div class="sub-credential-hold">
          <div class="sub-credential">
            <div class="value">
              <p class="tit">Email</p>
              <p v-if="isSubscriptonEmailEdited" class="subb">
                {{ formBody.newEmail }}
              </p>
              <p v-else class="subb">
                {{
                  currentEditSubscriptionInfo.data.subscriptionAccess
                    .userCredentials.username
                }}
              </p>
              <span v-if="isSubscriptonEmailEdited" class="edited">Edited</span>
            </div>
            <div @click="editEmail" class="icon">
              <img
                src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715677168/splitcash/images/price_astllr.png"
                alt="Edit email"
              />
            </div>
          </div>

          <div class="sub-credential">
            <div class="value">
              <p class="tit">Password</p>
              <p class="subb">*******</p>
              <span v-if="isSubscriptonPasswordEdited" class="edited"
                >Edited</span
              >
            </div>
            <div @click="editPassword" class="icon">
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
      <div class="app-form-base">
        <!-- isSubscriptonEmailEdited: {{ isSubscriptonEmailEdited }} <br /> -->
        <!-- isSubscriptonPasswordEdited: {{ isSubscriptonPasswordEdited }} -->
        <p
          v-if="isSubscriptonEmailEdited || isSubscriptonPasswordEdited"
          class="foot-sub"
        >
          Click to share your new credentials with your members.
        </p>
        <button
          :disabled="!isSubscriptonEmailEdited && !isSubscriptonPasswordEdited"
          @click="submit"
          class="app-btn light-btn"
        >
          Share
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
  name: "ChangeCredentialsIntroForm",
  components: { BackIcon },
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
    isSubscriptonEmailEdited() {
      return this.formBody.newEmail ? true : false;
    },
    isSubscriptonPasswordEdited() {
      return this.formBody.newPassword ? true : false;
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
    editEmail() {
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    },
    editPassword() {
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
