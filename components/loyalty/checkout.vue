<template>
  <div class="payment-method-section opc-section" v-show="amount > this.min_value" >
    <div class="new_payment-method-section" v-if="total_points > 0">
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
      >
            
      <div class="w-100">
        <div class="row ">
          <div class="col-1 text-center mr-0 pr-0 checkbox_padding">
            <input class="form-check-input " type="checkbox" value="" @click="applyLoyalty()" v-model="checked" id="flexCheckCheckedDisabled" >
          </div>
          <div class="col-5 pl-0">
            LOYALTY<br/>              
            <span>Total Available Points: {{ total_points }}</span>
          </div>    

          <div class="col-6 text-end">
            REDEEM
            <br/>   
            <span @click="changePoint">Change</span>    
            <span style="color:green"><i class="kartmax_currency"></i>  {{ total_amount }}</span> {{isUpdating ? 'updating ... ' : ''}}
            <br/>
            <span class="info">Maximum redeem points are {{max_point}}</span>    

          </div>
        </div>
      </div>
        
        </div>

      <div
        id=""
        class="modal"
        v-bind:class="[this.popupLoyalty ? 'd-block' : ' ']"
      >
        <div class="modal-dialog w-18">
          <div class="modal-content ">
            <div class="modal-header">
              <span class="modal-title font-bold">
                <label v-if="changeAmount == false">PLEASE ENTER OTP</label>
                <label v-else>PLEASE ENTER POINTS</label>

                <br />
                <span class="loyalty-point">Redeem Loyalty points</span>
              </span>
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
                    <div class="input-group input-group-sm mb-3">
                        <input type="text" class="form-control text-border" v-model="otp" v-if="changeAmount==false" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                        <input type="text" class="form-control text-border"  @keyup="check_amount" v-model="points" placeholder="enter your point" v-else aria-label="Small" aria-describedby="inputGroup-sizing-sm">
                        <div class="input-group-prepend"> 
                            <span class="input-group-text bg"  v-if="changeAmount==false" id="inputGroup-sizing-sm" @click="redeem">Redeem</span>
                            <span class="input-group-text bg" v-else id="inputGroup-sizing-sm" @click="applyLoyalty">Send OTP</span>
                        </div>
                    </div>
                        <span class="text-danger">{{amount_error}}</span>

                    <span v-if="changeAmount==false" class="otp-bg" id="inputGroup-sizing-sm" >Resend otp</span>
              </div>
              <!-- <div class="w-100 text-end">
                <button
                  class="btn btn-primary form-control w-25"
                  
                >
                  Submit
                </button>
              </div> -->
            </div>
          </div>
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
  props:['amount'],
  data: function () {
    return {
      total_points: 0,
      openPopup:true,
      popupLoyalty:false,
      total_amount:0,
      changeAmount:false,
      isUpdating: false,
      points:0,
      checked:false,
      otp:'',
      max_point:0,
      min_value:0,
      amount_error:'',
    };
  },
  async beforeMount() {},
  async mounted() {
    var form = new FormData();
    form.append("customer_id", this.$store.state.list.customer_id);
    form.append("customer_session", this.$store.state.list.customer_session);
    axios
      .post(
        this.$store.state.list.api_url +
          "/api/cart/v1/customer/get-loyalty",
        form
      )
      .then((response) => {
        if (response.data.success) {
          this.total_points = response.data.data.total_points;
          this.total_amount = this.total_points/response.data.data.price_per_unit;
          this.max_point = response.data.data.max_redeemable_points;
          this.min_value = response.data.data.min_cart_value
        }
      });
  },
  methods: {
      check_amount(){
        if(this.points >this.max_point ){
          return this.amount_error = `Max redeem points are ${this.max_point}`
        }else{
          this.amount_error = ''
        }
      },
      close_popup(){
        this.popupLoyalty = false;
        this.checked=false;
        this.points=0

      },
      changePoint(){
        this.changeAmount = true;
        this.popupLoyalty = true
      },
    async applyLoyalty() {
      if (this.isUpdating) {
        return;
      }
      if(this.amount_error == ''){

      this.isUpdating = true;
      this.$store.state.list.page_loader = true;
      let point =this.points>0?this.points:this.total_points
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      form.append("requested_points",point)
      await axios
        .post(
          this.$store.state.list.api_url + "/api/cart/v1/order/request-loyalty-redeem",
          form
        )
        .then((response) => {
          this.isUpdating = false;
            this.$store.state.list.page_loader = false;
          if(response.data.success) {
              this.popupLoyalty = true
              this.changeAmount = false;
              this.checked = false
           
          }
          this.$emit('updatedata')
        }).catch(err=>{
          console.log(err.response)
          this.checked = false
           this.$toast.error(err.response.data.message, {
            position: "top-center",
            duration: 4000,
          });
          this.isUpdating = false;
          this.$store.state.list.page_loader = false;
          return;
        })
      }
    },
    async redeem(){
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      form.append("requested_points",this.points>0?this.points:this.total_points)
      form.append("redeem_otp",this.otp)
      await axios
        .post(
          this.$store.state.list.api_url + "/api/cart/v1/order/loyalty-redeem",
          form
        ).then(res=>{
            this.get_cart()
            this.close_popup()

        })
        .catch(err=>{
              this.$toast.error(err.response.data.message, {
                position: "top-center",
                duration: 4000,
              });
            this.close_popup()
        })
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
}
.w-18{
    width: 18% !important;
    top: 30%;
  
}
.bg{
    background-color:var(--bs-primary);
  color: white;
  cursor: pointer;

}
.otp-bg{
    color: var(--bs-primary);
    position: absolute;
    left: 36%;
    font-size: 10px;
    bottom: 50%;
    cursor: pointer;
}
.text-border{
    border-right: 0px;
    border-radius: 0px;
    }
.loyalty-point{
    font-size: 12px;
    text-align: center;
    display: inherit;
}
.info{
  font-size: 12px;
  color: green;
  cursor: auto;
}
@media (max-width: 768px) {
.w-18{
    width: 96% !important;
    top: 30%;
  
}
.credit{
  margin: 10px 0;
  font-size: 14px ;
}
}
.checkbox_padding{
    padding-top:4%;
  }
</style>


