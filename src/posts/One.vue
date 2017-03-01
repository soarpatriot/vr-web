<template>
  <div id="main">
    <div class="container">
      <model></model>
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
  name: 'one',
  components: {
    Model
  },
  data () {
    return {
      pictureUrl: ''
    }
  },
  methods: {
    onPagination () {
    }
  }
}
</script>

<style lang="scss" scoped>
.stage{
  margin-top: 50px;
  width: 400px;
  height: 300px;  
}
</style>
