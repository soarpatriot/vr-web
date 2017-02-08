<template>
  <div id="main">
    <navbar></navbar>
    <div class="container">
      <model></model>
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
