import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const merchants: AppRouteModule = {
  path: '/merchants',
  name: 'Merchants',
  component: LAYOUT,
  redirect: '/merchants/customer',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.demo.merchants.moduleName'),
  },
  children: [
    {
      path: 'customers',
      name: 'customers',
      component: () => import('/@/views/merchants/customers/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.demo.merchants.customers'),
      },
    },
    {
      path: 'brands',
      name: 'brands',
      component: () => import('/@/views/merchants/brands/index.vue'),
      meta: {
        title: t('routes.demo.merchants.brands'),
      },
    },
  ],
};

export default merchants;
