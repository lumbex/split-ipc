import Axios from "axios";
import { globalENVs } from "@/commons/globalENV";

import { baseUrl } from "../app.config";
import LoaderUtils from "../utils/baseUtils/LoaderUtils";
import NotificationUtils from "../utils/baseUtils/NotificationUtils";
import ErrorUtils from "../utils/baseUtils/ErrorUtils";
import StoreUtils from "../utils/baseUtils/StoreUtils";

class BaseService {
  apiClient = Axios.create({
    baseURL: globalENVs().baseAPIURL,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
      // "Access-Control-Allow-Origin": "No"
    },
    timeout: 30000
  });

  static basePayload() {
    return {
      source: "WEB"
    };
  }

  constructor() {
    this.initAPIClient();
  }

  initAPIClient() {
    this.apiClient.interceptors.request.use(config => {
      const token = StoreUtils.rootGetters("user/getAuthToken");
      if (token != null) {
        config.headers.Authorization = token;
      }
      return config;
    });
    this.apiClient.interceptors.response.use(response => {
      if (response.status !== 200 || response.status !== 201) {
        StoreUtils.commit("appSetup/SET_APP_NETWORK_ERROR", true);
      }
      return response;
    });
  }

  async makePostRequest(
    url,
    payload,
    successAction = () => {},
    loaderType = LoaderUtils.types.BLOCKING,
    errorType = ErrorUtils.types.SLIDE,
    showSuccessMessage = true,
    successCondition = response => {
      return response.responseCode === "00";
    },
    getErrorMessage = response => {
      return response.responseMessage;
    }
  ) {
    let loader = this.validateLoaderType(loaderType);
    LoaderUtils.showLoading(true, loader);
    let apiResponse = await this.apiClient
      .post(url, JSON.stringify(payload))
      .catch(err => {
        StoreUtils.commit("appSetup/SET_APP_NETWORK_ERROR", true);
        StoreUtils.commit("appSetup/SET_APP_NETWORK_ERROR_MESSAGE", err);
      });

    if (apiResponse === undefined) {
      StoreUtils.commit("appSetup/SET_APP_NETWORK_ERROR", true);
    }

    LoaderUtils.showLoading(false, loader);

    // console.log("apiResponse ==>", apiResponse);
    // console.log("successCondition ==>", successCondition(apiResponse.data));

    if (successCondition(apiResponse.data)) {
      if (showSuccessMessage) {
        NotificationUtils.addNotificationSlide(
          apiResponse.data.responseMessage,
          NotificationUtils.type.SUCCESS
        );
      }
      successAction(apiResponse.data);
    } else {
      ErrorUtils.showApiCallError(getErrorMessage(apiResponse.data), errorType);
    }
    return apiResponse.data;
  }

  async makeGetRequest(
    url,
    successAction = () => {},
    loaderType = LoaderUtils.types.BLOCKING,
    errorType = ErrorUtils.types.SLIDE,
    showSuccessMessage = true,
    successCondition = response => {
      return response.responseCode === "00";
    },
    getErrorMessage = response => {
      return response.responseMessage;
    }
  ) {
    let loader = this.validateLoaderType(loaderType);
    LoaderUtils.showLoading(true, loader);
    let apiResponse = await this.apiClient.get(url);
    LoaderUtils.showLoading(false, loader);
    // console.log("apiResponse ==>", apiResponse);

    if (successCondition(apiResponse.data)) {
      if (showSuccessMessage) {
        NotificationUtils.addNotificationSlide(
          apiResponse.data.responseMessage,
          NotificationUtils.type.SUCCESS
        );
      }
      successAction(apiResponse.data);
    } else {
      ErrorUtils.showApiCallError(getErrorMessage(apiResponse.data), errorType);
    }
    return apiResponse.data;
  }

  validateLoaderType(type) {
    if (type === undefined || type === "") {
      return LoaderUtils.types.BLOCKING;
    } else {
      return type;
    }
  }
}

export default BaseService;
