
import {defHttp} from '/@/utils/http/axios';
enum Api {
  repack_request = '/warehouse/repack_request/index',
  repack_request_detail = '/warehouse/repack_request/show/',
  repack_request_repack = '/warehouse/repack_request/repack',
}

export const repack_request = (params: any) =>
  defHttp.get<any>({ url: Api.repack_request, params });

export const repack_request_detail = (id: number) =>
  defHttp.get<any>({ url: Api.repack_request_detail+id });

export const repack_request_repack = (data: any) =>
  defHttp.post<any>({
    url: Api.repack_request_repack,
    data,
  });

