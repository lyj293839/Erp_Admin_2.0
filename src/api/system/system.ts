import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/user/user/index',
  AccountStore = '/user/user/store',
  AccountCompany = '/user/user/company',
  AccountUsers = '/user/user/users',
  AccountDepartments = '/user/user/departments',
  AccountWarehouses = '/user/user/warehouses',
  AccountMenus = '/user/user/menus',

  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/user/menu/index',
  MenuAdd = '/user/menu/save',

  RolePageList = '/user/role/index',
  RoleStore = '/user/role/store',
  RoleAssign = '/user/role/assign',
  RoleMenus = '/user/role/menus',

  GetAllRoleList = '/system/getAllRoleList',

}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params:{...params,model:'user'} });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params:any) =>
  defHttp.get<any>({ url: Api.MenuList, params});

export const getRoleListByPage = (params: any) =>
  defHttp.get<any>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const setNewMenu = (data:any) =>
  defHttp.post({ url: Api.MenuAdd, data });