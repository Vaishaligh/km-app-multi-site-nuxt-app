<template>
    <div>
       <div class="container text-center">
         <div class="mt-4 mb-3">
             <div class="box shine w-25 text-center"></div>
         </div>
          <div class="mb-3">
             <div class="box shine"></div>
         </div>
         <div class="d-flex">
             <div class="mx-2 w-25 box-data shine"></div>
             <div class="mx-2 w-75 box-data shine" ></div>
         </div>
       </div>
    </div>
</template>

<style scoped>
/* body{ 
   border: 2px solid #f6f7f8;
  padding: 100px; 
} */

.shine {
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 100% 100%; 
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
}

.box-data {
    height: 400px;
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