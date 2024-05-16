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
        class="intro-page-img mt-0 mb-6 mx-auto"
        src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781749/splitcash/images/File_vfljid.png"
        alt="Settlements icon"
      />
      <p class="page-title-sm text-center">Sharing guidelines</p>
      <p class="text-base text-center text-grey-500 mb-8">
        Here’s what you need to know about sharing your
        <span class="text-white">{{
          currentSubscriptionServiceData.name | firstCaseCapital
        }}</span>
        subscription in the Splitverse.
      </p>

      <div class="block-options">
        <div
          v-for="(guideline, index) in getSubscriptionGuidelinesFromType(
            currentSubscriptionServiceData.join_type
          )"
          :key="index"
          class="option intro flex flex-row gap-2 p-2 h-10"
        >
          <img
            class="h-auto w-6"
            :src="guideline.iconUrl"
            alt="guideline icon"
          />
          <div class="guideline-point text-white">
            {{ guideline.point }}
          </div>
        </div>
      </div>

      <div class="space-filler"></div>

      <div class="app-form-base">
        <button @click="submit" class="app-btn light-btn">Okay, got it</button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";

import BackIcon from "@/components/icons/BackIcon.vue";

export default {
  name: "SharingGuidelinesForm",
  components: { BackIcon },
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedOption: "",
      checked: false,
      guidelines: {
        host_invite: [
          {
            iconUrl:
              "https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781751/splitcash/images/Verify_1_glpiuz.png",
            point:
              "After verification, your subscription is open for people to join"
          },
          {
            iconUrl:
              "https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781745/splitcash/images/notification_toizhy.png",
            point:
              "You will be notified to send new members invitation to join your subscription"
          }
        ],
        instant_access: [
          {
            iconUrl:
              "https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781751/splitcash/images/Verify_1_glpiuz.png",
            point:
              "After verification, your subscription is open for people to join"
          },
          {
            iconUrl:
              "https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781744/splitcash/images/Link_dbcfoc.png",
            point: "New members join automatically with your invite link. "
          },
          {
            iconUrl:
              "https://res.cloudinary.com/cloud-web-assets/image/upload/v1714047016/splitcash/images/Edit_qfsop8.png",
            point:
              "Keep your invite link updated to ensure smooth join process for members"
          }
        ],
        member_get_access: [
          {
            iconUrl:
              "https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781751/splitcash/images/Verify_1_glpiuz.png",
            point:
              "After verification, your subscription slots are public for people to join"
          },
          {
            iconUrl:
              "https://res.cloudinary.com/cloud-web-assets/image/upload/v1714046894/splitcash/images/Lock_Open_dd7tfq.png",
            point:
              "Members access your subscription with the credentials you provided"
          },
          {
            iconUrl:
              "https://res.cloudinary.com/cloud-web-assets/image/upload/v1714047016/splitcash/images/Edit_qfsop8.png",
            point:
              "Keep your subscription credentials updated  to ensure smooth join process for members"
          }
        ]
      }
    };
  },
  created() {
    // this.checkBillingDate();
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    getSubscriptionGuidelinesFromType(subType) {
      return this.guidelines[subType];
    },
    submit() {
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped>
.intro-page-img {
  height: 80px;
  width: 80px;
  margin-bottom: 8px;
  margin-top: 4vh;
}
.guideline-point {
  font-size: 14px;
}
</style>
