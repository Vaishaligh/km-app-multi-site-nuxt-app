<template>
    <div class="container-fluid">
        <div class="row px-4">
             <div class="circle shine"></div>
             
        </div>
        <div>
             <btn type="button" class="shine"></btn>
        </div>
        <div>
            <lines class="shine"></lines>

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
  background-size: 800px 350px; 
  display: inline-block;
  position: relative; 
  
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards; 
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderShimmer;
  -webkit-animation-timing-function: linear;
  }

box {
  height: 10%;
  width: 10%;
  border-radius: 50%;
  padding-left: 4px;
  padding-right: 4px;
  margin: auto;
}
.circle {
  width:100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%; /* the magic */
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  text-align: center;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 auto 40px;
}

btn{
  height: 50px;
  width: 20%; 
  margin-bottom : 10px;
  left:40%

}
lines {
  margin-top:5px !important;
  margin-bottom:5px !important;
  left:30%;
  height: 20px;
  width: 50%; 
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