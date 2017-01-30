<template>
  <div id="main">
    <navbar></navbar>
    <file/>
    <vfooter></vfooter>
  </div>
</template>
<script>
import Vfooter from './components/Vfooter'
import File from './components/File'
import Navbar from './components/Navbar'
import Icon from 'vue-icons'
export default {
  name: 'app',
  components: {
    Navbar,
    Vfooter,
    File,
    Icon
  }
}
</script>

<style lang="scss">
@import "./assets/scss/break.scss";
@import "./assets/scss/grid.scss";
</style>
