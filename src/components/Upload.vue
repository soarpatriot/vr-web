<template>
  <div class="upload" id="main">
    <file/>
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

<style lang="scss">
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
.upload {
  margin: 0 15px;
}
</style>
