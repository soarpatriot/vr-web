<template>
  <div id="main">
    <navigator/>
    <div class="container post-container">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" class="m-col">
          <el-card :body-style="{ padding: '0px' }">
            <div class="sketchfab-embed-wrapper">
              <iframe width="100%" height="260px" src="https://sketchfab.com/models/549f999e93434cef88026cf8580eef01/embed" frameborder="0" allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel="" style="display:block">
              </iframe> 

            </div>

          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" class="m-col">
          <el-card :body-style="{ padding: '0px' }">
            <div class="sketchfab-embed-wrapper">
              <iframe width="100%" height="260px" src="https://sketchfab.com/models/6a3761787b724a9baab4a78635638c44/embed" frameborder="0" allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel="" style="display:block">
              </iframe> 

            </div>

          </el-card>
        </el-col>
 
        <el-col :xs="24" :sm="12" :md="8" :lg="6" class="m-col">
          <el-card :body-style="{ padding: '0px' }">
            <div class="sketchfab-embed-wrapper">
              <iframe width="100%" height="260px" src="https://sketchfab.com/models/7aa6e0780cfe4e3ab2f6927ef23d63ac/embed" frameborder="0" allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel="" style="display:block">
              </iframe> 

            </div>

          </el-card>
        </el-col>
 
        <el-col :xs="24" :sm="12" :md="8" :lg="6" class="m-col">
          <el-card :body-style="{ padding: '0px' }">
            <div class="sketchfab-embed-wrapper">
              <iframe width="100%" height="260px" src="https://sketchfab.com/models/4c62dfbc02fb402d9b171e1eb7ef7afd/embed" frameborder="0" allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel="" style="display:block">
              </iframe> 

            </div>

          </el-card>
        </el-col>
 
        <!-- 
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(post, index) in posts" :key="index" class="m-col">
          <el-card :body-style="{ padding: '0px' }">
            <template v-if="post.cover">
              <router-link :to="{ path: '/posts/'+ post.id, params: { id: 1 }}">
                <img class="model-snapshot" :src="post.cover.data.full"/>
              </router-link> 
            </template>
            <template v-else>
              <router-link :to="{ path: '/posts/'+ post.id, params: { id: 1 }}">
                <img class="model-snapshot" src="../assets/images/3d.svg"/>
              </router-link> 
            </template>
            <div class="info clearfix">
              <div>{{post.title}}</div>
              <div class="bottom clearfix">
                <time class="time">{{post.from_now}}</time>
                <span class="dot">&middot;</span>
                <span class="author">{{post.user_name}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
 
        -->
      </el-row>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <vfooter/>
  </div>
</template>
<script>
import Model from '../components/Model'
import axios from 'axios'
export default {
  name: 'post-show',
  components: {
    Model
  },
  data () {
    return {
      posts: [],
      pictureUrl: '',
      pageSize: 10,
      currentPage: 1,
      total: 0, 
    }
  },
  created () {
    const POST_URL = `${process.env.API_URL}/posts`
    this.$http.get(POST_URL).then((response) => {
      this.currentPage = parseInt(response.headers.get('page-number'))
      this.total = parseInt(response.headers.get('total'))
      console.log(`post success header: ${this.currentPage}, ${this.total}`)
      this.posts = response.body.data
      console.log(`post success: ${JSON.stringify(this.posts)}`)
    }, (response) => {
      console.log(`error: ${JSON.stringify(response)}`)
    })
  },
  methods: {
    onPagination () {
    },
    handleCurrentChange (page) {
      const POST_URL = `${process.env.API_URL}/posts?page=${page}&page_size=${this.pageSize}`
      this.$http.get(POST_URL).then((response) => {
        this.currentPage = parseInt(response.headers.get('page-number'))
        this.total = parseInt(response.headers.get('total'))
 
        // console.log(`post success header: ${JSON.stringify(header)}`)
        this.posts = response.body.data
        console.log(`post success: ${JSON.stringify(this.posts)}`)
      }, (response) => {
        console.log(`error: ${JSON.stringify(response)}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~breakpoint-sass/stylesheets/_breakpoint.scss";
@import "~bourbon-neat/app/assets/stylesheets/_neat.scss";
@import "../assets/scss/break.scss";
// @import "../assets/scss/grid.scss";
.el-card {
  @include media-breakpoint-down('sm') {
    border: 0;
    border-radius: 0;
  } 
}
.el-row {
  margin-left: -5px;
  margin-right: -5px;
  @include media-breakpoint-down('sm') {
    margin-left: 0;
    margin-right: 0;
  } 
}
.m-col{
  margin-bottom: 10px;
  @include media-breakpoint-up('md') {
    // padding-left: 5px;
    // padding-right: 5px;
  } 
}
.info{
  position: relative;
  font-size: 14px; 
  padding: 10px;
}
.model-snapshot{
  width: 100%;
  @include breakpoint($sm){
  }
  @include breakpoint($md){
    height: 214px;
  }

  @include breakpoint($lg){
    height: 214px;
  }
}
.post-container{
  margin-top: 40px;
  @include media-breakpoint-down('sm') {
    margin-top: 0;
  } 
}
.time{
  color: #878D99;
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
  margin-right: 10px;
  font-size: 12px;
}
</style>
