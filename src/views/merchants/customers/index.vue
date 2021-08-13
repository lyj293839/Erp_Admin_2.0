<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增客户 </a-button>
      </template>
      <template #company_id="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
             {
             icon: 'clarity:info-standard-line',
              tooltip: '设置折扣',
              onClick: handleDiscount.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <CustomerModal @register="registerModal" @success="handleSuccess" />
    <DiscountModal :width="820" @register="registerModal2" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent,onMounted } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getListsCompany ,customer_discount,} from '/@/api/sys/user';
  import { useModal } from '/@/components/Modal';
  import CustomerModal from './CustomerModal.vue';
  import DiscountModal from './DiscountModal.vue';

  import { columns, searchFormSchema } from './data';

  export default defineComponent({
    name: 'customers',
    components: { BasicTable, CustomerModal,DiscountModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerModal2, { openModal:openModal2 }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '客户列表',
        api: getListsCompany,
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
      onMounted(async () => {
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

     async function handleSuccess() {
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
      };
    },
  });
</script>
