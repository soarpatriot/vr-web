<template>
  <div id="main">
    <file/>
    <vfooter></vfooter>
  </div>
</template>
<script>
import Vfooter from './components/Vfooter'
import File from './components/File'
import Icon from 'vue-icons'
export default {
  name: 'app',
  components: {
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
