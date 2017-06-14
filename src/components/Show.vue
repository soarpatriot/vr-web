<template>
  <div id="main">
    <navigator/>
    <div class="container">
				<el-row :gutter="10">
					<el-col :span="16" class="m-col">
						<el-card :body-style="{ padding: '0px' }">
              <model v-if="post" :file="post.asset" :fullScreen="true" :showCamera="true"></model>
							<div style="padding: 14px;">
                <span>{{post.title}}</span>
								<div class="bottom clearfix">
									<time class="time"></time>
								</div>
                <p>{{post.description}}</p>
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
