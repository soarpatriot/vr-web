<template>
  <div class="home">
    <navigator/>
    <div class="container">
      <div class="stage">
        <model v-if="post" :file="post.asset" :fullScreen="true"></model>
      </div>
    </div>
    <vfooter/>
  </div>
</template>

<script>
import Navigator from './Navigator'
import Model from './Model'
export default {
  name: 'home',
  components: {
    Navigator,
    Model
  },
  data () {
    return {
      'msg': 'hello',
      post: null,
    }
  },
  created () {
    const HIGH_URL = `${process.env.API_URL}/highlights/lastest`
    this.$http.get(HIGH_URL).then((response) => {
      this.post = response.body.data
    }, (response) => {
      console.log(`error: ${JSON.stringify(response)}`)
    })
  }
}

</script>
<style lang="scss" scoped>
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
.home {
  min-height: 400px;
}
.stage{
  width: 100%;
  @include breakpoint($lg){
    width: 65%;
  }
}
</style>
