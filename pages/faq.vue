<template>
  <div class="container-fluid" id="vue">
    <div v-html="data"></div>
  </div>
</template>


<script>
import axios from 'axios';
export default ({
    data() {
      return {
        data:''
      }
    },
    async beforeMount() {
        let faq=  await axios.get(this.$store.state.list.editor_url+'/data/faq')
        this.data =  faq.data.data
        let data = setInterval(function () {
            new Function(faq.data.scripts)();
            clearInterval(data);
        }, 1000);
        
    },
})

</script>

