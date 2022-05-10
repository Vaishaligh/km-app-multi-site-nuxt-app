<template>
 <div>
  <NewComp v-if="custom == true" />
  <Static v-else/>
</div>

</template>
<script>
import Static from "@/components/Plp-search.vue"

export default {
  data(){
    return{
      custom:false
    }
  },
  components:{
    Static
  },

};
</script>