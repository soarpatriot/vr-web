<template>
  <a-sky id="picture-sky" v-bind:src="src"></a-sky>
</template>
<script>
export default {
  name: 'sky',
  components: {
  },

  data () {
    return {
      src: 'http://static.dreamreality.cn/20171/1485830367334.jpg'
    }
  },
  created: function () {
  }
}
</script>

