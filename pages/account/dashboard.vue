<template>
  <div>
    <div class="container-fluid  pt-5 ">
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

        <!-- there be a sidebar component  -->

        <div class="col-md-3">
          <Sidebar logout='true' :returnShow='returnShow' :exchangeShow="exchangeShow"  :creditShow="creditShow"/>
        </div>

        <div class="col-md-9">
          <div class="row">
            <div class="col-md-12">
              <h5
                class=" border-bottom py-2 kartmax-text-f-16 form-inline  text-capitalize "
              >
                Contact Information
                <a
                  href="#"
                  class="d-inline-block ms-1 text-primary kartmax-text-f-14 "
                  @click.prevent="edit_contact"
                  >Edit</a
                >
              </h5>
              <div>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.customer_name_show"
                ></p>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.customer_email_show"
                ></p>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.customer_phone_show"
                ></p>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.customer_dob_show"
                ></p>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.customer_gender_show"
                ></p>
              </div>
            </div>
            <div class="col-md-12">
              
              <h5
                class="  border-bottom py-2 kartmax-text-f-16 form-inline  text-capitalize  "
              >
                Default Shipping Address
                <a
                  href="#"
                  v-if="shipping_address.name != ''"
                  class="d-inline-block ms-1 text-primary kartmax-text-f-14"
                  @click.prevent="
                    edit_address(
                      shipping_address.address_id,
                      shipping_address.name,
                      shipping_address.address,
                      shipping_address.area,
                      shipping_address.city,
                      shipping_address.state,
                      shipping_address.pincode,
                      shipping_address.phone,
                      shipping_address.default
                    )
                  "
                  >Edit</a
                >
                <!-- <router-link :to="{name:'address_book'}" class="text-info kartmax-text-f-14">Manage Addresses</router-link> -->
              </h5>
              <div v-if="shipping_address.name != ''">
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.shipping_address.name"
                ></p>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.shipping_address.area"
                ></p>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.shipping_address.city"
                ></p>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="
                    this.shipping_address.address +
                      ', ' +
                      this.shipping_address.state +
                      ', ' +
                      this.shipping_address.pincode
                  "
                ></p>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.shipping_address.email"
                ></p>
                <p
                  class="my-1 kartmax-text-f-14"
                  v-text="this.shipping_address.phone"
                ></p>
              </div>
              <div v-else>
                <p>No Address Found.</p>
              </div>
            </div>

            <!-- order list code start here  -->
              <!-- <div class="col-md-12">
              <h5
                class="border-bottom py-2 kartmax-text-f-16 form-inline  text-capitalize "
              >
                Recent Orders
                <nuxt-link
                  :to="{ path: '/account/orders' }"
                  class="d-inline-block ms-1 text-primary kartmax-text-f-14 "
                  >View All</nuxt-link
                >
              </h5>
              <div class="">
                <table class="table order-table responsive-table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date</th>
                      <th>Ship To</th>
                      <th class="text-end">Order Total</th>
                      <th class="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(items, index) in order"
                      v-if="index <= 5"
                      :key="index"
                    >
                      <td class="order">
                        <nuxt-link
                          class="kartmax-text-f-14"
                          :to="{
                            path: '/account/order-detail',
                            params: { id: items.order_quote_id },
                            query: { id: items.order_quote_id }
                          }"
                          >{{ items.order_increment_id }}</nuxt-link
                        >
                      </td>
                      <td
                        v-text="items.order_date"
                        class="order-date kartmax-text-f-14"
                      ></td>
                      <td
                        v-text="items.shipping_name"
                        class="name kartmax-text-f-14"
                      ></td>
                      <td
                        v-text="'Rs. ' + items.grand_total"
                        class="total text-end kartmax-text-f-14"
                      ></td>
                      <td class="action text-end ">
                        <button
                          class="order-with-cod btn-sm"
                          v-if="items.showCOD == 1"
                          @click="order_with_cod(items.order_quote_id)"
                        >
                          Reorder with <span>CASH ON DELIVERY</span>
                        </button>
                        
                        <a
                          href="#"
                          v-show="items.item_status == 'km_order_confirmed' || items.item_status == 'KM_ORDER_CONFIRMED'  && items.is_cancelled == 0"
                          @click.prevent="
                            order_cancel(items.order_increment_id,items)
                          "
                          class="btn btn-danger btn-sm"
                          >Cancel</a
                        >
                        <nuxt-link
                          class="btn btn-primary btn-sm"
                          :to="{
                            path: '/account/order-detail',
                            params: { id: items.order_quote_id },
                            query: { id: items.order_quote_id }
                          }"
                          >View & Track</nuxt-link
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> -->
            <!-- order list code end here  -->

            <!-- address book code start here  -->

            <div class="col-md-12">
              <h5
                class="
                  border-bottom
                  py-2
                  kartmax-text-f-16
                  form-inline
                  text-capitalize
                "
              >
                Additional Address Entries
              </h5>
              <div class="content-box">
                <div class="row">
                  <div
                    class="col-md-4 col-sm-6 col-xs-12"
                    v-for="(items, index) in address" :key="items.id"
                  >
                    <div
                      class="
                        shipping-address-item
                        my-2
                        rounded-3
                        py-2
                        px-3
                        border
                      "
                    >
                      <div class="address">
                        <span
                          class="fw-bold kartmax-text-f-14"
                          v-text="items.full_name"
                        ></span>
                        <br />
                        <span
                          class="kartmax-text-f-14"
                          v-text="capitalizeFirstLetter(items.area)"
                        ></span>
                        <br />
                        <span
                          class="kartmax-text-f-14"
                          v-text="capitalizeFirstLetter(items.city)"
                        ></span>
                        <br /><span v-text="items.street_address"></span>,
                        <span
                          class="kartmax-text-f-14"
                          v-text="capitalizeFirstLetter(items.state)"
                        ></span
                        >,
                        <span
                          class="kartmax-text-f-14"
                          v-text="items.pin_code"
                        ></span
                        ><br />
                        <span
                          class="kartmax-text-f-14"
                          v-text="'Mobile: ' + items.phone"
                        ></span>
                      </div>
                      <a
                        href="#"
                        class="fa fa-edit text-primary"
                        @click.prevent="
                          edit_address(
                            items.id,
                            items.full_name,
                            items.street_address,
                            items.area,
                            items.city,
                            items.state,
                            items.pin_code,
                            items.phone,
                            items.default,
                            items.landmark
                          )
                        "
                      ></a>
                      <a
                        href="#"
                        v-if="index != 0"
                        class="fa fa-trash ms-2 text-danger"
                        @click.prevent="remove_address(index, items.id)"
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <!-- address code end here  -->
          </div>
        </div>
      </div>
      <div
        id="coupon-modal"
        class="modal"
        v-bind:class="[this.address_popup ? '' : 'd-block']"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title font-bold">Edit Address</h4>
              <button
                type="button"
                class="border-0 bg-light"
                @click="close_popup()"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <div
                class="kartmax-text-f-13 text-danger"
                v-text="this.$store.state.list.error_message"
                v-if="this.$store.state.list.error_message != ''"
              ></div>

              <form class="new-address-form opc-section">
                <div
                  class="field full-name"
                  v-bind:class="{
                    success: this.name_error == '',
                    error: this.name_error != ''
                  }"
                >
                  <label class="label"><span>Full Name</span></label>
                  <input
                    class="input-text form-control"
                    v-model="user.name"
                    autocomplete="off"
                    @keyup="user_name"
                    type="text"
                    name="full_name"
                    required=""
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.name_error"
                  ></p>
                </div>
                <div
                  class="field street-address"
                  v-bind:class="{
                    success: this.address_error == '',
                    error: this.address_error != ''
                  }"
                >
                  <label class="label"><span>Street Address</span></label>
                  <input
                    class="input-text form-control"
                    v-model="user.address"
                    autocomplete="off"
                    @keyup="user_address"
                    type="text"
                    name="street_address"
                    required=""
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.address_error"
                  ></p>
                </div>
                <div
                  class="field pin-code"
                  v-bind:class="{
                    success: this.pin_code_error == '',
                    error: this.pin_code_error != ''
                  }"
                >
                  <label class="label"><span>PIN Code</span></label>
                  <input
                    class="input-text form-control"
                    type="text"
                    autocomplete="off"
                    @keyup="user_pin_code"
                    v-model="user.pin_code"
                    name="pin_code"
                    id="postcode"
                    maxlength="6"
                    required=""
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.pin_code_error"
                  ></p>
                </div>
                <div
                  class="field area"
                  v-bind:class="{
                    success: this.area_error == '',
                    error: this.area_error != ''
                  }"
                >
                  <label class="label"><span>Area</span></label>
                  <select
                    class="input-text form-control"
                    v-model="user.areaselect"
                  >
                  <option disabled value="" selected>Please select Area</option>
                  <option
                    v-for="area in user.area"
                    :key="`fieldArea-${area}`"
                  >
                  <option :value="key" v-for="(ar,key) in area" :key="ar"> {{key}}</option>

                  </option>
                  </select>
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.area_error"
                  ></p>
                </div>
                <div
                  class="field city"
                  v-bind:class="{
                    success:
                      this.city_error == '' && this.user.cityselect != '',
                    error: this.city_error != ''
                  }"
                >
                  <label class="label"><span>City</span></label>
                  <select
                    class="input-text form-control"
                    v-model="user.cityselect"
                  >
                    <option disabled value="" selected
                      >Please select City</option
                    >
                    <option
                      v-for="city in user.city"
                      :value="user.city[city]"
                      >{{ user.city[city] }}</option
                    >
                  </select>
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.city_error"
                  ></p>
                </div>
                <div
                  class="field state"
                  v-bind:class="{
                    success: this.state_error == '',
                    error: this.state_error != ''
                  }"
                >
                  <label class="label"><span>State</span></label>
                  <input
                    class="input-text form-control"
                    type="text"
                    autocomplete="off"
                    v-model="user.state"
                    name="state"
                    id="state"
                    required=""
                    disabled
                  />
                </div>
                <div
                  class="field receiver-phone mt-2"
                  v-bind:class="{
                    success: this.phone_error == '',
                    error: this.phone_error != ''
                  }"
                >
                  <label class="label"
                    ><span>Receiver Phone Number</span></label
                  >
                  <input
                    class="input-text form-control"
                    maxlength="10"
                    autocomplete="off"
                    @keyup="user_phone"
                    v-model="user.phone"
                    type="text"
                    name="phone"
                    required=""
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.phone_error"
                  ></p>
                </div>
                <!-- <div
                  class="field dob"
                  v-bind:class="{
                    success: this.dob_error == '',
                    error: this.dob_error != ''
                  }"
                >
                  <label class="label"><span>Date of Birth</span></label>
                  <input
                    class="input-text form-control"
                    @change="cust_dob"
                    v-model="customer_dob"
                    type="date"
                    name="dob"
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.dob_error"
                  ></p>
                </div> -->
                <!-- <div
                  class="field gender"
                  v-bind:class="{
                    success: this.gender_error == '',
                    error: this.gender_error != ''
                  }"
                >
                  <label class="label"><span>Gender</span></label>
                  <select
                    class="input-text form-control"
                    v-model="customer_gender"
                    @change="cust_gender"
                  >
                    <option value="" selected>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.gender_error"
                  ></p>
                </div> -->
                <div class="field submit">
                  <button
                    type="button"
                    @click="update_address"
                    class="btn btn-primary"
                  >
                    Update Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal"
        id="coupon-modal"
        v-bind:class="[this.account_popup ? '' : 'd-block']"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title font-bold">Contact Information</h4>
              <button
                type="button"
                class="border-0 bg-light"
                @click="close_popup()"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <div
                class="text-danger kartmax-text-f-13"
                v-text="this.$store.state.list.error_message"
                v-if="this.$store.state.list.error_message != ''"
              ></div>

              <form class="new-address-form opc-section">
                <div
                  v-bind:class="{
                    success: this.name_error == '',
                    error: this.name_error != ''
                  }"
                >
                  <label class="label"><span>Full Name</span></label>
                  <input
                    class="input-text form-control"
                    v-model="customer_name"
                    autocomplete="off"
                    @keyup="cust_name"
                    type="text"
                    name="full_name"
                    required=""
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.name_error"
                  ></p>
                </div>
                <div
                  v-bind:class="{
                    success: this.email_error == '',
                    error: this.email_error != ''
                  }"
                >
                  <label class="label"><span>Email</span></label>
                  <input
                    class="input-text form-control"
                    type="email"
                    autocomplete="off"
                    @keyup="cust_email"
                    v-model="customer_email"
                    name="Email"
                    required=""
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.email_error"
                  ></p>
                </div>
                <div
                  v-bind:class="{
                    success: this.phone_error == '',
                    error: this.phone_error != ''
                  }"
                >
                  <label class="label mt-2"
                    ><span>Receiver Phone Number</span></label
                  >
                  <input
                    class="input-text form-control"
                    maxlength="10"
                    autocomplete="off"
                    @keyup="cust_phone"
                    v-model="customer_phone"
                    type="text"
                    name="phone"
                    required=""
                    disabled
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.phone_error"
                  ></p>
                </div>
                <!-- <div
                  v-bind:class="{
                    success: this.dob_error == '',
                    error: this.dob_error != ''
                  }"
                >
                  <label class="label"><span>Date of Birth</span></label>
                  <input
                    class="input-text form-control"
                    @change="cust_dob"
                    v-model="customer_dob"
                    type="date"
                    name="dob"
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.dob_error"
                  ></p>
                </div> -->
                <div
                  v-bind:class="{
                    success: this.gender_error == '',
                    error: this.gender_error != ''
                  }"
                >
                  <label class="label"><span>Gender</span></label>
                  <select
                    class="input-text form-control"
                    v-model="customer_gender"
                    @change="cust_gender"
                  >
                    <option value="" selected>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.gender_error"
                  ></p>
                </div>
                <div>
                  <button
                    type="button"
                    @click="update_contact"
                    class="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        id="cancel_modal"
        class="modal"
        v-bind:class="[this.cancel_popup ? '' : 'd-block']"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title font-bold">
                Cancel Order - {{ this.canceledItem }}
              </h4>
              <button
                type="button"
                class="border-0 bg-light"
                @click="close_popup()"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <div class="reason-container w-100 mb-3">
                <!-- <label>Cancel Reason</label> -->
                <select
                  class="input-text form-control"
                  v-model="cancel_reason"
                  required
                >
                <option value="">--Select Cancel Reasons--</option>
                <option :value="reason" v-for="(reason,i) in cancel_reasons" :key="i"> {{reason}}</option>
                </select>

                <p class="text-danger kartmax-text-f-13">{{ cancel_error }}</p>
              </div>
              <div class="w-100 text-end">
                <button
                  class="btn btn-primary form-control w-25"
                  @click="cancelorderwithitem(order_id, item_id)"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
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
import  {modifyMixin} from "../../mixin.js"

