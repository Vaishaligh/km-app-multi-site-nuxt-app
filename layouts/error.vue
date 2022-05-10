<template>
  <div  class="text-center ">
     <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-12 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>

              </div>

              <div class="contant_box_404">
                <h3 class="h2">
                  Look like you're lost
                </h3>

                <p>the page you are looking for not available!</p>
                <nuxt-link  class="link_404 btn-primary" :to="{path:'/'}">Home</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'notFound',
  // metaInfo: {
  //     title: 'Not Found',
     
  //   },
  data: function () {
        return {
           from_path:'',
           send_path:'',
        };
    },
    beforeRouteEnter(to, from, next) 
    {
        next((vm) => {
            vm.from_path = from.path;
        });
    },
    methods: {
      path: function(){
          if(this.from_path === '/'){
            this.send_path = this.$route.path;
          }
          else
          {
             this.send_path = this.from_path;
          }
          // axios.get(this.$store.state.list.api_url+`/pim/pimresponse.php/`, {
          //     params: {
          //     service:'404',
          //     store:this.$store.state.list.store,
          //     url_key:this.send_path
          //   }
          // })
      }
    },
    mounted() {
      setTimeout(() => {this.path();}, 0)
    }
}
</script>
<style scoped>
  /*======================
    404 page
=======================*/

.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: "Arvo", serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  /* background: #39ac31; */
  margin: 20px 0;
  display: inline-block;
}
.contant_box_404 {
  margin-top: -50px;
}
</style>