import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { company} from '/@/api/sys/user';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key:'id',
    fixed: 'left',
    slots: {  customRender: 'ids' },
    width: 50,
  },
  {
    title: '类型',
    dataIndex: 'type_text',
    width: 60,
  },
  {
    title: '仓库',
    dataIndex: 'warehouse',
    width: 120,
  },
  {
    title: '平台',
    dataIndex: 'platform',
    width: 60,
  },
  {
    title: 'CAS',
    dataIndex: 'cas',
    width: 100,
  },
  {
    title: '存储条件',
    dataIndex: 'storage_cond',
    width: 100,
  },
  {
    title: '外观',
    dataIndex: 'exterior',
    width: 120,
  },
  {
    title: '待分装记录',
    dataIndex: 'requirements',
    slots: { title: '待分装记录',  customRender: 'repack' },
    width: 380,
  },
  {
    title: '分装需求',
    dataIndex: 'requirements',
    slots: {  customRender: 'requirements' },
    width: 80,
  },
  {
    title: '申请人',
    dataIndex:'applicant',
    width: 60,
  },
  {
    title: '申请时间',
    dataIndex:'apply_at',
  },
  {
    title: '状态',
    dataIndex:'status_text',
    width: 80,
  },
  {
    title: '损耗',
    dataIndex:'total_loss',
    width: 60,
  },
  {
    title: '差值',
    dataIndex:'total_diff',
    width: 60,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'cas',
    label: 'cas',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'created_date',
    label: '创建日期',
    component: 'DatePicker',
    colProps: { span: 6 },
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    }
  },
  {
    field: 'batchno_count',
    label: '是否异常',
    component: 'Select',
    componentProps: {
      options: [
        { label: '正常数据', value: '1' },
        { label: '异常数据', value: '2' },
      ],
    },
    colProps: { span: 6 },
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
