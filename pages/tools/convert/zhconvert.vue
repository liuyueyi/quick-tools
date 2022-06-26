<template>
    <div class="text_word_count">
        <nya-container title="简繁转换">
            <div class="radio-group">
                <nya-radio-group v-model="index">
                    <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                </nya-radio-group>
                <small v-if="index ===0">
                    请在 <b>左边简体</b> 输入框输入待转换文本
                </small>
                <small v-else>
                    请在 <b>右边繁体</b> 输入框输入待转换文本
                </small>
                <button type="button" class="btn btn-outline-info btn-sm" style="margin-top: 1em; margin-bottom: 1em;" @click="reset">
                    清空
                </button>
            </div>

            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <nya-input
                        v-model="simple"
                        className="mb-15"
                        fullwidth
                        rows="10"
                        type="textarea"
                        autofocus
                        autocomplete="off"
                        label="简体"
                        placeholder="孙悟空"
                    />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <nya-input
                        v-model="traditional"
                        className="mb-15"
                        fullwidth
                        rows="10"
                        type="textarea"
                        autocomplete="off"
                        label="繁体"
                        placeholder="孫悟空"
                    />
                </div>
            </div>
        </nya-container>

        <nya-foot-info title="Tips">
            <li>
                适用于java/android的简繁转换库: <a href="https://github.com/liuyueyi/quick-chinese-transfer" target="_blank">quick-chinese-transfer</a>
            </li>
            <li>
                适用于js的简繁转换库: <a href="https://github.com/foru17/chinese-s2t" target="_blank">chinese-s2t</a>
            </li>
            <li>
                百度简繁转换: <a href="https://fanyi.baidu.com/#zh/cht/%E7%B9%81%E4%BD%93" target="_blank"> 点击直达 </a>
            </li>
            <li>
                谷歌简繁转换: <a href="https://translate.google.com/?sl=zh-CN&tl=en&op=translate" target="_blank"> 点击直达 </a>
            </li>
        </nya-foot-info>
    </div>
</template>

<script>
import chinese from 'chinese-s2t';

export default {
    name: 'ZhConvert',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            simple: '',
            traditional: '',
            index: 0,
            labels: [
                {label: '简转繁'},
                {label: '繁转简'},
            ]
        };
    },
    computed: {},
    watch: {
        index() {
            this.transfer();
        },
        simple() {
            this.transfer();
        },
        traditional() {
            this.transfer();
        }
    },
    methods: {
        transfer() {
            if (this.index === 0) {
                this.traditional = chinese.s2t(this.simple);
            } else {
                this.simple = chinese.t2s(this.traditional);
            }
        },
        reset() {
            this.simple = '';
            this.traditional = '';
        }
    }
};
</script>
