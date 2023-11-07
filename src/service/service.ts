import axios from "axios";

export const instance = axios.create();

declare module "axios" {
  interface AxiosRequestConfig {
    cancelPreviousRequests?: boolean;
  }
}

// pending request map
const pendingReqs: { [key: string]: AbortController } = {};

const removePendingRequest = (url: string | undefined, abort = false): void => {
  // check if pendingRequests contains our request URL
  if (url && pendingReqs[url]) {
    // if we want to abort ongoing call, abort it
    if (abort) {
      pendingReqs[url].abort();
    }
    // remove the request URL from pending requests
    delete pendingReqs[url];
  }
};

instance.interceptors.request.use((config) => {
  // we only want to cancel requests if config.cancelPreviousRequests is true
  // if the config.url exists
  // if the config doesn't contain AbortController.signal already, in this case we let the developer handle it himself
  if (config?.cancelPreviousRequests && config?.url && !config.signal) {
    // remove request URL from pending requests and also abort ongoing call with same URL
    removePendingRequest(config.url, true);

    const abortController = new AbortController(); //create new AbortController
    config.signal = abortController.signal; // assign it's signal into request config
    pendingReqs[config.url] = abortController; // store AbortController in the pending requests map
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    // remove pending request without aborting the call, call is finished
    removePendingRequest(response.request.responseURL);
    return response;
  },
  (error) => {
    // remove pending request without aborting the call, call is finished with error
    removePendingRequest(error.config?.url);
    return error;
  }
);
