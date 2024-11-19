import axios, { AxiosRequestConfig } from "axios";

export class ContentTypes {
  public static APPLICATION_JSON: string = "application/json";
  public static APPLICATION_XML: string = "application/xml";
}

export interface Service {
  init(): void;
}

export abstract class BaseService implements Service {
  private apiBaseHref: string = "";

  public init(): void {
    this.apiBaseHref = "";

    if (this.apiBaseHref.endsWith("/")) {
      this.apiBaseHref = this.apiBaseHref.substring(
        0,
        this.apiBaseHref.length - 1
      );
    }
    // if (this.newApiBaseHref.endsWith("/")) {
    //     this.newApiBaseHref = this.newApiBaseHref.substring(0, this.newApiBaseHref.length - 1);

    // this.logger?.debug("[BaseService] Base HREF of Connectors REST API: ", this.newApiBaseHref);
  }

  /**
   * Creates an endpoint to use when making a REST call.  Supports path params and query params.
   * @param path
   * @param baseHref
   * @param params
   * @param queryParams
   */
  protected endpoint(
    path: string,
    baseHref: string,
    params?: any,
    queryParams?: any
  ): string {
    if (params) {
      Object.keys(params).forEach((key) => {
        const value: string = encodeURIComponent(params[key]);
        path = path.replace(":" + key, value);
      });
    }
    if (baseHref !== this.apiBaseHref) {
      this.apiBaseHref = baseHref;
    }
    let rval: string = this.apiBaseHref + path;
    if (queryParams) {
      let first: boolean = true;
      for (const key in queryParams) {
        if (queryParams[key]) {
          const value: string = encodeURIComponent(queryParams[key]);
          if (first) {
            rval = rval + "?" + key;
          } else {
            rval = rval + "&" + key;
          }
          if (value !== null && value !== undefined) {
            rval = rval + "=" + value;
          }
          first = false;
        }
      }
    }

    return rval;
  }

  /**
   * Creates the request options used by the HTTP service when making API calls.
   * @param headers
   */
  protected options(headers: { [header: string]: string }): AxiosRequestConfig {
    const options: AxiosRequestConfig = { headers };
    return options;
  }

  /**
   * Performs an HTTP GET operation to the given URL with the given options.  Returns
   * a Promise to the HTTP response data.
   */
  protected httpGet<T>(
    url: string,
    options?: AxiosRequestConfig,
    successCallback?: (value: any) => T
  ): Promise<T> {
    if (!options) {
      options = this.options({ Accept: ContentTypes.APPLICATION_JSON });
    }

    const config: AxiosRequestConfig = this.axiosConfig("get", url, options);
    console.log(config);
    return axios
      .request(config)
      .then((response) => {
        const data: T = response.data;
        if (successCallback) {
          return successCallback(data);
        } else {
          return data;
        }
      })
      .catch((error) => {
        return Promise.reject(this.unwrapErrorData(error));
      });
  }

  /**
   * Performs an HTTP POST operation to the given URL with the given body and options.  Returns
   * a Promise to null (no response data expected).
   * @param url
   * @param body
   * @param options
   */
  protected httpPost<I>(
    url: string,
    body: I,
    options?: AxiosRequestConfig,
    successCallback?: () => void
  ): Promise<void> {
    if (!options) {
      options = this.options({ "Content-Type": ContentTypes.APPLICATION_JSON });
    }

    const config: AxiosRequestConfig = this.axiosConfig(
      "post",
      url,
      options,
      body
    );
    return axios
      .request(config)
      .then(() => {
        if (successCallback) {
          return successCallback();
        } else {
          return;
        }
      })
      .catch((error) => {
        return Promise.reject(this.unwrapErrorData(error));
      });
  }

  /**
   * Performs an HTTP POST operation to the given URL with the given body and options.  Returns
   * a Promise to the HTTP response data.
   * @param url
   * @param body
   * @param options
   */
  protected httpPostWithReturn<I, O>(
    url: string,
    body: I,
    options?: AxiosRequestConfig,
    successCallback?: (data: any) => O
  ): Promise<O> {
    if (!options) {
      options = this.options({
        Accept: ContentTypes.APPLICATION_JSON,
        "Content-Type": ContentTypes.APPLICATION_JSON,
      });
    }

    const config: AxiosRequestConfig = this.axiosConfig(
      "post",
      url,
      options,
      body
    );
    return axios
      .request(config)
      .then((response) => {
        const data: O = response.data;
        if (successCallback) {
          return successCallback(data);
        } else {
          return data;
        }
      })
      .catch((error) => {
        return Promise.reject(this.unwrapErrorData(error));
      });
  }

  /**
   * Performs an HTTP PUT operation to the given URL with the given body and options.  Returns
   * a Promise to null (no response data expected).
   * @param url
   * @param body
   * @param options
   */
  protected httpPut<I>(
    url: string,
    body: I,
    options?: AxiosRequestConfig,
    successCallback?: () => void
  ): Promise<void> {
    if (!options) {
      options = this.options({ "Content-Type": ContentTypes.APPLICATION_JSON });
    }

    const config: AxiosRequestConfig = this.axiosConfig(
      "put",
      url,
      options,
      body
    );
    return axios
      .request(config)
      .then(() => {
        if (successCallback) {
          return successCallback();
        } else {
          return;
        }
      })
      .catch((error) => {
        return Promise.reject(this.unwrapErrorData(error));
      });
  }

  /**
   * Performs an HTTP PUT operation to the given URL with the given body and options.  Returns
   * a Promise to the HTTP response data.
   * @param url
   * @param body
   * @param options
   */
  protected httpPutWithReturn<I, O>(
    url: string,
    body: I,
    options?: AxiosRequestConfig,
    successCallback?: (data: O) => O
  ): Promise<O> {
    if (!options) {
      options = this.options({
        Accept: ContentTypes.APPLICATION_JSON,
        "Content-Type": ContentTypes.APPLICATION_JSON,
      });
    }

    const config: AxiosRequestConfig = this.axiosConfig(
      "put",
      url,
      options,
      body
    );
    return axios
      .request(config)
      .then((response) => {
        const data: O = response.data;
        if (successCallback) {
          return successCallback(data);
        } else {
          return data;
        }
      })
      .catch((error) => {
        return Promise.reject(this.unwrapErrorData(error));
      });
  }

  /**
   * Performs an HTTP DELETE operation to the given URL with the given body and options.
   * @param url
   * @param options
   */
  protected httpDelete<T>(
    url: string,
    options?: AxiosRequestConfig,
    successCallback?: () => T
  ): Promise<T | null> {
    if (!options) {
      options = {};
    }

    const config: AxiosRequestConfig = this.axiosConfig("delete", url, options);
    return axios
      .request(config)
      .then(() => {
        return successCallback ? successCallback() : null;
      })
      .catch((error) => {
        return Promise.reject(this.unwrapErrorData(error));
      });
  }

  private axiosConfig(
    method: string,
    url: string,
    options: any,
    data?: any
  ): AxiosRequestConfig {
    return {
      ...{
        data,
        method,
        url,
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      },
      ...options,
    };
  }

  private unwrapErrorData(error: any): any {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return error;
  }
}
