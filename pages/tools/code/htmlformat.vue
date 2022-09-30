<template>
    <div class="html-format">
        <nya-container title="Html格式化">
            <div class="radio-group">
                <nya-radio-group v-model="index">
                    <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                </nya-radio-group>
            </div>

            <nya-input v-model="content"
                       class="top-margin-1em"
                       fullwidth
                       rows="5"
                       type="textarea"
                       autofocus
                       :label="labels[index].desc"
            />
        </nya-container>

        <nya-container v-if="results" title="格式化输出">
            <nya-copy :copy="results">
                <pre>{{ results }}</pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
            <li> 底层使用 <a href="https://github.com/beautify-web/js-beautify">js-beautify</a> 实现格式化</li>
        </nya-foot-info>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';
import beautify_js from 'js-beautify';

export default {
    name: 'htmlFormat',
    components: {
        Dynamic
    },
    data() {
        return {
            content: '',
            results: '',
            index: 0,
            labels: [
                {label: 'html', desc: "请在输入框内粘贴 HTML 内容"},
                {label: 'js', desc: "请在输入框内粘贴 JavaScript 内容"},
                {label: 'css', desc: "请在输入框内粘贴 CSS 内容"},
            ]
        };
    },
    watch: {
        content() {
            this.format_html();
        },
        index() {
            this.format_html();
        }
    },
    methods: {
        format_html() {
            if (!this.content) {
                return
            }

            // html 格式化
            let js = beautify_js.html;
            if (this.index === 0) js = beautify_js.html;
            else if (this.index === 1) js = beautify_js.js;
            else js = beautify_js.css;
            this.results = js(this.content, {indent_size: 2, space_in_empty_paren: true})
        }
    }
}
</script>

<style lang="scss">
.html-format {
    pre {
        font-family: sans-serif;
    }
}

</style>
