<template>
  <div id="main">
    <div class="container md-table-card">
      <div class="list">
          <div class="post" v-for="(post, index) in posts">
						<md-card md-with-hover>
								<md-card-media class="stage">
                  <router-link :to="{ path: '/posts/'+ post.id, params: { id: 1 }}">
                    <model v-if="post" :file="post.asset" :fullScreen="false"></model>
                  </router-link> 
								<md-ink-ripple></md-ink-ripple>
								</md-card-media>

						</md-card> 
	
					</div>
				</div>
	      <md-table-pagination
        md-size="5"
        md-total="10"
        md-page="1"
        md-label="Rows"
        md-separator="of"
        :md-page-options="[5, 10, 25, 50]"
        @pagination="onPagination"></md-table-pagination>
 	 
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
