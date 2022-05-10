<template>
  <div class="container-fluid cart-container section-main-container wishlist">
    <div class="row">
      <div class="col-md-12 product-section-main">
        <div class="row m-0">
          <div class="col-md-12">
            <h1 class="text-center cart-title">Wishlist</h1>
          </div>
        </div>
        <div class="col-md-12 product-list"  v-if="this.wishlistProduct.length">
          <div class="row row-m-30">
            <div
              class="col-md-3 col-sm-6 col-xs-6 col-6 new-class"
              v-for="(article, index) of wishlistProduct"
              :key="index"
            >
              <div class="slide-box">
                <a
                  href="#"
                  class="wishlist-remove"
                  @click.prevent="remove_w(article.id,article.group_id,article.sub_group_id)"
                  >×</a
                >
                <div class="product-box">
                  <div class="view-detail">
                    <nuxt-link
                      :to="/product/ + article.url_key"
                      :key="article.id_category"
                      class="view_detail_btn"
                      id="details"
                      @click.native="
                        gtm_product_click(
                          article.name,
                          article.sku,
                          article.selling_price,
                          article.id_category,
                          index
                        )
                      "
                    >
                      View Detail
                    </nuxt-link>
                  </div>
                  <nuxt-link
                    :to="/product/ + article.url_key"
                    :key="article.id_category"
                  >
                    <div class="product-imageSingle">
                      <img
                        :src="
                          this.$store.state.list.image_url+'cover/220x220/' +
                          encodeURI(article.image)
                        "
                        :alt="article.name"
                        :title="article.name"
                      />
                    </div>
                  </nuxt-link>
                </div>
                <div class="product-infos">
                  <p class="brand_name">
                    {{ article.brand }}
                  </p>
                  <p class="product-name m-0">
                    {{ truncate(article.name) }}
                  </p>
                    <p class="product-size">
                      Size -
                      <span  v-for="option in article.variation"
                          v-text="option.size + ', '"
                          :key="option"></span>
                    </p>

                     <div
                        class="price"
                        v-if="article.selling_price != article.price"
                      >
                        <p class="">
                          <span
                            class="price font-bold me-1"
                          >
                          <i class="kartmax_currency"></i>
                          {{article.selling_price}}
                          </span>
                          <span
                            class="old-price"
                          >
                          <i class="kartmax_currency"></i>
                          {{article.price}}
                          </span>
                          <span class="discount_percent font-bold">
                            ({{
                              (
                                100 -
                                (article.selling_price * 100) / article.price
                              ).toFixed(0)
                            }}% OFF)</span
                          >
                        </p>
                      </div>
                      <div class="price" v-else>
                        <p class="">
                          <span
                            class="price fw-bold"
                          >
                          <i class="kartmax_currency"></i>{{article.selling_price}}
                          </span>
                        </p>
                      </div>

                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="col-md-12 text-center" v-else>
              <p>
                You have no items in your Wishlist.<br />
                <nuxt-link
                  :to="{ path: '/' }"
                  :key="0"
                  v-if="this.continue_path === '' || this.continue_path === null"
                  ><span>Click here</span></nuxt-link
                >
                <nuxt-link :to="{ path: this.continue_path }" :key="0" v-else
                  ><span>Click here</span></nuxt-link
                >
                to continue shopping.
              </p>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
