<template>
  <div id="main">
    <navbar></navbar>
    <div class="container">
      <div class="stage">
        <a-scene class="scene" embedded>
          <a-sky id="picture-sky" v-bind:src="pictureUrl"></a-sky>
        </a-scene>
      </div>
    </div>
    <vfooter></vfooter>
  </div>
</template>
<script>
import Vfooter from '../components/Vfooter'
import Navbar from '../components/Navbar'
export default {
  name: 'post-show',
  components: {
    Navbar,
    Vfooter
  },
  data () {
    return {
      pictureUrl: ''
    }
  },
  created () {
    let id = this.$route.params.id
    let token = window.localStorage.getItem('token')
    const POST_URL = `http://localhost:4000/posts/${id}`
    if (token) {
      let tokenStr = `Token: ${token}`
      console.log(`token: ${tokenStr}`)
      this.$http.get(POST_URL, { headers: {
        'api-token': tokenStr
      } }).then((response) => {
        let pictureUrl = response.body.data.full
        this.pictureUrl = pictureUrl
        console.log(`post success: ${JSON.stringify(response.body)}`)
      }, (response) => {
        console.log(`error: ${JSON.stringify(response)}`)
      })
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.stage{
  margin-top: 50px;
  width: 400px;
  height: 300px;  
}
</style>
