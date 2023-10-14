<template>
  <div class="app-form-wrapper">
    <div class="app-form">
        <img
                class="w-24 mt-0 mb-6 mx-auto"
                src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1697219609/splitcash/images/figure.wave_zjenzm.png"
                alt="Add your subscription to the Splitverse"
        />
      <p class="page-title-sm text-center">We’ve switched things up</p>
<!--      <p class="text-base text-center text-grey-500 mb-8">-->
<!--          Earn cash monthly by sharing <span class="text-white">your {{ currentSubscriptionServiceData.name }}</span> subscription with friends in the Splitverse.-->
<!--      </p>-->
        <div class="block-options">
            <div class="option intro flex flex-row gap-2 p-2 h-10">
                <img
                        class="h-auto w-10 "
                        src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253332/splitcash/images/banknote_pfdqtr.png"
                        alt="connect and share"
                />
                <div class="text-base text-white">
                    Now, you set how much a slot in your subscription is and earn cash every month for it.
                </div>
            </div>

            <div class="option intro flex flex-row gap-2 p-2 h-10">
                <img
                        class="h-auto w-10 "
                        src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253226/splitcash/images/Control_mhnzfl.png"
                        alt="connect and share"
                />
                <div class="text-base text-white">
                    As the owner, you’re responsible for managing the subscription
                </div>
            </div>

<!--            <p>currentSubscriptionTerms {{ currentSubscriptionTerms }}</p>-->

            <div class="option intro flex flex-row gap-2 p-2 h-10">
                <img
                        class="h-auto w-10 "
                        src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253214/splitcash/images/Percentage_ydjgve.png"
                        alt="connect and share"
                />
                <div class="text-base text-white">
                    A 10% fee applies to all members payments received
                </div>
            </div>
        </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <button @click="submit" class="app-btn light-btn">
          Sweet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";

export default {
  name: "UpdateSubscriptionIntroForm",
  components: {},
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
  computed: {
      currentSubscriptionTerms() {
      return StoreUtils.rootGetters(
        "subscription/getCurrentSubscriptionTerms"
      );
    }
  },
    created() {
        if (this.currentSubscriptionTerms.migratingSub === "N") {
            StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
        }
    },
    methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
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
    margin-bottom: 10px;
    margin-top: 12vh;
}
</style>
