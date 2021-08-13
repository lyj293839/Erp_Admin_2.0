import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { company, status } from '/@/api/sys/user';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 60,
  },
  {
    title: 'name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'alias_name',
    dataIndex: 'alias_name',
    width: 150,
  },
  {
    title: '公司名',
    dataIndex: 'company_name',
    key: 'company_id',
    width: 300,
  },
  {
    title: '默认折扣',
    dataIndex: 'default_discount',
    key: 'default_discount',
    width: 150,
  },
  {
    title: 'desc',
    dataIndex: 'desc',
  },
  // {
  //   title: 'created_at',
  //   dataIndex: 'created_at',
  //   width: 150,
  // },
  {
    title: 'status',
    width: 150,
    dataIndex: 'status',
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'status')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1: 0;
          const { createMessage } = useMessage();
          // const params={
          //   id:record.id,
          //   status:newStatus
          // }
          status(record.id)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改状态`);
            })
            .catch(() => {
              createMessage.error('修改状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'name',
    component: 'Input',
    required: true,
  },
  {
    field: 'alias_name',
    label: 'alias_name',
    component: 'Input',
    required: true,
  },
  {
    field: 'desc',
    label: 'desc',
    component: 'Input',
    required: true,
  },
  {
    field: 'company_id',
    label: 'company_id',
    component: 'ApiSelect',
    componentProps: {
      api: company,
      labelField: 'company_name',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'default_discount',
    label: 'discount',
    component: 'InputNumber',
    required: false,
  },
];
