<template>
  <div class="container-fluid" :class="{ 'p-0' : from == 'payment' }">
      <!-- add address box list -->
        <div class="address-box p-0 " v-if="from   == 'payment' ">
          <!-- add address box list -->
          <div
            class="shipping-address-items position-relative my-2"
            v-if="this.$store.state.list.maddress !== ''"
          >
            <div
              class="
                border
                position-relative
                w-100
                shipping-address-item
                round-2
                mb-2
              "
            >
              <div class="">
                <b>{{ capitalizeFirstLetter(this.$store.state.list.maddress.full_name) }} </b> <br />
                <p class="m-0">
                  {{
                  capitalizeFirstLetter(this.$store.state.list.maddress.street_address)
                }}, {{ capitalizeFirstLetter(this.$store.state.list.maddress.area) }}, {{ this.$store.state.list.maddress.city }}, {{ this.$store.state.list.maddress.state_name }}
                {{ this.$store.state.list.maddress.pin_code }}
                </p>
                <p class="my-1"
                  >Mobile Number: {{ this.$store.state.list.maddress.phone }}</p >
              </div>
              <button
                href="#" type="button"
                @click.prevent="
                  edit_address_address(
                   $store.state.list.maddress.id,
                   $store.state.list.maddress.full_name,
                   $store.state.list.maddress.street_address,
                   $store.state.list.maddress.area,
                   $store.state.list.maddress.city,
                   $store.state.list.maddress.state,
                   $store.state.list.maddress.pin_code,
                   $store.state.list.maddress.phone,
                   $store.state.list.maddress.address_type,
                   $store.state.list.maddress.default
                  )
                "
                class="
                  text-decoration-none text-primary
                  edit_link w-10
                  position-absolute
                "
                >EDIT</button>
            </div>
          </div>
        </div>
          <!-- add address box list end -->
    <div class="row mb-0" v-if="from !== 'payment' ">
        
      <div class="col-md-7 col-12 login-height pr-0 pl-0 checkout-section " >
        <CheckoutHeader />
        <div class="address-box">
          <!-- add address box list -->
          <h3  class="section-title ">Shipping Address</h3>
          <div
            class="shipping-address-items position-relative"
            :class="{ hide: address_show_hide === false }"
            v-if="displayNewAddress === false"
          >
            <div
              class="
                border
                mb-3
                position-relative
                w-100
                shipping-address-item
                round-2
              "
              v-for="(items, index) in $store.state.list.address"
              v-bind:class="{ selected: select_address_index === index }"
              :key="`shipping-address${index}`"
            >
              <div class="">
                {{ capitalizeFirstLetter(items.full_name) }}, <a> {{ items.phone }}</a> <br />{{
                  capitalizeFirstLetter(items.street_address)
                }}, {{ capitalizeFirstLetter(items.area) }}, {{ items.city }}, {{ items.state_name }}
                {{ items.pin_code }}
                <span v-if="items.address_type"
                  ><br />Address Type - {{ items.address_type }}</span
                >
              </div>
              <button
                type="button"
                @click="select_address(index, items.id)"
                class="btn btn-outline-primary kartmax-text-f-14  br-0 ship-bg"
                :address_id="items.id"
              >
                <span>SHIP HERE</span>
              </button>
              <button
                href="#"
                type="button"
                @click.prevent="
                  edit_address_address(
                    items.id,
                    items.full_name,
                    items.street_address,
                    items.area,
                    items.city,
                    items.state,
                    items.pin_code,
                    items.phone,
                    items.address_type,
                    items.default
                  )
                "
                class="
                  text-decoration-none text-primary
                  edit_link w-10 d-block
                  position-absolute
                "
                >EDIT</button>
            </div>
          </div>
          <div v-if="displayNewAddress === false">
            <button
              type="button"
              v-if="
                address_show_hide === true &&
                $store.state.list.address.length > 2
              "
              class="btn btn-outline-primary border w-100 my-1 btn_padding"
              @click="hide_all_address()"
            >
              <span>Hide Address</span>
            </button>
            <button
              type="button"
              v-if="
                address_show_hide === false &&
                $store.state.list.address.length > 2
              "
              class="btn btn-outline-primary border w-100 my-1 btn_padding"
              @click="show_all_address()"
            >
              <span>View All Addresses</span>
            </button>
          </div>
          <!-- add address box list end -->
          <div
            class="new-address-form"
            v-if="
              displayNewAddress === true ||
              $store.state.list.address.length === 0
            "
          >
            <form>
              <div class="mb-2">
                <input
                  placeholder="Name*"
                  autocomplete="off"
                  type="text"
                  v-model="user.name"
                  @keyup="user_name"
                  name="full_name"
                  required="required"
                  class="input-text form-control"
                />
                <span
                  class="text-danger kartmax-text-f-12"
                  v-text="name_error"
                ></span>
              </div>

              <div class="mb-2">
                <input
                  placeholder="Street Address*"
                  autocomplete="off"
                  v-model="user.address"
                  @keyup="user_address"
                  type="text"
                  name="street_address"
                  required="required"
                  class="input-text form-control"
                />
                <span
                  class="text-danger kartmax-text-f-12"
                  v-text="address_error"
                ></span>
              </div>

              <div class="mb-2">
                <input
                  type="text"
                  placeholder="PIN Code*"
                  autocomplete="off"
                  name="pin_code"
                  @keyup="user_pin_code"
                  v-model="user.pin_code"
                  id="postcode"
                  maxlength="6"
                  required="required"
                  class="input-text form-control"
                />
                <span
                  class="text-danger kartmax-text-f-12"
                  v-text="pin_code_error"
                ></span>
                <span
                  class="size_success my-1 text-success kartmax-text-f-12"
                  v-html="pin_code_success"
                ></span>
              </div>
                <div class="mb-2">
                <input
                  class="input-text form-control"
                  type="text"
                  placeholder="LANDMARK"
                  autocomplete="off"
                  v-model="user.landmark"
                  name="landmark"
                  id="landmark"
                />
              </div>
              <div class="mb-2">
                
                <select
                  class="input-text form-control apperence"
                  v-model="user.areaselect" @change="user_area"
                >
                  <option disabled value="" selected>Please select Area</option>
                  <option
                    v-for="area in user.area"
                    :key="`fieldArea-${area}`"
                  >
                  <option :value="key" v-for="(ar,key) in area" :key="ar"> {{key}}</option>

                  </option>
                </select>
                <span
                  class="text-danger kartmax-text-f-12"
                  v-text="area_error"
                ></span>
              </div>
            
              <div class="mb-2">
                <select
                  class="input-text form-control apperence"
                  v-model="user.cityselect" @change="user_city"
                >
                  <option disabled value="" selected>Please select City</option>
                  <option
                    v-for="city in user.city"
                    :value="user.city[city]"
                    :key="`field-city-${city}`"
                  >
                    {{ user.city[city] }}
                  </option>
                </select>
                <span
                  class="text-danger kartmax-text-f-12"
                  v-text="city_error"
                ></span>
              </div>
              <div class="mb-2">
                <input
                  class="input-text form-control"
                  type="text"
                  placeholder="State*"
                  autocomplete="off"
                  v-model="user.state"
                  name="state"
                  id="state"
                  required=""
                  disabled
                />
              </div>
              
              <div class="mb-2">
                <input
                  maxlength="10"
                  placeholder="Receiver Phone Number*"
                  autocomplete="off"
                  type="text"
                  name="phone"
                  @keyup="user_phone"
                  v-model="user.phone"
                  required="required"
                  class="input-text form-control"
                />
                <span
                  class="text-danger kartmax-text-f-12"
                  v-text="phone_error"
                ></span>
              </div>

              <!-- <div v-if="!$store.state.list.address.length"> -->
              <div class="mb-2">
                <input
                  class="input-text form-control"
                  type="email"
                  placeholder="Email"
                  autocomplete="off"
                  @keyup="user_email"
                  v-model="user.email"
                  name="Email"
                  required=""
                />
                <span
                  class="text-danger kartmax-text-f-12"
                  v-text="email_error"
                ></span>
              </div>
              <div class="mb-2 addressType">
                <label class="mb-1">Select Address Type</label>
                <div class="row">
                  <div class="col-6">
                    <label for="home" class="float-left pr-4 me-2"
                      ><input
                        type="radio"
                        @change="address_type_change($event)"
                        id="home"
                        name="Type"
                        value="home"
                        checked
                      />
                      Home
                    </label>
                    
                  </div>
                  <div class="col-6">
                    <label for="office" class="float-left"
                      ><input
                        type="radio"
                        @change="address_type_change($event)"
                        id="office"
                        name="Type"
                        value="office"
                      />
                      Office
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <label class="mt-2 d-flex">
                      <input
                        type="checkbox"
                        :checked="termscondition"
                        class="mt-1"
                      />
                      <p class="text-dark m-0 ms-1">
                        I consent to receive promotional SMS, emails, and other
                        communications
                      </p>
                    </label>
                    <!-- <p
                      v-if="!termscondition"
                      class="text-danger kartmax-text-f-12"
                    >
                      <small>Please accept the Terms & Condition.</small>
                    </p> -->
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <div class="d-flex justify-content-between action-btn  " >
                  <button
                    @click="customer_select_new_address()"
                    class="btn btn-outline-dark me-2 backbtn btn-Height" 
                    v-if="$store.state.list.address.length != 0"
                  >
                    <i class="fas fa-arrow-left"></i>
                  </button>
                  <button
                    v-if="termscondition"
                    type="button"
                    @click="new_address()"
                    id="new_address"
                    class="btn btn-primary btn-Height  contnubtn"
                  >
                    <span>Continue</span>
                  </button>
                  <button
                    disabled
                    style="cursor: not-allowed"
                    class="btn btn-primary btn-Height border-0 contnubtn"
                    v-if="!termscondition"
                    type="button"
                    @click="new_address()"
                    id="new_address"
                  >
                    <span>Continue</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <template v-if="$store.state.list.address.length != 0">
            <button
              type="button"
              class="btn btn-outline-primary border w-100 my-1 btn_padding"
              @click="customer_select_new_address()"
              v-if="displayNewAddress === false"
            >
              <i class="fa fa-plus me-1"></i>
              <span>Add New Address</span>
            </button>

            <div
              class="mt-2 d-flex justify-content-between address_btn action-btn"
              v-if="displayNewAddress === false"
            >
              <nuxt-link to="/cart" class="btn btn-outline-dark btn-Height line-hright ">
                <i class="fas fa-arrow-left"></i>
              </nuxt-link>
              <button
                type="button"
                class="btn btn-primary btn-Height "
                id="new_address"
                @click="old_address()"
              >
                NEXT
              </button>
            </div>
          </template>
        </div>
      </div>
      <div class="col-md-5 col-12 mobile-color"  >
        <OrderSummary />
      </div>
    </div>

    <!-- edit address start here  -->
    <div
      id="coupon-modal"
      class="modal"
      v-bind:class="[this.address_popup ? '' : 'd-block']"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title font-bold">Edit Address</h4>
            <button type="button" class="btn btn-circle" @click="close_popup()">
              ×
            </button>
          </div>
          <div class="modal-body">
            <form class="opc-section">
              <div
                class="field full-name mb-2"
                v-bind:class="{
                  success: this.name_error == '',
                  error: this.name_error != '',
                }"
              >
                <input
                  class="input-text form-control"
                  v-model="edit.name"
                  placeholder="Full Name"
                  autocomplete="off"
                  @keyup="edit_name"
                  type="text"
                  name="full_name"
                  required=""
                />
                <span class="size_error" v-text="this.name_error"></span>
              </div>
              <div
                class="field street-address mb-2"
                v-bind:class="{
                  success: this.address_error == '',
                  error: this.address_error != '',
                }"
              >
                <input
                  class="input-text form-control"
                  v-model="edit.address"
                  placeholder="Street Address"
                  autocomplete="off"
                  @keyup="edit_address"
                  type="text"
                  name="street_address"
                  required=""
                />
                <span class="size_error" v-text="this.address_error"></span>
              </div>
              <div
                class="field pin-code mb-2"
                v-bind:class="{
                  success: this.pin_code_error == '',
                  error: this.pin_code_error != '',
                }"
              >
                <input
                  class="input-text form-control"
                  type="text"
                  autocomplete="off"
                  placeholder="PIN Code"
                  @keyup="edit_pin_code"
                  v-model="edit.pin_code"
                  name="pin_code"
                  id="postcode"
                  maxlength="6"
                  required=""
                />
                <span class="size_error" v-text="this.pin_code_error"></span>
              </div>
           
              <div
                class="field area mb-2"
                v-bind:class="{
                  success: this.area_error == '' & this.edit.areaselect != '',
                  error: this.area_error != '',
                }"
              >
                <select
                  class="input-text form-control"
                  v-model="edit.areaselect"
                >
                  <option disabled value="" selected>Please select Area</option>
                  <option
                    v-for="(area) in edit.area"
                    :key="`area-f-${area}`"
                  >
                  <option :value="key" v-for="(ar,key) in area" :key="ar"> {{key}}</option>
                   
                  </option>
                </select>
                <span class="size_error" v-text="this.area_error"></span>
              </div>
           
              <div
                class="field city mb-2"
                v-bind:class="{
                  success: this.city_error == '' && this.edit.cityselect != '',
                  error: this.city_error != '',
                }"
              >
                <select
                  class="input-text form-control"
                  v-model="edit.cityselect"
                >
                  <option disabled value="" selected>Please select City</option>
                  <option
                    v-for="city in edit.city"
                    :value="edit.city[city]"
                    :key="`city-f${city}`"
                  >
                    {{ edit.city[city] }}
                  </option>
                </select>
                <span class="size_error" v-text="this.city_error"></span>
              </div>
              <div
                class="field state mb-2"
                v-bind:class="{
                  success: this.state_error == '',
                  error: this.state_error != '',
                }"
              >
                <input
                  class="input-text form-control"
                  type="text"
                  placeholder="State"
                  autocomplete="off"
                  v-model="edit.state"
                  name="state"
                  id="state"
                  required=""
                  disabled
                />
              </div>
              <div
                class="field receiver-phone mb-2"
                v-bind:class="{
                  success: this.phone_error == '',
                  error: this.phone_error != '',
                }"
              >
                <input
                  class="input-text form-control"
                  maxlength="10"
                  placeholder="Mobile Number"
                  autocomplete="off"
                  @keyup="edit_phone"
                  v-model="edit.phone"
                  type="text"
                  name="phone"
                  required=""
                />
                <span class="size_error" v-text="this.phone_error"></span>
              </div>
              <div class="field address_type_container mb-2 addressType">
                <label>Select Address Type</label>
                <div class="row">
                  <div class="col-6">
                    <label for="home"
                      ><input
                        type="radio"
                        @change="edit_address_type_change($event)"
                        id="home"
                        name="Type"
                        value="home"
                        :checked="edit.address_type == 'home'"
                      />
                      Home</label
                    >
                  </div>
                  <div class="col-6">
                    <label for="office"
                      ><input
                        type="radio"
                        @change="edit_address_type_change($event)"
                        id="office"
                        name="Type"
                        value="office"
                        :checked="edit.address_type == 'office'"
                      />Office</label
                    >
                  </div>
                </div>
              </div>
              <div class="field submit">
                <button
                  type="button"
                  @click="update_address"
                  class="btn btn-primary"
                >
                  <span>Update Address </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- edit address end here  -->
  </div>
