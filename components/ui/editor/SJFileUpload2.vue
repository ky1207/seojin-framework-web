<template>
  <div>
    <div class="upload-btn" style="display:flex;flex-direction: row">
      <input ref="fileInput" style="display:none;" type="file" multiple @change="onChange">
      <button class="btn-white-bg" style="margin-right: 5px;" @click="onSelect">
        {{ $t('components.ui.00005') }} ({{ inputValue.length }})
      </button>
      <button class="btn-white-bg" @click="onDeleteAll">
        전체삭제
      </button>
    </div>
    <div class="upload-wrap" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop">
      <div id="drop-file" class="drag-file">
        <input ref="fileInput" style="display:none;" type="file" multiple @change="onChange">
        <i class="fa-solid fa-paperclip" /> 여기에 첨부 파일을 끌어오세요 또는
        <label for="file" @click="onSelect">{{ $t('components.ui.00004') }}</label>
      </div>
      <div class="SJFileUpload">
        <div v-for="(file, i) in inputValue" :key="i" class="list-group" style="display:flex;flex-direction: row">
          <div class="filebox" style="display: flex;flex-direction: row">
            <button class="btn-none" @click="onDelete(i)">
              <i class="fa-solid fa-xmark" />
            </button>
            <div class="filebox">
              <input v-model="file.filename" class="upload-name" placeholder="첨부파일" disabled>
            </div>
          </div>
          <div v-if="file.method !== 'delete'" class="d-flex justify-content-start align-items-center">
            <button class="btn-blue" style="margin-right: 20px;" @click="onUploadLarge(file)">
              {{ $t('components.ui.00006') }}
            </button>
            <p class="size m-0" @click="file.fileId !== null ? doDownload(file.fileId) : doDownloadByFile(file.file)">
              {{ file.filesize }} byte
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from '~/api/utils'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      default: ''
    },
    disabledValidation: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onSelect () {
      this.$refs.fileInput.click()
    },
    onChange (e) {
      const files = Array.from(e.target.files)
      files.forEach((file) => {
        const upload = { fileId: null, method: 'insert', file, filename: file.name, filesize: file.size }
        this.inputValue.push(upload)
      })

      this.validate()
    },
    onDelete (i) {
      const file = this.inputValue[i]
      if (file.method === 'insert') {
        this.inputValue.splice(i, 1)
      } else {
        file.method = 'delete'
        this.inputValue = [...this.inputValue]
      }

      this.validate()
    },
    onDeleteAll (i) {
      localStorage.removeItem(i)
      this.inputValue.splice(i)
    },
    doDownload (fileId) {
      this.$emit('fileDownload', fileId)
    },
    onUploadLarge (file) {
    },
    doDownloadByFile (file) {
      Utils.fileDownloadByFile(file)
    },
    onDragOver (event) {
      // 드래그 중인 파일을 요소 위로 올릴 때 호출
      event.preventDefault()
      event.stopPropagation()
    },
    onDragLeave (event) {
      // 드래그 중인 파일이 요소를 벗어날 때 호출
      event.preventDefault()
      event.stopPropagation()
    },
    onDrop (event) {
      // 파일을 요소에 드롭했을 때 호출
      event.preventDefault()
      event.stopPropagation()
      const files = Array.from(event.dataTransfer.files)
      files.forEach((file) => {
        const upload = { fileId: null, method: 'insert', file, filename: file.name, filesize: file.size }
        this.inputValue.push(upload)
      })

      this.validate()
    },
    validate () {
      if (this.$refs.provider) {
        this.$refs.provider.value = this.inputValue
        this.$refs.provider.validate()
      }
    }
  }
}
</script>
<style>
.upload-btn{
  width: 100%;
  display: flex;
  margin-bottom: 5px;
}
.upload-wrap {
  border: 2px dashed #BCC1D0;
  padding: 10px 5px;
}
.upload-wrap .drag-file {
  width: 100%;
  display: flex;
  flex-direction: row !important;
  white-space: initial;
  justify-content: center;
  margin-bottom: 10px;
  color: #BCC1D0;
  font-size: 13px;
}
.upload-wrap .drag-file>i{
  font-size: 20px;
  padding: 0 5px;
}
.upload-wrap .drag-file>label{
  border: none;
  background: none;
  text-decoration: underline;
  text-underline-position:under;
  font-size: 13px; font-weight:normal;
  color: #333;
  cursor: pointer;
}
.upload-wrap .list-group{
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.SJFileUpload{
display: flex;
flex-direction: column;
width: 100%;
}
.filebox{
  display: flex;
  width: 100%;
}
.filebox .upload-name {
  width: 100%;
  border: none;
  height: 30px;
  padding: 0 5px;
  color: #999999;
  margin-right: 20px;
  background: none;
}
.SJFileUpload{
  padding: 0 10px;
}
.SJFileUpload .size{
  width: 75px;
  display: flex;
  justify-content: flex-end;
}
.filebox input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
</style>
