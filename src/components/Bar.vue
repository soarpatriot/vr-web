<template>
  <div class="img-show">
    <p class="file-tip">
      文件名： {{file.name}}  <br/> 大小： {{file.size}}M, <br/>类型：{{file.type}}
    </p>
    <p class="md-body-2">
      {{file.msg}}
    </p>
    <p class="progress">
      <progress class="prgoress-bar" min="0" max="100" v-bind:value="file.progress">{{file.progress}}</progress>
      {{file.progress}}%
    </p>
    <p><md-button class="md-accent" @click.native="openDialog('dialog5')">删除</md-button></p>
    <md-dialog-confirm
      :md-title="confirm.title"
      :md-content-html="confirm.contentHtml"
      :md-ok-text="confirm.ok"
      :md-cancel-text="confirm.cancel"
      @open="onOpen"
      @close="onClose"
      ref="dialog5">
    </md-dialog-confirm> 
  </div>
</template>
<script>
export default {
  name: 'bar',
  props: ['file', 'index'],
  data () {
    return {
      confirm: {
        title: '确定要删除此文件？',
        contentHtml: '注意：删除的文件将不可恢复！',
        ok: '确定',
        cancel: '取消'
      }
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    onOpen () {
      console.log('Opened')
    },
    onClose (type) {
      let token = window.localStorage.getItem('token')
      let tokenStr = `Token: ${token}`
      const REG_URL = 'http://localhost:3000/files/aa'
      const FILE_DB_URL = `http://localhost:4000/files/${this.file.id}`
      console.log(`success: ${this.file.relative}`)
      const FILE_URL = `${REG_URL}?relative=${this.file.relative}`
      this.$http.delete(FILE_URL, {body: {file: 'assdb'}}).then((response) => {
        console.log(`success: ${JSON.stringify(response)}`)
      }, (response) => {
        console.log(`delete db fail: ${JSON.stringify(response)}`)
      })
      this.$http.delete(FILE_DB_URL, { headers: {'api-token': tokenStr} }).then((response) => {
        console.log(`delete db success: ${JSON.stringify(response)}`)
      }, (response) => {
        console.log(`delete db fail: ${JSON.stringify(response)}`)
      })
      this.$emit('remove', this.index)
      console.log('Closed', type)
    }
  }
}
</script>


