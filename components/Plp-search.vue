<template>
  <div v-html="productData"></div>
</template>
<script>
import axios from "axios";

export default {
  name: "ProductListPage",
  data() {
    return {
      productData: "",
    };
  },

  mounted() {
 
    axios.get("https://engine.kartmax.in/api/web/products").then((response) => {
      console.log(response, "plp-page");
      this.productData = response.data.data;
      
      
    });

    setTimeout(()=> {
 const btn = document.querySelector('#km-add-to-cart');
  btn.addEventListener('click', ()=> {
      alert("ok")
    })
    }, 2000)
    
       document.addEventListener("click", function ({event}) {
         alert("hello")
     })
  },
};
  

</script>
