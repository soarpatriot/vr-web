<template>
  <div class="container">
   <h1>上传我的VR</h1>
   <form novalidate @submit.stop.prevent="submit">
		<md-input-container>
			<label>标题</label>
			<md-input></md-input>
		</md-input-container>

		<md-input-container>
			<label>描述</label>
			<md-textarea></md-textarea>
		</md-input-container>
		<md-input-container>
      <span class="up-span md-raised md-primary"> 
         选择文件 
			  <input class="up-btn" type="file"></input>
      <span>
		</md-input-container>


    </form> 
  </div>
</template>

<script>
export default {
  name: 'foo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
.up-span{
  position: relative;
  overflow: hidden;
  background-color:#5cb85c;
  width: 100px; 
  display: block;
  line-height: 1.42857143;
  cursor: pointer;
  vertical-align: middle;
  white-space: nowrap;
  color: #fff;
  padding:6px 12px;
  marign: 0;
}
.md-input-container .up-btn{
  position: absolute;
  top:0;
  right: 0;
  margin: 0;
  opacity: 0;
  -ms-filter: 'alpha(opacity=0)';
  font-size: 200px;
  direction: ltr;
  cursor: pointer;
}
</style>

