<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="设置折扣" @ok="handleSubmit">
    <a-form ref="formRef" :model="dynamicValidateForm" style="padding: 20px 70px;">
      <div style="display: flex;">
      <a-form-item>
          <a-input
            style="width: 300px"
            v-model:value="dynamicValidateForm.domains.company_name"
            disabled
          />
        </a-form-item>
    </div>
      <div  v-for="(domain, index) in dynamicValidateForm.domains.discounts"
            :key="domain.key" style="display: flex;">
        <a-form-item>
          <a-select
            v-model:value="domain.trademark_id"
            style="width: 150px;margin-right: 10px;"
            placeholder="brand"
            show-search
            option-filter-prop="label"
            :filter-option="filterOption"
            @focus="handleFocus"
          >
            <a-select-option v-for="item in companyList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select
            v-model:value="domain.type"
            style="width: 150px;margin-right: 10px;"
            placeholder="type"
          >
            <a-select-option :value="1">化合物</a-select-option>
            <a-select-option :value="2">仪器</a-select-option>
            <a-select-option :value="3">检测服务</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="domain.discount"
            type="number"
            placeholder="discount"
            style="width: 150px;margin-right: 10px;"
          />
        </a-form-item>
        <a-form-item>
          <div style="width: 150px;">
          <a-switch v-model:checked="domain.status" :checkedValue="1" :unCheckedValue="0"  style="margin-right: 8px;display: inline-block;" />
          <!--<MinusCircleOutlined-->
            <!--v-if="dynamicValidateForm.domains.discounts.length > 1"-->
            <!--class="dynamic-delete-button"-->
            <!--:disabled="dynamicValidateForm.domains.discounts.length === 1"-->
            <!--@click="removeDomain(domain)"-->
          <!--/>-->
          </div>
        </a-form-item>

      </div>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="addDomain">
          <PlusOutlined />
          Add field
        </a-button>
      </a-form-item>
    </a-form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref,UnwrapRef ,reactive,onMounted} from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema2 } from './data';
  import { brandAll,customer_discount,getListsCompany,customer_discount_show} from '/@/api/sys/user';
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';

  interface Domain {
    company_name:string,
    discounts:[]
  }
  export default defineComponent({
    name: 'DeptModal',
    components: { BasicModal, BasicForm, MinusCircleOutlined,PlusOutlined },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      let companyList = ref(null)
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema2,
        showActionButtonGroup: false,
      });
      onMounted(async () => {
         companyList.value = await brandAll()
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        if(data.record.id){
            const domains= await customer_discount_show({company_name:data.record.company_name})
          if(domains.customer_discounts&&domains.customer_discounts.length>0){
            dynamicValidateForm.domains= {
              company_name:domains.company_name,
              discounts:domains.customer_discounts
            }
          }else{
            dynamicValidateForm.domains= {
              company_name:domains.company_name,
              discounts:[{
                trademark_id:'',
                discount:'',
                type:'',
                status:1,
              }]
            }
          }

        }else{
          dynamicValidateForm.domains= {
            company_name:'',
            discounts:[{
              trademark_id:'',
              discount:'',
              type:'',
              status:1,
            }]
          }
          dynamicValidateForm.domains.company_name=data.record.company_name
        }
      });
      const  handleFocus=async ()=>{
        companyList.value = await brandAll()
      };
      async function handleSubmit() {
        try {
          dynamicValidateForm.domains.discounts.forEach((res,index)=>{
              if(!res.trademark_id){
                dynamicValidateForm.domains.discounts.splice(index,1)
              }
          })
          const data = await customer_discount(dynamicValidateForm.domains);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      const filterOption = (input: any, option: any) => {
        return option.children[0].children.indexOf(input) >= 0;
      }
      const formRef = ref();
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      const dynamicValidateForm: UnwrapRef<{ domains: any }> = reactive({
        domains: {
          company_name:'',
          discounts:[{
            trademark_id:'',
            discount:'',
            type:'',
            status:1,
          }]
        }
      });
      const submitForm = () => {
        formRef.value
          .validate()
          .then(() => {
            console.log('values', dynamicValidateForm.domains);
          })
          .catch((error: ValidateErrorEntity<any>) => {
            console.log('error', error);
          });
      };
      const resetForm = () => {
        formRef.value.resetFields();
      };
      const removeDomain = async (item: Domain) => {
        let index = dynamicValidateForm.domains.discounts.indexOf(item);
        if (index !== -1) {
          dynamicValidateForm.domains.discounts.splice(index, 1);
        }
      };
      const addDomain = () => {
        dynamicValidateForm.domains.discounts.push({
          trademark_id:'',
          discount:'',
          type:'',
          status:1,
        });
      };
      return {
        registerModal, registerForm, handleSubmit ,formRef,
        formItemLayout,
        formItemLayoutWithOutLabel,
        dynamicValidateForm,
        submitForm,
        resetForm,
        removeDomain,
        addDomain,
        companyList,
        filterOption,
        handleFocus
      };
    },
  });
</script>
<style>
  .dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
  }
  .dynamic-delete-button:hover {
    color: #777;
  }
  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .ant-col{
    margin-left: 0;
  }
</style>
