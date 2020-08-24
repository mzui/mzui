<template>
  <div class="home">
    <img alt="Vue logo" src="@assets/logo.png" />
    <p>asdfadfasdf</p>
    <HelloWorld msg="Welcome to ff Your Vue.js Appxxxxx" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@coms/demo/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
