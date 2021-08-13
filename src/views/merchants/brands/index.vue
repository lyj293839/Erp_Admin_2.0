<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增品牌 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <BrandModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent,onMounted,ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getList , company ,customer_discount,} from '/@/api/sys/user';
  import { useModal } from '/@/components/Modal';
  import BrandModal from './BrandModal.vue';

  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'brands',
    components: { BasicTable, BrandModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerModal2, { openModal:openModal2 }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '品牌列表',
        api: getList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      let companyList = ref(null)
      onMounted(async () => {
         companyList = await company()
      });
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleDiscount(record: Recordable){
        openModal2(true, {
          record,
          isUpdate: true,
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        registerModal2,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleDiscount,
        openModal2,
        companyList
      };
    },
  });
</script>
