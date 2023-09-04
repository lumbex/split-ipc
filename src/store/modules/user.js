import UserService from "../../services/UserService";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import LoaderUtils from "@/utils/baseUtils/LoaderUtils";
const userService = new UserService();

export const namespaced = true;

export const state = {
  authToken: "",
  userAuthenticated: false,
  userInfo: {}
};

export const getters = {
  getUserInfo: state => {
    return state.userInfo;
  },
  getAuthToken: state => {
    return state.authToken;
  },
  getUserAuthenticated: state => {
    return state.userAuthenticated;
  }
};

export const mutations = {
  SET_USER_INFO(state, payload) {
    state.userInfo = payload;
  },
  SET_AUTH_TOKEN(state, payload) {
    state.authToken = payload;
  },
  SET_USER_AUTHENTICATED(state, payload) {
    state.userAuthenticated = payload;
  }
};

export const actions = {
  validateToken: ({}) => {
    const payload = {};

    const successAction = responseData => {
      const pathName = StoreUtils.rootGetters("router/getActiveRoute");

      StoreUtils.commit("user/SET_USER_AUTHENTICATED", true);
      StoreUtils.commit("user/SET_USER_INFO", responseData);

      // console.log(
      //   "Current Service Tag:",
      //   StoreUtils.rootGetters("service/getCurrentServiceTag")
      // );

      // console.log("Current Path:", pathName);

      if (pathName === "create-subscription") {
        // StoreUtils.dispatch("service/fetchAllAvailableSubscriptionServices");
        // StoreUtils.dispatch("subscription/fetchSuggestedDollarRate");
      }
      if (pathName === "join-subscription") {
        StoreUtils.dispatch("subscription/fetchSubscriptionRegion");
      }
      if (pathName === "update-subscription-terms") {
        StoreUtils.dispatch("subscription/fetchCurrentSubscriptionTerms");
      }
      if (pathName === "validate-subscription") {
        // StoreUtils.dispatch("subscription/fetchCurrentSubscriptionTerms");
      }
      // if(pathName === "setup-join-subscription"){}
    };

    return userService.validateAuth(
      payload,
      successAction,
      LoaderUtils.types.BLOCKING,
      null,
      false
    );
  }
};
