<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ errors,classes }"
    :rules="rules"
    :name="name"
    tag="div"
    :disabled="disabledValidation"
    mode="lazy"
  >
    <ckeditor
      ref="ckeditor"
      v-model="innerValue"
      :editor="editor"
      :aria-describedby="id+'-feedback'"
      :class="disabledValidation?'':classes"
      :config="editorConfig"
    />
    <span :id="id+'-feedback'" class="invalid-feedback">
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
// less Heading + Essentials plugin can't input the text
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert'
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting'
import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles'
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    disabledValidation: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      immediate: false,
      // mounted: false,
      editor: ClassicEditor,
      editorConfig: {
        resize_enabled: false,
        plugins: [
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Heading,
          Essentials,
          ImageUpload,
          ImageInsert,
          AutoImage,
          Image,
          ImageResizeEditing,
          ImageResizeHandles,
          Base64UploadAdapter,
          SourceEditing
        ],

        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'imageInsert',
            'sourceEditing'
          ]
        }
      }
    }
  },
  computed: {
    innerValue: {
      get () {
        if (this.value === null || this.value === undefined) {
          return ''
        }
        return this.$options.filters.unescapeHTML(this.value)
      },
      set (_val) {
        this.$emit('input', _val)
      }
    }
  }
}

</script>
<style>
.ck-editor__editable {
  height: 300px;
}
.ck-source-editing-area {
  height: 300px;
}
.ck-source-editing-area textarea {
  overflow-y: auto;
}
</style>
