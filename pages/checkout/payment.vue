<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-7 col-12 login-height pr-0 pl-0 checkout-section">
        <CheckoutHeader />
        <Address from="payment"></Address>
        <loyalty-checkout
          :amount="this.$store.state.list.cart_subtotal"
        ></loyalty-checkout>
        <credits-checkout></credits-checkout>

        <div
          id="payment-method-section"
          class="payment-method-section opc-section"
          v-if="parseInt(this.$store.state.list.cart_total)>0"
        >
          <h5
            class="text-dark payment-mode my-1"
            v-if="activeMethods.length > 0"
          >
            CHOOSE PAYMENT MODE
          </h5>
          <div v-if="showMessage">
            <div class="card">
              <div class="card-header">Important Information</div>
              <div class="card-body">
                <h5 class="card-title">
                  No payment method enabled / integrated
                </h5>
                <ul class="method-info pl-1">
                  <li>
                  Please enable or integrate at least one payment method. You can do so from your site-specific dashboard under the "Integration" section.
                  </li>
                  <li>
                    Enable pin codes to accept COD and Prepaid orders. You can do so from your site-specific dashboard under the "Pincodes" section.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="new_payment-method-section" v-if="parseInt(this.$store.state.list.cart_total)>0">
            <div
              class="new_payment-method border py-2 px-3 d-flex align-items-center justify-content-between mb-2 flex-wrap mt-2"
              v-for="method in activeMethods"
              :key="method"
              v-bind:class="{ active: payment_method == method }"
              @click.prevent="select_payment_method(method)"
            >
              
              <div v-if="method !== 'cod' && method !== 'COD'" class="d-flex align-items-center">
                <p class="m-0 w-100">
                  <input
                    type="radio"
                    id="test1"
                    name="radio-group"
                    class="check-radio text"
                  />
                  <label class="text" for="test1">
                    CREDIT CARD / DEBIT CARD / NET BANKING / WALLET / UPI
                  </label>
                </p>
                <div
                  class="method-img w-25 text-end"
                >
                  <img
                    :src="$store.state.list.image_url+`outside/80x80/services/${method}.png`"
                    width="50%"
                    alt="Credits"
                  />
                </div>
              </div>
              <div
                v-if="method == 'cod' || method == 'COD'"
                class="d-flex align-items-center"
              >
                <div class="f-21">₹</div>
                <p class="m-0 w-100">
                  <label class="text-cod" for="test1"> CASH ON DELIVERY</label>
                </p>
              </div>
            </div>
            
            <div class="text-end fix_bottom">
              <button
                class="btn btn-primary mt-1"
                @click="payNowLatest()"
                v-if="payment_method != '' && payment_method !== null"
                v-text="payment_method == 'cod' ? 'Place order' : 'Pay Now'"
              ></button>
            </div>
          </div>
          
        </div>
        <div class="text-end fix_bottom p-3" v-if="this.$store.state.list.cart_total==0">
              <button
                class="btn btn-primary mt-1"
                @click="payNowCredit()"
                v-text=" 'Place order'"
              ></button>
            </div>
          <div class="col-6 text-left mr-0 px-3 pr-0 checkbox_padding" v-if="express_delvery">
           <input class="form-check-input " type="checkbox" value=""  @click="applyExpressDelivery()"  :checked="$store.state.list.express_delivery_charge>0" id="" >
           <span v-if="$store.state.list.express_delivery_charge>0 ">
              Express Delivery Applied
           </span>
           <span v-else>
             Apply Express Delivery 
           </span>
        </div>
      </div>
      
      <div class="col-md-5 col-12 mobile-color" >
        <OrderSummary @updatedata="updateCartData()" />
      </div>
    </div>
  </div>
</template>

<script>
var modaldata = "";
import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import OrderSummary from "./order-summary.vue";
import CheckoutHeader from "./checkout-header.vue";
import Loyalty from "../account/loyalty.vue";
import { modifyMixin } from "../../mixin.js";
import Address from "./address.vue";

