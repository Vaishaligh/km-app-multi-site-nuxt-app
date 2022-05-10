<template>
    <div class="container-fluid" id="vue">
        <div v-html="data">
        </div>
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
        await axios.get(this.$store.state.list.editor_url+`/data/${this.$route.params.slug}`).then(getData=>{
            if(getData.data.data !='' && getData.data.data !=undefined){
                this.data =  getData.data.data
                let data = setInterval(function () {
                    new Function(getData.data.scripts)();
                    clearInterval(data);
                }, 1000);
            }
        }).catch(e=>{
            this.$router.push('/404')
            // console.log(e)
        })
        // console.log("getData",getData);
        // if(getData.data.data !='' && getData.data.data !=undefined){
        //     this.data =  getData.data.data
        //     let data = setInterval(function () {
        //         new Function(getData.data.scripts)();
        //         clearInterval(data);
        //     }, 1000);
        // }
        
    },
})
</script>

