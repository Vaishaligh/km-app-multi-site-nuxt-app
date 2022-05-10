<template>
  <div>
    <div class="container-fluid product-list-main p-0" >
      
      <div v-if="filter_error_msg != ''">
        <div class="w-100 pro-count">
            <h1 class="font-bold">{{ categorie_name }}</h1>
            <span class="item_count"> - 0 Items</span>
        </div>
        <div class="no_products text-center">
          <h2>Sorry !</h2>
          <h5>{{ filter_error_msg }}</h5>
          <img src="/../images-kartmax/no_product.png" alt="" width="200" />
        </div>
      </div>
      <div v-else>
        <div class="w-100 pro-count" v-if="product_count != ''">
            <h1 class="font-bold">{{ categorie_name }}</h1>
            <span class="item_count"> {{ product_count + " Items Found" }}</span>
        </div>
        <div class="row km_plp_page" v-if="blankpage === false && pageload === false">
          <client-only>
            <div class="lazy-sidebar">
            <div
              class="col-md-2 col-12 sidebar-main"
              id="sidebar-main"
              v-if="this.filter_status === true"
            >
              <!-- sidebar code start here -->
              <nav id="sidebar-inner">
                <div class="sidebar-header border-bottom">
                  <h3 class="fw-bold text-uppercase text-dark m-0 w-100">
                    filters
                    <a
                      href="#"
                      v-if="filtersAppied.length != 0"
                      class="
                        filter-clear
                        text-primary
                        float-end
                        text-capitalize
                      "
                      @click.prevent="removeallfilter()"
                      >Clear All</a
                    >
                  </h3>
                </div>

                <ul
                  v-if="filters.length > 0"
                  class="list-unstyled components m-o ps-0"
                >
                  <li
                    class="filter-box border-end border-bottom"
                    v-for="(article, index) of filters"
                    :key="index"
                    :class="{
                      color: article.filter_lable === 'Colour',
                      size_filter: article.filter_lable === 'Size',
                    }"
                  >
                    <a
                      href="#"
                      class="
                        dropdown-toggle
                        active
                        mb-2
                        fs-6
                        text-dark text-decoration-none
                        d-block
                        text-capitalize
                      "
                      :class="{
                        'mobile-active': filterActive(article.filter_lable),
                      }"
                      @click.prevent="toggle"
                      v-text="article.filter_lable"
                    ></a>
                    <ul
                      class="collapse list-unstyled"
                      :class="{
                        'mobile-active': filterActive(article.filter_lable),
                      }"
                    >
                      <li
                        v-for="option in article.options"
                        :class="option.value_key.toLowerCase()" :key="option"
                      >
                        <a
                          href="#"
                          class="
                            d-block
                            pb-0
                            position-relative
                            text-decoration-none
                          "
                          @click.prevent="
                            addfilter(
                              article.filter_lable,
                              option.code,
                              option.value,
                              option.value
                            )
                          "
                          :class="{
                            check: isActive(option.code + '~' + option.value),
                          }"
                          :value="article.filter_lable + '_' + option.value"
                          v-if="option.value != ''"
                          >{{
                            option.value.includes("7001 to")
                              ? "More than Rs. 7000"
                              : option.value.includes("to Rs.1000")
                              ? "Upto 1000"
                              : option.value
                          }}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul v-else class="list-unstyled components">
                  <li class="ml-3 filter-box">No filters</li>
                </ul>
              </nav>
              <!-- sidebar code end  -->
              <button
                @click="close_mobile_filter"
                class="apply_mobile_filter text-primary"
              >
                Apply
              </button>
              <button @click="close_mobile_filter" class="close_mobile_filter">
                Close
              </button>
            </div>
            </div>


          </client-only>
          <div class="col-md-10 col-12 product-section-main">
            <!-- <div class="row"> -->
            <div class="row row-filter">
              <div class="col-md-9 col-sm-12">
                <div v-if="foldContent" class="mb-2" v-html="foldContent"></div>
                <div class="applied-filter" v-if="filtersAppied.length != 0">
                  <client-only>
                    <ul class="m-0 p-0">
                      <li
                        v-for="(items, index) in filterview"
                        class="d-inline-block me-1 border mb-1"
                        :key="items"
                      >
                        <span>{{ items[Object.keys(items)] }}</span
                        ><a
                          href="#"
                          class="remove"
                          @click.prevent="removefilter(index)"
                          ><i class="fa fa-close"></i
                        ></a>
                      </li>
                    </ul>
                  </client-only>
                </div>
              </div>
              <client-only>
                <div class="col-md-3 product-sort">
                  <div
                    class="
                      sortnew
                      text-dark
                      float-end
                      position-relative
                      w-100
                      border
                    "
                  >
                    Sort by :
                    <span
                      class="text-capitalize text-dark"
                      v-for="(item, index) of sort"
                      :key="index"
                      v-if="select_sort == item.code"
                      :class="{ active: select_sort == item.code }"
                      >{{
                        item.label == "Rank" ? "Popularity" : item.label
                      }}</span
                    >

                    <span class="sortby-arrow text-capitalize text-dark"></span>

                    <ul
                      class="
                        sort-list
                        bg-white
                        position-absolute
                        m-0
                        border border-top-0
                      "
                    >
                      <li
                        class="d-block text-dark"
                        v-for="(item, index) of sort"
                        :key="index"
                        :class="{ active: select_sort == item.code }"
                        @click="select_sort_click(item.code, item.label)"
                        v-if="item.label != 'Price'"
                        v-text="
                          item.label == 'Rank' ? 'Popularity' : item.label
                        "
                      ></li>
                    </ul>
                  </div>
                  <div
                    class="sortoverlay"
                    v-show="sort_show == true"
                    @click="select_sort_click(select_sort)"
                  >
                    <ul class="sort-dropdown">
                      <li class="heading font-bold">SORT BY</li>

                      <li
                        v-for="(item, index) of sort"
                        :key="index"
                        :class="{ active: select_sort == item.code }"
                        @click="select_sort_click(item.code)"
                        v-if="item.label != 'Price'"
                        v-text="item.label"
                      >
                        <span>{{ item.label }} </span>
                      </li>
                    </ul>
                  </div>

                  <button @click="show_sort" class="product-sort">
                    Sort by
                  </button>
                  <button
                    class="mobile-filter"
                    v-if="this.filter_status === false"
                    @click="filter_show"
                  >
                    Filter
                  </button>
                </div>
              </client-only>
            </div>
            <div class="product-imageSlider no-use" style="display: none"></div>
              <div class="container-fluid">
      <div class="row">
   <!-- <Products v-for="item in product_list" v-bind:item="item" :key="item.id"/> -->
      </div>
              </div>
              <div class="col-md-12 product-list">
               <div class="row">
                    <div class="col-md-12" v-if="this.filter_error_msg != ''">
                        <div class="error_message" v-text="this.filter_error_msg"
                            v-if="this.filter_error_msg != ''"></div>
                    </div>
                    <div class="col-md-3 col-sm-6 col-xs-6 col-6 new-class" v-for="(article, index) of product_list"
                        :key="index">
                        <div class="slide-box" @mouseenter="productlisthover(index)" @mouseleave="productlisthoverout">
                            <div class="product-box">
                                <div class="view-detail"  :class="{'hide': sameslide == index}" >
                                    <nuxt-link :to="{path:'/product/'+article.url_key}"
                                        :key="article.id_category" class="view_detail_btn" id="details"
                                        @click.native="gtm_product_click(article.name,article.sku,article.selling_price,article.category,index)">
                                        View Detail
                                    </nuxt-link>
                                    <p class="text-center colorDotsWraps" id="colorClick">
                                        <span v-for=" colorObj in article.color_options" class="colorDots" :key="`${article.productId}-${colorObj.colour}`"
                                         :class="colorObj.colour.toLowerCase()" 
                                         @click="$router.push({path:'/product/'+colorObj.url_key})" v-bind:style="{ background: colorObj.colour.toLowerCase() }" ></span>
                                        
                                    </p>
                                    
                                    <p class="product-size">Size -
                                        <span v-for="(option, index) in article.variation" v-text="option.size+'  '" :key="`variation-${index}`"></span> </p>

                                </div>
                                <nuxt-link
                                    :to="{path:'/product/'+article.url_key}"
                                    :key="article.id_category"
                                    @click.native="gtm_product_click(article.name,article.sku,article.selling_price,article.category,index)">
                                   <!-- <div class="slider_content product-imageSlider" v-if="sameslide == index">
                                      <div class="swiper swiper_plp"  :class="article.sku">
                                        <div class="swiper-wrapper">
                                          <div
                                            class="swiper-slide"
                                            v-for="i in article.gallery"
                                            :key="i.image"
                                          
                                          >
                                            <img
                                              :src="
                                                'https://pictures.kartmax.in/live/cover/400x400/' +
                                                  i.image
                                              "
                                              alt="img"
                                              class="w-100"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div class="swiper-pagination"></div>
                                      <div class="swiper-button-prev"></div>
                                      <div class="swiper-button-next"></div>
                                    </div>  -->
                                    <!-- <div class="product-imageSlider" v-if="sameslide == index && mobile_view == false">
                                        <slick ref="slick" :options="slickOptions" class="product_image_slide">
                                            <img v-for="(item,index) in article.gallery"  :src="item.image" :alt="item.title" :title="item.title" class="w-100"  :key="`galleryImage-${index}`">
                                        </slick>
                                    </div> -->
                                    <div class="product-imageSingle" :class="{'hide': sameslide == index}" style="position: relative; min-height: 225px;"  @mouseleave="setFalse(article)" @mouseover="setTrue(article)">
                                        <img :src="'https://pictures.kartmax.in/live/' + article.image" class="w-100" :alt="article.name"  :title="article.name">
                                    </div>
                                </nuxt-link>
                              
                               <!-- <a href="#" class="wishlist" v-if="!wishActive(article.id)" @click.prevent="add_w(article.id)"><i aria-hidden="true" class="fa fa-heart-o"></i><i class="fa fa-bookmark-o" aria-hidden="true"></i> </a>
                                <a href="#" class="wishlist" v-else @click.prevent="remove_w(article.id_product)"><i aria-hidden="true" class="fa fa-heart active"></i><i class="fa fa-bookmark" aria-hidden="true"></i><span></span> 
                                </a> -->
                                
                            </div>
                            <div class="product-infos">
                      
                                <a href="#" class="wishlist" v-if="!wishActive(article.id)" @click.prevent="add_w(article.id)" :key="wish">
                                  <i class="far fa-heart"></i>
                                 </a>
                                <a href="#" class="wishlist" v-else @click.prevent="remove_w(article.id)">
                                 <i class="fas fa-heart"></i>
                                </a>
                            
                                  <p class="product-name">{{truncate(article.name)}}</p>
                                <div class="price" v-if="article.selling_price != article.price">
                                    <p><span class="price font-bold"
                                            style="padding-right: 5px;">Rs. {{article.selling_price  }}</span> <span class="old-price"
                                              style="padding-right: 0px;">Rs. {{article.price  }}</span>
                                              <br>
                                        <span class="discount_percent"> ({{(100 - (article.selling_price*100)/article.price).toFixed(0)}}% OFF)</span>
                                    </p>
                                </div>
                                <div class="price" v-else>
                                    <p><span class="price font-bold"
                                            >Rs. {{article.selling_price  }}</span></p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
              </div>
                 
            
            <!-- <div class="col-md-12 product-list">
              <div class="row sanjay">
                <div v-html="plpContent" v-show="displayPlp"></div>
              </div>
              <Shimmer
                :style="{ height: '100vh', width: 'auto' }"
                v-bind:class="getClass()"
              />
            </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <Shimmer
      :style="{ height: '100vh', width: 'auto' }"
      v-bind:class="getClass()"
    /> -->
    <div class="product_loader" v-show="pageload == true">
      <loader />
    </div>
  </div>
