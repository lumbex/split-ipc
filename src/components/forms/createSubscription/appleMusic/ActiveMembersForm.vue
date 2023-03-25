<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Cost</a
        >
      </div>
      <div class="up-next">
        <p>Up Next: <span>Plan</span></p>
      </div>
    </div>

    <div class="app-form">
      <p class="page-title">How many people are you currently sharing with?</p>
      <p class="page-sub">
        How many people are currently sharing your Apple Music Family plan?
        Select one option.
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
          <span v-else-if="n === 2">1 person</span>
          <span v-else>{{ n - 1 }} people</span>
        </div>
      </div>
      <br />
      <div class="space-filler"></div>

      <div class="app-form-base">
        <!-- <div @click="checked = !checked" class="custom-checkbox">
          <div class="question">
            I confirm that I have an active Apple Music Family subscription
          </div>
          <div class="indicator">
            <span v-if="checked"><CheckedIcon /></span>
            <span v-else><UncheckedIcon /></span>
          </div>
        </div> -->

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
  name: "ActiveMembersForm",
  components: { BackIcon },
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
