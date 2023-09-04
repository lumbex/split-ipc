<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <!-- <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Members</a
        > -->
      </div>
      <div class="up-next"></div>
    </div>
    <div class="app-form">
      <p class="page-title">Just checking in</p>
      <p class="page-sub">
          Just to be super duper sure! kindly confirm if these details are true about your subscription.
      </p>
      <div class="block-options">
          <AppCheckboxGroup :items="items" @on-change="onChange" />
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">
        <ComponentLoader v-if="componentLoading" />
        <button
          v-else
          @click="submit"
          class="app-btn light-btn"
          :disabled="!allBoxesAreChecked"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import AppCheckboxGroup from "@/components/forms/utilityComponents/AppCheckboxGroup.vue";

export default {
  name: "SubscriptionInfoConfirmationForm",
  components: {AppCheckboxGroup, ComponentLoader },
  data() {
    return {
        items: [
            {
                label: 'There are Only 3 members on this subscription',
                value: '1',
            },
            {
                label: 'I pay a fee of ₦7,250.00/month',
                value: '2',
            }
        ],
        checkboxData: []
    };
  },
  props: ["serviceTag"],
  computed: {
    availablePlanOptions() {
      return StoreUtils.rootGetters("subscription/getAvailablePlans");
    },
    componentLoading() {
      return StoreUtils.rootGetters("loader/getLoader", "component");
    },
    currentSubscriptionTerms() {
      return StoreUtils.rootGetters("subscription/getCurrentSubscriptionTerms");
    },
    allBoxesAreChecked() {
        return this.checkboxData.every(checkbox =>  checkbox.checked === true);
    },
  },
    created() {
        StoreUtils.dispatch("subscription/fetchCurrentSubscriptionRef");
    },
    methods: {
    goBack() {
      StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
    },
    onChange(itemsData) {
        this.checkboxData = itemsData
    },

    submit() {
      StoreUtils.commit("form/BUILD_FORM_BODY", {
        infoConfirmed: true
      });
      StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
    }
  }
};
</script>

<style scoped>
.alt-btn-sm {
  background: #414141;
}
</style>
