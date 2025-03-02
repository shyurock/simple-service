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

export interface ApiErrorResponse {
  /** @format int32 */
  status?: number;
  code?: string;
  message?: string;
  fieldErrors?: ApiFieldError[];
}

export interface ApiFieldError {
  code?: string;
  message?: string;
  property?: string;
  rejectedValue?: object;
  path?: string;
}

export interface UserDto {
  username?: string;
  /** @format date-time */
  createdAt?: string;
  avatar?: string;
  blocked?: boolean;
  /** @format date-time */
  lastLoginDate?: string;
  roles?: string[];
  individualPermissions?: ("ADMIN" | "READ_USER_LIST" | "EDIT_USER_LIST")[];
}

export interface RoleDto {
  name?: string;
  description?: string;
  permissions?: ("ADMIN" | "READ_USER_LIST" | "EDIT_USER_LIST")[];
  users?: string[];
}

export interface UserInfo {
  name?: string;
  avatar?: string;
  permissions?: string[];
}

export interface PermissionDto {
  name?: string;
  description?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

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
    if (input instanceof FormData) {
      return input;
    }
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
        ...(type ? { "Content-Type": type } : {}),
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
  authController = {
    /**
     * No description
     *
     * @tags auth-controller
     * @name Login
     * @request POST:/api/login
     */
    login: (
      data: {
        username?: string;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/login`,
        method: "POST",
        body: data,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name Logout
     * @request POST:/api/logout
     */
    logout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/logout`,
        method: "POST",
        ...params,
      }),
  };
  userController = {
    /**
     * No description
     *
     * @tags user-controller
     * @name DeleteRole
     * @request PUT:/api/roles/{name}
     */
    deleteRole: (name: string, params: RequestParams = {}) =>
      this.request<void, ApiErrorResponse>({
        path: `/api/roles/${name}`,
        method: "PUT",
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
      this.request<UserDto[], ApiErrorResponse>({
        path: `/api/users`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name UpdateUser
     * @request POST:/api/users
     */
    updateUser: (data: UserDto, params: RequestParams = {}) =>
      this.request<UserDto, ApiErrorResponse>({
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
     * @name Roles
     * @request GET:/api/roles
     */
    roles: (params: RequestParams = {}) =>
      this.request<RoleDto[], ApiErrorResponse>({
        path: `/api/roles`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name UpdateRole
     * @request POST:/api/roles
     */
    updateRole: (data: RoleDto, params: RequestParams = {}) =>
      this.request<RoleDto, ApiErrorResponse>({
        path: `/api/roles`,
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
      this.request<UserInfo, ApiErrorResponse>({
        path: `/api/users/me`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name Permissions
     * @request GET:/api/permissions
     */
    permissions: (params: RequestParams = {}) =>
      this.request<PermissionDto[], ApiErrorResponse>({
        path: `/api/permissions`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name DeleteUser
     * @request DELETE:/api/users/{username}
     */
    deleteUser: (username: string, params: RequestParams = {}) =>
      this.request<void, ApiErrorResponse>({
        path: `/api/users/${username}`,
        method: "DELETE",
        ...params,
      }),
  };
}
