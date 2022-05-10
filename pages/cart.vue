<template>
  <div>
    <div
      class="offer-message text-center mt-2"
      style="background-color: #000"
      v-if="
        this.$store.state.list.shipping_charges_below -
          this.$store.state.list.cart_subtotal >=
        1
      "
    ></div>
    <!-- Cart content start here-->
    <div class="container-fluid cart-container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-dark heading text-center cart-title">
            Shopping Cart
          </h1>
        </div>
      </div>

      <div class="row" v-if="this.$store.state.list.cart_product.length != 0">
        <div class="col-9 cart-table">
          <div
            class="success_message"
            v-text="this.$store.state.list.success_message"
            v-if="this.$store.state.list.success_message != ''"
          ></div>
          <div
            class="text-danger kartmax-text-f-12"
            v-text="this.$store.state.list.error_message"
            v-if="this.$store.state.list.error_message != ''"
          ></div>

          <table class="cart table_box">
            <thead>
              <tr>
                <th class="item font-medium">
                  <span
                    >Item ({{
                      this.$store.state.list.cart_product.length
                    }})</span
                  >
                </th>
                <th class="price font-medium"><span>Price</span></th>
                <th class="qty font-medium"><span>Qty</span></th>
                <th class="discount font-medium"><span>Discount</span></th>
                <th class="subtotal font-medium"><span>Subtotal</span></th>
              </tr>
            </thead>
            <tbody class="cart-item border-0">
              <tr
                class="item-info"
                v-for="(items, index) in this.$store.state.list.cart_product"
                :key="`cart-item-${index}`"
              >
                <td class="item">
                  <div class="row">
                    <div class="col-4">
                      <nuxt-link :to="{ path: '/product/' + items.url_key }">
                        <img
                          class="w-100"
                          v-bind:src="
                            $store.state.list.image_url+'cover/700x0/' +
                            items.image
                          "
                          :alt="items.name"
                          :title="items.name"
                        />
                      </nuxt-link>
                    </div>
                    <div class="col-8 position-relative">
                      <h2 class="item-name">
                        <nuxt-link
                          class="link-dark text-decoration-none"
                          :to="{ path: '/product/' + items.url_key }"
                          >{{ items.name }}</nuxt-link
                        >
                      </h2>
                      <div class="selectSizebg">
                        <span class=""> SIZE:</span>
                        <select
                          class="size"
                          @change="sizeChanged($event, items)"
                          :value="items.size"
                        >
                          <option
                            v-for="sizeOptions in sizes(items)"
                            :value="sizeOptions"
                            :key="`size-${sizeOptions}`"
                          >
                            {{ sizeOptions }}
                          </option>
                        </select>
                      </div>
                      <a
                        href="#"
                        title="Remove"
                        class="remove-cart"
                        @click.prevent="deleteEvent(index)"
                      >
                        <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                        <span> Remove </span></a
                      >
                    </div>
                  </div>
                </td>
                <td class="price">
                  <div class="p-0">
                    <p
                      class="mb-0 py-1"
                    >
                      <span class="font-weight-bold pb-0 mb-0 pr-2"
                        ><i class="kartmax_currency"></i> {{ items.price   }}
                      </span>
                    </p>
                 
                  </div>
                  <p
                    class="section-error-message"
                    v-if="items.qty > items.max_qty"
                  >
                    Requested quantity not available.
                  </p>
                </td>
                <td class="qty">
                  <div class="control">
                    <div class="qty_box">
                      <a
                        href="#"
                        @click.prevent="qty_minus(index, 1)"
                        v-bind:class="{ disabled: items.qty === 1 }"
                      >
                        <i class="fa fa-minus"></i></a
                      ><input
                        type="text"
                        :value="items.qty"
                        class="text-center"
                        readonly
                      /><a
                        href="#"
                        v-bind:class="{
                          disabled: items.qty >= items.max_qty,
                          max_disabled: items.qty >= 5,
                        }"
                        @click.prevent="qty_plus(index, items.max_qty)"
                        ><i class="fa fa-plus"></i
                      ></a>
                    </div>
                    <p
                      class="font-medium text-center mobile-qty-msg discount-color"
                      style="font-size: 12px; margin-top: 3px"
                      v-if="items.qty === 1 && items.max_qty === '1'"
                    >
                      Only 1 item is left.
                    </p>
                  </div>
                </td>
                <td class="discount" ><p><i class="kartmax_currency"></i> {{items.price-items.mselling_price}}</p></td>
                <td class="subtotal">
                  <p>
                    <span class="selling_price">
                      <i class="kartmax_currency"></i>
                      {{
                        (items.selling_price * items.qty)  
                      }}</span
                    >
                  </p>
                </td>
              </tr>
            </tbody>

            <tfoot class="border-0">
              <tr class="">
                <td>
                  <nuxt-link
                    to="/account/wishlist"
                    :key="0"
                    class="continue left-box btn btn-outline-primary"
                  >
                    Add More from Wishlist</nuxt-link
                  >
                </td>
                <td colspan="5" class="text-end">
                  <div class="text-end w-100">
                    <nuxt-link
                      :to="{ path: '/' }"
                      :key="0"
                      class="continue btn btn-outline-primary"
                      v-if="
                        this.continue_path === '' || this.continue_path === null
                      "
                      >Continue Shopping</nuxt-link
                    ><nuxt-link
                      :to="{ path: this.continue_path }"
                      :key="0"
                      class="continue btn btn-outline-primary"
                      v-else
                      >Continue Shopping</nuxt-link
                    >
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="col-3 cart-summary">
          <div class="discount-container">
            <label class="w-100 pb-1 mb-0 border-bottom label discount-label">
              <span>Order Summary</span>
            </label>
            <div
              class="coupon-container py-2 w-100 d-flex justify-content-between align-items-center"
            >
              <!-- <p class="coupon-heading pull-left font-medium">Coupons <span v-if="this.$store.state.list.discount_code != null && this.$store.state.list.discount_code != ''">: {{this.$store.state.list.discount_code}}</span></p> -->
              <p class="font-weight-light m-0 coupon-heading">
                {{this.$store.state.list.discount_code==''||$store.state.list.discount_code == null? 'Apply Coupon':'Coupon Applied'}}
                <span>: {{ this.$store.state.list.discount_code }}</span>
              </p>
              <div class="actions-toolbar">
                <button
                  class="btn btn-outline-secondary btn-sm"
                  v-if="
                    this.$store.state.list.discount_code != null &&
                    this.$store.state.list.discount_code != ''
                  "
                  type="button"
                  @click="remove_coupon()"
                >
                  <span>Remove</span>
                </button>
                <button
                  class="btn btn-outline-secondary btn-sm add-coupon"
                  v-else
                  type="button"
                  @click="addcoupon(false)"
                >
                  <span>Apply</span>
                </button>
              </div>
            </div>
            <div class="discount-message"></div>
          </div>
           <div class="summary-container">
            <label class="w-100 pb-1 mb-0 border-bottom label summary-label">
              <span>Price Details</span>
            </label>
            <!-- <p
              v-if="$store.state.list.cart_total < 1000"
              class="cod-tag-style discount-color"
            >
              *Cash On Delivery on orders above <i class="kartmax_currency"></i> 1000
            </p> -->
            <table class="w-100">
              <tbody>
                <tr>
                  <th class="fw-light kartmax-text-f-14 py-2">Total MRP</th>
                  <td class="text-end">
                    <span class="kartmax-text-f-14"
                      ><i class="kartmax_currency"></i>
                      <span id="m_sub_total">{{
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
                      <span id="m_sub_total">{{
                        $store.state.list.summary.discountMRP  
                      }}</span></span
                    >
                  </td>
                </tr>

                <tr v-if="this.$store.state.list.discount_amount>0">
                  <th class="fw-light kartmax-text-f-14 py-2">
                    <span class="kartmax-text-f-14">Discount Coupon</span>
                  </th>
                  <td class="discount-color text-end">
                    <span
                      ><span class="kartmax-text-f-14"
                        ><span> <i class="kartmax_currency"></i> </span
                        ><span>{{
                          this.$store.state.list.discount_amount  
                        }}</span></span
                      ></span
                    >
                  </td>
                </tr>

                <tr v-if="shiping_charges>0">
                  <th class="fw-light kartmax-text-f-14 py-2">
                    <span>Shipping Charge</span>
                  </th>
                  <td class="text-end">
                    <span> <i class="kartmax_currency"></i> {{ shiping_charges   }}</span>
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
                <tr
                  v-if="
                    cod_charges != '0' &&
                    cod_charges != '' &&
                    cod_charges != null && cod_charges > 0
                  "
                >
                  <th class="fw-light">
                    <span class="value">COD Charge</span>
                  </th>
                  <td class="text-end">
                    <span><i class="kartmax_currency"></i> {{ this.cod_charges   }}</span>
                  </td>
                </tr>
                <tr class="grand totals">
                  <th class="font-bold py-2 text-dark">
                    <strong>Order Total</strong>
                  </th>
                  <td class="amount font-bold text-end text-dark">
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
           <div class="forMobile cartBottomFix d-none">
            <nuxt-link
              :to="{ path: '/' }"
              :key="0"
              class="continue btn-outline-secondary text-decoration-none"
              v-if="this.continue_path === '' || this.continue_path === null"
              >Continue Shopping</nuxt-link
            ><nuxt-link
              :to="{ path: this.continue_path }"
              :key="0"
              class="continue btn-outline-secondary text-decoration-none"
              v-else
              >Shop More</nuxt-link
            >
            <nuxt-link
              @click.native="checkout_gtm"
              :to="{ path: '/checkout/address' }"
            >
              <button
                type="button"
                class="checkout checkout-cart fw-light btn-primary"
              >
                <span>Checkout</span>
              </button>
            </nuxt-link>
          </div>
          <div class="forDesktop cartBottomFix" id="cart-checkout-button">
            <nuxt-link
              @click.native="checkout_gtm"
              :to="{ path: '/checkout/login' }"
              class="btn btn-primary w-100 fw-light border-0"
              v-if="
                this.$store.state.list.customer_id == null ||
                this.$store.state.list.customer_id == ''
              "
            >
              <span>Checkout </span>
            </nuxt-link>
            <nuxt-link
              v-else
              @click.native="checkout_gtm"
              :to="{ path: '/checkout/address' }"
            >
              <button
                type="button"
                class="btn btn-primary w-100 fw-light border-0"
              >
                <span>CHECKOUT</span>
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12 text-center">
          <p>
            You have no items in your shopping cart.<br />
            <nuxt-link
              :to="{ path: '/' }"
              :key="0"
              v-if="this.continue_path === '' || this.continue_path === null"
              ><span>Click here</span></nuxt-link
            >
            <nuxt-link
              :to="{ path: this.continue_path }"
              :key="0"
              v-else
              ><span>Click here</span></nuxt-link
            >
            to continue shopping.
          </p>
        </div>
      </div>
    </div>
    <!--Cart content end here-->
    <!--coupon popup start here-->
    <div
      class="modal"
      v-bind:class="[this.coupon_popup ? 'd-none' : 'd-block']"
      id="coupon-modal"
    >
    {{coupon_popup}}
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
                  class="couponsForm-base-couponsTitle py-2 border-bottom my-1"
                >
                  Best coupon for you
                </div>
                <div
                  class="coupon-base-validCoupon coupon-base-validCouponContainer1"
                  v-for="(item, index) in coupon_list"
                  :key="`coupon${index}`"
                >
                  <div
                    class="coupons-container align-items-center d-flex justify-content-between w-100 flex-wrap border-bottom mb-1"
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
      <!-- <div
                class="couponsForm-base-container"
                v-if="this.coupon_list.length != 0"
              >
                <div class="couponsForm-base-couponsTitle py-1">
                  Best coupon for you
                </div>
                <div
                  class="coupon-base-validCoupon coupon-base-validCouponContainer1"
                  v-for="(item, index) in coupon_list"
                  :key="`coupon${index}`"
                >
                  <div
                    class="coupons-container d-flex justify-content-between align-content-center flex-wrap "
                  >
                    <div class="w-50">{{ item.coupon_code }} </div>
                    <div
                      class="btn btn-outline-dark btn-sm  w-50 "
                      @click="apply_list_coupon(item.coupon_code)"
                    >
                      Apply
                    </div>
                    <div class="coupon-base-benefit w-100 my-1">
                      <span class="coupon-base-amount font-medium"
                        ><span class="icon-rupee coupon-base-rupeeIcon"></span
                        >{{ item.display_message }}</span
                      >
                    </div>
                  </div>
                </div>

            </div> -->
    </div>
    <!--coupon popup end here-->
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import OrderSummary from "./checkout/order-summary.vue";

//import VueToast from 'vue-toast-notification'
//import '~/node_modules/vue-toast-notification/dist/theme-sugar.css'

//Vue.use(VueToast);
export default {
  name: "Cart",
  components: { OrderSummary },
  head() {
    return {
      bodyAttrs: {
        class: "cart",
      },
    };
  },
  metaInfo: {
    title: "Cart",

  },
  computed: {
    filterActiveCoupons() {
      const coupons = [];
      const today = new Date();
      for (let coupon of this.coupon_list) {
        const date = new Date(coupon.valid_till);
        if (today < date) {
          coupons.push(coupon);
        }
      }
      return coupons;
    },
  },
  data() {
    return {
      capillaryAmount: null,
      showAllOffers: false,
      continue_path: "",
      coupon_popup: true,
      applied_coupon: "",
      cod_charges: "",
      shiping_charges: "",
      coupon_list: [],
    };
  },
  methods: {
    showHideTopScroll() {
      if (window.pageYOffset > 150) {
        document.getElementById("scroll-to-top").style.display = "block";
      } else {
        document.getElementById("scroll-to-top").style.display = "none";
      }
    },
    sizeChanged(event, item) {
      item.variation.forEach((variation) => {
        if (variation.size === event.target.value) {
          var form = new FormData();
          form.append("qty_ordered", item.qty);
          form.append("cart_session", this.$store.state.list.cart_session);
          form.append("product_id", variation.id_product);
          form.append("cart_id", this.$store.state.list.cart_id);
          form.append("product_options", variation.size);
          form.append("name", item.name);
          form.append("sku", variation.sku);
          form.append("master_sku", variation.sku);
          form.append("price", variation.price);
          form.append("final_price", variation.selling_price);
          form.append("store", this.$store.state.list.store);
          form.append("old_product_id", item.variant_id);
          axios
            .post(
              this.$store.state.list.cart_api_url+'/v1' + "/product/replace-product",
              form
            )
            .then((response) => {
              if (response.data.success === true) {
              
                this.$store.state.list.page_loader = false;
                this.$store.state.list.cart_product =
                  response.data.data.products;
                // this.$store.state.list.googleAnalyticsTag('add_to_cart')
                // this.$store.state.list.cart_total =
                //   response.data.data.grand_total;
                this.$store.state.list.cart_total = response.data.data.net_amount;

                this.$store.state.list.cart_subtotal =
                  response.data.data.order_subtotal;
                this.$store.state.list.discount_code =
                  response.data.data.discount_code;
                this.$store.state.list.discount_amount =
                  response.data.data.discount_amount;
                this.shiping_charges = response.data.data.shipping_charge;
                this.cod_charges = response.data.data.cod_charge;
                this.$store.state.list.error_message = "";
                this.$toast.success(response.data.message, {
                  position: "top-center",
                  duration: 4000,
                });
              } else {
                this.$store.state.list.page_loader = false;
                this.$toast.error(response.data.message, {
                  position: "top-center",
                  duration: 4000,
                });
                this.$store.state.list.success_message = "";
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
                }
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
      });

    },
    sizes(item) {
      let sizes = [];
      if(item.variation !== null && item.variation !== undefined){
        item.variation.forEach((variation) => {
        if (
          parseInt(variation.quantity) >= item.qty &&
          sizes.includes(variation.size) === false
        ) {
          sizes.push(variation.size);
        }
      });
      return sizes;
      }
      
    },
    moveToWishListEvent(index) {
      this.add_w(this.$store.state.list.cart_product[index].product_id, index,this.$store.state.list.cart_product[index].group_id,this.$store.state.list.cart_product[index].sub_group_id);
      //    this.deleteEvent(index)
    },
    apply_list_coupon(code) {
      this.applied_coupon = code;
      this.apply_coupon();
    },
    get_cart: function () {
   
      this.$store.state.list.cart_session = $cookies.get(
        window.location.hostname.substring(10, 4) + "_ct_sess"
      );
      this.$store.state.list.cart_id = $cookies.get(
        window.location.hostname.substring(10, 4) + "_cart"
      );

      // this.$store.state.list.cart_id = $cookies.get(
      //   window.location.hostname.substring(10, 4) + "_cart",
      //   ""
      // );
      if (
        this.$store.state.list.cart_id != null &&
        this.$store.state.list.cart_id != "" &&
        this.$store.state.list.cart_id != "undefined"
      ) {
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append("cart_id", this.$store.state.list.cart_id);
      
        form.append("cart_session", this.$store.state.list.cart_session);
        // if (this.$store.state.list.customer_id != null && this.$store.state.list.customer_id != '') {
        //     form.append("customer_session", this.$store.state.list.customer_session);
        // }
        axios
          .post(this.$store.state.list.cart_api_url+'/v1' + "/cart/get-cart", form)
          .then((response) => {
            if (response.data.success === true) {
              this.$store.state.list.page_loader = false;

              this.$store.state.list.cart_product = response.data.data.products;
              this.$store.state.list.customer_detail =
                response.data.data.customer;
              // this.$store.state.list.cart_total =
              //   response.data.data.grand_total;
              this.$store.state.list.cart_total = response.data.data.net_amount;

              this.$store.state.list.cart_subtotal =
                response.data.data.order_subtotal;
              this.$store.state.list.address = response.data.data.address;
              this.$store.state.list.discount_code =
                response.data.data.discount_code;
              this.$store.state.list.discount_amount =
                response.data.data.discount_amount;
              this.shiping_charges = response.data.data.shipping_charge;
              this.cod_charges = response.data.data.cod_charge;
                    this.$store.state.list.loyalty_discount = response.data.data.loyalty_discount;

              // if(response.data.data.cookieDelete === 1)
              // {
              //     $cookies.set(window.location.hostname.substring(10, 4)+'_cart', '');
              //     this.$store.state.list.cart_id = '';
              // }
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
            } else {
              this.$store.state.list.page_loader = false;
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });

              // if (response.data.cart_session_status == false) {
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
    checkout_gtm: function () {
      if (
        window.dataLayer !== undefined &&
        window.dataLayer !== null &&
        window.dataLayer !== ""
      ) {
        window.dataLayer.push({
          event: "checkout",
          action: "Checkout",
          ecommerce: {
            checkout: {
              actionField: {
                step: 1,
                option: this.$store.state.list.login_status,
              },
              product: this.$store.state.list.gtm_product,
            },
          },
        });
      }
    },
    deleteEvent: function (index) {
      if (
        window.dataLayer !== undefined &&
        window.dataLayer !== null &&
        window.dataLayer !== ""
      ) {
        window.dataLayer.push({
          event: "removeFromCart",
          action: "removeFromCart",
          ecommerce: {
            remove: {
              product: [
                {
                  name: this.$store.state.list.cart_product[index].name,
                  id: this.$store.state.list.cart_product[index].master_sku,
                  price:
                    this.$store.state.list.cart_product[index].selling_price,
                  variant: this.$store.state.list.cart_product[index].fynd_size,
                  quantity: this.$store.state.list.cart_product[index].qty,
                },
              ],
            },
          },
        });
      }
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("cart_session", this.$store.state.list.cart_session);
      form.append(
        "product_id",
        this.$store.state.list.cart_product[index].variant_id
      );
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/product/remove-product",
          form
        )
        .then((response) => {
          if (response.data.success === true) {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.cart_product = response.data.data.products;
            this.$store.state.list.cart_total = response.data.data.grand_total;
            this.$store.state.list.cart_subtotal =
              response.data.data.order_subtotal;
            this.$store.state.list.discount_amount =
              response.data.data.discount_amount;
            this.shiping_charges = response.data.data.shipping_charge;
            this.cod_charges = response.data.data.cod_charge;
            this.$store.state.list.discount_code =
              response.data.data.discount_code;
            this.$store.state.list.error_message = "";
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            if (response.data.data.cart_session) {
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
            }

            // update mini cart
            this.miniCart()

            // let miniCart = document.getElementsByClassName("minicart-items");
            // console.log("miniCart========",miniCart);
            // let items = miniCart[0].getElementsByClassName("product");
            // console.log(items);
            // for (let i = 0; i < items.length; i++) {
            //   let getItem = items[i].getElementsByClassName(
            //     "product-item-details"
            //   )[0].innerText;
            //   if (
            //     getItem.includes(
            //       this.$store.state.list.cart_product[index].size
            //     ) &&
            //     getItem.includes(
            //       this.$store.state.list.cart_product[index].name
            //     )
            //   ) {
            //     items[i].remove(); // remove item
            //     let orderCount = document.getElementById("order-count");
            //     let miniItemTotal =
            //       document.getElementById("km-mini-item-total");
            //     let miniItemCount =
            //       document.getElementById("km-mini-item-count");
            //     if (this.$store.state.list.cart_product.length > 0) {
            //       orderCount.innerHTML =
            //         this.$store.state.list.cart_product.length;
            //       miniItemCount.innerHTML =
            //         this.$store.state.list.cart_product.length;
            //       miniItemTotal.innerHTML = this.$store.state.list.cart_total;
            //     } else {
            //       miniItemTotal.innerHTML = 0;
            //       miniItemCount.innerHTML = 0;
            //       // let count = document.getElementsByClassName(
            //       //   "custom-counter-number"
            //       // );
            //       orderCount.classList.add("d-none");
            //       let miniCart =
            //         document.getElementsByClassName("mini_cart_drop");
            //       miniCart[0].classList.add("d-none");
            //     }
            //   }
            // }
          } else {
            this.$store.state.list.page_loader = false;
            this.$toast.error(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.$store.state.list.success_message = "";
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
            }
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
    },
    async qty_plus(index, max_qty) {
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      var current_qty = this.$store.state.list.cart_product[index].qty;
      if (current_qty < max_qty && current_qty < 5) {
        this.$store.state.list.cart_product[index].qty = current_qty + 1;
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append(
          "qty_ordered",
          this.$store.state.list.cart_product[index].qty
        );
        form.append("cart_session", this.$store.state.list.cart_session);
        form.append(
          "product_id",
          this.$store.state.list.cart_product[index].variant_id
        );
        form.append("cart_id", this.$store.state.list.cart_id);
        await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/product/update-product",
            form
          )
          .then(async (response) => {
            if (response.data.success === true) {
              this.$store.state.list.page_loader = false;
              this.$store.state.list.cart_product = response.data.data.products;
              this.$store.state.list.cart_total = response.data.data.net_amount;
              this.$store.state.list.cart_subtotal =
                response.data.data.order_subtotal;
              this.$store.state.list.discount_code =
                response.data.data.discount_code;
              this.$store.state.list.discount_amount =
                response.data.data.discount_amount;
              this.shiping_charges = response.data.data.shipping_charge;
              this.cod_charges = response.data.data.cod_charge;
              this.$store.state.list.error_message = "";
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
            } else {
              this.$store.state.list.page_loader = false;
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.$store.state.list.success_message = "";
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
              }
            }
            this.miniCart()
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
    async qty_minus(index, max_qty) {
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      var current_qty = this.$store.state.list.cart_product[index].qty;
      if (current_qty > 1) {
        this.$store.state.list.cart_product[index].qty = current_qty - 1;
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append(
          "qty_ordered",
          this.$store.state.list.cart_product[index].qty
        );
        form.append(
          "product_id",
          this.$store.state.list.cart_product[index].variant_id
        );
        form.append("cart_session", this.$store.state.list.cart_session);
        form.append("cart_id", this.$store.state.list.cart_id);
        await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/product/update-product",
            form
          )
          .then(async (response) => {
            if (response.data.success === true) {
              this.$store.state.list.page_loader = false;
              this.$store.state.list.cart_product = response.data.data.products;

              this.$store.state.list.cart_total =
                response.data.data.grand_total;
              this.$store.state.list.cart_subtotal =
                response.data.data.order_subtotal;
              this.$store.state.list.discount_code =
                response.data.data.discount_code;
              this.shiping_charges = response.data.data.shipping_charge;
              this.cod_charges = response.data.data.cod_charge;
              this.$store.state.list.discount_amount =
                response.data.data.discount_amount;
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.$store.state.list.error_message = "";
            } else {
              this.$store.state.list.page_loader = false;
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.$store.state.list.success_message = "";
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
              }
            }
            this.miniCart()
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

    miniCart() {
      let orderCount = document.getElementById("order-count");
      // if(this.$store.state.list.cart_product.length > 0){
      orderCount.textContent = this.$store.state.list.cart_product.length;
      if(this.$store.state.list.cart_product.length>0)
      orderCount.classList.add("d-block");  // open minicart
      let productItem = document.querySelectorAll('[id^="product-item"]');
        productItem.forEach(async (item,i) => {
         if(i>0){
          await item.remove()
         }
        })
      
      let miniItemCount = document.getElementById("km-mini-item-count");
      miniItemCount.innerHTML = this.$store.state.list.cart_product.length;

      let miniItemTotal = document.getElementById("km-mini-item-total");
      miniItemTotal.innerHTML = this.$store.state.list.cart_total;
      var product = document.getElementById("product-item");
      let storeLenght = this.$store.state.list.cart_product.length;
      
      for (let i = 0; i < storeLenght; i++) {  // clone div 
        if (i>0){
            var j = 0;
            var original = product;
            var clone = original.cloneNode(true);
            clone.id = "product-item" + ++j;
            clone.key = i;
            original.parentNode.appendChild(clone);
        }
      }

      let prices = document.querySelectorAll("#km-mini-item-price");
      let discount = document.querySelectorAll(
        '[id^="km-mini-item-dis-price"]'
      );
      let sizes = document.querySelectorAll('[id^="km-mini-item-size"]');
      for (let i = 0; i < sizes.length; i++) {
        sizes[i].innerHTML = this.$store.state.list.cart_product[i].size;
      }

      let qty = document.querySelectorAll('[id^="km-mini-item-qty"]');
      for (let i = 0; i < qty.length; i++) {
          qty[i].innerHTML = this.$store.state.list.cart_product[i].qty;
      }

      let removeButton = document.querySelectorAll('#km-mini-item-remove');
      let names = document.querySelectorAll("#km-mini-item-name");
      let miniCart = document.getElementsByClassName("mini_cart_drop");
      let itemImages = document.querySelectorAll(".product-item-photo");

      for(let i=0;i< itemImages.length;i++){
        itemImages[i].getElementsByTagName('img')[0].src   = that.$store.state.list.image_url+`live/400x0/` + this.$store.state.list.cart_product[i].image;
      }
      miniCart[0].classList.remove("d-none");
      // dynamic all static valye
      
      for (let i = 0; i < prices.length; i++) {
        prices[i].innerHTML = this.$store.state.list.cart_product[i].selling_price + '';
       
        names[i].innerHTML = this.$store.state.list.cart_product[i].name;
        if (discount.length) {
          discount[i].innerHTML = this.$store.state.list.cart_product[i].discount_amount > 0 ? this.$store.state.list.cart_product[i].discount_amount : '';
        }
        removeButton[i].id = i;
      }

      return;
      // }
    },
    qtychange: async function (index) {
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      this.$store.state.list.page_loader = true;
      this.$store.state.list.cart_product[index].qty = event.target.value;
      var form = new FormData();
      form.append(
        "qty_ordered",
        this.$store.state.list.cart_product[index].qty
      );
      form.append(
        "product_id",
        this.$store.state.list.cart_product[index].variant_id
      );
      form.append("cart_session", this.$store.state.list.cart_session);
      form.append("cart_id", this.$store.state.list.cart_id);
      await axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/product/update-product",
          form
        )
        .then((response) => {
          if (response.data.success === true) {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.cart_product = response.data.data.products;
            this.$store.state.list.cart_total = response.data.data.grand_total;
            this.$store.state.list.cart_subtotal =
              response.data.data.order_subtotal;
            this.$store.state.list.discount_code =
              response.data.data.discount_code;
            this.$store.state.list.discount_amount =
              response.data.data.discount_amount;
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.$store.state.list.error_message = "";
          } else {
            this.$store.state.list.page_loader = false;
            this.$toast.error(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.$store.state.list.success_message = "";
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
            }
          }
          this.miniCart()
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
    close_popup: function () {
      this.coupon_popup = true;
    },
    async apply_coupon(e) {
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

        await axios
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
    remove_coupon: function () {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("cart_session", this.$store.state.list.cart_session);
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      axios
        .post(this.$store.state.list.cart_api_url+'/v1' + "/cart/remove-coupon", form)
        .then((response) => {
          if (response.data.success === true) {
            this.$store.state.list.page_loader = false;
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.$store.state.list.discount_code =
              response.data.data.discount_code;
            this.$store.state.list.discount_amount =
              response.data.data.discount_amount;
            this.$store.state.list.cart_product = response.data.data.products;
            this.$store.state.list.cart_total = response.data.data.grand_total;
            this.$store.state.list.cart_subtotal =
              response.data.data.order_subtotal;
            this.shiping_charges = response.data.data.shipping_charge;
            this.$store.state.list.error_message = "";
          } else {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.success_message = "";
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
            }
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
    },
    add_w(id,index,g_id,sub_group_id) {
      if (
        this.$store.state.list.customer_id != "" &&
        this.$store.state.list.customer_id != null
      ) {
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append("product_id", id);
        form.append("group_id", g_id);
        form.append("sub_group_id", sub_group_id);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + `/wishlist/add-wishlist`,
            form
          )
          .then((response) => {
            this.$store.state.list.page_loader = false;
            if (response.data.success == true) {
              //this.$store.state.list.wishlist = response.data.data.product;
              // this.wishlist = response.data.data.product.split(',');
              this.$store.state.list.wishlist_count =
                response.data.data.total_row;
              //this.wishlist = true;
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.deleteEvent(index);
            } else {
              this.$store.state.list.page_loader = false;
              if (response.data.data.customer_session_status == false) {
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
              }
            }
          });
      } else {
        this.$store.state.list.login_popup = true;
      }
    },
  },
  mounted() {
    // if (process.browser) {
    //   window.dataLayer.push({
    //     category: "cat",
    //     event: "cartpage",
    //     action: "Cartpage clicked ",
    //   });
    // }
    //  window.addEventListener('scroll', this.showHideTopScroll);
    // document.getElementById('scroll-to-top').style.display = 'none'
    // document.getElementById('scroll-to-top').addEventListener('click', () => {
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: 'smooth'
    //   })
    // })
    this.$store.state.list.cart_id = $cookies.get(
      window.location.hostname.substring(10, 4) + "_cart"
    );

    this.get_cart();
    this.$store.state.list.error_message = "";
    this.$store.state.list.success_message = "";
    //    this.addcoupon ();
  },
  beforeMount() {
  //  window.addEventListener("message", (event) => {
  //       let data;
  //       data = event.data
  //       if(typeof event.data == "string"){
  //         data = JSON.parse(event.data)
  //       }
  //       var frame = document.getElementById("checkout");
  //       if(frame !== null){
  //          frame.parentNode.removeChild(frame);
  //       if(data == 'close'){
  //           return
  //       }
  //       else if(data.order_quote_id !== null && data.order_quote_id !== undefined){
  //         this.$store.state.list.customer_id = data.customer_id
  //         this.$store.state.list.customer_session = data.customer_session
          
  //         this.$router.push(`/account/order-detail?id=${data.order_quote_id}`)
  //       }else{
  //         this.$toast.error(
  //               "Oops there seems to be some Network issue, please try again.",
  //               {
  //                 position: "top-center",
  //                 duration: 4000,
  //               }
  //             );
  //         }
  //       }

  //     //  location.reload();
  //   }, false);
    this.$store.state.list.minicart = true;
    this.continue_path = $cookies.get(
      window.location.hostname.substring(10, 4) + "_last_list_path"
    );
  },
};
</script>
<style lang="scss">
.cart-summary {
  padding: 15px;
  flex: 0 0 30%;
  max-width: 30%;
  background-color: #fafafa;
  font-family: var(--bs-font-sans-serif);
}
.cart-container {
  padding: 0.7rem 2rem;
  min-height: 90vh;
  margin-bottom: 50px;
}
.cart-container .cart-title {
  font-size: 30px;
  margin: 25px 0;
  font-weight: bold;
}
.cart-container .cart-table {
  flex: 0 0 70%;
  max-width: 70%;
}
.cart-item .item {
  width: 40%;
  padding: 15px;
}
.table_box td,
.table_box th {
  border-bottom: 1px solid #f4f4f4;
  padding: 10px;
}
.cart.table_box {
  border-top: 1px solid #f4f4f4;
}
.cart-item .item-photo img {
  max-width: 100%;
}
.cart-item .item-name {
  font-size: 15px;
  font-weight: 600;
}
.selectSizebg {
  display: inline-block;
  background: #f5f5f6;
  padding: 2px 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
.selectSizebg select.size {
  background: transparent;
  border: none;
  font-weight: normal;
  outline: none;
}
.cart-item .remove-cart {
  position: absolute;
  bottom: 0;
  left: 20px;
  font-size: 12px;
}
.cart-item .remove-cart i {
  margin-right: 5px;
}
.cart-item td > p {
  font-size: 15px;
}
.cart-item .qty_box {
  width: 110px;
}
.cart-item .qty_box a {
  padding: 5px 9px;
  border: 1px solid #ccc;
  vertical-align: top;
  margin: 0;
  height: 30px;
  color: #000;
  background-color: #ccc;
  font-size: 12px;
  display: inline-block;
}
.cart-item .qty_box a.disabled,
.cart-item .qty_box a.max_disabled {
  opacity: 0.2;
  cursor: no-drop;
}
.cart.table_box {
  font-family: var(--bs-font-sans-serif);
}

.cart-item .qty_box input {
  text-align: center;
  outline: none;
  font-size: 15px;
  padding: 2px;
  height: 30px;
  border-radius: 0;
  border: 1px solid #ccc;
  width: 40px;
  cursor: default;
  font-family: futuramedium;
  text-transform: uppercase;
}
.cart-container .cart-table .continue {
  background: transparent;
  // border: 1px solid #bebebe;
  border-radius: 5px;
  color: #000;
  text-transform: none;
  font-size: 13px;
  padding: 10px 15px 8px;
  font-family: futuramedium;
  text-decoration: none;
  cursor: pointer;
  float: right;
  text-transform: uppercase;
  font-family: var(--bs-font-sans-serif);
}
.left-box {
  float: left !important;
}

@media screen and (max-width: 1024px) {
  .cart-container .cart-table,
 .cart-container .cart-summary{
    flex: 0 0 100%;
    max-width: 100%;
  }
  .cart-item .remove-cart {
    position: static;
  }
  .container-fluid .row {
    // margin-left: auto !important;
  }
    .discount-container .actions-toolbar {
      text-align: right;
    }
  .discount-container .actions-toolbar button {
    width: auto;
  }
}
@media screen and (max-width: 767px)  {
  .cart-container .cart-table .cart-item td.discount,
  .cart-container .cart-table .cart-item td.subtotal
  {
    padding: 8px;
  }
  .cart-container .cart-table .cart-item td.qty .qty_box {
    width: 100%;
  }
  .cart-container .cart-table .cart-item td.qty .qty_box:before {
    display: inline-block;
    float: left;
    content: "Qty :";
    font-size: 14px;
  }
}
button.btn.btn-primary.w-100.fw-light.border-0 {
    padding: 11px;
}
</style>
