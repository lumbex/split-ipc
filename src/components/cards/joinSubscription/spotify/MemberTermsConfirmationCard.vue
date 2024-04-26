<template>
  <div class="app-card-full-page">
    <SpotifyWhiteBgIcon class="mt-10 mb-4" />

    <p class="page-title">Confirm Sharing Terms</p>
    <p class="page-sub">
      To join a
      <span>Spotify</span>
      subscription, you must
      <span>confirm</span>
      that you are family and use the same address as the owner. You will get
      the address after <span>payment</span>.
    </p>

    <div class="space-filler"></div>

    <div class="app-card-base">
      <div @click="checked = !checked" class="custom-checkbox">
        <div class="question">
          I confirm that I’m family to the owner and use the same address.
        </div>
        <div class="indicator">
          <span v-if="checked"> <CheckedIcon /></span>
          <span v-else><UncheckedIcon /></span>
        </div>
      </div>
      <button
        @click="submit"
        :disabled="checked === false"
        class="app-btn light-btn"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script>
import SpotifyWhiteBgIcon from "@/components/icons/SpotifyWhiteBgIcon";
import CheckedIcon from "@/components/icons/CheckedIcon";
import UncheckedIcon from "@/components/icons/UncheckedIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import AppUtils from "@/utils/baseUtils/AppUtils";

export default {
  name: "MemberTermsConfirmationCard",
  components: {
    SpotifyWhiteBgIcon,
    CheckedIcon,
    UncheckedIcon
  },
  data() {
    return {
      copied: false,
      checked: false
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
  },
  methods: {
    // copyToClipboard(data) {
    //   AppUtils.copyToClipBoard(data);
    //   this.copied = true;
    // },
    submit() {
      // StoreUtils.dispatch("subscription/completeSpotifyNewMemberJoin");
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
