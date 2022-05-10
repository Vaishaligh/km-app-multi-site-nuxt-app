<template>
  <div>
    <div class="container">
      <div class="order-content">
          <div class="row">
              <div class="col-lg-4 col-md-4 col-12 b-right">
                  <span  @click="$router.go(-1)" style="cursor: pointer"> <i class="fa fa-arrow-left"></i> Go Back </span>
                  <div class="mobile-desigen mt-2">
                      <div class="product-img text-center">
                       
                          <img :src="this.$store.state.list.image_url+product.image" alt="img" class=""> 
                      </div>
                  
                  <div class="product-details">
                      <a href="javascript:void(0)" @click="$router.go(-1)" class="name">{{product.name}}</a>
                      <div class="rating">
                          <span>
                              <div class="rating-box">{{reviews.average_rating}} <img src="/images/download.svg" alt="img"></div>
                          </span>
                          <span class="review">
                              <span>
                                  
                                  <span>&nbsp;{{reviews.total_review}} Reviews</span>
                              </span>
                          </span>
                      </div>
                    
                  </div>
                  </div>
              </div>
              <div class="col-lg-8 col-md-12 col-12">
                  <div class="all-details">
                      <h4>Ratings & Reviews </h4>
                      <div class="rating-reviews">
                          <div class="col-md-4 col-4 allrating">
                              <div class="r-val">{{reviews.average_rating}}</div>
                              <div class="r-star">★</div>
                            
                              <span>{{reviews.total_review}} Reviews</span>
                          </div>
                          <div class="col-md-8 col-8">
                              <div class="rating-range">
                                  <ul class="rating-list">
                                      <li class="">
                                          <span class="">5</span><span class="">★</span>

                                      </li>
                                      <li class="">
                                          <div class=""><span class="">4</span><span class="">★</span>
                                          </div>
                                      </li>
                                      <li class="">
                                          <div class=""><span class="">3</span><span class="">★</span>
                                          </div>
                                      </li>
                                      <li class="">
                                          <div class=""><span class="">2</span><span class="">★</span>
                                          </div>
                                      </li>
                                      <li class="">
                                          <div class=""><span class="">1</span><span class="">★</span>
                                          </div>
                                      </li>
                                  </ul>
                                  <ul class="range-box">
                                     <li class="">
                                          <div>
                                              <div class="blank-range red">
                                                  <span :style="`width:${five}%`"></span>
                                              </div>
                                          </div>
                                      </li>
                                      <li class="">
                                          <div>
                                              <div class="blank-range">
                                                  <span :style="`width:${four}%`"></span>
                                              </div>
                                          </div>
                                      </li>
                                      <li class="">
                                          <div>
                                              <div class="blank-range">
                                                  <span :style="`width:${three}%`"></span>
                                              </div>
                                          </div>
                                      </li>
                                      <li class="">
                                          <div>
                                              <div class="blank-range">
                                                  <span :style="`width:${two}%`"></span>
                                              </div>
                                          </div>
                                      </li>
                                      <li class="">
                                          <div>
                                              <div class="blank-range yellow">
                                                  <span :style="`width:${one}%`"></span>
                                              </div>
                                          </div>
                                      </li>
                                     

                                  </ul>
                                  <ul class="range-val">
                                      <li>
                                          <div class="range-text">{{five_count}}</div>
                                      </li>
                                      <li>
                                          <div class="range-text">{{four_count}}</div>
                                      </li>
                                      <li>
                                          <div class="range-text">{{three_count}}</div>
                                      </li>
                                      <li>
                                          <div class="range-text">{{two_count}}</div>
                                      </li>
                                      <li>
                                          <div class="range-text">{{one_count}}</div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                       <div v-for="review in reviews.reviews" class="comment" :key="review.rr_id">
                          <div class="heading">
                              <div class="rating">
                                  <span>
                                      <div class="rating-box">{{review.rr_rating}} <img src="/images/download.svg" alt="img"></div>
                                  </span>
                              </div>
                              <p class="title"> {{review.rr_title}}</p>
                          </div>
                          <div class="w-100">
                              <div class="comment-content">
                                  <div class="text">{{review.rr_description}}</div>
                              </div>
                               <!-- <div class="commit-img" v-if="review.rr_images.length>0">
                                  <img style="cursor:pointer" v-if="review.rr_images.length>0" @click="Review_fullimg_popup(rr.main_image)" class="p-1" v-for="rr in review.get_images" v-bind:key="rri_id" :src="rr.thumbnail" width="80px">
                              </div>  -->
                              <div class="commit-img" v-if="review.rr_images.length>0">
                                 <img style="cursor:pointer" v-if="review.rr_images.length>0" @click="Review_fullimg_popup(rr.main_image)" class="p-1" v-for="rr in review.rr_images" v-bind:key="rri_id" :src="$store.state.list.image_url+rr" width="80px"> 
                              </div> 
                          </div>
                          <div class="user-detials">
                              <p>{{review.rr_customer_name}} </p>
                              <p class="">{{review.rr_created_at}}</p>
                          </div>
                      </div> 
                  </div>
              </div>
              <!-- pagination  -->
                  <div class="pagination" v-if="last_page>0">
                      <span>Page {{this.page}} of {{last_page}}</span>
                        <nav>
                          <a v-if="page > 1"  class="pandnext" href="javascript:void(0)" @click="get_review(page-1)"><span>Previous</span></a>
                          <a v-else  style="color:gray" class="pandnext" href="javascript:void(0)" ><span>Previous</span></a>
                          
                          <a @click="get_review(item)" :key="item" v-for="item in parseInt(last_page)" :class="`p-index ${(item == page) ? 'activer': ''}`" href="javascript:void(0)">{{item}}</a>
                          
                          <a v-if="page < parseInt(last_page)" class="pandnext" href="javascript:void(0)"  @click="get_review(page + 1)"><span>NEXT</span></a>
                          <a v-else class="pandnext" href="javascript:void(0)" style="color:gray"  ><span>NEXT</span></a>
                        </nav>
                        <span class="p-last"></span>
                  </div>

              <!-- pagination end  -->
            

              <!--Review full image popup start here-->
                <div v-if="this.review_image_popup" class="modal size-guide-popup-container login-model" v-bind:class="{active: this.review_image_popup === true}"
                id="coupon-modal">
                <div class="modal-dialog modal-lg" >
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="close" @click="close_review_image_popup()" style="margin-top: 0px;
                            margin-right: 15px;z-index: 999;float:right">&times;</button>
                            <img :if="this.set_review_fullimg!=''" :src="this.set_review_fullimg" style="width:100%;height:auto">
                        </div>
                    </div>
                </div>
                </div>
              <!--Review full image popup end here-->
              </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      page: 1,
      reviews:{},
      product:'',
      five:'',one:'',two:'',three:'',four:'',
      five_count:'',one_count:'',two_count:'',three_count:'',four_count:'',
      last_page:'',
      //   reviews_count[4] = 0,
      //   reviews_count[3] = 0,
      //   reviews_count[2] = 0,
      //   reviews_count[1] = 0,
      //   reviews_count[0] = 0
      // ],
      set_review_fullimg: "",
      review_image_popup: false,
    };
  },

  methods: {
    async get_review(page = 1) {
   
      // if (!this.$route.params.sku) {
      //   this.$router.push("/");
      // }
      var form = new FormData();
      //   form.append("master_sku", this.$route.params.sku);
      //   form.append("prd_id", this.$route.params.pro_id);
      form.append("master_sku", "I179693");
      //   form.append("prd_id", 2866);

      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      await axios
        .post(
          this.$store.state.list.cart_api_url+"/v1/review/review-count",
          form,
          config
        )
        .then((response) => {
          console.log("response", response);
          if (response.data.success == true) {
            this.reviews = response.data.data;
            console.log("response", this.reviews);
            this.one = this.reviews.review_average[1]
            this.two = this.reviews.review_average[2]
            this.three = this.reviews.review_average[3]
            this.four = this.reviews.review_average[4]
            this.five = this.reviews.review_average[5]

            this.one_count = this.reviews.reviews_count[1]
            this.two_count = this.reviews.reviews_count[2]
            this.three_count = this.reviews.reviews_count[3]
            this.four_count = this.reviews.reviews_count[4]
            this.five_count = this.reviews.reviews_count[5]

            this.product = this.reviews.reviews[0].product_info

            this.last_page = this.reviews.reviews_pagination.last_page
            console.log("this.product ",this.product );
            this.page = page;
          }
        });
    },
  },
  mounted() {
    // console.log('route',this.$route)
    window.scroll(0, 0);
    this.get_review();
  },
};
</script>
<style scoped>
.order-container {
  width: 100%;
  background-color: #f1f3f6;
  padding-bottom: 20px;
  height: 100vh;
}