export default {
  layout: "checkoutPage",
  mixins: [modifyMixin],
  components: {
    OrderSummary,
    CheckoutHeader,
    Loyalty,
    Address,
  },
  data() {
    return {
      activeMethods: "",
      payment_method: "",
      from: "",
      express_delvery:false,
      express:false,
      showMessage :false,

    };
  },

  beforeMount() {
    let compdata = this;
    /**
     * Add event on the parent page to listen to model window,
     * we have returned complete url from modal, where we redirect in parent window
     */

    window.addEventListener(
      "message",
      function (e) {
        console.log("e.dara",e.data,modaldata);
        if (e.data.success == true) {
          if (modaldata) {
            modaldata.close();
          }
          window.location.href = e.data.url + "&show=1";
        }
      },
      false
    );
  },
  beforeDestroy() {
    window.removeEventListener("message", {});
  },

  async mounted() {
    // call pay options api
    this.get_cart();

    var form = new FormData();
    form.append("cart_id", this.$store.state.list.cart_id);
    form.append("cart_session", this.$store.state.list.cart_session);
    let config = { headers: { "Content-Type": "multipart/form-data" } };

    await axios
      .post(
        this.$store.state.list.cart_api_url+'/v1' + "/order/allowed-payment-methods",
        form,
        config
      )
      .then((response) => {
        this.activeMethods = response.data.data;
        if(this.activeMethods.length == 0){
          this.showMessage = true
        }
      })
      .catch((err) => {
        this.showMessage = true
        this.$toast.error(err.response.data.message, {
          position: "top-center",
          duration: 4000,
        });
      });


      this.getExress()
  },
  methods: {
    async getExress(){
        var form = new FormData();
        form.append("cart_id", this.$store.state.list.cart_id);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append("customer_session", this.$store.state.list.customer_session);

        let config = { headers: { "Content-Type": "multipart/form-data" } };

        await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/order/check-express-delivery-availability",
            form,
            config
          )
          .then((response) => {
            this.express_delvery = response.data.data.available_express_delivery;
          })
          .catch((err) => {
            this.$toast.error(err.response.data.message, {
              position: "top-center",
              duration: 4000,
            });
          });
    },
    async applyExpressDelivery (){
        var form = new FormData();
        form.append("cart_id", this.$store.state.list.cart_id);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append("customer_session", this.$store.state.list.customer_session);

        let config = { headers: { "Content-Type": "multipart/form-data" } };
        if(this.$store.state.list.express_delivery_charge==0 || this.$store.state.list.express_delivery_charge == null){
            await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/order/apply-express-delivery",
            form,
            config
          )
          .then((response) => {
            this.get_cart();

            // this.express_delvery = response.data.data.available_express_delivery;
          })
          .catch((err) => {
            console.log("errrr", err.response.data);
            this.$toast.error(err.response.data.message, {
              position: "top-center",
              duration: 4000,
            });
          });
        }else{
          await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/order/remove-express-delivery",
            form,
            config
          )
          .then((response) => {
            
            this.get_cart();

            // this.express_delvery = response.data.data.available_express_delivery;
          })
          .catch((err) => {
            console.log("errrr", err.response.data);
            this.$toast.error(err.response.data.message, {
              position: "top-center",
              duration: 4000,
            });
          });
        }
        
       
    },
    authenticate(url) {
      const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : window.screenX;
      const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
      const systemZoom = width / window.screen.availWidth;
      const left = (width - 360) / 2 / systemZoom + dualScreenLeft;

    
      // last config have width and height data for default configs.
      modaldata = window.open(
        url,
        "winname",
        `directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=360,height=600,left=${left}`
      );
    },
    checkPaymentMethod() {
      this.activeMethods.map((e) => {
        if (e == "cod" || e == "COD") {
          this.showlength = this.activeMethods.length - 1;
        }
        if (this.showlength > 0) {
          return true;
        } else {
          return false;
        }
      });
    },
    payNowCredit(){
      this.payment_method ="credits"
      this.payNowLatest()
    },

    payNowLatest() {
      this.place_order();
    },
    place_order: function () {
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      this.$store.state.list.page_loader = true;
      this.$store.state.list.thankyou_status = true;
      $cookies.set(
        window.location.hostname.substring(10, 4) + "_thank",
        "true"
      );
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("cart_session", this.$store.state.list.cart_session);

      form.append("payment_method", this.payment_method);
      form.append("redirect_url", window.location.origin + "/thankyou");
      form.append("cancel_url", window.location.origin + "/payment");
      form.append("failed_url", window.location.origin + "/payment");

      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (this.payment_method === "cod") {
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
                actionField: { step: 5, option: "Cash On Delivery" },
                product: this.$store.state.list.gtm_product,
              },
            },
          });
        }

        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/order/add-order",
            form,
            config
          )
          .then((response) => {
            if (response.data.success === true) {
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                response.data.data.cart_id,
                "1y"
              );
              this.$store.state.list.cart_id = response.data.data.cart_id;
              this.$store.state.list.thankyou_cart = response.data.data.cart_id;
              if (response.data.data.cart_session) {
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_ct_sess",
                  response.data.data.cart_session,
                  "1y"
                );
                this.$store.state.list.cart_session =
                  response.data.data.cart_session;
              }
              if (response.data.data.pointValidationResponse) {
                this.$router.push("/validate_points");
                this.$store.state.list.page_loader = false;
              } else {
                location.replace("https://" + location.host + "/thank-you");
              }
            } else {
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.$store.state.list.success_message = "";
              this.$store.state.list.page_loader = false;
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
                this.$router.push("/cart");
              }
            }
          })
          .catch((error) => {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.thankyou_status = false;
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_thank",
              ""
            );
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
      } else if (this.payment_method != "cod") {
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
                actionField: { step: 5, option: "Cash On Delivery" },
                product: this.$store.state.list.gtm_product,
              },
            },
          });
        }
        this.$store.state.list.page_loader = true;
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/order/add-order",
            form,
            config
          )
          .then((response) => {
            if (response.data.success === true) {
              this.$store.state.list.page_loader = false;
              // payment url
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                response.data.data.cart_id,
                "1y"
              );
              this.$root.cart_id = response.data.data.cart_id;
              this.$root.thankyou_cart = response.data.data.cart_id;
              console.log("response.data.data.payment_method",response.data.data.payment_method)
              if(response.data.data.payment_url == null && response.data.data.payment_method == 'credits'){
                console.log("location.host",location.host)
                location.replace("https://" + location.host + "/thank-you");
              }
              else{
                this.authenticate(
                  response.data.data.payment.method_info.payment_url
                );
              }
             
             
              return false;
              //end payment url
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                response.data.data.cart_id,
                "1y"
              );
              this.$store.state.list.cart_id = response.data.data.cart_id;
              this.$store.state.list.thankyou_cart = response.data.data.cart_id;
              if (response.data.data.cart_session) {
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_ct_sess",
                  response.data.data.cart_session,
                  "1y"
                );
                this.$store.state.list.cart_session =
                  response.data.data.cart_session;
              }
            } else {
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.$store.state.list.success_message = "";
              this.$store.state.list.page_loader = false;
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
                this.$router.push("/cart");
              }
            }
          })
          .catch((error) => {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.thankyou_status = false;
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_thank",
              ""
            );
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
      } else if (this.payment_method === "mloyalPoint") {
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/order/add-order",
            form,
            config
          )
          .then((response) => {
            if (response.data.success === true) {
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                response.data.data.cart_id,
                "1y"
              );
              this.$store.state.list.cart_id = response.data.data.cart_id;
              this.$store.state.list.thankyou_cart = response.data.data.cart_id;
              if (response.data.data.cart_session) {
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_ct_sess",
                  response.data.data.cart_session,
                  "1y"
                );
                this.$store.state.list.cart_session =
                  response.data.data.cart_session;
              }
              if (response.data.data.pointValidationResponse) {
                this.$router.push("/validate_points");
                this.$store.state.list.page_loader = false;
              } else {
                location.replace("http://" + location.host + "/thankyou");
              }
            } else {
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.$store.state.list.success_message = "";
              this.$store.state.list.page_loader = false;
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
                this.$router.push("/cart");
              }
            }
          })
          .catch((error) => {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.thankyou_status = false;
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_thank",
              ""
            );
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
    select_payment_method: function (value) {
      this.$store.state.list.page_loader = true;
      this.payment_method = value;
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("cart_session", this.$store.state.list.cart_session);
      form.append("payment_method", value);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/cart/switch-payment-method",
          form,
          config
        )
        .then((response) => {
          if (response.data.success === true) {
            // this.$store.state.list.cart_subtotal =
            //   response.data.data.order_subtotal;
            // this.$store.state.list.cart_total = response.data.data.grand_total;
            // this.net_amount = response.data.data.net_amount;
            // this.cod_charges = response.data.data.cod_charge;
            this.$store.state.list.page_loader = false;
            this.get_cart();
            // if (response.data.data.is_store_credit_applied) {
            //   this.$store.state.list.store_credits_used =
            //     response.data.data.store_credit_used;
            // } else {
            //   this.$store.state.list.store_credits_used = null;
            // }
            // this.mloyal_point = response.data.data.mloyal_point;
            // this.mloyal_amount = response.data.data.mloyal_amount;
            // this.gateway_discount = response.data.data.discount_gateway;
          } else {
            this.$store.state.list.page_loader = false;
            this.$toast.error(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
          }
        })
        .catch((error) => {
          this.$store.state.list.page_loader = false;
        });
    },
  },
};
</script>

