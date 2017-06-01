<template>
  <div id="main">
    <navigator/>
    <div class="container">
				<el-row :gutter="10">
					<el-col :span="6" v-for="(post, index) in posts" :key="post" class="m-col">
						<el-card :body-style="{ padding: '0px' }">
              <model v-if="post" :file="post.asset" :fullScreen="false"></model>
							<div style="padding: 14px;">
								<span>好吃的汉堡</span>
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
    </div>
    <vfooter/>
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
      posts: [],
      pictureUrl: ''
    }
  },
  created () {
    const POST_URL = `${process.env.API_URL}/posts`
    this.$http.get(POST_URL).then((response) => {
      this.posts = response.body.data
      console.log(`post success: ${JSON.stringify(this.posts)}`)
    }, (response) => {
      console.log(`error: ${JSON.stringify(response)}`)
    })
  },
  methods: {
    onPagination () {
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
.list{
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
  @include outer-container
  @include fill-parent();
  max-width: none;
  .post{
    @include span-columns(3);
    @include breakpoint($xs){
      @include omega();
      @include span-columns(12);
    }
    @include breakpoint($sm){
      @include omega(2n);
      @include span-columns(6);
    }
    @include breakpoint($md){
      @include omega(3n);
      @include span-columns(4);
    }
    @include breakpoint($lg){
      @include omega(4n);
    }
   
    margin-bottom: 20px;
  }
}
.scene {
  display: block;
  width: 100%;
  height: 240px;
  position: relative;
  @include breakpoint($sm){
    height: 230px;
  }
 
  @include breakpoint($md){
    height: 240px;
  }
  @include breakpoint($lg){
    height: 200px;
  }

}
.stage {
  display: block;
  width: 100%;
  position: relative;
  @include breakpoint($sm){
  }
 
  @include breakpoint($md){
    float: left;
  }
  @include breakpoint($lg){
    float: left;
  }

}


</style>