export default {
  mixins:[modifyMixin],
  name: "dashboard",
  components: {
    Sidebar
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
      exchangeButton: "",
      order: [],
      customer_name: "",
      customer_dob: "",
      customer_dob_show: "",
      customer_gender: "",
      customer_gender_show: "",
      customer_name_show: "",
      canceledItem: "",
      cancel_popup: true,
      cancel_reason: "",
      cancel_error: "",
      customer_email: "",
      customer_email_show: "",
      customer_phone: "",
      customer_phone_show: "",
      address:[],
      shipping_address: {
        address_id: "",
        name: "",
        address: "",
        pincode: "",
        city: "",
        area: "",
        state: "",
        phone: "",
        default: ""
      },
      address_popup: true,
      account_popup: true,
      dob_error: "Please enter valid DOB",
      gender_error: "Please select your Gender",
      address_error: "Please enter valid Address",
      email_error: "Please enter valid Email",
      name_error: "Please enter valid Name",
      pin_code_error: "Please enter valid Pin code",
      area_error: "Please enter valid Area",
      city_error: "Please enter valid City",
      state_error: "Please enter valid State",
      phone_error: "Please enter valid Phone Number",
      selected_address_pincode: "",
      user: {
        address_id: "",
        name: "",
        address: "",
        pin_code: "",
        city: "",
        cityselect: "",
        areaselect: "",
        area: "",
        state: "",
        phone: "",
        default: ""
      },
      cancel_reasons:[],
    };
  },
  methods: {
    
    adminLogin() {
      var form = new FormData();
      form.append("phone", this.$route.query.phone);

      form.append("token", this.$route.query.token);
      form.append("store", this.$route.query.store);

      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/customer/validate-token",
          form
        )
        .then(response => {
          if (response.data.success === true) {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.login_popup = false;
            this.$store.state.list.error_message = "";
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_customer",
              response.data.data.customer.id,
              "1y"
            );
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000
            });

            $cookies.set(
              window.location.hostname.substring(10, 4) + "_cus_sess",
              response.data.data.customer_session,
              "1y"
            );
            this.$store.state.list.customer_session =
              response.data.data.customer_session;

            if (response.data.data.cart_session) {
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_ct_sess",
                response.data.data.cart_session,
                "1y"
              );
              this.$store.state.list.cart_session =
                response.data.data.cart_session;
            }
            this.$store.state.list.customer_id =
              response.data.data.customer.id * 1;
            if (response.data.data.cart_id) {
              this.$store.state.list.cart_id = response.data.data.cart_id;
              this.$store.state.list.thankyou_cart = response.data.data.cart_id;
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                response.data.data.cart_id
              );
            }
            this.$store.state.list.customer_detail =
              response.data.data.customer;
            if (response.data.data.products) {
              this.$store.state.list.cart_product = response.data.data.products;
              this.$store.state.list.cart_total =
                response.data.data.grand_total;
            }
            this.$store.state.list.address = response.data.data.address;
            if (this.$store.state.list.address.length != 0) {
              for (let i = 0; i < this.$store.state.list.address.length; i++) {
                if (i == 0) {
                  this.$store.state.list.address_id =
                    this.$store.state.list.address[i].id * 1;
                  this.$store.state.list.select_address_no = i;
                }
              }
            }
            // this.$gtm.trackEvent({
            //     event: 'Login',
            //     category: 'Login',
            //     action: 'Login Success'
            // });
            // this.$gtm.trackEvent({
            //     event: 'Login_status',
            //     category: 'Login_status',
            //     action: 'Login Success',
            //     Mobile_no: this.$store.state.list.customer_detail.phone,
            //     Email: this.$store.state.list.customer_detail.email,
            // });
            //this.$router.push(this.from_path);
            // this.get_account();
          } else {
            this.$store.state.list.success_message = "";
            this.$store.state.list.page_loader = false;
            this.$toast.error(response.data.message, {
              position: "top-center",
              duration: 4000
            });
            this.$store.state.list.customer_id = null;
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_customer",
              ""
            );
            this.$store.state.list.customer_id = "";
            $cookies.set(
              window.location.hostname.substring(10, 4) + "_cart",
              ""
            );
            this.$store.state.list.cart_id = "";
            // this.$toast.success("You have been successfully logout", {
            //     position: "top-center",
            //     duration: 4000,
            // });
            this.$router.push({ path: "/" });
            location.reload(true);
            // this.$gtm.trackEvent({
            //     event: 'Login',
            //     category: 'Login',
            //     action: 'Login Failure',
            //     label:response.data.message
            // });
          }
        })
        .catch(error => {
          this.$store.state.list.page_loader = false;
          if (error.message === "Network Error") {
            this.$toast.error(
              "Oops there seems to be some Network issue, please try again.",
              {
                position: "top-center",
                duration: 4000
              }
            );
          }
          window.scrollTo(0, 0);
        });
    },
    order_cancel(cancelitem,item) {
      this.selectedOrder = item;
      this.cancel_popup = false;
      this.canceledItem = cancelitem;
      this.cancel_reason = "";
      this.cancel_error = "";
    },
    async cancelorderwithitem() {
      
      if (
        this.cancel_reason.options === "" ||
        this.cancel_reason.options === null
      ) {
        this.cancel_error = "Please write a reason to cancel";
        this.item_id = item_id;
        this.$toast.error("Please write a reason to cancel", {
          position: "top-center",
          duration: 4000,
        });
      } else {
        this.$store.state.list.page_loader = true;
        var form = new FormData();
         for (const property in this.cancel_reasons) {
          if(this.cancel_reasons[property] == this.cancel_reason){
             this.reason_index = `${property}`
          }
        }
        form.append("order_quote_id", this.selectedOrder.order_quote_id);
        form.append("cancelled_by", 1);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append("item_id",  this.selectedOrder.item_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        form.append("order_cancel_reason", this.cancel_reason);
        form.append(
          "account_holder_name",
          this.cancel_reason.account_holder_name
        );
        form.append("account_number", this.cancel_reason.account_number);
        form.append("bank", this.cancel_reason.bank);
        form.append("ifsc", this.cancel_reason.ifsc);
        form.append("reason_id", this.reason_index);
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/order/cancel-item",
            form
          )
          .then((response) => {
            if (response.data.success === true) {
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 3000,
              });
             this.get_account();
              this.cancel_popup = true;
            } else {
              this.cancel_popup = true;
              this.$store.state.list.page_loader = false;
              // this.$store.state.list.error_message = response.data.message;  
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 3000,
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
                this.$router.push("/");
              }
            }
          })
          .catch((error) => {
            this.$store.state.list.page_loader = false;
            this.cancel_popup = true;
            if (error.message === "Network Error") {
              this.$store.state.list.error_message =
                "Oops there seems to be some Network issue, please try again.";
            }
          });
      }
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
              this.get_account();
              this.cancel_popup = true;
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
                this.cancel_popup = true;

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
              this.cancel_popup = true;
            window.scrollTo(0, 0);
          });
      }
    },
    reorder(cart_id) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart_id", cart_id);
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(this.$store.state.list.cart_api_url+'/v1' + "/order/re-order", form)
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
            this.$router.push("/checkout");
            this.$store.state.list.page_loader = false;
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
            this.$router.push("/thankyou");
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
    close_popup: function() {
      this.address_popup = true;
      this.account_popup = true;
      this.cancel_popup = true;
    },

    edit_address: function(
      id,
      name,
      address,
      area,
      city,
      state,
      pin,
      phone,
      add_default
    ) {
      this.user.address_id = id;
      this.user.name = name;
      this.user.address = address;
      this.user.pin_code = pin;
      this.user.area = area;
      this.user.city = city;
      this.user.state = state;
      this.user.areaselect = area;
      this.user.phone = phone;
      this.user.default = add_default;
      this.address_popup = false;
      this.user_name();
      //this.user_area();
      this.user_city();
      this.user_address();
      this.user_pin_code();
      this.user_phone();
    },
    user_name: function() {
      var name = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.user.name.length > 50) {
        this.name_error = "Name should be maximum 50 characters";
      } else if (this.user.name.match(name)) {
        this.name_error = "";
      } else {
        this.name_error = "Please enter valid Name";
      }
    },
    cust_dob: function() {
      if (this.customer_dob) {
        this.dob_error = "";
      } else {
        this.dob_error = "Please enter valid DOB";
      }
    },
    cust_gender: function() {
      if (this.customer_gender) {
        this.gender_error = "";
      } else {
        this.gender_error = "Please select your Gender";
      }
    },
    cust_name: function() {
      var name = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.customer_name.length > 50) {
        this.name_error = "Name should be maximum 50 characters";
      } else if (this.customer_name.match(name)) {
        this.name_error = "";
      } else {
        this.name_error = "Please enter valid Name";
      }
    },
    cust_email: function() {
      var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.customer_email.match("gmail")) {
        email = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
      }
      if (this.customer_email.match(email)) {
        this.email_error = "";
      } else {
        this.email_error = "Please enter valid Email";
      }
    },
    cust_phone: function() {
      var phoneno = /^([0-9]{10,})+$/;
      if (this.customer_phone.match(phoneno)) {
        this.phone_error = "";
      } else {
        this.phone_error = "Please enter valid Phone Number";
      }
    },
    edit_contact: function() {
      this.account_popup = false;
      this.cust_name();
      this.cust_email();
      this.cust_phone();
      this.cust_dob();
      this.cust_gender();
    },
    update_contact: function() {
      if (
        this.customer_name != "" &&
        this.customer_email != "" &&
        this.customer_phone != "" &&
        this.name_error == "" &&
        this.email_error == "" &&
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
        form.append("full_name", this.customer_name);
        form.append("email", this.customer_email);
        // form.append("dob", this.customer_dob);
        form.append("gender", this.customer_gender);
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/update-customer",
            form
          )
          .then(response => {
            if (response.data.success === true) {
              this.close_popup();
              this.$store.state.list.success_message = response.data.message;
              this.address = response.data.data.address;
              this.$store.state.list.error_message = "";
              this.$store.state.list.page_loader = false;
              this.address_popup = true;
              this.customer_email_show = response.data.data.email;
              this.customer_phone_show = response.data.data.phone;
              this.customer_name_show = response.data.data.full_name;
              this.customer_dob_show = response.data.data.dob || "";
              this.customer_gender_show = response.data.data.gender || "";
              this.customer_email = response.data.data.email;
              this.customer_phone = response.data.data.phone;
              this.customer_name = response.data.data.full_name;
              this.customer_dob = response.data.data.dob || "";
              this.customer_gender = response.data.data.gender || "";
              this.shipping_address.address_id = response.data.data.maddress.id;
              this.shipping_address.name =
                response.data.data.maddress.full_name;
              this.shipping_address.address =
                response.data.data.maddress.street_address;
              this.shipping_address.pincode =
                response.data.data.maddress.pin_code;
              this.shipping_address.area = response.data.data.maddress.area;
              this.shipping_address.city = response.data.data.maddress.city;
              this.shipping_address.state = response.data.data.maddress.state;
              this.shipping_address.phone = response.data.data.maddress.phone;
              this.shipping_address.default =
                response.data.data.maddress.default;
              window.scrollTo(0, 0);
            } else {
              this.close_popup();
              this.$store.state.list.error_message = response.data.message;
              this.$store.state.list.success_message = "";
              this.$store.state.list.page_loader = false;
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
            this.close_popup();
            this.$store.state.list.page_loader = false;
            if (error.message === "Network Error") {
              this.$store.state.list.error_message = error.message;
            }
            window.scrollTo(0, 0);
          });
      }
    },
    user_city: function() {
      var city = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.user.city.match(city)) {
        this.city_error = "";
      } else {
        this.city_error = "Please enter valid City";
      }
    },
    user_area: function() {
      var area = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.user.area.match(area)) {
        this.area_error = "";
      } else {
        this.area_error = "Please enter valid Area";
      }
    },
    user_address: function() {
      var address = /^(?=.*[a-zA-Z]).{10,}$/;
      if (this.user.address.length < 10) {
        this.address_error = "Address should be minimum 10 characters";
      } else if (this.user.address.match(address)) {
        this.address_error = "";
      } else {
        this.address_error = "Please enter valid Address";
      }
    },
    user_pin_code: function() {
      var pin_code = /^([0-9]{6,})+$/;
      if (this.user.pin_code.match(pin_code)) {
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
        axios
          .get(
            this.$store.state.list.api_url + "/api/cart/v1/serviceable-pincode",
            {
              params: {
                //  store:this.$store.state.list.store,
                pincode: this.user.pin_code
              }
            }
          )
          .then(response => {
            if (response.data.result == "") {
              this.pin_code_error = "Sorry this pincode is not serviceable.";
            } else {
              this.user.city = response.data.result.city;
              this.user.area = response.data.result.area;
              this.user.areaselect = Object.keys(response.data.result.area)[0];
              // for(let i=0;i<Object.keys(this.user.area).length;i++){
              //   if((Object.keys(this.user.area)[i]).trim()==(this.user.areaselect).trim()){
              //     this.user.areaselect= Object.keys(this.user.area)[i]
              //   }
              // }
              this.user.cityselect = Object.keys(response.data.result.city)[0];
              this.user.state = response.data.result.state;
              this.pin_code_error = "";
              this.state_error = "";
              if (response.data.result.city != "") {
                this.city_error = "";
              }
              if (response.data.result.area != "") {
                this.area_error = "";
              }
            }
          })
          .catch(error => {
            if (error.message === "Network Error") {
              this.$store.state.list.error_message = error.message;
            }
            window.scrollTo(0, 0);
          });
      } else {
        this.pin_code_error = "Please enter valid Pin code";
      }
    },
    user_phone: function() {
      var phoneno = /^([0-9]{10,})+$/;
      if (this.user.phone.match(phoneno)) {
        this.phone_error = "";
      } else {
        this.phone_error = "Please enter valid Phone Number";
      }
    },
    update_address: function() {
      if (
        this.user.name != "" &&
        this.user.address != "" &&
        this.user.pin_code != "" &&
        this.user.area != "" &&
        this.user.city != "" &&
        this.user.state != "" &&
        this.user.phpne != "" &&
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
        form.append("address_id", this.user.address_id);
        form.append("full_name", this.user.name);
        form.append("street_address", this.user.address);
        form.append("pin_code", this.user.pin_code);
        form.append("area", this.user.areaselect);
        form.append("city", this.user.cityselect);
        form.append("state_name", this.user.state);
        form.append("phone", this.user.phone);
        form.append("default", this.user.default);
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/edit-address",
            form
          )
          .then(response => {
            if (response.data.success === true) {
              this.$store.state.list.success_message = response.data.message;
              this.address = response.data.data.address;
              this.$store.state.list.error_message = "";
              this.$store.state.list.page_loader = false;
              this.address_popup = true;
              this.customer_dob_show = response.data.data.dob || "";
              this.customer_gender_show = response.data.data.gender || "";
              this.customer_email_show = response.data.data.email;
              this.customer_phone_show = response.data.data.phone;
              this.customer_name_show = response.data.data.full_name;
              this.customer_email = response.data.data.email;
              this.customer_phone = response.data.data.phone;
              this.customer_name = response.data.data.full_name;
              this.customer_dob = response.data.data.dob || "";
              this.customer_gender = response.data.data.gender || "";
              this.shipping_address.address_id = response.data.data.maddress.id;
              this.shipping_address.name =
                response.data.data.maddress.full_name;
              this.shipping_address.address =
                response.data.data.maddress.street_address;
              this.shipping_address.pincode =
                response.data.data.maddress.pin_code;
              this.shipping_address.city = response.data.data.maddress.city;
              this.shipping_address.area = response.data.data.maddress.area;
              this.shipping_address.state = response.data.data.maddress.state;
              this.shipping_address.phone = response.data.data.maddress.phone;
              this.shipping_address.default =
                response.data.data.maddress.default;
              window.scrollTo(0, 0);
            } else {
              this.$store.state.list.error_message = response.data.message;
              this.$store.state.list.success_message = "";
              this.$store.state.list.page_loader = false;
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
              this.$store.state.list.error_message = error.message;
            }
            window.scrollTo(0, 0);
          });
      }
    },

 
    async getOrders(pageCount){
       var form = new FormData();
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        form.append("store", this.$store.state.list.store);
        await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' +
              "/customer/order-list?page=" +
              pageCount +
              "",
            form
          ).then(response=>{
            if(response.data.success == true){
                this.order = response.data.data.orders;

            }
          })
      
    },
    get_account: async function() {
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
          .then(async response =>{
            if (response.data.success === true) {
              console.log()
              this.$store.state.list.page_loader = false;
              this.returnShow = response.data.data.returnEnabled
              this.exchangeShow = response.data.data.exchangeEnabled
              this.creditShow =  response.data.data.creditsEnabled
              this.exchangeButton = response.data.data.exchange_enabled
              console.log(this.exchangeButton,"exchange")
              let value = {
                return:this.returnShow,
                exchange:this.exchangeShow,
                credit:this.creditShow
              }
              // await this.getOrders()
              this.address = response.data.data.address;

              // this.setCookie("navbarInfo", JSON.stringify(value),2)

              // this.order = response.data.data.orders;
              this.customer_email_show = response.data.data.email;
              this.customer_phone_show = response.data.data.phone;
              this.customer_email = response.data.data.email;
              this.customer_dob_show = response.data.data.dob || "";
              this.customer_gender_show = response.data.data.gender || "";
              this.customer_dob = response.data.data.dob || "";
              this.customer_gender = response.data.data.gender || "";
              this.customer_phone = response.data.data.phone;
              if (response.data.data.full_name != null) {
                this.customer_name_show = response.data.data.full_name;
                this.customer_name = response.data.data.full_name;
              }
              this.shipping_address.address_id = response.data.data.maddress.id;
              this.shipping_address.name =
                response.data.data.maddress.full_name;
              this.shipping_address.address =
                response.data.data.maddress.street_address;
              this.shipping_address.pincode =
                response.data.data.maddress.pin_code;
              this.shipping_address.city = response.data.data.maddress.city;
              this.shipping_address.area = response.data.data.maddress.area;
              this.shipping_address.state = response.data.data.maddress.state;
              this.shipping_address.phone = response.data.data.maddress.phone;
              this.shipping_address.default =
                response.data.data.maddress.default;
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
              this.$store.state.list.error_message = error.message;
            }
            window.scrollTo(0, 0);
          });
      }
    },
    remove_address(index, id) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("address_id", id);
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/customer/delete-address",
          form,
          config
        )
        .then((response) => {
          if (response.data.success === true) {
            this.$store.state.list.page_loader = false;
            this.address.splice(index, 1);
            this.$store.state.list.address.splice(index, 1);
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
          } else {
            this.$store.state.list.page_loader = false;
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
        });
    },
  },
  mounted() {
    this.get_account();
  },
  beforeMount() {
    if(this.$store.state.list.customer_id ==null || this.$store.state.list.customer_id =='' || this.$store.state.list.customer_id  == undefined ){
      this.$router.push('/login')
    }
    if (this.$route.query.phone) {
      this.adminLogin();
    } 
    // else {
    //   if (
    //   this.$store.state.list.customer_detail.id === null ||
    //   this.$store.state.list.customer_detail.id === ""
    // ) {
    //     this.$router.push({
    //       path: "/",
    //       query: { redirect: this.$route.fullPath }
    //     });
    //   }
    // }

    this.$store.state.list.error_message = "";
    this.$store.state.list.success_message = "";
    this.$store.state.list.breadcrumb = "My Account";
    this.$store.state.list.page_loader = false;
    axios
      .get(
        this.$store.state.list.cart_api_url+'/v1' + "/fetch-reasons/cancel"
      )
      .then(response => {
        if(response.data.success){
          this.cancel_reasons  = response.data.data
        }
      })
      .catch(err=>{
        console.log("err in cancel reason",err)
      })
  }
};
</script>
<style scoped>
.modal-dialog {
  max-width: 700px;
}
</style>
