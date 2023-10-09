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
      <p class="page-title text-3xl text-white mb-2">How many people are on your plan?</p>
      <p class="page-sub">
          Select the <span class="text-white">total</span> number of people sharing your <span class="text-white">{{ currentSubscriptionServiceData.name }}</span> plan currently.
          <br /> <br /> Select one option.
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
          <span v-else-if="n === currentSubscriptionServiceData.max_capacity">We're full</span>
          <span v-else>{{ n  }}  of us</span>
        </div>
      </div>
      <br />
      <div class="space-filler"></div>

      <div class="app-form-base">
          <div v-if="activeMembers !== ''" class="form-info-box">
              <img
                      src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696254382/splitcash/images/info.square.fill_xwatzk.png"
                      alt="more info" />
              <p> There are {{ availableSlots }} available slots in your subscription</p>

          </div>

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
      availableSlots () {
          return this.currentSubscriptionServiceData.max_capacity - this.activeMembers
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
