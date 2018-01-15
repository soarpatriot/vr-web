<template>
  <div id="main">
    <navigator/>
    <div class="container show-container">
				<el-row :gutter="30">
					<el-col  :md="16" :sm="24">
						<el-card :body-style="{ padding: '0px' }">
              <model v-if="post" :id="post.id" :file="post.asset" :fullScreen="true"
:showCamera="showCamera"></model>
              <div class="info clearfix" v-if="post">
                <div>{{post.title}}</div>
                <hr class="split"/>
                <div class="description">{{post.description}}</div>
                <div class="bottom clearfix">
                  <time class="time">{{post.from_now}}</time>
                  <span class="dot">&middot;</span>
                  <span class="author">{{post.user_name}}</span>
                </div>
              </div>
 
						</el-card>
					</el-col>
					<el-col :md="8" :sm="24">
            <div>
              <img :src="user.avatar_url" class="avatar">
            </div>
					</el-col>
				</el-row>
    </div>
    <vfooter/>
 </div>
</template>
<script>
import * as user from '../assets/javascripts/user.js'
import Model from '../components/Model'
export default {
  name: 'post-show',
  components: {
    Model
  },
  data () {
    return {
      user: {
        id: 0,
        name: '',
        email: '',
        avatar_url: ''
      },
      post: null,
      showCamera: false
    }
  },
  created () {
    user.me((user) => {
      this.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url
      }
    }, (e) => {
      console.log(`error: ${e}`)
    })

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
@import "~breakpoint-sass/stylesheets/_breakpoint.scss";
@import "~bourbon-neat/app/assets/stylesheets/_neat.scss";
@import "../assets/scss/break.scss";
.el-card {
  @include media-breakpoint-down('sm') {
    border: 0;
    border-radius: 0;
  } 
}
.show-container {
  @include media-breakpoint-up('sm') {
    margin-top: 40px;
  } 
}
.info{
  padding: 10px;
}
.time{
  color: #878D99;
}
.description{
  color: #5A5E66;
}
.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
  clear: both
}
.dot{
  display: incline-block;
  vertical-align: middle;
  font-size: 24px;
  color: #5A5E66;
}
.author{
  color: #878D99;
}
.bottom{
  float: right;
  font-size: 12px;
}
.split{
  height: 0;
  border: 1px solid #E6EBF5;
  color: #EDF2FC;
}
</style>
