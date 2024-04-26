<template>
  <div class="app-form-wrapper">
    <div class="top-nav">
      <div class="go-back">
        <a @click="goBack"
          ><span class="icon"><BackIcon /></span>Back</a
        >
      </div>
      <div class="up-next"></div>
    </div>


      <div class="app-form">

          <p class="page-title text-3xl text-white mb-2">
            Identify yourself
          </p>
          <p class="page-sub">
            Please provide your 
            <span class="text-white font-bold">{{ currentSubscriptionServiceData.name }} name/username</span>
            exactly as it is on your profle or settings page.
          </p>

          <form action="#" @submit.prevent="submit">
              <div class="">
                <div class="form-group">
                    <label for="pageInput">Subscription name/username</label>
                    <input
                      type="text"
                      v-model="subscriptionName"
                      v-on:change="isValidInput"
                      required
                      id="subscriptionName"
                      placeholder="Bexx Adeniyi"
                      autocomplete="none"
                    />
                </div>

                <p v-if="inputError.length > 0" class="form-group-error">
                    {{ inputError }}
                </p>

              </div>

              <div class="space-filler"></div>

              <div class="app-form-base">
                  <button
                      type="submit"
                      class="app-btn light-btn"
                      :disabled="inputError !== '' || subscriptionName === ''"
                  >
                      Continue
                  </button>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
import BackIcon from "@/components/icons/BackIcon";
import StoreUtils from "@/utils/baseUtils/StoreUtils";

export default {
  name: "SubscriptionNameForm",
  components: {
      BackIcon },
    props: {
        currentSubscriptionServiceData: {
            type: Object,
            required: true
        }
    },
  data() {
    return {
        checked: false,
        subscriptionName: "",
        inputError: ""
    };
  },
  computed: {
      formBody() {
          return StoreUtils.rootGetters("form/getFormBody");
      },
      componentLoader() {
          return StoreUtils.rootGetters("loader/getLoader", "component");
      },
  },
  methods: {
      goBack() {
          StoreUtils.commit("form/DECREASE_FORM_STAGE_BY_ONE");
      },
      isValidInput() {
          // const slotPrice = parseFloat(this.slotPrice)
          const condition = this.subscriptionName.length >= 3

          if (condition) {
              this.inputError = "";
              return true;
          } else {
              this.inputError = "Please enter a valid name";
              return false;
          }
      },
      submit() {
          if (this.inputError === '') {

              StoreUtils.commit("form/BUILD_FORM_BODY", {
                subscriptionName: this.subscriptionName,
              });
              
              StoreUtils.dispatch("subscription/completeDefaultNewMemberJoin");

          }
      }
  }
};
</script>

<style scoped>
.number-currency-input {
    display: flex;
    padding: 18px 6px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    background: #4e4e52;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.10);
    margin-right: 4px;
    color: #FFFFFF;
}
</style>
