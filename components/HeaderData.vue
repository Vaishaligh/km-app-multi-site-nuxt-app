<template>
  <div>
    <div v-html="headerContent" v-show="displayHeader"></div>
    <Shimmer
      :style="{ height: '50px', width: 'auto', margin: '10px 10px 5px 10px' }"
      v-bind:class="getClass()"
    />
  </div>
</template>

<script>
import axios from "axios";
import Shimmer from "simple-shimmer";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

var that = {};
var timer;
var timeoutVal = 1000;

if (process.client) {
  // capture all event triggered for header
  document.addEventListener("click", function (event) {
    if (event.target.closest("[data-ref]") !== null) {
      let targetClick = event.target
        .closest("[data-ref]")
        .getAttribute("data-ref");
      if (targetClick == "km-search-ref") {
        document
          .getElementsByClassName("search-modal")[0]
          .classList.remove("d-none");
        document
          .getElementsByClassName("search-modal")[0]
          .classList.add("d-block");
          
          document
          .getElementsByClassName("search-modal")[0].focus();
      }
      if (targetClick == "km-logout-ref") {
        kmLogoutAction();
      }
      if (targetClick == "km-mobile-search-click-ref") {
        
        document
          .getElementsByClassName("search-modal")[0]
          .classList.add("d-none");
      }
      if (targetClick == "km-bag-ref") {
        event.target.closest("#km-bag").href = "/cart";
      }
      if (targetClick == "km-mini-item-remove-ref") {
        let id = event.target.getAttribute("id");
        kmMiniItemRemove(id);
      }
      if(targetClick == 'km-user-ref-side'){
          let side = document.getElementById("km-hamburger")
          if(that.$store.state.list.customer_id == null || that.$store.state.list.customer_id == ''){
          window.location.href = "/login";

          }
      }

      if(targetClick == 'km-user-ref'){
        if(document.getElementById("km-user-static") !== null && document.getElementById("km-user-static") !==undefined && document.getElementById("km-user-static") !== null){
          if(that.$store.state.list.customer_id !== null){
              window.location.href = "/account/dashboard";
          }
          else{
            localStorage.setItem("headerText",document.getElementById("km-user-static").innerText);
            window.location.href = "/login";

          }
        } 
        else if(that.$store.state.list.customer_id !== null){ // that mean user is logedin but button is clicked
            return // no action to be performed
        }
        else{
        window.location.href = "/login";
        }

      }
      if (
        event.target.classList.contains("fa-user") &&
        that.$store.state.list.login == true
      ) {
        window.location.href = "/login";
      }
    
    }

  });

  // event for kartmax search
  document.addEventListener("keyup", function (event) {
    let value = event.target.value;
    let targetClick = event.target.getAttribute("data-ref");
    if (targetClick == "km-input-search-ref") {
      kmSearch(value);
    }
  });
}

// create a new vue instance for call all methods in existing vue instance

var app = new Vue({
  methods: {
    kmLogoutAction: function (param) {
      that.log_out();
    },
    kmSearch: function (value) {
      that.kmSearch(value);
    },
    kmMiniItemRemove: function (index) {
      that.deleteEvent(index);
    },
  },
});

