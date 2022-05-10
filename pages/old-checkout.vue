<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-lg-8 col-12 mt-4 checkout-section"
        v-show="displayCheckout"
      >
        <div class="container mb-5 forDesktop">
          <div class="row">
            <div class="col-md-3 col-12 chackout-logo">
              <a href="/">
                <img
                  src="https://www.kartmax.in/wp-content/uploads/elementor/thumbs/kartmax-logo-pc63h0kkryi0puqjq26v2a2g0wrzlymed8ln17mups.png"
                  alt=""
                />
              </a>
            </div>
            <!-- todo chage class with bootstrap -->
            <div class="col-md-9 col-12 checkout-action">
              <ul class="opc-progress-bar mb-0 py-2">
                <li class="opc-progress-bar-item active completed">
                  <span class="pl-1">Shipping</span>
                </li>
                <li class="opc-progress-bar-item">
                  <span>Payments</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- payment methods  -->
          <!--  -->
          <div
            id="payment-method-section"
            class="payment-method-section opc-section"
            v-if="page_type === 'payment'"
          >
            <h5 class="text-dark my-1">Choose Payment Mode</h5>
            <!-- <div class="d-none">
              <div>
                <div class="payment-method-prepaid">
                  <div
                    class="payment-method payu"
                    v-bind:class="{ active: payment_method == 'debit' }"
                  >
                    <div
                      class="
                          payment-method-title
                          rounded
                          border
                          position-relative
                          px-0
                          py-2
                        "
                      @click.prevent="select_payment_method('debit')"
                    >
                      <input
                        type="radio"
                        name="payment[method]"
                        class="radio"
                        id="debit"
                        value="debit"
                      />
                      <i class="fa fa-credit-card fa-2x" aria-hidden="true"></i>
                      <label class="label" for="debit"
                        ><span>DEBIT CARD</span></label
                      >
                    </div>
                    <div class="payment-method-action">
                      <div class="actions-toolbar text-right">
                        <div>
                          <button
                            class="btn btn-primary p-2 mt-2"
                            id="payu_button"
                            type="button"
                            @click="payNowLatest()"
                          >
                            <span>Pay Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="payment-method-prepaid">
                  <div
                    class="payment-method payu"
                    v-bind:class="{ active: payment_method == 'credit' }"
                  >
                    <div
                      class="
                          payment-method-title
                          rounded
                          border
                          position-relative
                          px-0
                          py-2
                        "
                      @click.prevent="select_payment_method('credit')"
                    >
                      <input
                        type="radio"
                        name="payment[method]"
                        class="radio"
                        id="credit"
                        value="credit"
                      />
                      <i class="fa fa-credit-card fa-2x" aria-hidden="true"></i>
                      <label class="label" for="credit"
                        ><span>CREDIT CARD</span></label
                      >
                    </div>

                    <div class="payment-method-action">
                      <div class="actions-toolbar text-right">
                        <div>
                          <button
                            class="btn btn-primary p-2 mt-2"
                            id="payu_button"
                            type="button"
                            @click="payNowLatest()"
                          >
                            <span>Pay Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="payment-method-prepaid">
                  <div
                    class="payment-method payu"
                    v-bind:class="{ active: payment_method == 'upi' }"
                  >
                    <div
                      class="
                          payment-method-title
                          rounded
                          border
                          position-relative
                          px-0
                          py-2
                        "
                      @click.prevent="select_payment_method('upi')"
                    >
                      <input
                        type="radio"
                        name="payment[method]"
                        class="radio"
                        id="upi"
                        value="upi"
                      />
                      <i class="fa fa-credit-card fa-2x" aria-hidden="true"></i>
                      <label class="label" for="upi"><span>UPI</span></label>
                    </div>

                    <div class="payment-method-action">
                      <div class="actions-toolbar text-right">
                        <div>
                          <button
                            class="btn btn-primary p-2 mt-2"
                            id="payu_button"
                            type="button"
                            @click="payNowLatest()"
                          >
                            <span>Pay Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="payment-method-prepaid">
                  <div
                    class="payment-method payu"
                    v-bind:class="{ active: payment_method == 'netBanking' }"
                  >
                    <div
                      class="
                          payment-method-title
                          rounded
                          border
                          position-relative
                          px-0
                          py-2
                        "
                      @click.prevent="select_payment_method('netBanking')"
                    >
                      <input
                        type="radio"
                        name="payment[method]"
                        class="radio"
                        id="netBanking"
                        value="netBanking"
                      />
                      <i class="fa fa-credit-card fa-2x" aria-hidden="true"></i>
                      <label class="label" for="netBanking"
                        ><span>NET BANKING</span></label
                      >
                    </div>
                    <div class="payment-method-action">
                      <div class="actions-toolbar text-right">
                        <div>
                          <button
                            class="btn btn-primary p-2 mt-2"
                            id="payu_button"
                            type="button"
                            @click="payNowLatest()"
                          >
                            <span>Pay Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="payment-method-prepaid">
                  <div
                    class="payment-method payu"
                    v-bind:class="{ active: payment_method == 'wallet' }"
                  >
                    <div
                      class="
                          payment-method-title
                          rounded
                          border
                          position-relative
                          px-0
                          py-2
                        "
                      @click.prevent="select_payment_method('wallet')"
                    >
                      <input
                        type="radio"
                        name="payment[method]"
                        class="radio"
                        id="wallet"
                        value="wallet"
                      />
                      <i class="fa fa-credit-card fa-2x" aria-hidden="true"></i>
                      <label class="label" for="wallet"
                        ><span>WALLET</span></label
                      >
                    </div>

                    <div class="payment-method-action">
                      <div class="actions-toolbar text-right">
                        <div>
                          <button
                            class="btn btn-primary p-2 mt-2"
                            id="payu_button"
                            type="button"
                            @click="payNowLatest()"
                          >
                            <span>Pay Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="payment-method-prepaid">
                  <div
                    class="payment-method payu"
                    v-bind:class="{ active: payment_method == 'emi' }"
                  >
                    <div
                      class="
                          payment-method-title
                          rounded
                          border
                          position-relative
                          px-0
                          py-2
                        "
                      @click.prevent="select_payment_method('emi')"
                    >
                      <input
                        type="radio"
                        name="payment[method]"
                        class="radio"
                        id="emi"
                        value="emi"
                      />
                      <i class="fa fa-credit-card fa-2x" aria-hidden="true"></i>
                      <label class="label" for="emi"><span>EMI</span></label>
                    </div>
                    <div class="payment-method-action">
                      <div class="actions-toolbar text-right">
                        <div>
                          <button
                            class="btn btn-primary p-2 mt-2"
                            id="payu_button"
                            type="button"
                            @click="payNowLatest()"
                          >
                            <span>Pay Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="payment-method-prepaid">
                  <div
                    class="payment-method cash-on-delivery"
                    v-bind:class="{
                      active:
                        payment_method == 'cod' &&
                        cod_hide === true &&
                        cus_cod_hide === true
                    }"
                  >
                    <div
                      class="
                          payment-method-title
                          rounded
                          border
                          position-relative
                          px-0
                          py-2
                        "
                      :class="{
                        hide: cod_hide === false || cus_cod_hide === false
                      }"
                      @click.prevent="select_payment_method('cod')"
                    >
                      <input
                        type="radio"
                        name="payment[method]"
                        class="radio"
                        id="cashondelivery"
                        value="cashondelivery"
                      />
                      <i class="fa fa-money fa-2x" aria-hidden="true"></i>
                      <label class="label" for="cashondelivery"
                        ><span>Cash On Delivery</span></label
                      >
                    </div>
                    <div class="payment-method-action">
                      <div class="actions-toolbar text-right">
                        <div>
                          <button
                            class="btn btn-primary p-2 mt-2"
                            id="payu_button"
                            type="button"
                            @click="payNowLatest()"
                          >
                            <span>Place Order</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="new_payment-method-section">
              <div
                class="
                  new_payment-method
                  border-2 border
                  py-2
                  px-3
                  d-flex
                  align-items-center
                  justify-content-between
                  rounded-3
                  mb-2
                  flex-wrap
                "
                v-for="method in activeMethods"
                :key="method"
                v-bind:class="{ active: payment_method == method }"
                @click.prevent="select_payment_method(method)"
              >
                <p class="m-0 w-50">
                  <input
                    type="radio"
                    id="test1"
                    name="radio-group"
                    class="check-radio"
                  />
                  <label for="test1">{{ method }}</label>
                </p>
                <div class="method-img w-50 text-end">
                  <img
                    src="https://files.kartmax.in/builder/services/instamojo.png"
                    width="30%"
                    alt="instamojo"
                  />
                </div>
              </div>
              <div class="text-end">
                <button
                  class="btn btn-outline-primary mt-1"
                  @click="payNowLatest()"
                  v-if="payment_method != ''"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
          <!-- payment end  -->
          <!-- address section start  -->
          <!-- -->

          <div v-else-if="page_type == 'address'">
            <div class="mx-5 my-3 address-box">
              <h5 class="text-dark">Shipping Address</h5>
              <div
                class="shipping-address-items position-relative my-2"
                :class="{ hide: address_show_hide === false }"
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
                    {{ items.full_name }}, <a> {{ items.phone }}</a> <br />{{
                      items.street_address
                    }}, {{ items.area }}, {{ items.city }},
                    {{ items.state_name }} {{ items.pin_code }}
                    <span v-if="items.address_type"
                      ><br />Address Type - {{ items.address_type }}</span
                    >
                  </div>
                  <button
                    type="button"
                    @click="select_address(index, items.id)"
                    class="btn btn-outline-primary kartmax-text-f-14 mt-1"
                    :address_id="items.id"
                  >
                    <span>Ship Here</span>
                  </button>
                  <a
                    href="#"
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
                      text-decoration-none text-info
                      edit_link
                      position-absolute
                    "
                    ><i class="fa fa-edit"></i
                  ></a>
                </div>
              </div>
              <button
                type="button"
                v-if="
                  address_show_hide === false &&
                  $store.state.list.address.length > 2
                "
                class="btn btn-outline-primary border w-100 my-1"
                @click="show_all_address()"
              >
                <span>View All Addresses</span>
              </button>
              <button
                type="button"
                v-if="
                  address_show_hide === true &&
                  $store.state.list.address.length > 2
                "
                class="btn btn-outline-primary border w-100 my-1"
                @click="hide_all_address()"
              >
                <span>Hide Address</span>
              </button>
              <button
                type="button"
                class="btn btn-outline-primary border w-100 my-1"
                @click="customer_select_new_address()"
              >
                <i class="fa fa-plus me-1"></i>
                <span>Add New Address</span>
              </button>
              <div class="mt-2 d-flex justify-content-between address_btn">
                <nuxt-link to="/cart" class="btn btn-outline-dark">
                  <i class="fas fa-arrow-left"></i>
                </nuxt-link>
                <button
                  type="button"
                  class="btn btn-primary px-5"
                  id="new_address"
                  @click="old_address()"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <!-- address  end  -->

          <!-- new address form start -->
          <div
            v-else-if="page_type === 'new_address_page'"
            class="mt-4 new-address-form"
          >
            <form>
              <h5 class="text-dark">New Shipping Address</h5>
              <div>
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
                <p
                  class="text-danger kartmax-text-f-12"
                  v-text="name_error"
                ></p>
              </div>

              <div>
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
                <p
                  class="text-danger kartmax-text-f-12"
                  v-text="address_error"
                ></p>
              </div>

              <div>
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
                <p
                  class="text-danger kartmax-text-f-12"
                  v-text="pin_code_error"
                ></p>
                <p class="size_success" v-html="pin_code_success"></p>
              </div>
              <div>
                <select
                  class="input-text form-control apperence"
                  v-model="user.areaselect"
                >
                  <option disabled value="" selected>Please select Area</option>
                  <option
                    v-for="area in user.area"
                    :value="user.area[area]"
                    :key="`fieldArea-${area}`"
                  >
                    {{ user.area[area] }}
                  </option>
                </select>
                <p
                  class="text-danger kartmax-text-f-12"
                  v-text="area_error"
                ></p>
              </div>
              <div>
                <select
                  class="input-text form-control apperence"
                  v-model="user.cityselect"
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
                <p
                  class="text-danger kartmax-text-f-12"
                  v-text="city_error"
                ></p>
              </div>
              <div>
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
                <p></p>
              </div>
              <div>
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
                <p
                  class="text-danger kartmax-text-f-12"
                  v-text="phone_error"
                ></p>
              </div>

              <!-- <div v-if="!$store.state.list.address.length"> -->
              <div>
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
                <p
                  class="text-danger kartmax-text-f-12"
                  v-text="email_error"
                ></p>
              </div>
              <div>
                <label class="mb-1">Select Address Type</label>
                <div class="row">
                  <div class="col-12">
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
                    <label class="mt-2 d-flex" v-if="isConsent">
                      <input
                        type="checkbox"
                        @change="onChecked"
                        :checked="termscondition"
                        class="mt-1"
                      />
                      <p class="text-dark m-0 ms-1">
                        I consent to receive promotional SMS, emails, and other
                        communications
                      </p>
                    </label>
                    <p
                      v-if="!termscondition"
                      class="text-danger kartmax-text-f-12"
                    >
                      <small>Please accept the Terms & Condition.</small>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div class="d-flex justify-content-end">
                  <button
                    @click.prevent="section_back"
                    class="btn btn-outline-dark me-2"
                    v-if="$store.state.list.address.length != 0"
                  >
                    <i class="fas fa-arrow-left"></i>
                  </button>
                  <button
                    v-if="termscondition"
                    type="button"
                    @click="new_address()"
                    id="new_address"
                    class="btn btn-primary px-3"
                  >
                    <span>Continue</span>
                  </button>
                  <button
                    disabled
                    style="cursor: not-allowed"
                    class="btn btn-primary px-3 py-2 border-0"
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
          <!-- address form end -->

          <!-- login form start -->
          <div
            class="d-flex w-100 mt-4 login_box opc-section"
            v-else-if="page_type === 'login'"
          >
            <form class="m-auto">
              <h5 class="text-dark">LOGIN</h5>
              <div class="field mobile error">
                <input
                  maxlength="10"
                  autocomplete="off"
                  placeholder="Enter Mobile Number*"
                  @keyup="g_mobile_no"
                  v-model="mobile_number"
                  name="mobile"
                  autofocus
                  class="input-text form-control"
                />
                <p
                  class="text-danger kartmax-text-f-12"
                  v-text="mobile_error"
                ></p>
              </div>
              <div
                v-if="c_login === true && mobile === true"
                v-bind:class="{
                  success: otp === true,
                  error: otp_error != '',
                }"
              >
                <input
                  class="input-text form-control"
                  maxlength="4"
                  type="text"
                  placeholder="One Time Password (OTP)*"
                  name="customerpassword"
                  v-model="otp_number"
                  :disabled="mobile == false"
                  autocomplete="off"
                  ref="otp"
                />

                <p class="text-danger kartmax-text-f-12" v-text="otp_error"></p>
                <label class="timer-main font-medium"
                  ><span></span
                  ><span
                    class="float-right"
                    v-if="mobile === true && resend_otp_time != 60"
                    ><span>00:</span
                    ><span v-text="resend_otp_time"></span></span
                  ><a
                    href="#"
                    class="action otp-resend-button"
                    id="resend"
                    @click.prevent="resend_otp()"
                    v-if="mobile === true && resend_otp_time === 60"
                    ><span>Resend OTP </span></a
                  ></label
                >
              </div>

              <div class="row">
                <div class="col-6 p-3">
                  <button
                    class="w-100 btn btn-primary"
                    @click.prevent="login_back"
                    v-if="
                      (c_login === true && mobile === true) ||
                      g_checkout_page === true
                    "
                  >
                    <span class="font-regular"> Back</span>
                  </button>
                </div>
                <div class="col-6">
                  <button
                    type="submit"
                    class="w-100 btn btn-primary"
                    v-if="
                      (c_login === false && g_checkout_page === false) ||
                      (c_login === true && mobile === false)
                    "
                    @click.prevent="login_tab('login')"
                  >
                    GET OTP
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- login form end -->
        </div>
      </div>
      <div class="col-lg-4 px-4 pt-5 col-12 cart-summary">
        <div class="pt-2">
          <h4 class="w-100 pb-1 mb-0 border-bottom">Order Summary</h4>

          <div
            class="
              py-2
              w-100
              d-flex
              justify-content-between
              align-content-center
            "
          >
            <p class="font-weight-light">
              Coupons
              <span>: {{ $store.state.list.discount_code }}</span>
            </p>
            <div class="pull-right">
              <button
                class="btn btn-outline-secondary btn-sm"
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
                class="btn btn-outline-secondary btn-sm bg-white"
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
        <div class="">
          <div class="w-100 pb-1 mb-0 border-bottom">
            <span class="fw-bold">Price Details</span>
          </div>
          <!-- <p
            v-if="$store.state.list.cart_total < 1000"
            class="cod-tag-style discount-color"
          >
            *Cash On Delivery on orders above Rs. 1000
          </p> -->
          <table class="w-100">
            <tbody>
              <tr>
                <th class="fw-light kartmax-text-f-14 py-2">Total MRP</th>
                <td class="text-end">
                  <span class="kartmax-text-f-14"
                    >Rs.
                    <span id="m_sub_total">{{
                      $store.state.list.summary.totalMRP
                    }}</span></span
                  >
                </td>
              </tr>
              <tr>
                <th class="fw-light kartmax-text-f-14 py-2">
                  Total Discount on MRP
                </th>
                <td class="text-end">
                  <span class="price discount-color kartmax-text-f-14">
                    Rs.
                    <span id="m_sub_total">{{
                      $store.state.list.summary.discountMRP
                    }}</span></span
                  >
                </td>
              </tr>

              <tr>
                <th class="fw-light kartmax-text-f-14 py-2">
                  <span class="kartmax-text-f-14">Discount Coupon</span>
                </th>
                <td class="discount-color text-end">
                  <span
                    ><span class="kartmax-text-f-14"
                      ><span> Rs. </span
                      ><span>{{
                        this.$store.state.list.discount_amount  
                      }}</span></span
                    ></span
                  >
                </td>
              </tr>
              <tr v-if="this.$store.state.list.capillaryAmount == 0">
                <th class="fw-light kartmax-text-f-14 py-2">
                  <span>Loyalty Discount</span>
                </th>
                <td class="discount-color text-end">
                  <span
                    ><span
                      ><span> - Rs. </span
                      ><span>{{
                        this.$store.state.list.capillaryAmount  
                      }}</span></span
                    ></span
                  >
                </td>
              </tr>
              <tr>
                <th class="fw-light kartmax-text-f-14 py-2">
                  <span>Shipping Charge</span>
                </th>
                <td class="text-end">
                  <span> Rs. {{ shiping_charges   }}</span>
                </td>
              </tr>
              <tr
                v-if="
                  cod_charges != '0' && cod_charges != '' && cod_charges != null
                "
              >
                <th class="fw-light">
                  <span class="value">COD Charge</span>
                </th>
                <td class="text-end">
                  <span>Rs. {{ this.cod_charges   }}</span>
                </td>
              </tr>
              <tr class="grand totals">
                <th class="font-bold py-2">
                  <strong>Order Total</strong>
                </th>
                <td class="amount font-bold text-end">
                  <strong
                    ><span class="price"
                      >Rs.
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
        <!-- <div class="forMobile cartBottomFix">

          <nuxt-link @click.native="checkout_gtm" :to="{ path: '/checkout' }">
            <button type="button" class="checkout-cart fw-light">
              <span>Checkout</span>
            </button>
          </nuxt-link>
        </div> -->
        <!-- <div class="forDesktop">
          <nuxt-link
            @click.native="checkout_gtm"
            :to="{ path: '/checkout' }"
            class="btn btn-primary w-100"
          >
            Checkout
          </nuxt-link>
        </div> -->
      </div>
    </div>
    <Shimmer
      :style="{ height: '100vh', width: 'auto' }"
      v-bind:class="getClass()"
    />
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
                class="field full-name"
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
                <p class="size_error" v-text="this.name_error"></p>
              </div>
              <div
                class="field street-address"
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
                <p class="size_error" v-text="this.address_error"></p>
              </div>
              <div
                class="field pin-code"
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
                <p class="size_error" v-text="this.pin_code_error"></p>
              </div>
              <div
                class="field area"
                v-bind:class="{
                  success: this.area_error == '',
                  error: this.area_error != '',
                }"
              >
                <select
                  class="input-text form-control"
                  v-model="edit.areaselect"
                >
                  <option disabled value="" selected>Please select Area</option>
                  <option
                    v-for="area in edit.area"
                    :value="edit.area[area]"
                    :key="`area-f-${area}`"
                  >
                    {{ edit.area[area] }}
                  </option>
                </select>
                <p class="size_error" v-text="this.area_error"></p>
              </div>
              <div
                class="field city"
                v-bind:class="{
                  success: this.city_error == '' && this.edit.cityselect != '',
                  error: this.city_error != '',
                }"
              >
                <select
                  class="input-text form-control"
                  v-model="edit.cityselect"
                >
                  <option disabled value="" selected>Please select Area</option>
                  <option
                    v-for="city in edit.city"
                    :value="edit.city[city]"
                    :key="`city-f${city}`"
                  >
                    {{ edit.city[city] }}
                  </option>
                </select>
                <p class="size_error" v-text="this.city_error"></p>
              </div>
              <div
                class="field state"
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
                class="field receiver-phone"
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
                <p class="size_error" v-text="this.phone_error"></p>
              </div>
              <div class="field address_type_container">
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
                  <span>Update Address</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- edit address end here  -->
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
                              class="btn btn-outline-secondary"
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
                    text-center
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
                    <div class="coupon-base-benefit w-100">
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
import Shimmer from "../components/custom/Shimmer.vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

