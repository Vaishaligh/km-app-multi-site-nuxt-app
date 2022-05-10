<template>
  <div class="container-fluid">
    <div class="row login-height ">
      <div class="col-md-7 col-12">
        <CheckoutHeader />
        <!-- login page  -->
        <CheckoutLogin />
      </div>
      <div class="col-md-5 col-12 mobile-color">
        <OrderSummary />
      </div>
    </div>
  </div>
</template>

<script>
import CheckoutLogin from "../login.vue";
import OrderSummary from "./order-summary.vue";
import CheckoutHeader from "./checkout-header.vue";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
export default {
  layout: "checkoutPage",
  components: {
    CheckoutLogin,
    OrderSummary,
    CheckoutHeader,
  },
  mounted() {
    if (this.$store.state.list.customer_id) {
      this.$toast.success("Already Logged In.", {
        position: "top-center",
        duration: 3000,
      });

      this.$router.push("/checkout/address");
    }
  },
};
</script>
<style scoped>
.login-height {
  min-height: 550px;
}
.checkout-section {
  margin-top: 80px;
  padding: 20px 80px;
      z-index: 0;
}
  .mobile-color {
  background-color: #f0f0f0;
}
@media screen and (max-width: 767px) {
   .checkout-section {
    margin-top: 70px;
    width: 100%;
    max-width: 100%;
    padding: 0 4%;
        z-index: 0;
}
  .login-height {
    min-height: auto;
  }
  .mobile-color {
    background-color: #f0f0f0;
  }
}
</style>
