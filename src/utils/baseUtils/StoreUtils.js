import store from "../../store/store";

class StoreUtils {
  static actions = {
    loader: {
      showBlockingLoader: "loader/showBlockingLoader",
      showNonBlockingLoader: "loader/showNonBlockingLoader",
      showTableLoader: "loader/showTableLoader",
      showComponentLoader: "loader/showComponentLoader"
    },
    notification: {
      addNotificationSlide: "notification/addNotificationSlide",
      removeNotificationSlide: "notification/removeNotificationSlide",
      showNotificationModal: "notification/showNotificationModal",
      closeNotificationModal: "notification/closeNotificationModal"
    },
    router: {
      setActiveRoute: "router/setActiveRoute"
    },
    table: {
      setActiveRoute: "table/setActiveRoute"
    },
    form: {
      RESET_FORM: "form/resetForm"
    },
    auth: {
      LOGIN: "auth/login",
      REGISTER: "auth/createProfile",
      FORGOT_PASSWORD: "auth/forgotPassword",
      INIT_APP: "auth/initApp",
      LOGOUT: "auth/logOut"
    },
    user: {
      SET_USER_INFO: "user/setUserInfo"
    }
  };

  static getters = {
    router: {
      GET_ACTIVE_ROUTE: "router/getActiveRoute"
    },
    auth: {},
    user: {
      GET_USER_INFO: "user/getUserInfo",
      GET_USER_ID: "user/getUserId",
      GET_USER_EMAIL: "user/getUserEmail"
    },
    table: {
      GET_TABLE_DATA: "table/getTableData"
    },
    form: {
      GET_FORM_STAGE: "form/getFormStage",
      GET_FORM_BODY: "form/getFormBody"
    }
  };

  static mutations = {
    table: {
      SET_TABLE_DATA: "table/SET_TABLE_DATA"
    },
    form: {
      INCREASE_FORM_STAGE_BY_ONE: "form/INCREASE_FORM_STAGE_BY_ONE",
      SET_FORM_STAGE_TO: "form/SET_FORM_STAGE_TO",
      INCREASE_FORM_STAGE_BY: "form/INCREASE_FORM_STAGE_BY",
      RESET_FORM_STAGE: "form/RESET_FORM_STAGE",
      BUILD_FORM_BODY: "form/BUILD_FORM_BODY",
      RESET_FORM_BODY: "form/RESET_FORM_BODY",
      RESET_FORM: "form/RESET_FORM"
    }
  };

  static dispatch(actionToDispatch, payload) {
    return store.dispatch(actionToDispatch, payload, { root: true });
  }

  static commit(mutationToCommit, payload) {
    return store.commit(mutationToCommit, payload, { root: true });
  }

  static rootGetters(getterToGet, payload) {
    if (payload) {
      return store.getters[getterToGet](payload);
    } else {
      return store.getters[getterToGet];
    }
  }
}

export default StoreUtils;
