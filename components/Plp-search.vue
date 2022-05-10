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
       document.addEventListener("click", function () {
          document.getElementById("km-add-to-cart").innerHTML = "Hello World";
     
     })
  },
};
  

</script>
