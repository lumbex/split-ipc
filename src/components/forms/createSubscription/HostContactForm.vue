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
              What’s your WhatsApp number?
          </p>
          <p class="page-sub">
              Make sure your number is available on <span class="text-white font-bold">WhatsApp</span> so members can easily reach you for access to this subscription
          </p>

          <form action="#" @submit.prevent="submit">
              <div class="">
                  <div class="form-group alt no-pad">

                      <div class="flex flex-row justify-start">
                          <div class="number-currency-input flex-shrink-0 flex items-center">
                              <span>+234</span>
                          </div>

                          <div class="input-wrap-hold w-[90%] flex-grow-1 flex-basis-0">
                              <div class="">
                                  <label class="px-2" for="cost">Whatsapp Number</label>
                              </div>

                              <div class="flex flex-row items-center">
                                  <input
                                      type="text"
                                      class="alt"
                                      v-model="whatsappNumber"
                                      v-on:change="isValidInput"
                                      required
                                      id="host-contact"
                                      placeholder="8031342069"
                                  />
                              </div>

                          </div>
                      </div>
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
                      :disabled="inputError !== ''"
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
  name: "HostContactForm",
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
        whatsappNumber: "",
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
          const condition = this.whatsappNumber.length >= 10 && this.whatsappNumber.length <= 11

          if (condition) {
              this.inputError = "";
              return true;
          } else {
              this.inputError = "Please enter a valid phone number";
              return false;
          }
      },
      submit() {
          if (this.inputError === '') {

              StoreUtils.commit("form/BUILD_FORM_BODY", {
                  hostContact: this.whatsappNumber,
                  hostContactExtension: "234",
              });

              StoreUtils.commit("form/INCREASE_FORM_STAGE_BY_ONE");
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
