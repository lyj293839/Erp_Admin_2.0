import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  Login = '/user/auth/dologin',
  Logout = '/user/auth/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  getList = '/company/trademarks/index',
  brandAll = 'company/trademarks/all',
  brandSave = '/company/trademarks/store',
  company = '/company/company/all',
  customer_discount = '/company/customer_discount/store',
  status = '/company/trademarks/status',
  getListsCompany = '/company/company/index',
  companySave = '/company/company/store',
  customer_discount_show = '/company/customer_discount/show',
}

/**
 * @description: user login api
 */
export function loginApi(data: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      data,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export const getList = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.getList,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
export const getListsCompany = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.getListsCompany,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
export const brandSave = (data) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.brandSave,
    data,
  });

export const company = () =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.company,
  });

export const brandAll = () =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.brandAll,
  });

export const customer_discount = (data) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.customer_discount,
    data,
  });

export const status = (id) =>
  defHttp.get<any>({
    url: Api.status+'/'+id,
  });
export const companySave = (data) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.companySave,
    data,
  });
export const customer_discount_show = (params: any) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.customer_discount_show+'/'+params.id,
    params
  });