</template>
<script src="https://unpkg.com/swiper@7.0.8/swiper-bundle.min.js"></script>

<script>
  
import axios from "axios";

import Vue from "vue";
import VueCookies from "vue-cookies";
import Shimmer from "../../components/custom/Shimmer";
import loader from "../../components/custom-loader.vue"
Vue.use(VueCookies);

export default {
  name: "product_list",
  components: {
    Shimmer,loader,
  },
  head() {
    return {
      title: this.meta_title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta_description,
        },
        { hid: "keywords", property: "keywords", content: this.meta_keyword },
      ],
    };
  },
  props: {
    formatter: null,
    tooltipMerge: null,
    enableCross: null,
    slider: null,
  },

  data: function () {
    return {
      sliderCalled: false,
      busy: false,
      plpContent: "",
      foldContent: "",
      isQuerySort: false,
      moreColors: {},
      showMoreColorsMobile: false,
    
      pricerange: {
        value: [],
        options: {
          dotSize: 14,
          width: "auto",
          height: 4,
          contained: false,
          direction: "ltr",
          data: null,
          min: null,
          max: null,
          code: null,
          interval: 1,
          disabled: false,
          clickable: true,
          duration: 0.5,
          adsorb: false,
          lazy: false,
          tooltip: "active",
          tooltipPlacement: "top",
          tooltipFormatter: void 0,
          useKeyboard: false,
          keydownHook: null,
          dragOnClick: false,
          enableCross: true,
          fixed: false,
          minRange: void 0,
          maxRange: void 0,
          order: true,
          marks: false,
          dotOptions: void 0,
          process: true,
          dotStyle: void 0,
          railStyle: void 0,
          processStyle: void 0,
          tooltipStyle: void 0,
          stepStyle: void 0,
          stepActiveStyle: void 0,
          labelStyle: void 0,
          labelActiveStyle: void 0,
        },
      },
      similar_Product: [],
      similarPopup: false,
      wishlist: [],
      wish:0,
      meta_title: "",
      description: "",
      meta_description: "",
      meta_keyword: "",
      product_loader: true,
      Product_MoreLoad: true,
      filter_error_msg: "",
      filter_status: true,
      mobilefilterActive: "",
      blankpage: false,
      page: 1,
      pageload: true,
      pslidedisplay: false,
      pimagedisplay: true,
      sameslide: 9999,
      pageload: true,
      pageSize: "",
      service: "category",
      count: 10,
      sort_show: false,
      id_category: this.$route.params.cat_id,
      product_list: [],
      filters: [],
      filtersAppied: [],
      filterview: [],
      apifilter: "",
      filter_api_url: [],
      colorsActive: [],
      sizesActive: [],
      sort: [
        { code: "price_low", label: "Price: Low to High" },
        { code: "selling_price", label: "Price: High to Low" },
      ],
      select_sort: "rank",
      selected_sort: "Recommended",
      pass_sort: "",
      pass_url_key: this.$route.params.category,
      sort_dir: "desc",
      categorie_name: "",
      current_filter: "",
      product_count: "",
      get_product_length: "",
      gtm_product_impressions: [],
      mobile_view: false,
      displayPlp: false,
    };
  },
  renderTriggered({ key, target, type }) {},
  methods: {
    setFalse: function(item) {
      if (item.gallery !== null || item.gallery !== undefined) {
        this.slideShow = false && !this.isDeviceMobile;
      }
    },
    setTrue: function(item) {
      // if (item.gallery !== null || item.gallery !== undefined) {
      //   this.slideShow = true && !this.isDeviceMobile;
      // }
      const swiper = new Swiper('.swiper_plp', {
        slidesPerView: 1,
        autoplay: {
          delay: 2000
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    },
    getClass() {
      return {
        "v-hide-class": this.displayPlp,
        "v-show-class": !this.displayPlp,
      };
    },
    loadMore: function () {
      this.busy = true;
    },

   

    getMoreColorsMobileProducts(article) {
      this.showMoreColorsMobile = true;
      this.moreColors = article;
    },
    similarProduct(url) {
      this.$store.state.list.page_loader = true;
      axios
        .get(this.$store.state.list.api_url + `/pim/pimresponse.php/`, {
          params: {
            service: "product",
            store: this.$store.state.list.store,
            url_key: url,
          },
        })
        .then((response) => {
          this.$store.state.list.page_loader = false;
          if (response.data.response.success === 1) {
            this.similarPopup = true;
            this.similar_Product = response.data.result.similar_product_list;
          } else {
            this.$toast.error(response.data.response.error_message, {
              position: "top-center",
              duration: 4000,
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
                duration: 4000,
              }
            );
          }
        });
      //this.similar_Product = this.product_list[index].similar_product_list;
      document.body.style.overflow = "hidden";
    },
    similarPopupclose() {
      document.body.style.overflow = "auto";
      this.similarPopup = false;
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
    add_to_cart(index) {
      if (this.$store.state.list.cart_product.length != 0) {
        var found = false;
        for (let i = 0; i < this.$store.state.list.cart_product.length; i++) {
          if (
            this.$store.state.list.cart_product[i].variant_id ==
            this.product_list[index].variation[0].id_product
          ) {
            if (
              this.$store.state.list.cart_product[i].max_qty <=
              this.$store.state.list.cart_product[i].qty
            ) {
              this.$toast.error(
                "Available quantity you have already added to your cart",
                {
                  position: "top-center",
                }
              );
              found = true;
              break;
            }
          }
        }
        if (found === false) {
          this.$store.state.list.cart_id = $cookies.get(
            window.location.hostname.substring(10, 4) + "_cart"
          );
          this.$store.state.list.page_loader = true;
          var form = new FormData();
          form.append(
            "product_id",
            this.product_list[index].variation[0].id_product
          );
          form.append("product_parent_id", this.product_list[index].id_product);
          form.append(
            "product_options",
            this.product_list[index].variation[0].configrable_atribute_value
          );
          form.append("name", this.product_list[index].name);
          form.append("sku", this.product_list[index].variation[0].sku);
          form.append("master_sku", this.product_list[index].sku);
          form.append("price", this.product_list[index].price);
          form.append("qty_ordered", "1");
          form.append("final_price", this.product_list[index].selling_price);
          form.append("store", this.$store.state.list.store);
          if (
            this.$store.state.list.cart_id != null &&
            this.$store.state.list.cart_id != ""
          ) {
            form.append("cart_id", this.$store.state.list.cart_id);
          }
          if (
            this.$store.state.list.customer_id != null &&
            this.$store.state.list.customer_id != ""
          ) {
            form.append("customer_id", this.$store.state.list.customer_id);
          }
          let config = { headers: { "Content-Type": "multipart/form-data" } };
          axios
            .post(
              this.$store.state.list.cart_api_url+'/v1' + "/product/add-product",
              form,
              config
            )
            .then((response) => {
              if (response.data.success === true) {
                this.$toast.success(response.data.message, {
                  position: "top-center",
                  duration: 4000,
                });
                this.$store.state.list.error_message = "";
                this.$store.state.list.page_loader = false;
                this.$store.state.list.cart_product =
                  response.data.data.products;
                this.$store.state.list.cart_total =
                  response.data.data.grand_total;
                this.$store.state.list.cart_subtotal =
                  response.data.data.order_subtotal;
                this.$store.state.list.discount_code =
                  response.data.data.discount_code;
                this.$store.state.list.discount_amount =
                  response.data.data.discount_amount;
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
                $cookies.set(
                  window.location.hostname.substring(10, 4) + "_cart",
                  response.data.data.cart_id
                );
                this.$store.state.list.cart_id = response.data.data.cart_id;
                this.$store.state.list.thankyou_cart =
                  response.data.data.cart_id;
                this.$store.state.list.minicart = false;
              } else {
                this.$store.state.list.success_message = "";
                this.$toast.error(response.data.message, {
                  position: "top-center",
                  duration: 4000,
                });
                this.$store.state.list.page_loader = false;
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
      } else {
        this.$store.state.list.cart_id = $cookies.get(
          window.location.hostname.substring(10, 4) + "_cart"
        );
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append(
          "product_id",
          this.product_list[index].variation[0].id_product
        );
        form.append("product_parent_id", this.product_list[index].id_product);
        form.append(
          "product_options",
          this.product_list[index].variation[0].configrable_atribute_value
        );
        form.append("name", this.product_list[index].name);
        form.append("sku", this.product_list[index].variation[0].sku);
        form.append("master_sku", this.product_list[index].sku);
        form.append("price", this.product_list[index].price);
        form.append("qty_ordered", "1");
        form.append("final_price", this.product_list[index].selling_price);
        form.append("store", this.$store.state.list.store);
        if (
          this.$store.state.list.cart_id != null &&
          this.$store.state.list.cart_id != ""
        ) {
          form.append("cart_id", this.$store.state.list.cart_id);
        }
        if (
          this.$store.state.list.customer_id != null &&
          this.$store.state.list.customer_id != ""
        ) {
          form.append("customer_id", this.$store.state.list.customer_id);
        }
        let config = { headers: { "Content-Type": "multipart/form-data" } };
        axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + "/product/add-product",
            form,
            config
          )
          .then((response) => {
            if (response.data.success === true) {
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.$store.state.list.error_message = "";
              this.$store.state.list.page_loader = false;
              this.$store.state.list.cart_product = response.data.data.products;
              this.$store.state.list.cart_total =
                response.data.data.grand_total;
              this.$store.state.list.cart_subtotal =
                response.data.data.order_subtotal;
              this.$store.state.list.discount_code =
                response.data.data.discount_code;
              this.$store.state.list.discount_amount =
                response.data.data.discount_amount;
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
              $cookies.set(
                window.location.hostname.substring(10, 4) + "_cart",
                response.data.data.cart_id
              );
              this.$store.state.list.cart_id = response.data.data.cart_id;
              this.$store.state.list.thankyou_cart = response.data.data.cart_id;
              this.$store.state.list.minicart = false;
            } else {
              this.$store.state.list.success_message = "";
              this.$toast.error(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.$store.state.list.page_loader = false;
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
    show_sort() {
      if (this.sort_show == true) {
        this.sort_show = false;
      } else {
        this.sort_show = true;
      }
    },
    select_sort_click(value, label) {
      this.select_sort = value;
      this.sort_show = false;
    },
    productlisthover(index) {
      this.sameslide = index;
    },
    productlisthoverout() {
      this.sameslide = 10000;
    },
    gtm_product_click: function (name, id, price, category, position) {},
    filterActive: function (item) {
      return this.mobilefilterActive === item;
    },
    close_mobile_filter: function () {
      this.filter_status = false;
    },
    toggle: function (event) {
      event.target.classList.toggle("active");
      if (screen.width < 768) {
        this.mobilefilterActive = event.target.text;
      }
    },
    filter_show: function () {
      this.filter_status = true;
    },
    async add_w(id) {
      this.pageload = true
      if (
        this.$store.state.list.customer_id != "" &&
        this.$store.state.list.customer_id != null
      ) {
        this.$store.state.list.page_loader = true;
        var form = new FormData();
        form.append("product_id", id);
        form.append("customer_id", this.$store.state.list.customer_id);
        form.append(
          "customer_session",
          this.$store.state.list.customer_session
        );
        await axios
          .post(
            this.$store.state.list.cart_api_url+'/v1' + `/wishlist/add-wishlist`,
            form
          )
          .then((response) => {
            this.$store.state.list.page_loader = false;
            if (response.data.success == true) {
              //this.$store.state.list.wishlist = response.data.data.product;
              this.wishlist = response.data.data.product.split(",");
              this.$store.state.list.wishlist_count =
                response.data.data.total_row;
              //this.wishlist = true;
              this.$toast.success(response.data.message, {
                position: "top-center",
                duration: 4000,
              });
              this.wish = this.wish +1 
               if (this.$store.state.list.wishlist_count) {
                document.getElementById(
                  "wishlist-count"
                ).innerHTML = this.$store.state.list.wishlist_count;
              }
              
              let index = this.product_list.filter((e) => e.id == id);
              let item = index[0];
              if (
                window.dataLayer !== undefined &&
                window.dataLayer !== null &&
                window.dataLayer !== ""
              ) {
                window.dataLayer.push({
                  event: "addToWishlist",
                  action: "addToWishlist",
                  ecommerce: {
                    currencyCode: "INR",
                    add: {
                      product: [
                        {
                          name: item.name,
                          id: item.sku,
                          price: item.price,
                          // category: this.$store.state.product_list[h].sub_category,
                        },
                      ],
                    },
                  },
                });
              }
            this.pageload = false

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
                this.pageload = false

            }
            this.pageload = false

          });
      } else {
        this.$router.push("/login");
      }
    },
    remove_w(id) {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("product_id", id);
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
                response.data.data.total_row;
            } else {
              this.$store.state.list.wishlist_count = "0";
              this.wishlist = [];
            }
            this.$toast.success(response.data.message, {
              position: "top-center",
              duration: 4000,
            });
            this.wish = this.wish -1
            if (this.$store.state.list.wishlist_count) {
                document.getElementById("wishlist-count").innerHTML =
                  this.$store.state.list.wishlist_count;
              }
            let index = this.product_list.filter((e) => e.id == id);
            let item = index[0];
            if (
              window.dataLayer !== undefined &&
              window.dataLayer !== null &&
              window.dataLayer !== ""
            ) {
              window.dataLayer.push({
                event: "removeWishlist",
                action: "removeWishlist",
                ecommerce: {
                  currencyCode: "INR",
                  add: {
                    product: [
                      {
                        name: item.name,
                        id: item.sku,
                        price: item.price,
                        // category: this.$store.state.product_list[h].sub_category,
                      },
                    ],
                  },
                },
              });
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
    async getProductList(firstLoad = false) {
    
      // setTimeout(() =>window.scrollTo(0, 0), 0);
      this.$store.state.list.page_loader = true;
      this.$store.state.list.footerDescription = "";
      this.$store.state.list.topProducts = [];
      if (this.$route.name === "collections") {
        this.service = "collections";
        this.pass_url_key = this.$route.params.url_key;
      }
    //   var loader_el = document.querySelector(".product_loader");

    //   var loader_position = loader_el.offsetTop;

    //   this.loader_position = loader_position;
      this.filter_error_msg = "";
      // if ((window.scrollY >= loader_position - 1000) && (this.Product_MoreLoad === true)) {
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      this.Product_MoreLoad = false;
      this.pageload = true;
      await this.$axios
        .get(
          this.$store.state.list.cart_api_url+`/v1/search`,
          {
            params: {
              text:this.$route.query.q,
              page: this.page,
              count: this.count,
              sort_by: this.pass_sort,
              sort_dir: this.sort_dir,
              filter: this.apifilter,
            },
          }
        )
        .then((response) => {
          if (response.data.response.success === 1) {
            if (response.data.result.products.length === 0) {
              this.filter_error_msg =
                "No product found.";
                // this.sort = []
            }
            // this.foldContent = response.data.result.fold_content
            // this.$store.state.list.topProductsCategory = response.data.result.name
            // this.$store.state.list.topProducts = response.data.result.top_products ? response.data.result.top_products : []
            // this.description = response.data.result.description;
            // this.$store.state.list.footerDescription = response.data.result.description;
            // this.meta_title = response.data.result.meta_title;
            // this.meta_description = response.data.result.meta_description;
            // this.meta_keyword = response.data.result.meta_keyword;
            // this.$store.state.list.breadCrumbArray = JSON.parse(response.data.result.breadcrumb)
            this.product_list = [];
            this.product_list = this.product_list.concat(
              response.data.result.products
            );
            this.selected_sort = response.data.query.sort_by;
            this.gtm_product_impressions = [];
            for (let i = 0; i < response.data.result.products.length; i++) {
              let name = response.data.result.products[i].name;
              let id = response.data.result.products[i].sku;
              let price = response.data.result.products[i].selling_price;
              let category = response.data.result.products[i].category;
              let list = response.data.result.name;
              let position = i + 1;
              this.gtm_product_impressions.push({
                name,
                id,
                price,
                category,
                list,
                position,
              });
            }

            if (response.data.result.filters) {
              this.filters = response.data.result.filters;
              for (let i = 0; i < response.data.result.filters.length; i++) {
                if (response.data.result.filters[i].filter_lable == "Price") {
                  this.pricerange.options.min = Number(
                    response.data.result.filters[i].options[0]
                  );
                  this.pricerange.options.max = Number(
                    response.data.result.filters[i].options[1]
                  );
                  this.pricerange.value.push(
                    Number(response.data.result.filters[i].options[0])
                  );
                  this.pricerange.value.push(
                    Number(response.data.result.filters[i].options[1])
                  );
                  this.pricerange.options.code = "selling_price";
                  //this.pricerange.newValue = 'Rs.'+this.pricerange.value[0]+' to '+'Rs.'+this.pricerange.value[1];
                }
              }
            }
            // this.$store.state.list.page_loader = false
            if (response.data.result.filters.length > 0) {
              this.mobilefilterActive =
                response.data.result.filters[0].filter_lable;
            }
            // if (!firstLoad) {
            //   this.sort = this.sort.concat(response.data.result.sort);
            // }
            if(response.data.result.products.length > 0){
                response.data.result.sort.map(e=>{
                  if(this.sort.indexOf(e.code) == -1){
                    this.sort.push(e)
                  }
                })
            }
            
            // this.sort = this.sort.concat(response.data.result.sort);
            this.categorie_name = response.data.result.name;

            this.$store.state.list.breadcrumb = response.data.result.name;
            this.$store.state.list.breadcrumb_second.name =
              response.data.result.parent_name;
            this.$store.state.list.breadcrumb_second.url =
              response.data.result.parent_url_key;
            this.product_count = response.data.result.count;
            this.pageSize = response.data.result.count / this.count;
            this.get_product_length = response.data.result.products.length;
            this.pageload = false;
            if (this.get_product_length >= this.count) {
              this.page++;
              this.Product_MoreLoad = true;
            } else {
              this.product_loader = false;
            }
              this.$store.state.list.page_loader = false;

            // this.sidebar_fixed();
          } else {
            // this.$store.state.list.breadCrumbArray = []
            this.$store.state.list.error_message =
              response.data.response.error_message;
            this.$store.state.list.footerDescription =
              response.data.result.description;
            this.categorie_name = response.data.result.name
              ? response.data.result.name
              : response.data.result.name;
            // this.$store.state.list.breadCrumbArray = JSON.parse(
            //   response.data.result.breadcrumb
            // );

            this.meta_title = response.data.result.meta_title;
            this.meta_description = response.data.result.meta_description;
            this.meta_keyword = response.data.result.meta_keyword;
            this.product_loader = false;
            this.blankpage = true;
            this.pageload = false;
            this.$store.state.list.page_loader = false;

          }
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$store.state.list.error_message =
              "Oops there seems to be some Network issue, please try again.";
          }
        });

      // }
    },
    async product_lazy_loading() {
      var loader_el = document.querySelector(".product_loader");
      var loader_position = loader_el.offsetTop;
      this.filter_error_msg = "";
      // if ((window.scrollY >= loader_position - 1000) && (this.Product_MoreLoad === true) && (this.page != 1)) {
      if (this.page !== 1) {
        if (
          window.scrollY >= loader_position - 1000 &&
          this.Product_MoreLoad === true
        ) {
          this.$store.state.list.error_message = "";
          this.$store.state.list.success_message = "";
          this.Product_MoreLoad = false;
          await this.$axios
            .get(
              this.$store.state.list.cart_api_url+`/v1/search`,
              {
                params: {
                  text:this.$route.query.q,
                  page: this.page,
                  count: this.count,
                  sort_by: this.pass_sort,
                  sort_dir: this.sort_dir,
                  filter: this.apifilter,
                },
              }
            )

            .then((response) => {
              if (response.data.response.success === 1) {
                if (response.data.result.products.length === 0) {
                  this.filter_error_msg =
                    "No product found, please try by removing last applied filter.";
                }
                // this.meta_title = response.data.result.meta_title;
                // this.meta_description = response.data.result.meta_description;
                // this.meta_keyword = response.data.result.meta_keyword;
                // this.$store.state.list.breadCrumbArray = JSON.parse(response.data.result.breadcrumb)
                // if(this.product_list.length !== response.data.result.products.length){

                this.product_list = this.product_list.concat(
                  response.data.result.products
                );
                this.gtm_product_impressions = [];
                for (let i = 0; i < response.data.result.products.length; i++) {
                  let name = response.data.result.products[i].name;
                  let id = response.data.result.products[i].sku;
                  let price = response.data.result.products[i].selling_price;
                  let category = response.data.result.products[i].category;
                  let list = response.data.result.name;
                  let position = i + 1;
                  this.gtm_product_impressions.push({
                    name,
                    id,
                    price,
                    category,
                    list,
                    position,
                  });
                }

                this.mobilefilterActive =
                  response.data.result.filters[0].filter_lable;
                this.categorie_name = response.data.result.name;
                this.product_count = response.data.result.count;
                this.pageSize = response.data.result.count / this.count;
                this.get_product_length = response.data.result.products.length;
                this.pageload = false;
                if (this.get_product_length >= this.count) {
                  this.page++;
                  this.Product_MoreLoad = true;
                } else {
                  this.product_loader = false;
                }

                // }
              } else {
                this.$store.state.list.error_message =
                  response.data.response.error_message;
                this.product_loader = false;
                this.blankpage = true;
                this.pageload = false;
              }

            })
            .catch((error) => {
              if (error.message === "Network Error") {
                this.$store.state.list.error_message =
                  "Oops there seems to be some Network issue, please try again.";
              }
            });
        }
      }
    },
    removefilter: function (index) {
      this.filter_error_msg = "";
      this.filtersAppied.splice(index, 1);
      this.filterview.splice(index, 1);
      this.apifilter = "";
      for (var i = 0; i < this.filtersAppied.length; i++) {
        this.apifilter += this.filtersAppied[i].replace(/\s+/g, "+");
        if (i < this.filtersAppied.length - 1) {
          this.apifilter += "|";
        }
      }
      this.$router.push({
        query: { ...this.$route.query, filter: this.filtersAppied.join("|") },
      });
      window.scrollTo(0, 0);
      this.Product_MoreLoad = true;
      this.product_loader = true;
      this.product_list = [];
      this.page = 1;
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      axios
        .get(
          this.$store.state.list.cart_api_url+`/v1/search`,
          {
            params: {
              text:this.$route.query.q,
              page: this.page,
              count: this.count,
              sort_by: this.pass_sort,
              sort_dir: this.sort_dir,
              filter: this.apifilter,
            },
          }
        )
        .then((response) => {
          if (response.data.response.success === 1) {
            if (response.data.result.products.length === 0) {
              this.filter_error_msg =
                "No product found, please try by removing last applied filter.";
            }
            this.product_list = [];
            // this.$store.state.list.breadCrumbArray = JSON.parse(
            //   response.data.result.breadcrumb
            // );
            this.product_list = this.product_list.concat(
              response.data.result.products
            );
        
            this.plpContent = "";
            this.gtm_product_impressions = [];

            if (response.data.result.filters) {
              // this.filters = response.data.result.filters;
              for (let i = 0; i < response.data.result.filters.length; i++) {
                if (response.data.result.filters[i].filter_lable == "Price") {
                  this.pricerange.options.min = Number(
                    response.data.result.filters[i].options[0]
                  );
                  this.pricerange.options.max = Number(
                    response.data.result.filters[i].options[1]
                  );
                  this.pricerange.value.push(
                    Number(response.data.result.filters[i].options[0])
                  );
                  this.pricerange.value.push(
                    Number(response.data.result.filters[i].options[1])
                  );
                  this.pricerange.options.code = "selling_price";
                  //this.pricerange.newValue = 'Rs.'+this.pricerange.value[0]+' to '+'Rs.'+this.pricerange.value[1];
                }
              }
            }

            this.categorie_name = response.data.result.name;
            this.product_count = response.data.result.count;
            this.pageSize = response.data.result.count / this.count;
            this.get_product_length = response.data.result.products.length;
            if (this.get_product_length >= this.count) {
              this.page++;
              this.Product_MoreLoad = true;
            } else {
              this.product_loader = false;
            }
          } else {
            this.filter_error_msg = response.data.response.error_message;
            this.product_loader = false;
          }
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$store.state.list.error_message =
              "Oops there seems to be some Network issue, please try again.";
          }
        });
    },
    removeallfilter: function () {
      this.filter_error_msg = "";
      this.filtersAppied = [];
      this.apifilter = "";
      this.filterview = [];
      window.scrollTo(0, 0);
      this.Product_MoreLoad = true;
      this.product_loader = true;
      this.product_list = [];
      this.page = 1;
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      this.$router.push({ query: { ...this.$route.query, filter: "" } });
      axios
       .get(
          this.$store.state.list.cart_api_url+`/v1/search`,
          {
            params: {
              text:this.$route.query.q,
              page: this.page,
              count: this.count,
              sort_by: this.pass_sort,
              sort_dir: this.sort_dir,
              filter: this.apifilter,
            },
          }
        )
        .then((response) => {
          if (response.data.response.success === 1) {
            if (response.data.result.products.length === 0) {
              //
              this.filter_error_msg =
                "No product found, please try by removing last applied filter.";
            }
            this.product_list = [];

            // this.$store.state.list.breadCrumbArray = JSON.parse(
            //   response.data.result.breadcrumb
            // );

            this.product_list = this.product_list.concat(
              response.data.result.products
            );
            this.gtm_product_impressions = [];
            this.plpContent = "";
            for (let i = 0; i < response.data.result.products.length; i++) {
              let name = response.data.result.products[i].name;
              let id = response.data.result.products[i].sku;
              let price = response.data.result.products[i].selling_price;
              let category = response.data.result.products[i].category;
              let list = response.data.result.name;
              let position = i + 1;
              this.gtm_product_impressions.push({
                name,
                id,
                price,
                category,
                list,
                position,
              });
            }
            if (response.data.result.filters) {
              // this.filters = response.data.result.filters;
              for (let i = 0; i < response.data.result.filters.length; i++) {
                if (response.data.result.filters[i].filter_lable == "Price") {
                  this.pricerange.options.min = Number(
                    response.data.result.filters[i].options[0]
                  );
                  this.pricerange.options.max = Number(
                    response.data.result.filters[i].options[1]
                  );
                  this.pricerange.value.push(
                    Number(response.data.result.filters[i].options[0])
                  );
                  this.pricerange.value.push(
                    Number(response.data.result.filters[i].options[1])
                  );
                  this.pricerange.options.code = "selling_price";
                  //this.pricerange.newValue = 'Rs.'+this.pricerange.value[0]+' to '+'Rs.'+this.pricerange.value[1];
                }
              }
            }

            this.categorie_name = response.data.result.name;
            this.product_count = response.data.result.count;
            this.pageSize = response.data.result.count / this.count;
            this.get_product_length = response.data.result.products.length;

            if (this.get_product_length >= this.count) {
              this.page++;
              this.Product_MoreLoad = true;
            } else {
              this.product_loader = false;
            }
          } else {
            this.filter_error_msg = response.data.response.error_message;
            this.product_loader = false;
          }
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$store.state.list.error_message =
              "Oops there seems to be some Network issue, please try again.";
          }
        });
    },
    addfilter: function (label, element, value, value_key) {
      this.pageload = true;
      this.filter_error_msg = "";
      if (this.filtersAppied.indexOf(element + "~" + value) > -1) {
        for (let i = 0; i < this.filtersAppied.length; i++) {
          if (this.filtersAppied[i] === element + "~" + value) {
            this.filtersAppied.splice(i, 1);
            this.filterview.splice(i, 1);
          }
        }
      } else {
        if (label == "Price New Filter") {
          if (this.filterview.length) {
            let foundKey = 0;
            for (let i = 0; i < this.filterview.length; i++) {
              if (
                Object.keys(this.filterview[i])[0] == "Price" ||
                Object.keys(this.filterview[i])[0] == "selling_price"
              ) {
                foundKey = 1;
                this.filtersAppied[i] = element + "~" + value;
                if (Object.keys(this.filterview[i])[0] == "Price") {
                  this.filterview[i].Price = value;
                }
                if (Object.keys(this.filterview[i])[0] == "selling_price") {
                  this.filterview[i].selling_price = value;
                }
              }
            }
            if (foundKey == 0) {
              this.filtersAppied.push(element + "~" + value);
              this.filterview.push({ [label]: value });
            }
          } else {
            this.filtersAppied.push(element + "~" + value);
            this.filterview.push({ [label]: value });
          }
        } else {
          this.filtersAppied.push(element + "~" + value);
          this.filterview.push({ [label]: value });
        }
      }
      this.apifilter = "";
      for (var i = 0; i < this.filtersAppied.length; i++) {
        this.apifilter += this.filtersAppied[i].replace(/\s+/g, "+");
        if (i < this.filtersAppied.length - 1) {
          this.apifilter += "|";
        }
      }
      this.$router.push({
        query: { ...this.$route.query, filter: this.filtersAppied.join("|") },
      });
      window.scrollTo(0, 0);
      this.Product_MoreLoad = true;
      this.product_loader = true;
      this.product_list = [];
      this.page = 1;
      this.$root.error_message = "";
      this.$root.success_message = "";
      axios
       .get(
          this.$store.state.list.cart_api_url+`/v1/search`,
          {
            params: {
              text:this.$route.query.q,
              page: this.page,
              count: this.count,
              sort_by: this.pass_sort,
              sort_dir: this.sort_dir,
              filter: this.apifilter,
            },
          }
        )
        .then((response) => {
          if (response.data.response.success === 1) {
            if (response.data.result.products.length === 0) {
              this.filter_error_msg =
                "No product found, please try by removing last applied filter.";
            }
            this.product_list = [];
            this.product_list = this.product_list.concat(
              response.data.result.products
            );

            this.plpContent = "";
            window.scrollTo(0, 0);
            this.Product_MoreLoad = true;
            this.product_loader = true;
            // window.scrollTo(0, 0);

            this.gtm_product_impressions = [];
            for (let i = 0; i < response.data.result.products.length; i++) {
              let name = response.data.result.products[i].name;
              let id = response.data.result.products[i].sku;
              let price = response.data.result.products[i].selling_price;
              let category = response.data.result.products[i].category;
              let list = response.data.result.name;
              let position = i + 1;
              this.gtm_product_impressions.push({
                name,
                id,
                price,
                category,
                list,
                position,
              });
            }
            if (response.data.result.filters) {
              this.filters = response.data.result.filters;
              for (let i = 0; i < response.data.result.filters.length; i++) {
                if (response.data.result.filters[i].filter_lable == "Price") {
                  this.pricerange.options.min = Number(
                    response.data.result.filters[i].options[0]
                  );
                  this.pricerange.options.max = Number(
                    response.data.result.filters[i].options[1]
                  );
                  this.pricerange.value.push(
                    Number(response.data.result.filters[i].options[0])
                  );
                  this.pricerange.value.push(
                    Number(response.data.result.filters[i].options[1])
                  );
                  this.pricerange.options.code = "selling_price";
                }
              }
            }
            if (
              window.dataLayer !== undefined &&
              window.dataLayer !== null &&
              window.dataLayer !== ""
            ) {
              window.dataLayer.push({
                event: "impressionSent",
                action: "Product Impression",
                label: "Product list page",
                ecommerce: {
                  currencyCode: "INR",
                  impressions: this.gtm_product_impressions,
                },
              });
            }
            this.categorie_name = response.data.result.name;
            this.product_count = response.data.result.count;
            this.pageSize = response.data.result.count / this.count;
            this.get_product_length = response.data.result.products.length;
            if (this.get_product_length >= this.count) {
              this.page++;
              this.Product_MoreLoad = true;
            } else {
              this.product_loader = false;
            }
          } else {
            this.filter_error_msg = response.data.response.error_message;
            this.product_loader = false;
          }
          this.pageload = false;

        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$root.error_message =
              "Oops there seems to be some Network issue, please try again.";
          }
        });
    },
    isActive: function (menuItem) {
      return this.filtersAppied.indexOf(menuItem) > -1;
    },
    wishActive:  function (wish) {
        return  this.wishlist.indexOf(wish) > -1;
    },
    get_wish: async function () {
      this.pageload = true;
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
            //this.$store.state.list.wishpro=response.data.data.product.split(',');
            // this.wishlist = response.data.data.product.split(",");
            this.wishlist = response.data.data.list;

            this.$store.state.list.wishlist_count =
              response.data.data.total_row;
              this.pageload = false
          }else{
              this.pageload = false
          }
              this.pageload = false

       
        });
    },

    truncate(value) {
      if (value.length >= 50) {
        return value.substring(0, 50) + "...";
      } else {
        return value;
      }
    },
  },

  beforeCreate() {
    this.filter_error_msg  = ''
    if (process.client) {
      localStorage.setItem("_product_category", this.$route.params.category);
    }
  },

  beforeDestroy() {
    if (process.client) {
      localStorage.setItem("_product_category", '');
    }
  },

  async mounted() {
    this.$store.state.list.customer_id = $cookies.get(
      window.location.hostname.substring(10, 4) + "_customer"
    );
    this.$store.state.list.customer_session = $cookies.get(
      window.location.hostname.substring(10, 4) + "_cus_sess"
    );
 
    if (
      this.$store.state.list.customer_id != "" &&
      this.$store.state.list.customer_id != null
    ) {
      this.get_wish();
    }

    $cookies.set(
      window.location.hostname.substring(10, 4) + "_last_list_path",
      this.$route.fullPath
    );
    this.getProductList()
  },

  async fetch() {

    if (this.$route.query.filter) {
      this.filtersAppied = this.$route.query.filter.split("|");
      this.filterRefresh = this.$route.query.filter
        .replace(/-/g, ": ")
        .split("|");
      for (var x = 0; x < this.filterRefresh.length; x++) {
        var newKey = this.filterRefresh[x].split("~");
        this.filterview.push({ [newKey[0]]: newKey[1] });
      }
      this.apifilter = "";
      for (var i = 0; i < this.filtersAppied.length; i++) {
        this.apifilter += this.filtersAppied[i].replace(/\s+/g, "+");
        if (i < this.filtersAppied.length - 1) {
          this.apifilter += "|";
        }
      }
    }
    if (this.$route.query.sort) {
      this.isQuerySort = true;
      if (this.$route.query.sort_dir) {
        this.sort_dir = this.$route.query.sort_dir;
      }
      if (this.$route.query.sort === "price_low") {
        this.pass_sort = "selling_price";
        this.sort_dir = "asc";
      } else {
        this.pass_sort = this.$route.query.sort;
      }
      if (
        this.$route.query.sort === "selling_price" &&
        this.$route.query.sort_dir === "asc"
      ) {
        this.select_sort = "price_low";
      } else {
        this.select_sort = this.$route.query.sort;
      }
    }
    this.test = this.filtersAppied;
    this.$store.state.list.menuActive = true;
    this.$store.state.list.error_message = "";
    this.$store.state.list.success_message = "";
    this.$store.state.list.page_loader = false;
  },


  watch: {
       "$route.query.q": {
        handler: async function () {
           
            await this.getProductList()
        }
       },
    select_sort: {
      handler: async function () {
        window.scrollTo(0, 0);
        this.filter_error_msg = "";
        this.Product_MoreLoad = true;
        this.product_loader = true;
        this.product_list = [];
        this.page = 1;
        if (this.select_sort === "price_low") {
          this.pass_sort = "selling_price";
          this.sort_dir = "asc";
          this.$router.push({
            query: {
              ...this.$route.query,
              sort: "selling_price",
              sort_dir: this.sort_dir,
            },
          });
        } else {
          this.pass_sort = this.select_sort;

          if (this.isQuerySort) {
            this.sort_dir = this.$route.query.sort_dir;
            this.isQuerySort = false;
            return;
          } else {
            this.sort_dir = "desc";
          }
          this.$router.push({
            query: {
              ...this.$route.query,
              sort: this.select_sort,
              sort_dir: this.sort_dir,
            },
          });
        }
        this.$store.state.list.error_message = "";
        this.$store.state.list.success_message = "";
        this.$store.state.list.page_loader = true
        this.$axios
          .get(
          this.$store.state.list.cart_api_url+`/v1/search`,
          {
            params: {
              text:this.$route.query.q,
              page: this.page,
              count: this.count,
              sort_by: this.pass_sort,
              sort_dir: this.sort_dir,
              filter: this.apifilter,
            },
          }
        )
          .then((response) => {
            if (response.data.response.success === 1) {
              if (response.data.result.products.length === 0) {
                this.filter_error_msg = "Products Not Found";
              }
              this.product_list = [];
              this.product_list = this.product_list.concat(
                response.data.result.products
              );

              this.selected_sort = response.data.query.sort_by;
              this.gtm_product_impressions = [];
              for (let i = 0; i < response.data.result.products.length; i++) {
                let name = response.data.result.products[i].name;
                let id = response.data.result.products[i].sku;
                let price = response.data.result.products[i].selling_price;
                let category = response.data.result.products[i].category;
                let list = response.data.result.name;
                let position = i + 1;
                this.gtm_product_impressions.push({
                  name,
                  id,
                  price,
                  category,
                  list,
                  position,
                });
              }
              if (response.data.result.filters) {
                // this.filters = response.data.result.filters;
                for (let i = 0; i < response.data.result.filters.length; i++) {
                  if (response.data.result.filters[i].filter_lable == "Price") {
                    this.pricerange.options.min = Number(
                      response.data.result.filters[i].options[0]
                    );
                    this.pricerange.options.max = Number(
                      response.data.result.filters[i].options[1]
                    );
                    this.pricerange.value.push(
                      Number(response.data.result.filters[i].options[0])
                    );
                    this.pricerange.value.push(
                      Number(response.data.result.filters[i].options[1])
                    );
                    this.pricerange.options.code = "selling_price";
                    //this.pricerange.newValue = 'Rs.'+this.pricerange.value[0]+' to '+'Rs.'+this.pricerange.value[1];
                  }
                }
              }
              if (
                window.dataLayer !== undefined &&
                window.dataLayer !== null &&
                window.dataLayer !== ""
              ) {
                window.dataLayer.push({
                  event: "impressionSent",
                  action: "Product Impression",
                  label: "Product list page",
                  ecommerce: {
                    currencyCode: "INR",
                    impressions: this.gtm_product_impressions,
                  },
                });
              }
              this.categorie_name = response.data.result.name;
              this.product_count = response.data.result.count;
              this.pageSize = response.data.result.count / this.count;
              this.get_product_length = response.data.result.products.length;
              if (this.get_product_length >= this.count) {
                this.page++;
                this.Product_MoreLoad = true;
              } else {
                this.product_loader = false;
              }
            } else {
              this.$store.state.list.error_message =
                response.data.response.error_message;
              this.product_loader = false;
            }
             this.product_loader = false;
            this.$store.state.list.page_loader = false

          })
          .catch((error) => {
            if (error.message === "Network Error") {
              this.$store.state.list.error_message =
                "Oops there seems to be some Network issue, please try again.";
            }
            this.$store.state.list.page_loader = false

          });
       


      },
      isActive: function (menuItem) {
        return this.filtersAppied.indexOf(menuItem) > -1;
      },
      getFilter: function () {
      
        if (this.$route.query.filter) {
          this.filtersAppied = this.$route.query.filter.split("|");
          this.filterRefresh = this.$route.query.filter
            .replace(/-/g, ": ")
            .split("|");
      
          for (var x = 0; x < this.filterRefresh.length; x++) {
            var newKey = this.filterRefresh[x].split("~");
            this.filterview.push({ [newKey[0]]: newKey[1] });
          }
          this.apifilter = "";
          for (var i = 0; i < this.filtersAppied.length; i++) {
            this.apifilter += this.filtersAppied[i].replace(/\s+/g, "+");
            if (i < this.filtersAppied.length - 1) {
              this.apifilter += "|";
            }
          }
        }
        if (this.$route.query.sort) {
          this.isQuerySort = true;
          if (this.$route.query.sort_dir) {
            this.sort_dir = this.$route.query.sort_dir;
          }
          if (this.$route.query.sort === "price_low") {
            this.pass_sort = "selling_price";
            this.sort_dir = "asc";
          } else {
            this.pass_sort = this.$route.query.sort;
          }
          if (
            this.$route.query.sort === "selling_price" &&
            this.$route.query.sort_dir === "asc"
          ) {
            this.select_sort = "price_low";
          } else {
            this.select_sort = this.$route.query.sort;
          }
        }
      },
     

      truncate(value) {
        if (value.length >= 50) {
          return value.substring(0, 50) + "...";
        } else {
          return value;
        }
      },
    },
    async mounted() {
      this.$store.state.list.customer_id = $cookies.get(
        window.location.hostname.substring(10, 4) + "_customer"
      );
      this.$store.state.list.customer_session = $cookies.get(
        window.location.hostname.substring(10, 4) + "_cus_sess"
      );
    
      if (
        this.$store.state.list.customer_id != "" &&
        this.$store.state.list.customer_id != null
      ) {
        this.get_wish();
      }

      $cookies.set(
        window.location.hostname.substring(10, 4) + "_last_list_path",
        this.$route.fullPath
      );

         window.addEventListener('scroll', this.product_lazy_loading);
            let scrollPos = 0;
            let top_set_offset = 0;
            window.addEventListener('scroll', function sidebarfixed() {
                if (window.innerWidth > 767) {
                    let offsetHeight = document.getElementById('sidebar-inner').offsetHeight;
                    let window_height = window.innerHeight;
                    let mainoffsetHeight = document.getElementById('sidebar-main').offsetHeight;
                    let offsetTop = document.getElementById("sidebar-inner").offsetTop;
                    let pageoffsetTop = window.pageYOffset;
                    let topscroll = document.documentElement.scrollTop;
                    if ((document.body.getBoundingClientRect()).top > scrollPos) {
                        if ((window_height - 115) < offsetHeight) {
                            if ((top_set_offset + 135) < topscroll) {
                                document.getElementById("sidebar-inner").classList.remove("bottom");
                                document.getElementById("sidebar-inner").classList.remove("top");
                                document.getElementById("sidebar-inner").style.position = "relative";
                                document.getElementById("sidebar-inner").style.top = "auto";
                            }
                            else {
                                document.getElementById("sidebar-inner").classList.add("top");
                                document.getElementById("sidebar-inner").classList.remove("bottom");
                                document.getElementById("sidebar-inner").style.position = "sticky";
                                document.getElementById("sidebar-inner").style.top = "115px";
                            }
                        }
                    }
                    else {
                        if ((window_height - 115) < offsetHeight) {

                            top_set_offset = document.getElementById("sidebar-inner").offsetTop;
                            if (topscroll < (offsetHeight + offsetTop + 115)) {
                                document.getElementById("sidebar-inner").classList.add("bottom");
                                document.getElementById("sidebar-inner").classList.remove("top");
                                document.getElementById("sidebar-inner").style.position = "sticky";
                                document.getElementById("sidebar-inner").style.top = "auto";
                                document.getElementById("sidebar-inner").style.bottom = "20px";
                            }
                        }
                        else {
                            document.getElementById("sidebar-inner").classList.add("top");
                            document.getElementById("sidebar-inner").classList.remove("bottom");
                            document.getElementById("sidebar-inner").style.position = "sticky";
                            document.getElementById("sidebar-inner").style.top = "115px";
                        }
                    }
                    scrollPos = (document.body.getBoundingClientRect()).top;
                }
            });
    },

    async fetch() {
      this.$store.state.list.menuActive = true;
      this.$store.state.list.error_message = "";
      this.$store.state.list.success_message = "";
      this.$store.state.list.page_loader = false;
    },

    async beforeMount() {
      await this.getFilter();
      this.$store.state.list.error_message = "";
      if (screen.width <= 767) {
        this.filter_status = false;
        this.mobile_view = true;
      }
      for (var i = 0; i < divsToHide.length; i++) {
        divsToHide[i].style.pointerEvents = "none";
      }
      setTimeout(function () {
        for (var i = 0; i < divsToHide.length; i++) {
          divsToHide[i].style.pointerEvents = "auto";
        }
      }, 1000);

     
    },
    
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.product_lazy_loading);
    window.removeEventListener("scroll", this.sidebarfixed);
  },
};
</script>
<style scoped>
.col-md-12.product-list {
    /* padding-top: 25px;
    padding-right: 0!important;
    padding-left: 0!important; */
}
.product-list .new-class {
    /* padding-right: 30px;
    padding-left: 30px; */
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
.slide-box {
    border: 1px solid #fff!important;
}
 .product-list .product-box .view-detail {
    background: #fff;
    padding: 5px 15px 0;
    border-top: 1px solid #f4f4f4;
}
.product-list .product-box .view-detail a:hover {
    border: 1px solid #535766;
    text-decoration: none;
}
.product-list .product-box .view-detail a {
    color: #282c3f;
    border: 1px solid #d4d5d9;
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;
    display: block;
    line-height: 30px;
    border-radius: 3px;
    margin-bottom: 5px;
}
.product-list .product-box .view-detail {
    position: absolute;
    display: block;
    font-size: 13px;
    line-height: 15px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    bottom: -38px;
    text-decoration: none;
    opacity: 0;
    z-index: 2;
}
.product-list img {
    width: 100%;
    /* max-height: 250px; */
    /* width: auto!important; */
    margin: auto;
}
.product-imageSingle:hover{

}
.product-imageSingle.hide{
  /* visibility: hidden; */
}

.product-list .product-box .view-detail.hide {
    position: absolute;
    display: block;
    color: #fff;
    font-size: 13px;
    line-height: 15px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    bottom: -11px;
    text-decoration: none;
    opacity: 9;
    z-index: 2;
}
.colorDots {
    cursor: pointer;
    width: 14px;
    margin: 0 4px;
    height: 14px;
    box-shadow: 0 0 0 1px #bfbfbf;
    border-radius: 50px;
    display: inline-block;
}
/* .product-list p {
    padding-top: 5px;
    margin: 0;
    margin-top: 0;
    text-align: left;
    padding-bottom: 0;
    font-size: 15px;
    color: #000;
    overflow: hidden;
    font-weight: 400;
} */
.colorDotsWraps {
    margin: 5px 5px!important;
}
.product-size{
  color: black;
}
.view-detail .product-size {
    line-height: 20px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.view-detail .product-size {
    font-size: 13px!important;
    text-transform: capitalize;
    line-height: 11px;
}
.product-imageSlider {
    position: absolute;
    width: 100%;
    z-index: 0;
    top: 0;
    left: 0;
}
.product-infos {
  position: relative;
  padding: 0 5px;
}
.product-infos .wishlist {
position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
    background: #e3e3e3;
    color: #2e2e2e;
    width: 30px;
    height: 30px;
    display: flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

}
.pro-count {
  padding: 0 10px;
}

.slide-box {
    border: 1px solid #efefef!important;
    margin-bottom: 15px;
}
</style>