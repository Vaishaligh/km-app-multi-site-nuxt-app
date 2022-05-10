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
        <div class="col-md-3">
          <Sidebar :returnShow='returnShow'  :exchangeShow="exchangeShow"  :creditShow="creditShow"/>
        </div>
        <div class="col-md-9">
          <div class="row">
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
                      shipping_address.default,
                      shipping_address.landmark

                    )
                  "
                  >Edit</a
                >
                <a
                  href="#"
                  v-else
                  class="d-inline-block ms-1 text-primary kartmax-text-f-14"
                  @click.prevent="add_address(shipping_address.name)"
                  >Add New</a
                >
              </h5>
              <div class="content-box" v-if="shipping_address.name != ''">
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
              <div class="content-box" v-else>
                <p>No Address Found.</p>
              </div>
            </div>
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
                    v-for="(items, index) in address"
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
                          v-text="items.area"
                        ></span>
                        <br />
                        <span
                          class="kartmax-text-f-14"
                          v-text="items.city"
                        ></span>
                        <br /><span v-text="items.street_address"></span>,
                        <span
                          class="kartmax-text-f-14"
                          v-text="items.state"
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
              <h4 class="modal-title font-bold">
                {{ user.edit ? "Edit Address" : "Add New Address" }}
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
              <form>
                <div
                  v-bind:class="{
                    success: this.name_error == '',
                    error: this.name_error != '',
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
                  v-bind:class="{
                    success: this.address_error == '',
                    error: this.address_error != '',
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
                  v-bind:class="{
                    success: this.pin_code_error == '',
                    error: this.pin_code_error != '',
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
                <div class="mb-2">
                  <label class="label"><span>Landmark</span></label>
                  <input
                    class="input-text form-control"
                    v-model="user.landmark"
                    autocomplete="off"
                    type="text"
                    name="landmark"
                    required=""
                  />
                </div>
                <div
                  v-bind:class="{
                    success: this.area_error == '',
                    error: this.area_error != '',
                  }"
                >
                  <label class="label"
                    ><span>Area</span></label
                  >
                  
                  <select
                    class="input-text form-control apperence"
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
                  v-bind:class="{
                    success:
                      this.city_error == '' && this.user.cityselect != '',
                    error: this.city_error != '',
                  }"
                >
                  <label class="label"><span>City</span></label>
                  <select
                    class="input-text form-control apperence"
                    v-model="user.cityselect"
                  >
                    <!-- <option disabled  selected>
                      Please select City
                    </option> -->
                    <option v-for="city in user.city" :value="user.city[city]" :key="user.city[city]">
                      {{ user.city[city] }}
                    </option>
                  </select>
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.city_error"
                  ></p>
                </div>
                <div
                  v-bind:class="{
                    success: this.state_error == '',
                    error: this.state_error != '',
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
                  v-bind:class="{
                    success: this.phone_error == '',
                    error: this.phone_error != '',
                  }"
                >
                  <label class="label mt-3"
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
                <div
                  class="field receiver-email"
                  v-if="!user.edit"
                  v-bind:class="{
                    success: this.email_error == '',
                    error: this.email_error != '',
                  }"
                >
                  <label class="label"><span>Receiver Email</span></label>
                  <input
                    class="input-text form-control"
                    autocomplete="off"
                    @keyup="user_email"
                    v-model="user.email"
                    type="text"
                    name="email"
                    required=""
                  />
                  <p
                    class="text-danger kartmax-text-f-13"
                    v-text="this.email_error"
                  ></p>
                </div>
                <div class="field submit">
                  <button
                    type="button"
                    @click="update_address"
                    class="btn btn-primary"
                    v-if="user.edit"
                  >
                    <span>Update Address</span>
                  </button>
                  <button
                    type="button"
                    @click="add_new_address"
                    class="btn btn-primary"
                    v-else
                  >
                    <span>Add Address</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "./sidebar";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
