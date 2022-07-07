<template>
    <div class="markdown-format">
        <nya-container title="markdown表格格式化">
            <nya-input v-model="content"
                       class="top-margin-1em"
                       fullwidth
                       rows="5"
                       type="textarea"
                       autofocus
                       label="请输入markdown语法表格"
            />
        </nya-container>

        <nya-container v-if="results" title="格式化输出">
            <nya-copy :copy="results">
                <pre>{{ results }}</pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
            <li> 让markdown的表格代码更好看</li>
        </nya-foot-info>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';
import {MarkdownTableFormatter} from "/static/js/mdFormat";

export default {
    name: 'sitemap',
    components: {
        Dynamic
    },
    data() {
        return {
            content: '',
            results: '',
        };
    },
    watch: {
        content() {
            this.format_table();
        }
    },
    methods: {
        format_table() {
            if (this.content) {
                let ans = "";
                try {
                    let mtf = new MarkdownTableFormatter();
                    mtf.format_table(this.content)
                    ans = mtf.output_table;
                } catch (e) {
                }
                if (ans) {
                    this.results = ans;
                } else {
                    this.results = "";
                }
            }
        }
    }
}
</script>

<style lang="scss">
.markdown-format {
    pre {
        font-family: sans-serif;
    }

}

</style>
