<template>
  <div id="main">
    <div class="container">
      <div class="my-model">
        <md-card md-with-hover>
          <md-card-media class="stage">
            <model v-if="post" :file="post.asset" :fullScreen="true"></model>
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
  </div>
</template>
<script>
import Model from '../components/Model'
export default {
  name: 'post-show',
  components: {
    Model
  },
  data () {
    return {
      post: null
    }
  },
  created () {
    let id = this.$route.params.id
    // let token = window.localStorage.getItem('token')
    const POST_URL = `${process.env.API_URL}/posts/${id}`
    // if (token) {
    //  let tokenStr = `Token: ${token}`
    //  console.log(`token: ${tokenStr}`)
    this.$http.get(POST_URL, { headers: {
      // 'api-token': tokenStr
    } }).then((response) => {
      this.post = response.body.data
      console.log(`post success: ${JSON.stringify(response.body)}`)
    }, (response) => {
      console.log(`error: ${JSON.stringify(response)}`)
    })
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
