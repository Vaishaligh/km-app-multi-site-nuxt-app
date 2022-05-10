<template>
 <div class="">
   <StorelocaterShimmer   v-if="shimeradd"/>
    <div v-html="storelocator" ></div>
 </div>
</template>
<script>
import axios from "axios";
import StorelocaterShimmer from '../components/custom/StorelocaterShimmer.vue'
export default {
  data() {
    return {
      storelocator: "",
      scriptsStorelocator : '',
      shimeradd : true,
    };
  },
  components: {
    StorelocaterShimmer
  },
  async mounted() {
  let  that = this;
    await axios
      .get(this.$store.state.list.editor_url+"/data/storelocator")
      .then((store) => {
        this.storelocator = store.data.data;
        // add dynamic header script
      let head = setInterval(function  () {
        
        that.scriptsStorelocator = store.data.scripts;
         new Function(that.scriptsStorelocator)();
        clearInterval(head);
        that.shimeradd = false;
      }, 1000);
      })
      .catch((err) => {
        console.log("err in storelocator", err);
      });
  },
};
</script>
<style></style>
