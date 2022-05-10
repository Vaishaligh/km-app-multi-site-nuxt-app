<template>
  <div>
    <div class="container-fluid pt-5">
      <div class="row">
        <div class="col-md-12">
          <div
            class="text-success kartmax-text-f-13"
            v-text="this.$store.state.list.success_message"
            v-if="this.$store.state.list.success_message != ''"
          ></div>
          <div
            class="text-danger kartmax-text-f-13"
            v-text="this.$store.state.list.error_message"
            v-if="this.$store.state.list.error_message != ''"
          ></div>
        </div>
        <div class="col-md-3" >
          <Sidebar :returnShow='returnShow'  :exchangeShow="exchangeShow"  :creditShow="creditShow"/>
        </div>
        <div v-if="orderShimmer" class="col-md-9"
        >
        <Shimmer />
        </div>
        <div v-else class="col-md-9">
          <div class="row">
            <div class="col-md-12">
              <div>
                <div
                  v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="10"
                >
                <div class="row p-0 m-0">
                  <div class="col-md-7">

                  </div>
                  <div class="col-md-5 d-flex">
                    <div class="col-5 pt-2">
                      <span>Filter By Status: 
                                  <i class="fas fa-solid fa-filter pt-1 pl-2" style="position:absolute"></i>
                    </span>
                    </div>
                          <select
                              class="input-text form-control"
                              v-model="type"
                              @change="get_account(1,true,true,type)"
                            >
                            <option
                              v-for="data in filter"
                          :value="(data)"

                            >
                              {{ capitalizeFirstLetter(data) }}
                            </option>
                          </select>
                  </div>

                </div>
                  <table class="table responsive-table" v-if="order.length>0">
                    <thead>
                     
                      <tr>
                        <th class="text-nowrap " >Order #</th>
                         <th class="text-nowrap" > Item SKU</th>
                        <th class="text-nowrap " > Date</th>
                        <th style="white-space: nowrap; ">Item Amt</th>
                        <th class="text-nowrap" >Order Total</th>
                       <div class="d-flex">

                        <th class="text-nowrap pt-4">Status</th>
                     
                    
                       </div>
                          <th class="text-end" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(items, index) in order" :key="index">
                        <td class="text-start">
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
                                <!-- <img
                                  v-else
                                  src="/images-kartmax/not-found.png"
                                  :alt="items.order_increment_id"
                                  width="60px"
                                  class="pr-2"
                                /> -->
                               </nuxt-link>

                               <div class="col-md-8 col-8 mobile-design">
                                   <nuxt-link style="text-decoration: none;" :to="{ path: '/product/' + items.url_key }"><h6 class="item-name my-1" v-text="items.name"></h6>
                                  </nuxt-link> 
                                  <nuxt-link
                                    class="order-no"
                                      :to="{
                                        path: '/account/order-detail',
                                        params: { id: items.order_quote_id },
                                        query: { id: items.order_quote_id }
                                      }"
                                    >
                                  <span class="kartmax-text-f-14 order-no">{{items.order_increment_id}}</span>
                                  </nuxt-link>
                                </div>
                            </div>
                              
                          </div>
                         
                        </td>
                         <td
                          class="orderDetail kartmax-text-f-14"
                          style=" white-space: nowrap;"
                        >
                          {{ items.sku }}
                        </td>
                        <td
                          v-text="items.order_date"
                          class="order-date kartmax-text-f-14"
                          style="white-space: nowrap;"
                        ></td>
                         <td
                          class="total kartmax-text-f-14"
                        >
                        <i class="kartmax_currency"></i> {{items.w_product_cost}}
                        </td>
                        <td
                          class="total kartmax-text-f-14"
                        >
                        <i class="kartmax_currency"></i> {{items.net_amount}}
                        </td>
                       

                        <td class="status kartmax-text-f-14" >
                          {{
                            items.item_status == "PENDING"
                              ? "Order Confirmed"
                              : modify(items.item_status)
                          }}
                        </td>
                        <td nowrap class=" text-end kartmax-text-f-14">
                          <!--button class="order-with-cod" v-if="items.showCOD == 1" @click="order_with_cod(items.order_quote_id)">Reorder with <span>CASH ON DELIVERY</span></button-->
                          <a
                            href="#"
                            v-if="items.is_returnable == true && (items.item_status == 'KM_ORDER_DELIVERED' || items.item_status == 'km_order_delivered')"
                            @click.prevent="
                              order_return(
                                items
                              )
                            "
                            class="reorder btn btn-primary btn-sm d-block w-100 mb-1"
                            >Return</a
                          >
                            <a
                            href="#"
                            v-if="items.is_exchangable == 1 && (items.item_status == 'KM_ORDER_DELIVERED' || items.item_status == 'km_order_delivered')"
                            @click.prevent="
                              order_exchange(
                                items
                              )
                            "
                            class="reorder btn btn-primary btn-sm d-block w-100 mb-1"
                            >Exchange</a
                          >
                          
                          <nuxt-link
                            class="btn btn-primary  btn-sm d-block w-100 mb-1"
                            :to="{
                              path: '/account/order-detail',
                              params: { id: items.order_quote_id },
                              query: { id: items.order_quote_id }
                            }"
                            >View Details</nuxt-link
                          >
                          <a
                            :href="
                              items.tracking_url
                            "
                            v-if="
                              items.tracking_url != null && items.tracking_url != ''  && items.tracking_url !==undefined && items.item_status !== 'KM_ORDER_DELIVERED' && items.item_status !== 'KM_ORDER_CUST_RETURN_COMPLETED'
                              &&( items.item_status !== 'km_order_cust_return_completed' || items.item_status !== 'km_order_delivered')
                            "
                            target="blank"
                            class="btn btn-primary btn-sm d-block w-100"
                            >Track Order</a
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-else>
                  <h3 class="text-center pt-4" v-if="!this.$store.state.list.page_loader">
                    No Order found
                  </h3>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="cancel_modal"
          class="modal"
          v-bind:class="[this.cancel_popup ? '' : 'active']"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title font-bold">
                  Cancel Order - {{ this.canceledItem }}
                </h4>
                <button type="button" class="close" @click="close_popup()">
                  ×
                </button>
              </div>
              <div class="modal-body">
                <div class="reason-container mb-3">
                  <!-- <label>Cancel Reason</label> -->
                  <select
                    class="input-text form-control"
                    v-model="cancel_reason"
                    required
                  >
                    <option value="">--Select Cancel Reasons--</option>
                    <option value="Order Placed by mistake"
                      >Order Placed by mistake</option
                    >
                    <option value="Items would not arrive on time"
                      >Items would not arrive on time</option
                    >
                    <option value="Found Cheaper somewhere else"
                      >Found Cheaper somewhere else</option
                    >
                    <option value="Need to change Shipping Address"
                      >Need to change Shipping Address</option
                    >
                    <option value="Need to change Payment Method"
                      >Need to change Payment Method</option
                    >
                    <option value="Expected delivery time is very long"
                      >Other</option
                    >
                  </select>

                  <p class="text-danger kartmax-text-f-13">
                    {{ cancel_error }}
                  </p>
                </div>
                <button
                  class="input-text form-control submit"
                  @click="cancelorder(canceledItem)"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          id="return_modal"
          class="modal exchange-modal"
          v-bind:class="[this.exchange_popup ? 'd-block' : '']"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title font-bold">Request Exchange </h4>
                <button type="button" class="btn" @click="close_popup()">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="modal-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="item"><span>Name</span></th>
                      <th class="qty"><span>Qty</span></th>
                      <th class="qty"><span>Size</span></th>
                      <th class="subtotal"><span>Item Amount</span></th>
                      <th class="subtotal"><span>Date</span></th>
                      
                    </tr>
                  </thead>
                    <tbody class="cart-item">
                      <tr class="item-info">
                        <td class="item">
                          <div class="row">
                            <div class="col-md-2 col-6 order_image">
                              <nuxt-link :to="{ path: '/product/' + exchange_order.url_key }">  <img
                                :src="
                                  $store.state.list.image_url+'600x0/' +
                                  exchange_order.image
                                "
                                :alt="exchange_order.name"
                                :title="exchange_order.name"
                                class="w-100"
                              />
                              </nuxt-link> 
                            </div>
                            <div class="col-md-10 col-6 mobile-design">
                              <nuxt-link :to="{ path: '/product/' + exchange_order.url_key }"><h6 class="item-name my-1" v-text="exchange_order.name"></h6>
                              </nuxt-link> 
                              <p class="m-0"> SKU: {{exchange_order.sku}}</p>
                           
                            </div>
                          </div>
                        </td>
                        <td class="qty">
                          <div class="control kartmax-text-f-14">
                            <p v-text="exchange_order.qty"></p>
                          </div>
                        </td>
                        
                         <td class="qty">
                          <div class="control kartmax-text-f-14">
                            <p v-text="exchange_order.size"></p>
                          </div>
                        </td>
                         <td class="qty">
                          <div class="control kartmax-text-f-14">
                            <p v-text="exchange_order.w_product_cost"></p>
                          </div>
                        </td>
                         <td class="qty">
                          <div class="control kartmax-text-f-14">
                            <p v-text="exchange_order.order_date"></p>
                          </div>
                        </td>
                        
                      </tr>
                    </tbody>
                  <tbody>
                       <!-- For Exchange -->
                    <tr >
                      <td colspan="6" class="select-order">
                        <form
                          class="reasons_form"
                          @submit="
                            request_exchange(
                              exchange_order
                            )
                          "
                        >
                          <div class="reason-container mb-3 w-100 cart-item d-none">
                            <label>Select Quantity</label>
                            <div class="qty_box d-flex" style="width: 130px;">
                              <a
                                href="#"
                                class=""
                                @click.prevent="qty_minus"
                                v-bind:class="{ disabled: qty == 1 }"
                                ><i class="fa fa-minus"></i
                              ></a>
                              <input
                                type="text"
                                :max="exchange_order.qty"
                                min="1"
                                v-model="qty"
                                class="return-input"
                                readonly="readonly"
                              /> 
                              <a
                                href="#"
                                class=""
                                @click.prevent="qty_plus(exchange_order.qty)"
                                v-bind:class="{ disabled: exchange_order.qty == qty }"
                                ><i class="fa fa-plus"></i></a
                              ><span> /</span> <span>{{ exchange_order.qty }}</span>
                            </div>
                            <div class="total_price">
                              Total: <i class="kartmax_currency"></i>
                              {{ exchange_order.net_amount }}
                            </div> 
                          </div>

                          <div class="product-detail-container">
                            <div class="size-container">
                              <label>Select New Size</label>
                              <div class="size-box">
                                <label
                                  class="size select-one-size "
                                  v-for="(item, index) in variation" :key="index"
                                  v-bind:class="{
                                    'active-size':
                                      item[0] ===
                                        exchange_order.size,
                                  }"
                                  @click="exhangeSize(item[0])"
                                >
                                  <input
                                    type="radio"
                                    v-model="size"
                                    name="size"
                                    :value=item[0]
                                  
                                  /><span
                                    v-text="item[0]"
                                  ></span>
                                </label>
                                
                              </div> 
                              <p class="text-danger kartmax-text-f-13">
                                  {{ size_error }} 
                                </p>
                            </div>
                          </div>

                          <div class="reason-container mb-3 w-100">
                            <select
                              class="input-text form-control"
                              v-model="select_resion"
                              required
                            >
                              <option value=""
                                >--Select Exchange Reasons--</option
                              >
                              <option :value="reason" v-for="(reason,i) in return_reasons" :key="i"> {{reason}}</option>
                            </select>
                          </div>

                          <div class="reason-container comments mb-3">
                            <textarea
                              class="w-100 form-control"
                              placeholder="Comments (optional)"
                              maxlength="490"
                              v-model="exchange_comment"
                            ></textarea>
                          </div>
                          <div class="text-end">
                             <button class="btn btn-primary px-5 py-2 submit">
                                Submit
                              </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>



        <div
          id="return_modal"
          class="modal"
          v-bind:class="[this.return_popup ? '' : 'd-block']"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title font-bold">Request Return </h4>
                <button type="button" class="btn" @click="close_popup()">
                  ×
                </button>
              </div>
              <div class="modal-body">
                <table class="table">
                  <tbody>
                    <!-- For Return -->
                    <tr v-if="this.return_popup == false">
                      <td colspan="5" class="select-order">
                        <form
                          class="reasons_form reasons_form_return"
                          @submit="
                            request_return(
                              
                            )
                          "
                        >
                         
                          <div class="reason-container mb-3 w-100">
                            <select
                              class="input-text form-control"
                              v-model="select_resion"
                              required
                            >
                              <option value=""
                                >--Select Return Reasons--</option
                              >
                              <option :value="reason" v-for="(reason,i) in return_reasons" :key="i"> {{reason}}</option>
                            </select>
                          </div>
                          <div class="reason-container comments mb-3">
                            <textarea
                              class="w-100 form-control"
                              placeholder="Comments (optional)"
                              maxlength="490"
                              v-model="return_comment"
                            ></textarea>
                          </div>

                          <div v-if="latestorder.payment_method == 'cod'">
                            <!-- <div class="refund__type">
                          <div class="refund__type_sec">
                              <label for="account"><input type="radio" @change="refundType($event)"
                                      id="account" name="Type" value="account" >Refund by Account</label>
                          </div>
                          <div class="refund__type_sec">
                              <label for="coupon"><input type="radio"
                                      @change="refundType($event)" id="coupon" name="Type"
                                      value="coupon" checked>Refund by Coupon</label>
                          </div>
                      </div> -->
                            <div
                              class="refund-by-bank"
                              v-if="refund_type == 'account'"
                            >
                              <div class="account_info">
                                <h5>
                                  For refund, please enter your account details
                                  below
                                </h5>
                                <div class="reason-container w-100 mb-3">
                                  <input
                                    type="text"
                                    class="w-100 form-control"
                                    placeholder="Account Holder Name*"
                                    @keyup="select_holder_name"
                                    v-model="ac_holder_name"
                                  />
                                  <p class="text-danger kartmax-text-f-13">
                                    {{ ac_holder_name_error }}
                                  </p>
                                </div>
                                <div class="reason-container w-100 mb-3">
                                  <input
                                    type="password"
                                    class="w-100 form-control"
                                    placeholder="Account Number*"
                                    @keyup="select_ac_number"
                                    v-model="ac_number"
                                  />
                                  <p class="text-danger kartmax-text-f-13">
                                    {{ ac_number_error }}
                                  </p>
                                </div>
                                <div class="reason-container w-100 mb-3 pl-3">
                                  <input
                                    type="text"
                                    class="w-100 form-control"
                                    placeholder="Re-enter Account Number*"
                                    @keyup="re_select_ac_number"
                                    v-model="re_ac_number" 
                                  />
                                  <p class="text-danger kartmax-text-f-13">
                                    {{ re_ac_number_error }}
                                  </p>
                                </div>
                                <div class="reason-container w-100 mb-3">
                                  <input
                                    type="text"
                                    class="w-100 form-control"
                                    placeholder="Bank Name*"
                                    @keyup="bank_name_enter"
                                    v-model="bank_name"  
                                  />
                                  <p class="text-danger kartmax-text-f-13">
                                    {{ bank_name_error }}
                                  </p>
                                </div>
                                <div class="reason-container w-100 mb-3 ">
                                  <input
                                    type="text"
                                    class="w-100 form-control"
                                    placeholder="Branch Name*"
                                    @keyup="branch_name_enter"
                                    v-model="branch_name"
                                  />
                                  <p class="text-danger kartmax-text-f-13">
                                    {{ branch_name_error }}
                                  </p>
                                </div>
                                <div class="reason-container w-100 mb-3 pl-3">
                                  <input
                                    type="text"
                                    class="w-100 form-control"
                                    placeholder="IFSC Code*"
                                    @keyup="select_ifsc_code"
                                    v-model="ac_ifsc_code"
                                  />
                                  <p class="text-danger kartmax-text-f-13">
                                    {{ ifsc_code_error }}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button class="input-text form-control submit">
                            Submit
                          </button>
                        </form>
                      </td>
                    </tr>
                   
                 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- customer review start here-->
        <div
          class="rating_popup modal "
          @click="ratingPopupclose"
          :class="{ active: this.ratingpopup == true }"
        >
          <div
            class="container modal-dialog"
            id="review"
            @click="stopPropagation"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title font-bold">Please add your rating</h4>
                <div class="close_icon_similar" @click="ratingPopupclose">
                  <img src="/images/close-icon.png" alt="Close" />
                </div>
              </div>
              <div class="modal-body">
                <div class="col-md-12">
                  <form @submit="customer_review">
                    <!-- <label class="w-100">Your rating *</label> -->
                    <div class="starts_rating text-left">
                      <div class="stars">
                        <input
                          class="star star-5"
                          id="star-5"
                          type="radio"
                          value="5"
                          v-model="rating.star"
                          name="star"
                          required
                        />
                        <label class="star star-5" for="star-5"></label>
                        <input
                          class="star star-4"
                          id="star-4"
                          type="radio"
                          value="4"
                          v-model="rating.star"
                          name="star"
                          required
                        />
                        <label class="star star-4" for="star-4"></label>
                        <input
                          class="star star-3"
                          id="star-3"
                          type="radio"
                          value="3"
                          v-model="rating.star"
                          name="star"
                          required
                        />
                        <label class="star star-3" for="star-3"></label>
                        <input
                          class="star star-2"
                          id="star-2"
                          type="radio"
                          value="2"
                          v-model="rating.star"
                          name="star"
                          required
                        />
                        <label class="star star-2" for="star-2"></label>
                        <input
                          class="star star-1"
                          id="star-1"
                          type="radio"
                          value="1"
                          v-model="rating.star"
                          name="star"
                          required
                        />
                        <label class="star star-1" for="star-1"></label>
                      </div>
                      <div>
                        <label for="reviewDescription">Add Review</label>
                        <!-- <input  id="reviewDescription" type="text"  v-model="rating.review" /> -->
                        <textarea
                          rows="4"
                          class="w-100 p-2"
                          placeholder="Please add reviews here"
                          v-model="rating.review"
                        >