</template>

<script>
import axios from "axios";
import OrderSummary from "./order-summary.vue";
import CheckoutHeader from "./checkout-header.vue";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import  {modifyMixin} from "../../mixin.js"

export default {
  mixins:[modifyMixin],
  layout: "checkoutPage",
  props: ["from"],

  components: {
    OrderSummary,
    CheckoutHeader,
  },
  data() {
    return {
      termscondition: true,
      address_show_hide: false,
      select_address_index: 0,
      address_popup: true,
      address_error: "",
      name_error: "",
      pin_code_error: "",
      pin_code_success: "",
      city_error: "",
      area_error: "",
      state_error: "",
      phone_error: "",
      email_error: "",
      user: {
        name: "",
        address: "",
        pin_code: "",
        city: "",
        cityselect: "",
        area: "",
        areaselect: "",
        state: "",
        phone: "",
        email: "",
        address_type: "home",
        landmark:""
      },

      displayNewAddress: false,
      edit: {
        address_id: "",
        name: "",
        address: "",
        pin_code: "",
        area: "",
        areaselect: "",
        city: "",
        cityselect: "",
        state: "",
        phone: "",
        address_type: "",
        default: "",
      },
      mloyal_point: 0,
      mloyal_amount: 0,
      gateway_discount: 0,
      net_amount: 0,
    };
  },
  methods: {
    close_popup: function () {
      this.address_popup = true;
    },
    show_all_address() {
      this.address_show_hide = true;
    },
    hide_all_address() {
      this.address_show_hide = false;
      window.scrollTo(0, 0);
    },
    // onChecked() {
    //   this.termscondition = !this.termscondition;
    // },
    user_name: function () {
      var name = /^(?!\s*$).+/;
      if (this.user.name.match(name)) {
        this.name_error = "";
      } else {
        this.name_error = "Please enter valid Name";
      }
    },
    new_address: function () {
      if (
        this.user.name != "" &&
        this.user.address != "" &&
        this.user.pin_code != "" &&
        this.user.cityselect != "" &&
        this.user.areaselect != "" &&
        this.user.state != "" &&
        this.user.phone != "" &&
        this.name_error == "" &&
        this.address_error == "" &&
        this.pin_code_error == "" &&
        this.city_error == "" &&
        this.area_error == "" &&
        this.state_error == "" &&
        this.phone_error == "" &&
     
        (this.$store.state.list.address.length ||
          (this.user.email != "" && this.email_error == ""))
      ) {
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append("cart_id", this.$store.state.list.cart_id);
        form.append("cart_session", this.$store.state.list.cart_session);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        form.append("full_name", this.user.name);
        form.append("street_address", this.user.address);
        form.append("pin_code", this.user.pin_code);
        form.append("area", this.user.areaselect);
        form.append("city", this.user.cityselect);
        form.append("state_name", this.user.state);
        form.append("phone", this.user.phone);
        // form.append("promotion_consent", this.termscondition);
        form.append("email", this.user.email);
        form.append("landmark", this.user.landmark);


        form.append("address_type", this.user.address_type);
        let config = { headers: { "Content-Type": "multipart/form-data" } };
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/add-address",
            form,
            config
          )
          .then((response) => {
            if (response.data.success === true) {
              this.$store.state.list.address_id = response.data.data.id;
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              if (response.data.data.customer.cod_block == "0") {
                this.cus_cod_hide = true;
              } else {
                this.cus_cod_hide = false;
              }
              this.$store.state.list.error_message = "";
              this.$store.state.list.page_loader = false;
              if (this.$route.query.sku) {
                this.get_account();
              }
              this.$router.push("/checkout/payment");
              // this.$router.push({
              //  query: {
              //     step: "payment",
              //     gc: this.$route.query.gc ? this.$route.query.gc : 0,
              //   },
              // });
              // this.page_type = "payment";
              // this.displayCheckout = true;

              // this.back_page_type = "new_address_page";
              window.scrollTo(0, 0);
              this.$store.state.list.page_loader = false;
              this.$store.state.list.address = response.data.data.address;
              this.$store.state.list.cart_product = response.data.data.products;
              this.$store.state.list.capillaryAmount =
                response.data.data.capillary_amount;
              this.net_amount = response.data.data.net_amount;
              this.mloyal_point = response.data.data.mloyal_point;
              this.mloyal_amount = response.data.data.mloyal_amount;
              this.gateway_discount = response.data.data.discount_gateway;
              // this.cart_points_check();
            } else {
              this.$store.state.list.success_message = "";
              this.$store.state.list.page_loader = false;
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
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
      } else {
        this.user_name();
        this.user_phone();
        this.user_pin_code();
        // this.user_address();
        this.user_city();
        this.user_email();
        this.user_area();
        
      }
    },
    user_city: function () {
      var city = /^(?!\s*$).+/;
      if (this.user.cityselect.match(city)) {
        this.city_error = "";
      } else {
        this.city_error = "Please enter valid City";
      }
    },
    user_phone: function () {
      var phoneno = /^([0-9]{10,})+$/;
      if (this.user.phone.match(phoneno)) {
        this.phone_error = "";
      } else {
        this.phone_error = "Please enter valid Phone Number";
      }
    },
    user_pin_code: async function () {
      var pin_code = /^([0-9]{6,})+$/;
      if (this.user.pin_code == null) return;
      if (this.user.pin_code.match(pin_code)) {
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
        await axios
          .get(this.$store.state.list.cart_api_url+'/v1' + `/serviceable-pincode`, {
            params: {
              pincode: this.user.pin_code,
            },
          })
          .then((response) => {
            if (
              response.data.result == "" ||
              response.data.response.error == 1
            ) {
              this.pin_code_error = "Sorry this pincode is not serviceable.";
              window.scrollTo(0, 0);
              this.pin_code_success = "";
            } else {
              if (response.data.result.cod === "N") {
                //this.payment_method = 'payu';
                this.cod_hide = false;
                this.cod_msg =
                  "We are unable to offer Cash on delivery in the selected Pin code.";
              } else {
                //this.payment_method = 'cod';
                this.cod_hide = true;
                this.cod_msg = "";
              }
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_pin",
                this.user.pin_code
              );

              this.user.city = response.data.result.city;
              this.user.area = response.data.result.area;
              // this.user.areaselect = Object.keys(response.data.result.area)[0];
              // this.user.cityselect = Object.keys(response.data.result.city)[0];
              this.user.state = response.data.result.state;
              this.pin_code_success = response.data.result.delivery;
              this.pin_code_error = "";
              this.state_error = "";
              // this.user.area.splice(0, 0, 'Please select area');

              // if (response.data.result.city != "") {
              //   this.city_error = "";
              // }
              // if (response.data.result.area != "") {
              //   this.area_error = "";
              // }
            }
          })
          .catch((error) => {
            if (error.message === "Network Error") {
              this.$toast.error(
                "Oops there seems to be some Network issue, please try again.",
                {
                  position: "top-center",
                  duration: 4000,
                }
              );
            }
            this.pin_code_success = "";
          });
      } else {
        this.pin_code_error = "Please enter valid Pin code";
        this.pin_code_success = "";
      }
    },
    user_address: function () {
      var address = /^(?=.*[a-zA-Z]).{10,}$/;
      if (this.user.address.length < 10) {
        this.address_error = "Address should be minimum 10 characters";
      } else if (this.user.address.match(address)) {
        this.address_error = "";
      } else {
        this.address_error = "Please enter valid Address";
      }
    },
    user_area:function(){
      if(this.user.areaselect == ''){
          this.area_error = 'Please select area'
        }else{
          this.area_error = ''
        }
    },
    user_email: function () {
      var email =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (this.user.email.match(email)) {
        this.email_error = "";
      } else {
        this.email_error = "Please enter valid Email";
      }
    },
    customer_select_new_address: function () {
      this.displayNewAddress = !this.displayNewAddress;
      window.scrollTo(0, 0);
    },
    select_address: function (index, value) {
      this.select_address_index = index;
      this.$store.state.list.address_id = value;
    },
    address_type_change(event) {
      this.user.address_type = event.target.value;
    },
    edit_address_type_change(event) {
      this.edit.address_type = event.target.value;
    },
    async old_address() {
      this.$store.state.list.page_loader = true;
      for (let i = 0; i < this.$store.state.list.address.length; i++) {
        if (
          this.$store.state.list.address[i].id ===
          this.$store.state.list.address_id
        ) {
          this.$store.state.list.error_message = "";
          this.$store.state.list.success_message = "";

          await axios
            .get(this.$store.state.list.cart_api_url+'/v1' + `/serviceable-pincode`, {
              params: {
                pincode: this.$store.state.list.address[i].pin_code,
              },
            })
            .then(async (response) => {
              if (response.data.result === "") {
                this.$toast.error(
                  "Sorry, selected address in not serviceable. Please try with a different address.",
                  {
                    position: "top-center",
                    duration: 4000,
                  }
                );
                this.$store.state.list.page_loader = false;
              } else {
                if (
                  response.data.result.cod === "N" &&
                  response.data.result.prepaid === "N"
                ) {
                  this.$toast.error("Sorry this pincode is not serviceable.", {
                    position: "top-center",
                    duration: 4000,
                  });
                  this.$store.state.list.page_loader = false;
                  return;
                }
                if (response.data.result.cod === "N") {
                  //this.payment_method = 'payu';
                  this.cod_hide = false;
                  this.cod_msg =
                    "We are unable to offer Cash on delivery in the selected Pin code.";
                
                } else {
                  //this.payment_method = ''
                  this.cod_hide = true;
                  this.cod_msg = "";
                  //var form = new FormData();
                  //form.append("payment_method", "cod");
                  //let config = { headers: { 'Content-Type': 'multipart/form-data' } }
                  //axios.post(this.$store.state.list.cart_api_url+'/v1' + '/cart/switch-payment-method', form, config)
                  //.then(response => {
                  //if (response.data.success === true) {
                  //this.$store.state.list.cart_subtotal = response.data.data.order_subtotal;
                  //this.$store.state.list.cart_total = response.data.data.grand_total;
                  //this.cod_charges = response.data.data.cod_charge;
                  //}
                  //}).catch(error => {
                  //this.$store.state.list.page_loader = false;
                  //})
                }
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_pin",
                  this.$store.state.list.address[i].pin_code
                );
                this.user.pin_code = this.$store.state.list.address[i].pin_code;
                this.user_pin_code();
                this.$store.state.list.error_message = "";
                this.$store.state.list.success_message = "";
                var form = new FormData();
                
                this.$store.state.list.cart_id=$cookies.get(
                  window.location.hostname.substring(10, 4) + "_cart"
                );
                form.append("cart_id", this.$store.state.list.cart_id);
                form.append(
                  "cart_session",
                  this.$store.state.list.cart_session
                );
                form.append("address_id", this.$store.state.list.address_id);
                // form.append("promotion_consent", this.termscondition);
                let config = {
                  headers: { "Content-Type": "multipart/form-data" },
                };
                await axios
                  .post(
                    this.$store.state.list.cart_api_url+'/v1' +
                      "/customer/assign-address",
                    form,
                    config
                  )
                  .then((response) => {
                    if (response.data.success === true) {
                      if (response.data.data.customer.cod_block == "0") {
                        this.cus_cod_hide = true;
                      } else {
                        this.cus_cod_hide = false;
                      }
                      this.$router.push("/checkout/payment");
                      // this.$router.push({
                      //   query: {
                      //     step: "payment",
                      //     gc: this.$route.query.gc ? this.$route.query.gc : 0,
                      //   },
                      // });
                      // this.displayCheckout = true;
                      // this.page_type = "payment";
                      // this.back_page_type = "address";
                      window.scrollTo(0, 0);
                      this.$toast.success(response.data.message, {
                        position: "top-center",
                        duration: 4000,
                      });

                      this.net_amount = response.data.data.net_amount;
                      this.mloyal_point = response.data.data.mloyal_point;
                      this.mloyal_amount = response.data.data.mloyal_amount;
                      this.gateway_discount =
                        response.data.data.discount_gateway;
                      // this.cart_points_check();
                      this.$store.state.list.error_message = "";
                      this.$store.state.list.cart_product =
                        response.data.data.products;
                      this.$store.state.list.page_loader = false;
                      if(window.dataLayer !== undefined && window.dataLayer !== null && window.dataLayer !== ''){
                        window.dataLayer.push({
                          event: "checkout",
                          action: "Checkout",
                          ecommerce: {
                            checkout: {
                              actionField: {
                                step: 4,
                                option: "Address selected",
                              },
                              product: this.$store.state.list.gtm_product,
                            },
                          },
                        });
                      }
                    } else {
                      this.$toast.error(response.data.message, {
                        position: "top-center",
                        duration: 4000,
                      });
                      this.$store.state.list.success_message = "";
                      this.$store.state.list.page_loader = false;
                      if (
                        response.data.cart_session_status == false ||
                        response.data.customer_session_status == false
                      ) {
                        $cookies.set(
                          window.location.hostname.substring(10, 4) +
                            "_customer",
                          "",
                          "1y"
                        );
                        $cookies.set(
                          window.location.hostname.substring(10, 4) +
                            "_cus_sess",
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
                          window.location.hostname.substring(10, 4) +
                            "_ct_sess",
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
            })
            .catch((error) => {
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
      }
    },

    get_account: async function () {
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
        await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/account-details",
            form
          )
          .then((response) => {
            // if (response.data.data.promotion_consent == "Yes") {
            //   this.isConsent = false;
            // }
            if (response.data.success === true) {
              this.$store.state.list.page_loader = false;
              this.phone = response.data.data.phone;
              //this.get_transactions();
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
                //this.$router.push('/')
              }
            }
          })
          .catch((error) => {
            this.$store.state.list.page_loader = false;
            if (error.message === "Network Error") {
              this.$store.state.list.error_message = error.message;
            }
            window.scrollTo(0, 0);
          });
      }
    },
    edit_address_address: function (
      id,
      name,
      address,
      area,
      city,
      state,
      pin,
      phone,
      address_type,
      add_default
    ) {
      this.edit.address_id = id;
      this.edit.name = name;
      this.edit.address = address;
      this.edit.pin_code = pin;
      // this.edit.area = area
      this.edit.cityselect = city;
      // this.edit.city = city;
      this.edit.state = state;
      this.edit.phone = phone;
      this.edit.areaselect = area;
      if (address_type && address_type != "null") {
        this.edit.address_type = address_type;
      } else {
        this.edit.address_type = "home";
      }

      this.edit.default = add_default;
      this.address_popup = false;
      this.edit_name();
      this.edit_city();
      this.edit_address();
      this.edit_pin_code(false);
      this.edit_phone();
    },
    edit_name: function () {
      var name = /^(?!\s*$).+/;
      if (this.edit.name.match(name)) {
        this.name_error = "";
      } else {
        this.name_error = "Please enter valid Name";
      }
    },
    edit_city: function () {
      var city = /^(?!\s*$).+/;
      if (this.edit.cityselect.match(city)) {
        this.city_error = "";
      } else {
        this.city_error = "Please enter valid City";
      }
    },
    edit_area: function () {
      var area = /^(?!\s*$).+/;
      if (this.edit.area.match(area)) {
        this.area_error = "";
      } else {
        this.area_error = "Please enter valid Area";
      }
    },
    edit_address: function () {
      var address = /^(?=.*[a-zA-Z]).{10,}$/;
      if (this.edit.address.match(address)) {
        this.address_error = "";
      } else {
        if (this.edit.address.length < 10) {
          this.address_error = "Address should be minimum 10 characters";
        } else {
          this.address_error = "Please enter valid Address";
        }
      }
    },
    edit_email: function () {
      var email =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.edit.email.match("gmail")) {
        email = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
      }
      if (this.edit.email.match(email)) {
        this.email_error = "";
      } else {
        this.email_error = "Please enter valid Email";
      }
    },
    edit_pin_code: function (change = true) {
      var pin_code = /^([0-9]{6,})+$/;
      if (this.edit.pin_code.match(pin_code)) {
        axios
          .get(this.$store.state.list.cart_api_url+'/v1' + `/serviceable-pincode`, {
            params: {
              pincode: this.edit.pin_code,
            },
          })
          .then((response) => {
            if (response.data.result == "") {
              this.pin_code_error = "Sorry this pincode is not serviceable.";
            } else {
              this.edit.city = response.data.result.city;
              this.edit.area = response.data.result.area;
              
              if (change) {
                this.edit.cityselect = "";
                this.edit.areaselect = "";
                this.edit.areaselect = Object.keys(
                  response.data.result.area
                )[0];
                this.edit.cityselect = Object.keys(
                  response.data.result.city
                )[0];
              }

              this.edit.state = response.data.result.state;
              this.pin_code_error = "";
              this.state_error = "";
              if (response.data.result.city != "") {
                this.city_error = "";
              }
            }
          });
      } else {
        this.pin_code_error = "Please enter valid Pin code";
      }
    },
    edit_phone: function () {
      var phoneno = /^([0-9]{10,})+$/;
      if (this.edit.phone.match(phoneno)) {
        this.phone_error = "";
      } else {
        this.phone_error = "Please enter valid Phone Number";
      }
    },
    update_address: function () {
      if (
        this.edit.name != "" &&
        this.edit.address != "" &&
        this.edit.areaselect != "" &&
        this.edit.cityselect != "" &&
        this.edit.pin_code != "" &&
        this.edit.area != "" &&
        this.edit.city != "" &&
        this.edit.state != "" &&
        this.edit.phone != "" &&
        this.name_error == "" &&
        this.address_error == "" &&
        this.pin_code_error == "" &&
        this.city_error == "" &&
        this.area_error == "" &&
        this.state_error == "" &&
        this.phone_error == ""
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
        form.append("address_id", this.edit.address_id);
        form.append("full_name", this.edit.name);
        form.append("street_address", this.edit.address);
        form.append("pin_code", this.edit.pin_code);
        form.append("area", this.edit.areaselect);
        form.append("city", this.edit.cityselect);
        form.append("state_name", this.edit.state);
        form.append("phone", this.edit.phone);
        form.append("address_type", this.edit.address_type);
        form.append("default", this.edit.default);
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/edit-address",
            form
          )
          .then((response) => {
            if (response.data.success === true) {
              this.$store.state.list.address = response.data.data.address;
              this.$store.state.list.maddress =response.data.data.maddress;
              this.$store.state.list.error_message = "";
              this.$store.state.list.page_loader = false;
              this.address_popup = true;
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
            } else {
              this.$store.state.list.success_message = "";
              this.$store.state.list.page_loader = false;
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              if (response.data.customer_session_status == false) {
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
              this.$toast.error(
                "Oops there seems to be some Network issue, please try again.",
                {
                  position: "top-center",
                  duration: 4000,
                }
              );
            }
            window.scrollTo(0, 0);
          });
      }
    },
  },
  beforeMount(){
    window.addEventListener("message", (event) => {
  
      if(event.data.cart_id!==''&& event.data.cart_id!== undefined && event.data.cart_id!== null){
        this.$store.state.list.cart_product =event.data.products,
        this.$store.state.list.cart_id=event.data.cart_id,
        $cookies.set(window.location.hostname.substring(10, 4) + "_cart", event.data.cart_id);
        this.$store.state.list.summary.discountMRP=event.data.discount_amount,
        this.$store.state.list.discount_amount=event.data.discount_amount;
        this.$store.state.list.shiping_charges=event.data.shipping_charge;
        
        this.$store.state.list.store_credits_discount_amount=event.data.store_credits_discount_amount;
        this.$store.state.list.cod_charges=event.data.cod_charges;
        this.$store.state.list.cart_total=event.data.cart_total;
        // this.$store.state.list.cart_session =event.data.cart_session
      }

    }, false);
  },
};
</script>

<style scoped>
.address-box {
  max-width: 600px;
  margin: 10px auto !important;
  width: 100%;
}
.login-height {
  min-height: 550px;
}
.address-box .section-title {
    font-size: 16px;
    color: #333;
    text-transform: uppercase;
    margin-bottom: 15px;
    letter-spacing: 0.5px;
}
.shipping-address-items.hide {
  max-height: 282px;
  overflow: hidden;
  font-size: 14px;
}
.shipping-address-item.selected:after {
  color: #fff;
  font-family: "Font Awesome 5 Free";
  font-weight: 700;
  content: "\f00c" !important;
  height: 27px;
  width: 29px;
  font-size: 18px;
  line-height: 21px;
  padding-top: 2px;
  position: absolute;
  left: 0;
  text-align: center;
  top: 0;
}
.shipping-address-item.selected {
  padding: 29px 35px;
      background: #f8f8f8;
}

.shipping-address-item.selected:before {
  content: "";
  display: block !important;
  height: 60px;
  width: 60px;
  transform: rotate(45deg);
  left: -30px;
  top: -30px;
  position: absolute;
  background: var(--bs-primary);
}
.shipping-address-item.selected button {
 
  display: none;
}
.address_type_container input {
  position: relative;
  top: 2px;
  margin-right: 5px;
}
.shipping-address-section .new-address-btn {
  width: 100%;
  padding: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px #eee;
  border: 1px solid #ddd;
  border-radius: 2px;
  border-color: #ddd;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  margin-top: 5px;
}
.shipping-address-item {
  box-shadow: 0px 0px 4px #eee;
  padding: 15px;
  overflow: hidden;
  float: left;
  font-size: 14px;
}
.edit_link {
  bottom: 14px;
  right: 14px;
      padding: 4px 10px;
}
.apperence {
  appearance: auto;
}
.checkout-section {
  margin-top: 80px;
  padding: 20px 80px;
      z-index: 0;
}

.br-0{
  border-radius: 0;
}
.ship-bg{
 background: #d8d8d8;
 border:0;
 color:black;
 margin-top: 20px ;
}
.w-10{
    border: 1px solid;
    width: 10%;
    background: white;
    border-radius: 4px;
}
.btn_padding {
  padding: 10px;
}


.btn-Height {
  padding: 0 30px;
  height: 50px;
}
.btn-Height.line-hright {
line-height: 45px;
}
.new-address-form  .input-text {
    width: 100%;
    padding: 5px 9px;
    height: 45px;
    font-size: 14px;
    border: 1px solid #c2c2c2;
    outline: none;
    box-shadow: none;
    color: #495057;
}
.addressType label {
    font-size: 14px;
    color: #000;
    display: block;
    width: 100%;
    margin-bottom: 5px;
}
  .mobile-color {
  background-color: #f0f0f0;
}
@media screen and (max-width: 767px)  {
  .shipping-address-items.position-relative{
      margin-bottom: 15px !important;
  }
   .checkout-section {
    margin-top: 70px;
    width: 100%;
    max-width: 100%;
    padding: 0 4%;
        z-index: 0;
}
  .mobile-color {
  background-color: #f0f0f0;
}
  .login-height {
  min-height: auto;
} 
.action-btn{
  width: 100%;
    position: fixed;
    bottom: 0;
    background: #ffffff;
    padding: 15px 10px;
    left: 0;
    right: 0;
    
}
.action-btn a ,
.action-btn .backbtn {
  width: 12%;

    padding-top: 10px;
    padding-bottom: 10px;

}
.action-btn button ,
.action-btn .contnubtn
{
  width: 85%;

    padding-top: 10px;
    padding-bottom: 10px;

}

.address-box {
  max-width: 100%;
  padding: 0 4%;
}
.btn-Height.line-hright  {
  line-height: normal;
      padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

}

</style>
