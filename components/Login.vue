<template>
  <div>
    <div class="container-fluid checkout-main">
        <div class="row">
            <div class="container-fluid checkout-content">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12 checkout-section">
                        <!--login section start here-->
                        <div class="login-section opc-section" id="login-section">
                            <h3 class="section-title font-medium">Login</h3>
                            <form class="login-form">
                                <div class="field mobile" v-bind:class="{success : this.mobile === true , error : this.mobile_error != ''}">
                                    <!-- <label class="label"><span>Mobile Number</span></label> -->
                                    <input maxlength="10" type="tel" class="input-text form-control" placeholder="Enter Mobile Number*" autocomplete="off" v-model="mobile_number" @keyup="mobile_no" name="mobile" autofocus>
                                    <p class="size_error" v-text="mobile_error"></p>
                                </div>
                                <div class="field otp" v-bind:class="{success : this.otp === true , error : this.otp_error != ''}">
                                    <!-- <label class="label"><span>One Time Password(OTP)</span></label> -->
                                    <input class="input-text form-control" placeholder="One Time Password (OTP)*" maxlength="4" type="tel" name="customerpassword" v-model="otp_number"  :disabled="this.mobile == false" autocomplete="off"  ref="otp">
                                    <p class="size_error" v-text="otp_error"></p>
                                    <label class="timer-main font-medium"><span></span><span class="timer-container" v-if="this.mobile === true && this.resend_otp_time != 60"><span>00:</span><span class="timer" v-text="this.resend_otp_time"></span></span><a href="#" class="action otp-resend-button"  id="resend" @click.prevent="resend_otp()" v-if="this.mobile === true && this.resend_otp_time === 60"><span>Resend OTP </span></a></label>
                                </div>
                            </form>
                        </div>
                        <!--login section end here-->
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
name: 'login',

  data() {
        return {
            mobile_number:'',
            mobile_error:'',
            mobile:false,
            otp_number:'',
            otp_error:'',
            otp:false,
            from_path:'',
            resend_otp_time:60,
        };
    },
   
   methods: {
       countDownTimer() {
            if(this.resend_otp_time > 0) {
                setTimeout(() => {
                    this.resend_otp_time -= 1
                    this.countDownTimer()
                }, 1000)
            }
            if(this.resend_otp_time == 0) {
                this.resend_otp_time = 60
            }
        },
        resend_otp(){
            this.$store.state.list.error_message = '';
            this.$store.state.list.success_message = '';
            this.resend_otp_time = 60;
            this.countDownTimer();
            var form = new FormData();
            form.append("phone",this.mobile_number);
            let config = { headers: { 'Content-Type': 'multipart/form-data' } }
            axios.post(this.$store.state.list.cart_api_url+'/v1'+'/customer/send-otp', form , config)
            .then(response => {
                if(response.data.success === true)
                {
                    this.$store.state.list.error_message = '';
                    this.$toast.success(response.data.message, {
                        position: 'top-center',
                        duration:4000,
                    })
                }
                else
                {
                    this.$store.state.list.success_message = '';
                    this.$toast.error(response.data.message, {
                        position: 'top-center',
                        duration:4000,
                    })
                }
            })
            .catch(error =>
            {
                this.$store.state.list.page_loader = false;
                if(error.message === "Network Error"){
                    this.$toast.error('Oops there seems to be some Network issue, please try again.', {
                        position: 'top-center',
                        duration:4000,
                    })
                }
                window.scrollTo(0,0);
            })
        },
        mobile_no: function(){
            this.resend_otp_time = 60;
            var phoneno = /^([0-9]{10,})+$/;
            if (this.mobile_number.match(phoneno)) {
                this.mobile_error = "";
                if(this.mobile_number.length == '10')
                {
                    this.mobile = true;
                    this.$store.state.list.error_message = '';
                    this.$store.state.list.success_message = '';
                    setTimeout(() => {this.$refs.otp.focus();}, 0)
                    var form = new FormData();
                    form.append("phone",this.mobile_number);
                    let config = { headers: { 'Content-Type': 'multipart/form-data' } }
                    axios.post(this.$store.state.list.cart_api_url+'/v1'+'/customer/send-otp', form , config)
                    .then(response => {
                        if(response.data.success === true)
                       {
                            this.$toast.success(response.data.message, {
                                position: 'top-center',
                                duration:4000,
                            })
                           this.$store.state.list.error_message = '';

                       }
                       else
                       {
                           this.$toast.error(response.data.message, {
                            position: 'top-center',
                            duration:4000,
                        })
                           this.$store.state.list.success_message = '';
                       }
                    })
                    .catch(error =>
                    {
                        this.$store.state.list.page_loader = false;
                        if(error.message === "Network Error"){
                           this.$toast.error('Oops there seems to be some Network issue, please try again.', {
                                position: 'top-center',
                                duration:4000,
                            })
                        }
                        window.scrollTo(0,0);
                    })
                }
                else{
                  this.mobile = false;
                  this.otp = false;
                  this.otp_number = "";
                }
            }
            else {
                this.mobile = false;
                this.mobile_error = "Please enter valid mobile number";
            }
       }
    },

    watch: {
      otp_number: {
      handler: function (after, before) {
         var otpno = /^\d*(?:\.\d{1,2})?$/;
            if (this.otp_number.match(otpno)) {
                this.otp_error = "";
                if(this.otp_number.length == '4')
                {
                    this.$store.state.list.error_message = '';
                    this.$store.state.list.success_message = '';
                    this.$store.state.list.page_loader = true;
                    this.otp = true;
                    this.$store.state.list.customer_id = null;
                    var form = new FormData();
                    form.append("phone",this.mobile_number);
                    if(this.$store.state.list.cart_id != null && this.$store.state.list.cart_id != ''){
                         form.append("cart_id",this.$store.state.list.cart_id);
                    }
                    if(this.$store.state.list.cart_session != null && this.$store.state.list.cart_session != ''){
                        form.append("cart_session",this.$store.state.list.cart_session);
                    }
                    form.append("store",this.$store.state.list.store);
                    form.append("otp",this.otp_number);
                    axios.post(this.$store.state.list.cart_api_url+'/v1'+'/customer/validate-otp', form)
                    .then(response => {
                       if(response.data.success === true)
                       {
                        this.$store.state.list.page_loader = false;
                        // this.$store.state.list.login_popup = false;
                        this.$store.state.list.error_message = '';
                        $cookies.set(window.location.hostname.substring(10, 4)+'_customer', response.data.data.customer.id , "1y");
                        this.$toast.success(response.data.message, {
                            position: 'top-center',
                            duration:4000,
                        })
                        let logoutId = document.getElementsByClassName("dropdown_box")
                        logoutId[0].classList.add('d-block');
                        this.$store.state.list.login = false;
                       
                        $cookies.set(window.location.hostname.substring(10, 4)+'_cus_sess', response.data.data.customer_session , "1y");
                        this.$store.state.list.customer_session = response.data.data.customer_session;

                        if(response.data.data.cart_session){
                        $cookies.set(window.location.hostname.substring(10, 4)+'_ct_sess', response.data.data.cart_session , "1y");
                        this.$store.state.list.cart_session = response.data.data.cart_session;
                        }
                        this.$store.state.list.customer_id = response.data.data.customer.id*1;
                        if(response.data.data.cart_id){
                           this.$store.state.list.cart_id = response.data.data.cart_id;
                           this.$store.state.list.thankyou_cart = response.data.data.cart_id;
                           $cookies.set(window.location.hostname.substring(10, 4)+'_cart', response.data.data.cart_id);
                        }
                        this.$store.state.list.customer_detail =  response.data.data.customer;
                        if(response.data.data.products){
                           this.$store.state.list.cart_product = response.data.data.products;
                            this.$store.state.list.cart_total = response.data.data.grand_total;
                        }
                        this.$store.state.list.address = response.data.data.address;
                       
                        if(this.$store.state.list.address.length != 0){
                            for(let i = 0; i < this.$store.state.list.address.length; i++){
                            if(i == 0)
                            {
                                this.$store.state.list.address_id = this.$store.state.list.address[i].id*1;
                                this.$store.state.list.select_address_no = i;
                            }
                            }
                        }

                        //this.$router.push(this.from_path);

                       }
                       else{
                        this.$store.state.list.success_message = '';
                        this.$store.state.list.page_loader = false;
                        this.$toast.error(response.data.message, {
                            position: 'top-center',
                            duration:4000,
                        })
                        this.$store.state.list.customer_id = null;

                       }
                    })
                    .catch(error =>
                    {
                        this.$store.state.list.page_loader = false;
                        if(error.message === "Network Error"){
                            this.$toast.error('Oops there seems to be some Network issue, please try again.', {
                                position: 'top-center',
                                duration:4000,
                            })
                        }
                        window.scrollTo(0,0);
                    })
                }
                else{
                  this.otp = false;
                }
            }
            else {
                this.otp = false;
                this.otp_error = "Please enter valid OTP";
            }
      }
    },
    }
}
</script>
