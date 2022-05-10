<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-md-12">
        <div class="login-section">
          <h3 class="login-title">LOGIN</h3>
          <form class="login-form">
            <div
              class="field mobile mb-2"
              v-bind:class="{
                success: this.mobile === true,
                error: this.mobile_error != '',
              }"
            >
              <input
                maxlength="10"
                type="tel"
                class="input-text form-control"
                placeholder="Enter Mobile Number*"
                autocomplete="off"
                v-model="mobile_number"
                @keyup="mobile_no"
                name="mobile"
                autofocus
              />
              <span
                class="text-danger kartmax-text-f-12"
                v-text="mobile_error"
              ></span>
            </div>
            <div
              class="field  mb-2"
              v-bind:class="{
                success: this.otp === true,
                error: this.otp_error != '',
              }"
              v-show="this.mobile != false"
            >
              <input
                class="input-text form-control"
                placeholder="One Time Password (OTP)*"
                maxlength="4"
                type="tel"
                name="customerpassword"
                v-model="otp_number"
                autocomplete="off"
                ref="otp"
              />
              <span
                class="text-danger kartmax-text-f-12"
                v-text="otp_error"
              ></span>
            </div>
            <div class="row " v-if="this.mobile==false">
              <div class="col-6"></div>
              <div class="col-md-6 col-6 mt-3">
                <button type="button" class="btn otp btn-lg btn-primary" @click="mobile_no(true)"> GET OTP</button>
              </div>
            </div>
            <label class="timer-main font-medium">
              <span
                class="timer-container"
                v-if="this.mobile === true && this.resend_otp_time != 60"
                ><span>00:</span
                ><span class="timer" v-text="this.resend_otp_time"></span></span
              ><a
                href="#"
                class="action otp-resend-button"
                id="resend"
                @click.prevent="resend_otp()"
                v-if="this.mobile === true && this.resend_otp_time === 60"
                ><span>Resend OTP </span></a
              ></label
            >
          </form>
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
var fromPath,pathName
export default {
  name: "login",
  head() {
    return {};
  },
  data() {
    return {
      mobile_number: "",
      mobile_error: "",
      mobile: false,
      otp_number: "",
      otp_error: "",
      otp: false,
      from_path: "",
      resend_otp_time: 60,
      
    };
  },
  beforeEnter(to, from, next) {
    console.log("from-----------",from);
    // next((vm) => {
      
    //   vm.from_path = from.path;
    // });
  },
  methods: {
     async miniCart() {
      let orderCount = document.getElementById("order-count");
    
      if (this.$store.state.list.cart_product.length > 0) {
        orderCount.textContent = this.$store.state.list.cart_product.length; // update text of mini cart
        orderCount.classList.add("d-block");
      

        // get item count and change it with dynamic value
        let miniItemCount = document.getElementById("km-mini-item-count");
        miniItemCount.innerText = this.$store.state.list.cart_product.length;

        // ************************* get cart total and change it with dynamic value ********************
        let miniItemTotal = document.getElementById("km-mini-item-total");
        miniItemTotal.innerHTML = this.$store.state.list.cart_total;

        var product = document.getElementById("product-item");
        let storeLenght = this.$store.state.list.cart_product.length;

        // *************************** dynamic cart item images *****************************************
        for (let i = 0; i < storeLenght; i++) {
          if (i == 0) {
            let image = product.getElementsByTagName("img");
            image[0].src =
              this.$store.state.list.image_url+"400x0/" +
              this.$store.state.list.cart_product[i].image;
          } else {
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
        let sizes = document.querySelectorAll("#km-mini-item-size");
        let qty = document.querySelectorAll("#km-mini-item-qty");
        let removeButton = document.querySelectorAll("#km-mini-item-remove");
        let names = document.querySelectorAll("#km-mini-item-name");
        let itemImages = document.querySelectorAll(".product-item-photo");

        for(let i=0;i< itemImages.length;i++){
          itemImages[i].getElementsByTagName('img')[0].src   = this.$store.state.list.image_url+"400x0/" + this.$store.state.list.cart_product[i].image;
        }
        // dynamic all static value
        for (let i = 0; i < prices.length; i++) {
          prices[i].innerHTML =
            `<i class="kartmax_currency"></i>` + this.$store.state.list.cart_product[i].selling_price + "";
          sizes[i].innerHTML = this.$store.state.list.cart_product[i].size;
          qty[i].innerHTML = this.$store.state.list.cart_product[i].qty;
          names[i].innerHTML = this.$store.state.list.cart_product[i].name;
          discount[i].innerHTML =
            this.$store.state.list.cart_product[i].discount_amount > 0
              ? this.$store.state.list.cart_product[i].discount_amount
              : "";
          removeButton[i].id = i;
        }
      } else {
        let miniCart = document.getElementsByClassName("mini_cart_drop");
        if (miniCart.length > 0) miniCart[0].classList.add("d-none");
      }
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
            this.$store.state.list.error_message = "";
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 3000,
            });
          } else {
            this.$store.state.list.success_message = "";
            this.$toast.error(response.data.message, {
              position: "top-center",
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          this.$store.state.list.page_loader = false;
          if (error.message === "Network Error") {
            this.$toast.error(
              "Oops there seems to be some Network issue, please try again.",
              {
                position: "top-center",
                duration: 3000,
              }
            );
          }
          window.scrollTo(0, 0);
        });
    },
    mobile_no: function (clicked) {
      this.resend_otp_time = 60;
      var phoneno = /^([0-9]{10,})+$/;
      if (this.mobile_number.match(phoneno)) {
        this.mobile_error = "";
        if (this.mobile_number.length == "10"   && clicked==true) {
          this.mobile = true;
          this.$store.state.list.error_message = "";
          this.$store.state.list.success_message = "";
          setTimeout(() => {
            this.$refs.otp.focus();
          }, 0);
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
                  duration: 3000,
                });
                this.$store.state.list.error_message = "";
              } else {
                this.$toast.error(response.data.message, {
                  position: "top-center",
                  duration: 3000,
                });
                this.$store.state.list.success_message = "";
                  if(window.dataLayer !== undefined && window.dataLayer !== null && window.dataLayer !== ''){
                    window.dataLayer.push({
                      event: "Login",
                      category: "Login",
                      action: "OTP Sent",
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
                    duration: 3000,
                  }
                );
              }
              window.scrollTo(0, 0);
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
    async get_wish() {
      var form = new FormData();
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      await axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + `/wishlist/customer-wishlist`,
          form
        )
        .then((response) => {
          if (response.data.success == true) {
            let wishList = document.getElementById("wishlist-count");
            this.$store.state.list.wishlist_count =
              response.data.data.result.count;
            if (response.data.data.result.count) {
              if(wishList !== null){
                wishList.classList.add("d-block");
                wishList.innerHTML = response.data.data.result.count;
              }
              
            }
          }
        });
    },
  },
  mounted() {
    console.log("this.$route.query",this.from_path)
    if (this.$store.state.list.customer_id) {
      this.$toast.success("Already Logged In.", {
        position: "top-center",
        duration: 3000,
      });

      this.$router.push(this.from_path);
    }
  },
  asyncData({from}){
    console.log("fromPath",from);
      if(from !== null && from !=='' && from !=undefined){
        fromPath = from.path
        pathName = from.name
        // this.from_path= from.path
      }
  },
  watch: {
    otp_number: {
      handler: function (after, before) {
        var otpno = /^\d*(?:\.\d{1,2})?$/;
        if (this.otp_number.match(otpno)) {
          this.otp_error = "";
          if (this.otp_number.length == "4") {
            this.$store.state.list.error_message = "";
            this.$store.state.list.success_message = "";
            // this.$store.state.list.page_loader = true; 
            this.otp = true;
            this.$store.state.list.customer_id = null;
            var form = new FormData();
            form.append("phone", this.mobile_number);
            if (
              this.$store.state.list.cart_id != null &&
              this.$store.state.list.cart_id != ""
            ) {
              form.append("cart_id", this.$store.state.list.cart_id);
            }
            if (
              this.$store.state.list.cart_session != null &&
              this.$store.state.list.cart_session != ""
            ) {
              form.append("cart_session", this.$store.state.list.cart_session);
            }
            form.append("store", this.$store.state.list.store);
            form.append("otp", this.otp_number);
            axios
              .post(
                this.$store.state.list.cart_api_url+'/v1' + "/customer/validate-otp",
                form
              )
              .then((response) => {
                if (response.data.success === true) {
                  this.$store.state.list.error_message = "";
                  $cookies.set(
                    window.location.hostname.substring(10, 4) + "_customer",
                    response.data.data.customer.id,
                    "1y"
                  );
                  this.$toast.success(response.data.message, {
                    position: "top-center",
                    duration: 3000,
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

                  let logoutId =
                    document.getElementsByClassName("newrightdrop");
                    if(logoutId !== null && logoutId !== '' && logoutId !== undefined){
                         if (logoutId.length > 0) {
                          logoutId[0].classList.remove("d-none");
                        }
                    }

                  this.$store.state.list.login = false;
                  if (response.data.data.cart_id) {
                    this.$store.state.list.cart_id = response.data.data.cart_id;
                    this.$store.state.list.thankyou_cart =
                      response.data.data.cart_id;
                    $cookies.set(
                      window.location.hostname.substring(10, 4) + "_cart",
                      response.data.data.cart_id
                    );
                  }

                  this.$store.state.list.customer_detail =
                    response.data.data.customer;
                  if (response.data.data.products) {
                    this.$store.state.list.cart_product =
                      response.data.data.products;
                    this.$store.state.list.cart_total =
                      response.data.data.grand_total;
                  }
                  this.$store.state.list.address = response.data.data.address;
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
                  if(window.dataLayer !== undefined && window.dataLayer !== null && window.dataLayer !== ''){
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
                  }
                  let orderCount = document.getElementById("order-count");

                  if(this.$store.state.list.cart_product !== '' && this.$store.state.list.cart_product !== null && this.$store.state.list.cart_product==undefined){
                    if (
                      this.$store.state.list.cart_product.length > 0
                    ) {
                      orderCount.innerHTML =
                        this.$store.state.list.cart_product.length;
                        orderCount.classList.add("d-block");
                    }
                  }
      
                  // this.minicart()  

                  this.get_wish();

                  if(document.getElementById('km-user') !== null){
                     if((document.getElementById('km-user').getElementsByTagName('span') .length > 0)){
                       document.getElementById('km-user').getElementsByTagName('span')[0].textContent = ''
                        this.$store.state.list.login = false
                    }
                  }
                  // login static code
                   if(document.getElementById("km-user-static") !== null && document.getElementById("km-user-static") !==undefined && document.getElementById("km-user-static") !== null){
                      if(this.$store.state.list.customer_id !== null){
                        // document.getElementById("km-user-static").innerText =  localStorage.setItem(headerText)
                        document.getElementById("km-user-static").getElementsByTagName('span')[0].innerText = 'My Account'
                      }
                   }

                   // user sidemenu login text code
                   if(document.getElementById('km-user-sidemenu')!== null && document.getElementById('km-user-sidemenu')!==undefined && document.getElementById('km-user-sidemenu')!==''){
                      if(this.$store.state.list.customer_id !==null){
                        document.getElementById('km-user-sidemenu').innerText = 'HELLO'
                        // document.getElementById('km-user-sidemenu').removeAttribute('href')
                        document.getElementById('km-user-sidemenu').href="/account/dashboard"
                        let data = document.getElementById('km-hamburger')

                      }else{
                        document.getElementById('km-user-sidemenu').innerText = 'Login'
                        let data = document.getElementById('km-hamburger')

                      }
                    }
                    if (this.$route.path == "/checkout/login") {
                      this.$router.push("/checkout/address");
                    } 
                    else if(fromPath !=='' && fromPath !== undefined && fromPath !== null)
                    {
                      // this.$store.state.list.wishlist_called=true
                      if(pathName == 'category-category' || pathName == 'product-product' || pathName == 'index'){
                        this.$store.state.list.wishlistFrom = true
                      }
                      this.$router.push(fromPath)

                    }
                    else {
                      this.$router.push("/");
                    }

                  // this.$router.push(this.from_path);

                } else {
                  this.$store.state.list.success_message = "";
                  this.$store.state.list.page_loader = false;
                  this.$toast.error(response.data.message, {
                    position: "top-center",
                    duration: 3000,
                  });
                  this.$store.state.list.customer_id = null;
                }
              })
              .catch((error) => {
                this.$store.state.list.page_loader = false;
                if (error.message === "Network Error") {
                  this.$toast.error(
                    "Oops there seems to be some Network issue, please try again.",
                    {
                      position: "top-center",
                      duration: 3000,
                    }
                  );
                }
                window.scrollTo(0, 0);
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
};
</script>
<style scoped>
.login-section {
  max-width: 450px;
  margin: 50px auto !important;
  /* background: #e9ecef57; */
  padding: 20px;
}
.login-section h3 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
  text-transform: capitalize;
  font-weight: 700;
}
.success {
  border-color: green;
}
.error {
  border-color: red;
}
.field .input-text::placeholder {
  color: #495057;
}
.timer-main {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
@media screen and (max-width: 767px) {
.login-section {
    max-width: 450px;
    margin: 0 auto !important;
    padding: 0;
}
.login-section h3 {
  font-size: 20px;
  margin-bottom: 10px;
}
}
.login-title{
    font-size: 16px !important;
    color: #333 !important;
    text-transform: uppercase;
    margin-bottom: 15px;
    text-align: left !important;
}
.field .input-text{
  border-radius: 0px;
      width: 100%;
    padding: 5px 9px;
    height: 45px;
    font-size: 14px;
    border: 1px solid #c2c2c2;
    outline: none;
    box-shadow: none;
}
.otp{
  background: var(--bs-primary);  
  color: white;
  width: 100%;
  font-size: 14px;
  padding: 10px;
  border-radius: 0px;
}
</style>
