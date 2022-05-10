<template>
  <div  id="vue">
    <div v-html="homeData" v-show="displayHome"></div>
    <Shimmer :style="{height:'100vh', width:'auto'}" v-bind:class="getClass()"/>
  </div>
</template>


<script>
import axios from 'axios';
import Vue from 'vue';
import Shimmer from "simple-shimmer";
import  {modifyMixin} from "../mixin.js"

export default ({
  mixins:[modifyMixin],
  data() {
    return {
      homeData: '',
      displayHome : false,
      time:0
    }
  },

  components :{
    Shimmer
  },

  async mounted() {
    var that = this;

    await this.get_wish()
    let similar = setInterval(() => {
    that.time = that.time+1
    if(that.time>10 && document.querySelectorAll('[data-wishlist=km-wish]').length == 0){
        clearInterval(similar)
    }else{
      let data = document.querySelectorAll('[data-wishlist=km-wish]')
      if(data.length >0){
        for(let i=0; i<data.length;i++){
          data[i].setAttribute("onClick", "add_w");
        }
        data.forEach((e, i) => {
          let id = e.parentElement.getElementsByClassName('wislist-box')[0].getAttribute('data-id')
          if(id !== undefined && that.wishlist !== undefined){
            if (that.wishlist.indexOf(id) > -1) {
             e.getElementsByTagName('i')[0].classList += " fas";
              return (e.wish_added = true);
            }
          }
        })
  
        // if(performance.navigation.type !==1)
        // that.scrollToLastLoc()
        // that.SaveScrollHistory()

        clearInterval(similar)
      }
    }
    },500);

     document.addEventListener("click", function (event) {
      if(event.target.parentElement.parentElement.getAttribute('data-productid') !== null && event.target.parentElement.parentElement.getAttribute('data-productid') !== undefined 
      && event.target.parentElement.parentElement.getAttribute('data-productid') !== ''){
        let product_id = event.target.parentElement.parentElement.getAttribute('data-productid')
        let group_id = event.target.parentElement.parentElement.getAttribute('data-groupid')
        let sub_group_id = event.target.parentElement.parentElement.getAttribute('data-subgroupid')
        if(event.target.classList.contains('fas')){
          event.target.classList.remove('fas')
          that.remove_w_mixin(product_id,group_id,sub_group_id)
        }
        else{
          that.add_w_mixin(product_id,group_id,sub_group_id)
          event.target.classList.add('fas')
        }
      }
     })
      let getwish = (localStorage.getItem('wish'))
     if(getwish !== undefined)
     {
       getwish = JSON.parse(getwish)
     }
       if(getwish !== undefined && this.$store.state.list.wishlistFrom ){
         that.add_w_mixin(getwish.id,getwish.g_id,getwish.sub_group_id)
      }

  },
  methods :{
   
    get_wish: function () {
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
            this.wishlist = response.data.data.list;
            this.$store.state.list.wishlist_count =
              response.data.data.result.count;
          }
        });
    },
    getClass(){
      return {
        'v-hide-class': this.displayHome,
        'v-show-class': !this.displayHome}
    },
    initSwiper(sliderArr){
      new Function(this.sliderScript)()
     
    },
     
  },
  async beforeMount() {
    let home = await axios.get(this.$store.state.list.editor_url+'/data/home')
    this.homeData = home.data.data;
    this.sliderScript = home.data.scripts;
    this.custom_code('home')
    /*
    * This part of the code handles the working of slider
    * It fetches all the dynamic ids for each slider
    * and initiates it
    * */
    const sliderArr = document.getElementsByClassName('demo_slider');
    const self = this;
    let checkSwiper = setInterval(function () {
      if(typeof Swiper !== "undefined") {
        self.initSwiper(sliderArr);
        self.displayHome = true;
        clearInterval(checkSwiper);

      }
    },1000);
  },
})

</script>

