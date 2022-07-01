<template>
    <div class="json_editor">
        <button class="btn btn-outline-primary" @click="download">
            下载 JSON 文件
        </button>
        <div ref="jsonEditor" class="jsonEditor nya-top"></div>
    </div>
</template>

<script>
import 'jsoneditor/dist/jsoneditor.min.css';
import createFile from '~/utils/createFile.js';
let JSONEditor;
if (process.browser) {
    JSONEditor = require('jsoneditor');
}
export default {
    name: 'JsonEditor',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            JSONEditor: null
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.JSONEditor = new JSONEditor(
                this.$refs.jsonEditor,
                {
                    mode: 'code',
                    modes: ['text', 'code', 'tree', 'form', 'view']
                },
                {
                    Array: [1, 2, 3],
                    Boolean: true,
                    Null: null,
                    Number: 123,
                    Object: { a: 'b', c: 'd' },
                    String: 'Hello World'
                }
            );
        },
        download() {
            createFile(this.JSONEditor.getText(), 'main.json');
        }
    }
};
</script>

<style lang="scss">
.json_editor {
    .jsonEditor {
        height: 700px;
    }
    .nya-top {
        margin-top: 15px;
    }
}
</style>
