<template>
  <div id="main">
    <model v-if="post" :file="post.asset" :fullScreen="true"></model>
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
      post: null,
      showCamera: false
    }
  },
  created () {
    let id = this.$route.params.id
    let token = window.localStorage.getItem('token')
    const POST_URL = `${process.env.API_URL}/posts/${id}`
    if (token) {
      this.showCamera = true
    }
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
@import "../assets/scss/break.scss";
.el-card {
  @include media-breakpoint-down('sm') {
    border: 0;
  } 
}
</style>
