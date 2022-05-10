<template>
  <div class="order-summary">
    <div class="">
      <div class="summary_header">
        <span class="summary-title font-medium">Order Summary</span>
        <span ><a class="edit-cart" href="/cart">Edit Cart</a></span>
      </div>
      <div
        class="py-2 w-100 d-flex justify-content-between align-items-center"
      >
          <p class="font-weight-light coupon-container m-0">
           
           {{$store.state.list.discount_code == '' || $store.state.list.discount_code == null? 'Apply Coupon:':' Coupon Applied:'}} 
            <span> {{ $store.state.list.discount_code }}</span>
          </p>
          <div class="pull-right">
            <button
              class="btn px-3 py-2 btn-sm"
              v-if="
                $store.state.list.discount_code != null &&
                $store.state.list.discount_code != ''
              "
              type="button"
              @click="remove_coupon()"
            >
              <span>Remove</span>
            </button>
            <button
              class="btn px-3 py-2 btn-sm"
              v-else
              type="button"
              @click="addcoupon(false)"
            >
              <span>APPLY</span>
            </button>
          </div>
      </div>
      <div class="discount-message"></div>
    </div>
    <div class="minicart-items-wrapper overflowed">
        <ol class="p-0 my-3 minicart-items">
            <li class="product-item d-flex" v-for="items in this.$store.state.list.cart_product" :key="items">
                <span class="product-image pull-left">
                    <span class="image-wrapper"><img v-bind:src="
                              $store.state.list.image_url+'400x0/' +
                              items.image" width="70"
                            :alt="items.name" :title="items.name"> </span>
                </span>
                <div class="item-details checkout-summmry-item">
                    <div class="product-item-inner">
                        <div class="product-item-name-block">
                            <div @click="goToProduct(items.url_key)" class="product-item-name font-medium" v-text="items.name">
                            </div>
                            <p class="section-error-message" v-if="items.qty > items.max_qty">
                                Requested quantity not available.</p>
                            
                            <div class="details-qty details-size">
                                <span class="label"><span >Size : </span></span>
                                <span class="value" v-text="items.size"></span>
                                <span class="label">
                                    <span> | Qty : </span></span>
                                <span class="value" v-text="items.qty"></span>
                            </div>
                            
                        </div>
                        <div class="subtotal">
                            <div class="price" v-if="items.selling_price != items.price">
                                <p><span class="price font-bold"
                                        style="padding-right: 5px;">
                                        <i class="kartmax_currency"></i>{{items.selling_price}}
                                        </span> <span class="old-price"
                                         style="padding-right: 0px;">
                                        <i class="kartmax_currency"></i> {{items.price}}
                                        </span>
                                    <span class="discount_percent font-bold"> ({{(100 - (items.selling_price*100)/items.price).toFixed(0)}}% OFF)</span>
                                </p>
                            </div>
                            <div class="price" v-else>
                                <p><span class="price font-bold"
                                    >
                                  {{items.selling_price}}
                                        </span>
                                        </p>
                            </div>

                        </div>
                    </div>
                </div>
            </li>
        </ol>
    </div>
    <div class="summary-total">
      
      <table class="w-100">
        <tbody>
          <tr>
            <th class="fw-light kartmax-text-f-14 py-2">Subtotal</th>
            <td class="text-end">
              <span class="kartmax-text-f-14"
                ><i class="kartmax_currency"></i>
                <span id="m_sub_total kartmax-text-f-14">{{
                  $store.state.list.summary.totalMRP
                }}</span></span
              >
            </td>
          </tr>
          <tr v-if=" $store.state.list.summary.discountMRP>0">
            <th class="fw-light kartmax-text-f-14 py-2">
              Total Discount on MRP
            </th>
            <td class="text-end">
              <span class="price discount-color kartmax-text-f-14">
                <i class="kartmax_currency"></i>
                <span id="m_sub_total kartmax-text-f-14">{{
                  $store.state.list.summary.discountMRP
                }}</span></span
              >
            </td>
          </tr>

          <tr v-if="this.$store.state.list.discount_amount > 0">
            <th class="fw-light kartmax-text-f-14 py-2">
              <span class="kartmax-text-f-14">Discount Coupon</span>
            </th>
            <td class="discount-color text-end">
              <span
                ><span class="kartmax-text-f-14"
                  ><span> <i class="kartmax_currency"></i> </span
                  ><span class="kartmax-text-f-14">{{
                    this.$store.state.list.discount_amount  
                  }}</span></span
                ></span
              >
            </td>
          </tr>
          <tr v-if="this.$store.state.list.store_credits_discount_amount != null  && this.$store.state.list.store_credits_discount_amount != 0">
            <th class="fw-light kartmax-text-f-14 py-2">
              <span class="kartmax-text-f-14">Store Credits Discount</span>
            </th>
            <td class="discount-color text-end">
              <span
                ><span class="kartmax-text-f-14"
                  ><span> <i class="kartmax_currency"></i> </span
                  ><span>{{
                    this.$store.state.list.store_credits_discount_amount  
                  }}</span></span
                ></span
              >
            </td>
          </tr>
          <tr v-if="this.$store.state.list.loyalty_discount != null  && this.$store.state.list.loyalty_discount != 0">
            <th class="fw-light kartmax-text-f-14 py-2">
              <span class="kartmax-text-f-14">Loyalty Discount</span>
            </th>
            <td class="discount-color text-end">
              <span
                ><span class="kartmax-text-f-14"
                  ><span> &nbsp; </span
                  ><span>{{
                    this.$store.state.list.loyalty_discount  
                  }}</span></span
                ></span
              >
            </td>
          </tr>
                    
          <tr v-if="this.$store.state.list.shiping_charges != '0' && this.$store.state.list.shiping_charges != '' && this.$store.state.list.shiping_charges != null  || this.$store.state.list.shiping_charges>0 ">
            <th class="fw-light kartmax-text-f-14 py-2">
              <span>Shipping Charge </span>
            </th>
            <td class="text-end">
              <span class="kartmax-text-f-14"> <i class="kartmax_currency"></i> {{ this.$store.state.list.shiping_charges   }}</span>
            </td>
          </tr>
          <tr v-if="this.$store.state.list.express_delivery_charge != '0' && this.$store.state.list.express_delivery_charge != '' && this.$store.state.list.express_delivery_charge != null  || this.$store.state.list.express_delivery_charge>0 ">
            <th class="fw-light kartmax-text-f-14 py-2">
              <span>Express Delivery Charge </span>
            </th>
            <td class="text-end">
              <span class="kartmax-text-f-14"> <i class="kartmax_currency"></i> {{ this.$store.state.list.express_delivery_charge   }}</span>
            </td>
          </tr>
           <tr v-if="tax != 0">
            <th class="fw-light kartmax-text-f-14 py-2">
              <span class="kartmax-text-f-14">Tax Applied</span>
            </th>
            <td class="text-end">
              <span class="kartmax-text-f-14"> <i class="kartmax_currency"></i> {{ tax   }}</span>
            </td>
          </tr>
          <tr
            v-if="
              this.$store.state.list.cod_charges != '0' && this.$store.state.list.cod_charges != '' && this.$store.state.list.cod_charges != null
            "
          >
            <th class="fw-light kartmax-text-f-14" v-if="this.$store.state.list.cod_charges != 0">
              <span class="value">COD Charge</span>
            </th>
            <td class="text-end kartmax-text-f-14">
              <span><i class="kartmax_currency"></i> {{ this.$store.state.list.cod_charges   }}</span>
            </td>
          </tr>
          <tr class="grand totals">
            <th class="font-bold py-2">
              <strong>Order Total</strong>
            </th>
            <td class="amount font-bold text-end">
              <strong
                ><span class="price"
                  ><i class="kartmax_currency"></i>
                  <span class="sub_total">{{
                    this.$store.state.list.cart_total  
                  }}</span></span
                ></strong
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--coupon popup start here-->
    <div
      class="modal"
      v-bind:class="[this.coupon_popup ? '' : 'd-block']"
      id="coupon-modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title font-bold">APPLY COUPON</h4>
            <button type="button" class="btn" @click="close_popup()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div
              class="success_message"
              v-text="this.$store.state.list.success_message"
              v-if="this.$store.state.list.success_message != ''"
            ></div>
            <div
              class="error_message"
              v-text="this.$store.state.list.error_message"
              v-if="this.$store.state.list.error_message != ''"
            ></div>
            <div class="couponsForm-base-couponsPageContainer">
              <div role="tablist">
                <div
                  class="block discount active"
                  id="block-discount"
                  data-collapsible="true"
                  role="tab"
                  aria-selected="true"
                  aria-expanded="true"
                  tabindex="0"
                >
                  <div id="discount-coupon-form">
                    <div class="fieldset coupon">
                      <input
                        type="hidden"
                        name="remove"
                        id="remove-coupon"
                        value="0"
                      />
                      <input
                        name="form_key"
                        type="hidden"
                        value="KsjDpCfcgYHw5MOG"
                      />
                      <div class="couponsForm-base-formContainer">
                        <div class="couponsForm-base-textInputContainer">
                          <div class="input-group">
                            <input
                              type="text"
                              id="coupon_code"
                              class="form-control couponsForm-base-textInput"
                              v-model="applied_coupon"
                              name="coupon_code"
                              placeholder="Enter coupon code"
                              autocomplete="off"
                            />
                            <button
                              class="btn btn-dark"
                              type="button"
                              @click="apply_coupon()"
                              id="applycoupon"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="couponsForm-base-errorMessage"></div>
              </div>
              <div class="couponsForm-base-boundary"></div>
              <div
                class="couponsForm-base-container"
                v-if="this.coupon_list.length != 0"
              >
                <div
                  class="
                    couponsForm-base-couponsTitle
                    py-2
                    border-bottom
                    my-1
                  "
                >
                  Best coupon for you
                </div>
                <div
                  class="
                    coupon-base-validCoupon coupon-base-validCouponContainer1
                  "
                  v-for="(item, index) in coupon_list"
                  :key="`coupon${index}`"
                >
                  <div
                    class="
                      coupons-container
                      align-items-center
                      d-flex
                      justify-content-between
                      w-100
                      flex-wrap
                      border-bottom
                      mb-1
                    "
                  >
                    <div class="w-50">
                      <div class="coupon_code_design">
                        {{ item.coupon_code }}
                      </div>
                    </div>
                    <div
                      class="btn btn-outline-dark btn-sm"
                      @click="apply_list_coupon(item.coupon_code)"
                    >
                      Apply
                    </div>
                    <div class="coupon-base-benefit w-100 my-2">
                      <span
                        class="coupon-base-amount font-medium kartmax-text-f-14"
                        >{{ item.display_message }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="couponsForm-base-errorMessage"></div>
      </div>
      <div class="couponsForm-base-boundary"></div>
    </div>
    <!--coupon popup end here-->
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

import VueCookies from "vue-cookies";
Vue.use(VueCookies);
export default {
  data() {
    return {
      cod_msg_show: false,
      cod_msg: "",
      cod_charges: "",
      shiping_charges: "",
      coupon_list: "",
      coupon_popup: true,
      applied_coupon: "",
      tax:'',
    };
  },
  mounted(){
    this.get_cart()
  },
  methods: {
    goToProduct(url){
        this.$router.push('/product/'+url)
    },
    close_popup: function () {
      this.coupon_popup = true;
    },
    remove_coupon: function () {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("cart_session", this.$store.state.list.cart_session);
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      this.coupon_e_m = "";
      this.coupon_s_m = "";
      axios
        .post(this.$store.state.list.cart_api_url+'/v1' + "/cart/remove-coupon", form)
        .then((response) => {
          if (response.data.success === true) {
            this.$store.state.list.page_loader = false;
            this.coupon_s_m = response.data.message;
            this.$store.state.list.discount_code =
              response.data.data.discount_code;
            this.$store.state.list.discount_amount =
              response.data.data.discount_amount;
            this.$store.state.list.cart_product = response.data.data.products;
            this.$store.state.list.capillaryAmount =
              response.data.data.capillary_amount;
            this.$store.state.list.cart_total = response.data.data.net_amount;
            this.payment_method = "";
            this.net_amount = response.data.data.net_amount;
            this.mloyal_point = response.data.data.mloyal_point;
            this.mloyal_amount = response.data.data.mloyal_amount;
            this.gateway_discount = response.data.data.discount_gateway;
            this.$store.state.list.shiping_charges = response.data.data.shipping_charge;
            this.tax = response.data.data.tax;

            // this.cart_points_check();
            if(window.dataLayer !== undefined && window.dataLayer !== null && window.dataLayer !== ''){
              window.dataLayer.push({
                event: "checkout",
                action: "Checkout",
                ecommerce: {
                  checkout: {
                    actionField: { step: 4, option: "Address selected" },
                    product: this.$store.state.list.gtm_product,
                  },
                },
              });
            }
            this.$store.state.list.cart_subtotal =
              response.data.data.order_subtotal;
            this.$store.state.list.error_message = "";
          } else {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.success_message = "";
            this.coupon_e_m = response.data.message;
            if (response.data.cart_session_status == false) {
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
              this.$router.push("/cart");
            }
          }
        })
        .catch((error) => {
          this.$store.state.list.page_loader = false;
          if (error.message === "Network Error") {
            this.$store.state.list.error_message =
              "Oops there seems to be some Network issue, please try again.";
          }
          window.scrollTo(0, 0);
        });
    },
    apply_list_coupon(code) {
      this.applied_coupon = code;
      this.apply_coupon();
    },
    apply_coupon(e) {
      if (!this.applied_coupon.length) return;
      let coupon = {
        coupon_code: null,
        promotion_id: 1,
      };
      this.coupon_list.forEach((x) => {
        if (x.coupon_code == this.applied_coupon) {
          coupon = x;
        }
      });
      if (coupon.coupon_code === null) {
        coupon.coupon_code = this.applied_coupon;
      }
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("cart_session", this.$store.state.list.cart_session);
      form.append("coupon", coupon.coupon_code);
      form.append("promotion_id", coupon.promotion_id);
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      this.coupon_e_m = "";
      this.coupon_s_m = "";
      if(this.$store.state.list.customer_detail ==  null){
        this.$toast.error('Please login to use this coupon', {
          position: "top-center",
          duration: 3000,
        });
            this.$store.state.list.page_loader = false;
        return
      }
      else{

        axios
        .post(this.$store.state.list.cart_api_url+'/v1' + "/cart/assign-coupon", form)
        .then((response) => {
          if (response.data.success === true) {
            // this.$store.state.list.googleAnalyticsTag ('checkout_progress',this.applied_coupon)
            // gtag('event','checkout_progress', {
            //         items: this.$store.state.list.cart_product,
            //         coupon: this.applied_coupon
            // });

            this.coupon_popup = true;
            this.applied_coupon = "";
            this.$store.state.list.page_loader = false;
            this.$store.state.list.discount_code =
              response.data.data.discount_code;
            this.$store.state.list.discount_amount =
              response.data.data.discount_amount;
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.coupon_s_m = response.data.message;
            if(response.data.data.products !== undefined)
            this.$store.state.list.cart_product = response.data.data.products;
            this.checkLoyalty = false;
            this.$store.state.list.cart_total = response.data.data.net_amount;

            // this.$store.state.list.cart_total = response.data.data.grand_total;
            this.net_amount = response.data.data.net_amount;
            this.$store.state.list.cart_subtotal =
              response.data.data.order_subtotal;
            this.payment_method = "";
            this.mloyal_point = response.data.data.mloyal_point;
            this.mloyal_amount = response.data.data.mloyal_amount;
            this.gateway_discount = response.data.data.discount_gateway;
            this.$store.state.list.shiping_charges = response.data.data.shipping_charge;
            this.tax = response.data.data.tax;


            // this.cart_points_check();
            if(window.dataLayer !== undefined && window.dataLayer !== null && window.dataLayer !== ''){
              window.dataLayer.push({
                event: "checkout",
                action: "Checkout",
                ecommerce: {
                  checkout: {
                    actionField: { step: 4, option: "Address selected" },
                    product: this.$store.state.list.gtm_product,
                  },
                },
              });
            }
            this.$store.state.list.error_message = "";
          } else {
            this.$store.state.list.page_loader = false;
            this.coupon_s_m = "";
            this.coupon_e_m = response.data.message;
            this.$toast.error(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            if (response.data.cart_session_status == false) {
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
              this.$router.push("/cart");
            }

          }
          
        })
        .catch((error) => {
          this.$store.state.list.page_loader = false;
          if (error.message === "Network Error") {
            this.$store.state.list.error_message =
              "Oops there seems to be some Network issue, please try again.";
          }
          window.scrollTo(0, 0);
        });
      }
    },
    addcoupon: function () {
      let number = "";
      // if(this.$store.state.list.customer_detail ==  null){
      //   this.$toast.error('Please login to use', {
      //     position: "top-center",
      //     duration: 3000,
      //   });
      //   return
      // }
      // else{

        if (this.$store.state.list.customer_detail !== null) {
          number = this.$store.state.list.customer_detail.phone;
        }

        this.applied_coupon = "";
        this.coupon_popup = false;
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
        axios
          .get(this.$store.state.list.api_url + "/api/cart/promotions/list", {
            params: {
              mobile: number,
            },
          })
          .then((response) => {
            if(response.data.success == true){
            this.coupon_list = response.data.data;
            }
          
          });
      // }
    },
    updateCartData(){
      
      this.get_cart()},
      get_cart: async function () {
        if (this.$route.query.sku || this.$route.query.cart) {
        } else {
        this.$store.state.list.cart_id = $cookies.get(
          window.location.hostname.substring(10, 4) + "_cart",
          ""
        );
      }
      
      if (
        this.$store.state.list.cart_id != null &&
        this.$store.state.list.cart_id != "" &&
        this.$store.state.list.cart_id != "undefined"
      ) {
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append("cart_id", this.$store.state.list.cart_id);
        form.append("cart_session", this.$store.state.list.cart_session);
        await axios
          .post(this.$store.state.list.cart_api_url+'/v1' + "/cart/get-cart", form)
          .then(async (response) => {
            if (response.data.success === true) {
            
              this.$store.state.list.page_loader = false;
              this.$store.state.list.cart_product = response.data.data.products;
              this.$store.state.list.customer_detail =
                response.data.data.customer;
              this.$store.state.list.cart_total =
                response.data.data.net_amount;
              this.net_amount = response.data.data.net_amount;
              this.$store.state.list.cart_subtotal =
                response.data.data.order_subtotal;
              this.$store.state.list.address = response.data.data.address;
              if (this.$store.state.list.address.length > 0) {
                this.page_type = "address";
                this.displayCheckout = true;
              }
              this.$store.state.list.discount_code =
                response.data.data.discount_code;
              this.$store.state.list.discount_amount =
                response.data.data.discount_amount;
              this.$store.state.list.shiping_charges = response.data.data.shipping_charge;
              this.$store.state.list.cod_charges = response.data.data.cod_charge;
              this.mloyal_point = response.data.data.mloyal_point;
              this.mloyal_amount = response.data.data.mloyal_amount;
              this.tax = response.data.data.tax;

              this.$store.state.list.store_credits_discount_amount = response.data.data.store_credit_discount_amount;
              this.$store.state.list.store_credits_used = response.data.data.store_credit_used;
              this.$store.state.list.loyalty_discount = response.data.data.loyalty_discount;


              if (this.$store.state.list.address.length != 0) {
                for (
                  let i = 0;
                  i < this.$store.state.list.address.length;
                  i++
                ) {
                  if (i == 0) {
                    this.$store.state.list.address_id =
                      this.$store.state.list.address[i].id * 1;
                    this.$store.state.list.select_address_no = i;
                  }
                }
              }
              if (this.$store.state.list.cart_product.length === 0) {
                this.$router.push("/cart");
              }

              if (
                (this.$store.state.list.customer_id == "" ||
                  this.$store.state.list.customer_id == null) &&
                response.data.data.maddress != "" &&
                response.data.data.maddress != null &&
                this.$route.query.step == "payment"
              ) {
                this.mobile_number = response.data.data.maddress.phone;
                this.user.name = response.data.data.maddress.full_name;
                this.user.address = response.data.data.maddress.street_address;
                this.page_type = "payment";
                this.displayCheckout = true;

                await this.user_pin_code();
                this.back_page_type = "login";
              }
              if (
                this.$store.state.list.customer_id != "" &&
                this.$store.state.list.customer_id != null &&
                response.data.data.maddress != "" &&
                response.data.data.maddress != null &&
                this.$route.query.step == "payment"
              ) {
                if (response.data.data.customer.cod_block == "0") {
                  this.cus_cod_hide = true;
                } else {
                  this.cus_cod_hide = false;
                }
                this.mobile_number = response.data.data.maddress.phone;
                this.user.name = response.data.data.maddress.full_name;
                this.user.address = response.data.data.maddress.street_address;
                this.back_page_type = "address";
                this.page_type = "payment";
                this.displayCheckout = true;

                await this.user_pin_code();
              }
              if (
                this.$store.state.list.customer_id != "" &&
                this.$store.state.list.customer_id != null &&
                response.data.data.maddress != "" &&
                response.data.data.maddress != null &&
                this.$route.query.step != "payment"
              ) {
                if (
                  response.data.data.customer !== "" &&
                  response.data.data.customer !== undefined
                ) {
                  if (response.data.data.customer.cod_block == "0") {
                    this.cus_cod_hide = true;
                  } else {
                    this.cus_cod_hide = false;
                  }
                }

                this.page_type = "address";
                this.displayCheckout = true;

                this.$router.push({ query: { ...this.$route.query } });
              }

              if (
                this.$store.state.list.customer_id != "" &&
                this.$store.state.list.customer_id != null &&
                this.$store.state.list.address.length === 0 &&
                response.data.data.maddress != "" &&
                this.$route.query.step != "payment"
              ) {
                this.page_type = "new_address_page";
                this.displayCheckout = true;

                this.$router.push({ query: { ...this.$route.query } });
              }
              
              if (
                (this.$store.state.list.customer_id == "" ||
                  this.$store.state.list.customer_id == null) &&
                response.data.data.maddress != "" &&
                response.data.data.maddress != null &&
                this.$route.query.step != "payment"
              ) {
                this.mobile_number = response.data.data.maddress.phone;
                this.user.name = response.data.data.maddress.full_name;
                this.user.address = response.data.data.maddress.street_address;
                this.page_type = "login";
                this.displayCheckout = true;

                this.$router.push({ query: { ...this.$route.query } });
              }
              if (
                (this.$store.state.list.customer_id == "" ||
                  this.$store.state.list.customer_id == null) &&
                response.data.data.maddress == "" &&
                this.$route.query.step == "payment"
              ) {
                this.page_type = "login";
                this.displayCheckout = true;

                this.$router.push({ query: { ...this.$route.query } });
              }
              if (
                (this.$store.state.list.customer_id == null ||
                  this.$store.state.list.customer_id == "") &&
                this.$route.query.step != "payment" &&
                response.data.data.maddress == ""
              ) {
                this.page_type = "login";
                this.displayCheckout = true;

                this.$router.push({ query: { ...this.$route.query } });
              }
              this.displayCheckout = true;
            } else {
              this.$store.state.list.page_loader = false;
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              // if (
              //   response.data.cart_session_status == false ||
              //   response.data.customer_session_status == false
              // ) {
              //   $cookies.set(
              //     window.location.hostname.substring(10, 4) + "_customer",
              //     "",
              //     "1y"
              //   );
              //   $cookies.set(
              //     window.location.hostname.substring(10, 4) + "_cus_sess",
              //     "",
              //     "1y"
              //   );
              //   this.$store.state.list.customer_id = "";
              //   this.$store.state.list.customer_session = "";
              //   $cookies.set(
              //     window.location.hostname.substring(10, 4) + "_cart",
              //     "",
              //     "1y"
              //   );
              //   $cookies.set(
              //     window.location.hostname.substring(10, 4) + "_ct_sess",
              //     "",
              //     "1y"
              //   );
              //   this.$store.state.list.cart_id = "";
              //   this.$store.state.list.cart_session = "";
              //   this.$store.state.list.cart_product = [];
              //   this.$router.push("/cart");
              // }
            }
          })
          .catch((error) => {
            this.$store.state.list.page_loader = false;
            if (error.message === "Network Error") {
              this.$toast.error(
                "Oops there seems to be some Network issue, please try again.",
                {
                  position: "top-center",
                  duration: 4000,
                }
              );
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.order-summary {
      margin-bottom: 0px;
    height: 100vh;
    margin-top: 0;
    background: #f0f0f0;
    width: 100%;
    /* height: 100%; */
    max-width: 100%;
    padding: 40px 70px 20px;

}
.summary_header {
    float: left;
    width: 100%;
    margin-bottom: 15px;
}
.summary-title {
    font-size: 24px;
    color: #000;
    text-transform: capitalize;
    font-weight:600;
}
.edit-cart{
text-decoration: none;
    float: right;
    font-size: 14px;
    color: #000;
    margin: 8px 0;
        font-weight: 600;
    letter-spacing: 0.5px;
}
button.btn.px-3.py-2.btn-sm {
    border: 1px solid #bebebe;
    background: white;
    border-radius: 6px;
}
.product-item-inner{
  font-size: 13px;
    color: black;
    padding-left: 10px;
}
.coupon-container {
      color: #000;
      background-image: url('~/static/images-kartmax/offer-ico.png');
      background-size: auto;
      background-repeat: no-repeat;
          padding-left: 30px;
}
/* .product-item-name-block .details-qty.details-size {
    float: left;
    margin: 8px 8px 8px 0;
    padding-right: 8px;
    border-right: 1px solid #000;
    line-height: 10px;
} */
/* .details-qty {
    float: left;
    margin: 8px 0;
    line-height: 10px;
}  */
.minicart-items {
  overflow: auto;
  max-height: 215px;
}
.minicart-items li {
    border-bottom: 1px solid #c8c8c8!important;
    margin-bottom: 10px!important;
    padding-bottom: 10px!important;
}
.minicart-items li:last-child{
    border-bottom: 0 !important

}

.summary-total .table {
    width: 100%;
    border-top: 1px solid #f3f3f3;
    border-bottom: 2px solid #f3f3f3 !important;
    font-size: 16px;
}
.summary-total th,
.summary-total td {
    padding: 5px 10px!important;
    border-bottom: 0!important;
    font-weight: 400;
    color: #000;
    /* border-bottom: 1px solid #ccc !important; */

}
.summary-total tr{
    /* border-bottom: 1px solid #ccc; */

}
tr.grand.totals {
  border-top: 1px solid #ccc;
}
tr.grand.totals th {
    padding: 10px!important;
    border-top: 1px solid #c8c8c8!important;
    font-weight: 400;
    border-bottom: 0;
    color: #000;
    font-size: 16px!important;
}
 .minicart-items li .item-details {
    width: calc(100% - 85px);
    float: right;
}
@media screen and (max-width: 767px) {
  .order-summary {
       padding: 30px 10px 10px;
    max-width: 100%;
    width: 100% !important;
    position: static;
    margin-bottom: 75px;
    z-index : unset;
  }
  .summary-title {
    font-size: 20px;
  }
}
a{
  text-decoration: none;
}
@media screen and (max-width: 767px) { }
.product-item-name.font-medium {
    cursor: pointer;
}
</style>