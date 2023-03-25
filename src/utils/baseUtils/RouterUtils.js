import StoreUtils from "./StoreUtils";
import router from "../../router";

class RouterUtils {
  static routes = {
    HOME: "home",
    REFUND_ACCOUNT: "refund-account",
    PAYMENT: "payment"
  };
  static profileRoutes = {};
  static changeBaseRouteTo(targetRoute) {
    StoreUtils.dispatch(StoreUtils.actions.router.setActiveRoute, targetRoute);
    router.push({
      name: targetRoute
    });
  }

  static changeRouteTo(targetRoute) {
    router.push({
      name: targetRoute
    });
  }
  static changeActivePageTo(targetRoute) {
    StoreUtils.dispatch(StoreUtils.actions.router.setActiveRoute, targetRoute);
  }
  static changeRouteUrlTo(targetUrl) {
    router.push(targetUrl);
  }
}
export default RouterUtils;
