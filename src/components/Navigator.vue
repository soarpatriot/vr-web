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
              <template v-if="!logined">
                <li class="nav-item">
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
                </li>
              </template>
              <template v-else="!login">
                <li class="nav-item"> 
									<div class="nav-dropdown" @click="handleDropdown" 
										:class="{'is-active': dropdownVisible}">
										<span>
											<img :src="user.avatar_url" class="user-icon">
											{{user.name}}
											<i class="el-icon-arrow-down el-icon--right"></i>
										</span>
										<ul class="dropdown-menu">
											<li>
                        <router-link class="drop-link"
                          :to="`/profile`">我的信息
                        </router-link>
											</li>
                      <li>
												<a href="#" class="drop-link" @click="logout">
													退出
												</a>
											</li>
										</ul>
									</div>
                </li>
              </template>
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
                  <img :src="user.avatar_url" class="user-icon">
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
        dropdownVisible: false,
        user: {
          name: '',
          email: '',
          avatar_url: ''
        },
        logined: false,
        isDropdown: false,
        active: '',
        isScrolled: false,
        isHome: false,
        headerStyle: {},
        imageUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk3NDQ3Mjk4Njk2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODMwLjAzMiA2ODEuMDA4Yy05Ljc3Ni05Ljc5Mi0yNS42LTkuNzkyLTM1LjM0NCAwLTkuNzQ0IDkuNzI4LTkuNzQ0IDI1LjYgMC4wMzIgMzUuMzI4IDc1LjUwNCA3NS41MzYgMTE3LjA1NiAxNzUuOTA0IDExNy4wNTYgMjgyLjY4OCAwIDEzLjgwOCAxMS4xODQgMjQuOTkyIDI1LjAwOCAyNC45OTJzMjQuOTc2LTExLjE2OCAyNC45NzYtMjQuOTkyQzk2MS43NDQgODc4Ljg5NiA5MTQuOTc2IDc2NS45MzYgODMwLjAzMiA2ODEuMDA4ek01MTIuMDE2IDBjLTE2NS4zNDQgMC0yOTkuODQgMTM0LjQ5Ni0yOTkuODQgMjk5LjgyNCAwIDExOC4wNDggNjguNzM2IDIyMC4wOCAxNjguMTQ0IDI2OC45Ni02OS42NDggMjEuMjE2LTEzMy40MjQgNTkuMzEyLTE4Ni4zMzYgMTEyLjIyNC04NC45NDQgODQuOTQ0LTEzMS43MTIgMTk3Ljg4OC0xMzEuNzEyIDMxOC4wMTZDNjIuMjcyIDEwMTIuODMyIDczLjQ1NiAxMDI0IDg3LjI0OCAxMDI0YzEzLjgwOCAwIDI1LjAwOC0xMS4xNjggMjUuMDA4LTI0Ljk5MiAwLTEwNi43ODQgNDEuNTY4LTIwNy4xNTIgMTE3LjA4OC0yODIuNjg4IDc0LjE0NC03NC4xOTIgMTcyLjM2OC0xMTUuNTA0IDI3Ny4wNTYtMTE2Ljk2IDEuODg4IDAuMDMyIDMuNzI4IDAuMjg4IDUuNjMyIDAuMjg4IDE2NS4zMjggMCAyOTkuODI0LTEzNC41MTIgMjk5LjgyNC0yOTkuODRDODExLjg0IDEzNC40OCA2NzcuMzQ0IDAgNTEyLjAxNiAwek01MTQuNjcyIDU0OS41MzZjLTAuODk2LTAuMDk2LTEuNzc2LTAuMjcyLTIuNjg4LTAuMjcyLTEuNzkyIDAtMy41ODQgMC4xMTItNS4zNiAwLjEyOC0xMzUuMjQ4LTIuOTEyLTI0NC40NDgtMTEzLjYzMi0yNDQuNDQ4LTI0OS41NjggMC0xMzcuNzYgMTEyLjA5Ni0yNDkuODU2IDI0OS44NTYtMjQ5Ljg1NnMyNDkuODg4IDExMi4wOTYgMjQ5Ljg4OCAyNDkuODU2Qzc2MS45MDQgNDM2LjY4OCA2NTEuMjE2IDU0OC4wOTYgNTE0LjY3MiA1NDkuNTM2eiIgcC1pZD0iMTE3MSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg=='
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
				this.$http.get(USER_URL, { headers: {
					'api-token': tokenStr
				} }).then((response) => {
					this.user = response.body
          this.user.avatar_url  = this.user.avatar_url || this.imageUrl
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
				// window.location.href = '/'
			},
      handleDropdownToggle() {
        this.dropdownVisible = !this.dropdownVisible
      },
      handleDropdown() {
        this.dropdownVisible = !this.dropdownVisible
      }
    },
    mounted() {
      const that = this
      // add this for small ui dropdown display none
      window.onresize = () => {
        return (() => {
          that.isDropdown = false 
        })()
      } 
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
		font-weight: 400;
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
				font-weight: 400;
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
				font-weight: 400;
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
  border: 1px solid rgba(12, 25, 38, .1);
  // box-shadow: -2px -2px 1px 1px rgb(213,213,213) inset;
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
.nav-dropdown {
  position: relative;
	margin-bottom: 6px;
	padding-left: 18px;
  cursor: default;
	width: 100%;
  list-style: none;
	span {
		display: block;
		width: 100%;
		font-size: 16px;
		color: #fff;
    opacity: 0.8;
		line-height: 60px;
		transition: .2s;
		padding-bottom: 6px;
		user-select: none;
		&:hover {
			 cursor: pointer;
		}
	}
	i {
		transition: .2s;
		font-size: 12px;
		// color: #979797;
		transform: translateY(-2px);
	}
	&:hover {
		span, i {
      opacity: 1;
		}
	}
  .dropdown-menu{
    .drop-link{
		  color: #2d2f33; 
    }
  }
}
.is-active {
	span, i {
    opactiy: 1;
		// color: #409EFF;
	}
	i {
		transform: rotateZ(180deg) translateY(3px);
	}
  .dropdown-menu{
    max-height: 500px;
    transition: max-height 0.5s ease-in;
    border: 1px solid #D8DCE5;
  }
}

.dropdown-menu{
  font-size: 14px;
  line-height: 40px;
  position: absolute;
  max-height: 0;
  list-style: none;
  color: #2d2f33; 
  overflow: hidden;
  top: 60px;
  left: 0;
  border: 0;
  width: 130px;
	.drop-link{
		color: #2d2f33; 
	}
  li{
    position: relative;
    background-color: #fff;
    text-align: center;
    &:hover {
      background-color: #EDF2FC;
		  color: #409EFF;
		}
	}

}
.dropdown-menu:after{  
    content: " ";  
    clear: both;  
    display: block;  
    visibility: hidden;  
    height: 0;  
}  
</style>


