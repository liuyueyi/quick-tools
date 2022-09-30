<template>
    <div class="textdiff">
        <nya-container title="文本替换">
            <div class="form-inline">
                <nya-checkbox v-model="regex" label="支持正则替换"/>
                <nya-checkbox v-model="perLine" style="padding-left: 1em" label="逐行替换"/>
                <button class="btn btn-outline-primary btn-sm" style="margin-left: 1em" @click="reverse">翻转</button>
            </div>
            <div class="row top-margin-1em">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <div class="form-group">
                        <div class="radio-group">
                            <nya-radio-group v-model="sourceIndex">
                                <nya-radio v-for="(label, i) in sourceLabels" class="mr-15" :value="i" :key="i"
                                           :label="label.label"/>
                            </nya-radio-group>
                        </div>
                        <input class="form-control" style="width: 80%" type="text" autocomplete="false" v-model="oldInput" placeholder="输入需要替换的字符"/>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <div class="form-group">
                        <div class="radio-group">
                            <nya-radio-group v-model="targetIndex">
                                <nya-radio v-for="(label, i) in targetLabels" class="mr-15" :value="i" :key="i"
                                           :label="label.label"/>
                            </nya-radio-group>
                        </div>
                       <input class="form-control" style="width: 80%" type="text" autocomplete="false" v-model="newInput" placeholder="输入替换后的字符"/>
                    </div>
                </div>

                <div class="col-12 col-xl-12 col-sm-12 col-md-12">
                    <div class="row" style="padding-right: 12px; padding-top: 1em;">
                        <nya-input
                            v-model="oldString"
                            class="mb-15"
                            fullwidth
                            rows="5"
                            type="textarea"
                            autofocus
                            autocomplete="off"
                            label="待转化文本"
                            placeholder="1
2
3"
                        />
                    </div>

                </div>
            </div>
        </nya-container>

        <nya-container v-if="newString" title="替换结果">
            <nya-copy :copy="newString">
                <pre>{{newString}}</pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
            <li>
                使用：<a
                href="https://github.com/liuyueyi/quick-jsdemo"
                target="_blank"
                rel="noopener noreferrer"
            >quick-jsdemo</a> js文本替换
            </li>
        </nya-foot-info>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';

let oo, os;
export default {
    name: 'TextReplace',
    components: {
        Dynamic
    },
    data() {
        return {
            oldInput: '',
            oldString: '',
            newInput: '',
            newString: '',
            results: '',
            sourceIndex: 2,
            regex: true,
            perLine: false,
            sourceLabels: [
                {label: "逗号(,)", val: ','},
                {label: "TAB(\\t)", val: '\t'},
                {label: "换行(\\n)", val: '\n'},
                {label: "双引号(\")", val: '"'},
                {label: "单引号(')", val: '\''},
                {label: "分割符(|)", val: '|'},
                {label: "空格", val: ' '},
                {label: "空白字符", val: '\s'},
            ],
            targetIndex: 0,
            targetLabels: [
                {label: "逗号(,)", val: ','},
                {label: "TAB(\\t)", val: '\t'},
                {label: "换行(\\n)", val: '\n'},
                {label: "双引号(\")", val: '"'},
                {label: "单引号(')", val: '\''},
                {label: "分割符(|)", val: '|'},
                {label: "空格", val: ' '},
                {label: "空字符", val: ''},
            ]
        };
    },
    watch: {
        regex() {
            this.parse();
        },
        oldInput() {
            this.parse();
        },
        oldString() {
            if (this.oldString.trim() === oo) {
                return;
            }

            oo = this.oldString.trim();
            this.parse();
        },
        newInput() {
            this.parse();
        },
        newString() {
            if (this.newString.trim() === os) {
                return;
            }
            os = this.newString.trim();
            this.parse();
        },
        sourceIndex() {
            this.parse();
        },
        targetIndex() {
            this.parse();
        }
    },
    methods: {
        reverse() {
            let o = this.oldString;
            let n = this.newString;
            let sI = this.sourceIndex;
            let tI = this.targetIndex;
            let oI = this.oldInput;
            let nI = this.newInput;

            this.sourceIndex = tI;
            this.targetIndex = sI;
            this.oldInput = nI;
            this.newInput = oI;
            this.oldString = n;
            this.newString = o;
        },
        escapeParse(tag) {
            tag = tag.replaceAll("\\''", "\'");
            tag = tag.replaceAll('\\""', '\"');
            tag = tag.replaceAll("\\&", "\&"); // 和号
            tag = tag.replaceAll("\\n", "\n"); // 换行
            tag = tag.replaceAll("\\r", "\r"); // 回车符
            tag = tag.replaceAll("\\t", "\t"); // 制表符
            tag = tag.replaceAll("\\b", "\b"); // 退格符
            tag = tag.replaceAll("\\f", "\f"); // 换页
            return tag;
        },
        parse() {
            let regexEnable = true;
            let sourceTag = this.sourceLabels[this.sourceIndex].val;
            let targetTag = this.targetLabels[this.targetIndex].val;
            if (this.oldInput.length > 0) {
                sourceTag = this.oldInput;
                regexEnable = this.regex;
                if (this.regex) {
                    sourceTag = this.escapeParse(sourceTag);
                }
            }
            if (this.newInput.length > 0) {
                targetTag = this.newInput;
                regexEnable = this.regex;
                if (this.regex) {
                    targetTag = this.escapeParse(targetTag);
                }
            }
            try {
                if (this.perLine) {
                    // 逐行替换
                    let lines = this.oldString.split("\n");
                    let out = [];
                    lines.forEach(line => {
                        if (regexEnable) {
                            const reg = new RegExp(sourceTag, "g");
                            out.push(line.replaceAll(reg, targetTag));
                        } else {
                            out.push(line.replaceAll(sourceTag, targetTag));
                        }
                    })
                    this.newString = out.join("\n");
                } else {
                    if (regexEnable) {
                        // 左边的转右边
                        const reg = new RegExp(sourceTag, "g");
                        this.newString = this.oldString.replaceAll(reg, targetTag);
                    } else {
                        this.newString = this.oldString.replaceAll(sourceTag, targetTag);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
};
</script>

<style>

</style>