Enter text here...</textarea
                        >
                      </div>
                    </div>
                    <!-- <label class="w-100">Title *</label>
                            <input type="text" class="w-100 form-control" v-model="rating.title" required/>
                            <label class="w-100 mt-3">Your review *</label>
                            <textarea class="w-100 form-control" v-model="rating.review" required></textarea> -->
                    <div class="starts_rating_submit text-right">
                      <button type="submit" class="review-submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--customer review end here -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import Sidebar from "./sidebar";
import Shimmer from "../../components/custom/OrderShimmer.vue"
import  {modifyMixin} from "../../mixin.js"
//  import infiniteScroll from "vue-infinite-scroll";
export default {
  mixins:[modifyMixin],
  name: "order",
  components: {
    Sidebar,Shimmer
  },
  head() {
    return {
      bodyAttrs: {
        class: "address-book"
      }
    };
  },

  data() {
    return {
      exchangeShow:false,
      returnShow:false,
      creditShow:false,
      isReturn: false,
      isExchange: false,
      rating: {
        star: "",
        review: "",
        title: ""
      },
      ratingpopup: false,
      reviews: [],
      order: [],
      canceledItem: "",
      cancel_popup: true,
      cancel_reason: "",
      cancel_error: "",
      busy: false,
      count: 1,

      qty: 1,
      actionbox: "",
      latestorder: [],
      return_popup: true,
      account_info: [],
      select_resion: "",
      exchange_resion: "",
      ordertype: "",
      ac_holder_name: "",
      ac_number: "",
      bank_name: "",
      bank_name_error: "",
      branch_name: "",
      branch_name_error: "",
      re_ac_number: "",
      ac_ifsc_code: "",
      variation: [],
      size_error: "",
      ac_holder_name_error: "",
      ac_number_error: "",
      re_ac_number_error: "",
      ifsc_code_error: "",
      reason_error: "",
      exchange_comment: "",
      return_comment: "",
      master_sku: "",
      pro_id: "",
      refund_type: "account",
      size: {
        select_size: "",
        max_qty: "1",
        variant_id: "",
        sku: ""
      },
      paginationTotalResults: 10,
      exchange_popup:false,
      exchange_order:{},
      action:false,
      orderShimmer:false,
      return_reasons:'',
      filter:['all','delivered','cancelled'],
      type:'all'
    };
  },
  methods: {  
    exhangeSize(size){
      this.exchange_order.size =  size
    },
    async openExchange(key){
       await axios.get(
        this.$store.state.list.cart_api_url+'/v1'+`/product-pdp/${key}`
      )
      .then(response=>{
        if(response.data.success == true){
          this.variation = Object.entries(response.data.result.variation)
        }
      })
    },
    showRating(items) {
      var val = false;
      if (items.review.length == 0 && items.is_return == 1) {
        val = true;
        return val;
      }
      if (items.review.length > 0) {
        val = true;
        return val;
      }
      return val;
    },
 
    refundType(event) {
      this.refund_type = event.target.value;
      if (this.refund_type == "account") {
        if (this.account_info) {
          this.ac_holder_name = this.account_info.account_holder_name;
          this.ac_number = this.account_info.account_number;
          this.re_ac_number = this.account_info.account_number;
          this.ac_ifsc_code = this.account_info.ifsc_code;
        } else {
          this.ac_holder_name = "";
          this.ac_number = "";
          this.ac_ifsc_code = "";
          this.re_ac_number = "";
        }
      }
      // if(this.refund_type == 'coupon'){
      //     this.ac_holder_name='';
      //     this.ac_number='';
      //     this.ac_ifsc_code='';
      //     this.re_ac_number='';
      // }

    
    },
    customer_review(e) {
      e.preventDefault();
      if (
        this.$store.state.list.customer_id != null &&
        this.$store.state.list.customer_id != ""
      ) {
        var form = new FormData();
        form.append("product_id", this.pro_id);
        form.append("master_sku", this.master_sku);
        form.append("store", 1);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        form.append("title", "");
        form.append(
          "description",
          this.rating.review ? this.rating.review : ""
        );
        form.append("rating", this.rating.star);
        let config = { headers: { "Content-Type": "multipart/form-data" } };
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/review/add-review",
            form,
            config
          )
          .then(response => {
            if (response.data.success == true) {
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000
              });
              this.rating.title = "";
              this.rating.star = "";
              this.rating.review = "";
              this.ratingpopup = false;
            } else {
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000
              });
            }
          });
      } else {
        this.$store.state.list.login_popup = true;
      }
    },
    ratingPopupopen(msku, vid) {
      if (
        this.$store.state.list.customer_id != null &&
        this.$store.state.list.customer_id != ""
      ) {
        this.ratingpopup = true;
        this.master_sku = msku;
        this.pro_id = vid;
      } else {
        this.$store.state.list.login_popup = true;
      }
    },
    ratingPopupclose() {
      this.ratingpopup = false;
    },
    stopPropagation(event) {
      event.stopPropagation();
    },

    loadMore: function() {
      this.busy = true;
      // if(this.order.length>0){
        if (this.paginationTotalResults > this.order.length) {
        this.get_account(this.count, this.busy, false);
        this.count++;
      // }
      }
      
    },
    close_popup() {
      this.cancel_popup = true;
      this.return_popup = true;
      this.select_resion = '';
      this.return_comment = '';
      this.ac_holder_name = '';
      this.ac_number='';
      this.re_ac_number='';
      this. re_ac_number_error='';
      this.ac_number_error='';
      this.ac_holder_name_error='';
      this.bank_name='';
      this.branch_name='';
      this.branch_name_error='';
      this.ac_ifsc_code='';
      this.ifsc_code_error='';
      this.exchange_popup = false;
      this.action = false;
      this.exchange_comment = ''

    },
    qty_minus() {
      if (this.qty > 1) {
        this.qty = this.qty - 1;
      }
    },
    qty_plus(v) {
      if (this.qty < v) {
        this.qty = this.qty + 1;
      }
    },
    select_size: function() {
      this.size_error = "";
    },
    select_reason: function() {
      this.reason_error = "";
    },
    select_holder_name: function() {
      var h_name = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.ac_holder_name.match(h_name)) {
        this.ac_holder_name_error = "";
      } else {
        this.ac_holder_name_error = "Please enter valid Name";
      }
    },
    bank_name_enter: function() {
      var b_name = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.bank_name.match(b_name)) {
        this.bank_name_error = "";
      } else {
        this.bank_name_error = "Please enter valid Bank Name";
      }
    },
    branch_name_enter: function() {
      var bc_name = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.branch_name.match(bc_name)) {
        this.branch_name_error = "";
      } else {
        this.branch_name_error = "Please enter valid Branch Name";
      }
    },
    select_ac_number: function() {
      this.ac_number_error = "";
    },
    re_select_ac_number: function() {
      this.re_ac_number_error = "";
    },
    select_ifsc_code: function() {
      this.ifsc_code_error = "";
    },
    select_user_comment: function() {
      this.comment_error = "";
    },
    order_exchange(item){
     
      this.exchange_order = item
      this.openExchange(this.exchange_order.url_key)
      this.exchange_popup = true;
    },
    order_return: function(item) {
       this.latestorder = item
       this.account_info = item.accountInfo;
       this.return_popup = false;

      // if (
      //   this.$store.state.list.customer_id != null &&
      //   this.$store.state.list.customer_id != ""
      // ) {
      //   this.$store.state.list.page_loader = true;
      //   this.$store.state.list.error_message = "";
      //   this.$store.state.list.success_message = "";
      //   var form = new FormData();
      //   form.append("order_id", orderid);
      //   form.append("item_id", itemid);
      //   axios
      //     .post(
      //       this.$store.state.list.cart_api_url+'/v1' + "/customer/return-item",
      //       form
      //     )
      //     .then(response => {
      //       if (response.data.success === true) {
      //         this.$store.state.list.page_loader = false;
      //         this.latestorder = response.data.data[orderid].order_items;
      //         this.account_info = response.data.data[orderid].accountInfo;
      //         this.ordertype = response.data.data[orderid].ordertype;
      //         this.return_popup = false;
      //       } else {
      //         this.$store.state.list.page_loader = false;
      //         this.$store.state.list.error_message = response.data.message;
      //       }
      //     })
      //     .catch(error => {
      //       this.$store.state.list.page_loader = false;
      //       if (error.message === "Network Error") {
      //         this.$store.state.list.error_message = error.message;
      //       }
      //       window.scrollTo(0, 0);
      //     });
      // }
    },

    select_item(actionname) {
      this.actionbox = actionname;
      this.select_resion = "";
      this.size.select_size = "";
      this.size.sku = "";
      this.return_comment = "";
      if (this.account_info) {
        this.ac_holder_name = this.account_info.account_holder_name;
        this.ac_number = this.account_info.account_number;
        this.re_ac_number = this.account_info.account_number;
        this.ac_ifsc_code = this.account_info.ifsc_code;
      } else {
        this.ac_holder_name = "";
        this.ac_number = "";
        this.ac_ifsc_code = "";
        this.re_ac_number = "";
      }
      this.qty = 1;
    },

    request_exchange(order) {
      event.preventDefault();
      if (this.size.select_size === "" || this.size.select_size === "") {
        this.size_error = "Please select a size first";
        this.$toast.error("Please select a size first.", {
          position: "top-center",
          duration: 4000
        });
      } else if (this.select_resion === "" || this.select_resion === null) {
        this.reason_error = "Please write a reason to exchange";
        this.$toast.error("Please write a reason to exchange.", {
          position: "top-center",
          duration: 4000
        });
      } else {
        if (
          this.$store.state.list.customer_id != null &&
          this.$store.state.list.customer_id != ""
        ) {
          this.$store.state.list.page_loader = true;
          this.$store.state.list.error_message = "";
          this.$store.state.list.success_message = "";
          var form = new FormData();
          form.append("order_id", order.order_increment_id);
          form.append("item_id", order.item_id);
          form.append("name", order.name);
          form.append("customer_id", this.$store.state.list.customer_id);
          // form.append(
          //   "customer_session",
          //   this.$store.state.list.customer_session
          // );
          for(let i=0;i<this.variation.length;i++){
            if(this.variation[i][1].size == this.size){
              this.selectedSize =  this.variation[i][1]
            }
          }
          
          form.append("qty", this.qty);
          form.append("sku", this.selectedSize.sku);
          form.append("size", this.selectedSize.size);
          form.append("exchange_reasons", this.select_resion);
          // form.append("comment", this.exchange_comment);
          axios
            .post(
              this.$store.state.list.cart_api_url+'/v1' +
                "/customer/exchange-request",
              form
            )
            .then(response => {
              if (response.data.success === true) {
                this.$store.state.list.page_loader = false;
                this.latestorder = [];
                this.account_info = [];
                this.ordertype = "";
                this.actionbox = "";
                this.exchange_popup = false;
                this.action=false;
                this.$toast.success(response.data.message, {
                  position: "top-center",
                  duration: 4000
                });
                this.get_account(1, true, true);
              } else {
                this.$store.state.list.page_loader = false;
                this.$toast.error(response.data.message, {
                  position: "top-center",
                  duration: 4000
                });
              }
            })
            .catch(error => {
              this.$store.state.list.page_loader = false;
              if (error.message === "Network Error") {
                this.$store.state.list.error_message = error.message;
              }
              window.scrollTo(0, 0);
            });
        }
      }
    },

    request_return(order, item_id, itemqty, name, sku) {
      event.preventDefault();
      if (
        (this.ac_holder_name === "" || this.ac_holder_name === "") &&
        this.latestorder.payment_method == "cod" &&
        this.refund_type == "account"
      ) {
        this.ac_holder_name_error = "Please enter account holder name";
        this.$toast.error("Please enter account holder name", {
          position: "top-center",
          duration: 4000
        });
      } else if (
        (this.ac_number === "" || this.ac_number === null) &&
        this.latestorder.payment_method == "cod" &&
        this.refund_type == "account"
      ) {
        this.ac_number_error = "Please enter account number";
        this.$toast.error("Please enter account number", {
          position: "top-center",
          duration: 4000
        });
      } else if (
        this.ac_number !== this.re_ac_number &&
        this.refund_type == "account"
      ) {
        this.re_ac_number_error = "Account number not match";
        this.$toast.error("Account number not match", {
          position: "top-center",
          duration: 4000
        });
      } else if (
        (this.ac_ifsc_code === "" || this.ac_ifsc_code === null) &&
        this.latestorder.payment_method == "cod" &&
        this.refund_type == "account"
      ) {
        this.ifsc_code_error = "Please enter IFSC code";
        this.$toast.error("Please enter IFSC code", {
          position: "top-center",
          duration: 4000
        });
      } else {
        if (
          this.$store.state.list.customer_id != null &&
          this.$store.state.list.customer_id != ""
        ) {
          this.$store.state.list.page_loader = true;
          this.$store.state.list.error_message = "";
          this.$store.state.list.success_message = "";
          var form = new FormData();
          for (const property in this.return_reasons) {
            if(this.return_reasons[property] == this.select_resion){
              this.reason_index = `${property}`
            }
          }
          form.append("order_id", this.latestorder.order_quote_id);
          form.append("item_id", this.latestorder.item_id);
          form.append("customer_id", this.$store.state.list.customer_id);
          form.append(
            "customer_session",
            this.$store.state.list.customer_session
          );

          form.append("return_reasons", this.select_resion);
          form.append("comment", this.return_comment);
          form.append("account_holder_name", this.ac_holder_name);
          form.append("account_no", this.ac_number);
          form.append("ifsc_code", this.ac_ifsc_code);
          form.append("bank_name", this.bank_name);
          form.append("branch_name", this.branch_name);
           form.append("reason_id", this.reason_index);
          
          axios
            .post(
              this.$store.state.list.cart_api_url+'/v1' + "/customer/return-request",
              form
            )
            .then(response => {
              if (response.data.success === true) {
                this.$store.state.list.page_loader = false;
                this.latestorder = [];
                this.account_info = [];
                this.ordertype = "";
                this.actionbox = "";
                this.return_popup = true;
                this.$toast.success(response.data.message, {
                  position: "top-center",
                  duration: 4000
                });
                this.get_account(1, true, true);
              } else {
                this.$store.state.list.page_loader = false;
                this.$toast.error(response.data.message, {
                  position: "top-center",
                  duration: 4000
                });
              }
            })
            .catch(error => {
              this.$store.state.list.page_loader = false;
              if (error.message === "Network Error") {
                this.$store.state.list.error_message = error.message;
              }
              window.scrollTo(0, 0);
            });
        }
      }
    },

    order_cancel(cancelitem) {
      this.cancel_popup = false;
      this.canceledItem = cancelitem;
      this.cancel_reason = "";
      this.cancel_error = "";
    },
    cancelorder(cart_id) {
      if (this.cancel_reason === "" || this.cancel_reason === null) {
        this.cancel_error = "Please write a reason to cancel";
        this.$toast.error("Please write a reason to cancel", {
          position: "top-center",
          duration: 4000
        });
      } else {
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append("order_id", cart_id);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        form.append("order_cancel_reason", this.cancel_reason);
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/order/cancel-order",
            form
          )
          .then(response => {
            if (response.data.success === true) {
              this.$toast.warning(response.data.message, {
                position: "top-center",
                duration: 4000
              });
              this.get_account(1, true, true);
              this.cancel_popup = true;
            } else {
              this.$store.state.list.page_loader = false;
              this.$store.state.list.error_message = response.data.message;
              if (
                response.data.cart_session_status == false ||
                response.data.customer_session_status == false
              ) {
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_customer",
                  "",
                  "1y"
                );
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cus_sess",
                  "",
                  "1y"
                );
                this.$store.state.list.customer_id = "";
                this.$store.state.list.customer_session = "";
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cart",
                  "",
                  "1y"
                );
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_ct_sess",
                  "",
                  "1y"
                );
                this.$store.state.list.cart_id = "";
                this.$store.state.list.cart_session = "";
                this.$store.state.list.cart_product = [];
                this.$router.push("/");
              }
            }
          })
          .catch(error => {
            this.$store.state.list.page_loader = false;
            if (error.message === "Network Error") {
              this.$store.state.list.error_message =
                "Oops there seems to be some Network issue, please try again.";
            }
          });
      }
    },
    reorder(cart_id) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart_id", cart_id);
      form.append("cart_session", this.$store.state.list.cart_session);
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(this.$store.state.list.cart_api_url+'/v1' + "/order/re-order", form)
        .then(response => {
          if (response.data.success === true) {
            this.$store.state.list.page_loader = false;
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_ct_sess",
              response.data.data.cart_session,
              "1y"
            );
            this.$store.state.list.cart_session =
              response.data.data.cart_session;
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_cart",
              response.data.data.cart_id,
              "1y"
            );
            this.$store.state.list.cart_id = response.data.data.cart_id;
            this.$store.state.list.thankyou_cart = response.data.data.cart_id;
            this.$router.push("/checkout");
          } else {
            window.scrollTo(0, 0);
            this.$store.state.list.page_loader = false;
            this.$store.state.list.error_message = response.data.message;
            if (
              response.data.cart_session_status == false ||
              response.data.customer_session_status == false
            ) {
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_customer",
                "",
                "1y"
              );
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cus_sess",
                "",
                "1y"
              );
              this.$store.state.list.customer_id = "";
              this.$store.state.list.customer_session = "";
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                "",
                "1y"
              );
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_ct_sess",
                "",
                "1y"
              );
              this.$store.state.list.cart_id = "";
              this.$store.state.list.cart_session = "";
              this.$store.state.list.cart_product = [];
              this.$router.push("/");
            }
          }
        })
        .catch(error => {
          this.$store.state.list.page_loader = false;
          if (error.message === "Network Error") {
            this.$store.state.list.error_message =
              "Oops there seems to be some Network issue, please try again.";
          }
          window.scrollTo(0, 0);
        });
    },
    order_with_cod(cart_id) {
      this.$store.state.list.page_loader = true;
      this.$store.state.list.thankyou_cart = cart_id;
      var form = new FormData();
      this.$store.state.list.thankyou_status = true;
      $cookies.set(
        window.location.hostname.substring(10, 4) + "_thank",
        "true"
      );
      form.append("cart_id", cart_id);
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/order/cod-confirmation",
          form
        )
        .then(response => {
          if (response.data.success === true) {
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_ct_sess",
              response.data.data.cart_session,
              "1y"
            );
            this.$store.state.list.cart_session =
              response.data.data.cart_session;
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_cart",
              response.data.data.cart_id,
              "1y"
            );
            this.$store.state.list.cart_id = response.data.data.cart_id;
            this.$store.state.list.thankyou_cart = response.data.data.cart_id;
            this.$router.push("thankyou");
          } else {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.error_message = response.data.message;
            this.$store.state.list.thankyou_status = false;
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_thank",
              ""
            );
            if (
              response.data.cart_session_status == false ||
              response.data.customer_session_status == false
            ) {
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_customer",
                "",
                "1y"
              );
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cus_sess",
                "",
                "1y"
              );
              this.$store.state.list.customer_id = "";
              this.$store.state.list.customer_session = "";
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                "",
                "1y"
              );
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_ct_sess",
                "",
                "1y"
              );
              this.$store.state.list.cart_id = "";
              this.$store.state.list.cart_session = "";
              this.$store.state.list.cart_product = [];
              this.$router.push("/");
            }
          }
        })
        .catch(error => {
          this.$store.state.list.page_loader = false;
          this.$store.state.list.thankyou_status = false;
          $cookies.set(
            window.location.hostname.substring(10, 4) + "_thank",
            ""
          );
          if (error.message === "Network Error") {
            this.$store.state.list.error_message =
              "Oops there seems to be some Network issue, please try again.";
          }
          window.scrollTo(0, 0);
        });
    },
    async getOrders(pageCount,type){
       var form = new FormData();
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        form.append("store", this.$store.state.list.store);
        form.append("type", type);

        await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' +
              "/customer/order-list?page=" +
              pageCount +
              "",
            form
          ).then(response=>{
            if(response.data.success == true){
              this.paginationTotalResults = response.data.data.totalResult;
              response.data.data.orders.forEach(result => {
                this.order.push(result);
              });
              this.orderShimmer = false
              
            }
            else{
              this.orderShimmer = false

            }
          })
      
    },
     get_account: async function  (pageCount, busyStatus, cancelStatus, type) {
      //  this.type = 
      //  if(type == '' || type == undefined || type == null){
      //    this.type = 'all'
         
      //  }
      if(this.type == 'All'){
        this.type ='all'
      }
      else if(this.type == 'Cancelled'){
        this.type ='cancelled'
      }
      else if(this.type == 'Delivered'){
        this.type ='delivered'
      }
      if (cancelStatus == true) {
        this.count = 1;
        this.order = [];
      }
      if (
        this.$store.state.list.customer_id != null &&
        this.$store.state.list.customer_id != ""
      ) {
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        form.append("store", this.$store.state.list.store);
        form.append("type", this.type);

        await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' +
              "/customer/order-list?page=" +
              pageCount +
              "",
            form
          )
          .then(async response =>{
            if (response.data.success === true) {
              this.returnShow = response.data.data.returnEnabled
              this.exchangeShow = response.data.data.exchangeEnabled
              this.creditShow =  response.data.data.creditsEnabled
              this.$store.state.list.page_loader = false;
              this.paginationTotalResults = response.data.data.totalResult;
              // this.orderShimmer = true
              
              this.orderShimmer = false
              response.data.data.orders.forEach(result => {
                this.order.push(result);
              });
              this.busy = false;
            } else {
              this.busy = false;
              this.$store.state.list.page_loader = false;
              this.$store.state.list.error_message = response.data.message;
              if (
                response.data.cart_session_status == false ||
                response.data.customer_session_status == false
              ) {
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_customer",
                  "",
                  "1y"
                );
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cus_sess",
                  "",
                  "1y"
                );
                this.$store.state.list.customer_id = "";
                this.$store.state.list.customer_session = "";
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cart",
                  "",
                  "1y"
                );
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_ct_sess",
                  "",
                  "1y"
                );
                this.$store.state.list.cart_id = "";
                this.$store.state.list.cart_session = "";
                this.$store.state.list.cart_product = [];
                this.$router.push("/");
               this.orderShimmer = false

              }
            }
          })
          .catch(error => {
            this.$store.state.list.page_loader = false;
            if (error.message === "Network Error") {
              this.$store.state.list.error_message = error.message;
            }
            window.scrollTo(0, 0);
          });
      }
    },
   
  },
  mounted() {
    // this.get_account(1, true, false);
  },
  beforeMount() {
     if(this.$store.state.list.customer_id ==null || this.$store.state.list.customer_id =='' || this.$store.state.list.customer_id  == undefined ){
      this.$router.push('/login')
    }
    // if (
    //   this.$store.state.list.customer_detail.id === null ||
    //   this.$store.state.list.customer_detail.id === ""
    // ) {
    //   this.$router.push({
    //     path: "/",
    //     query: { redirect: this.$route.fullPath }
    //   });
    // }
    (this.$store.state.list.error_message = ""),
      (this.$store.state.list.success_message = ""),
      (this.$store.state.list.breadcrumb = "My Order"),
      (this.$store.state.list.page_loader = false);
   
    window.addEventListener("message", (event) => {
    }, false);
    axios
      .get(
        this.$store.state.list.cart_api_url+'/v1' + "/fetch-reasons/return"
      )
      .then(response => {
        if(response.data.success){
          this.return_reasons  = response.data.data
        }
      })
      .catch(err=>{
        console.log("err in return reason",err)
      })
  },
  
};
</script>

