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
      <ComponentLoader v-if="componentLoading" />
      <div v-else class="block-options">
<!--          <p>Sub Info fetched: {{subscriptionInfoFetched}}</p>-->
          <AppCheckboxGroup v-if="subscriptionInfoFetched" :items="items" @on-change="onChange" />
      </div>
      <div class="space-filler"></div>

      <div class="app-form-base">

        <button
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
import JsonParserUtils from "@/utils/JsonParserUtils";

export default {
  name: "SubscriptionInfoConfirmationForm",
  components: {AppCheckboxGroup, ComponentLoader },
  data() {
    return {
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
    currentSubscriptionInfo() {
      return StoreUtils.rootGetters("subscription/getCurrentSubscriptionInfo");
    },
      subscriptionInfoFetched() {
        return !JsonParserUtils.isObjectEmpty(this.currentSubscriptionInfo)
      },
    allBoxesAreChecked() {
        return this.checkboxData.every(checkbox =>  checkbox.checked === true);
    },
      items() {
        return [
              {
                  label: `There are currently only ${this.currentSubscriptionInfo.active_members} members in this subscription including myself`,
                  value: '1',
              },
              {
                  label: `I'm charged on the ${this.currentSubscriptionInfo.billing_date}th of every month for this subscription`,
                  value: '2',
              }
          ]
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
