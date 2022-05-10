<template>
  <div class="payment-method-section opc-section" v-show="total_credits > 0">
    <div class="new_payment-method-section" v-if="total_credits > 0">
      <div
        class="
          new_payment-method
          border
          py-2
          px-3
          d-flex
          align-items-center
          justify-content-between
      
          flex-wrap
      
          active
          cursor-pointer
          credit
        "
        @click="applyCredits()"
      >
        <div class="w-100" v-if="this.$store.state.list.store_credits_used == 0 || this.$store.state.list.store_credits_used == null">
              <div class="row ">
                    <!-- <div class="col-1 text-center mr-0 pr-0">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked>
                  </div>   -->
                  <div class="col-1 text-center mr-0 pr-0 checkbox_padding">
                    <input class="form-check-input " type="checkbox" value="" @click="applyCredits()" v-model="checked" id="flexCheckCheckedDisabled" >
                  </div>
                  <div class="col-5 pl-0">
                    STORE CREDITS<br/>              
                    <span>Total: {{ total_credits }}</span>
                    </div>    

                <div class="col-6 text-end">
                  Usable Credits: {{ usable_credits }}
                  <br/>       
                  Usable Amount: ₹ {{ usable_amount }} {{isUpdating ? 'updating ... ' : ''}}
                </div>
            </div>
        </div>
          <div class="m-0 w-100 row" v-else>
            
             <div class="col-1 text-center mx-0  px-0">
                    <input class="form-check-input px-0" type="checkbox" value="" @click="applyCredits()"  :checked="this.$store.state.list.store_credits_used" id="flexCheckCheckedDisabled" >
                  </div>

            <div class="col-11"> Used Credits: {{this.$store.state.list.store_credits_used }} </div>
          </div>
        
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import  {modifyMixin} from "../../mixin.js"

export default {
  mixins:[modifyMixin],
  data: function () {
    return {
      used_credit: "",
      total_credits: 0,
      usable_credits: 0,
      usable_amount: 0,
      isUpdating: false,
      checked:false,

    };
  },
  async beforeMount() {},
  async mounted() {
    var form = new FormData();
    form.append("cart_id", this.$store.state.list.cart_id);
    form.append("cart_session", this.$store.state.list.cart_session);
    form.append("customer_id", this.$store.state.list.customer_id);
    form.append("customer_session", this.$store.state.list.customer_session);
    axios
      .post(
        this.$store.state.list.api_url +
          "/api/cart/v1/customer/store-credits",
        form
      )
      .then((response) => {
        if (response.data.success) {
          this.total_credits = response.data.data.total_credits;
          this.usable_credits = response.data.data.usable_credits;
          this.usable_amount = response.data.data.usable_amount;
        }
      });
  },
  methods: {
    async applyCredits() {
      if (this.isUpdating) {
        return;
      }
      this.isUpdating = true;
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("cart_session", this.$store.state.list.cart_session);
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      await axios
        .post(
          this.$store.state.list.api_url + "/api/cart/v1/order/apply-credits",
          form
        )
        .then((response) => {
          this.isUpdating = false;
            this.$store.state.list.page_loader = false;

          if(response.data.success) {
            if (response.data.data.is_store_credit_applied) {
              this.$store.state.list.store_credits_used = response.data.data.store_credit_used;
              this.$store.state.list.store_credits_discount_amount =
                response.data.data.store_credit_discount_amount;
                this.checked = true

            } else {
              this.$store.state.list.store_credits_discount_amount = null;
              this.$store.state.list.store_credits_used = null;
              this.checked = false

            }

            this.$store.state.list.cart_subtotal =
              response.data.data.order_subtotal;
            this.$store.state.list.discount_code =
              response.data.data.discount_code;
            this.$store.state.list.discount_amount =
              response.data.data.discount_amount;
            this.$store.state.list.cart_total =
                response.data.data.net_amount;
          }

          this.get_cart()
          this.$emit('updatedata')
        });
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.credit{
  background-color: #F7F7F7;
  margin: 10px 0;
  font-size: 14px ;
}
.checkbox_padding{
    padding-top:2%;
  }

  @media (max-width: 768px) {

.credit{
  margin: 10px 0;
  font-size: 14px ;
}
}
</style>
