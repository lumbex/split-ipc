<template>
  <div class="app-card-full-page">
    <AppleWhiteBgIcon class="mt-10 mb-4" />

    <p class="page-title">Send an Invite</p>
    <p class="page-sub">
      Invite new member to join your Apple Music Family subscription using their
      email provided below on iMessage.
    </p>

    <div class="space-filler"></div>

    <div class="app-card-base">
      <ComponentLoader v-if="componentLoader" />
      <div
        v-else
        @click="copyToClipboard(newMemberJoinInfoData.joinInfo.email)"
        class="member-email-card"
      >
        <div class="top">
          <div class="left">
            <EmailNotificationIcon />
            <p>{{ newMemberJoinInfoData.joinInfo.email }}</p>
          </div>

          <CopyIconAlt />
        </div>
        <p>Tap anywhere to copy the email address</p>
      </div>

      <button @click="inviteSent" class="app-btn light-btn">
        I’ve Sent an Invite
      </button>
    </div>
  </div>
</template>

<script>
import AppleWhiteBgIcon from "@/components/icons/AppleWhiteBgIcon";
import EmailNotificationIcon from "@/components/icons/EmailNotificationIcon";
import CopyIconAlt from "@/components/icons/CopyIconAlt";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import AppUtils from "@/utils/baseUtils/AppUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader";
export default {
  name: "SetupNewJoinMemberCard",
  components: {
    ComponentLoader,
    CopyIconAlt,
    EmailNotificationIcon,
    AppleWhiteBgIcon
  },
  data() {
    return {
      copied: false
    };
  },
  computed: {
    componentLoader() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    newMemberJoinInfoData() {
      return StoreUtils.rootGetters("subscription/getNewMemberJoinInfo");
    }
  },
  created() {
    StoreUtils.commit("loader/SET_COMPONENT_LOADER", true);
    StoreUtils.dispatch("subscription/fetchNewMemberJoinInfo");
  },
  methods: {
    copyToClipboard(data) {
      AppUtils.copyToClipBoard(data);
      this.copied = true;
    },
    inviteSent() {
      StoreUtils.dispatch("subscription/completeAppleMusicNewMemberSetup");
    }
  }
};
</script>

<style scoped></style>
