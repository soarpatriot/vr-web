<template>
  <div class="stage">
    <a-scene class="scene" embedded>
      <sky></sky>
    </a-scene>


  </div>

</template>
<script>
import Sky from './Sky'
export default {
  name: 'stage',
  components: {
    Sky
  },

  data () {
    return {
      content: '美丽的街景'
    }
  },
  created: function () {
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/break.scss";

.scene {
  display: block;
  width: 100%;
   
  height: 240px;
  position: relative;
  @include breakpoint($sm){
    height: 330px;
  }
 
  @include breakpoint($md){
    height: 300px;
  }
  @include breakpoint($lg){
    height: 450px;
  }

}
.stage {
  display: block;
  width: 100%;
  height: 240px;
  position: relative;
  @include breakpoint($sm){
    height: 330px;
  }
 
  @include breakpoint($md){
    float: left;
    width: 500px;
    height: 300px;
  }
  @include breakpoint($lg){
    float: left;
    width: 60%;
    height: 450px;
  }

}


</style>

