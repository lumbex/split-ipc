<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Intro</a
        >
      </div>
      <div class="up-next">
        <p>Up Next: <span>Invite Link</span></p>
      </div>
    </div>

    <div class="app-form">
      <p class="page-title">How many people are on your Plan?</p>
      <p class="page-sub">
        Select the Total
        <span class="text-white font-bold">Spotify Premium</span> subscription
        is shared right now.
      </p>
      <div class="grid-options">
        <div
          v-for="n in serviceObject.max_capacity"
          :key="n"
          @click="selectOption(n)"
          class="option"
          :class="{ active: n === activeMembers }"
        >
          <span v-if="n === 1">Just Me</span>
          <span v-else-if="n === 6">We’re full</span>
          <span v-else>{{ n }} of us</span>
        </div>
      </div>
      <br />
      <div class="space-filler"></div>

      <div class="app-form-base">
        <div @click="checked = !checked" class="custom-checkbox">
          <div class="question">
            I confirm that I own and pay for this Spotify Premium Subscription.
          </div>
          <div class="indicator">
            <span v-if="checked"><CheckedIcon /></span>
            <span v-else><UncheckedIcon /></span>
          </div>
        </div>

        <button
          @click="submit"
          class="app-btn light-btn"
          :disabled="activeMembers === '' || checked === false"
        >
          Continue to Plan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon";
import CheckedIcon from "@/components/icons/CheckedIcon";
import UncheckedIcon from "@/components/icons/UncheckedIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
export default {
  name: "SpotifyActiveMembersForm",
  components: { BackIcon, CheckedIcon, UncheckedIcon },
  props: ["serviceTag"],
  data() {
    return { activeMembers: "", checked: false };
  },
  computed: {
    serviceObject() {
      return StoreUtils.rootGetters(
        "service/getServiceObject",
        this.serviceTag
      )[0];
    }
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    selectOption(n) {
      this.activeMembers = n;
    },
    submit() {
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        activeMembers: this.activeMembers
      });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped></style>
