import SubscriptionService from "../../services/SubscriptionService";
import StoreUtils from "@/utils/baseUtils/StoreUtils";
import LoaderUtils from "@/utils/baseUtils/LoaderUtils";
const subscriptionService = new SubscriptionService();

export const namespaced = true;

export const state = {
  availableServices: [],
  currentServiceTag: "",
  appleMucisNGPriceInNaira: "1500",
  spotifyNGPriceInNaira: "1400"
};

export const getters = {
  getCurrentServiceTag: state => {
    return state.currentServiceTag;
  },
  getAvailableServices: state => {
    return state.availableServices;
  },
  getServiceObject: state => serviceTag => {
    return state.availableServices.filter(
      service => service.tag === serviceTag
    );
  },
  getAppleMusicNGPrice: state => {
    return state.appleMucisNGPriceInNaira;
  },
  getSpotifyNGPrice: state => {
    return state.spotifyNGPriceInNaira;
  }
};

export const mutations = {
  SET_AVAILABLE_SERVICES(state, payload) {
    state.availableServices = payload;
  },
  SET_CURRENT_SERVICE_TAG(state, payload) {
    state.currentServiceTag = payload;
  }
};

export const actions = {
  fetchAllAvailableSubscriptionServices: ({}) => {
    const payload = {};

    const successAction = responseData => {
      StoreUtils.commit(
        "service/SET_AVAILABLE_SERVICES",
        responseData.categories
      );
    };

    return subscriptionService.fetchAllAvailableSubscriptionServices(
      payload,
      successAction,
      LoaderUtils.types.COMPONENT,
      null,
      false
    );
  }
};
