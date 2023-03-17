<template>
  <div>
    <div ref="uploadDiv" class="col-sm-10">
      <input style="display:none;" type="file" multiple @change="onChange">
      <button type="button" class="btn btn-primary" @click="OnSelect">
        첨부파일
      </button>
    </div>
    <ul v-for="(file,i) in inputValue" :key="file.fileId" class="list-group">
      <li v-if="file.method !== 'delete'" class="list-group-item">
        {{ file.fileName }} ( {{ file.fileSize }} byte)
        <span class="badge bg-secondary" @click="onDelete(i)">삭제</span>
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
      for (let i = 0; i < files.length; i++) {
        const upload = { fileId: null, method: 'insert', file: files[i], fileName: files[i].name, fileSize: files[i].size }
        this.inputValue.push(upload)
      }
      input[0].value = null
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
    }
  }
}
</script>
<style>
input[type='file']::before {
  content: "";
}
</style>
