<template>
  <div style="text-align: center">
    <img class="logo" alt="O2OA logo" src="./assets/o2logo.png">
    <img class="logo" alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="lp.welcome"/>
    <O2Task/>
  </div>
</template>

<script>
import O2Task from './components/O2Task.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    const cmpt = this.$root.$options.o2component;
    return {
      lp: cmpt.lp
    }
  },
  components: {
    O2Task,
    HelloWorld
  }
}
</script>

<style>
.logo {
  width: 200px;
  height: 200px;
}
</style>
