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
      src: '/static/images/street.jpg'
    }
  },
  created: function () {
  }
}
</script>

