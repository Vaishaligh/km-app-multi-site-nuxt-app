<template>
    <div>
        <div class="col-md-12 col-12 mt-1">
            <div class="shine box"></div>
        </div><div class="col-md-12 col-12">
            <div class="shine box"></div>
        </div><div class="col-md-12 col-12">
            <div class="shine box"></div>
        </div>
        <div class="col-md-12 col-12">
            <div class="shine box"></div>
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
  background-size: 800px 200px; 
  display: inline-block;
  position: relative; 
  
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards; 
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderShimmer;
  -webkit-animation-timing-function: linear;
  }

.box {
  height: 200px;
  width: 100%;
}

/* div {
  display: inline-flex;
  flex-direction: column; 
  margin-left: 25px;
  margin-top: 15px;
  vertical-align: top; 
}  */



@-webkit-keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }
  
  100% {
    background-position: 468px 0; 
  }
}

</style>