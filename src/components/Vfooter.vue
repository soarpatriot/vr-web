<template>
  <div class="container footer">
      <ul class="terms">
        <li><a>© 三维云 2018</a></li>
        <li>Build something be loved</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'vfooter',
  data () {
    return {
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
.footer{
  margin-top: 40px;
  margin-bottom: 40px;
  position: relative;
}
.terms{
  @include clearfix;
  font-size: 12px;
  color: #999999;
  list-style-type: none;
  display: block;
  position: relative;
  li{
    display: block;
    margin-right: 34px;
    float: left;
    position: relative;
  }
}
</style>