.order-content {
  width: 100%;
  position: relative;
  margin: 0 auto;
  padding: 8px;
  background-color: #fff;
  /* display: flex; */
  justify-content: center;
}

.b-right {
  border-right: 1px solid #f0f0f0;
}

.product-img {
  padding: 16px;
  position: relative;
}

.product-details .name {
  padding-bottom: 5px;
  overflow: hidden;
  display: block;
  font-size: 22px;
  margin-bottom: -6px;
  color: #000;
}

.product-img img {
  width: 70%;
  margin: 0 auto;
}

.rating {
  position: relative;
}

.rating .rating-box img {
  height: 10px;
  vertical-align: revert;
}

.rating .rating-box {
  line-height: normal;
  display: inline-block;
  color: #fff;
  padding: 2px 4px 2px 6px;
  border-radius: 3px;
  font-weight: 500;
  font-size: 10px;
  vertical-align: middle;
  background-color: #388e3c;
}

.review {
  padding-left: 4px;
  font-weight: 500;
  color: #878787;
  font-size: 12px;
}

.price {
  display: block;
  padding: 0 10px 0 0;
}

.price-contnt .rs {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: #212121;
}

.line-rs {
  display: inline-block;
  margin-left: 8px;
  text-decoration: line-through;
  font-size: 12px;
  color: #878787;
}

