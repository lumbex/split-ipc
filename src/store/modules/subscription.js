import SubscriptionService from "../../services/SubscriptionService";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import LoaderUtils from "@/utils/baseUtils/LoaderUtils";
const subscriptionService = new SubscriptionService();

export const namespaced = true;

const convertToDollarsCustomTwoDP = (number, rate) => {
  const dollarEquivalent = number / rate;
  return Math.round((dollarEquivalent + dollarEquivalent.EPSILON) * 100) / 100;
};

export const state = {
  createSubscriptionBody: {
    activeMembers: "",
    plan: "",
    billingDate: ""
  },
  availablePlans: [
    {
      value: "yearly",
      title: "Once a year",
      recommended: true
    },
    {
      value: "6months",
      title: "Every 6 months",
      recommended: false
    },
    {
      value: "3months",
      title: "Every 3 months",
      recommended: false
    }
  ],
  availableAppleMusicRegion: [
    {
      value: "NG",
      title: "Nigeria Store",
      iconUrl:
        "https://res.cloudinary.com/cloud-web-assets/image/upload/v1677328644/splitcash/images/Nigeria_ongxng.png",
      recommended: false
    },
    {
      value: "US",
      title: "US Store",
      iconUrl:
        "https://res.cloudinary.com/cloud-web-assets/image/upload/v1677328619/splitcash/images/USA_kngjjf.png",
      recommended: false
    },
    {
      value: "UK",
      title: "UK Store",
      iconUrl:
        "https://res.cloudinary.com/cloud-web-assets/image/upload/v1677328619/splitcash/images/UK_gyfw33.png",
      recommended: false
    },
    {
      value: "CA",
      title: "Canada Store",
      iconUrl:
        "https://res.cloudinary.com/cloud-web-assets/image/upload/v1677328619/splitcash/images/Canada_wfkkjz.png",
      recommended: false
    }
  ],
  availableAppleMusicPaymentMethods: [
    // {
    //   value: "split-card",
    //   title: "Split Dollar Card",
    //   sub:
    //     "Select this to use your Split virtual dollar card to pay for this subscription.",
    //   iconUrl:
    //     "https://res.cloudinary.com/cloud-web-assets/image/upload/v1677340194/splitcash/images/Split_Dollar_Card_lr9nuy.png",
    //   recommended: true
    // },
    {
      value: "ng-card",
      title: "Naira Debit Card",
      sub:
        "Select this if you have a Naira card you use to pay for this subscription.",
      iconUrl:
        "https://res.cloudinary.com/cloud-web-assets/image/upload/v1677340194/splitcash/images/Naira_Card_bmqplj.png",
      recommended: false
    },
    {
      value: "us-card",
      title: "Dollar Debit Card",
      sub:
        "Select if you have some other dollar card you use to pay for this subscription.",
      iconUrl:
        "https://res.cloudinary.com/cloud-web-assets/image/upload/v1677340195/splitcash/images/other_dollar_cards_hamtph.png",
      recommended: false
    }
  ],
  showAddNewAccountForm: false,
  billingDaySelected: false,
  selectedBillingDate: "",
  newMemberJoinInfo: {},
  suggestedDollarToNairaRate: {
    id: "",
    rate: 770,
    date: ""
  },
  currentSubscriptionRegion: "",
  currentSubscriptionRef: {},
  quickAccessInfo: {},
  currentSubscriptionTerms: {
    test: "valuu"
  }
};

export const getters = {
  getCreateSubscriptionBody: state => {
    return state.createSubscriptionBody;
  },
  getAvailablePlans: state => {
    return state.availablePlans;
  },
  getAvailableAppleMusicRegion: state => {
    return state.availableAppleMusicRegion;
  },
  getAvailableAppleMusicPaymentMethods: state => {
    return state.availableAppleMusicPaymentMethods;
  },
  getBillingDaySelected: state => {
    return state.billingDaySelected;
  },
  getSelectedBillingDate: state => {
    return state.selectedBillingDate;
  },
  getNewMemberJoinInfo: state => {
    return state.newMemberJoinInfo;
  },
  getSugestedDollarToNairaRate: state => {
    return state.suggestedDollarToNairaRate;
  },
  getCurrentSubscriptionRegion: state => {
    return state.currentSubscriptionRegion;
  },
  getCurrentSubscriptionRef: state => {
    return state.currentSubscriptionRef;
  },
  getQuickAccessInfo: state => {
    return state.quickAccessInfo;
  },
  getCurrentSubscriptionTerms: state => {
    return state.currentSubscriptionTerms;
  }
};

