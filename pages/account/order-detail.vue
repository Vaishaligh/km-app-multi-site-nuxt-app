<template>
  <div>
    <div class="container-fluid my-account pt-5">
      <div class="row">
        <div class="col-md-12">
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
        </div>
        <div class="col-md-3">
          <Sidebar />
        </div>

        <div class="col-md-9 cart-container">
          <div class="row p-0 m-0">
            <div class="col-12 text-left">
              <h5 class="main-heading py-2 border-bottom">
                Order details
                <span
                  v-text="'(' + this.order_no + ')'"
                  class="order-no font-bold"
                ></span>
                <button
                  class="order-with-cod btn btn-info btn-sm ms-2"
                  v-if="this.showCOD == 1"
                  @click="order_with_cod(order_id)"
                >
                  Reorder with <span>CASH ON DELIVERY</span>
                </button>
                <span class="reordeMobile">
                  <!-- <button class="order-with-cod reorder" v-if="this.showCOD != 1" @click="reorder(order_id)">Reorder</button>  -->
                    <!-- <div class="text-end">
                      <button
                        class="btn btn-danger me-2 btn-sm"
                        v-show="this.is_Cancelable == 0"
                        @click="order_cancel(order_no)"
                      >
                        Cancel Order
                      </button>
                    </div> -->
                </span>
              </h5>
              <div class="row mb-1 kartmax-text-f-14">
                <div class="col-md-4 col-sm-6 col-12 content-box">
                  <p>
                    <span class="font-bold">Shipping Method</span><br />
                    Shipping -
                    <span
                      v-if="
                        this.shipping_charge != '0' &&
                        this.shipping_charge != '' &&
                        this.shipping_charge != null
                      "
                      ><i class="kartmax_currency"></i> {{ shipping_charge }}</span
                    ><span v-else>Free</span>
                  </p>
                </div>
                <div class="col-md-4 col-sm-6 col-12 content-box">
                  <p>
                    <span class="font-bold">Ship To</span><br />
                    {{ this.shipping_address.name }}<br />
                    {{ this.shipping_address.address }}<br />
                    {{ this.shipping_address.area }},
                    {{ this.shipping_address.city }},
                    {{ this.shipping_address.state }},
                    {{ this.shipping_address.pincode }}<br />
                    T: {{ this.shipping_address.phone }}
                  </p>
                </div>
                <div class="col-md-4 col-sm-6 col-12 content-box">
                  <p>
                    <span class="font-bold">Payment Method</span><br />
                    <span style="text-transform: uppercase">{{
                      this.payment_method == "cod"
                        ? " Cash On Delivery"
                        : this.payment_method
                    }}</span>
                  </p>
                  <p>
                    <span class="font-bold">Order Date</span><br />
                    <span style="text-transform: uppercase">{{
                      this.order_date
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="col-12 cart-table content-box"
              style="-ms-flex: 0 0 100%; flex: 0 0 100%; max-width: 100%"
            >
              <table class="table cart table responsive-table">
                <thead>
                  <tr>
                    <th class="item"><span>Item</span></th>
                    <th class="price"><span>Price</span></th>
                    <th class="qty"><span>Qty</span></th>
                    <th class="discount"><span>Discount</span></th>
                    <th class="subtotal"><span>Charges</span></th>
                    <th class="subtotal"><span>Total</span></th>
                    <th class="status"><span>Status</span></th>
                    <!-- <th v-if="checkIfShipped" class="action text-center">
                      <span>Action</span>
                    </th> -->
                    <th class="action text-center">
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="cart-item" v-for="items in products">
                  <tr class="item-info">
                    <td class="item w-40">
                      <div class="row">
                        <div class="col-md-2 col-4 order_image">
                          <nuxt-link :to="{ path: '/product/' + items.url_key }">  <img
                            :src="
                            $store.state.list.image_url+'400x0/' +
                              items.image
                            "
                            :alt="items.name"
                            :title="items.name"
                            class="item-photo w-100"
                          />
                          </nuxt-link> 
                        </div>
                        <div class="col-md-10 col-8 mobile-design">
                           <nuxt-link :to="{ path: '/product/' + items.url_key }"><h6 class="item-name my-1" v-text="items.name"></h6>
                          </nuxt-link> 
                          
                          <p
                            class="
                              d-flex
                              flex-row
                              font-small-bold
                              span-width
                              m-0
                            "
                          >
                            <span> SKU:</span>
                            <span v-text="items.master_sku"></span>
                          </p>
                          <p
                            v-if="items.invoice_no"
                            class="
                              d-flex
                              flex-row
                              font-small-bold
                              span-width
                              m-0
                              kartmax-text-f-14
                            "
                          >
                            <span class="font-small">Invoice No:</span>
                            <span v-text="items.invoice_no"></span>
                          </p>
                          <p
                            v-if="items.rto_invoice_no"
                            class="
                              d-flex
                              flex-row
                              font-small-bold
                              span-width
                              m-0
                              kartmax-text-f-14
                            "
                          >
                            <span class="font-small">RTO Invoice No:</span>
                            <span v-text="items.rto_invoice_no"></span>
                          </p>
                          <p
                            class="
                              d-flex
                              flex-row
                              font-small-bold
                              span-width
                              m-0
                              kartmax-text-f-14
                            "
                          >
                            <span class="text-sm">Size:</span>
                            <span v-text="items.size"></span>
                          </p>
                          <p
                            v-if="items.awb_number"
                            class="
                              d-flex
                              flex-row
                              font-small-bold
                              span-width
                              m-0
                              kartmax-text-f-14
                            "
                          >
                            <span class="font-small">AWB No:</span>
                            <span v-text="items.awb_number"></span>
                          </p>
                          <p
                            v-if="items.courier"
                            class="
                              d-flex
                              flex-row
                              font-small-bold
                              span-width
                              m-0
                              kartmax-text-f-14
                            "
                          >
                            <span class="font-small">Courier:</span>
                            <span v-text="items.courier"></span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="price w-price">
                      <p class="kartmax-text-f-14">
                        <i class="kartmax_currency"></i> {{ items.price    }}
                      </p>
                    </td>

                    <td class="qty">
                      <div class="control kartmax-text-f-14">
                        <p v-text="items.qty"></p>
                      </div>
                    </td>
                    <td
                      class="discount"
                    >
                      <p class="kartmax-text-f-14">
                        <i class="kartmax_currency"></i>
                        {{
                            items.item_details.w_discount
                        }}
                      </p>
                    </td>
                     <td
                      class="discount"
                    >
                      <p class="kartmax-text-f-14">
                        <i class="kartmax_currency"></i>
                        {{
                            items.item_details.w_tax
                        }}
                      </p>
                    </td>
                  
                    <td class="subtotal">
                      <p class="kartmax-text-f-14">
                        <i class="kartmax_currency"></i>
                        {{
                            items.item_details.w_product_cost
                        
                        }}
                      </p>
                    </td>
                    <td class="status">
                      <p class="kartmax-text-f-14">
                        <span>{{
                          modify(items.item_status)
                        }}</span>
                      </p>
                      <p
                        style="margin-top: -10px; color: #c5c5c5"
                        v-if="items.item_status == 'DELIVERED'"
                      >
                        <small v-text="items.delivery_date"></small>
                      </p>
                    </td>
                    <td
                      class="action" v-if="items.item_details !==null"
                    >
                    <button   v-if="items.item_details.tracking_url != '' && items.item_details.tracking_url != null" class="btn btn-primary btn-sm" @click="trackOrder(items.item_details.tracking_url)">
                          Track
                    </button>
                      <a
                       v-show="items.item_status == 'km_order_confirmed' && items.is_cancelled == 0"
                        href="#"
                        @click.prevent="
                          order_cancel_with_item(order_no, items.item_id, items.sku)
                        "
                        class="btn btn-danger mt-2 btn-sm"
                        >Cancel</a
                      > 
                      <a
                          href="#"
                           v-if="items.is_returnable == true && (items.item_status == 'KM_ORDER_DELIVERED' ||  items.item_status == 'km_order_delivered')"
                            @click.prevent="
                              order_return(
                                items
                              )
                            "
                            class="reorder btn btn-primary btn-sm mt-1"
                            >Return</a
                          >
                        <a
                          href="#"
                           v-if="items.is_exchangable == 1 && (items.item_status == 'KM_ORDER_DELIVERED' ||  items.item_status == 'km_order_delivered')"
                            @click.prevent="
                               order_exchange(
                                items
                              )
                            "
                            class="reorder btn btn-primary btn-sm mt-1"
                            >Exchange</a
                          >
                    </td>
                  
                  </tr>
                </tbody>
              </table>

              <div
                id="status_modal"
                class="modal"
                v-bind:class="[status_popup ? '' : 'active']"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title font-bold">Shipment Status</h4>
                      <button
                        type="button"
                        class="close"
                        @click="close_popup()"
                      >
                        ×
                      </button>
                    </div>
                    <div class="modal-body">
                      <table class="table table-border status_table">
                        <thead>
                          <tr>
                            <th style="text-align: center">Location</th>
                            <th style="text-align: center">Item Status</th>

                            <th style="text-align: center">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="status in itemstatus">
                            <td style="text-align: center">
                              {{ status.Location }}
                            </td>
                            <td style="text-align: center">
                              {{ status.Remarks }}
                            </td>

                            <td style="text-align: center">
                              {{ status.Time | formatDate }}
                            </td>
                          </tr>
                          <!-- <tr>
                                            <td colspan="2" style="text-align: center;"><a  :href="'https://shiprocket.co/tracking/'+this.itemtrackid" v-if="itemtrackid != null && itemtrackid != ''" target="blank" style="text-align: center; display: inline-block; margin: 10px 0 0 0;"><button class="order-with-cod reorder no-margin" style="width: auto; padding: 10px 10px; float: none;">View More</button></a></td>
                                        </tr> -->
                        </tbody>
                      </table>
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
                        Cancel Order - <span class="f-16">{{ this.canceledItem }} , {{item_id}}</span>
                      </h4>
                      <button
                        type="button"
                        class="close btn"
                        @click="close_popup()"
                      >
                        ×
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="reason-container m-2">
                        <div class="row mb-2">
                          <select
                            class="input-text form-control"
                            v-model="cancelReason"
                            required
                          >
                            <option value="">--Select Cancel Reasons--</option>
                            <option :value="reason" v-for="(reason,i) in cancel_reasons" :key="i"> {{reason}}</option>
                          </select>
                        </div>
                        <!-- <div
                          v-if="payment_method == 'cod' || payment_method == 'COD' "
                        >
                          <div class="row mb-2">
                            <label for="form-label">Account Holder Name</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter account holder name"
                              v-model="cancel_reason.account_holder_name"
                            />
                          </div>
                          <div class="row mb-2">
                            <label for="">Account Number</label>
                            <input
                              type="number"
                              min="0"
                              oninput="this.value = Math.abs(this.value)"
                              class="form-control"
                              placeholder="Enter account number"
                              v-model="cancel_reason.account_number"
                            />
                          </div>
                          <div class="row mb-2">
                            <label for="">Bank Name</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter bank name"
                              v-model="cancel_reason.bank"
                            />
                          </div>
                          <div class="row mb-2">
                            <label for="">IFSC Code</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter ifsc code"
                              v-model="cancel_reason.ifsc"
                            />
                          </div>
                        </div> -->

                        <p style="color: red; font-size: 13px">
                          {{ cancel_error }}
                        </p>
                      </div>

                      <button
                        v-if="item_id == null"
                        class="btn btn-primary"
                        @click="cancelorder(canceledItem)"
                      >
                        Submit
                      </button>
                      <button
                        v-else
                        class="btn btn-primary"
                        @click="cancelorderwithitem(order_id, item_id)"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="thankyou-total  mb-3">
                <p class="my-1 kartmax-text-f-14">
                  <strong>Subtotal : </strong>
                  <span class="price">
                    <i class="kartmax_currency"></i>
                    <span id="cart_subtotal">{{
                      this.sub_total   
                    }}</span></span
                  >
                </p>
                <p class="my-1 kartmax-text-f-12" v-if="this.discount_amount>0">
                  <strong>Coupon Discount :</strong>
                  <span class="price discount-color">
                    <i class="kartmax_currency"></i>
                    <span id="cart_discount">{{
                      this.discount_amount   
                    }}</span></span
                  >
                </p>

                <p v-if="this.mloyal_amount > 0" class="my-1 kartmax-text-f-12">
                  <strong>Loyalty Discount :</strong>
                  <span class="price discount-color">
                    - <i class="kartmax_currency"></i>
                    <span id="cart_discount" v-text="this.mloyal_amount"></span
                  ></span>
                </p>
                <p v-if="this.gateway_discount > 0" class="my-1 kartmax-text-f-12">
                  <strong>Prepaid Discount :</strong>
                  <span class="price">
                    <i class="kartmax_currency"></i>
                    <span
                      id="cart_discount"
                      v-text="this.gateway_discount"
                    ></span
                  ></span>
                </p>
                <p v-if="this.codprepaid > 0" class="my-1 kartmax-text-f-12">
                  <strong>Prepaid Amount :</strong>
                  <span class="price">
                    <i class="kartmax_currency"></i> <span id="cart_discount" v-text="this.codprepaid"></span
                  ></span>
                </p>

                <p
                  class="my-1 kartmax-text-f-12"
                  v-if="
                    shipping_charge != '0' &&
                    shipping_charge != '' &&
                    shipping_charge != null || shipping_charge>0
                  "
                >
                  <strong>Shipping charge :</strong>
                  <span class="price">
                    <i class="kartmax_currency"></i> {{ shipping_charge    }}</span
                  >
                </p>
                <p
                  class="my-1 kartmax-text-f-12"
                  v-if="tax>0"
                >
                  <strong>Taxes :</strong>
                  <span class="price">
                    <i class="kartmax_currency"></i> {{ tax    }}</span
                  >
                </p>
                 <p
                  class="my-1 kartmax-text-f-12"
                  v-if="
                    express_charge != '0' &&
                    express_charge != '' &&
                    express_charge != null || express_charge>0
                  "
                >
                  <strong>Express Delivery charge :</strong>
                  <span class="price">
                    <i class="kartmax_currency"></i> {{ express_charge    }}</span
                  >
                </p>
                <p
                  class="my-1 kartmax-text-f-12"
                  v-if="
                    cod_charge != '0' && cod_charge != '' && cod_charge != null
                  "
                >
                  <strong>COD charge :</strong>
                  <span class="price"> <i class="kartmax_currency"></i> {{ cod_charge    }}</span>
                </p>
                 <p class="my-1 kartmax-text-f-12" v-if="this.store_credit_used >0">
                  <strong>Credit Used:</strong>
                  <span class="price">
                  <i class="kartmax_currency"></i>
                    <span id="grand_subtotal">{{
                      this.store_credit_used   
                    }}</span></span
                  >
                </p>
                <p class="my-1 kartmax-text-f-16">
                  <strong>Net Amount :</strong>
                  <span class="price">
                    <i class="kartmax_currency"></i>
                    <span id="grand_subtotal">{{
                      this.net_amount   
                    }}</span></span
                  >
                </p>
               
              </div>
           

            </div>
          </div>
        </div>
      </div>
      <!-- exchange model start here  -->
       <div
          id="return_modal"
          class="modal exchange-modal"
          v-bind:class="[this.exchange_popup ? 'd-block' : '']"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title font-bold">Request Exchange </h4>
                <button type="button" class="btn" @click="close_popupR()">
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
                            <p v-text="sub_total"></p>
                          </div>
                        </td>
                         <td class="qty">
                          <div class="control kartmax-text-f-14">
                            <p v-text="this.order_date"></p>
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
      <!-- exchange model end here  -->

       <div
          id="return_modal"
          class="modal"
          v-bind:class="[this.return_popup ? 'd-block' : '']"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title font-bold">Request Return </h4>
                <button type="button" class="btn" @click="close_popupR()">
                  ×
                </button>
              </div>
              <div class="modal-body">
              <table class="table">
                <tbody>
                  <tr v-if="this.return_popup == true">
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
       </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "./sidebar";
import Vue from "vue";
import VueCookies from "vue-cookies";
import  {modifyMixin} from "../../mixin.js"
Vue.use(VueCookies);
export default {
  mixins:[modifyMixin],
  name: "order-detail",
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
  metaInfo() {
    return {
      title: "Order detail",
      meta: [
        { hid: "description", name: "description", content: "Ketch" },
        {
          property: "keywords",
          content: "Ketch",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://" + location.host + this.$route.fullPath,
        },
      ],
    };
  },
  computed: {
    isInvoice() {
      let isInvoice = false;
      this.products.forEach((x) => {
        if (x.invoice_no) isInvoice = true;
      });
      return isInvoice;
      // return true
    },
    checkIfShipped() {
      var isShow = false;
      this.products.forEach((element) => {
        if (element.awb_number != null || this.is_Cancelable == 0) {
          if (element.invoice_no == null && element.is_shipped == 0) {
            return (isShow = true);
          }
        }
      });
      return isShow;
    },
  },
  data() {
    return {
      qty:'',
      size:'',
      exchange_comment:'',
      size_error:'',
      express_charge:'',
      variation:'',
      store_credit_used:'',
      products: [],
      payment_method: "",
      order_no: "",
      status: "",
      total: "",
      net_amount: 0,
      sub_total: "",
      mloyal_amount: 0,
      item_id: null,
      discount_amount: 0,
      gateway_discount: 0,
      codprepaid: 0,
      shipping_charge: "",
      cod_charge: "",
      is_Cancelable: "",
      order_date: "",
      showCOD: "",
      shipping_address: {
        name: "",
        address: "",
        pincode: "",
        area: "",
        city: "",
        state: "",
        phone: "",
      },
      canceledItem: "",
      cancel_popup: true,
      cancel_reason: {
        options: "",
        account_holder_name: "",
        account_number: "",
        bank: "",
        ifsc: "",
      },
      cancel_error: "",
      statusItem: "",
      status_popup: true,
      itemstatus: [],
      itemtrackid: "",
      cancel_reasons:[],
      cancelReason:'',
      select_resion:'',
      return_reasons:[],
      return_comment:'',
      latestorder:'',   
      exchange_popup:false,
      exchange_order:{},
      return_popup:false,tax:0,
       ac_holder_name:'',ac_holder_name_error:'',ac_number:'',ac_number_error:'',re_ac_number:'',re_ac_number_error:'',bank_name:'',
       bank_name_error:'',branch_name:'',branch_name_error:'',ac_ifsc_code:'',ifsc_code_error:'',
       };
       
  },
  methods: {
    exhangeSize(size){
      this.exchange_order.size =  size
    },
    order_exchange(item){
      this.exchange_order = item
      this.openExchange(this.exchange_order.url_key)
      this.exchange_popup = true;
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
    request_exchange(order) {
      event.preventDefault();
    if (this.select_resion === "" || this.select_resion === null) {
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
          form.append("order_id", this.order_no);
          form.append("item_id", order.item_id);
          form.append("name", order.name);
          form.append("customer_id", this.$store.state.list.customer_id);
          // form.append(
          //   "customer_session",
          //   this.$store.state.list.customer_session
          // );

          if(this.size==''){
            this.size = order.size
          }
          for(let i=0;i<this.variation.length;i++){
            if(this.variation[i][1].size == this.size){
              this.selectedSize =  this.variation[i][1]
            }
          }
          
          form.append("qty", order.qty);
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
                this.get_order(1, true, true);
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

   order_return: function(item) {
       this.latestorder = item
       this.account_info = item.accountInfo;
       this.return_popup = true;
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
                this.get_order(1, true, true);
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
     close_popupR() {
      this.return_popup = false;
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
    clear_cancel_reason() {
      this.cancelReason = "";
      this.cancel_reason.account_holder_name = "";
      this.cancel_reason.account_number = "";
      this.cancel_reason.bank = "";
      this.cancel_reason.ifsc = "";
    },
    close_popup() {
      this.cancel_popup = true;
      this.status_popup = true;
      this.cancel_reason = '';
      this.cancelReason = ''
      this.item_id = null;
    },
    order_cancel(cancelitem) {
      this.cancel_popup = false;
      this.canceledItem = cancelitem;
      this.cancelReason = "";
    },
    reorder(cart_id) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart_id", cart_id);
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(this.$store.state.list.cart_api_url+'/v1' + "/order/re-order", form)
        .then((response) => {
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
        .catch((error) => {
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
        .then((response) => {
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
        .catch((error) => {
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
    order_cancel_with_item(order_id, id,sku) {
      this.cancel_popup = false;
      this.canceledItem = order_id;
      this.item_id = id;
      this.cancelReason = "";
      this.cancel_error = "";
      this.cancelSku = sku
    },
    cancelorderwithitem(orderquoteid, item_id) {
      if (
        this.cancelReason === "" ||
        this.cancelReason === null
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
          if(this.cancel_reasons[property] == this.cancelReason){
             this.reason_index = `${property}`
          }
        }
        form.append("order_quote_id", orderquoteid);
        form.append("cancelled_by", 1);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append("item_id", item_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        form.append("order_cancel_reason", this.cancelReason);
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
              this.clear_cancel_reason();
              this.get_order();
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
      if (
        this.cancelReason === "" ||
        this.cancelReason === null
      ) {
        this.cancel_error = "Please write a reason to cancel";
        this.$toast.error("Please write a reason to cancel", {
          position: "top-center",
          duration: 4000,
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
        form.append("order_cancel_reason", this.cancelReason);

        // form.append(
        //   "account_holder_name",
        //   this.cancel_reason.account_holder_name
        // );
        // form.append("account_number", this.cancel_reason.account_number);
        // form.append("bank", this.cancel_reason.bank);
        // form.append("ifsc", this.cancel_reason.ifsc);
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/order/cancel-order",
            form
          )
          .then((response) => {
            if (response.data.success === true) {
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.clear_cancel_reason();
              this.get_order();
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
          .catch((error) => {
            this.$store.state.list.page_loader = false;
            if (error.message === "Network Error") {
              this.$store.state.list.error_message =
                "Oops there seems to be some Network issue, please try again.";
            }
          });
      }
    },
    view_status(awbNumber) {
      this.status_popup = false;
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("awb_number", awbNumber);
      // form.append("item_id",item_id);
      axios
        .post(this.$store.state.list.api_url + "/pim/tracking.php", form)
        .then((response) => {
          if (response.data.result.events) {
            this.itemstatus = response.data.result.events;
            this.status_popup = false;
            // this.itemtrackid = 69670164222;
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
        .catch((error) => {
          this.$store.state.list.page_loader = false;
          if (error.message === "Network Error") {
            this.$store.state.list.error_message =
              "Oops there seems to be some Network issue, please try again.";
          }
        });
    },
    get_order: function () {
      if (
        this.$store.state.list.customer_id != null &&
        this.$store.state.list.customer_id != ""
      ) {
        this.$store.state.list.page_loader = true;
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
        var form = new FormData();
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        form.append("order_id", this.$route.query.id);
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/customer/order-details",
            form
          )
          .then((response) => {
            if (response.data.success === true) {
              this.$store.state.list.page_loader = false;
              this.products = response.data.data.products;
              this.total = response.data.data.grand_total;
              this.net_amount = response.data.data.net_amount;
              this.store_credit_used = response.data.data.store_credit_discount_amount;

              this.sub_total = response.data.data.order_subtotal;
              // this.mloyal_amount = response.data.data.capillary_amount;
              this.gateway_discount = response.data.data.discount_gateway;
              this.codprepaid = response.data.data.prepaid_cod_amount;
              this.discount_amount = response.data.data.discount_amount;
              this.payment_method = response.data.data.payment_method;
              this.order_no = response.data.data.order_increment_id;
              this.showCOD = response.data.data.showCOD;
              this.order_id = response.data.data.order_quote_id;
              this.status = response.data.data.status;
              this.is_Cancelable = response.data.data.is_cancelable;
              this.order_date = response.data.data.order_date;
              this.shipping_charge = response.data.data.shipping_charge;
              this.tax = response.data.data.tax;

              this.express_charge = response.data.data.express_delivery_charge;

              this.cod_charge = response.data.data.cod_charge;
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
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                ""
              );
              this.$store.state.list.cart_product = [];
              this.$store.state.list.cart_id = "";
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
          .catch((error) => {
            this.$store.state.list.page_loader = false;
            if (error.message === "Network Error") {
              this.$store.state.list.error_message = error.message;
            }
            window.scrollTo(0, 0);
          });
      }
    },
    trackOrder(url){
      window.open(url, '_blank').focus();     
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
  },
  mounted() {
    this.get_order();
  },
  beforeMount() {
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
      var bodyEl = document.getElementsByTagName("body")[0];
       bodyEl.style.removeProperty("overflow");
    //  if(this.$store.state.list.customer_id === null || this.$store.state.list.customer_id === ''){
    //    this.$router.push({ path: '/', query: { redirect:this.$route.fullPath  } })
    //  }
    //  this.$store.state.list.error_message = '',
    //  this.$store.state.list.success_message = '',
    //  this.$store.state.list.breadcrumb = 'My Order',
    //  this.$store.state.list.page_loader = false;
  },
};
</script>
<style scoped>
.w-40{
  width: 40% !important;
}
@media (max-width: 768px) {
  .responsive-table td.price:before {
    /* content: "Price :"; */
  }
  .responsive-table td.qty:before {
    content: "Qty :";
  }
  .responsive-table td.discount:before {
    /* content: "Discount :"; */
  }
  .responsive-table td.subtotal:before {
    /* content: "Subtotal :"; */
  }
  .responsive-table td.status:before {
    /* content: "Status :"; */
  }
  .responsive-table td.action:before {
    content: "Action";
  }
  .responsive-table .mobile-design h6 {
    text-align: left;
    font-size: 14px;
  }
  .responsive-table .mobile-design span {
    width: calc(100% - 70px);
    display: inline-table;
    vertical-align: middle;
    text-align: left;
    font-size: 14px;
  }
  .thankyou-total p {
    margin: 0px;
    padding: 5px;
    border-bottom: 1px solid #c2c2c2;
  }
  .thankyou-total p span {
    float: right;
  }
  .main-heading {
    font-size: 16px;
  }
  .w-40{
    width: 100% !important;
  }
}

#cancel_modal.active {
  display: block !important;
}
.f-16{
  font-size: 16px;
}
.thankyou-total p {
    margin: 0;
    padding: 15px;
    border-bottom: 1px solid #c2c2c2;
}
.thankyou-total p .price{
  float: right;
  font-weight: 600;
}
.table{
  border-top:1px solid #dee2e6 !important
}
.cart-item{
  border-top:1px solid #dee2e6 !important

}

a {
     text-decoration: none
}
  .w-price{
    width:10%
  }

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
</style>
