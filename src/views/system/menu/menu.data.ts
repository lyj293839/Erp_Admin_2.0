import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { getMenuList } from '/@/api/system/system';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'menu_name',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon_id',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 180,
  },
  {
    title: '组件',
    dataIndex: 'router',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 180,
  },
];

const isDir = (type: string) => type === '0';
const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'Sort',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '目录', value: '0' },
        { label: '菜单', value: '1' },
        { label: '按钮', value: '2' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menu_name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parent_id',
    label: '上级菜单',
    component: 'ApiTreeSelect',
    componentProps: {
      replaceFields: {
        title: 'menu_name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon_id',
    label: '图标',
    component: 'IconPicker',
    required: true,
    show: ({ values }) => !isButton(values.Sort),
  },

  {
    field: 'Route',
    label: '路由地址',
    component: 'Input',
    required: true,
    show: ({ values }) => !isButton(values.Sort),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    show: ({ values }) => isMenu(values.Sort),
  },
  {
    field: 'Permission',
    label: '权限标识',
    component: 'Input',
    show: ({ values }) => !isDir(values.Sort),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
  },
  // {
  //   field: 'isExt',
  //   label: '是否外链',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '否', value: '0' },
  //       { label: '是', value: '1' },
  //     ],
  //   },
  //   show: ({ values }) => !isButton(values.type),
  // },

  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    show: ({ values }) => isMenu(values.Sort),
  },

  {
    field: 'show',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
    show: ({ values }) => !isButton(values.Sort),
  },
];
