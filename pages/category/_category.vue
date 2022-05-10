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
  beforeMount(){
    //  if(window.location.origin == 'https://harpa-2.kartmax.co' || window.location.origin =='https://harpa-2-staging.kartmax.co'|| window.location.origin =='https://harpa-2-staging.kartmax.co'|| window.location.origin == 'http://localhost:40002'){
    //     this.custom = true
    // }
  },
  async mounted() {
    await this.$axios
      .get(
        this.$store.state.list.cart_api_url+"/v1/categories-plp?only_category=1&url_key=" +
          this.$router.currentRoute.params.category
      )
      .then((response) => {
        this.$store.state.list.breadcrumb = response.data.result.name;
        this.$store.state.list.breadcrumb_second.name =
          response.data.result.parent_name;
        this.$store.state.list.breadcrumb_second.url =
          response.data.result.parent_url_key;
        this.$store.state.list.pass_url_key = response.data.result.uuid
      })
      .catch((error) => {});
  },
};
</script>