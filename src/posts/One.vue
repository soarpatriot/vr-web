<template>
  <div id="main">
    <navbar></navbar>
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
    <vfooter></vfooter>
  </div>
</template>
<script>
import Vfooter from '../components/Vfooter'
import Navbar from '../components/Navbar'
import Model from '../components/Model'
export default {
  name: 'one',
  components: {
    Navbar,
    Model,
    Vfooter
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
