<template>
  <div id="pim_main">
    <HeaderData />

    <div class="pim_main-box">
      <span v-if="this.$route.name == 'category'">
        <nav
          aria-label="breadcrumb"
          v-if="
            this.$store.state.list.search_input === '' &&
            this.$route.name != 'index' &&
            this.$route.name != 'checkout' &&
            this.$route.name != 'login' &&
            this.$route.name != 'cart' &&
            this.$route.name != 'thankyou'
          "
        >
          <ol class="breadcrumb">
            <li
              v-for="breadcrumb in $store.state.list.breadCrumbArray"
              :class="[
                $store.state.list.breadCrumbArray.indexOf(breadcrumb) ==
                $store.state.list.breadCrumbArray.length - 1
                  ? 'breadcrumb-item active'
                  : 'breadcrumb-item font-weight-bold',
              ]"
              :key="`item-${breadcrumb.url_key}`"
            >
              <nuxt-link
                :to="{
                  path: `/${
                    breadcrumb.name == 'index' ? '' : breadcrumb.url_key
                  }`,
                }"
              >
                {{ breadcrumb.name }}
              </nuxt-link>
            </li>
          </ol>
        </nav>
      </span>
      <span v-else>
        <nav
          aria-label="breadcrumb"
          v-if="
            this.$store.state.list.search_input === '' &&
            this.$store.state.list.breadcrumb != '' &&
            this.$route.name != 'index' &&
            this.$route.name != 'checkout' &&
            this.$route.name != 'login' &&
            this.$route.name != 'cart' &&
            this.$route.name != 'thankyou' &&
            this.$route.name != 'account-dashboard' &&
            this.$route.name != 'account-orders' &&
            this.$route.name != 'account-wishlist' &&
            this.$route.name != 'account-address-book' &&
            this.$route.name != 'account-coupons' &&
            this.$route.name != 'account-return'
          "
        >
          <ol class="breadcrumb m-0 kartmax-text-f-14">
            <li class="breadcrumb-item font-weight-bold">
              <nuxt-link :to="{ path: '/' }">Home</nuxt-link>
            </li>

            <li
              class="breadcrumb-item font-weight-bold"
              v-if="this.$store.state.list.breadcrumb_second.name != ''"
            >
              <nuxt-link
                :to="{
                  path: this.$store.state.list.breadcrumb_second.url + '',
                }"
                v-text="this.$store.state.list.breadcrumb_second.name"
              >
              </nuxt-link>
            </li>
            <li
              class="breadcrumb-item active"
              v-text="this.$store.state.list.breadcrumb"
            ></li>
          </ol>
        </nav>
      </span>
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
    <FooterData />
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
import loader from "../components/custom-loader.vue";
Vue.use(VueCookies);
export default {
  // head() {
  //   return {};
  // },

  // name: "pimweb",
  //   computed: {
  //   ...mapState(['windowOrigin'])
  // },
  components: { loader },
  watch: {
    "$store.state.list.search_input": {
      handler: function (after, before) {
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
          this.$router.push(`/search?q=${this.$store.state.list.search_input}`);

          // if (after != "") {
          //   this.$router.push({
          //     query: {
          //       ...this.$route.query,
          //       q: this.$store.state.list.search_input,
          //     },
          //   });
          // }
        }
      },
    },
    "$store.state.list.cart_product": {
      handler: function (after, before) {
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
            quantity,
          });
        }
      },
    },
    "$store.state.list.customer_id": {
      handler: function (after, before) {
        if (
          this.$store.state.list.customer_id != null &&
          this.$store.state.list.customer_id != ""
        ) {
          this.$store.state.list.login_status = "Registered";
        } else {
          this.$store.state.list.login_status = "Guest";
        }
      },
    },
    $route(to, from) {
      if (this.$route.name == "search-slug") {
        document.querySelector("input[name='st']").value = this.$route.query.q;
        this.$store.state.list.search_input = this.$route.query.q;
      }

      this.$store.state.list.menuActive = true;
      if (this.$route.name != "category") {
        // this.$store.state.list.breadcrumb = "";
        // this.$store.state.list.breadcrumb_second.name = "";
        // this.$store.state.list.breadcrumb_second.url = "";
      }
      if (
        (this.$store.state.list.thankyou_status === false ||
          this.$store.state.list.thankyou_status === null) &&
        this.$route.name === "thankyou"
      ) {
        this.$router.push("/");
      }
    },
  },
  data: function () {
    return {
      showCookieDisclaimer: false,
      isShowFooter: true,
      menu: [],
      favicon: "",
      data: "",
      // token:'',
    };
  },


  async beforeCreate(){
        await this.$axios
        .get(this.$store.state.list.editor_url+"/meta")
        .then((data) => {
          this.data = data.data.data;
          this.$store.state.list.title = this.data.home_page_title;
        })
        .catch((err) => {
          console.log("err", err);
        });
  },

  async fetch() {
  try {
      var authOptions = {
        method: "get",
        url: this.$store.state.list.editor_url + "/meta",
        headers: {
          "Content-Type": "application/json",
          'Origin':  'https://octave.co.in',
        },
      };
      let res = await this.$axios(authOptions);
      if (res) {
        if (!res.data) return;
        this.data = res.data.data;
        console.log("this.data===============", this.data);
        this.$store.state.list.title = res.data.data.home_page_title;
      
    }
      
    } catch (error) {
      console.log("error >>>>>", error);
    }
  },
  head() {
    return {
      title: this.$store.state.list.title,

      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href:
            this.$store.state.list.image_url +
            "cover/40x40/" +
            this.data.favicon_icon,
        },
      ],
      meta: [
        {
          hid: "title",
          name: "title",
          content: this.data.meta ? this.data.meta.meta_title : "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.data.meta ? this.data.meta.meta_keywords : "",
        },
        {
          hid: "description",
          name: "description",
          content: this.data.meta ? this.data.meta.meta_description : "",
        },
        {
          hid: "og_url",
          name: "og:url",
          content: this.data.meta ? this.data.meta.og.url : "",
        },
        {
          hid: "og_type",
          name: "og:type",
          content: this.data.meta ? this.data.meta.og.type : "",
        },
        {
          hid: "og_image_url",
          name: "og:image",
          content:
            this.data.meta && this.data.meta.og.image
              ? this.$store.state.list.image_url +
                "400x0/" +
                this.data.meta.og.image
              : "",
        },
        {
          hid: "og_title",
          name: "og:title",
          content: this.data.meta ? this.data.meta.og.title : "",
        },
        {
          hid: "og_alt_image",
          name: "og:image:alt",
          content: this.data.meta ? this.data.meta.og.image_alt : "",
        },
        {
          hid: "og_site_name",
          name: "og:site_name",
          content: this.data.meta ? this.data.meta.og.site_name : "",
        },
        {
          hid: "og_description",
          name: "og:description",
          content: this.data.meta ? this.data.meta.og.description : "",
        },
        {
          hid: "twitter_card",
          name: "twitter:card",
          content: this.data.meta ? this.data.meta.twitter_card : "",
        },
        {
          hid: "twitter_site",
          name: "twitter:site",
          content: this.data.meta ? this.data.meta.twitter_site : "",
        },
        {
          hid: "twitter_image",
          name: "twitter:image",
          content:
            this.data.meta && this.data.meta.twitter_image
              ? this.data.meta.twitter_image.url + "/1200-630.png"
              : "",
        },
        {
          hid: "twitter_title",
          name: "twitter:title",
          content: this.data.meta ? this.data.meta.twitter.title : "",
        },
        {
          hid: "twitter_image_alt",
          name: "twitter:image:alt",
          content: this.data.meta ? this.data.meta.twitter.image_alt : "",
        },
        {
          hid: "twitter_description",
          name: "twitter:description",
          content: this.data.meta ? this.data.meta.twitter.description : "",
        },
        {
          hid: this.data.meta
            ? this.data.meta.domain_verification_facebook.name
            : "",
          name: this.data.meta
            ? this.data.meta.domain_verification_facebook.name
            : "",
          content: this.data.meta
            ? this.data.meta.domain_verification_facebook.content
            : "",
        },
        {
          hid: this.data.meta
            ? this.data.meta.domain_verification_google.name
            : "",
          name: this.data.meta
            ? this.data.meta.domain_verification_google.name
            : "",
          content: this.data.meta
            ? this.data.meta.domain_verification_google.content
            : "",
        },
        {
          hid: this.data.meta
            ? this.data.meta.domain_verification_twitter.name
            : "",
          name: this.data.meta
            ? this.data.meta.domain_verification_twitter.name
            : "",
          content: this.data.meta
            ? this.data.meta.domain_verification_twitter.content
            : "",
        },
      ],
    };
  },

  async mounted() {
   

    let { data } = await this.$axios.get(
      this.$store.state.list.editor_url+"/styles"
    ); // call style for current site
    let head = document.head;
    let style = document.createElement("style");
    head.appendChild(style);
    style.appendChild(document.createTextNode(data)); // append style for current site
    this.get_cart()
  },

  beforeMount: async function () {
    if(process.client) {
    window.addEventListener("message", (event) => {
        let data;
        data = event.data
       if(typeof event.data == "string" && event.data !== 'close' && event.data !==''){
          data = JSON.parse(event.data)
        }
        var frame = document.getElementById("checkout");
        if(frame !== null){
           frame.parentNode.removeChild(frame);
        if(data == 'close'){
            return
        }
        else if(data.order_quote_id !== null && data.order_quote_id !== undefined){
          this.$store.state.list.customer_id = data.customer_id
          this.$store.state.list.customer_session = data.customer_session

          this.$router.push(`/account/order-detail?id=${data.order_quote_id}`)
        }else{
          this.$toast.error(
                "Oops there seems to be some Network issue, please try again.",
                {
                  position: "top-center",
                  duration: 4000,
                }
              );
          }
        }

      //  location.reload();
    }, false);
    }
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
    // this.get_account();
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
      // this.get_cart();
    }
    if (this.$store.state.list.store === 1) {
      this.favicon = "/images/fav.png";
    } else {
      this.favicon = "/images/fav2.ico";
    }
    this.custom_code(); // call custom code
  },

  methods: {
    async custom_code() {
      let headData = await fetch(
        this.$store.state.list.cart_api_url + "/site-analytics"
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
                    document.body.appendChild(scriptElement);
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
                    document.body.appendChild(scriptElement);
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
          } else {
            console.log("data is not found in custom head");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    afterLeave() {
      // this.$store.state.list.$emit("triggerScroll");
    },
    summary() {
      let totalMRP = 0,
        discountMRP = 0;
      if (
        this.$store.state.list.cart_product !== null &&
        this.$store.state.list.cart_product !== undefined &&
        this.$store.state.list.cart_product !== ""
      ) {
        if (this.$store.state.list.cart_product.length > 0) {
          this.$store.state.list.cart_product.forEach((element) => {
            totalMRP = totalMRP + element.price * element.qty;
            discountMRP = discountMRP + element.selling_price * element.qty;
          });
          discountMRP = totalMRP - discountMRP;

          this.$store.state.list.summary = {
            totalMRP: totalMRP,
            discountMRP: discountMRP,
          };
        }
      }
    },
    googleAnalyticsTag(event, coupon = "") {
      let items = this.cart_product.map((x) => {
        let item = {
          id: x.master_sku,
          name: x.name,
          quantity: x.qty,
          price: x.selling_price,
          variant: x.colour,
          brand: x.brand,
        };
        return item;
      });
      if (coupon) {
        gtag("event", event, {
          items: items,
          coupon: coupon,
        });
      } else {
        gtag("event", event, {
          items: items,
        });
      }
    },
    get_wish() {
      var form = new FormData();
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(
          this.$store.state.list.cart_api_url +
            "/v1" +
            `/wishlist/customer-wishlist`,
          form
        )
        .then((response) => {
          if (response.data.success == true) {
            this.$store.state.list.wishlist = response.data.data.list;

            this.$store.state.list.wishlist_count =
              response.data.data.result.count;
          }
        });
    },

    get_account: function () {
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
        axios
          .post(
            this.$store.state.list.cart_api_url +
              "/v1" +
              "/customer/account-details",
            form
          )
          .then((response) => {
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

    get_cart: async function () {
      this.$store.state.list.cart_id = $cookies.get(
        window.location.hostname.substring(10, 4) + "_cart"
      );

      if (
        this.$store.state.list.cart_id != null &&
        this.$store.state.list.cart_id != ""
      ) {
        var form = new FormData();
        form.append("cart_id", this.$store.state.list.cart_id);
        form.append("cart_session", this.$store.state.list.cart_session);
        await axios
          .post(
            this.$store.state.list.cart_api_url + "/v1" + "/cart/get-cart",
            form
          )
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
          .catch((error) => {
            if (error.message === "Network Error") {
              this.$store.state.list.error_message =
                "Oops there seems to be some Network issue, please try again.";
            }
            window.scrollTo(0, 0);
          });
      }
    },
  },
};
</script>
<style>
.pim_main-box {
  min-height: 500px;
  width: 100%;
}
#pim_main {
  width: 100%;
}
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
  .pim_main-box {
    min-height: 250px;
  }
}

ol.breadcrumb {
  padding: 10px 20px;
}
ol.breadcrumb .breadcrumb-item a {
  color: #000;
  text-decoration: none;
}
</style>
