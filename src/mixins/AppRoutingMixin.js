import StoreUtils from "@/utils/baseUtils/StoreUtils";
import RouterUtils from "@/utils/baseUtils/RouterUtils";

export const appRoutingMixin = {
  async mounted() {
    // console.log("mixin dey here so mounted", this.spleetUniqueRef);
    // console.log("in mounted >>paymentAccount:", this.paymentAccount);

    if (this.spleetUniqueRef === "" || this.spleetUniqueRef === undefined) {
      await StoreUtils.commit("spleet/SET_SPLEET_UNIQUE_REF", this.uniqueRef);
    }
    if (this.spleetData.members === undefined) {
      await StoreUtils.dispatch("spleet/fetchSpleetData");
    }

    if (this.spleetData.status === "CANCELLED") {
      await RouterUtils.changeRouteUrlTo(
        `/${this.spleetUniqueRef}/payment-cancelled`
      );
    }
    if (this.spleetData.status === "APPROVED") {
      RouterUtils.changeRouteUrlTo(`/${this.spleetUniqueRef}/split`);
    }
    if (this.guestHasPaidHisCut === true) {
      RouterUtils.changeRouteUrlTo(`/${this.spleetUniqueRef}/payment-success`);
    }
    if (this.paymentAccount.account_number === undefined) {
      StoreUtils.dispatch("payment/initiatePayment");
    }
  },
  computed: {
    spleetUniqueRef() {
      return StoreUtils.rootGetters("spleet/getSpleetUniqueRef");
    },
    spleetData() {
      return StoreUtils.rootGetters("spleet/getSpleetData");
    },
    guestId() {
      return StoreUtils.rootGetters("guest/getGuestId");
    },

    guestHasPaidHisCut() {
      return StoreUtils.rootGetters(
        "spleet/getIfSpleetMemberHasJoined",
        this.guestId
      );
    },
    paymentAccount() {
      return StoreUtils.rootGetters("create-subscription/getPaymentAccount");
    }
  }
  // updated() {
  //   console.log("I dey mixin", this.spleetData.status);
  //   if (this.spleetData.status === "CANCELLED") {
  //     RouterUtils.changeRouteUrlTo(
  //       `/${this.spleetUniqueRef}/create-subscription-cancelled`
  //     );
  //   }
  //   if (this.guestHasPaidHisCut === true) {
  //     RouterUtils.changeRouteUrlTo(`/${this.spleetUniqueRef}/create-subscription-success`);
  //   }
  //   if (this.spleetUniqueRef === "" || this.spleetUniqueRef === undefined) {
  //     StoreUtils.commit("spleet/SET_SPLEET_UNIQUE_REF", this.uniqueRef);
  //     StoreUtils.dispatch("spleet/fetchSpleetData").then(() => {
  //       // if (!this.paymentAccount.account_number) {
  //       //   StoreUtils.dispatch("create-subscription/initiatePayment");
  //       // }
  //     });
  //   }
  //   if (!this.paymentAccount.account_number) {
  //     alert(this.paymentAccount);
  //     // StoreUtils.dispatch("create-subscription/initiatePayment");
  //   }
  // }
};