export const mutations = {
  SET_CREATE_SUBSCRIPTION_BODY(state, payload) {
    state.createSubscriptionBody = payload;
  },
  SET_SELECTED_BILLING_DATE(state, payload) {
    state.selectedBillingDate = payload;
  },
  SET_NEW_MEMBER_JOIN_INFO(state, payload) {
    state.newMemberJoinInfo = payload;
  },
  SET_NEW_SUGGESTED_DOLLAR_TO_NAIRA_RATE(state, payload) {
    state.suggestedDollarToNairaRate = payload;
  },
  SET_CURRENT_SUBSCRIPTION_REGION(state, payload) {
    state.currentSubscriptionRegion = payload;
  },
  SET_CURRENT_SUBSCRIPTION_REF(state, payload) {
    state.currentSubscriptionRef = payload;
  },
  SET_QUICK_ACCESS_INFO(state, payload) {
    state.quickAccessInfo = payload;
  },
  SET_CURRENT_SUBSCRIPTION_TERMS(state, payload) {
    state.currentSubscriptionTerms = payload;
  }
};

export const actions = {
  completeSpotifyQuickAccess: ({}) => {
    const message = {
      messageAction: "new_member_instant_access_complete",
      messageBody: {}
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },

  fetchQuickAccessInfo: () => {
    const payload = {
      sub_ref: StoreUtils.rootGetters("subscription/getCurrentSubscriptionRef")
        .subRef
    };



    const successAction = responseData => {
      StoreUtils.commit(
        "subscription/SET_QUICK_ACCESS_INFO",
        responseData.data
      );
    };

    return subscriptionService.fetchQuickAccessInfo(
      payload,
      successAction,
      LoaderUtils.types.COMPONENT,
      null,
      false
    );
  },

  fetchCurrentSubscriptionRef: ({}) => {
    const message = {
      messageAction: "fetch_current_subcription_ref",
      messageBody: {}
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },

  fetchCurrentSubscriptionTerms: ({}) => {
    const message = {
      messageAction: "fetch_current_subcription_terms",
      messageBody: {}
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },

  completeSpotifyNewMemberJoin: ({}) => {
    const message = {
      messageAction: "new_member_join_info_collected",
      messageBody: JSON.stringify({ categoryTag: "spotify", joinInfo: {} })
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },

  createSpotifySubscription: ({}, createBody) => {
    const payload = {
      activeMembers: createBody.activeMembers - 1,
      paymentPlan: createBody.plan,
      nextBillingDate: createBody.billingDate.slice(0, -2),
      categoryID: createBody.id,
      subscriptionPlan: "Spotify Premium",
      planPrice: StoreUtils.rootGetters("service/getSpotifyNGPrice"),
      extraData: {
        region: "NG",
        paymentMethod: "ng-card",
        invitationLink: createBody.invitationLink,
        address: createBody.address
      }
    };



    const successAction = responseData => {
      const message = {
        messageAction: "subscription_created",
        messageBody: JSON.stringify(responseData.usersSubscriptions)
      };
      StoreUtils.dispatch("ipc/postMessage", message);
    };

    return subscriptionService.createSubscription(
      payload,
      successAction,
      LoaderUtils.types.COMPONENT,
      null,
      false
    );
  },

  fetchSubscriptionRegion: ({}) => {
    const message = {
      messageAction: "fetch_region",
      messageBody: {
        info:
          "For fetching the region a subscription is in for validation in the IPC"
      }
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },

  completeAppleMusicNewMemberSetup: ({}) => {
    const message = {
      messageAction: "new_member_setup_complete",
      messageBody: {}
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },
  fetchNewMemberJoinInfo: ({}) => {
    const message = {
      messageAction: "fetch_new_member_join_info",
      messageBody: {}
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },
  sendAppleMusicNewMemberJoinInfo: ({}, payload) => {
    const messageBody = {
      categoryTag: StoreUtils.rootGetters("service/getCurrentServiceTag"),
      joinInfo: {
        email: payload.email
      }
    };
    const message = {
      messageAction: "new_member_join_info_collected",
      messageBody: JSON.stringify(messageBody)
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },

  selectBillingDate: ({}) => {
    const message = {
      messageAction: "select_billing_date",
      messageBody: {
        info:
          "return selected date back with messageAction: billing_date_selected - with the selected date in message body"
      }
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },

  fetchSuggestedDollarRate: ({}, createBody) => {
    const payload = {};


    const successAction = responseData => {
      StoreUtils.commit(
        "subscription/SET_NEW_SUGGESTED_DOLLAR_TO_NAIRA_RATE",
        responseData.rate
      );
    };

    return subscriptionService.fetchSuggestedDollarToNairaRate(
      payload,
      successAction,
      LoaderUtils.types.COMPONENT,
      null,
      false
    );
  },

  createAppleMusicSubscription: ({}, createBody) => {
    const payload = {
      activeMembers: createBody.activeMembers - 1,
      paymentPlan: createBody.plan,
      nextBillingDate: createBody.billingDate.slice(0, -2),
      categoryID: createBody.id,
      subscriptionPlan: "Apple Music Family",
      planPrice: createBody.planPrice,
      extraData: {
        region: createBody.region,
        paymentMethod: createBody.paymentMethod,
        dollarPrice: (
          parseFloat(createBody.planPrice) /
          StoreUtils.rootGetters("subscription/getSugestedDollarToNairaRate")
            .rate
        ).toFixed(2)
      }
    };

  

    const successAction = responseData => {
      const message = {
        messageAction: "subscription_created",
        messageBody: JSON.stringify(responseData.usersSubscriptions)
      };
      StoreUtils.dispatch("ipc/postMessage", message);
    };

    return subscriptionService.createSubscription(
      payload,
      successAction,
      LoaderUtils.types.COMPONENT,
      null,
      false
    );
  },

  completeSubscriptionTermsUpadate: () => {
    const message = {
      messageAction: "subscription_terms_updated",
      messageBody: JSON.stringify({})
    };
    StoreUtils.dispatch("ipc/postMessage", message);
  },

  updateAppleMusicSubscriptionTerms: () => {
    const formBody = StoreUtils.rootGetters("form/getFormBody");
    const payload = {
      paymentPlan: formBody.plan,
      planPrice: formBody.planPrice,
      subRef: StoreUtils.rootGetters("subscription/getCurrentSubscriptionTerms")
        .subRef,
      extraData: {
        paymentMethod: formBody.paymentMethod,
        dollarPrice: (
          parseFloat(formBody.planPrice) /
          StoreUtils.rootGetters("subscription/getSugestedDollarToNairaRate")
            .rate
        ).toFixed(2)
      }
    };
    const successAction = () => {
      StoreUtils.commit("form/SET_FORM_STAGE_TO", 5);
    };

    return subscriptionService.updateSubscriptionTerms(
      payload,
      successAction,
      LoaderUtils.types.COMPONENT,
      null,
      false
    );
  },

  updateSpotifySubscriptionTerms: () => {
    const formBody = StoreUtils.rootGetters("form/getFormBody");
    const payload = {
      paymentPlan: formBody.plan,
      planPrice: StoreUtils.rootGetters("service/getSpotifyNGPrice"),
      subRef: formBody.id,
      extraData: {
        paymentMethod: "ng-card"
      }
    };



    const successAction = () => {
      StoreUtils.commit("form/SET_FORM_STAGE_TO", 5);
    };

    return subscriptionService.updateSubscriptionTerms(
      payload,
      successAction,
      LoaderUtils.types.COMPONENT,
      null,
      false
    );
  }
};
