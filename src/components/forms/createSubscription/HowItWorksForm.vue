<template>
    <div class="app-form-wrapper">
        <div class="app-form">
            <p class="page-title-sm ">How It Works</p>
            <p class="text-base text-grey-500 mb-8">
                Please read and agree to the following terms before you continue.
            </p>
            <div class="block-options">
                <div class="option intro flex flex-row gap-2 p-2 h-10">
                    <img
                            class="h-auto w-10 "
                            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253235/splitcash/images/List_tt1hyj.png"
                            alt="create sub"
                    />
                    <div class="text-base text-white">
                        List your subscription - set how much each member pays monthly
                    </div>
                </div>
                <div class="option intro flex flex-row gap-2 p-2 h-10">
                    <img
                            class="h-auto w-10 "
                            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253230/splitcash/images/verify_gz9ava.png"
                            alt="verify your sub"
                    />
                    <div class="text-base text-white">
                        Verify your subscription and it becomes available in the Splitverse
                    </div>
                </div>
                <div class="option intro flex flex-row gap-2 p-2 h-10">
                    <img
                            class="h-auto w-10 "
                            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253226/splitcash/images/Control_mhnzfl.png"
                            alt="Control access"
                    />
                    <div class="text-base text-white">
                        As the owner, you’re responsible for managing access and payment
                    </div>
                </div>
                <div class="option intro flex flex-row gap-2 p-2 h-10">
                    <img
                            class="h-auto w-10 "
                            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253332/splitcash/images/banknote_pfdqtr.png"
                            alt="monthly settlement"
                    />
                    <div class="text-base text-white">
                        You’re credited members contribution  called Monthly Settlements
                    </div>
                </div>
                <div class="option intro flex flex-row gap-2 p-2 h-10">
                    <img
                            class="h-auto w-10 "
                            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1696253214/splitcash/images/Percentage_ydjgve.png"
                            alt="host charge"
                    />
                    <div class="text-base text-white">
                        SplitCash takes a 10% charge on your monthly settlements
                    </div>
                </div>
            </div>
            <div class="space-filler"></div>

            <div class="app-form-base">
                <div @click="checked = !checked" class="custom-checkbox">
                    <div class="question">
                        I've read and I understand the terms of hosting my subscription in the Splitverse
                    </div>
                    <div class="indicator">
                        <span v-if="checked"><CheckedIcon /></span>
                        <span v-else><UncheckedIcon /></span>
                    </div>
                </div>

                <button :disabled="!checked" @click="submit" class="app-btn light-btn">
                    Sweet
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import CheckedIcon from "@/components/icons/CheckedIcon.vue";
import UncheckedIcon from "@/components/icons/UncheckedIcon.vue";

export default {
    name: "HowItWorksForm",
    components: {UncheckedIcon, CheckedIcon},
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
    data() {
        return { selectedOption: "", checked: false };
    },
    computed: {
        availableAppleMusicPaymentMethods() {
            return StoreUtils.rootGetters(
                "subscription/getAvailableAppleMusicPaymentMethods"
            );
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
}
</script>

<style scoped>

</style>