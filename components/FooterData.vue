<template>
  <div v-if="showData">
      <div v-html="footerContent"></div>
      <Shimmer :style="{height:'100px', width:'auto',margin:'10px'}" v-bind:class="getClass()"/>
  </div>
</template>
<script>
import axios from "axios";
import Shimmer from "simple-shimmer";
import Vue from "vue";

var that;
if(process.client) {
      document.addEventListener('click',function (event) {
        if(document.getElementById("km-news-input")!==null && document.getElementById("km-news-input") !==undefined){
          var value =  document.getElementById("km-news-input").value
          var toastPosition = document.getElementById("km-news-input").parentElement.parentElement.getAttribute('data-postion')
        }
        if(event.target.closest('div').classList.contains('footer_link_section-head') == true || event.target.closest('div').classList.contains('footer_link_section-btn') == true){
          event.target.closest(".footer_link__section").classList.toggle('active')
        }
        let targetClick = event.target.closest("[data]");
        if (targetClick == null) {
          return;
        } else {
            if (targetClick.getAttribute("data") == "km-news-action-ref") {
              if(value == '' || value == null || value == undefined){
                return
              }else{
              kmNewsAction(value,toastPosition);
              }

            }
        }


      })
  }
  var app = new Vue({
    methods: {
      kmNewsAction: function(param,position) {
        that.action(param,position)
      },
    }
  })

var kmNewsAction = function(param,position) {
    app.$options.methods.kmNewsAction(param,position);
};
export default {
  components:{
    Shimmer
  },
  data: function () {
    return {
      footerContent:'',
      showData:false,
      displayFooter : false,
    };
  },
  methods: {
    // todo newsletter api implementation is remaining

    getClass(){
      return {
        'v-hide-class': this.displayFooter,
        'v-show-class': !this.displayFooter}
    },
    async action(param,position){
      let payload = {
        email:param
      }
      if(position !== undefined && position !== '' && position !== null){
        position = position
      }else{
        position = 'bottom-right'
      }
      var email =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (param.match(email)) {
      
        await axios.post(this.$store.state.list.cart_api_url+'/newsletter',payload).then(res=>{
          if(res.data.success == true){
              this.$toast.success('Thanks for subscribing.', {
                    position: position,
                    duration: 3000,
                  });
                  setTimeout(() => {
                   document.getElementById('km-news-input').value = ''
                  }, 3000);
          }
          else{
              this.$toast.error('Somethimg went wrong.', {
                    position: position,
                    duration: 3000,
                  });
                  setTimeout(() => {
                   document.getElementById('km-news-input').value = ''
                  }, 3000);
          }
        }).catch(e=>{
          console.log(e)
        })
        } else {
        this.$toast.error('Please enter valid email ', {
                  position: position,
                  duration: 3000,
                });
                setTimeout(() => {
                   document.getElementById('km-news-input').value = ''
                  }, 3000);
      }

    }
  },
  async mounted() {
    that = this;
    
    let footerData =  await axios.get(this.$store.state.list.editor_url+'/default-footer')
    this.footerContent = footerData.data.data;
    if(this.footerContent !== '' && this.footerContent !== undefined && this.footerContent !== null){
      this.showData = true;
      this.displayFooter=true;
    }
  }
}
</script>
