<template>
  <div>
  <a-card title="详细信息">
    <a-table :dataSource="dataSource" :pagination="false">
      <a-table-column key="id" title="ID" data-index="id" />
      <a-table-column key="type_text" title="类型" data-index="type_text" />
      <a-table-column key="warehouse" title="仓库" data-index="warehouse" />
      <a-table-column key="platform" title="平台" data-index="platform" />
      <a-table-column key="label" title="标签" data-index="label" />
      <a-table-column key="storage_cond" title="存储条件" data-index="storage_cond" />
      <a-table-column key="exterior" title="外观" data-index="exterior" />
      <a-table-column key="requirements" title="分装需求" data-index="requirements">
      <template #default="{ record }">
        <div v-for="i in record.requirements.requirements" :key="i.pack_size">
          {{i.pack_size}}{{i.pack_unit}}*{{i.qty}}
        </div>
      </template>
    </a-table-column>
      <a-table-column key="applicant" title="申请人" data-index="applicant" />
      <a-table-column key="apply_at" title="申请时间" data-index="apply_at" />
      <a-table-column key="status_text" title="状态" data-index="status_text" />
      <a-table-column key="total_loss" title="损耗" data-index="total_loss" />
      <a-table-column key="total_diff" title="差值" data-index="total_diff" />
      <a-table-column key="remarks" title="备注" data-index="remarks" />
    </a-table>
  </a-card>

  <a-card title="待分装数据">
    <table class="table-auto">
      <thead>
      <tr>
        <th>ID</th>
        <th>CAS</th>
        <th>纯度</th>
        <th>类型</th>
        <th>货架</th>
        <th>批次</th>
        <th>待分装量</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i,k,index in batchno" :key="i.model_id">
        <td>{{i.model_id}}</td>
        <td>{{dataSource[0].cas}}</td>
        <td>{{i.purity}}</td>
        <td>{{i.model_type}}</td>
        <td>{{i.shelf}}</td>
        <td>{{i.batch}}</td>
        <td>{{i.model_type==='packaged'?(i.pre_out+i.pre_out_unit+(i.pre_out_num!=1?'*'+i.pre_out_num:'')):(i.pre_out+i.pre_out_unit)}}</td>
        <td><a-button type="primary" size="mini" @click="repack(i)">分装</a-button></td>
       </tr>
      </tbody>
    </table>
  </a-card>
  <a-card title="分装">
    <table class="repack">
      <thead>
      <tr class="text-center">
        <th width="80px">第几瓶分装</th>
        <th>瓶规格</th>
        <th>目标重量</th>
        <th>第1次称重</th>
        <th>第2次称重</th>
        <th>第3次称重</th>
        <th>第4次称重</th>
        <th>净重值</th>
        <th>分装损耗</th>
        <th>操作<span class="text-lg text-blue-500 cursor-pointer" @click="add">+</span></th>
        <th width="150">
          <!--<span class="blue text-blue-500 cursor-pointer ml10" @click="printAll">默认打印</span>-->
          <!--<span class="blue text-blue-500 cursor-pointer ml10" @click="printAll_">打印</span>-->
          <a-button  type="primary" size="small" :loading="loading_print" @click="printAll">默认打印</a-button>
          <a-button class="ml-5"  type="primary" size="small" :loading="loading_print_" @click="printAll_">打印</a-button>
        </th>
      </tr>
      </thead>
      <tbody  class="text-center">
      <tr  v-for="(item,index) in packs" :key="index">
        <td class="text-center">{{index+1}}</td>
        <td>
              <span v-for="(m,n) in item.repack_details" class="size">
                  <select v-model="m.wrap" style="width: 200px;" v-if="n===0" class="px-6 py-1">
                       <option v-for="item in wraps" :key="item">{{item}}</option>
                   </select>
              </span>
        </td>
        <td>
              <span v-for="(m,n) in item.repack_details" :key="n">
                <span v-if="n===0">
                    <span v-if="m.expect_pack_size" class="px-2 py-1">{{m.expect_pack_size}}{{m.expect_pack_unit}}</span>
                    <span v-else>
                         <input type="text"   v-model="m.expect_pack_size">
                        {{m.expect_pack_unit}}
                    </span>
                  </span>
              </span>
        </td>
        <td>
              <div v-for="(m,n) in item.repack_details" :key="n" class="relative">
                  <input type="text" ref="first"  v-model="m.first_gross_weight" @input="change_first_gross_weight(m)">
                <svg v-if="!m.first_stop_Socket&&m.type==='new'" @click="start(item,index,m,n,'first_gross_weight','first_stop_Socket')" t="1616566520808" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2053" width="16" height="16"><path d="M512 149.333333A362.666667 362.666667 0 1 1 149.333333 512 363.093333 363.093333 0 0 1 512 149.333333M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z" p-id="2054"></path><path d="M465.493333 352a42.666667 42.666667 0 0 0-42.666666 42.666667v232.106666a42.666667 42.666667 0 0 0 22.613333 38.4 45.226667 45.226667 0 0 0 45.226667 0l182.186666-117.333333a42.666667 42.666667 0 0 0 20.053334-37.12 42.666667 42.666667 0 0 0-20.48-37.12l-183.466667-114.773333a46.933333 46.933333 0 0 0-23.466667-6.826667z" p-id="2055"></path></svg>
                <svg v-if="m.first_stop_Socket&&m.type==='new'" @click="stop(item,index,m,n,'first_gross_weight','first_stop_Socket')"  t="1616567734871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2201" width="16" height="16"><path d="M512 95.268571A416.914286 416.914286 0 1 1 95.085714 512 417.426286 417.426286 0 0 1 512 95.268571M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m-130.925714 725.321143a47.542857 47.542857 0 0 1-47.542857-47.542857V346.368a47.542857 47.542857 0 1 1 95.085714 0v331.410286a47.542857 47.542857 0 0 1-47.542857 47.542857z m261.851428 0a47.542857 47.542857 0 0 1-47.542857-47.542857V346.368a47.542857 47.542857 0 1 1 95.085714 0v331.410286a47.542857 47.542857 0 0 1-47.542857 47.542857z" p-id="2202"></path></svg>
              </div>
        </td>
        <td>
               <div v-for="(m,n) in item.repack_details" :key="n" class="relative">
                  <input type="text" ref="second"  v-model="m.second_gross_weight">
                 <svg v-if="!m.second_stop_Socket&&m.type==='new'" @click="start(item,index,m,n,'second_gross_weight','second_stop_Socket')" t="1616566520808" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2053" width="16" height="16"><path d="M512 149.333333A362.666667 362.666667 0 1 1 149.333333 512 363.093333 363.093333 0 0 1 512 149.333333M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z" p-id="2054"></path><path d="M465.493333 352a42.666667 42.666667 0 0 0-42.666666 42.666667v232.106666a42.666667 42.666667 0 0 0 22.613333 38.4 45.226667 45.226667 0 0 0 45.226667 0l182.186666-117.333333a42.666667 42.666667 0 0 0 20.053334-37.12 42.666667 42.666667 0 0 0-20.48-37.12l-183.466667-114.773333a46.933333 46.933333 0 0 0-23.466667-6.826667z" p-id="2055"></path></svg>
                 <svg v-if="m.second_stop_Socket&&m.type==='new'" @click="stop(item,index,m,n,'second_gross_weight','second_stop_Socket')"  t="1616567734871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2201" width="16" height="16"><path d="M512 95.268571A416.914286 416.914286 0 1 1 95.085714 512 417.426286 417.426286 0 0 1 512 95.268571M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m-130.925714 725.321143a47.542857 47.542857 0 0 1-47.542857-47.542857V346.368a47.542857 47.542857 0 1 1 95.085714 0v331.410286a47.542857 47.542857 0 0 1-47.542857 47.542857z m261.851428 0a47.542857 47.542857 0 0 1-47.542857-47.542857V346.368a47.542857 47.542857 0 1 1 95.085714 0v331.410286a47.542857 47.542857 0 0 1-47.542857 47.542857z" p-id="2202"></path></svg>
               </div>
        </td>
        <td>
              <div v-for="(m,n) in item.repack_details" :key="n"  class="relative">
                  <input type="text"  v-model="m.third_net_weight" @input="change_net_weight(m)">
                <svg v-if="!m.third_stop_Socket&&m.type==='new'" @click="start(item,index,m,n,'third_net_weight','third_stop_Socket')" t="1616566520808" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2053" width="16" height="16"><path d="M512 149.333333A362.666667 362.666667 0 1 1 149.333333 512 363.093333 363.093333 0 0 1 512 149.333333M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z" p-id="2054"></path><path d="M465.493333 352a42.666667 42.666667 0 0 0-42.666666 42.666667v232.106666a42.666667 42.666667 0 0 0 22.613333 38.4 45.226667 45.226667 0 0 0 45.226667 0l182.186666-117.333333a42.666667 42.666667 0 0 0 20.053334-37.12 42.666667 42.666667 0 0 0-20.48-37.12l-183.466667-114.773333a46.933333 46.933333 0 0 0-23.466667-6.826667z" p-id="2055"></path></svg>
                <svg v-if="m.third_stop_Socket&&m.type==='new'" @click="stop(item,index,m,n,'third_net_weight','third_stop_Socket')"  t="1616567734871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2201" width="16" height="16"><path d="M512 95.268571A416.914286 416.914286 0 1 1 95.085714 512 417.426286 417.426286 0 0 1 512 95.268571M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m-130.925714 725.321143a47.542857 47.542857 0 0 1-47.542857-47.542857V346.368a47.542857 47.542857 0 1 1 95.085714 0v331.410286a47.542857 47.542857 0 0 1-47.542857 47.542857z m261.851428 0a47.542857 47.542857 0 0 1-47.542857-47.542857V346.368a47.542857 47.542857 0 1 1 95.085714 0v331.410286a47.542857 47.542857 0 0 1-47.542857 47.542857z" p-id="2202"></path></svg>
              </div>
        </td>
        <td>
              <div v-for="(m,n) in item.repack_details" :key="n" class="relative">
                  <input type="text"  v-model="m.fourth_gross_weight" @input="change_fourth_gross_weight(item,m,n)" >
                <svg v-if="!m.fourth_stop_Socket&&m.type==='new'" @click="start(item,index,m,n,'fourth_gross_weight','fourth_stop_Socket')" t="1616566520808" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2053" width="16" height="16"><path d="M512 149.333333A362.666667 362.666667 0 1 1 149.333333 512 363.093333 363.093333 0 0 1 512 149.333333M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z" p-id="2054"></path><path d="M465.493333 352a42.666667 42.666667 0 0 0-42.666666 42.666667v232.106666a42.666667 42.666667 0 0 0 22.613333 38.4 45.226667 45.226667 0 0 0 45.226667 0l182.186666-117.333333a42.666667 42.666667 0 0 0 20.053334-37.12 42.666667 42.666667 0 0 0-20.48-37.12l-183.466667-114.773333a46.933333 46.933333 0 0 0-23.466667-6.826667z" p-id="2055"></path></svg>
                <svg v-if="m.fourth_stop_Socket&&m.type==='new'" @click="stop(item,index,m,n,'fourth_gross_weight','fourth_stop_Socket')"  t="1616567734871" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2201" width="16" height="16"><path d="M512 95.268571A416.914286 416.914286 0 1 1 95.085714 512 417.426286 417.426286 0 0 1 512 95.268571M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m-130.925714 725.321143a47.542857 47.542857 0 0 1-47.542857-47.542857V346.368a47.542857 47.542857 0 1 1 95.085714 0v331.410286a47.542857 47.542857 0 0 1-47.542857 47.542857z m261.851428 0a47.542857 47.542857 0 0 1-47.542857-47.542857V346.368a47.542857 47.542857 0 1 1 95.085714 0v331.410286a47.542857 47.542857 0 0 1-47.542857 47.542857z" p-id="2202"></path></svg>
              </div>
        </td>
        <td>
              <div v-for="(m,n) in item.repack_details" :key="n" class="relative">
                  <input type="text"  disabled  v-model="m.net_weight"  >
              </div>
        </td>
        <td>
               <div v-for="(m,n) in item.repack_details" :key="n" class="relative">
                  <input type="text"  disabled v-model="m.loss" >
               </div>
        </td>
        <td>
             <div v-for="(m,n) in item.repack_details" class="relative" :key="n">
                <select :disabled="m.type!=='new'" v-model="m.operation" @change="selectOperation(item,index,m,n)">
                    <option value="OK">OK</option>
                    <option value="Continue">Continue</option>
                    <option value="Done">Done</option>
                </select>
               <span v-if="m.operation!=='OK'&&m.operation!=='Done'&&n!==0||m.add" @click="del(item,index,n)" class="del">x</span>
             </div>
        </td>
        <td width="150">
          <div v-for="(m,n) in item.repack_details" :key="n">
            <!--<span v-if="m.operation==='OK'||m.operation==='Done'" @click="print(item,m)" class="blue text-blue-500 cursor-pointer">默认打印</span>-->
            <!--<span v-if="m.operation==='OK'||m.operation==='Done'" @click="print_(item,m)" class="blue text-blue-500 cursor-pointer ml10">打印</span>-->
            <a-button v-if="m.operation==='OK'||m.operation==='Done'" type="primary" size="small" :loading="m.loading_print" @click="print(item,m)">默认打印</a-button>
            <a-button class="ml-5" v-if="m.operation==='OK'||m.operation==='Done'" type="primary" size="small" :loading="m.loading_print_" @click="print_(item,m)">打印</a-button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </a-card>
  <div style="text-align: right;margin: 10px;">
    <a-button type="primary" :loading="loading" @click="save">提交</a-button>
  </div>
    <a-modal v-model:visible="visible"  :width="1200" title="Print">
      <table class="modalTable">
          <thead>
             <th width="150">Batch No#</th>
             <th width="150">CAS</th>
             <th width="100">storage_cond</th>
             <th width="100">exterior</th>
             <th width="100">expect_pack_size</th>
             <th width="100">shelf</th>
          </thead>
          <tbody>
              <tr v-for="(item,index) in printAllData" :key="index">
                <td width="150">
                  <input type="text" v-model="item.batch">
                </td>
                <td width="150">
                  <input type="text" v-model="item.cas">
                </td>
                <td width="100">
                  <input type="text" v-model="item.storage_cond">
                </td>
                <td width="100">
                  <input type="text" v-model="item.exterior">
                </td>
                <td width="100">
                  <input type="text" v-model="item.expect_pack_size">
                </td>
                <td width="100">
                  <input type="text" v-model="item.shelf">
                </td>
              </tr>
          </tbody>
        </table>
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="modalLoading" @click="handleOk">Print</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent , onMounted,ref} from 'vue';
  import { repack_request_detail,repack_request_repack } from '/@/api/warehouse/repack/index';
  import { useRouter } from 'vue-router';
  import { BasicTable } from '/@/components/Table';
  import axios from 'axios'
  import Big from "/@/big/a/big.mjs";
  import { message } from 'ant-design-vue';
  export default defineComponent({
    name: 'repack_detail',
    components: { BasicTable },
    setup() {
      const wraps = [
        "氟化瓶 500mg固液通用",
        "玻璃瓶 5ml固液通用",
        "玻璃瓶 10ml固液通用",
        "玻璃瓶 25ml液体",
        "玻璃瓶 25g固体",
        "玻璃瓶 60ml固液通用",
        "玻璃瓶 75ml固体",
        "玻璃瓶 125ml液体",
        "玻璃瓶 250g固体",
        "玻璃瓶 250g液体",
        "玻璃瓶 500ml液体",
        "氟化瓶 200ml固体",
        "氟化瓶 500g固体蓝盖子",
        "氟化瓶 1kg固体蓝盖子",
        "氟化瓶 500ml液体",
        "氟化瓶 1L液体",
        "氟化瓶 500ml液体  外贸专用",
        "氟化瓶 500ml液体  棕色AK专用",
        "氟化瓶 1L液体   外贸专用",
        "氟化瓶 1L液体   棕色AK专用",
        "氟化桶 2kg固体黄盖子",
        "氟化桶 1kg固体  棕色AK专用",
        "氟化桶 2kg固体  棕色AK专用",
        "氟化瓶 2.5L液体",
        "氟化瓶 5L液体",
        "氟化桶 5kg固体",
        "氟化桶 10kg固体",
        "氟化桶 10L液体",
        "氟化桶 20L液体",
      ];
      let dataSource = ref([])
      let packs = ref([])
      let batchno = ref([])
      let printAllData = ref([])
      let ws = ref({})
      let loading=ref<boolean>(false)
      const visible = ref<boolean>(false);
      const loading_print = ref<boolean>(false);
      const loading_print_ = ref<boolean>(false);
      const modalLoading = ref<boolean>(false);
      let shelf=ref('')
      let batch=ref('')
      let pack_size=ref('')
      let pack_unit=ref('')
      let first_gross_weight=ref('')

      let index = 0
      let n = 0
      const router = useRouter();
     const getRepeatNum=(arr)=>{
        var obj = {};
        for(var i= 0, l = arr.length; i< l; i++){
          var item = arr[i];
          obj[item] = (obj[item] +1 ) || 1;
        }
        return obj;
      }
      onMounted(async () => {
        const data = await repack_request_detail(router.currentRoute.value.params.id)
        let batch=[]
        console.log(data.requirements.batchno)
        for(let key in data.requirements.batchno){
          data.requirements.batchno[key].forEach(res=>{
            batch.push({
              batch:key,
              ...res
            })
          })
        }
        data.requirements.batchno=batch
        data.requirements.batchno.forEach(res=>{
          res.border=false
        })

        let titleList = data.details.map(item => {
          return item.pack_size
        })
        let myObj = getRepeatNum(titleList)
        let winningList = []
        for(let i in myObj){
          let obj = {
            pack_size:i,
            qty:myObj[i]
          }
          winningList.push(obj)
        }
        console.log(winningList)
        if(data.details.length===0){
          data.requirements.requirements.forEach(res=> {
            for(let i=0;i<Number(res.qty);i++){
              data.details.push({
                repack_details:[{
                  type:'new',
                  loading_print:false,
                  loading_print_:false,
                  wrap:'',
                  first_stop_Socket:false,
                  second_stop_Socket:false,
                  third_stop_Socket:false,
                  fourth_stop_Socket:false,
                  repack_inventory_id:'',
                  base_pack_size:res.base_pack_size,
                  expect_pack_size:res.pack_size,
                  expect_pack_unit:res.pack_unit,
                  first_gross_weight: "",
                  second_gross_weight: "",
                  third_net_weight: "",
                  fourth_gross_weight: "",
                  net_weight:'',
                  loss: "",
                  operation:''
                }]
              })
            }
          })
        }else{
          data.details.forEach(res=>{
            res.repack_details=[]
          })
          data.details.forEach(res=>{
            res.repack_details.push(JSON.parse(JSON.stringify(res)))
          })
          data.requirements.requirements.forEach(res=>{
            winningList.forEach(r=>{
              if(res.pack_size==r.pack_size){
                let num=res.qty-r.qty
                if(num>0){
                  for(let i=0;i<num;i++){
                    data.details.push({
                      repack_details:[{
                        type:'new',
                        loading_print:false,
                        loading_print_:false,
                        wrap:'',
                        first_stop_Socket:false,
                        second_stop_Socket:false,
                        third_stop_Socket:false,
                        fourth_stop_Socket:false,
                        repack_inventory_id:'',
                        base_pack_size:res.base_pack_size,
                        expect_pack_size:res.pack_size,
                        expect_pack_unit:res.pack_unit,
                        first_gross_weight: "",
                        second_gross_weight: "",
                        third_net_weight: "",
                        fourth_gross_weight: "",
                        net_weight:'',
                        loss: "",
                        operation:''
                      }]
                    })

                  }
                }
              }
            })
          })
        }
        batchno.value=data.requirements.batchno
        packs.value=data.details
        dataSource.value.push(data)
        if(batchno.value.length>0){
          repack(batchno.value[0])
        }
      });
      const add=()=>{
        packs.value.push({
          repack_details:[{
            type:'new',
            add:true,
            wrap:'',
            first_stop_Socket:false,
            second_stop_Socket:false,
            third_stop_Socket:false,
            fourth_stop_Socket:false,
            repack_inventory_id:'',
            base_pack_size:'',
            expect_pack_size:'',
            expect_pack_unit:'g',
            first_gross_weight: "",
            second_gross_weight: "",
            third_net_weight: "",
            fourth_gross_weight: "",
            net_weight:'',
            loss: "",
            operation:''
          }]
        })
      }
      const del=(item,index,n)=>{
        if(n>0){
          item.repack_details.splice(n,1)
          item.repack_details[n-1].operation=''
        }else{
          packs.value.splice(index,1)
        }
      }
      const change_first_gross_weight=(m)=>{
        first_gross_weight.value=m.first_gross_weight
      }
      const change_net_weight=(m)=>{
        m.net_weight=m.third_net_weight
      }
      const change_fourth_gross_weight=(item,m,n)=>{
        getLoss(item,m,n)
      }
      const getWeight=(item,m,n)=>{
        if(item.repack_details.length>1){
          item.repack_details[item.repack_details.length-1].net_weight= item.repack_details.reduce(function (total, currentValue, currentIndex, arr) {
            return Number(total) + Number(currentValue.third_net_weight);
          }, 0);
        }else{
          m.net_weight=m.third_net_weight
        }
        if(m.first_gross_weight&&m.third_net_weight&&m.fourth_gross_weight){
          m.loss=(parseFloat(m.first_gross_weight)-parseFloat(m.third_net_weight)-parseFloat(m.fourth_gross_weight)).toFixed(2)
        }
      }
      const getLoss=(item,m,n)=>{
        let num = item.repack_details.reduce((ageSum, currStudent) => {
          return parseFloat(ageSum)+parseFloat(currStudent.third_net_weight);
        },0)
        num=num?num:0
        m.loss=new Big(parseFloat(first_gross_weight.value)).minus(parseFloat(m.fourth_gross_weight)).minus(num)
      }
      const start=(item,index,m,n,name,type)=>{
        packs.value[index].repack_details[n][type]=true
        ws.value[name] = new WebSocket("ws://127.0.0.1:5678/")
        ws.value[name].onmessage =  ((evt)=>{
          const items = JSON.parse(evt.data);
          var output = []
          for (var x in items){
            output[x] = items[x];
          }
          var buffer = Buffer.from(output);
          if(buffer.length==10){
            packs.value[index].repack_details[n][type]=true
            packs.value[index].repack_details[n][name]=buffer.toString()
          }
        })
      }
      const stop=(item,index,m,n,name,type) =>{
        ws.value[name].close();
        packs.value[index].repack_details[n][type] = false
        let nameNext, typeNext
        if(name==='first_gross_weight'){
         first_gross_weight.value=m.first_gross_weight
        }else if(name==='third_net_weight'){
          getWeight(item,m,n)
        }else if(name==='fourth_gross_weight'){
         getLoss(item,m,n)
        }
      }
      const repack=(item)=>{
        shelf.value=item.shelf
        batch.value=item.batch
        pack_size.value=item.pack_size
        pack_unit.value=item.pack_unit
        batchno.value.forEach(res=>{
          res.border=false
        })
        item.border=true
        packs.value.forEach((res,index)=>{
          res.repack_details.forEach((r,i)=>{
            if(r.operation!=='OK'&&r.operation!=='Done'){
              r.model_id=item.model_id
              r.model_type=item.model_type
            }
            if(res.repack_details.length>1){
              if(r.operation===''){
                packs.value[this.index].repack_details[this.n+1].first_gross_weight=''
              }
            }
          })
        })
      }
     const selectOperation=(item,index,m,n)=> {
       let data = {
         type: 'new',
         wrap: m.wrap,
         first_stop_Socket: false,
         second_stop_Socket: false,
         third_stop_Socket: false,
         fourth_stop_Socket: false,
         repack_inventory_id: (m.repack_inventory_id ? m.repack_inventory_id : ''),
         expect_pack_size: m.expect_pack_size,
         base_pack_size: m.base_pack_size,
         expect_pack_unit: m.expect_pack_unit,
         first_gross_weight: '',
         second_gross_weight: "",
         third_net_weight: "",
         fourth_gross_weight: "",
         net_weight: '',
         loss: "",
         operation: '',
         model_id:m.model_id,
         model_type:m.model_type
       }
       if (m.operation === 'Continue') {
         packs.value[index].repack_details.splice(n + 1, 0, data)
         index.value = index
         n.value = n
       } else {
         let weight = item.repack_details.reduce((ageSum, currStudent) => {
           return parseFloat(ageSum) + parseFloat(currStudent.net_weight);
         }, 0)
         weight = weight ? weight : 0
         if (Math.abs(Number(weight) - Number(m.base_pack_size)) > m.base_pack_size * dataSource.value[0].weight_precision) {
           alert('误差超出范围！')
         }
       }
     }
      const printAll=()=>{
        loading_print.value=true
        let data = []
       packs.value.forEach(res=>{
          res.repack_details.forEach(r=> {
            data.push({
              批号: batch.value,
              存储条件:dataSource.value[0].storage_cond,
              外观: dataSource.value[0].exterior,
              数量:r.expect_pack_size+r.expect_pack_unit,
              货架: shelf.value,
              CAS: dataSource.value[0].cas,
              id:dataSource.value[0].cas+','+batch.value +','+r.expect_pack_size+r.expect_pack_unit+','+dataSource.value[0].id+(r.id?'-'+r.id:''),
              configID: 1
            })
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
          }).finally(function(){
          loading_print.value=false
        })
      }
      const printAll_=()=>{
        printAllData.value=[]
        packs.value.forEach(res=>{
          res.repack_details.forEach(r=> {
            printAllData.value.push({
              batch: batch.value,
              storage_cond:dataSource.value[0].storage_cond,
              exterior: dataSource.value[0].exterior,
              expect_pack_size:r.expect_pack_size+r.expect_pack_unit,
              shelf: shelf.value,
              cas: dataSource.value[0].cas,
            })
          })
        })
        visible.value = true;
        printAllData.value= [{
          batch: batch.value,
          storage_cond:dataSource.value[0].storage_cond,
          exterior: dataSource.value[0].exterior,
          expect_pack_size:m.expect_pack_size+m.expect_pack_unit,
          shelf: shelf.value,
          cas: dataSource.value[0].cas,
        }];
        visible.value = true;
      }
      const print=(item,m)=>{
        m.loading_print=true
        let data = [{
          批号: batch.value,
          存储条件:dataSource.value[0].storage_cond,
          外观: dataSource.value[0].exterior,
          数量:m.expect_pack_size+m.expect_pack_unit,
          货架: shelf.value,
          CAS: dataSource.value[0].cas,
          id:dataSource.value[0].cas+','+batch.value +','+m.expect_pack_size+m.expect_pack_unit+','+dataSource.value[0].id+(m.id?'-'+m.id:''),
          configID: 1
        }];
        axios({
          url: "http://127.0.0.1:8080/mac/ruku.jsp",
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: {datalist:JSON.stringify(data)},
        }).then(function (response) {
          message.success('success');
        }).catch(function (error) {
          message.error('error');
          }).finally(()=>{
          m.loading_print=false
        })
      }
      const print_=(item,m)=>{
        printAllData.value=[]
        printAllData.value= [{
          batch: batch.value,
          storage_cond:dataSource.value[0].storage_cond,
          exterior: dataSource.value[0].exterior,
          expect_pack_size:m.expect_pack_size+m.expect_pack_unit,
          shelf: shelf.value,
          cas: dataSource.value[0].cas,
        }];
        visible.value = true;
      }
       const save=async ()=>{
         loading.value=true
          let request=[]
         packs.value.forEach(res=>{
           if(res.repack_details[0].second_gross_weight&&res.repack_details[0].third_net_weight){
             request.push({
               details:res.repack_details
             })
           }
       })
       request.forEach((items,ind)=>{
         items.details.forEach((item,index)=>{
           if(!item.second_gross_weight&&!item.third_net_weight){
             request[ind].details.splice(index,1)
           }else{
             delete item.type
             delete item.first_stop_Socket
             delete item.second_stop_Socket
             delete item.third_stop_Socket
             delete item.fourth_stop_Socket
           }
         })
       })
       let obj={
         id:router.currentRoute.value.params.id,
         operator:"scala",
         batchno:batch.value,
         shelf:shelf.value,
         request
       }
         try {
           const data=  await repack_request_repack(obj)
         }
         catch(err) {
         }
         finally {
           loading.value=false
         }
     }
      const handleOk = () => {
        modalLoading.value=true
        axios({
          url: "http://127.0.0.1:8080/mac/ruku.jsp",
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: {datalist:JSON.stringify(printAllData.value)},
        }).then(function () {
          visible.value = false;
          message.success('success');
        }).catch(function () {
          message.error('error');
        }).finally(()=>{
          modalLoading.value=false
        })
      };
      const handleCancel = () => {
        visible.value = false;
      };
      return { BasicTable,onMounted,dataSource,packs,wraps,selectOperation,batchno,index,
        change_first_gross_weight,change_net_weight,change_fourth_gross_weight,getLoss,getWeight,first_gross_weight,save,
        printAll,print,printAll_,print_,repack,add,del,loading,visible,handleOk,loading_print,loading_print_,printAllData,handleCancel,modalLoading
      };
    },
  });
</script>
<style >
  .table-auto{
    width: 100%;
  }
  .repack{
    width: 100%;
  }
  .repack input{
    width: 100px;
    border: 1px solid #f2f2f2;
    padding-left: 5px;
  }
  .repack select{
    border: 1px solid #f2f2f2;
  }
  .icon{
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 4px;
  }
  .relative{
    position: relative;
    width: 100px;
    margin: 5px auto 0 auto;
  }
  .ant-card{
    margin: 10px 0;
  }
  .del{
    color: red;
    font-size: 20px;
    margin-left: 5px;
    cursor: pointer;
    position: absolute;
    right: -6px;
    top: -6px;
  }
  .ml10{
    margin-left:10px;
  }
  .h23 span{
    display: inline-block;
    height: 23px;
    line-height: 23px;
    margin-top: 5px;
  }
  .ml-5{
    margin-left:5px
  }
  .modalTable{
    margin: 30px;
    width: 1100px;
  }
  .modalTable td{
    padding: 5px 10px;
  }
  .modalTable input{
    border: 1px solid #f2f2f2;
    padding-left: 5px;
  }
</style>
