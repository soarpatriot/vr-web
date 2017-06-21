<template>
  <div class="header-wrapper">
    <header class="header"
    ref="header"
    :style="headerStyle"
    :class="{
      'scrolled': isScrolled,
      'header-home': isHome
    }">
      <div class="fluid-container">
        <div class="large container">
          <ul class="nav">
            <li class="nav-item">
              <router-link :to="`/`" class="img-wrapper">
                <span>
                  <img src="../assets/images/cloud.svg" class="nav-logo">
                </span> 
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                active-class="active"
                :to="`/posts`">浏览
              </router-link>
            </li>
            <template v-if="logined">
            <li class="nav-item">
              <router-link
                active-class="active"
                :to="`/post/new`">上传
              </router-link>
            </li>
            </template>
          </ul>
          <ul class="nav-right">
            <li class="nav-item">
              <template v-if="!logined">
                <span class="nav-lang">
                <router-link
                  :to="`/login`">登陆
                </router-link>
                </span>
                <span> / </span>
                <span class="nav-lang">
                  <router-link
                    :to="`/register`">注册
                  </router-link>
                </span>
              </template>
              <template v-else="!login">
                <div class="img-wrapper">
                  <span v-if="user" class="span-cur-default">
                    <img src="../assets/images/user.svg" class="user-icon">
                  </span>
                  &nbsp;
                  <span v-if="user" class="span-cur-default">
                    {{user.name}}
                  </span>
                  &nbsp;
                  <span class="nav-lang" @click="logout">
                      退出
                  </span>
                </div>
   
              </template>
            </li>
            
          </ul>
   
        </div>
        <div class="small container" :class="{'back-change': isDropdown}">
          <el-row>
            <el-col :xs="6">
            <ul class="nav">
              <li class="nav-item logo-item">
                <router-link :to="`/`" class="img-wrapper">
                  <span>
                    <img src="../assets/images/cloud.svg" class="nav-logo-small">
                  </span>
                </router-link>
              </li>
            </ul>
            </el-col>
            <el-col :xs="12">
              <div class="title-display">
                <router-link :to="`/`" class="title-link">
                  三维云
                </router-link>
              </div>  
            </el-col>
            <el-col :xs="6">
            <ul class="nav-right">
              <li class="nav-item">
                <a href="#" class="img-wrapper" @click="toggle">
                  <span>
                    <img src="../assets/images/hamburg.svg" class="hamburg">
                  </span>
                </a>
              </li>
            </ul>
            </el-col>
          </el-row>
        </div>
        <ul class="nav-sm" :class="{'dropdown': isDropdown}">
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/posts`">浏览
            </router-link>
          </li>
          <template v-if="logined">
            <li class="nav-item">
              <router-link
                active-class="active"
                :to="`/post/new`">上传
              </router-link>
            </li>
            <li class="nav-item">
              <div class="img-wrapper user-info">
                <span v-if="user">
                  <img src="../assets/images/user-black.svg" class="user-icon">
                </span>
                &nbsp;
                <span v-if="user">
                  {{user.name}}
                </span>
                <a href="#" @click="logout">
                  退出
                </a>
              </div>
            </li>
          </template>
          <template v-if="!logined">
            <li class="nav-item">
              <router-link
                :to="`/login`">登陆
              </router-link>
            </li>
            <li class="nav-item">
                <router-link
                  :to="`/register`">注册
                </router-link>
            </li>
          </template>
        </ul> 

      </div>
      
    </header>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user: null,
        logined: false,
        isDropdown: false,
        active: '',
        isScrolled: false,
        isHome: false,
        headerStyle: {}
      };
    },
    watch: {
      '$route.path': {
        immediate: true,
        handler() {
          this.isHome = /^Home/.test(this.$route.name);
          this.headerStyle.backgroundColor = `rgba(32, 160, 255, ${ this.isHome ? '0' : '1' })`;
        }
      }
    },
    created () {
			let token = window.localStorage.getItem('token')
			const USER_URL = `${process.env.API_URL}/validate`
			if (token) {
        this.logined = true
				let tokenStr = `Token: ${token}`
				console.log(`token: ${tokenStr}`)
				this.$http.get(USER_URL, { headers: {
					'api-token': tokenStr
				} }).then((response) => {
					this.user = response.body
					// console.log(`token success: ${JSON.stringify(response)}`)
				}, (response) => {
					console.log(`error: ${JSON.stringify(response)}`)
				})
			}
 
    },
    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },
      langConfig() {
      }
    },
    methods: {
      toggle(e) {
        e.preventDefault()
        this.isDropdown = !this.isDropdown
        console.log(`${this.isDropdown}`)
      },
      switchLang(targetLang) {
        if (this.lang === targetLang) return;
        localStorage.setItem('ELEMENT_LANGUAGE', targetLang);
        this.$router.push(this.$route.path.replace(this.lang, targetLang));
      },
      logout (e) {
        e.preventDefault()
				this.logined = false
				window.localStorage.removeItem('token')
				window.location.href = '/'
			}
    },
    mounted() {
      function scroll(fn) {
        window.addEventListener('scroll', () => {
          fn();
        }, false);
      }
      scroll(() => {
        if (this.isHome) {
          if(window.scrollY > 40){
            this.isScrolled = true
          } else {
            this.isScrolled = false
          }
 
          // const threshold = 200;
          // let alpha = Math.min((document.documentElement.scrollTop || document.body.scrollTop), threshold) / threshold;
          // this.$refs.header.style.backgroundColor = `rgba(32, 160, 255, ${ alpha })`;
        }
      });
    }
  };
</script>
<style lang='scss'>
@import "../assets/scss/vr.scss";
</style>
<style lang='scss' scoped>
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
* {
  margin: 0;
  padding: 0;
}
ul {
  -webkit-padding-start: 0px;
}
.large {
  position: relative;
  display: block;
  @include media-breakpoint-down(sm){
        display: none;
  } 
}
.small {
  display: none;
  @include media-breakpoint-down(sm){
    position: relative;
    display: block;
  } 
}
.back-change{
  // background: #fff; 
} 
  .header-wrapper{
    height: 60px;
    position: relative;
  }
  .scrolled {
    display: none;
  }
  .header {
    height: 60px;
    background-color: rgba(32, 160, 255, 1);
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    z-index: 100;
    position: relative;

     h1 {
      margin: 0;
      padding: 0; 
      float: left;
      font-size: 32px;
      font-weight: normal;

      a {
        color: #fff;
        text-decoration: none;
        display: block;
      }

      span {
        font-size: 12px;
        display: inline-block;
        width: 34px;
        height: 18px;
        border: 1px solid rgba(255, 255, 255, .5);
        text-align: center;
        line-height: 18px;
        vertical-align: middle;
        margin-left: 10px;
        border-radius: 3px;
      }
    }
    .nav {
      float: left;
      height: 100%;
      line-height: 60px;
      background: transparent;
      @utils-clearfix;
      padding: 0;
      margin: 0;
    }
    .nav-sm {
      line-height: 60px;
      transition: max-height 0.5s linear;
      max-height: 0;
      overflow: hidden;
      background: #fff;
      @utils-clearfix;
      padding: 0;
      margin: 0;
      width: 100%;
      float: none;
      position: absolute;
      left: 0;
      top: 60px; 
      .nav-item{
        float: none;
        margin-left: 0;
        display: block;
        span {
          color: #404040;
        }
        a {
          display: block;
          width: 100%;
          height: 60px;
          line-height: 60px;
          color: #404040;
        }
      }
    }
    .dropdown{
      max-height: 500px;
    } 
    .nav-right{
      float: right;
      height: 100%;
      line-height: 60px;
      background: transparent;
      @utils-clearfix;
      padding: 0;
      margin: 0;
    }
    .nav-logo,
    .nav-logo-small {
      display: inline-block;
      width: 40px;
      vertical-align: middle;
    }

    .nav-item {
      font-weight: 300;
      font-size: 16px;
      margin: 0;
      float: left;
      list-style: none;
      position: relative;
      cursor: pointer;
      margin-left: 20px;
      &:last-child{
        opacity: .8;
      }
      .span-cur-default {
        cursor: default;
        opacity: .8;
      }

      .nav-lang {
        cursor: pointer;
        display: inline-block;
        height: 100%;
        &:hover {
          opacity: 1;
        }
        &.active {
          font-weight: 700;
          opacity: 1;
        }
      }
   
      a {
        text-decoration: none;
        color: #fff;
        padding: 0 20px;
        opacity: .8;
        &.active,
        &:hover {
          opacity: 1;
        }
         
        &.active {
          font-weight: 700;
        }

        &.active::before {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background:#99d2fc;
        }
      }
    }
    .logo-item{
      margin-left: 0;
    } 
 

  }
  .header-home {
    z-index: 10;
    position: fixed;
    top: 0;
    background-color: rgba(32, 160, 255, 0);
  }

.user-icon{
  width: 26px;
  vertical-align: middle;
}
.hamburg{
  width: 26px;
  display: inline-block;
  vertical-align: middle;
}
.nav-container{
  padding: 0 20px;
}
.img-wrapper{
  height: 60px;
  display: table;
  span {
    display: table-cell;
    vertical-align: middle;
  }
  img {
    float: left;
  }
}
.user-info{
  padding: 0 20px;
}
.title-display{
  margin: 0 auto;
  color: #fff;
  text-align: center;
  
}
.title-link{
  text-decoration: none;
  color: #fff;
}
</style>


