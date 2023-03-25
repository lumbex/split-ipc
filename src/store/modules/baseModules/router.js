export const namespaced = true;

export const state = {
  activeRoute: "home",
  activeProfileRoute: "profile"
};

export const getters = {
  getActiveRoute: state => {
    return state.activeRoute;
  },
  getActiveProfileRoute: state => {
    return state.activeProfileRoute;
  }
};

export const mutations = {
  SET_ACTIVE_ROUTE(state, payload) {
    state.activeRoute = payload;
  },
  SET_ACTIVE_PROFILE_ROUTE(state, payload) {
    state.activeProfileRoute = payload;
  }
};
export const actions = {
  setActiveRoute({ commit }, payload) {
    // console.log("setActiveRoute ==>", payload)
    commit("SET_ACTIVE_ROUTE", payload);
  },
  setActiveProfileRoute({ commit }, payload) {
    // console.log("setActiveRoute ==>", payload)
    commit("SET_ACTIVE_PROFILE_ROUTE", payload);
  }
};
