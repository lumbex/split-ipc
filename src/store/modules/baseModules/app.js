export const namespaced = true;

export const state = {
  stage: "dev",
  networkError: false,
  networkErrorMessage: ""
};

export const getters = {
  getAppStage: state => {
    return state.stage;
  },
  getAppNetworkError: state => {
    return state.networkError;
  }
};

export const mutations = {
  SET_APP_STAGE(state, payload) {
    state.stage = payload;
  },
  SET_APP_NETWORK_ERROR(state, payload) {
    state.networkError = payload;
  },
  SET_APP_NETWORK_ERROR_MESSAGE(state, payload) {
    state.networkErrorMessage = payload;
  }
};

export const actions = {};
