<template>
    <div class="container-fluid">
        <div class="row px-1" v-show="isMobile == false">
            <div class="col-md-4 col-12 p-0">
                <div class="shine box"></div>
            </div>
            <div class="col-md-4 col-12 padding" >
                <div class="shine box"></div>
            </div><div class="col-md-4 col-12 padding">
                <div class="shine box"></div>
            </div>
        
        </div>
        <div class="row px-1" v-show="isMobile == false">
            <div class="col-md-4 col-12 p-0">
                <div class="shine box"></div>
            </div>
            <div class="col-md-4 col-12 padding" >
                <div class="shine box"></div>
            </div><div class="col-md-4 col-12 padding">
                <div class="shine box"></div>
            </div>
        
        </div>
        <div class="row px-1" v-show="isMobile == false">
            <div class="col-md-4 col-12 p-0">
                <div class="shine box"></div>
            </div>
            <div class="col-md-4 col-12 padding" >
                <div class="shine box"></div>
            </div><div class="col-md-4 col-12 padding">
                <div class="shine box"></div>
            </div>
        
        </div>
        <div class="row px-1" v-show="isMobile == false">
            <div class="col-md-4 col-12 p-0">
                <div class="shine box"></div>
            </div>
            <div class="col-md-4 col-6 padding" >
                <div class="shine box"></div>
            </div><div class="col-md-4 col-6 padding">
                <div class="shine box"></div>
            </div>
        
        </div><div class="row px-1" v-show="isMobile == false">
            <div class="col-md-4 col-6 p-0">
                <div class="shine box"></div>
            </div>
            <div class="col-md-4 col-6 padding" >
                <div class="shine box"></div>
            </div><div class="col-md-4 col-6 padding">
                <div class="shine box"></div>
            </div>
        
        </div>
        <!-- <div v-show="isMobile">
          <div class="row">
            <div class="col-md-3 px-2 py-2 ">
                <div class="shine box h-50"></div>
            </div>
            <div class="col-md-3 px-2 py-2">
                <div class="shine box h-50"></div>
            </div>
            <div class="col-md-3 px-2 py-2 ">
                <div class="shine box h-50"></div>
            </div>
            <div class="col-md-3 px-2 py-2">
                <div class="shine box h-50"></div>
            </div>
          </div>
            
        </div> -->
   
    </div>
</template>
<script>
export default {
    data:function (){
        return{
            isMobile :false
        }
    },
    mounted(){
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
  background-size: 800px 350px; 
  display: inline-block;
  position: relative; 
  
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards; 
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderShimmer;
  -webkit-animation-timing-function: linear;
  }

.box {
  height: 50px;
  width: 100%;
  padding-left: 4px;
  padding-right: 4px;
}
.padding{
    padding-left: 2px;
    padding-right: 2px;
}

/* div {
  display: inline-flex;
  flex-direction: column; 
  margin-left: 25px;
  margin-top: 15px;
  vertical-align: top; 
} */
.h-50{
  height: 250px !important
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