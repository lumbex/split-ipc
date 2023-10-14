<template>
  <div>
<!--      <p>currentSubscriptionServiceData: {{ currentSubscriptionServiceData }}</p>-->
      <SelectSubscriptionRegionForm v-if="currentSubscriptionServiceData.join_type === 'host_invite'" :current-subscription-service-data="currentSubscriptionServiceData" />

      <SubscriptionHomeAddressForm v-if="currentSubscriptionServiceData.join_type === 'instant_access'" :current-subscription-service-data="currentSubscriptionServiceData" />
  </div>
</template>

<script>
import SelectSubscriptionRegionForm from "@/components/forms/createSubscription/SelectSubscriptionRegionForm.vue";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import SubscriptionHomeAddressForm from "@/components/forms/createSubscription/SubscriptionHomeAddressForm.vue";

export default {
    name: "TypeSpecificInputFormTwo",
    components: {SubscriptionHomeAddressForm, SelectSubscriptionRegionForm},
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            tagsOfMemberGetAccessSubscriptionsAllowedToSkipThisForm: ["youtube_premium"],
            tagsOfInstantAccessSubscriptionsThatUseThisForm: ["spotify"],
            possibleSubscriptionTypes: ["host_invite", "instant_access", "member_get_access"]
        }
    },
    computed: {
        formBody() {
            return StoreUtils.rootGetters("form/getFormBody");
        },
        formStage() {
            return StoreUtils.rootGetters("form/getFormStage");
        }
    },
    created() {

        if (this.currentSubscriptionServiceData.join_type === "host_invite") { }

        if (this.currentSubscriptionServiceData.join_type === "instant_access" ) {
            this.setSubscriptionCreateRegion()
            if (!this.tagsOfInstantAccessSubscriptionsThatUseThisForm.includes(this.currentSubscriptionServiceData.tag)) {
                StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
            }
        }

        if (this.currentSubscriptionServiceData.join_type === "member_get_access") {

            this.setSubscriptionCreateRegion()
            StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
        }

    },
    methods: {
        setSubscriptionCreateRegion() {
            this.formBody.slotPriceInputCurrency === 'USD'
                ? StoreUtils.commit("form/BUILD_FORM_BODY", { region: "US" })
                : StoreUtils.commit("form/BUILD_FORM_BODY", { region: "NG" })
        }

    }
}
</script>

<style scoped>

</style>