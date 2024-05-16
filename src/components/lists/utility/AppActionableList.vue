<template>
  <div class="app-actionable-list">
    <ul>
      <li
        @click="changeSubscriptionCredentialsFlow"
        v-if="currentSubscriptionServiceData.join_type === 'member_get_access'"
      >
        <div class="icon">
          <img
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715174277/splitcash/images/Frame_427320407_nz5bw8.png"
            alt="action icon"
          />
        </div>
        <div class="value">
          <div class="info">
            <p class="title">
              Share your credentials
            </p>

            <p
              v-if="
                currentEditSubscriptionInfo.data.subscriptionAccess
                  .lastUpdated === ''
              "
              class="sub"
            >
              All members get the credentals at once!
            </p>
            <p v-else class="sub">
              Last updated:
              <span>{{
                currentEditSubscriptionInfo.data.subscriptionAccess.lastUpdated
              }}</span>
            </p>
          </div>
          <div class="carret">
            <img
              src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715176155/splitcash/images/Fw_ms1ccz.png"
              alt="carret fw"
            />
          </div>
        </div>
      </li>
      <li
        @click="changeSubscriptionJoinLnkFlow"
        v-if="currentSubscriptionServiceData.join_type === 'instant_access'"
      >
        <div class="icon">
          <img
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781744/splitcash/images/Link_dbcfoc.png"
            alt="action icon"
          />
        </div>
        <div class="value">
          <div class="info">
            <p class="title">
              Change your join link
            </p>
            <p
              v-if="
                currentEditSubscriptionInfo.data.subscriptionAccess
                  .lastUpdated === ''
              "
              class="sub"
            >
              All members get the credentals at once!
            </p>
            <p v-else class="sub">
              Last updated:
              <span>{{
                currentEditSubscriptionInfo.data.subscriptionAccess.lastUpdated
              }}</span>
            </p>
          </div>
          <div class="carret">
            <img
              src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715176155/splitcash/images/Fw_ms1ccz.png"
              alt="carret fw"
            />
          </div>
        </div>
      </li>
      <li @click="changeSlotPriceFlow">
        <div class="icon">
          <img
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1713781755/splitcash/images/money_bag_dhq5af.png"
            alt="action icon"
          />
        </div>
        <div class="value">
          <div class="info">
            <p class="title">Your slot price</p>
            <p class="sub">
              Current price:
              <span>
                <AppCurrencyReaderComponent
                  :currency="
                    currentEditSubscriptionInfo.data.subscriptionPrice
                      .currentCurrency
                  "
                />{{
                  currentEditSubscriptionInfo.data.subscriptionPrice
                    .currentPrice | moneyFormat
                }}
              </span>
            </p>
          </div>
          <div class="carret">
            <img
              src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715176155/splitcash/images/Fw_ms1ccz.png"
              alt="carret fw"
            />
          </div>
        </div>
      </li>
      <li @click="changeContactNumberFlow">
        <div class="icon">
          <img
            src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715174278/splitcash/images/Phone_1_x6wcqm.png"
            alt="action icon"
          />
        </div>
        <div class="value">
          <div class="info">
            <p class="title">Contact number</p>
            <p class="sub">
              Currently:
              <span
                >+{{
                  currentEditSubscriptionInfo.data.subscriptionContactNumber
                    .countryCode
                }}{{
                  currentEditSubscriptionInfo.data.subscriptionContactNumber
                    .phoneNumber
                }}</span
              >
            </p>
          </div>
          <div class="carret">
            <img
              src="https://res.cloudinary.com/cloud-web-assets/image/upload/v1715176155/splitcash/images/Fw_ms1ccz.png"
              alt="carret fw"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import AppCurrencyReaderComponent from "@/components/forms/utilityComponents/AppCurrencyReaderComponent.vue";

export default {
  name: "AppActionableList",
  components: { AppCurrencyReaderComponent },
  // props: ["serviceTag", ],
  props: {
    currentSubscriptionServiceData: {
      type: Object,
      required: true
    }
  },
  computed: {
    formBody() {
      return StoreUtils.rootGetters("form/getFormBody");
    },
    currentEditSubscriptionInfo() {
      return StoreUtils.rootGetters("subscription/getEditSubscriptionInfo");
    },
    currentServiceTag() {
      return StoreUtils.rootGetters("service/getCurrentServiceTag");
    }
  },
  methods: {
    changeSubscriptionCredentialsFlow() {
      this.$router.push(
        `/edit-subscription/credentials/${this.currentServiceTag}`
      );
    },
    changeSubscriptionJoinLnkFlow() {
      this.$router.push(
        `/edit-subscription/join-link/${this.currentServiceTag}`
      );
    },
    changeSlotPriceFlow() {
      this.$router.push(`/edit-subscription/price/${this.currentServiceTag}`);
    },
    changeContactNumberFlow() {
      this.$router.push(`/edit-subscription/contact/${this.currentServiceTag}`);
    }
  }
};
</script>

<style scoped></style>
