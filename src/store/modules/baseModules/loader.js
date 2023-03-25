export const namespaced = true;

export const state = {
  blockingLoader: false,
  blockingLoaderData: {
    title: "",
    sub: ""
  },
  nonBlockingLoader: false,
  tableLoader: true,
  componentLoader: false,
  loaders: {
    BLOCKING: "blocking",
    NONBLOCKING: "non-blocking",
    TABLE: "table",
    COMPONENT: "component"
  }
};
export const getters = {
  getBlockingLoaderData: state => {
    return state.blockingLoaderData;
  },
  getLoaderTypes: state => {
    return state.loaders;
  },
  getLoader: state => loaderString => {
    switch (loaderString) {
      case state.loaders.BLOCKING:
        return state.blockingLoader;
      case state.loaders.NONBLOCKING:
        return state.nonBlockingLoader;
      case state.loaders.TABLE:
        return state.tableLoader;
      case state.loaders.COMPONENT:
        return state.componentLoader;
      default:
        return state.blockingLoader;
    }
  }
};

export const mutations = {
  SET_BLOCKING_LOADER(state, status) {
    state.blockingLoader = status;
  },
  SET_BLOCKING_LOADER_DATA(state, payload) {
    // state.blockingLoaderData = { ...state.blockingLoaderData, payload };
    state.blockingLoaderData = payload;
  },
  SET_NON_BLOCKING_LOADER(state, status) {
    state.nonBlockingLoader = status;
  },
  SET_TABLE_LOADER(state, status) {
    state.tableLoader = status;
  },
  SET_COMPONENT_LOADER(state, status) {
    state.componentLoader = status;
  }
};
export const actions = {
  showBlockingLoader({ commit }, status) {
    commit("SET_BLOCKING_LOADER", status);
  },
  showNonBlockingLoader({ commit }, status) {
    commit("SET_NON_BLOCKING_LOADER", status);
  },
  showTableLoader({ commit }, status) {
    commit("SET_TABLE_LOADER", status);
  },
  showComponentLoader({ commit }, status) {
    commit("SET_COMPONENT_LOADER", status);
  }
};
