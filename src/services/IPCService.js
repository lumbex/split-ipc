class IPCService {
  postAMessage(message) {
    // console.log("Post Message Attempt!!", message)
    return window?.webkit?.messageHandlers?.SPLITVERSE_IPC?.postMessage(
      message
    );
  }
}

export default IPCService;
