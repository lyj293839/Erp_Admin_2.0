import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import {t} from "/@/hooks/web/useI18n";
const warehouse: AppRouteModule = {
  path: '/warehouse',
  name: 'warehouse',
  component: LAYOUT,
  redirect: '/warehouse/repack',
  meta: {
    orderNo: 2000,
    icon: 'ion:home-outline',
    title: t('routes.demo.warehouse.moduleName'),
  },
  children: [
    {
      path: 'repack',
      name: 'repack',
      meta: {
        title: t('routes.demo.warehouse.repack'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/warehouse/repack/index.vue'),
    },
    {
      path: 'repack_detail/:id',
      name: 'repack_detail',
      component: () => import('/@/views/warehouse/repack/detail.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.demo.warehouse.repack_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/warehouse/repack',
      },
    },
  ],
};

export default warehouse;
