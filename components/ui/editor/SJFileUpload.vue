<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors,classes }"
    :rules="rules"
    :name="name"
    tag="div"
    :disabled="disabledValidation"
  >
    <div
      :class="disabledValidation?'':classes"
      :aria-describedby="id+'-feedback'"
    >
      <div ref="uploadDiv" class="col-sm-10">
        <input style="display:none;" type="file" multiple @change="onChange">
        <button type="button" class="btn-blue-bg" @click="OnSelect">
          {{ $t('components.ui.00005') }} ( {{ inputValue.length }} )
        </button>
      </div>
      <div class="SJFileUpload">
        <ul v-for="(file,i) in inputValue" :key="file.fileId" class="list-group">
          <li v-if="file.method !== 'delete'" class="list-group-item SJFileUpload_item">
            <div style="cursor : pointer; margin-right: 2px;" @click="file.fileId !== null ? doDownload(file.fileId) : doDownloadByFile(file.file)">
              {{ file.filename }} ( {{ file.filesize }} byte)
            </div>
            <button class="btn-gray-bg" @click="onDelete(i)">
              {{ $t('components.ui.00003') }}
            </button>
          </li>
        </ul>
        <span :id="id+'-feedback'" class="invalid-feedback">
          {{ errors[0] }}
        </span>
      </div>
    </div>
  </ValidationProvider>
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
  data () {
    return {
      index: 0
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
    OnSelect () {
      this.$refs.uploadDiv.childNodes[0].click()
    },
    onChange (e) {
      const input = this.$refs.uploadDiv.childNodes
      const oldInput = input[0].cloneNode(true)
      oldInput.style.display = 'none'
      oldInput.name = this.name + this.index++
      this.$refs.uploadDiv.appendChild(oldInput)

      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        const upload = { fileId: null, method: 'insert', file: files[i], filename: files[i].name, filesize: files[i].size }
        this.inputValue.push(upload)
      }
      input[0].value = null

      this.validate()
    },
    onDelete (index) {
      const file = this.inputValue[index]
      if (file.method === 'insert') {
        this.inputValue.splice(index, 1)
        // file.link.remove()
      } else {
        file.method = 'delete'
        this.inputValue = [...this.inputValue]
      }
    },
    doDownload (fileId) {
      this.$emit('fileDownload', fileId)
    },
    doDownloadByFile (file) {
      Utils.fileDownloadByFile(file)
    },
    validate () {
      this.$refs.provider.value = this.inputValue
      this.$refs.provider.validate()
    }
  }
}
</script>
<style>
 .SJFileUpload {
   height: 100px;
   overflow-y: auto;
 }
 .SJFileUpload_item {
   display: flex;
 }
</style>