import Sidebar from "./sidebar.vue";
Vue.use(VueCookies);
export default {
  name: "wishlist",
  head() {
    return {};
  },
  components: {
    Sidebar,
  },
  metaInfo() {
    return {
      title: "Wishlist",
      meta: [
        { hid: "description", name: "description", content: "Wishlist" },
        {
          property: "keywords",
          content: "Wishlist",
        },
      ],
    };
  },
  data() {
    return {
      wishlist: [],
      wishlistProduct: [],
      continue_path: "",
    };
  },
  beforeMount() {
    this.get_wish();
  },
  methods: {
    gtm_product_click(name, sku, selling_price, index) {
      if (
        window.dataLayer !== undefined &&
        window.dataLayer !== null &&
        window.dataLayer !== ""
      ) {
        window.dataLayer.push({
          event: "viewDetailsFromWishlist",
          // category: '',
          action: "GO to PDP Page ",
          label: name,
          ecommerce: {
            click: {
              actionField: {
                list: index,
                action: "click",
              },
              product: [
                {
                  name: name,
                  id: sku,
                  price: selling_price,
                },
              ],
            },
          },
        });
      }
    },
    truncate(value) {
      if (value.length >= 50) {
        return value.substring(0, 50) + "...";
      } else {
        return value;
      }
    },
    remove_w(id,g_id,sub_group_id) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("product_id", id);
      form.append("group_id", g_id);
      form.append("sub_group_id", sub_group_id);
      
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + `/wishlist/remove-wishlist`,
          form
        )
        .then((response) => {
          if (response.data.success == true) {
            this.$store.state.list.page_loader = false;
            if (response.data.data.product) {
              this.wishlist = response.data.data.product.split(",");
              this.$store.state.list.wishlist_count =
                response.data.data.result.count;
              this.get_wish();
            } else {
              this.$store.state.list.wishlist_count = "0";
              this.wishlistProduct = [];
            }
            this.$toast.success(response.data.message, {
              position: "top-right",
              duration: 4000,
            });
            let wishList = document.getElementById("wishlist-count");
            if (response.data.data.total_row) {
              wishList.innerHTML = response.data.data.result.count;
            } else {
              wishList.classList.add("d-none");
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
    get_wish() {
      // this.$store.state.list.breadcrumb = "";
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("customer_id", this.$store.state.list.customer_id);
      form.append("customer_session", this.$store.state.list.customer_session);
      axios
        .post(
          this.$store.state.list.cart_api_url+'/v1' + `/wishlist/customer-wishlist`,
          form
        )
        .then((response) => {
          if (response.data.success == true) {
            this.$store.state.list.page_loader = false;

            this.wishlist = response.data.data.product.split(",");
            this.wishlistProduct = response.data.data.result.products;
            this.$store.state.list.wish_count = response.data.data.result.count;
            // if (this.wishlist.length) {
            //   axios
            //     .get(
            //       this.$store.state.list.api_url +
            //         `/api/cart/v1/wishlist/products?sku=${this.wishlist}`
            //     )
            //     .then((response) => {
            //       this.$store.state.list.page_loader = false;
            //       this.wishlistProduct = response.data.result.products;
            //     });
            // } else {
            //   this.$store.state.list.page_loader = false;
            // }
          } else {
            this.$store.state.list.page_loader = false;
            if (response.data.data.customer_session_status == false) {
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_customer",
                "",
                "1y"
              );
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cs",
                "",
                "1y"
              );
              this.$store.state.list.customer_id = "";
              this.$store.state.list.customer_session = "";
            }
          }
        });
    },
    beforeMount() {
      this.continue_path = $cookies.get(
        window.location.hostname.substring(10, 4) + "_last_list_path"
      );
      window.scrollTo(0, 0);
    },
  },
};
</script>
<style scoped>
.product-list p .price {
    font-size: 12px;
}
.product-list p .old-price {
    color: #c5c5c5;
    font-size: 12px;
    text-decoration: line-through;
    padding-right: 5px;
}
.discount_percent {
    color: #ee1010;
    font-family: "futuraregular";
}
.product-list .slide-box .product-size {
    opacity: 0;
    display: none;
}
.product-section-main .product-list .slide-box .product-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.product-list p.product-name {
    color: #696969;
}
.product-section-main .product-list .slide-box:hover .product-size {
    opacity: 1;
    display: block;
}
.product-section-main .product-list .slide-box:hover .product-size span {
    padding: 0 3px;
}

.product-list p.product-size span {
    color: #999;
    font-size: 13px;
}
.cart-container {
  padding: 0.7rem 2rem;
  min-height: 90vh;
  margin-bottom: 50px;
}
.cart-container .cart-title {
  font-size: 30px;
  margin: 25px 0;
  font-weight: bold;
}
.product-list .new-class {
  position: static;
}
.wishlist .product-list .new-class .slide-box a.wishlist-remove {
  position: absolute;
  top: 6px;
  z-index: 4;
  color: #000;
  background: #dcdcdc;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 20px;
  left: 7px;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  text-decoration: none;
}
.product-section-main .product-list .product-box .view-detail {
  position: absolute;
  display: block;
  color: #fff;
  font-size: 13px;
  line-height: 38px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  bottom: -38px;
  text-decoration: none;
  opacity: 0;
  z-index: 2;
  background: #fff;
  padding: 5px 15px 0;
}
.product-section-main .product-list .slide-box:hover .view-detail {
  opacity: 1;
  bottom: 0;
}
.product-list img {
  width: 100%;
}
.product-section-main .product-list .product-box .view-detail a {
  color: #282c3f;
  border: 1px solid #d4d5d9;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  display: block;
  line-height: 30px;
  border-radius: 3px;
  text-decoration: none;
}
.product-section-main .product-list .product-box .view-detail a:hover {
  border: 1px solid #535766;
  text-decoration: none;
}
.product-section-main .product-list .product-box {
  position: relative;
  overflow: hidden;
}

.product-box {
  padding-left: 0;
  padding-right: 0;
  float: left;
  width: 100%;
}
.product-list .new-class {
  padding-right: 15px;
  padding-left: 15px;
}
.wishlist .product-list .new-class .slide-box {
  position: relative;
}

.product-list .new-class .slide-box {
  width: 100%;
  display: inline-block;
  border: 0;
  margin-bottom: 25px;
}
.product-list p.brand_name {
  font-size: 15px;
  color: #000;
}

.product-list p {
  margin: 0;
  text-align: left;
  padding-bottom: 0;
  font-size: 15px;
  color: #000;
  overflow: hidden;
  font-weight: 400;
}

@media (max-width: 768px) {
  .wishlist .product-list .new-class {
    padding-right: 0;
    padding-left: 0;
}
.product-list .new-class:nth-child(2n - 1) {
    border-right: 1px solid #eaeaea;
}
.product-list .new-class {
    border-bottom: 2px solid #eaeaea;
}
.cart-container {
    padding: 15px 15px 0!important;
}
}

@media (min-width: 992px) {
  .price {
    padding-top: 4px;
}
  .col-md-12.product-list {
    padding-top: 25px;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .col-md-12.product-list .row {
    display: flex;
    flex-wrap: wrap;
  }
  .product-infos {
    position: relative;
    z-index: 3;
    background: #fff;
    padding: 0 10px;
    height: 100%;
    margin-top: 12px;
    box-sizing: border-box;
    overflow: hidden;
    float: left;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
