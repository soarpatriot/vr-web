<template>
  <div >
    <md-toolbar class="md-warn">
      <md-button class="md-icon-button">
        <icon name="material-menu" class="md-48"></icon>
      </md-button>
      <md-button>浏览</md-button>
      <h2 class="md-title" style="flex: 1">Vue Material</h2>

      <md-button>Add</md-button>
      <md-button>Remove</md-button>
    </md-toolbar>
  </div>
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
  .el-menu-demo{
    padding-left: 55px;
  }
</style>

