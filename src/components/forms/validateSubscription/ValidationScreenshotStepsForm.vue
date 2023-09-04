<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next">
        <!-- <p>Up Next: <span>Members</span></p> -->
      </div>
    </div>

    <ComponentLoader v-if="componentLoading" />
      <div class="app-form">
          <p class="page-title">Submit proof for validation</p>
          <p class="page-sub">
              We would like to ensure that your plan is active before we approve it for sharing in the Splitverse.
          </p>
          <div class="block-options">

              <div class="sub-features-hold">
                  <h4 class="ft-title">Follow these steps:</h4>
                  <div class="sub-features">
                      <ul>
                          <li v-for="(validationStep, i) in validationSteps" :key="i">
                              <div class="icon"><img :src="validationStep.icon" alt="feature"></div>
                              <div class="point">{{validationStep.step}}</div>
                          </li>
                      </ul>

                  </div>

                  <ScreenshotPreviewCard />
              </div>



          </div>
          <div class="space-filler"></div>

          <div class="app-form-base">
              <div @click="checked = !checked" class="custom-checkbox">
                  <div class="question">
                      I have taken a screenshot that matches the Sample screenshot
                  </div>
                  <div class="indicator">
                      <span v-if="checked"><CheckedIcon /></span>
                      <span v-else><UncheckedIcon /></span>
                  </div>
              </div>


              <button @click="submit" :disabled="checked === false" class="app-btn light-btn">
                  Submit Evidence
              </button>
          </div>
      </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon.vue";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import UncheckedIcon from "@/components/icons/UncheckedIcon.vue";
import CheckedIcon from "@/components/icons/CheckedIcon.vue";
import ScreenshotPreviewCard from "@/components/cards/validateSubscription/ScreenshotPreviewCard.vue";

export default {
  name: "ValidationScreenshotStepsForm",
  components: {ScreenshotPreviewCard, CheckedIcon, UncheckedIcon, BackIcon, ComponentLoader },
  props: ["serviceTag"],
  data() {
    return {
        checked: false,
        validationSteps: [
            {
                no: "1",
                icon: "https://res.cloudinary.com/cloud-web-assets/image/upload/v1693515530/splitcash/images/emojis/image_612_t0m9sh.png",
                step: "Login to your Netflix account"
            },
            {
                no: "2",
                icon: "https://res.cloudinary.com/cloud-web-assets/image/upload/v1693515530/splitcash/images/emojis/image_611_dobaqa.png",
                step: "Go to accounts page - you can find it in the top right corner of the page"
            },
            {
                no: "3",
                icon: "https://res.cloudinary.com/cloud-web-assets/image/upload/v1693515530/splitcash/images/emojis/image_610_njfemz.png",
                step: "You are taking 2 screenshots on this page"
            },
            {
                no: "4",
                icon: "https://res.cloudinary.com/cloud-web-assets/image/upload/v1693515530/splitcash/images/emojis/image_609_sqntpf.png",
                step: "Take a screenshot of the top half of the page"
            },
            {
                no: "5",
                icon: "https://res.cloudinary.com/cloud-web-assets/image/upload/v1693515530/splitcash/images/emojis/image_608_zdxiwo.png",
                step: "Scroll to the bottom and take another screenshot"
            }
        ]
    };
  },
  computed: {
    componentLoading() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    serviceObject() {
      return StoreUtils.rootGetters(
        "service/getServiceObject",
        this.serviceTag
      )[0];
    },
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    currentSubscriptionTerms() {
      return StoreUtils.rootGetters("subscription/getCurrentSubscriptionTerms");
    }
  },
  created() {
    this.cost = this.currentSubscriptionTerms.planPrice;
  },
  methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },

    submit() {
        StoreUtils.dispatch("subscription/completeSubscriptionVerification");
    }
  }
};
</script>

<style scoped></style>