<style scoped>

.exchange-modal .modal-header{
  /* background:  #dee2e6; */
  padding: 10px;
}
.exchange-modal .modal-dialog {
    max-width: 900px;
    }

.exchange-modal .modal-header h4 {
  font-size: 20px;
  font-weight: bold;
}

.exchange-modal  thead {
    background:  #dee2e6;
    /* border-top: 1px solid #ddd; */
    border-bottom: 1px solid #ddd;
}
.exchange-modal  thead span {
  font-weight: 500;
}

.exchange-modal tbody .item-info .item  .row{
  align-items: center;
  width: 500px;
}
.item-name {
  font-size:  14px;
  text-decoration: none;
}

.exchange-modal .size-box {
  width: 100%;
    display: flex;
    margin-bottom: 10px;
}
.exchange-modal .size-box .select-one-size input {
  display: none;
}
.exchange-modal .size-box .select-one-size  {
  width: 40px;
    height: 40px;
    border: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    position: relative;
}
.exchange-modal .size-box .select-one-size.disabled {
  opacity: 0.6;
}
.exchange-modal .size-box .select-one-size.disabled::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: grey;
    transform: rotate(-45deg);
    pointer-events: none;
}
.exchange-modal .size-box  label.active-size{
  background: var(--bs-primary);
  color:white
}

@media (max-width: 768px) {
  .exchange-modal tbody .item-info .item  .row{
  align-items: center;
      width: auto;
}
.exchange-modal .modal-dialog {
    max-width: 100%;
    }
  .responsive-table td.orderDetail:before {
    content: "Order Item Id/ SKU:";
  }
  .responsive-table td.status:before {
    content: "Status :";
  }
 
}
 .return-input{
    width: 30px !important;
    height: 20px;
    text-align: center;
    padding-top: 2px;
    font-size: 14px;
  }
  .order-no{
    text-decoration: none;
  }
  .order-no:hover{
    text-decoration: underline;

  }
</style>