<style scoped>
.checkout-section {
  margin-top: 80px;
  padding: 20px 80px;
  z-index: 0;
}
/* new css */
.login-height {
  min-height: 550px;
}
.new_payment-method {
  position: relative;
  height: 60px;
}
.new_payment-method-section button {
  /* display: none; */
}
.new_payment-method:hover {
  border-color: var(--bs-primary) !important;
}
.new_payment-method.active {
  border-color: var(--bs-primary) !important;
}

.new_payment-method p [type="radio"]:checked,
.new_payment-method p [type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}
.new_payment-method p [type="radio"]:checked + label,
.new_payment-method p [type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 38px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #666;
  font-size: 14px;
}
.new_payment-method p [type="radio"]:checked + label:before,
.new_payment-method p [type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 19px;
  background-image: url(../../static/images-kartmax/prepaid.png);
}
.new_payment-method.active p [type="radio"]:checked + label:after,
/* .new_payment-method.active p [type="radio"]:not(:checked) + label:after {
  content: "";
  width: 12px;
  height: 12px;
  background: var(--bs-primary);
  position: absolute;
  top: 3px;
  left: 3px;
  background-image: '../../static/images-kartmax/prepaid.png';

}  */
.new_payment-method p [type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
.new_payment-method.active p [type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.new_payment-method.active p [type="radio"]:not(:checked) + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.payment-mode {
  font-size: 16px;
  color: #333;
  text-transform: uppercase;
  margin-bottom: 15px;
}
.w-60 {
  width: 60%;
}

.text-cod {
  position: relative;
  padding-left: 26px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #666;
  font-size: 14px;
}
.f-21 {
  font-size: 21px;
}
  .mobile-color {
  background-color: #f0f0f0;
}
@media screen and (max-width: 767px) {
  .payment-mode {
  font-size: 14px;
  }
  .checkout-section {
    margin-top: 70px;
    width: 100%;
    max-width: 100%;
    padding: 0 4%;
    z-index: 0;
  }
  .login-height {
    min-height: auto;
  }
  .mobile-color {
    margin-top: 10px;
    background-color: #f0f0f0;
  }
  .payment-method-section {
    max-width: 100%;
  }

  .fix_bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #ffffff;
    padding: 15px 10px;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .fix_bottom button {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
  }
}
.address-box {
  max-width: 600px;
  margin: 10px auto !important;
  width: 100%;
}
.shipping-address-item {
  padding: 17px 19px;
}
.edit_link {
  bottom: 10px;
  right: 10px;
}
.method-info{
  padding-left: 18px;
    font-size: 14px;
}
</style>
