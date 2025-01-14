import StoreUtils from "../../../utils/baseUtils/StoreUtils";

export const namespaced = true;

export const state = {
  stage: 0,
  formBody: {}
};

export const getters = {
  getFormStage: state => {
    return state.stage;
  },
  getFormBody: state => {
    return state.formBody;
  }
};

export const mutations = {
  INCREASE_FORM_STAGE_BY_ONE(state) {
    state.stage += 1;
  },
  DECREASE_FORM_STAGE_BY_ONE(state) {
    state.stage -= 1;
  },
  INCREASE_FORM_STAGE_BY_TWO(state) {
    state.stage += 2;
  },
  DECREASE_FORM_STAGE_BY_TWO(state) {
    state.stage -= 2;
  },
  SET_FORM_STAGE_TO(state, payload) {
    state.stage = parseInt(payload);
  },
  INCREASE_FORM_STAGE_BY(state, payload) {
    state.stage += parseInt(payload);
  },
  RESET_FORM_STAGE(state) {
    state.stage = 0;
  },
  BUILD_FORM_BODY(state, payload) {
    state.formBody = { ...state.formBody, ...payload };
  },
  RESET_FORM_BODY(state) {
    state.formBody = {};
  },
  RESET_FORM(state) {
    state.formBody = {};
    state.stage = 0;
  }
};

export const actions = {
  resetForm() {
    StoreUtils.commit("form/RESET_FORM_STAGE");
    StoreUtils.commit("form/RESET_FORM_BODY");
  }
};
