class IPCService {
  postAMessage(message) {
    // console.log("Post Message Attempt!!", message)
    // return window?.webkit?.messageHandlers?.SPLITVERSE_IPC?.postMessage(
    //   message
    // );

    if (window.webkit !== undefined) {
      if (window.webkit.messageHandlers.SPLITVERSE_IPC !== undefined) {
        window.webkit.messageHandlers.SPLITVERSE_IPC.postMessage(message)
      }
    }
    if (window.SPLITVERSE_IPC !== undefined) {
      window.SPLITVERSE_IPC.postMessage(JSON.stringify(message))
    }
  }
}

export default IPCService;