// declare all function
var kmLogoutAction = function () {
  app.$options.methods.kmLogoutAction();
};
var kmSearch = function (value) {
  app.$options.methods.kmSearch(value);
};
var kmMiniItemRemove = function (index) {
  app.$options.methods.kmMiniItemRemove(index);
};
export default {
  components: {
    Shimmer,
  },
  watch: {
    "$store.state.list.search_input"(val) {
      if (val != null && val != "") {
        this.searchFocused = true;
      } else {
        this.searchFocused = false;
      }
    },
  },
  data: function () {
    return {
      headerContent: "",
      showData: false,
      displayHeader: false,
    };
  },

  async mounted() {

    const string = that.headerContent;
    that = this;
    // call dynamic header api
    await axios.get(
      this.$store.state.list.editor_url+"/default-header"
    ).then(Data=>{
      that.headerNew = Data
      that.headerContent = Data.data.data;
    }).catch(err=>{
      that.showData = true;
    })
    if (
      this.headerContent !== "" &&
      this.headerContent !== undefined &&
      this.headerContent !== null
    ) {
      this.showData = true;
      let self = this;
      // add dynamic header script
      let head = setInterval(function () {
        that.Script =that.headerNew.data.scripts;
        new Function(that.Script)();
        self.displayHeader = true;
        clearInterval(head);
      }, 1000);

      // call api for search sort keyword
      await axios.get(
      this.$store.state.list.api_url+"/api/cart/v1/default-filter"
      ).then(Data=>{
        console.log("Dta",Data.data.data)
        if(Data.data.data !== ''){
          this.$store.state.list.sortBy_search = Data.data.data.sort_by
          this.$store.state.list.sortDir_search = Data.data.data.sort_dir
          console.log("this.$store.state.list.sortBy_search",this.$store.state.list.sortBy_search)
        }
      }).catch(err=>{
      })

    }else{
      this.showData = true;
    }

    var minicartData =setInterval(async() => {
      this.$store.state.list.customer_id = $cookies.get(
        window.location.hostname.substring(10, 4) + "_customer"
      );
      let logoutId = document.getElementsByClassName("newrightdrop");
      if (
        this.$store.state.list.customer_id == null ||
        this.$store.state.list.customer_id == "" ||
        this.$store.state.list.customer_id == undefined
      ) {
        this.$store.state.list.login = true;
        if(logoutId !== null && logoutId[0] !== undefined)
        logoutId[0].classList.add("d-none");

      } else {
        this.$store.state.list.login = false;
         if(document.getElementById('km-user') !== null)
          if((document.getElementById('km-user').getElementsByTagName('span') .length > 0))
        document.getElementById('km-user').getElementsByTagName('span')[0].textContent = ''
        // show or hide wishlist count
        if (this.$store.state.list.wishlist_count) {
          // let count = document.getElementsByClassName("custom-counter-number");
          // count[0].classList.add("d-block"); 
          if(document.getElementById("wishlist-count") !==null && document.getElementById("wishlist-count") !== undefined && document.getElementById("wishlist-count")!==''){
            document.getElementById("wishlist-count").innerText =
            this.$store.state.list.wishlist_count;
          }

        }
      }

      // assign value un input tag if there is any search keyword found in url
        if(window.location.href.indexOf(`search`)>-1){
          let url = window.location.href.split('?q=')[1].split('&')
          document.getElementById('search').value = url[0]
        }
        if(document.getElementById('mobile-search-box')!==undefined && document.getElementById('mobile-search-box') !==null){
          document.getElementById('mobile-search-box').classList.add('d-none')
        }
      await this.miniCart();

        // static login code here
      if(document.getElementById("km-user-static") !== null && document.getElementById("km-user-static") !==undefined && document.getElementById("km-user-static") !== ''){
        if(this.$store.state.list.customer_id !==null){
          document.getElementById("km-user-static").getElementsByTagName('span')[0].innerText = 'My Account'
        }
      }
        clearInterval(minicartData);
 
    }, 1000);

    setTimeout(() => {
      // custom login from sidebar code start
        this.$store.state.list.customer_id = $cookies.get(
          window.location.hostname.substring(10, 4) + "_customer"
        );
        if(document.getElementById('km-user-sidemenu')!== null && document.getElementById('km-user-sidemenu')!==undefined && document.getElementById('km-user-sidemenu')!==''){
          this.$store.state.list.customer_id = $cookies.get(
            window.location.hostname.substring(10, 4) + "_customer"
          );
          if(this.$store.state.list.customer_id !==null){
            document.getElementById('km-user-sidemenu').innerText = 'HELLO'
            // username can't show because we dnt get name till then user does nt add address
            // dependency for both project
            document.getElementById('km-user-sidemenu').setAttribute('href',"/account/dashboard")

            // document.getElementById('km-user-sidemenu').href="/account/dashboard"
            // document.getElementById('km-user-sidemenu').classList.add('d-none')

          }else{
            document.getElementById('km-user-sidemenu').innerText = 'Login'
            document.getElementById('km-user-sidemenu').href="/login"

          }
        }

    }, 2000);
  },
  methods: {
    getClass() {
      return {
        "v-hide-class": this.displayHeader,
        "v-show-class": !this.displayHeader,
      };
    },
    get_cart: async function () {
      this.$store.state.list.cart_id = $cookies.get(
        window.location.hostname.substring(10, 4) + "_cart"
      );

      if (
        this.$store.state.list.cart_id != null &&
        this.$store.state.list.cart_id != "" &&
        this.$route.name != "thankyou" &&
        this.$route.name != "validate_points"
      ) {
        var form = new FormData();
        form.append("cart_id", this.$store.state.list.cart_id);
        form.append("cart_session", this.$store.state.list.cart_session);
        await axios
          .post(this.$store.state.list.cart_api_url+'/v1' + "/cart/get-cart", form)
          .then((response) => {
            if (response.data.success === true) {
              this.$store.state.list.cart_product = response.data.data.products;
              this.$store.state.list.customer_detail =
                response.data.data.customer;
              this.$store.state.list.cart_total =
                response.data.data.grand_total;
              this.$store.state.list.cart_subtotal =
                response.data.data.order_subtotal;
              this.$store.state.list.address = response.data.data.address;
              this.$store.state.list.discount_code =
                response.data.data.discount_code;
              this.$store.state.list.discount_amount =
                response.data.data.discount_amount;
              if (response.data.data.cookieDelete === 1) {
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cart",
                  ""
                );
                this.$store.state.list.cart_id = "";
              }
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
            } else {
              this.$store.state.list.error_message = response.data.message;
              if (response.data.cart_session_status == false) {
                // $cookies.set(
                //   window.location.hostname.substring(10, 4) + "_customer",
                //   "",
                //   "1y"
                // );
                // $cookies.set(
                //   window.location.hostname.substring(10, 4) + "_cus_sess",
                //   "",
                //   "1y"
                // );
                // this.$store.state.list.customer_id = "";
                // this.$store.state.list.customer_session = "";
                // $cookies.set(
                //   window.location.hostname.substring(10, 4) + "_cart",
                //   "",
                //   "1y"
                // );
                // $cookies.set(
                //   window.location.hostname.substring(10, 4) + "_ct_sess",
                //   "",
                //   "1y"
                // );
                // this.$store.state.list.cart_id = "";
                // this.$store.state.list.cart_session = "";
                // this.$store.state.list.cart_product = [];
              }
            }
          })
          .catch((error) => {
            if (error.message === "Network Error") {
              this.$store.state.list.error_message =
                "Oops there seems to be some Network issue, please try again.";
            }
            window.scrollTo(0, 0);
          });
      }
    },
    async miniCart() {
      await this.get_cart()
      let orderCount = document.getElementById("order-count");
     
      if (this.$store.state.list.cart_product.length > 0) {
        if(orderCount !== null){
           orderCount.textContent = this.$store.state.list.cart_product.length; // update text of mini cart
            orderCount.classList.add("d-block");
        }
       
          let productItem = document.querySelectorAll('[id^="product-item"]');
             productItem.forEach(async (item,i) => {
               if(i>0){
                await item.remove()
               }
              })
           

        // ************************* get item count and change it with dynamic value *************************
        let miniItemCount = document.getElementById("km-mini-item-count");
        if(miniItemCount !==null)
        miniItemCount.innerText = this.$store.state.list.cart_product.length;

        // ************************* get cart total and change it with dynamic value ********************
        let miniItemTotal = document.getElementById("km-mini-item-total");
        if(miniItemTotal !==null)
        miniItemTotal.innerHTML = this.$store.state.list.cart_total;

        var product = document.getElementById("product-item");
        let storeLenght = this.$store.state.list.cart_product.length;
        // *************************** dynamic cart item images *****************************************
        for await (const [i] of this.$store.state.list.cart_product.entries()) {
          if (i>0){
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
        for (let i = 0; i < names.length; i++) {
          names[i].innerHTML = this.$store.state.list.cart_product[i].name;
        }

        let itemImages = document.querySelectorAll(".product-item-photo");

        for(let i=0;i< itemImages.length;i++){
          itemImages[i].getElementsByTagName('img')[0].src   = this.$store.state.list.image_url+"400x0/" + this.$store.state.list.cart_product[i].image;
        }
        // ************************* dynamic all static value *************************
        for (let i = 0; i < prices.length; i++) {
          prices[i].innerHTML =
            `<i class="kartmax_currency"></i>` + this.$store.state.list.cart_product[i].selling_price + "";
          sizes[i].innerHTML = this.$store.state.list.cart_product[i].size;
          qty[i].innerHTML = this.$store.state.list.cart_product[i].qty;
        
          discount[i].innerHTML =
            this.$store.state.list.cart_product[i].discount_amount > 0
              ? `<i class="kartmax_currency"></i>`+ this.$store.state.list.cart_product[i].discount_amount
              : "";
        }
         for (let i = 0; i < removeButton.length; i++) {
              removeButton[i].id = i;
            }
      } else {
        let miniCart = document.getElementsByClassName("mini_cart_drop");
        if (miniCart.length > 0) miniCart[0].classList.add("d-none");
      }
    },
    focusInputSearch() {
      if (
        this.$store.state.list.search_input != "" &&
        this.$store.state.list.search_input != null
      ) {
        this.searchFocused = true;
      } else {
        this.searchFocused = false;
      }
    },
    log_out: function () {
      if (this.$store.state.list.cart_id == "") {
        this.$router.push("/");
        return;
      } else {
        $cookies.set(
          window.location.hostname.substring(10, 4) + "_customer",
          ""
        );
        this.$store.state.list.customer_id = "";
        $cookies.set(window.location.hostname.substring(10, 4) + "_cart", "");
        this.$store.state.list.cart_id = "";

        let logoutId = document.getElementsByClassName("newrightdrop");

        if (
          this.$store.state.list.customer_id == null ||
          this.$store.state.list.customer_id == "" ||
          this.$store.state.list.customer_id == undefined
        ) {
          if(logoutId.length>0){
            logoutId[0].classList.add("d-none");
          }
          let sideMenu = document.getElementById("km-hamburger")
          if(sideMenu !== undefined){
            sideMenu.classList.add('d-none')
            this.$toast.success("You have been successfully logout", {
              position: "top-center",
              duration: 4000,
            });
            document.getElementById('km-user-sidemenu').innerText = 'Login'
            // document.getElementById('km-user-sidemenu').classList.remove('d-none')
            // document.getElementById('km-user-sidemenu').classList.add('d-block')

          }
          this.$store.state.list.login = true;
        }
        if(document.getElementById('km-user') !== null)
         
          this.$toast.success("You have been successfully logout", {
            position: "top-center",
            duration: 4000,
          });
        // ************************* clear header counts ************************* //
        let orderCount = document.getElementById("order-count");
        if (this.$store.state.list.cart_product.length > 0) {
          orderCount.textContent = this.$store.state.list.cart_product.length;
          orderCount.classList.add("d-none");
        }
        let wishList = document.getElementById("wishlist-count");
        wishList.classList.add("d-none");

        // ***************** location store ids remove ************
        let productJson = localStorage.getItem('productJSON');
        let productID = localStorage.getItem('custmor_id');

        if(productJson !== '' && productJson !== undefined && productJson !==null){
          localStorage.removeItem("productJSON");
          
        }
         if(productID !== '' && productID !== undefined && productID !==null){
          localStorage.removeItem("custmor_id");
        }
        this.$router.push("/");
      }
    },

    deleteEvent: function (index) {
      this.$store.state.list.page_loader = true
      if (
        window.dataLayer !== undefined &&
        window.dataLayer !== null &&
        window.dataLayer !== ""
      ) {
        window.dataLayer.push({
          event: "removeFromCart",
          category: "cart",
          action: "Remove From Cart",
          label: name,
          cart: {
            remove: {
              product: [
                {
                  name: this.$store.state.list.cart_product[index].name,
                  id: this.$store.state.list.cart_product[index].master_sku,
                  price:
                    this.$store.state.list.cart_product[index].selling_price,
                  category: "",
                  variant: this.$store.state.list.cart_product[index].size,
                  quantity: this.$store.state.list.cart_product[index].qty,
                },
              ],
            },
          },
        });
      }
      this.$store.state.list.success_message = "";
      this.$store.state.list.error_message = "";
      // this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("cart_id", this.$store.state.list.cart_id);
      form.append("cart_session", this.$store.state.list.cart_session);
      if(this.$store.state.list.cart_product[index] !== undefined)
      form.append(
        "product_id",
        this.$store.state.list.cart_product[index].variant_id
      );

      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + "/product/remove-product",
          form
        )
        .then((response) => {
          if (response.data.success === true) {
            this.$store.state.list.page_loader = false;
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.$store.state.list.page_loader = false

            this.$store.state.list.error_message = "";
            this.$store.state.list.cart_total = response.data.data.grand_total;
            this.$store.state.list.cart_product = response.data.data.products;
            this.$store.state.list.discount_code =
              response.data.data.discount_code;
            this.$store.state.list.discount_amount =
              response.data.data.discount_amount;

            if (response.data.data.cart_session) {
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
            }
          
            let miniCart = document.getElementsByClassName("product");
            miniCart[index].remove();
            let orderCount = document.getElementById("order-count");
            let miniItemTotal = document.getElementById("km-mini-item-total");
            let miniItemCount = document.getElementById("km-mini-item-count");
            if (this.$store.state.list.cart_product.length > 0) {
              orderCount.innerText = this.$store.state.list.cart_product.length;
              miniItemCount.innerText =
                this.$store.state.list.cart_product.length;
              miniItemTotal.innerText = this.$store.state.list.cart_total;
            } else {
              miniItemTotal.innerHTML = 0;
              miniItemCount.innerHTML = 0;
              orderCount.textContent = this.$store.state.list.cart_product.length;
          
              let miniCart = document.getElementsByClassName("mini_cart_drop");
              miniCart[0].classList.add("d-none");
            }
          } else {
            this.$store.state.list.page_loader = false;
            this.$store.state.list.success_message = "";
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
          this.$toast.error(
            "Oops there seems to be some Network issue, please try again.",
            {
              position: "top-center",
              duration: 4000,
            }
          );
        });
    },

    check: function (value) {

      const typer = document.getElementById("search");

      if (typer !== undefined && typer !== null && typer !== "") {
        // ******************************** for desktop design ********************************
        typer.addEventListener("keypress", this.handleKeyPress);
        typer.addEventListener("keyup", this.handleKeyUp(value));
      }

      const mobileSearch = document.getElementById("km-mobile-search");
      if (
        mobileSearch !== undefined &&
        mobileSearch !== null &&
        mobileSearch !== ""
      ) {
        // ******************************** for mobile design ********************************
      
        mobileSearch.focus()
        mobileSearch.addEventListener("keypress", this.handleKeyPress);
        mobileSearch.addEventListener("keyup", this.handleKeyUp(value));
      }
    },

    handleKeyUp(value) {
      var that = this
      window.clearTimeout(timer); // ******************************** prevent errant multiple timeouts from being generated
      timer = window.setTimeout(() => {
        var name = /^(?!\s*$).+/;
        if (value.match(name)) {
          that.$store.state.list.search_input = value;
        } else {
          that.$store.state.list.search_input = "";
        }
      }, timeoutVal);
    },

    handleKeyPress(e) {
      window.clearTimeout(timer);
    },

    kmSearch(value) {
      this.check(value); // ******************************** check user is typing or not ********************************
    },
  },
};
</script>
