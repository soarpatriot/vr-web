<template>
    <md-toolbar class="md-warn my-navbar">
      <md-button class="md-icon-button">
        <icon name="material-menu" class="md-48"></icon>
      </md-button>
      <md-button>浏览</md-button>
    </md-toolbar>
</template>
<script>
import Icon from 'vue-icons'
export default {
  name: 'navbar',
  components: {
    Icon
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style>
.my-navbar{
  color: #fff;
  background: rgba(0,0,0,.9);
  box-shadow: 0 1px 5px rgba(0,0,0,.15)
}

 
</style>

