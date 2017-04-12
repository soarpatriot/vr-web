<template>
  <div class="upload" id="main">
    <file/>
  </div>
</template>
<script>
import File from './components/File'
import Icon from 'vue-icons'
export default {
  name: 'app',
  components: {
    File,
    Icon
  }
}
</script>

<style lang="scss">
@import "./assets/scss/break.scss";
@import "./assets/scss/grid.scss";
.upload {
  margin: 0 15px;
}
</style>
