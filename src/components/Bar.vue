<template>
  <div class="img-show">
    <p class="file-tip">
       {{file.name}}, {{file.size}}M, 类型：{{file.type}}
    </p>
    <p class="progress">
      <progress class="prgoress-bar" min="0" max="100" v-bind:value="file.progress">{{file.progress}}</progress>
      {{file.progress}}%
    </p>
    <p class="md-body-2">
      {{file.msg}}
    </p>
  </div>
</template>
<script>
export default {
  name: 'bar',
  props: ['file', 'index'],
  data () {
    return {
    }
  }
}
</script>


