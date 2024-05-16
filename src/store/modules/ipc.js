import IPCService from "../../services/IPCService";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
const ipcService = new IPCService();

export const namespaced = true;

export const state = {
  firstMessageReceived: "unset"
};

export const getters = {
  getFirstMessageReceived: state => {
    return state.firstMessageReceived;
  }
};

export const mutations = {
  SET_FIRST_MESSAGE_RECEIVED(state, payload) {
    state.firstMessageReceived = payload;
  }
};

export const actions = {
  postMessage({}, message) {
    // console.log("Post Message Action!", message);

    // ipcService.postAMessage("subscription_created", payload)

    const messageAction = message.messageAction;

    switch (messageAction) {
      case "open_url_in_browser":
        ipcService.postAMessage(message);
        break;
      case "fetch_region":
        ipcService.postAMessage(message);
        break;
      case "select_billing_date":
        ipcService.postAMessage(message);
        break;
      case "subscription_created":
        ipcService.postAMessage(message);
        break;

      case "new_member_join_info_collected":
        ipcService.postAMessage(message);
        break;

      case "fetch_new_member_join_info":
        // console.log("Post Message Action!", message);

        ipcService.postAMessage(message);
        break;

      case "new_member_setup_complete":
        ipcService.postAMessage(message);
        break;

      case "fetch_current_subcription_ref":
        ipcService.postAMessage(message);
        break;

      case "new_member_instant_access_complete":
        ipcService.postAMessage(message);
        break;

      case "fetch_current_subcription_terms":
        ipcService.postAMessage(message);
        break;

      case "subscription_terms_updated":
        ipcService.postAMessage(message);
        break;

      case "open_subscription_verification_bottom_sheet":
        ipcService.postAMessage(message);
        break;

      case "open_contact_support_bottom_sheet":
        ipcService.postAMessage(message);
        break;

      default:
      // code block
    }
  },
  receiveMessageHandler({ commit }, payload) {
    // console.log("Receive Message Action!", payload);

    const messageAction = payload.messageAction;
    const messageBody = payload.messageBody;

    const activeRoute = StoreUtils.rootGetters("router/getActiveRoute");

    switch (messageAction) {
      case "init_auth":
        StoreUtils.commit("user/SET_AUTH_TOKEN", messageBody.authToken);
        StoreUtils.dispatch("user/validateToken");
        break;

      case "billing_date_selected":
        StoreUtils.commit(
          "subscription/SET_SELECTED_BILLING_DATE",
          messageBody.nextBillingDate
        );
        break;

      case "subscription_region":
        StoreUtils.commit(
          "subscription/SET_CURRENT_SUBSCRIPTION_REGION",
          messageBody.region
        );
        break;

      case "new_member_join_info":
        StoreUtils.commit(
          "subscription/SET_NEW_MEMBER_JOIN_INFO",
          JSON.parse(messageBody)
        );
        StoreUtils.commit("loader/SET_COMPONENT_LOADER", false);
        break;

      case "current_subscription_ref":
        StoreUtils.commit(
          "subscription/SET_CURRENT_SUBSCRIPTION_REF",
          messageBody
        );
        StoreUtils.commit("loader/SET_COMPONENT_LOADER", false);
        if (activeRoute === "quick-join-subscription") {
          StoreUtils.dispatch("subscription/fetchQuickAccessInfo");
        }
        if (activeRoute === "validate-subscription") {
          StoreUtils.dispatch("subscription/fetchCurrentSubInfo");
        }
        if (activeRoute === "edit-subscription") {
          StoreUtils.dispatch("subscription/fetchEditSubscriptionInfo");
        }
        break;

      case "current_subscription_terms":
        StoreUtils.commit(
          "subscription/SET_CURRENT_SUBSCRIPTION_TERMS",
          messageBody
        );
        StoreUtils.commit("loader/SET_COMPONENT_LOADER", false);
        break;
      default:
      // code block
    }
    commit("SET_FIRST_MESSAGE_RECEIVED", payload);
  }
};
