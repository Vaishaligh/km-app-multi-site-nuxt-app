<template>
  <div class="km-checkout-page">
    <div class="checkout_header">
      <div class="checkout_logo">
        <a href="/">
          <img
            v-if="this.$store.state.list.checkout_logo"
            :src="this.$store.state.list.checkout_logo"
            alt=""
          />
          <img v-else :src="logo" alt="checkout logo" />
        </a>
      </div>
      <ul class="opc-progress-bar">
        <li class="opc-progress-bar-item" :class="{ active: shipping }">
          <span @click="checkout">SHIPPING</span>
        </li>
        <li class="opc-progress-bar-item" :class="{ active: payment }">
          <span>REVIEW &amp; PAYMENTS</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { logo: "", shipping: false, payment: false };
  },
  mounted() {
    if (this.$route.path == "/checkout/address") {
      this.shipping = true;
    } else if (this.$route.path == "/checkout/payment") {
      this.payment = true;
    }
    if (!this.$store.state.list.customer_id) {
      this.$router.push("/checkout/login");
    }
  },
  async beforeCreate() {
    await this.$axios
      .get(this.$store.state.list.editor_url+"/meta")
      .then((data) => {
        this.data = data.data.data;
        this.logo =this.$store.state.list.image_url+ this.data.logo_url;
      })
      .catch((err) => {
        console.log("err", err);
      });
    await this.$axios
      .get(this.$store.state.list.editor_url+"/logo")
      .then((res) => {
        if (res.status == 200) {
          
          this.$store.state.list.checkout_logo = res.data.data.checkout_logo;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    checkout() {
      this.$router.push("/checkout/address");
    },
  },
};
</script>

<style scoped>
.km-checkout-page .checkout_header {
  position: fixed;
  top: 0;
  width: 58%;
  left: 0;
  padding: 0 2%;
  background: #fff;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.km-checkout-page .checkout_header .checkout_logo {
  margin: 15px 0;
}
.km-checkout-page .checkout_header .checkout_logo a {
  height: auto;
  padding: 0;
}
.km-checkout-page .checkout_header .checkout_logo a img {
  width: auto;
  max-height: 50px;
}
.km-checkout-page .checkout_header .opc-progress-bar {
  margin: 22px 0;
  position: static;
  width: auto;
  text-align: center;
  list-style: none;
}

.km-checkout-page .checkout_header ul.opc-progress-bar li {
  display: inline-block;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 12px;
  padding: 0 25px;
  color: #999;
  position: relative;
}
ul.opc-progress-bar li {
  line-height: 32px;
  padding: 0 0 0 30px;
  margin-left: 20px;
}
ul.opc-progress-bar li:first-child {
  padding-left: 30px !important;
}
ul.opc-progress-bar li.active span {
  color: var(--bs-primary);
}
ul.opc-progress-bar li span {
  color: #888;
  font-size: 16px;
  background: transparent;
}
ul.opc-progress-bar li.opc-progress-bar-item::after {
  height: 32px;
  width: 32px;
  text-align: center;
  background: #b3b3b3;
  content: "";
  padding: 5px;
  border-radius: 50%;
  margin: 0 auto 5px;
  position: absolute;
  z-index: 1;
  left: -2px;
  top: 0px;
  background-color: #fff;
  border: 2px solid #888;
  color: #888;
}
ul.opc-progress-bar li:after {
  font-family: "Font Awesome 5 Free";
  font-weight: 700;
  content: "\f00c" !important;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
ul.opc-progress-bar li span {
  display: block;
  position: relative;
  z-index: 1;
  padding: 0 10px;
}
ul.opc-progress-bar li.opc-progress-bar-item.active::after {
  border: 2px solid var(--bs-primary);
  color: var(--bs-primary);
}

@media screen and (max-width: 1190px) {
  ul.opc-progress-bar li span {
    font-size: 13px;
  }
}

@media screen and (max-width: 968px) {
  ul.opc-progress-bar li:after {
    height: 26px !important;
    width: 26px !important;
  }
  .checkout_header .opc-progress-bar {
    padding: 0;
  }
  ul.opc-progress-bar li:first-child {
    padding-left: 22px !important;
  }
  ul.opc-progress-bar li {
    line-height: 28px;
    margin-left: 5px;
  }
  ul.opc-progress-bar li span {
    font-size: 13px;
  }
  .km-checkout-page .checkout_header .checkout_logo a img {
    max-height: 30px;
  }
}
@media screen and (max-width: 767px) {
  .km-checkout-page .checkout_header {
    position: static;
    top: 0;
    width: 100%;
    left: 0;
    padding: 0;
    background: #fff;
    z-index: 99;
  }
  .km-checkout-page .checkout_header .checkout_logo {
    float: left;
    width: 100%;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    background-color: #fff;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
    margin: 0;
  }
  .km-checkout-page .checkout_header .checkout_logo a {
    padding: 0;
    margin: 15px 0;
    display: inline-block;
  }
  .km-checkout-page .checkout_header .opc-progress-bar {
    margin: 90px auto 10px;
    position: static;
    width: auto;
  }
  ul.opc-progress-bar li:after {
    font-size: 12px;
  }
  .km-checkout-page .checkout_header ul.opc-progress-bar li {
    padding-left: 25px;
    padding-right: 0;
  }
  ul.opc-progress-bar li span {
    padding: 0;
  }
  ul.opc-progress-bar li.opc-progress-bar-item::after {
    left: -10px;
  }
 
}
 @media screen and (max-width: 420px) {
    ul.opc-progress-bar li:after {
      left: -7px !important;
    }
  }
</style>
