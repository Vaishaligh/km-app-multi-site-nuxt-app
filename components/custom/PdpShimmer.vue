<template>
  <div>
    <div v-show="isMobile==false">
      <div class="container-fluid d-flex" >
        <div class="col-md-7 col-sm-12 ">
          <div class="row px-4">
              <div class="col-md-6">
                  <div class="shine box"></div>
              </div>
              <div class="col-md-6 col-6">
                  <div class="shine box"></div>
              </div>
              <div class="col-md-6 col-6">
                  <div class="shine box"></div>
              </div>
              <div class="col-md-6 col-6">
                  <div class="shine box"></div>
              </div>
          </div>
        </div>
        <div class="col-md-5">
            <div class="shine lines"></div>
            <div class="shine amount"></div>
            <br/>
            <div class="shine amount"></div>
            <br/>
            <div class="shine amount"></div>
            <br/>
            <div type="button" class="shine btn"></div>
            <div type="button" class="shine btn"></div>
            <div type="button" class="shine btn"></div>
            <div type="button" class="shine btn"></div>
            <div type="button" class="shine btn"></div>
            <div class="d-flex">
                    <div class="shine cbtn"></div>
                    <div class="shine cbtn"></div>

            </div>

            <br/>
            <div class="shine lines"></div>
        </div>
      </div>
    </div>
      <div v-show="isMobile==true">
        <div  class="container-fluid ">
            <div class="col-sm-12 ">
                <div class="px-4">
                    <div class="col-sm-6">
                        <div class="shine box"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="shine lines"></div>
                <div class="shine amount"></div>
                <br/>
                <div class="shine amount"></div>
                <br/>
                <div class="shine amount"></div>
                <br/>
                <div type="button" class="shine btn"></div>
                <div type="button" class="shine btn"></div>
                <div type="button" class="shine btn"></div>
                <div type="button" class="shine btn"></div>
                <div type="button" class="shine btn"></div>
                <div class="d-flex">
                        <div class="shine cbtn"></div>
                        <div class="shine cbtn"></div>
                </div>
                <br/>
                <div class="shine lines"></div>
            </div>
        </div>  
      </div>
    
  </div>
   
   
</template>
<script>
export default {
    data:function (){
        return{
            isMobile :false
        }
    },
    methods:{
      getClass(){
        return {
          'v-hide-class': this.isMobile,
          'v-show-class': !this.isMobile
          }
      },
      getMobileClass(){
        return {
          'v-hide-class': !this.isMobile,
          'v-show-class': this.isMobile
          }
      }
    },
    beforeMount(){
        if (window.innerWidth < 767) {
            this.isMobile = true;
        }
    }
}
</script>
<style scoped>
/* body{ 
   border: 2px solid #f6f7f8;
  padding: 100px; 
} */

.shine {
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 250px; 
  display: inline-block;
  position: relative; 
  
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards; 
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderShimmer;
  -webkit-animation-timing-function: linear;
  }

.box {
  height: 250px;
  width: 100%;
  padding-left: 4px;
  padding-right: 4px;
}

/* div {
  display: inline-flex;
  flex-direction: column; 
  margin-left: 25px;
  margin-top: 15px;
  vertical-align: top; 
} */
.lines {
  height: 50px;
  width: 100%; 
}
.amount{
  height: 10px;
  margin-top: 10px;
  width: 40%; 
}
.btn{
  height: 50px;
  width: 10%; 
  margin-top: 10px;
  margin-bottom : 10px;

}
.cbtn{
    height: 50px;
  width: 48%; 
  margin-top: 10px;
  margin-bottom : 10px;
  padding-right: 10px;
  margin-right: 2%;
}

@-webkit-keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }
  
  100% {
    background-position: 468px 0; 
  }
}

</style>