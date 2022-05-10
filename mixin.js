import axios from "axios";
export const modifyMixin={
   
    props:{
        status:'',
    },
    methods: {
        modify(status){

            if(status == 'km_order_cancelled' || status=='KM_ORDER_CANCELLED'){
              return 'CANCELLED'
            }else if(status == 'km_order_confirmed' || status == 'KM_ORDER_CONFIRMED'){
              return 'CONFIRMED'
            }
            else if(status == 'KM_ORDER_DELIVERED' || status == 'km_order_delivered' ){
                return 'DELIVERED'
            }
             else if(status == 'km_order_placed' || status =='KM_ORDER_PLACED' ){
                return 'PENDING CONFIRMATION'
            }
             else if(status == 'km_order_invoice_generated' || status == 'KM_ORDER_INVOICE_GENERATED'){
                return 'INVOICED'
            }
             else if(status == 'km_order_cust_return_initiated' || status == 'KM_ORDER_CUST_RETURN_INITIATED'){
                return 'RETURN INITIATED'
            }
            else if(status =='km_order_cust_return_in_transit' || status == 'KM_ORDER_CUST_RETURN_IN_TRANSIT'){
               return 'RETURN INTRANSIT'
            }
             else if(status == "km_order_cust_return_delivered" || status =="KM_ORDER_CUST_RETURN_DELIVERED"){
              return 'RETURN DELIVERED'
             }
              else if(status == "km_order_cust_return_cancelled" || status =="KM_ORDER_CUST_RETURN_CANCELLED"){
              return 'RETURN CANCELLED'
             }
              else if(status == "km_order_cust_return_completed" || status =="KM_ORDER_CUST_RETURN_COMPLETED"){
              return 'RETURN COMPLETE'
             }
            else if(status == "km_order_dispatch" || status =="KM_ORDER_DISPATCH"){
                return 'DISPATCHED'
            }
            else if(status == "km_order_ndr_initiated" || status =="KM_ORDER_NDR_INITIATED"){
                return 'NDR'
            }
            else if(status == "km_order_rto_initiated" || status =="KM_ORDER_RTO_INITIATED"){
                return 'DELIVERY FAILED'
            }
            else if(status == "km_order_rto_delivered" || status =="KM_ORDER_RTO_DELIVERED"){
                return 'DELIVERY FAILED'
            }
            else if(status == "km_order_exchange_initiated" || status =="KM_ORDER_EXCHANGE_INITIATED"){
              return 'EXCHANGE INITIATED'
          }
          else if(status == "km_order_exchange_requested" || status =="KM_ORDER_EXCHANGE_REQUESTED"){
            return 'Exchange Requested'
        }
            
            else{
              return status
            }
          },
          capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
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
                      response.data.data.net_amount;
                    this.net_amount = response.data.data.net_amount;
                    this.$store.state.list.express_delivery_charge  = response.data.data.express_delivery_charge
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
                    this.$store.state.list.shiping_charges = response.data.data.shipping_charge;
                    this.$store.state.list.cod_charges = response.data.data.cod_charge;
                    this.mloyal_point = response.data.data.mloyal_point;
                    this.mloyal_amount = response.data.data.mloyal_amount;
                    this.$store.state.list.tax = response.data.data.tax;
                    this.$store.state.list.store_credits_discount_amount = response.data.data.store_credit_discount_amount;
                    this.$store.state.list.store_credits_used = response.data.data.store_credit_used;
                    this.$store.state.list.loyalty_discount = response.data.data.loyalty_discount;
                    this.payment_method = response.data.data.payment_method
                    this.$store.state.list.maddress = response.data.data.maddress
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
          async custom_code(type) {
            await fetch(
              this.$store.state.list.cart_api_url+`/site-analytics/list?type=${type}`
            )
              .then(async (res) => {
                const data = await res.json();
                if (data.success == true) {
                  for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].tag == "location_body_start") {
                      var s = document.body.firstChild;
                      const wrapperDiv = document.createElement("div"); // create a div element
                      wrapperDiv.innerHTML = data.data[i].props; // put all data in created html
                      for (let i = 0; i < wrapperDiv.children.length; i++) {
                          if (wrapperDiv.children[i].src !== "") {
                            let scriptElement = document.createElement("script"); // add new script tag for a child
                            for (
                              let j = 0;
                              j < wrapperDiv.children[i].attributes.length;
                              j++
                            ) {
                              // wrap script tag according to attributes
                              const attr = wrapperDiv.children[i].attributes[j];
                              scriptElement.setAttribute(attr.name, attr.value);
                            }
                          
                            s.parentNode.insertBefore(scriptElement, s);
      
                          } else {
                            let scriptElement = document.createElement("script");
                            scriptElement.innerHTML = wrapperDiv.children[i].innerHTML;
                            if (wrapperDiv.children[i].attributes.length) {
                              for (
                                let j = 0;
                                j < wrapperDiv.children[i].attributes.length;
                                j++
                              ) {
                                const attr = wrapperDiv.children[i].attributes[j];
                                scriptElement.setAttribute(attr.name, attr.value);
                              }
                            }
                            s.parentNode.insertBefore(scriptElement, s);
      
                          }
                        }
                    } else if (data.data[i].tag == "location_body_end") {
                      const wrapperDiv = document.createElement("div"); // create a div element
                      wrapperDiv.innerHTML = data.data[i].props; // put all data in created html
                        for (let i = 0; i < wrapperDiv.children.length; i++) {
                          if (wrapperDiv.children[i].src !== "") {
                            let scriptElement = document.createElement("script"); // add new script tag for a child
                            for (
                              let j = 0;
                              j < wrapperDiv.children[i].attributes.length;
                              j++
                            ) {
                              // wrap script tag according to attributes
                              const attr = wrapperDiv.children[i].attributes[j];
                              scriptElement.setAttribute(attr.name, attr.value);
                            }
                            document.body.appendChild(
                              scriptElement
                            );
                          } else {
                            let scriptElement = document.createElement("script");
                            scriptElement.innerHTML = wrapperDiv.children[i].innerHTML;
                            if (wrapperDiv.children[i].attributes.length) {
                              for (
                                let j = 0;
                                j < wrapperDiv.children[i].attributes.length;
                                j++
                              ) {
                                const attr = wrapperDiv.children[i].attributes[j];
                                scriptElement.setAttribute(attr.name, attr.value);
                              }
                            }
                            document.body.appendChild(
                              scriptElement
                            );
                          }
                        }
                      // }
                    } else if (data.data[i].tag == "location_head") {
                      const wrapperDiv = document.createElement("div"); // create a div element
                      wrapperDiv.innerHTML = data.data[i].props; // put all data in created html
      
                      for (let i = 0; i < wrapperDiv.children.length; i++) {
                        // find all child in div
                        if (wrapperDiv.children[i].src !== "") {
                          let scriptElement = document.createElement("script"); // add new script tag for a child
                          for (
                            let j = 0;
                            j < wrapperDiv.children[i].attributes.length;
                            j++
                          ) {
                            // wrap script tag according to attributes
                            const attr = wrapperDiv.children[i].attributes[j];
                            scriptElement.setAttribute(attr.name, attr.value);
                          }
                          document.head.appendChild(scriptElement);
                        } else {
                          let scriptElement = document.createElement("script");
                          scriptElement.innerHTML = wrapperDiv.children[i].innerHTML;
                          if (wrapperDiv.children[i].attributes.length) {
                            for (
                              let j = 0;
                              j < wrapperDiv.children[i].attributes.length;
                              j++
                            ) {
                              const attr = wrapperDiv.children[i].attributes[j];
                              scriptElement.setAttribute(attr.name, attr.value);
                            }
                          }
                          document.head.appendChild(scriptElement);
                        }
                      }
                    }
                  }
                }else{
                  console.log("data is not found in custom head")
                }
      
              })
              .catch((err) => {
                console.log(err);
              });
          },
          async miniCart() {
      
            let orderCount = document.getElementById("order-count");
            // if(this.$store.state.list.cart_product.length > 0){
            orderCount.textContent = this.$store.state.list.cart_product.length;
            orderCount.classList.add("d-block");  // open minicart
            let productItem = document.querySelectorAll('[id^="product-item"]');
             productItem.forEach(async (item,i) => {
               if(i>0){
                await item.remove()
               }
              })
           
            
            let miniItemCount = document.getElementById("km-mini-item-count");
            miniItemCount.innerHTML = this.$store.state.list.cart_product.length;
      
            let miniItemTotal = document.getElementById("km-mini-item-total");
            miniItemTotal.innerHTML = this.$store.state.list.cart_total;
      
            var product = document.getElementById("product-item");
            let storeLenght = this.$store.state.list.cart_product.length;
            
            for await (const [i] of this.$store.state.list.cart_product.entries()) {
             // clone div 
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
            for (let i = 0; i < prices.length; i++) {
              prices[i].innerHTML =  `<i class="kartmax_currency"></i> ${this.$store.state.list.cart_product[i].selling_price}`;
            }
            
            let discount = document.querySelectorAll(
              '[id^="km-mini-item-dis-price"]'
            );
            for (let i = 0; i < discount.length; i++) {
             if (discount.length) {
                discount[i].innerHTML = this.$store.state.list.cart_product[i].discount_amount > 0 ? `<i class="kartmax_currency"></i> ${this.$store.state.list.cart_product[i].discount_amount}` : '';
              }
            }
            let sizes = document.querySelectorAll('[id^="km-mini-item-size"]');
            for (let i = 0; i < sizes.length; i++) {
              sizes[i].innerHTML = this.$store.state.list.cart_product[i].size;
            }
            let qty = document.querySelectorAll('[id^="km-mini-item-qty"]');
            for (let i = 0; i < qty.length; i++) {
                qty[i].innerHTML = this.$store.state.list.cart_product[i].qty;
            }
            let removeButton = document.querySelectorAll('#km-mini-item-remove');
            let names = document.querySelectorAll("#km-mini-item-name");
            for (let i = 0; i < names.length; i++) {
                names[i].innerHTML = this.$store.state.list.cart_product[i].name;
            }
            let miniCart = document.getElementsByClassName("mini_cart_drop");
            let itemImages = document.querySelectorAll(".product-item-photo");
      
            for await (const [i] of itemImages.entries()) {
              itemImages[i].getElementsByTagName('img')[0].src   = this.$store.state.list.image_url+`live/400x0/` + this.$store.state.list.cart_product[i].image;
            }
           
            miniCart[0].classList.remove("d-none");
            miniCart[0].style.display = "block";
            setTimeout(()=> {
               miniCart[0].style.display = null;
            },3000)
            // dynamic all static valye
            
            for (let i = 0; i < removeButton.length; i++) {
              removeButton[i].id = i;
            }
      
            return;
            // }
          },
          remove_w_mixin(id, g_id,sub_group_id) {
            this.$store.state.list.page_loader = true;
            var form = new FormData();
            form.append("product_id", id);
            form.append("group_id", g_id);
            form.append("customer_id", this.$store.state.list.customer_id);
            form.append("sub_group_id", sub_group_id);
            form.append("customer_session", this.$store.state.list.customer_session);
            axios
              .post(
                this.$store.state.list.cart_api_url +
                  "/v1" +
                  `/wishlist/remove-wishlist`,
                form
              )
              .then((response) => {
                if (response.data.success == true) {
                  this.$store.state.list.page_loader = false;
                  if (response.data.data.product) {
                    this.wishlist = response.data.data.product.split(",");
                    this.$store.state.list.wishlist_count =
                      response.data.data.total_row;
                  } else {
                    this.$store.state.list.wishlist_count = "0";
                    this.wishlist = [];
                  }
                  this.$toast.success(response.data.message, {
                    position: "top-center",
                    duration: 4000,
                  });
                  if (this.$store.state.list.wishlist_count) {
                    // let count = document.getElementsByClassName(
                    //   "custom-counter-number"
                    // );
                    // count[0].classList.add("d-block");
                    document.getElementById("wishlist-count").innerHTML =
                      this.$store.state.list.wishlist_count;
                  }
                  
                } else {
                  this.$store.state.list.page_loader = false;
                  if (response.data.data.customer_session_status == false) {
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
                  }
                }
              });
          },
          add_w_mixin(id,g_id,sub_group_id) {
          
            if (
              this.$store.state.list.customer_id != "" &&
              this.$store.state.list.customer_id != null
            ) {
              this.$store.state.list.page_loader = true;
              var form = new FormData();
              form.append("product_id", id);
              form.append("group_id", g_id);
              form.append("sub_group_id", sub_group_id);
              form.append("customer_id", this.$store.state.list.customer_id);
              form.append(
                "customer_session",
                this.$store.state.list.customer_session
              );
              axios
                .post(
                  this.$store.state.list.cart_api_url +
                    "/v1" +
                    `/wishlist/add-wishlist`,
                  form
                )
                .then((response) => {
                  this.$store.state.list.page_loader = false;
                  if (response.data.success == true) {
                    this.wishlist = response.data.data.product.split(",");
                    this.$store.state.list.wishlist_count =
                      response.data.data.total_row;
                    this.$toast.success(response.data.message, {
                      position: "top-center",
                      duration: 4000,
                    });
                    if (this.$store.state.list.wishlist_count) {
                      document.getElementById("wishlist-count").innerHTML =
                        this.$store.state.list.wishlist_count;
                    }
                  } 
                });
            } else {
              this.$store.state.wishlist_called = {
                id:id,
                g_id:g_id,
                sub_group_id:sub_group_id
              }
              localStorage.setItem("wish",JSON.stringify(this.$store.state.wishlist_called));
              this.$router.push('/login')
            }
          },
          scrollToLastLoc(){
            let lastLoc=localStorage.getItem('loc');
            lastLoc=(lastLoc!=undefined && lastLoc!='')?JSON.parse(lastLoc):'';
            if(lastLoc.path!=undefined && lastLoc.path == window.location.href){
              let lastOffset=(lastLoc.scrollTop!=undefined)?lastLoc.scrollTop:'';
              if(parseInt(lastOffset)>0){
                window.scrollTo(0,(lastLoc.scrollTop));
              }
            }
          },
          SaveScrollHistory(){
              document.addEventListener("scroll", function (event) {
              let scroll_offset=window.pageYOffset;
              let stateData = {
                  path: window.location.href,
                  scrollTop: scroll_offset
              };
              setTimeout(() => {
               localStorage.setItem("loc",JSON.stringify(stateData));
              }, 2000);
           })
          },



          // ************** md5 function start here ******************


          MD5(d) {
            var r = this.M(this.V(this.Y(this.X(d), 8 * d.length)));
            return r.toLowerCase();
          },
          M(d) {
            for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)
              (_ = d.charCodeAt(r)),
                (f += m.charAt((_ >>> 4) & 15) + m.charAt(15 & _));
            return f;
          },
          X(d) {
            for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
            for (m = 0; m < 8 * d.length; m += 8)
              _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
            return _;
          },
          V(d) {
            for (var _ = "", m = 0; m < 32 * d.length; m += 8)
              _ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255);
            return _;
          },
          Y(d, _) {
            (d[_ >> 5] |= 128 << _ % 32), (d[14 + (((_ + 64) >>> 9) << 4)] = _);
            for (
              var m = 1732584193,
                f = -271733879,
                r = -1732584194,
                i = 271733878,
                n = 0;
              n < d.length;
              n += 16
            ) {
              var h = m,
                t = f,
                g = r,
                e = i;
              (f = this.md5_ii(
                (f = this.md5_ii(
                  (f = this.md5_ii(
                    (f = this.md5_ii(
                      (f = this.md5_hh(
                        (f = this.md5_hh(
                          (f = this.md5_hh(
                            (f = this.md5_hh(
                              (f = this.md5_gg(
                                (f = this.md5_gg(
                                  (f = this.md5_gg(
                                    (f = this.md5_gg(
                                      (f = this.md5_ff(
                                        (f = this.md5_ff(
                                          (f = this.md5_ff(
                                            (f = this.md5_ff(
                                              f,
                                              (r = this.md5_ff(
                                                r,
                                                (i = this.md5_ff(
                                                  i,
                                                  (m = this.md5_ff(
                                                    m,
                                                    f,
                                                    r,
                                                    i,
                                                    d[n + 0],
                                                    7,
                                                    -680876936
                                                  )),
                                                  f,
                                                  r,
                                                  d[n + 1],
                                                  12,
                                                  -389564586
                                                )),
                                                m,
                                                f,
                                                d[n + 2],
                                                17,
                                                606105819
                                              )),
                                              i,
                                              m,
                                              d[n + 3],
                                              22,
                                              -1044525330
                                            )),
                                            (r = this.md5_ff(
                                              r,
                                              (i = this.md5_ff(
                                                i,
                                                (m = this.md5_ff(
                                                  m,
                                                  f,
                                                  r,
                                                  i,
                                                  d[n + 4],
                                                  7,
                                                  -176418897
                                                )),
                                                f,
                                                r,
                                                d[n + 5],
                                                12,
                                                1200080426
                                              )),
                                              m,
                                              f,
                                              d[n + 6],
                                              17,
                                              -1473231341
                                            )),
                                            i,
                                            m,
                                            d[n + 7],
                                            22,
                                            -45705983
                                          )),
                                          (r = this.md5_ff(
                                            r,
                                            (i = this.md5_ff(
                                              i,
                                              (m = this.md5_ff(
                                                m,
                                                f,
                                                r,
                                                i,
                                                d[n + 8],
                                                7,
                                                1770035416
                                              )),
                                              f,
                                              r,
                                              d[n + 9],
                                              12,
                                              -1958414417
                                            )),
                                            m,
                                            f,
                                            d[n + 10],
                                            17,
                                            -42063
                                          )),
                                          i,
                                          m,
                                          d[n + 11],
                                          22,
                                          -1990404162
                                        )),
                                        (r = this.md5_ff(
                                          r,
                                          (i = this.md5_ff(
                                            i,
                                            (m = this.md5_ff(
                                              m,
                                              f,
                                              r,
                                              i,
                                              d[n + 12],
                                              7,
                                              1804603682
                                            )),
                                            f,
                                            r,
                                            d[n + 13],
                                            12,
                                            -40341101
                                          )),
                                          m,
                                          f,
                                          d[n + 14],
                                          17,
                                          -1502002290
                                        )),
                                        i,
                                        m,
                                        d[n + 15],
                                        22,
                                        1236535329
                                      )),
                                      (r = this.md5_gg(
                                        r,
                                        (i = this.md5_gg(
                                          i,
                                          (m = this.md5_gg(
                                            m,
                                            f,
                                            r,
                                            i,
                                            d[n + 1],
                                            5,
                                            -165796510
                                          )),
                                          f,
                                          r,
                                          d[n + 6],
                                          9,
                                          -1069501632
                                        )),
                                        m,
                                        f,
                                        d[n + 11],
                                        14,
                                        643717713
                                      )),
                                      i,
                                      m,
                                      d[n + 0],
                                      20,
                                      -373897302
                                    )),
                                    (r = this.md5_gg(
                                      r,
                                      (i = this.md5_gg(
                                        i,
                                        (m = this.md5_gg(
                                          m,
                                          f,
                                          r,
                                          i,
                                          d[n + 5],
                                          5,
                                          -701558691
                                        )),
                                        f,
                                        r,
                                        d[n + 10],
                                        9,
                                        38016083
                                      )),
                                      m,
                                      f,
                                      d[n + 15],
                                      14,
                                      -660478335
                                    )),
                                    i,
                                    m,
                                    d[n + 4],
                                    20,
                                    -405537848
                                  )),
                                  (r = this.md5_gg(
                                    r,
                                    (i = this.md5_gg(
                                      i,
                                      (m = this.md5_gg(
                                        m,
                                        f,
                                        r,
                                        i,
                                        d[n + 9],
                                        5,
                                        568446438
                                      )),
                                      f,
                                      r,
                                      d[n + 14],
                                      9,
                                      -1019803690
                                    )),
                                    m,
                                    f,
                                    d[n + 3],
                                    14,
                                    -187363961
                                  )),
                                  i,
                                  m,
                                  d[n + 8],
                                  20,
                                  1163531501
                                )),
                                (r = this.md5_gg(
                                  r,
                                  (i = this.md5_gg(
                                    i,
                                    (m = this.md5_gg(
                                      m,
                                      f,
                                      r,
                                      i,
                                      d[n + 13],
                                      5,
                                      -1444681467
                                    )),
                                    f,
                                    r,
                                    d[n + 2],
                                    9,
                                    -51403784
                                  )),
                                  m,
                                  f,
                                  d[n + 7],
                                  14,
                                  1735328473
                                )),
                                i,
                                m,
                                d[n + 12],
                                20,
                                -1926607734
                              )),
                              (r = this.md5_hh(
                                r,
                                (i = this.md5_hh(
                                  i,
                                  (m = this.md5_hh(m, f, r, i, d[n + 5], 4, -378558)),
                                  f,
                                  r,
                                  d[n + 8],
                                  11,
                                  -2022574463
                                )),
                                m,
                                f,
                                d[n + 11],
                                16,
                                1839030562
                              )),
                              i,
                              m,
                              d[n + 14],
                              23,
                              -35309556
                            )),
                            (r = this.md5_hh(
                              r,
                              (i = this.md5_hh(
                                i,
                                (m = this.md5_hh(m, f, r, i, d[n + 1], 4, -1530992060)),
                                f,
                                r,
                                d[n + 4],
                                11,
                                1272893353
                              )),
                              m,
                              f,
                              d[n + 7],
                              16,
                              -155497632
                            )),
                            i,
                            m,
                            d[n + 10],
                            23,
                            -1094730640
                          )),
                          (r = this.md5_hh(
                            r,
                            (i = this.md5_hh(
                              i,
                              (m = this.md5_hh(m, f, r, i, d[n + 13], 4, 681279174)),
                              f,
                              r,
                              d[n + 0],
                              11,
                              -358537222
                            )),
                            m,
                            f,
                            d[n + 3],
                            16,
                            -722521979
                          )),
                          i,
                          m,
                          d[n + 6],
                          23,
                          76029189
                        )),
                        (r = this.md5_hh(
                          r,
                          (i = this.md5_hh(
                            i,
                            (m = this.md5_hh(m, f, r, i, d[n + 9], 4, -640364487)),
                            f,
                            r,
                            d[n + 12],
                            11,
                            -421815835
                          )),
                          m,
                          f,
                          d[n + 15],
                          16,
                          530742520
                        )),
                        i,
                        m,
                        d[n + 2],
                        23,
                        -995338651
                      )),
                      (r = this.md5_ii(
                        r,
                        (i = this.md5_ii(
                          i,
                          (m = this.md5_ii(m, f, r, i, d[n + 0], 6, -198630844)),
                          f,
                          r,
                          d[n + 7],
                          10,
                          1126891415
                        )),
                        m,
                        f,
                        d[n + 14],
                        15,
                        -1416354905
                      )),
                      i,
                      m,
                      d[n + 5],
                      21,
                      -57434055
                    )),
                    (r = this.md5_ii(
                      r,
                      (i = this.md5_ii(
                        i,
                        (m = this.md5_ii(m, f, r, i, d[n + 12], 6, 1700485571)),
                        f,
                        r,
                        d[n + 3],
                        10,
                        -1894986606
                      )),
                      m,
                      f,
                      d[n + 10],
                      15,
                      -1051523
                    )),
                    i,
                    m,
                    d[n + 1],
                    21,
                    -2054922799
                  )),
                  (r = this.md5_ii(
                    r,
                    (i = this.md5_ii(
                      i,
                      (m = this.md5_ii(m, f, r, i, d[n + 8], 6, 1873313359)),
                      f,
                      r,
                      d[n + 15],
                      10,
                      -30611744
                    )),
                    m,
                    f,
                    d[n + 6],
                    15,
                    -1560198380
                  )),
                  i,
                  m,
                  d[n + 13],
                  21,
                  1309151649
                )),
                (r = this.md5_ii(
                  r,
                  (i = this.md5_ii(
                    i,
                    (m = this.md5_ii(m, f, r, i, d[n + 4], 6, -145523070)),
                    f,
                    r,
                    d[n + 11],
                    10,
                    -1120210379
                  )),
                  m,
                  f,
                  d[n + 2],
                  15,
                  718787259
                )),
                i,
                m,
                d[n + 9],
                21,
                -343485551
              )),
                (m = this.safe_add(m, h)),
                (f = this.safe_add(f, t)),
                (r = this.safe_add(r, g)),
                (i = this.safe_add(i, e));
            }
            return Array(m, f, r, i);
          },
          md5_cmn(d, _, m, f, r, i) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(_, d), this.safe_add(f, i)), r), m);
          },
          md5_ff(d, _, m, f, r, i, n) {
            return this.md5_cmn((_ & m) | (~_ & f), d, _, r, i, n);
          },
          md5_gg(d, _, m, f, r, i, n) {
            return this.md5_cmn((_ & f) | (m & ~f), d, _, r, i, n);
          },
          md5_hh(d, _, m, f, r, i, n) {
            return this.md5_cmn(_ ^ m ^ f, d, _, r, i, n);
          },
          md5_ii(d, _, m, f, r, i, n) {
            return this.md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
          },
          safe_add(d, _) {
            var m = (65535 & d) + (65535 & _);
            return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m);
          },
          bit_rol(d, _) {
            return (d << _) | (d >>> (32 - _));
          }


          // ***************** md5 function eend here **********************
    },
}


