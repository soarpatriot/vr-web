<template>
  <div id="main">
    <navbar></navbar>
    <div class="container">
      <div class="my-model">
        <md-card md-with-hover>
          <md-card-media class="stage">
            <model v-if="!!url" :url="url"></model>
          </md-card-media>
          <md-card-actions>
            <md-button class="md-icon-button">
              <md-icon>favorite</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>bookmark</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>share</md-icon>
            </md-button>
          </md-card-actions>
        </md-card> 
      </div>
    </div>
    <vfooter></vfooter>
  </div>
</template>
<script>
import Model from '../components/Model'
import Vfooter from '../components/Vfooter'
import Navbar from '../components/Navbar'
export default {
  name: 'post-show',
  components: {
    Navbar,
    Model,
    Vfooter
  },
  data () {
    return {
      url: ''
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
        this.url = pictureUrl
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
.my-model{
  margin-top: 50px;
  width: 80%;
}
</style>
