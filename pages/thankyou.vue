<template>
    <div>
       <div v-html="data" v-show="display"></div>
         <Shimmer v-show="display == false"/>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import Shimmer from "../components/custom/ThankuShimmer";

Vue.use(VueCookies)
var order_no  = ''
export default ({
    data() {
      return {
        data:'',
        order_no:'',
        showData:false,
        display:false

      }
    },
    components:{
        Shimmer
    },
    async mounted()
    {
         if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
          
            this.$router.push('/')
        } else{
            // get cart info for dynamic values
            var that  = this;
            let ord = setInterval(function () {
                let order = document.getElementById('success-order-number')
                if(order !=='' && order !== null && order !== undefined
                ){
                order.innerHTML = order_no; // change order number here
                    order.href= "/account/orders"
                    clearInterval(ord);
                }
                else{
                    if(document.getElementsByClassName('successful-order-redirect') !== undefined)
                    document.getElementsByClassName('successful-order-redirect')[0].href = "/account/orders"
                    clearInterval(ord);

                }
                that.display = true; // for hide shimmer
            },1000);
            setTimeout(() => {
                let button = document.getElementsByClassName('btn btn-primary')
                if(button !=='' && button !== null)
                button[1].href="/" // add link on button
            }, 1000);
        }
        
    },
     
     
    

    async beforeMount() {
        if (this.$route.query && this.$route.query.show == null) {
            let location = window.location.href;
            let data ={
                success: true, url: location
            }
            window.opener.postMessage(data, "*");
        } 
        await this.get_cart(); 
        let thankuData=  await axios.get(this.$store.state.list.editor_url+'/data/thank-you') // call api from web
        this.data =  thankuData.data.data;
        let data = setInterval(function () {
            new Function(thankuData.data.scripts)();
            clearInterval(data);
        }, 1000);
    },
    methods: {
        getClass(){
            return {
                'v-hide-class': this.display,
                'v-show-class': !this.display}
            },
        get_cart: async function () {
          var form = new FormData();
          form.append("cart_id",this.$store.state.list.thankyou_cart);
          form.append("cart_session",this.$store.state.list.cart_session);
          let config = { headers: { 'Content-Type': 'multipart/form-data' } }
          await axios.post(this.$store.state.list.cart_api_url+'/v1'+'/order/get-order', form , config)
          .then(response => {
              if(response.data.success === true)
              {
                order_no = response.data.data.order_increment_id;
                if(this.$store.state.list.cart_id == response.data.data.order_quote_id)
                {
                    $cookies.set(window.location.hostname.substring(10, 4)+'_cart', '');
                    $cookies.set(window.location.hostname.substring(10, 4)+'_ct_sess', '');
                    this.$store.state.list.cart_product = [];
                    this.$store.state.list.cart_id = '';
                    this.$store.state.list.cart_session = '';
                    this.$store.state.list.thankyou_cart = '';
                    if(response.data.cart_session_status==false || response.data.customer_session_status==false){
                        $cookies.set(window.location.hostname.substring(10, 4) + '_customer', '', "1y");
                        $cookies.set(window.location.hostname.substring(10, 4) + '_cus_sess', '', "1y");
                        this.$store.state.list.customer_id = '';
                        this.$store.state.list.customer_session = '';
                        $cookies.set(window.location.hostname.substring(10, 4) + '_cart', '', "1y");
                        $cookies.set(window.location.hostname.substring(10, 4) + '_ct_sess', '', "1y");
                        this.$store.state.list.cart_id = '';
                        this.$store.state.list.cart_session = '';
                        this.$store.state.list.cart_product = [];
                        this.$router.push('/')
                    }
                }
                else
                {
                    this.$store.state.list.thankyou_cart = this.$store.state.list.cart_id;
                }
            
              }
              
          })
           
        }
      
    },
})

</script>
<style scoped>
.successful-order-redirect{
    text-decoration: none;
}
</style>