<template>
  <div id="pim_main">
    <div id="st-container-hide">
      <div class="container-fluid message-container">
      <div v-show="this.$store.state.list.page_loader == true">
        <loader />
      </div>
      </div>
      <transition name="fade" mode="out-in" @after-leave="afterLeave"
        >{{ $route.path }}
        <Nuxt :key="$route.path + $store.state.list.reactiveComponentCount" />
      </transition>
    </div>
    <!-- <FooterData /> -->
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
import Shimmer from "./../components/custom/Shimmer.vue";
import loader from "../components/custom-loader.vue";

Vue.use(VueCookies);

export default {

  components :{
    Shimmer,loader
  },
  // name: "pimweb",
  computed: {},
  watch: {

    "$store.state.list.search_input": {
      handler: function(after, before) {
        if (after == "") {
          if (this.$store.state.list.path != "") {
            this.$router.push(this.$store.state.list.path);
          }
          if (this.$store.state.list.path == "/search") {
            this.$router.push("/");
          }
        }

        if (before == "") {
          this.$store.state.list.path = this.$route.path;
          this.$router.push(`/search?q=${this.$store.state.list.search_input}`);
        } else {
          if (after != "") {
            this.$router.push({
              query: {
                ...this.$route.query,
                q: this.$store.state.list.search_input
              }
            });
          }
        }
      }
    },
    "$store.state.list.cart_product": {
      handler: function(after, before) {
        this.summary();
        this.gtm_product = [];
        for (let i = 0; i < this.$store.state.list.cart_product.length; i++) {
          let name = this.$store.state.list.cart_product[i].name;
          let id = this.$store.state.list.cart_product[i].master_sku;
          let price = this.$store.state.list.cart_product[i].selling_price;
          let variant = this.$store.state.list.cart_product[i].size;
          let category = this.$store.state.list.cart_product[i].category;
          let quantity = this.$store.state.list.cart_product[i].qty;
          this.gtm_product.push({
            name,
            id,
            price,
            variant,
            category,
            quantity
          });
        }
      }
    },
    "$store.state.list.customer_id": {
      handler: function(after, before) {
        if (
          this.$store.state.list.customer_id != null &&
          this.$store.state.list.customer_id != ""
        ) {
          this.$store.state.list.login_status = "Registered";
        } else {
          this.$store.state.list.login_status = "Guest";
        }
      }
    },
    $route(to, from) {
      if (this.$route.name == "search-slug") {
        document.querySelector("input[name='st']").value = this.$route.query.q;
        this.$store.state.list.search_input = this.$route.query.q;
      }

      this.$store.state.list.menuActive = true;
      if (this.$route.name != "category") {
        this.$store.state.list.breadcrumb = "";
        this.$store.state.list.breadcrumb_second.name = "";
        this.$store.state.list.breadcrumb_second.url = "";
      }
      if (
        (this.$store.state.list.thankyou_status === false ||
          this.$store.state.list.thankyou_status === null) &&
        this.$route.name === "thankyou"
      ) {
        this.$router.push("/");
      }
    }
  },
  data: function() {
    return {
      showCookieDisclaimer: false,
      isShowFooter: true,
      menu: [],
      favicon: "",
      displayCheckout:false,
      logo:'',
      data:'',
    };
  },
  async beforeCreate() {
     await this.$axios.get(this.$store.state.list.editor_url+"/meta")
     .then(data=>{
        this.data = data.data.data

     }).catch(err=>{
          console.log("err",err)
     })
  },  
   head() {
    return {
      title: this.data.home_page_title,
     
      link: [
           { rel: 'icon', type: 'image/x-icon', href: this.$store.state.list.image_url+'cover/40x40/'+this.data.favicon_icon }
      ],
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.data.meta ? this.data.meta.meta_title : '',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.data.meta ? this.data.meta.meta_keywords : '',
        },
        {
          hid: 'description',
          name: 'description',
          content: this.data.meta ? this.data.meta.meta_description : '',
        },
        {
          hid: 'og_url',
          name: 'og:url',
          content: this.data.meta ? this.data.meta.og.url : '',
        },
        {
          hid: 'og_type',
          name: 'og:type',
          content: this.data.meta ? this.data.meta.og.type : '',
        },
        {
          hid: 'og_image_url',
          name: 'og:image',
          content:
            this.data.meta && this.data.meta.og.image
              ? this.$store.state.list.image_url+'cover/400x0/' +this.data.meta.og.image 
              : '',
        },
        {
          hid: 'og_title',
          name: 'og:title',
          content: this.data.meta ? this.data.meta.og.title : '',
        },
        {
          hid: 'og_alt_image',
          name: 'og:image:alt',
          content: this.data.meta ? this.data.meta.og.image_alt : '',
        },
        {
          hid: 'og_site_name',
          name: 'og:site_name',
          content: this.data.meta ? this.data.meta.og.site_name : '',
        },
        {
          hid: 'og_description',
          name: 'og:description',
          content: this.data.meta ? this.data.meta.og.description : '',
        },
        {
          hid: 'twitter_card',
          name: 'twitter:card',
          content: this.data.meta ? this.data.meta.twitter_card : '',
        },
        {
          hid: 'twitter_site',
          name: 'twitter:site',
          content: this.data.meta ? this.data.meta.twitter_site : '',
        },
        {
          hid: 'twitter_image',
          name: 'twitter:image',
          content:
            this.data.meta && this.data.meta.twitter_image
              ? this.data.meta.twitter_image.url + '/1200-630.png'
              : '',
        },
        {
          hid: 'twitter_title',
          name: 'twitter:title',
          content: this.data.meta ? this.data.meta.twitter.title : '',
        },
        {
          hid: 'twitter_image_alt',
          name: 'twitter:image:alt',
          content: this.data.meta ? this.data.meta.twitter.image_alt : '',
        },
        {
          hid: 'twitter_description',
          name: 'twitter:description',
          content: this.data.meta ? this.data.meta.twitter.description : '',
        },
      ],
    }
  },
  async mounted() {
    let { data } = await this.$axios.get(this.$store.state.list.editor_url+"/styles");  // call style for current site
    let head = document.head;
    let style = document.createElement("style");
    head.appendChild(style);
    style.appendChild(document.createTextNode(data)); // append style for current site
   

  },
 
  beforeMount: async function() {
    var currentUrl = location.host;
    this.$store.state.list.thankyou_status = $cookies.get(
      window.location.hostname.substring(10, 4) + "_thank"
    );
    this.$store.state.list.cart_id = $cookies.get(
      window.location.hostname.substring(10, 4) + "_cart"
    );
    this.$store.state.list.cart_session = $cookies.get(
      window.location.hostname.substring(10, 4) + "_ct_sess"
    );
    this.$store.state.list.customer_session = $cookies.get(
      window.location.hostname.substring(10, 4) + "_cus_sess"
    );
    this.$store.state.list.thankyou_cart = $cookies.get(
      window.location.hostname.substring(10, 4) + "_cart"
    );
    this.$store.state.list.customer_id = $cookies.get(
      window.location.hostname.substring(10, 4) + "_customer"
    );


    if (
      (this.$store.state.list.thankyou_status === false ||
        this.$store.state.list.thankyou_status === null) &&
      this.$route.name === "thankyou"
    ) {
      this.$router.push("/");
    }

    if ($cookies.get("optimizeLink")) {
      this.$store.state.list.optimiseLink = true;
    }
    let query = this.$route.query;
    if (query.utm_source && query.utm_medium && query.utm_campaign) {
      $cookies.set("optimizeLink", true, "30d");
      this.$store.state.list.optimiseLink = true;
    }

    if (this.$route.name === "cart" || this.$route.name === "checkout") {
      this.isShowFooter = false;
    } else {
      this.isShowFooter = true;
    }
    this.get_account();
    if (
      this.$store.state.list.customer_id != "" &&
      this.$store.state.list.customer_id != null
    ) {
      this.get_wish();
    }
    if (
      this.$route.name != "cart" &&
      this.$route.name != "checkout" &&
      this.$route.name != "thankyou"
    ) {
      this.get_cart();
    }
    if (this.$store.state.list.store === 1) {
      this.favicon = "/images/fav.png";
    } else {
      this.favicon = "/images/fav2.ico";
    }
    // this.custom_code(); // call custom code 

  },
  methods: {
      async custom_code() {
      let headData = await fetch(
        this.$store.state.list.cart_api_url+"/site-analytics"
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
                // todo loop for according to script
                const wrapperDiv = document.createElement("div"); // create a div element
                wrapperDiv.innerHTML = data.data[i].props; // put all data in created html
                // if (wrapperDiv.childrsite-en.length == 0) {
                  // there is only a div
                  // document.body.insertAdjacentHTML(
                  //   "beforeend",
                  //   data.data[i].props
                  // );
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
    getClass(){
      return {
        'v-hide-class': this.displayCheckout,
        'v-show-class': !this.displayCheckout}
    },
    showHideTopScroll() {
      if (window.pageYOffset > 150) {
        document.getElementById("scroll-to-top").style.display = "block";
      } else {
        document.getElementById("scroll-to-top").style.display = "none";
      }
    },
    afterLeave() {
      // this.$store.state.list.$emit("triggerScroll");
    },
    summary() {
      let totalMRP = 0,
        discountMRP = 0;
       if( this.$store.state.list.cart_product.length>0){

        this.$store.state.list.cart_product.forEach(element => {
          totalMRP = totalMRP + element.price * element.qty;
          
          discountMRP = discountMRP + element.selling_price * element.qty;
        });
        discountMRP = totalMRP - discountMRP;
        this.$store.state.list.summary = {
          totalMRP: totalMRP,
          discountMRP: discountMRP
        };
       }
    },
    googleAnalyticsTag(event, coupon = "") {
      let items = this.cart_product.map(x => {
        let item = {
          id: x.master_sku,
          name: x.name,
          quantity: x.qty,
          price: x.selling_price,
          variant: x.colour,
          brand: x.brand
        };
        return item;
      });
      if (coupon) {
        gtag("event", event, {
          items: items,
          coupon: coupon
        });
      } else {
        gtag("event", event, {
          items: items
        });
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
        .then(response => {
          if (response.data.success == true) {
            //this.$store.state.list.wishpro=response.data.data.product.split(',');
            //this.$store.state.list.wishlist=response.data.data.product;
            this.$store.state.list.wishlist_count =
              response.data.data.result.count;
          }
        });
    },
   
    get_account: async function() {
      if (
        this.$store.state.list.customer_id != null &&
        this.$store.state.list.customer_id != ""
      ) {
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
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
          .then(response => {
            if (response.data.success === true) {
              this.$store.state.list.page_loader = false;
            } else {
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
              }
            }
          });
      }
    },

    get_cart:async function() {
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
          .then(response => {
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
              // if (response.data.cart_session_status == false) {
              //   $cookies.set(
              //     window.location.hostname.substring(10, 4) + "_customer",
              //     "",
              //     "1y"
              //   );
              //   $cookies.set(
              //     window.location.hostname.substring(10, 4) + "_cus_sess",
              //     "",
              //     "1y"
              //   );
              //   this.$store.state.list.customer_id = "";
              //   this.$store.state.list.customer_session = "";
              //   $cookies.set(
              //     window.location.hostname.substring(10, 4) + "_cart",
              //     "",
              //     "1y"
              //   );
              //   $cookies.set(
              //     window.location.hostname.substring(10, 4) + "_ct_sess",
              //     "",
              //     "1y"
              //   );
              //   this.$store.state.list.cart_id = "";
              //   this.$store.state.list.cart_session = "";
              //   this.$store.state.list.cart_product = [];
              // }
            }
          })
          .catch(error => {
            if (error.message === "Network Error") {
              this.$store.state.list.error_message =
                "Oops there seems to be some Network issue, please try again.";
            }
            window.scrollTo(0, 0);
          });
      }
    }
  }
};
</script>
<style>

#scroll-to-top {
  font-size: 1.4rem;
  color: #fff;
  background: var(--bs-primary);
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 100%;
  padding: 0rem 0.55rem;
  z-index: 99999999 !important;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  text-align: center;
  line-height: 2.5rem;
}
@media screen and (max-width: 767px) {
  #scroll-to-top {
    display: none !important;
  }
}
</style>
