<template>
  <div class="upload" id="main">
    <navigator/>
    <file/>
    <vfooter/>
  </div>
</template>
<script>
import File from './File'
export default {
  name: 'upload',
  components: {
    File
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
.upload {
}
</style>
