import StoreUtils from "./StoreUtils";
import AppUtils from "./AppUtils";
import DateUtils from "./DateUtils";
import Utils from "@/utils/Utils";

class SocketUtils {
  static commands = {
    CONNECT: "connect",
    ERROR: "socketError",
    DISCONNECT: "disconnect",
    POSTS: "posts",
    CLOSE: "close"
  };

  static baseSocketPayload() {
    return {
      userId: StoreUtils.rootGetters("user/getUserId")
    };
  }
}
export default SocketUtils;