.discound {
  display: inline-block;
  margin-left: 8px;
  color: #388e3c;
  font-size: 10px;
  letter-spacing: -0.2px;
  font-weight: 500;
}

.all-details {
  width: 100%;
}

.all-details h4 {
  font-size: 20px;
  padding: 20px 0 20px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.rating-reviews {
  display: flex;
  flex-flow: row wrap;
  padding: 20px;
  width: 80%;
}

.rating-reviews .allrating {
  text-align: center;
  border-right: 1px solid #f0f0f0;
  padding: 6px 0;
}

.rating-reviews .r-val {
  display: inline-block;
  font-size: 30px;
  color: #212121;
  margin-top: 4px;
}

.rating-reviews .r-star {
  font-size: 25px;
  padding: 0 0 0 4px;
  display: inline-block;
  color: #212121;
}

.rating-reviews span {
  color: #878787;
  font-size: 11px;
  display: block;
}

.comment {
  padding: 10px;
  width: 100%;
  padding-left: 0px;
  border-bottom: 1px solid #f0f0f0;
}

.comment .title {
  padding-left: 12px;
  padding-top: 5px;
  font-size: 12px;
  color: #212121;
  font-weight: 500;
  margin: 0px;
}

.comment .heading {
  display: flex;
}

.comment-content {
  line-height: 1.4;
  font-size: 14px;
  color: #212121;
  margin: 10px 0;
  overflow: hidden;
}

.commit-img {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 12px;
  width: 100%;
  height: 62px;
}

.commit-img img {
  margin-right: 4px;
  cursor: pointer;
}

.user-detials {
  display: flex;
}

.user-detials p {
  font-size: 10px;
  color: #878787;
  margin-right: 8px;
  margin-bottom: 0;
}

.rating-range {
  display: flex;
  text-align: left;
  width: 100%;
  flex-flow: nowrap;
}

.rating-range ul {
  list-style: none;
  padding-left: 0px;
  margin-bottom: 0px;
}

.rating-range ul.rating-list {
  line-height: 17px;
  flex-basis: 10.66%;
}

.rating-range ul.rating-list > div {
  text-align: center;
}

.rating-range ul.rating-list span {
  font-size: 10px;
  font-weight: 500;
  color: #212121;
  padding: 2px 0;
  display: inline;
}

.rating-range .range-box {
  flex-basis: 58.33%;
}

.rating-range .range-box li {
  padding: 1px 0 0;
  height: 20px;
}

.rating-range .range-box li .blank-range {
  height: 5px;
  border-radius: 100px;
  position: relative;
  background: #f0f0f0;
  margin-top: 7px;
  /* margin-left: 7px; */
}

.rating-range .range-box li .blank-range span {
  position: absolute;
  left: 0;
  transform: scaleX(1);
  transform-origin: left center;
  transition: transform 0.4s cubic-bezier(0, 0, 0.3, 1) 0.3s,
    -webkit-transform 0.4s cubic-bezier(0, 0, 0.3, 1) 0.3s;
  height: 5px;
  border-radius: 100px;
  background-color: #388e3c;
}
.rating-range .range-box li .blank-range.red span {
  background: #ff6161;
}
.rating-range .range-box li .blank-range.yellow span {
  background-color: #ff9f00;
}
.rating-range .range-val {
  flex-basis: 25%;
}
.rating-range .range-val li .range-text {
  font-size: 10px;
  color: #878787;
  padding: 0 5px 0 10px;
  line-height: 20px;
}
.pagination {
  font-weight: 500;
  padding: 10px 24px;
  border-top: none;
  display: flex;
  justify-content: space-between;
  line-height: 32px;
}
.pagination span {
  font-size: 12px;
  margin-left: 20px;
}
a:hover {
  text-decoration: none;
}
.pandnext {
  display: inline-block;
  line-height: 32px;
  color: #ab1b20;
  padding: 0 25px;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 14px;
}

.p-index {
  display: inline-block;
  padding: 0 8px;
  cursor: pointer;
  line-height: 32px;
  height: 32px;
  width: 32px;
  color: #ab1b20;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
}

.p-index.activer {
  background: #ab1b20;
  color: #fff;
}

.p-last {
  display: inline-block;
  width: 1px;
  height: 100%;
}

@media screen and (max-width: 767px) {
  .order-container .container {
    max-width: 100%;
  }
  .mobile-desigen {
    display: flex;
    display: flex;
    flex-direction: column;
  }
  .product-img {
    width: 100%;
    padding: 0%;
  }
  .product-img img {
    width: 50%;
    margin: 0 auto;
  }
  .order-container {
    height: 100%;
  }
  .rating-reviews {
    width: 100%;
    margin: 10px;
    padding: 0px;
  }
  .all-details h4 {
    display: none;
  }
  .product-details {
    text-align: left;
    width: 100%;
    padding: 10px 0px;
  }
  .product-details .name {
    font-size: 18px;
  }
  .review {
    font-size: 14px;
  }
  .price-contnt .rs {
    font-size: 16px;
  }
  .line-rs,
  .discound {
    font-size: 14px;
  }

  .rating-reviews .r-star {
    font-size: 45px;
  }
  .rating-reviews .r-val {
    font-size: 35px;
  }
  .pandnext {
    display: inline-block;
    line-height: 15px;
    color: #ab1b20;
    padding: 0 15px;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 12px;
  }

  .p-index {
    display: inline-block;
    padding: 0 0px;
    cursor: pointer;
    line-height: 15px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    font-size: 10px;
    text-align: center;
  }
  .pagination {
    font-weight: 500;
    padding: 0px 0px;
    border-top: none;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}
</style>
