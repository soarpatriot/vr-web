export {toBlob, fromData, upload}
function toBlob (data) {
  data = data.split(',')[1]
  const dataBlob = window.atob(data)
  var ia = new Uint8Array(dataBlob.length)
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }

  // canvas.toDataURL 返回的默认格式就是 image/png
  const blob = new window.Blob([ia], {type: 'image/png'})
  return blob
}
function fromData (blobFile, filename) {
  let formData = new window.FormData()
  formData.append('file', blobFile, filename)
  return formData
}
function upload (file) {
  var that = this
  if (window.FormData) {
    var formData = new window.FormData()
    formData.append('upload', file)
  }
  var xhr = new window.XMLHttpRequest()
  xhr.open('POST', this.url)
  xhr.onload = function () {
    if (xhr.status === 200) {
      that.msg = '上传成功！'
      window.localStorage.setItem('files', xhr.responseText)
      console.log(`上传成功: ${xhr.responseText}`)
    } else {
      that.msg = '上传出错，请重试！'
      console.log('出错了')
    }
  }
  xhr.onerror = function () {
    that.msg = '服务没有响应！'
    console.log('远程服务器错误')
  }
  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      var complete = (event.loaded / event.total * 100 | 0)
      console.log(complete)
      that.progress = complete
    }
  }
  xhr.send(formData)
}
