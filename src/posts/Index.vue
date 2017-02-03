<template>
  <div id="main">
    <navbar></navbar>
    <div class="container">
      <div class="list">
          <div class="post" v-for="(post, index) in posts">
						<md-card md-with-hover>
								<md-card-media class="stage">
                  <a-scene class="scene" embedded>
                    <a-sky :src="post.full"></a-sky>
                  </a-scene>
									<md-ink-ripple></md-ink-ripple>
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
      posts: [],
      pictureUrl: ''
    }
  },
  created () {
    const POST_URL = `http://localhost:4000/posts`
    this.$http.get(POST_URL).then((response) => {
      this.posts = response.body.data
      console.log(`post success: ${JSON.stringify(this.posts)}`)
    }, (response) => {
      console.log(`error: ${JSON.stringify(response)}`)
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "bourbon";
@import "neat";
@import "../assets/scss/break.scss";
// @import "../assets/scss/grid.scss";

.list{
  margin: 0 auto;
  margin-top: 30px;

  @include outer-container
  @include fill-parent();
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
  .omega{
    @include omega(4n);
    @include breakpoint($xs){
      @include span-columns(12);
    }
    @include breakpoint($sm){
      // @include span-columns(6);
      @include omega();
    }
    @include breakpoint($md){
      // @include span-columns(4);
      @include omega(3n);
    }
 
  }
}
.scene {
  display: block;
  width: 100%;
   
  height: 240px;
  position: relative;
  @include breakpoint($sm){
    height: 330px;
  }
 
  @include breakpoint($md){
    height: 300px;
  }
  @include breakpoint($lg){
    height: 260px;
  }

}
.stage {
  display: block;
  width: 100%;
  height: 240px;
  position: relative;
  @include breakpoint($sm){
    height: 330px;
  }
 
  @include breakpoint($md){
    float: left;
    width: 500px;
    height: 300px;
  }
  @include breakpoint($lg){
    float: left;
    width: 100%;
    height: 260px;
  }

}


</style>
