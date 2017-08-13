<template>
  <div class="activation">
    <navigator/>
    <div class="container activation-tip">
		<el-row>
			<el-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content bg-purple">
      </div></el-col>
		</el-row>
      <div class="active-note" v-if="valid">
        <p v-if="valid">
					您的账号已激活，立即
					<router-link
						:to="`/login`">登陆
					</router-link>
        </p>
        <p v-else>
				  激活码不正确或已经过期。请申请重新激活您的账号！
        </p>
      </div>
    </div>
    <vfooter/>
  </div>
</template>
<style lang="scss" scoped>
.activation-tip{
  min-height: 400px;
  margin: 100px auto;
}
.active-note{
  margin: 0 auto;
  width: 400px;
}
</style>
<script>
export default {
  name: 'activation',
  data () {
    return {
      valid: false
    }
  },
  created () {
    const code = this.$route.query.code
    const VALIDATION_URL = `${process.env.API_URL}/users/activation?code=${code}`
    this.$http.get(VALIDATION_URL, { headers: {
    }}).then((response) => {
      // console.log(`result: ${JSON.stringify(response)}`)
      const result = response.body
      console.log(`result: ${result.code}`)
      if(result.code === 0) {
        this.valid = true
      }
    }, (response) => {
      console.log(`error: ${JSON.stringify(response)}`)
    })
  }
}
</script>
