<template>
    <div class="container-fluid my-account pt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="success_message" v-text="this.$store.state.list.success_message" v-if="this.$store.state.list.success_message != ''">
          </div>
          <div class="error_message" v-text="this.$store.state.list.error_message" v-if="this.$store.state.list.error_message != ''"></div>
        </div>
        <div class="col-md-3">
           <Sidebar />
        </div>
        <div v-if="orderShimmer" class="col-md-9"
        >
        <Shimmer />
        </div>
        <div class="col-md-9" v-else>
         
          <div class="row">
            <div class="col-md-12">
              <div class="content-box">
                <table class="table order-table return-ex-table responsive-table" v-if="order.length">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Order#</th>
                      <th>Date</th>
                      <th>QTY</th>
                      <th>Size</th>
                      <!--th>Status</th-->
                      <th>Reason</th>
                      <th class="text-right">Status</th>
                      <th v-if="checkIfShipped" class="action font-medium" style="text-align: center;"><span>Action</span> </th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr  v-for="(items) in order" :key="items">
                      <td class="text-start" >
                          <!-- <img :src="items.image" :alt="items.name" width='60px'/><span>{{items.order_increment_id}}</span> -->
                          <div>
                            <div class="order_img d-flex">
                               <nuxt-link :to="{ path: '/product/' + items.url_key }">
                                <img
                                  v-if="items.image"
                                  :src="
                                    $store.state.list.image_url+'700x0/' +
                                      items.image
                                  "
                                  :alt="items.order_increment_id"
                                  width="60px"
                                  class="mr-2"
                                  style="margin-right: 5px;"
                                />
                               </nuxt-link>

                               <div class="col-md-8 col-8 mobile-design">
                                   <nuxt-link style="text-decoration: none;" :to="{ path: '/product/' + items.url_key }">
                                   <h6 class="item-name kartmax-text-f-14 my-1" v-text="items.name">
                                   </h6>
                                  </nuxt-link> 
                                  <!-- <nuxt-link
                                    class="order-no"
                                      :to="{
                                        path: '/account/order-detail',
                                        params: { id: items.order_quote_id },
                                        query: { id: items.order_quote_id }
                                      }"
                                    >
                                  </nuxt-link> -->
                                  <span class="kartmax-text-f-14">SKU:{{items.sku}}</span>

                                </div>
                            </div>
                              
                          </div>
                         
                        </td>
                      <!-- <td @click.prevent="items_chat(index, items.id)" class=" w-100 text-start d-flex">
                         
                        <img v-if="items.image" :src="$store.state.list.image_url+'cover/200x200/'+items.image" :alt="items.name" width='60px'/>
                        <img v-else src="/images-kartmax/not-found.png" :alt="items.name" width='60px'/>
                        <div class="col-md-8 col-8 mobile-design">
                        <span class="kartmax-text-f-14">{{items.name}}</span >
                        <br/>
                        <span class="kartmax-text-f-14 order-no">SKU:{{items.sku}}</span>

                        </div>
                     
                      </td> -->
                       <td  class="order">
                         <nuxt-link style="text-decoration:none"
                            class="order-no"
                              :to="{
                                path: '/account/order-detail',
                                params: { id: items.order_id },
                                query: { id: items.order_id }
                              }"
                            >
                          <span class="kartmax-text-f-14 order-no">{{items.order_increment_id}}</span>
                          </nuxt-link>
                      </td>
                      <td v-text="items.created_at" class="order-date kartmax-text-f-14"></td>
                      <td v-text="items.qty" class="qty kartmax-text-f-14"></td>
                      <td v-if="items.size !== null" class="size kartmax-text-f-14">{{items.size}}</td>
                      <td v-else class="size kartmax-text-f-14">-</td>
                      <td v-if="items.return_reasons !== null" class="reasons kartmax-text-f-14">{{items.return_reasons}}</td>
                      <td v-else class=" kartmax-text-f-14 reasons">-</td>
                      <td   class="status  kartmax-text-f-14 text-right">{{ modify(items.item_status) }}</td>
                      <!-- <td v-if="items.awb_number != '' && items.awb_number != null" class="action">
                        <p>
                          <button  class="order-with-cod reorder no-margin" @click="view_status(items.awb_number)" style="padding: 8px 8px;width: auto;">Track</button>
                        </p>
                      </td> -->
                    </tr>
                    <tr v-show="index==chatid">
                      <td colspan="7" class="comment_box">
                        <button type="button" class="close" @click="close_commentbox()">×</button>
                        <div class="product_loader comments_loader" style="" v-show="commentLoader == true"><img src="/images-kartmax/giphy.gif"></div>
                        <div class="chat_options" v-if="commentLoader == false && ordercomments.length && commentShow == true">
                          <div class="send-recieve-msg" v-for="(comment,index) of ordercomments" :key="index" :class="{admin:comment.User == 'Admin'}">
                              <div class="user-ico" v-if="comment.User == 'You'">
                                <p class="font-weight-bold">{{comment.User}}</p>
                              </div>
                              <div class="admin-ico" v-if="comment.User == 'Admin'">
                                <p class="font-weight-bold">{{comment.User}}</p>
                              </div>
                              <div class="main_msg" v-text="comment.Comment"></div>
                              <div class="msg_date" v-text="comment.Date"></div>
                          </div>
                      
                        </div>
                        <div class="no-comments" v-else>
                            <p>No Comments found.</p>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                 
                </table>
                <div v-else>
                  <h3 class="text-center">
                    No Order found
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import  Sidebar  from './sidebar'
  import Vue from 'vue'
  import VueCookies from 'vue-cookies'
  import  {modifyMixin} from "../../mixin.js"
  import Shimmer from "../../components/custom/OrderShimmer.vue"


  Vue.use(VueCookies)
  export default {
    mixins:[modifyMixin],
    name: 'order',
     components : {
        Sidebar,Shimmer
      },
    head () {
            return {
               
            }
        },
    computed: {
           checkIfShipped () {
            var isShow = false;
            if(this.order.length)
            {
              this.order.forEach(element => {
                  if(element.awb_number != null ) {
                      return isShow = true
                  }
              });
            }

           return isShow
       },
    },

    // metaInfo() {
    // return {
    //   title: 'Return',
    //   meta: [
    //     { hid: 'description',
    //       name: 'description',
    //       content: ''
    //     },
    //     {
    //       property: 'keywords',
    //       content: ''
    //     }
    //   ],
    //     link:[
    //         {
    //             rel:"canonical",
    //             href:"https://"+location.host+this.$route.fullPath
    //         }
    //     ]
    // }
    // },
    data() {
      return {
        status_popup: true,
        itemstatus:[],
        select_o_n: '',
        select_o_nx: '',
        order: [],
        qty:1,
        latestorder: [],
        latestorderex: [],
        return_popup: true,
        exchange_popup: true,
        return_id:'',
        exchange_id:'',
        select_resion:'',
        exchange_resion:'',
        ordertype:'',
        ac_holder_name:'',
        ac_number:'',
        re_ac_number:'',
        ac_ifsc_code:'',
        variation:[],
        size_error: '',
        ac_holder_name_error: '',
        ac_number_error: '',
        re_ac_number_error: '',
        ifsc_code_error: '',
        reason_error:'',
        exchange_comment:'',
        return_comment:'',
        chatid:'999',
        ordercomments:[],
        commentLoader:false,
        commentShow:false,
        user_comment:'',
        noComments:'',
        comment_error:'',
        orderShimmer:true,
        size: {
            select_size: '',
            max_qty: '1',
            variant_id: '',
            sku: '',
        }
      };
    },
    methods: {
      
      qty_minus(){
        if(this.qty>1){
        this.qty=this.qty-1;
      }
      },
      qty_plus(v){
        if(this.qty<v){
        this.qty=this.qty+1;
        }
      },
      close_popup() {
         this.status_popup = true;
        this.return_popup = true;
      },
      close_popup_ex() {
        this.exchange_popup = true;
      },
      select_size: function () {
          this.size_error = '';
      },
      select_reason:function(){
        this.reason_error = '';
      },
      select_holder_name:function(){
        var h_name = /^([^\s]+[a-z ,A-Z, ])+$/;
        if (this.ac_holder_name.match(h_name)) {
            this.ac_holder_name_error = '';
        }
        else {
            this.ac_holder_name_error = "Please enter valid Name";
        }


      },
      select_ac_number:function(){
        this.ac_number_error = '';
      },
      re_select_ac_number:function(){
        this.re_ac_number_error = '';
      },
      select_ifsc_code:function(){
        this.ifsc_code_error = '';
      },
      select_user_comment:function(){
        this.comment_error = '';
      },
      select_item(v) {
        this.return_id = v;
        this.select_resion='';
        this.size.select_size='';
        this.size.sku='';
        this.return_comment ='';
    
        this.ordertype = this.latestorder[this.select_o_n].ordertype;
        if(this.latestorder[this.select_o_n].accountInfo){
          this.ac_holder_name= this.latestorder[this.select_o_n].accountInfo.account_holder_name;
          this.ac_number= this.latestorder[this.select_o_n].accountInfo.account_number;
          this.re_ac_number=this.latestorder[this.select_o_n].accountInfo.account_number;
          this.ac_ifsc_code= this.latestorder[this.select_o_n].accountInfo.ifsc_code;
        } else{
          this.ac_holder_name='';
          this.ac_number='';
          this.ac_ifsc_code='';
          this.re_ac_number='';
        }
        this.qty=1;
      },
      select_item_ex(v) {
        this.return_id = v;
        this.size.select_size='';
        this.size.sku='';
        this.exchange_resion ='';
        this.exchange_comment ='';
        this.qty=1;
      },
      items_chat(v,rid) {
        this.chatid = v;
        this.noComments = '',
        this.commentLoader = false,
        this.ordercomments=[];
        this.commentShow = false;

      },
      close_commentbox(){
        this.chatid = 999;
      },
    
     
   
      get_account: async function  () {
        if (this.$store.state.list.customer_id != null && this.$store.state.list.customer_id != '') {
          this.$store.state.list.error_message = '';
          this.$store.state.list.success_message = '';
          var form = new FormData();
          form.append("customer_id", this.$store.state.list.customer_id);
          form.append("customer_session",this.$store.state.list.customer_session);
          form.append("store", this.$store.state.list.store);
          await axios.post(this.$store.state.list.cart_api_url+'/v1' + '/customer/exchange-orders', form)
            .then(response => {
              if (response.data.success === true) {
                this.$store.state.list.page_loader = false;
                this.order = response.data.data;
                this.orderShimmer = false;
              }
              else {
                this.$store.state.list.page_loader = false;
                this.$store.state.list.error_message = response.data.message;
                this.orderShimmer = false;

              }
            })
            .catch(error => {
              this.$store.state.list.page_loader = false;
              if (error.message === "Network Error") {
                this.$store.state.list.error_message = error.message;
              }
              window.scrollTo(0, 0);
                this.orderShimmer = false;

            })
        }
      },
     
    },
    mounted() {
      this.get_account()
    },
    beforeMount() {
      if (this.$store.state.list.customer_id === null || this.$store.state.list.customer_id === '') {
        this.$router.push('/login')
      }
      this.$store.state.list.error_message = '',
        this.$store.state.list.success_message = '',
        this.$store.state.list.breadcrumb = 'Return',
        this.$store.state.list.page_loader = false;
    },

  }
</script>
