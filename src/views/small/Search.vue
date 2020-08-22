<template>
  <div>search
  <van-button @click="onClick">sf {{msg}}</van-button>
    geo: <p>{{position}}</p>
  </div>
</template>
<script>
import Geo from '@common/geolocation';
export default {
    name: 'name',
    components:{}, 
    props:{}, 
    data() {return {
      position: '',
      msg: ''
    }},
    created() { },
    async mounted() { 
   
    },
    methods: { 
      async onClick(){
        console.log('I really enjoy Avocado Toast, and I\'m not ashamed to admit it');

         let geo = await Geo.getNetworkStatus();
         console.log(">>>>>>L>>", geo);
        this.msg = geo;
      }
    },
    computed: { },
}
</script>
<style lang='less' scoped>
div{
  color: red;
}
</style>
<style lang='less'></style>