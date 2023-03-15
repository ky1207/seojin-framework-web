<template>
  <div>
    <div ref="uploadDiv" class="col-sm-10">
      <input style="display:none;" type="file" multiple @change="onChange">
      <button type="button" class="btn btn-primary" @click="OnSelect">
        첨부파일
      </button>
    </div>
    <ul v-for="(file,i) in value" :key="file.id" class="list-group">
      <li v-if="file.method !== 'delete'" class="list-group-item">
        {{ file.filename }} ( {{ file.filesize }} byte)
        <span class="badge bg-secondary" @click="onDelete(i)">삭제</span>
        <input type="hidden" :name="name? name+'['+i+']'+'.id': 'id'" :value="file.id">
        <input type="hidden" :name="name? name+'['+i+']'+'.filename': 'filename'" :value="file.filename">
        <input type="hidden" :name="name? name+'['+i+']'+'.filepath': 'path'" :value="file.path">
        <input type="hidden" :name="name? name+'['+i+']'+'.method' : 'method'" :value="file.method">
        <input type="hidden" :name="name? name+'['+i+']'+'.filesize' : 'filesize'" :value="file.filesize">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      default: () => []
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
      console.log(files)
      for (let i = 0; i < files.length; i++) {
        const upload = { id: null, method: 'insert', file: files[i], filename: files[i].name, filesize: files[i].size }
        this.inputValue.push(upload)
      }
      input[0].value = null
    },
    onDelete (index) {
      const file = this.value[index]
      if (file.method === 'insert') {
        this.inputValue.splice(index, 1)
        // file.link.remove()
      } else {
        file.method = 'delete'
      }
    }
  }
}
</script>
<style>
input[type='file']::before {
  content: "";
}
</style>
