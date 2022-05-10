<template>
  <div>
    <div class="container-fluid my-account pt-5">
      <div class="row">
        <div class="col-md-12">
          <div
            class="success_message"
            v-text="this.$store.state.list.success_message"
            v-if="this.$store.state.list.success_message != ''"
          ></div>
          <div
            class="error_message"
            v-text="this.$store.state.list.error_message"
            v-if="this.$store.state.list.error_message != ''"
          ></div>
        </div>
        <div class="col-md-3">
          <Sidebar />
        </div>

        <div class="col-md-9">
          <div class="row">
            <div class="offer_content_dashboard" v-if="couponoffers.length">
              <h2 class="fs-4 text-capitalizea py-2 border-bottom ">
                Available Coupons
              </h2>
              <div class="row">
                <div
                  v-for="(offer, index) of couponoffers"
                  class="coupons_list col-md-6 mb-2"
                  :key="index"
                >
                  <div class="coupon_block">
                    <span class="fs-6">{{ offer.coupon_code }}</span>
                  </div>
                  <div class="coupon_desc">
                    <p class="my-1 kartmax-text-f-14 ">
                      {{ offer.display_message }}
                    </p>
                    <!-- <span class="kartmax-text-f-14"
                      >Valid Till: {{ offer.valid_till }}</span
                    > -->
                  </div>
                </div>
              </div>
            </div>
            <div class="offer_content_dashboard" v-else>
              <div class="no_coupons_list">
                <p>No coupon available for you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "./sidebar";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
export default {
  name: "Coupons",
  components: {
    Sidebar
  },
  head() {
    return {
      bodyAttrs: {
        class: "address-book"
      }
    };
  },

  data() {
    return {
      couponoffers: [],
      master_sku: 123456789,
      is_discount: "yes"
    };
  },
  methods: {
    async getoffer() {
      this.$store.state.list.page_loader = true;
      var form = new FormData();
      form.append("sku", this.master_sku);
      form.append("is_discount", this.is_discount);
      form.append("customer_id", this.$store.state.list.customer_id);
   
      await axios
        .get(this.$store.state.list.api_url + `/api/cart/promotions/list`)
        .then(response => {
          if (response.data.success == true) {
            this.couponoffers = response.data.data;
            this.$store.state.list.page_loader = false;
          }
          else{
            //  this.$toast.error(
            //     "Coupon not found.",
            //     {
            //       position: "top-center",
            //       duration: 3000,
            //     }
            //   );
            this.$store.state.list.page_loader = false;

          }
        });
    }
  },
  mounted() {
    this.getoffer();
  },
   beforeMount() {
     if(this.$store.state.list.customer_id ==null || this.$store.state.list.customer_id =='' || this.$store.state.list.customer_id  == undefined ){
      this.$router.push('/login')
    }}
};
</script>
<style scoped>
.coupons_list .coupon_desc .coupon_block {
  display: inline-block;
}
</style>
