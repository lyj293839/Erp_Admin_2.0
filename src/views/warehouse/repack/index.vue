<template>
  <div>
    <BasicTable @register="registerTable">
      <template #ids="{ record }">
        <span v-if="record.batchno_count===1">{{record.id}}</span>
        <a-tooltip v-else title="数据异常" color="red">
            <span style="color:red;">{{record.id}}</span>
        </a-tooltip>
      </template>
      <template #repack="{ text }">
        <table>
          <thead>
             <th width="60">purity</th>
             <th>batch</th>
             <th width="85">type</th>
             <th width="50">stock</th>
             <th width="50">shelf</th>
          </thead>
          <tbody v-for="item,key,ind in text.batchno" :key="ind">
              <tr v-for="i,k,index in text.batchno[key]" :key="index">
                <td width="60">{{i.purity}}</td>
                <td>{{key}}</td>
                <td width="85">{{i.model_type}}</td>
                <td width="50">{{i.model_type==='packaged'?(i.pre_out+i.pre_out_unit+(i.pre_out_num!=1?'*'+i.pre_out_num:'')):(i.pre_out+i.pre_out_unit)}}</td>
                <td width="50">{{i.shelf}}</td>
              </tr>
          </tbody>
        </table>
      </template>
      <template #requirements="{ text }">
        <div v-for="i,index in text.requirements" :key="index">
          {{i.pack_size}}{{i.pack_unit}}*{{i.qty}}
        </div>
      </template>
      <template #action="{ record }" :fixed="right">
        <TableAction
          :actions="[
            {
              label: '分装',
              onClick: handleEdit.bind(null, record),
              ifShow: (_action) => {
                return record.batchno_count===1;
              },
            },
            {
              label: '打印',
              onClick: handlePrint.bind(null, record),
              ifShow: (_action) => {
                return record.packs.length>0;
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <BrandModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent,onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { repack_request } from '/@/api/warehouse/repack/index';
  import { useModal } from '/@/components/Modal';
  import BrandModal from './BrandModal.vue';
  import { useRouter } from 'vue-router';
  import { columns, searchFormSchema } from './data';
  import axios from 'axios'
  import { message } from 'ant-design-vue';
  export default defineComponent({
    name: 'repack',
    components: { BasicTable, BrandModal, TableAction },
    setup() {
      const router = useRouter();
      const [registerModal, { openModal }] = useModal();
      const [registerModal2, { openModal:openModal2 }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '分装列表',
        api: repack_request,
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
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });
      onMounted(async () => {
        await reload();
      });
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        router.push({path: `/warehouse/repack_detail/${record.id}`,})
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
      // function more_big(){
      //   if(item.customer_name=='南京一览生物'){
      //     this.more_yl_d(i,a)
      //   }else if(item.customer_name=='上海凯为化学科技有限公司'){
      //     this.more_sk_d(i,a)
      //   }else if(item.customer_name=='1pluschem LLC'){
      //     this.more_pl_d(i,a)
      //   }else if(item.customer_name=='AA BLOCKS LLC'){
      //     this.more_f(i,a)
      //   }else if(item.customer_name=='辽宁库克生物技术有限公司'){
      //     this.more_ll_d(i,a)
      //   }else if(item.customer_name=='南京库克生物技术有限公司'){
      //     this.more_kk_d(i,a)
      //   }else if(item.customer_name=='梯希爱(上海)化成工业发展有限公司'){
      //     this.more_d(i,a)
      //   }else if(item.customer_name=='Aaron Chemicals LLC.'){
      //     this.more_ACL_d(i,a)
      //   }else if(item.customer_name=='A2B Chem LLC'){
      //     this.more_A2B_d(i,a)
      //   }else if(item.customer_name=='Yu Shing Tang Co., LTD'){
      //     this.more_d(i,a)
      //   }else{
      //     if(i.contract_detail.contract_number.indexOf('CH')!=-1){
      //       this.more_yl_d(i,a)
      //     }
      //     if(i.contract_detail.contract_number.indexOf('AK')!=-1){
      //       this.more_h(i,a)
      //     }
      //     if(i.contract_detail.contract_number.indexOf('AGN')!=-1){
      //       this.more_d(i,a,item.customer_id)
      //     }
      //     if(i.contract_detail.contract_number.indexOf('AR')!=-1){
      //       this.more_ACL_d(i,a)
      //     }
      //     if(i.corp_id==1001555){
      //       this.more_sk_d(i,a)
      //     }
      //   }
      // }
      // function more_small(){
      //   if(item.customer_name=='南京一览生物'){
      //     this.more_yl_s(i,a)
      //   }else if(item.customer_name=='上海凯为化学科技有限公司'){
      //     this.more_sk_s(i,a)
      //   }else if(item.customer_name=='1pluschem LLC'){
      //     this.more_pl_s(i,a)
      //   }else if(item.customer_name=='AA BLOCKS LLC'){
      //     this.more_g(i,a)
      //   }else if(item.customer_name=='辽宁库克生物技术有限公司'){
      //     this.more_ll_s(i,a)
      //   }else if(item.customer_name=='南京库克生物技术有限公司'){
      //     this.more_kk_s(i,a)
      //   }else if(item.customer_name=='梯希爱(上海)化成工业发展有限公司'){
      //     this.more_e(i,a)
      //   }else if(item.customer_name=='Aaron Chemicals LLC.'){
      //     this.more_ACL_s(i,a)
      //   }else if(item.customer_name=='A2B Chem LLC'){
      //     this.more_A2B_s(i,a)
      //   }else if(item.customer_name=='Yu Shing Tang Co., LTD'){
      //     this.more_e(i,a)
      //   }else{
      //     if(i.contract_detail.contract_number.indexOf('CH')!=-1){
      //       this.more_yl_s(i,a)
      //     }
      //     if(i.contract_detail.contract_number.indexOf('AK')!=-1){
      //       this.more_i(i,a)
      //     }
      //     if(i.contract_detail.contract_number.indexOf('AGN')!=-1){
      //       this.more_e(i,a,item.customer_id)
      //     }
      //     if(i.contract_detail.contract_number.indexOf('AR')!=-1){
      //       this.more_ACL_s(i,a)
      //     }
      //     if(i.corp_id==1001555){
      //       this.more_sk_s(i,a)
      //     }
      //   }
      // }
      // function  print(item){
      //   agnene_big.value = {
      //     configID: 7,
      //     id:'',
      //     po:'',
      //     ref: item.contract_detail.contract_number,
      //     productName: item.contract_detail.product_name,
      //     codeNumber:item.inventory.batchno,
      //     cas: item.prod.cas,
      //     batch: item.inventory.batchno,
      //     mw: item.prod.mw,
      //     mf: item.prod.mf,
      //     purity: item.contract_detail.purity,
      //     weight:item.weight,
      //     storeInfo: '',
      //     notice_id:item.id,
      //     user_id:this.user_id,
      //   };
      // }
      function handlePrint(record){
        if(record.type_text==='预分装'){
          let data = []
          record.packs.forEach(res=>{
              data.push({
                批号: res.batchno,
                存储条件:record.storage_cond,
                外观: record.exterior,
                数量:res.expect_pack_size+res.expect_pack_unit,
                货架: res.shelf,
                CAS: record.cas,
                id:record.cas+','+res.batchno +','+res.expect_pack_size+res.expect_pack_unit+','+record.id+(res.id?'-'+res.id:''),
                configID: 1
              })
          })
          axios({
            url: "http://127.0.0.1:8080/mac/ruku.jsp",
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: {datalist:JSON.stringify(data)},
          }).then(function (response) {
            message.success('success');
          })
            .catch(function (error) {
              message.error('error');
            });
        }
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
        handlePrint
      };
    },
  });
</script>
