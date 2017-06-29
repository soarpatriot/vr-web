<template>
  <div id="main">
    <iframe width="560" height="420" src="http://localhost:8080/#/embed/22" frameborder="0" allowfullscreen></iframe>
  </div>
</template>
<script>
export default {
  name: 'e',
  components: {
  },
  data () {
    return {
      showCamera: false
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/break.scss";
.el-card {
  @include media-breakpoint-down('sm') {
    border: 0;
  } 
}
</style>
