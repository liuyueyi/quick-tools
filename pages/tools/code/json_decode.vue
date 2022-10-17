<template>
    <div class="json_decode">
        <nya-container title="JSON解码">
            <label>更强到json编辑器，移步 <a href="/tools/editor/json" target="_blank">/tools/editor/json</a> </label><br/>

            <nya-checkbox v-model="expandJson" label="展开json格式字符串"/>

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
            <li> 底层使用 <a href="https://github.com/liuyueyi/quick-jsdemo/blob/master/views/util/json_expand/readme.md">jsonExpand</a> 实现解析</li>
        </nya-foot-info>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';
import {expandJsonStr2Str} from "/static/js/jsonExpand";

export default {
    name: 'jsonDecode',
    components: {
        Dynamic
    },
    data() {
        return {
            content: '{"ary":["aaa","bbb"],"aryStr":"[\\"{\\\\\\"a\\\\\\":123,\\\\\\"c\\\\\\":\\\\\\"ddd\\\\\\"}\\",\\"{\\\\\\"1\\\\\\":1,\\\\\\"c\\\\\\":\\\\\\"dd\\\\\\",\\\\\\"d\\\\\\":[1,2,3]}\\"]","key":"value","nums":[1,2,3,4]}',
            results: '',
            index: 1,
            expandJson: true,
            labels: [
                {label: '压缩', desc: "输出紧凑压缩的json字符串"},
                {label: '美化', desc: "输出自动缩进，更适合阅读的json字符串"},
            ]
        };
    },
    watch: {
        content() {
            this.format_json();
        },
        index() {
            this.format_json();
        }
    },
    methods: {
        format_json() {
            if (!this.content) {
                return
            }
            this.results = expandJsonStr2Str(this.content, this.expandJson, this.index === 0 ? 0 : 2)
        }
    }
}
</script>

<style lang="scss">
.json_decode {
    pre {
        font-family: sans-serif;
    }
}

</style>