export default {
  layout: "checkoutPage",

  components: {
    Shimmer,
  },
  name: "Checkout",

  computed: {
    redeemablePoint() {
      var points = 0;
      if (this.net_amount < this.$store.state.list.availableLoyalty) {
        points = this.net_amount - 50;
        if (this.shiping_charges) {
          points = points - this.shiping_charges;
        }
      } else {
        points = this.$store.state.list.availableLoyalty;
      }
      return points;
    },
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
  data: function () {
    return {
      displayCheckout: false,
      activeMethods: "",
      isChangedOTP: false,
      changedLoyaltyPoints: null,
      availableLoyalty: null,
      termscondition: true,
      isConsent: true,
      LoyaltyError: "",
      changeLoyaltyPopup: true,
      loyaltyPopup: true,
      checkLoyalty: false,
      loyaltyOTP: null,
      isOTP: false,
      codBlock: "0",
      page_type: "",
      back_page_type: "",
      coupon_popup: true,
      coupon_list: [],
      send_otp_btn: true,
      points_popup: true,
      mobile_number: "",
      mobile_error: "",
      address_show_hide: false,
      address_popup: true,
      shiping_charges: "",
      applied_coupon: "",
      mobile: false,
      old_customer: false,
      g_checkout_page: false,
      c_login: false,
      otp_number: "",
      otp_error: "",
      select_address_index: 0,
      otp: false,
      coupon_s_m: "",
      coupon_e_m: "",
      payment_method: "",
      address_error: "",
      name_error: "",
      pin_code_error: "",
      pin_code_success: "",
      cod_msg_show: false,
      cod_msg: "",
      cod_charges: "",
      city_error: "",
      area_error: "",
      state_error: "",
      phone_error: "",
      email_error: "",
      cod_hide: true,
      cus_cod_hide: true,
      cod_delivery_msg: "",
      phone: "",
      totalPoints: [],
      maxRedeem: 0,
      maximumRedeem: 0,
      mloyal_point: 0,
      mloyal_amount: 0,
      gateway_discount: 0,
      net_amount: 0,
      minRed: 0,
      isRedeem: false,
      pointEnter: 0,
      selected_address_pincode: "",
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
      },
      resend_otp_time: 60,
    };
  },
  methods: {
    getClass() {
      return {
        "v-hide-class": this.displayCheckout,
        "v-show-class": !this.displayCheckout,
      };
    },
    payNowLatest() {
      this.place_order();
    },

    onChecked() {
      this.termscondition = !this.termscondition;
    },

    apply_list_coupon(code) {
      this.applied_coupon = code;
      this.apply_coupon();
    },
    close_popup: function () {
      this.changeLoyaltyPopup = true;
      this.loyaltyPopup = true;
      this.address_popup = true;
      this.points_popup = true;
      this.coupon_popup = true;
    },

    cart_points_check: function (e) {
      this.maxRedeem =
        (this.net_amount - this.cod_charges) /
        this.totalPoints[0].Point_Per_Value;
      this.avilRedeem = this.totalPoints[0].LoyalityPoints;

      if (this.maxRedeem > this.avilRedeem) {
        this.minRed = this.avilRedeem;
      } else if (this.maxRedeem < this.avilRedeem) {
        this.minRed = this.maxRedeem;
      } else {
        this.minRed = this.avilRedeem;
      }

      this.pointEnter = this.minRed;
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
      this.edit.areaselect = area;
      this.edit.cityselect = city;
      // this.edit.city = city;
      this.edit.state = state;
      this.edit.phone = phone;
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
    address_type_change(event) {
      this.user.address_type = event.target.value;
    },
    edit_address_type_change(event) {
      this.edit.address_type = event.target.value;
    },
    remove_address(index, id) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("address_id", id);
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
            this.$store.state.list.address.splice(index, 1);
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
          }
        });
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
            this.$store.state.list.cart_product = response.data.data.products;
            this.checkLoyalty = false;
            this.$store.state.list.cart_total = response.data.data.grand_total;
            this.net_amount = response.data.data.net_amount;
            this.$store.state.list.cart_subtotal =
              response.data.data.order_subtotal;
            this.payment_method = "";
            this.mloyal_point = response.data.data.mloyal_point;
            this.mloyal_amount = response.data.data.mloyal_amount;
            this.gateway_discount = response.data.data.discount_gateway;
            this.shiping_charges = response.data.data.shipping_charge;

            // this.cart_points_check();

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
            this.$store.state.list.cart_total = response.data.data.grand_total;
            this.payment_method = "";
            this.net_amount = response.data.data.net_amount;
            this.mloyal_point = response.data.data.mloyal_point;
            this.mloyal_amount = response.data.data.mloyal_amount;
            this.gateway_discount = response.data.data.discount_gateway;
            this.shiping_charges = response.data.data.shipping_charge;
            // this.cart_points_check();
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
    addcoupon: function () {
      let number = "";
      if (this.$store.state.list.customer_detail.phone) {
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
          this.coupon_list = response.data.result;
        });
    },
    login_back() {
      this.c_login = false;
      this.g_checkout_page = false;
      window.scrollTo(0, 0);
      this.$router.push({ query: { gc: 0 } });
    },
    login_tab(type) {
      if (type == "login") {
        if (this.mobile === true) {
          this.c_login = true;
          this.g_checkout_page = false;
          this.mobile_no();
        } else {
          this.g_mobile_no();
        }
      }
      if (type == "g_checkout_page") {
        this.c_login = false;
        this.g_checkout_page = true;
        this.$router.push({ query: { gc: 1 } });
      }
    },
    show_all_address() {
      this.address_show_hide = true;
    },
    hide_all_address() {
      this.address_show_hide = false;
      window.scrollTo(0, 0);
    },
    section_back() {
      this.page_type = "address";
      this.displayCheckout = true;

      window.scrollTo(0, 0);
    },
    payment_section_back() {
      this.page_type = this.back_page_type;
      this.displayCheckout = true;

      this.back_page_type = "";
      this.$router.push({
        query: { gc: this.$route.query.gc ? this.$route.query.gc : 0 },
      });
      window.scrollTo(0, 0);
    },
    countDownTimer() {
      if (this.resend_otp_time > 0) {
        setTimeout(() => {
          this.resend_otp_time -= 1;
          this.countDownTimer();
        }, 1000);
      }
      if (this.resend_otp_time == 0) {
        this.resend_otp_time = 60;
      }
    },
    resend_otp() {
      this.send_otp_btn = false;
      setTimeout(() => {
        this.$refs.otp.focus();
      }, 0);
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      this.resend_otp_time = 60;
      this.countDownTimer();
      var form = new FormData();
      form.append("phone", this.mobile_number);
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/customer/send-otp",
          form,
          config
        )
        .then((response) => {
          if (response.data.success === true) {
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
          } else {
            this.$toast.error(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.$store.state.list.success_message = "";
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
    customer_select_new_address: function () {
      this.page_type = "new_address_page";
      this.displayCheckout = true;

      window.scrollTo(0, 0);
    },
    user_name: function () {
      var name = /^(?!\s*$).+/;
      if (this.user.name.match(name)) {
        this.name_error = "";
      } else {
        this.name_error = "Please enter valid Name";
      }
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
    user_city: function () {
      var city = /^(?!\s*$).+/;
      if (this.user.cityselect.match(city)) {
        this.city_error = "";
      } else {
        this.city_error = "Please enter valid City";
      }
    },
    user_area: function () {
      var area = /^(?!\s*$).+/;
      if (this.user.areaselect.match(area)) {
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
    user_email: function () {
      var email =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // if (this.user.email.match("gmail")) {
      //   email = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
      // }
      if (this.user.email.match(email)) {
        this.email_error = "";
      } else {
        this.email_error = "Please enter valid Email";
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
              this.$router.push({
                query: {
                  step: "payment",
                  gc: this.$route.query.gc ? this.$route.query.gc : 0,
                },
              });
              this.page_type = "payment";
              this.displayCheckout = true;

              this.back_page_type = "new_address_page";
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
        this.user_address();
        this.user_city();
        this.user_email();
      }
    },
    g_checkout: function () {
      if (
        this.user.name != "" &&
        this.user.address != "" &&
        this.user.pin_code != "" &&
        this.user.cityselect != "" &&
        this.user.areaselect != "" &&
        this.user.state != "" &&
        this.user.email != "" &&
        this.mobile_number != "" &&
        this.name_error == "" &&
        this.address_error == "" &&
        this.pin_code_error == "" &&
        this.city_error == "" &&
        this.area_error == "" &&
        this.state_error == "" &&
        this.email_error == "" &&
        this.mobile_error == ""
      ) {
        this.$store.state.list.page_loader = true;
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
        var form = new FormData();
        if (this.$store.state.list.g_customer_id != "") {
          form.append("customer_id", this.$store.state.list.g_customer_id);
        }
        form.append("cart_id", this.$store.state.list.cart_id);
        form.append("cart_session", this.$store.state.list.cart_session);
        form.append("full_name", this.user.name);
        form.append("street_address", this.user.address);
        form.append("pin_code", this.user.pin_code);
        form.append("area", this.user.areaselect);
        form.append("city", this.user.cityselect);
        form.append("state_name", this.user.state);
        form.append("phone", this.mobile_number);
        form.append("email", this.user.email);
        form.append("address_type", this.user.address_type);
        // form.append("promotion_consent", this.termscondition);

        let config = { headers: { "Content-Type": "multipart/form-data" } };
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/add-guest-address",
            form,
            config
          )
          .then((response) => {
            if (response.data.success === true) {
              this.$store.state.list.page_loader = false;
              this.$store.state.list.address_id = response.data.data.id;
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.$store.state.list.error_message = "";
              this.$router.push({
                query: {
                  step: "payment",
                  gc: this.$route.query.gc ? this.$route.query.gc : 0,
                },
              });
              this.page_type = "payment";
              this.displayCheckout = true;

              window.scrollTo(0, 0);
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_g_customer",
                this.user,
                "1y"
              );
              this.back_page_type = "login";
              this.$store.state.list.page_loader = false;
              this.$store.state.list.cart_product = response.data.data.products;
              this.net_amount = response.data.data.net_amount;
              this.mloyal_point = response.data.data.mloyal_point;
              this.mloyal_amount = response.data.data.mloyal_amount;
              this.gateway_discount = response.data.data.discount_gateway;
              // this.cart_points_check();
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
        this.g_mobile_no();
        this.user_pin_code();
        this.user_address();
        this.user_area();
        this.user_city();
        this.user_email();
      }
    },
    select_address: function (index, value) {
      this.select_address_index = index;
      this.$store.state.list.address_id = value;
    },
    select_payment_method: function (value) {
      // if (
      //   (value === "cod" || value === "precod") &&
      //   this.cod_hide === true &&
      //   this.cus_cod_hide === true
      // ) {
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
            this.$store.state.list.cart_subtotal =
              response.data.data.order_subtotal;
            this.$store.state.list.cart_total = response.data.data.grand_total;
            // this.net_amount = response.data.data.net_amount;
            this.cod_charges = response.data.data.cod_charge;
            this.$store.state.list.page_loader = false;
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
      // } else {
      //   this.cod_msg_show = true;
      // }
      // if (
      //   value === "paytm" ||
      //   value === "razorpay" ||
      //   value === "wallet" ||
      //   value === "debit" ||
      //   value === "credit" ||
      //   value === "upi" ||
      //   value === "emi" ||
      //   value === "netBanking"
      // ) {
      //   this.$store.state.list.page_loader = true;
      //   this.payment_method = value;
      //   var form = new FormData();
      //   form.append("cart_id", this.$store.state.list.cart_id);
      //   form.append("cart_session", this.$store.state.list.cart_session);
      //   form.append("payment_method", "razorpay");
      //   let config = { headers: { "Content-Type": "multipart/form-data" } };
      //   axios
      //     .post(
      //       this.$store.state.list.cart_api_url+'/v1' + "/cart/switch-payment-method",
      //       form,
      //       config
      //     )
      //     .then(response => {
      //       if (response.data.success === true) {
      //         this.$store.state.list.cart_subtotal =
      //           response.data.data.order_subtotal;
      //         this.$store.state.list.cart_total =
      //           response.data.data.grand_total;
      //         this.net_amount = response.data.data.net_amount;
      //         this.cod_charges = response.data.data.cod_charge;
      //         // this.mloyal_point = response.data.data.mloyal_point;
      //         // this.mloyal_amount = response.data.data.mloyal_amount;
      //         // this.gateway_discount = response.data.data.discount_gateway;
      //         this.$store.state.list.page_loader = false;
      //       } else {
      //         this.$store.state.list.page_loader = false;
      //         this.$toast.error(response.data.message, {
      //           position: "top-center",
      //           duration: 4000
      //         });
      //       }
      //     })
      //     .catch(error => {
      //       this.$store.state.list.page_loader = false;
      //     });
      // }
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
      // if (
      //   this.payment_method == "upi" ||
      //   this.payment_method == "emi" ||
      //   this.payment_method == "debit" ||
      //   this.payment_method == "credit" ||
      //   this.payment_method == "netBanking" ||
      //   this.payment_method == "wallet"
      // ) {
      //   form.append("payment_method", "prepaid");
      // } else {
      form.append("payment_method", this.payment_method);
      form.append("redirect_url", window.location.origin + "/thankyou");

      // }


      var config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (this.payment_method === "cod") {
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
      } else if (this.payment_method != "cod") {
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
              window.location.replace(
                response.data.data.payment.method_info.payment_url
              );
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
                  //var form = new FormData();
                  //form.append("cart_id", this.$store.state.list.cart_id);
                  //form.append("payment_method", "payu");
                  //let config = { headers: { 'Content-Type': 'multipart/form-data' } }
                  //axios.post(this.$store.state.list.cart_api_url+'/v1' + '/cart/switch-payment-method', form, config)
                  //.then(response => {
                  //if (response.data.success === true) {
                  //this.$store.state.list.cart_subtotal = response.data.data.order_subtotal;
                  //this.$store.state.list.cart_total = response.data.data.grand_total;
                  //this.cod_charges = response.data.data.cod_charge;
                  //}
                  //})
                } else {
                  //this.payment_method = ''
                  this.cod_hide = true;
                  this.cod_msg = "";
                  //var form = new FormData();
                  //form.append("cart_id", this.$store.state.list.cart_id);
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
                      this.$router.push({
                        query: {
                          step: "payment",
                          gc: this.$route.query.gc ? this.$route.query.gc : 0,
                        },
                      });
                      this.displayCheckout = true;
                      this.page_type = "payment";
                      this.back_page_type = "address";
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

              if (response.data.result.city != "") {
                this.city_error = "";
              }
              if (response.data.result.area != "") {
                this.area_error = "";
              }
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
    user_phone: function () {
      var phoneno = /^([0-9]{10,})+$/;
      if (this.user.phone.match(phoneno)) {
        this.phone_error = "";
      } else {
        this.phone_error = "Please enter valid Phone Number";
      }
    },

    mobile_no: function () {
      this.resend_otp_time = 60;
      var phoneno = /^([0-9]{10,})+$/;
      if (this.mobile_number.match(phoneno)) {
        this.mobile_error = "";
        if (this.mobile_number.length == "10") {
          this.$store.state.list.error_message = "";
          this.$store.state.list.success_message = "";
          this.mobile = true;
          setTimeout(() => {
            this.$refs.otp.focus();
          }, 0);
          this.$store.state.list.error_message = "";
          this.$store.state.list.success_message = "";
          var form = new FormData();
          form.append("phone", this.mobile_number);
          let config = { headers: { "Content-Type": "multipart/form-data" } };
          axios
            .post(
              this.$store.state.list.cart_api_url+'/v1' + "/customer/send-otp",
              form,
              config
            )
            .then((response) => {
              if (response.data.success === true) {
                this.$toast.success(response.data.message, {
                  position: "top-center",
                  duration: 4000,
                });
                this.$store.state.list.error_message = "";
                window.dataLayer.push({
                  event: "Login",
                  category: "Login",
                  action: "OTP Sent",
                  label: response.data.message,
                });
              } else {
                this.$toast.error(response.data.message, {
                  position: "top-center",
                  duration: 4000,
                });
                this.$store.state.list.success_message = "";
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
          this.mobile = false;
          this.otp = false;
          this.otp_number = "";
        }
      } else {
        this.mobile = false;
        this.mobile_error = "Please enter valid mobile number";
      }
    },
    getCheckoutCart(cart) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart", cart);
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/product/add-products-cart",
          form
        )
        .then((response) => {
          if (response.data.success === false) {
            this.$store.state.list.page_loader = false;
            this.$toast.error(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.$router.push("cart");
          } else {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.cart_id = response.data.data.cart_id;
            this.$store.state.list.cart_session =
              response.data.data.cart_session;
            this.get_cart();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCartSession(sku) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("sku", sku);

      // let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/product/add-product-item",
          form
        )
        .then((response) => {
          if (response.data.success === false) {
            this.$store.state.list.page_loader = false;
            this.$toast.error(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.$router.push("cart");
          } else {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.cart_id = response.data.data.cart_id;
            this.$store.state.list.cart_session =
              response.data.data.cart_session;
            this.get_cart();
          }
          s;
        })
        .catch((err) => {});
    },
    g_mobile_no: function () {
      this.resend_otp_time = 60;
      var phoneno = /^([0-9]{10,})+$/;
      if (this.mobile_number.match(phoneno)) {
        this.mobile_error = "";
        if (this.mobile_number.length == "10") {
          this.user.phone = this.mobile_number;
          this.$store.state.list.error_message = "";
          this.$store.state.list.success_message = "";
          this.mobile = true;
          var form = new FormData();
          form.append("phone", this.mobile_number);
          let config = { headers: { "Content-Type": "multipart/form-data" } };
          axios
            .post(
              this.$store.state.list.cart_api_url+'/v1' +
                "/customer/validate-customer",
              form,
              config
            )
            .then((response) => {
              if (response.data.success === true) {
                this.old_customer = true;
              }
            });
        } else {
          this.mobile = false;
          this.old_customer = false;
          this.otp = false;
          this.otp_number = "";
        }
      } else {
        this.mobile = false;
        this.c_login = false;
        this.old_customer = false;
        this.mobile_error = "Please enter valid mobile number";
        this.$store.state.list.g_customer_id = "";
      }
    },
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
                response.data.data.grand_total;
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
              this.shiping_charges = response.data.data.shipping_charge;
              this.cod_charges = response.data.data.cod_charge;
              this.mloyal_point = response.data.data.mloyal_point;
              this.mloyal_amount = response.data.data.mloyal_amount;

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
      }
    },
  },
  watch: {
    otp_number: {
      handler: async function (after, before) {
        var otpno = /^\d*(?:\.\d{1,2})?$/;
        if (this.otp_number.match(otpno)) {
          this.otp_error = "";
          if (this.otp_number.length == "4") {
            this.$store.state.list.page_loader = true;
            this.otp = true;
            this.$store.state.list.error_message = "";
            this.$store.state.list.success_message = "";
            this.$store.state.list.customer_id = null;
            var form = new FormData();
            form.append("phone", this.mobile_number);
            form.append("cart_id", this.$store.state.list.cart_id);
            form.append("cart_session", this.$store.state.list.cart_session);
            form.append("otp", this.otp_number);
            let config = { headers: { "Content-Type": "multipart/form-data" } };
            await axios
              .post(
                this.$store.state.list.cart_api_url+'/v1' + "/customer/validate-otp",
                form,
                config
              )
              .then((response) => {
                if (response.data.success === true) {
                  this.$store.state.list.page_loader = false;
                  this.get_cart();
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
                  }
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_customer",
                    response.data.data.customer.id,
                    "1y"
                  );
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_cus_sess",
                    response.data.data.customer_session,
                    "1y"
                  );
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_cart",
                    response.data.data.cart_id
                  );
                  this.$store.state.list.customer_id =
                    response.data.data.customer.id * 1;
                  this.$store.state.list.customer_session =
                    response.data.data.customer_session;
                  this.$store.state.list.address = response.data.data.address;
                  this.$store.state.list.cart_product =
                    response.data.data.products;
                  this.$store.state.list.capillaryAmount =
                    response.data.data.capillary_amount;
                  this.$store.state.list.customer_detail =
                    response.data.data.customer;

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
                        this.user.phone =
                          this.$store.state.list.address[0].phone;
                      }
                    }
                  }
                  if (
                    this.$store.state.list.address.length === 0 &&
                    this.$store.state.list.customer_id != null
                  ) {
                    this.page_type = "new_address_page";
                    window.dataLayer.push({
                      event: "checkout",
                      action: "Checkout",
                      ecommerce: {
                        checkout: {
                          actionField: { step: 3, option: "shipping address" },
                          product: this.$store.state.list.gtm_product,
                        },
                      },
                    });
                    this.displayCheckout = true;
                  }
                  if (
                    this.$store.state.list.address.length != 0 &&
                    this.$store.state.list.customer_id != null
                  ) {
                    this.page_type = "address";
                    window.dataLayer.push({
                      event: "checkout",
                      action: "Checkout",
                      ecommerce: {
                        checkout: {
                          actionField: { step: 3, option: "shipping address" },
                          product: this.$store.state.list.gtm_product,
                        },
                      },
                    });
                    window.dataLayer.push({
                      event: "Login",
                      category: "Login",
                      action: "Login Success",
                    });
                    window.dataLayer.push({
                      event: "Login_status",
                      category: "Login_status",
                      action: "Login Success",
                      Mobile_no: this.$store.state.list.customer_detail.phone,
                      Email: this.$store.state.list.customer_detail.email,
                    });
                    this.displayCheckout = true;
                  }
                } else {
                  this.$store.state.list.success_message = "";
                  this.$store.state.list.page_loader = false;
                  this.$toast.error(response.data.message, {
                    position: "top-center",
                    duration: 4000,
                  });
                  this.$store.state.list.customer_id = "";
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
                    window.dataLayer.push({
                      event: "Login",
                      category: "Login",
                      action: "Login Failure",
                      label: response.data.message,
                    });
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
            this.otp = false;
          }
        } else {
          this.otp = false;
          this.otp_error = "Please enter valid OTP";
        }
      },
    },
  },
  async mounted() {
    this.checkLoyalty = false;

    if (this.$route.query.cart) {
      this.getCheckoutCart(this.$route.query.cart);
    }

    if (this.$route.query.sku) {
      this.getCartSession(this.$route.query.sku);
    }
    if (this.$route.query.gc && this.$route.query.gc == 1) {
      this.g_checkout_page = true;
    }
    this.$store.state.list.cart_id = $cookies.get(
      window.location.hostname.substring(10, 4) + "_cart"
    );
    this.$store.state.list.cart_session = $cookies.get(
      window.location.hostname.substring(10, 4) + "_ct_sess"
    );
    await this.get_account();
    await this.get_cart();
    this.user.pin_code = $cookies.get(
      window.location.hostname.substring(10, 4) + "_pin"
    );
    if (this.user.pin_code != "") {
      await this.user_pin_code();
    }
    this.$store.state.list.error_message = "";
    this.$store.state.list.success_message = "";
    if (this.$store.state.list.address != "") {
      this.user.phone = this.$store.state.list.address[0].phone;
    }
    if (this.$route.query.error) {
      this.$toast.error(this.$route.query.error, {
        position: "top-center",
        duration: 6000,
      });
    }
    if (
      this.$store.state.list.cart_id == null ||
      this.$store.state.list.cart_id == "" ||
      this.$store.state.list.cart_id == "undefined"
    ) {
      if (this.$route.query.sku || this.$route.query.cart) {
      } else {
        this.$router.push("/cart");
      }
    }
    // call pay options api
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
      });
  },
  created() {
    if (
      this.$store.state.list.customer_id == null ||
      this.$store.state.list.customer_id == ""
    ) {
      this.page_type = "login";
      /*  setTimeout(() => window.dataLayer.push({
            event: 'checkout',
            action: 'Checkout',
            ecommerce: {
                checkout: {
                    'actionField': { 'step': 2, 'option': 'Login / Checkout as Guest' },
                    product: this.$store.state.list.gtm_product,
                    mobile: this.mobile_number,
                }
            }
        }), 1000); */
      this.displayCheckout = true;
    }
  },
};
</script>
<style scoped>
.hover {
  cursor: pointer;
}
.hover:hover {
  text-decoration: underline;
  color: blue;
}
.cart-summary {
  background-color: var(--body-ancient-color) !important;
}
.discount-color {
  color: var(--card-discount-color) !important;
}
.checkout-cart {
  background-color: var(--primary) !important;
  border-color: var(--primary) !important;
  box-shadow: none;
  border-radius: var(--btn-border-radius);
  color: white;
}

.payment-method.payu .payment-method-title {
  background-position: 30px center !important;
  background-size: 35px !important;
}

.payment-method-prepaid,
.payment-method-cod {
  width: 100%;
  background: #fafafa;
  border-radius: 2px;
  padding: 0px;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
}
.payment-method-prepaid .payment-method,
.payment-method-cod .payment-method {
  background: #fff;
  padding: 0;
}
.payment-method.payu .payment-method-title {
  background-position: 30px center !important;
  background-size: 42px !important;
}

.payment-method .payment-method-action {
  display: none;
}
.payment-method.active .payment-method-action {
  display: block;
}
.payment-method .payment-method-title label.label {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: inherit;
  margin: 0;
  line-height: 20px;
  padding-left: 90px;
  cursor: pointer;
  text-align: left;
  font-weight: normal;
  vertical-align: top;
  font-size: 14px;
  display: table;
  height: 40px;
}
.payment-method .payment-method-title label.label span {
  display: table-cell;
  vertical-align: middle;
}

.payment-method .payment-method-title label.label .delivery-message.payu,
.payment-method .delivery-message-mobile.payu {
  color: #00c700;
}
.payment-method .payment-method-title label.label .delivery-message.cod,
.payment-method .delivery-message-mobile.cod {
  color: #222;
}
.payment-method .payment-method-title label.label .delivery-message.cod .green,
.payment-method .delivery-message-mobile.cod .green {
  color: #00c700;
}
.forMobile {
  display: none !important;
}
.forDesktop {
  display: block;
}
.container {
  width: 100%;
  max-width: 1524px;
  padding: 0;
}

.address-box {
  max-width: 600px;
  margin: 10px auto !important;
  width: 100%;
}

@media screen and (min-width: 1100px) {
  .new-address-form {
    max-width: calc(100% - 300px);
    margin: auto;
  }
}
.apperence {
  appearance: auto;
}

/* new css */
.new_payment-method {
  position: relative;
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
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #666;
}
.new_payment-method p [type="radio"]:checked + label:before,
.new_payment-method p [type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #ddd;
  border-radius: 100%;
  background: #fff;
}
.new_payment-method.active p [type="radio"]:checked + label:after,
.new_payment-method.active p [type="radio"]:not(:checked) + label:after {
  content: "";
  width: 12px;
  height: 12px;
  background: var(--bs-primary);
  position: absolute;
  top: 3px;
  left: 3px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
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
@media screen and (max-width: 767px) {
  .address_btn {
    margin: 0 !important;
  }
  ul.opc-progress-bar {
    padding: 0 !important;
    display: inline-flex;
    margin: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
