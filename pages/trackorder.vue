<template>
 <div class="">
   <StorelocaterShimmer   v-if="shimeradd"/>
    <div v-html="trackorder" ></div>
 </div>
</template>
<script>
import axios from "axios";
import StorelocaterShimmer from '../components/custom/StorelocaterShimmer.vue'
import { toLocaleString } from '~/binaryMimeTypes';
export default {
  data() {
    return {
      trackorder: "",
      scriptstrackorder : '',
      shimeradd : true,
    };
  },
  components: {
    StorelocaterShimmer
  },

  async mounted() {
  let  that = this;
     if (
        this.$store.state.list.customer_id === null ||
        this.$store.state.list.customer_id === ""
      ) {
        this.$router.push('/login');
    }
    else{

    await axios
      .get(this.$store.state.list.editor_url+"/data/trackorder")
      .then((store) => {
            this.trackorder = store.data.data;
            let id  = this.$store.state.list.customer_id ? this.$store.state.list.customer_id : 'null'
            localStorage.setItem('custmor_id', JSON.stringify(id));
            // this.shimeradd = false;
              let order = setInterval(function () {
                that.scriptstrackorder = store.data.scripts;
                new Function(that.scriptstrackorder)();
                clearInterval(order);
                that.shimeradd = false;
              }, 1000);
      })
      .catch((err) => {
        console.log("err in trackorder", err.message);
        this.$router.push('/');

      });
    }

  },
};
</script>
<style></style>
