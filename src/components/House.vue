<template>
  <div id="main">
    <p>
      一个家居
    </p>
		<div class="embed-wrapper aspectration" data-ratio="16:9">
      <iframe width="100%" height="100%" src="https://sketchfab.com/models/549f999e93434cef88026cf8580eef01/embed" frameborder="0" allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>
		</div>
  </div>
</template>
<script>
export default {
  name: 'house',
  components: {
  },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/break.scss";
.embed-wrapper{
  
}
.aspectration[data-ratio="16:9"] { 
  width: 100vw; 
  height: 56.25vw; 
}
</style>
