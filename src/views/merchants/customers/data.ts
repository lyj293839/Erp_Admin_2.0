import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { company } from '/@/api/sys/user';
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 60,
  },
  {
    title: 'company_name',
    dataIndex: 'company_name',
    width: 300,
  },
  {
    title: 'country',
    dataIndex: 'country',
    width: 100,
  },
  {
    title: 'company_type',
    dataIndex: 'company_type',
    width: 150,
  },
  {
    title: 'address',
    dataIndex: 'address',
  },
  {
    title: 'created_at',
    dataIndex: 'created_at',
    width: 150,
  },
  // {
  //   title: 'status',
  //   width: 150,
  //   dataIndex: 'status',
  //   customRender: ({ record }) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false;
  //     }
  //     return h(Switch, {
  //       checked: record.status === '1',
  //       checkedChildren: '已启用',
  //       unCheckedChildren: '已禁用',
  //       loading: record.pendingStatus,
  //       onChange(checked: boolean) {
  //         record.pendingStatus = true;
  //         const newStatus = checked ? '1' : '0';
  //         const { createMessage } = useMessage();
  //         const params={
  //           id:record.id,
  //           status:newStatus
  //         }
  //         status(params)
  //           .then(() => {
  //             record.status = newStatus;
  //             createMessage.success(`已成功修改状态`);
  //           })
  //           .catch(() => {
  //             createMessage.error('修改状态失败');
  //           })
  //           .finally(() => {
  //             record.pendingStatus = false;
  //           });
  //       },
  //     });
  //   },
  // },
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
    label: '公司名称',
    component: 'Input',
    required: true,
  },
];
export const formSchema2: FormSchema[] = [
  {
    field: 'company_id',
    label: '公司名称',
    component: 'ApiSelect',
    componentProps: {
      api: company,
      labelField: 'company_name',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'trademark_id',
    label: '品牌名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'type',
    label: '类型',
    component: 'Input',
    required: true,
  },
  {
    field: 'discount',
    label: '折扣',
    component: 'Input',
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'Input',
    required: true,
  },

];
