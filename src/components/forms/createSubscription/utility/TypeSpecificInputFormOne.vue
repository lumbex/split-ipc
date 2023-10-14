<template>
  <div>
      <ConfirmationForm v-if="currentSubscriptionServiceData.join_type === 'host_invite'" :current-subscription-service-data="currentSubscriptionServiceData" />

      <SubscriptionJoinLinkForm v-if="currentSubscriptionServiceData.join_type === 'instant_access'" :current-subscription-service-data="currentSubscriptionServiceData" />

       <HostContactForm v-if="currentSubscriptionServiceData.join_type === 'member_get_access'" :current-subscription-service-data="currentSubscriptionServiceData" />
  </div>
</template>

<script>
import ConfirmationForm from "@/components/forms/createSubscription/SubscriptionConfirmationForm.vue";
import SubscriptionJoinLinkForm from "@/components/forms/createSubscription/SubscriptionJoinLinkForm.vue";
import HostContactForm from "@/components/forms/createSubscription/HostContactForm.vue";
import StoreUtils from "@/utils/baseUtils/StoreUtils";

export default {
    name: "TypeSpecificInputFormOne",
    components: { HostContactForm, SubscriptionJoinLinkForm, ConfirmationForm },
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            tagsOfHostInviteSubscriptionsThatUseThisForm: ["apple_music"],
            possibleSubscriptionTypes: ["host_invite", "instant_access", "member_get_access"]
        }
    },
    computed: {
        formBody() {
            return StoreUtils.rootGetters("form/getFormBody");
        }
    },
    created() {
        if (this.currentSubscriptionServiceData.join_type === "host_invite" &&
            !this.tagsOfHostInviteSubscriptionsThatUseThisForm.includes(this.currentSubscriptionServiceData.tag)) {
            StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
        }
    },
}
</script>

<style scoped>

</style>