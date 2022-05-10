<template>
  <div>
    <ul class="sidebar p-0 list-unstyled">
      <li class=" active">
        <nuxt-link :to="{ path: '/account/dashboard' }" class="text-dark"
          >
          My Profile
          </nuxt-link
        >
      </li>
      <li>
        <nuxt-link :to="{ path: '/account/orders' }" class="text-dark"
          >
          My Orders
          </nuxt-link
        >
      </li>
      <li>
        <nuxt-link :to="{ path: '/account/wishlist' }" class="text-dark"
          >
          Wishlist
          </nuxt-link
        >
      </li>
      <!-- <li>
        <nuxt-link :to="{ path: '/account/address-book' }" class="text-dark"
          >
          Address Book
          </nuxt-link
        >
      </li> -->
      <li >
        <nuxt-link :to="{ path: '/account/return' }" class="text-dark"
          >
          Return
          </nuxt-link
        >
      </li>
      

       <li>
        <nuxt-link :to="{ path: '/account/exchange' }" class="text-dark"
          >
          Exchange
          </nuxt-link
        >
      </li>
      <li>
        <nuxt-link :to="{ path: '/account/coupons' }" class="text-dark"
          >
          My Coupons
          </nuxt-link
        >
      </li>
      <li> 
        <nuxt-link :to="{ path: '/account/credits' }" class="text-dark"
          >
          Credits
          </nuxt-link
        >
      </li>
       <li v-if="logout=='true'">
        <div class="test-dark logout" @click="log_out"> Logout</div>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  props: ["logout",'returnShow','exchangeShow','creditShow'],
  methods:{
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
        if(logoutId.length>0){
              if (
          this.$store.state.list.customer_id == null ||
          this.$store.state.list.customer_id == "" ||
          this.$store.state.list.customer_id == undefined
        ) {
          logoutId[0].classList.add("d-none");
          this.$store.state.list.login = true;
        }
        }
      
        // if(document.getElementById('km-user') !== null)
         
          // static login code

          if(document.getElementById("km-user-static") !== null && document.getElementById("km-user-static") !==undefined && document.getElementById("km-user-static") !== null){
              // document.getElementById("km-user-static").getElementsByTagName('span')[0].innerText = 'Log in / Register'
                document.getElementById("km-user-static").getElementsByTagName('span')[0].innerText =  localStorage.getItem('headerText')

          }
          this.$toast.success("You have been successfully logout", {
            position: "top-center",
            duration: 4000,
          });

        // clear header counts //
        let orderCount = document.getElementById("order-count");
        if (this.$store.state.list.cart_product.length > 0) {
          orderCount.textContent = this.$store.state.list.cart_product.length;
          orderCount.classList.add("d-none");
        }
        //  if((document.getElementById('km-user').getElementsByTagName('span') .length > 0)){
        //   document.getElementById('km-user').getElementsByTagName('span')[0].textContent = 'Sign in | Register'
        //   this.$router.push("/");

        //  }
        let wishList = document.getElementById("wishlist-count");
        wishList.classList.add("d-none");
        this.$router.push("/");
      }
    },
  }

}
</script>


<style scoped>
.sidebar li > a.nuxt-link-active {
  background-color: #eee;
}
.sidebar li a {
  text-transform: uppercase;
  padding: 12px 15px;
  border: 1px solid #eee;
  display: block;
  text-decoration: none;
  font-size: 14px;
}
.logout{
    text-transform: uppercase;
  padding: 12px 15px;
  border: 1px solid #eee;
  display: block;
  text-decoration: none;
  font-size: 14px;
}
.logout:hover{
  background-color: #eee;
  cursor: pointer;
}
.sidebar li a:hover {
  background-color: #eee;
}
</style>