export default {
  components: {
    Sidebar,
  },
  head() {
    return {
      bodyAttrs: {
        class: "address-book",
      },
    };
  },
  name: "address_book",
  data() {
    return {
      exchangeShow:false,
      returnShow:false,
      creditShow:false,
      address: [],
      email: "",
      edit: false,
      email_error: "",
      shipping_address: {
        address_id: "",
        name: "",
        address: "",
        pincode: "",
        city: "",
        area: "",
        state: "",
        phone: "",
        default: "",
      },
      address_popup: true,
      address_error: "",
      name_error: "",
      pin_code_error: "",
      area_error: "",
      city_error: "",
      state_error: "",
      phone_error: "",
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
        default: "",
        landmark: "",
      },
    };
  },
  methods: {

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
    close_popup: function () {
      this.address_popup = true;
    },
    edit_address: function (
      id,
      name,
      address,
      area,
      city,
      state,
      pin,
      phone,
      add_default,
      landmark
    ) {
      this.user.address_id = id;
      this.user.name = name;
      this.user.address = address;
      this.user.pin_code = pin;
      this.user.city = city;
      this.user.areaselect = area;
      this.user.cityselect = city;
      this.user.state = state;
      this.user.phone = phone;
      this.user.default = add_default;
      this.user.edit = true;
      this.address_popup = false;
      this.user_name();
      this.user.landmark = landmark=='null'?'':landmark;
      //this.user_area();
      this.user_city();
      this.user_address();
      this.user_pin_code();
      this.user_phone();
    },
    add_address: function (name) {
      this.user.name = name;
      this.user.address = "";
      this.user.pin_code = "";
      this.user.city = "";
      this.user.area = "";
      this.user.state = "";
      this.user.phone = "";
      this.user.email = "";
      this.user.edit = false;
      this.address_popup = false;
    },
    user_name: function () {
      var name = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.user.name.length > 50) {
        this.name_error = "Name should be maximum 50 characters";
      } else if (this.user.name.match(name)) {
        this.name_error = "";
      } else {
        this.name_error = "Please enter valid Name";
      }
    },
    user_city: function () {
      var city = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.user.city.match(city)) {
        this.city_error = "";
      } else {
        this.city_error = "Please enter valid City";
      }
    },
    user_area: function () {
      var area = /^([^\s]+[a-z ,A-Z, ])+$/;
      if (this.user.area.match(area)) {
        this.area_error = "";
      } else {
        this.area_error = "Please enter valid Area";
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
    user_pin_code: function () {
      var pin_code = /^([0-9]{6,})+$/;
      if (this.user.pin_code.match(pin_code)) {
        axios
          .get(
            this.$store.state.list.api_url + "/api/cart/v1/serviceable-pincode",
            {
              params: {
                //  store:this.$store.state.list.store,
                pincode: this.user.pin_code,
              },
            }
          )
          .then((response) => {
            if (response.data.result == "") {
              this.pin_code_error = "Sorry this pincode is not serviceable.";
            } else {
              this.user.city = response.data.result.city;
              this.user.area = response.data.result.area;
              for(let i=0;i<Object.keys(this.user.area).length;i++){
                if((Object.keys(this.user.area)[i]).trim()==(this.user.areaselect).trim()){
                  this.user.areaselect= Object.keys(this.user.area)[i]
                }
              }
              for(let i=0;i<Object.keys(this.user.city).length;i++){
                if((Object.keys(this.user.city)[i]).trim()==(this.user.cityselect).trim()){
                  this.user.cityselect= Object.keys(this.user.city)[i]
                }
              }
         
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
          });
      } else {
        this.pin_code_error = "Please enter valid Pin code";
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
    user_email: function () {
      var email =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (this.user.email.match(email)) {
        this.email_error = "";
      } else {
        this.email_error = "Please enter valid Email";
      }
    },
    add_new_address: function () {
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
        // form.append("cart_id", this.$store.state.list.cart_id);
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
        form.append("email", this.user.email);
        let config = { headers: { "Content-Type": "multipart/form-data" } };
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/add-address",
            form,
            config
          )
          .then((response) => {
            if (response.data.success === true) {
              // this.$store.state.list.success_message = response.data.message;
              this.$store.state.list.error_message = "";
              this.$root.page_loader = false;
              this.address_popup = true;
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.get_account();
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
                this.$router.push("/");
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
    update_address: function () {
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
        form.append("landmark", this.user.landmark);

        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/edit-address",
            form
          )
          .then((response) => {
            if (response.data.success === true) {
              // this.$store.state.list.success_message = response.data.message;
              this.address = response.data.data.address;
              this.$store.state.list.error_message = "";
              this.$store.state.list.page_loader = false;
              this.address_popup = true;
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
              this.shipping_address.landmark = response.data.data.maddress.landmark;

              this.shipping_address.default =
                response.data.data.maddress.default;
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
    get_account: function () {
      
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
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/account-details",
            form
          )
          .then((response) => {
            if (response.data.success === true) {
              this.$store.state.list.page_loader = false;
              this.returnShow = response.data.data.returnEnabled
              this.exchangeShow = response.data.data.exchangeEnabled
              this.creditShow =  response.data.data.creditsEnabled
              this.address = response.data.data.address;
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
                this.$router.push("/");
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
  mounted() {
    this.$store.state.menuActive = true;
    this.get_account();
    window.scrollTo(0, 0);
  },
  beforeMount() {
    if (
      this.$store.state.list.customer_id === null ||
      this.$store.state.list.customer_id === ""
    ) {
      this.$router.push("/");
    }
    (this.$store.state.list.error_message = ""),
      (this.$store.state.list.success_message = ""),
      (this.$store.state.list.breadcrumb = "Address Book"),
      (this.$store.state.list.page_loader = false);
  },
};
</script>

<style scoped>
.apperence {
  appearance: auto;
}
</style>
