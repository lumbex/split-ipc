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
          <div class="verification-intro">
              <SubVerificationIcon />
              <p class="page-lead">Subscription Verification</p>
              <p class="page-sub">You need to provide evidence to proof your ownership of this subscription.</p>
          </div>

          <div class="space-filler"></div>

          <div class="app-form-base">
              <button
                      @click="submit"
                      class="app-btn light-btn"
              >
                  Begin Verification
              </button>
          </div>
      </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon.vue";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import SubVerificationIcon from "@/components/icons/SubVerificationIcon.vue";

export default {
  name: "ValidationIntroForm",
  components: {SubVerificationIcon, BackIcon, ComponentLoader },
  props: ["serviceTag"],
  data() {
    return { checked: false, cost: "", costError: "" };
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

</style>
