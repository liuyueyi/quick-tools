<template>
    <div class="remove_duplicate">
        <nya-container title="文本去重">
            <div class="nya-subtitle mt-15">
                选择
            </div>
            <div class="radio-group">
                <nya-radio-group v-model="index">
                    <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                </nya-radio-group>
            </div>
            <nya-input label="自定义分隔符"
                       subtitle="subtitle"
                       v-model.trim="splitChar"
                       type="text"
                       autocomplete="on"
                       autofocus
                       v-show="index === 2"
                       placeholder=""
            />
            <br/>


            <nya-input v-model.trim="content" fullwidth rows="8" type="textarea" autofocus autocomplete="off"
                       label="待处理的内容" :placeholder="'aaa\naaa'"/>
        </nya-container>
        <nya-container v-if="result" title="处理结果">
            <nya-copy :copy="result">
                <div v-text="result"></div>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
        </nya-foot-info>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'RemoveDuplicate',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            content: '',
            index: 1,
            splitChar: '',
            labels: [
                {label: "换行去重"},
                {label: "全局去重"},
                {label: "指定分隔符去重"},
            ]
        };
    },
    watch: {
        index() {
            this.splitChar = '';
        }
    },
    computed: {
        result() {
            if (this.index === 0) {
                return _.chain(this.content.split('\n'))
                    .uniq()
                    .join('\n')
                    .value();
            } else if (this.index === 1) {
                let ans = ''
                for (let i = 0; i < this.content.length; i++) {
                    if (ans.indexOf(this.content[i]) < 0) {
                        ans += this.content[i];
                    }
                }
                return ans;
            } else {
                if (!this.splitChar) {
                    // 未输入分隔符时直接返回
                    return this.content;
                }
                return _.chain(this.content.split(this.splitChar))
                    .uniq()
                    .join(this.splitChar)
                    .value();
            }
        }
    }
};
</script>
