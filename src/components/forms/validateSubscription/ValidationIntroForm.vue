<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Subscription Info</a
        >
      </div>
      <div class="up-next">
        <!-- <p>Up Next: <span>Members</span></p> -->
      </div>
    </div>

    <ComponentLoader v-if="componentLoading" />
      <div class="app-form">
          <p class="page-title">Subscription Validation</p>
          <p class="page-sub">
              Here is how it works...
          </p>
          <div class="block-options">

          </div>
          <div class="space-filler"></div>

          <div class="app-form-base">
              <ComponentLoader v-if="componentLoading" />
              <button
                      v-else
                      @click="submit"
                      class="app-btn light-btn"
              >
                  Begin Validation
              </button>
          </div>
      </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon.vue";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";

export default {
  name: "ValidationIntroForm",
  components: { BackIcon, ComponentLoader },
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

<style scoped></style>
