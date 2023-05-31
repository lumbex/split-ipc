<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next">
<!--        <p>Up Next: <span>Plan</span></p>-->
      </div>
    </div>

    <div class="app-form">
      <p class="page-title text-3xl text-white mb-2">How many people are you currently sharing with?</p>
      <p class="page-sub">
        How many people are currently sharing your {{ currentSubscriptionServiceData.name }} plan?
        Select one option.
      </p>
      <div class="grid-options">
        <div
          v-for="n in currentSubscriptionServiceData.max_capacity"
          :key="n"
          @click="selectOption(n)"
          class="option"
          :class="{ active: n === activeMembers }"
        >
          <span v-if="n === 1">Just Me</span>
          <span v-else-if="n === 2">1 person</span>
          <span v-else>{{ n - 1 }} people</span>
        </div>
      </div>
      <br />
      <div class="space-filler"></div>

      <div class="app-form-base">

        <button
          @click="submit"
          class="app-btn light-btn"
          :disabled="!(activeMembers !== '')"
        >
          Continue to Plan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
export default {
  name: "DefaultActiveMembersForm",
  components: { BackIcon },
  props: {
      currentSubscriptionServiceData: {
          type: Object,
          required: true
      }
  },
  data() {
    return { activeMembers: "", checked: false };
  },
  computed: {

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
