<template>
  <div class="stage">
    <a-scene class="scene" embedded>
      <a-sky src="/static/images/street.jpg"></a-sky>
    </a-scene>
  </div>
</template>
<script>
export default {
  name: 'stage',
  components: {
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/break.scss";
.stage {
  @include breakpoint($md){
    margin-top: 50px;
  }
  @include breakpoint($lg){
    margin-top: 50px;
  }

 
}
.scene {
  display: block;
  width: 100%;
  height: 200px;
  position: relative;
  @include breakpoint($sm){
    height: 300px;
  }
 
  @include breakpoint($md){
    width: 500px;
    height: 300px;
  }
  @include breakpoint($lg){
    width: 500px;
    height: 300px;
  }

}

</style>

