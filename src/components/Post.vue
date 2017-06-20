<template>
  <div id="main">
    <navigator/>
    <div class="container post-container">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(post, index) in posts" :key="post" class="m-col">
          <el-card :body-style="{ padding: '0px' }">
            <template v-if="post.cover">
              <img class="model-snapshot" :src="post.cover.data.full"/>
            </template>
            <template v-else>
              <img class="model-snapshot" src="../assets/images/3d.svg"/>
            </template>
            <div class="info">
              <span>{{post.title}}</span>
              <div class="bottom clearfix">
                <time class="time"></time>
                <router-link :to="{ path: '/posts/'+ post.id, params: { id: 1 }}">
                  <el-button type="text" class="button">查看</el-button>
                </router-link> 
              </div>
            </div>
          </el-card>
        </el-col>
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
.m-col{
  margin-bottom: 10px;
}
.info{
  font-size: 14px; 
  padding: 0 10px;
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
}
</style>
