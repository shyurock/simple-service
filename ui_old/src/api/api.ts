/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  id?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format int64 */
  version?: number;
  username?: string;
  passwordHash?: string;
  /** @format date-time */
  lastLoginDate?: string;
  profile?: UserProfile;
  permission?: UserPermission;
}

export interface UserPermission {
  /** @uniqueItems true */
  roles?: string[];
  /** @uniqueItems true */
  permissions?: string[];
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface Role {
  id?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format int64 */
  version?: number;
  name?: string;
  /** @uniqueItems true */
  permissions?: string[];
}

export interface UserInfo {
  name?: string;
  avatar?: string;
  permissions?: string[];
}

import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType} from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8090" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8090
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  userController = {
    /**
     * No description
     *
     * @tags user-controller
     * @name UpdateUser
     * @request PUT:/api/users/{username}
     */
    updateUser: (username: string, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/users/${username}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name Users
     * @request GET:/api/users
     */
    users: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/users`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name AddUser
     * @request POST:/api/users
     */
    addUser: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name UserInfo
     * @request GET:/api/users/me
     */
    userInfo: (params: RequestParams = {}) =>
      this.request<UserInfo, any>({
        path: `/api/users/me`,
        method: "GET",
        ...params,
      }),
  };
  roleController = {
    /**
     * No description
     *
     * @tags role-controller
     * @name UpdateRole
     * @request PUT:/api/roles/{name}
     */
    updateRole: (name: string, data: Role, params: RequestParams = {}) =>
      this.request<Role, any>({
        path: `/api/roles/${name}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name Roles
     * @request GET:/api/roles
     */
    roles: (params: RequestParams = {}) =>
      this.request<Role[], any>({
        path: `/api/roles`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name AddRole
     * @request POST:/api/roles
     */
    addRole: (data: Role, params: RequestParams = {}) =>
      this.request<Role, any>({
        path: `/api/roles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  mediaController = {
    /**
     * No description
     *
     * @tags media-controller
     * @name UploadFile
     * @request POST:/media
     */
    uploadFile: (
      query: {
        path: string;
      },
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/media`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags media-controller
     * @name GetFile
     * @request GET:/media/**
     */
    getFile: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/media/**`,
        method: "GET",
        ...params,
      }),
  };
}
