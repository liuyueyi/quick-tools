<template>
    <div class="textdiff">
        <nya-container title="文本替换">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <div class="radio-group">
                        <nya-radio-group v-model="sourceIndex">
                            <nya-radio v-for="(label, i) in sourceLabels" class="mr-15" :value="i" :key="i"
                                       :label="label.label"/>
                        </nya-radio-group>
                        <nya-input v-model="oldInput"
                                   autofocus
                                   autocomplete="off"
                                   placeholder="自定义替换符"
                        />
                    </div>
                    <div class="row" style="padding-right: 12px; padding-top: 1em;">
                        <nya-input
                            v-model="oldString"
                            class="mb-15"
                            fullwidth
                            rows="20"
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
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <div class="row">
                        <div class="radio-group">
                            <nya-radio-group v-model="targetIndex">
                                <nya-radio v-for="(label, i) in targetLabels" class="mr-15" :value="i" :key="i"
                                           :label="label.label"/>
                            </nya-radio-group>
                        </div>
                        <nya-input v-model="newInput"
                                   autofocus
                                   autocomplete="off"
                                   placeholder="自定义替换符"
                        />
                    </div>
                    <div class="row" style="padding-left: 12px; padding-top: 1em;">
                        <nya-input
                            v-model="newString"
                            class="mb-15"
                            fullwidth
                            rows="20"
                            type="textarea"
                            autocomplete="off"
                            label="已替换"
                            placeholder=""
                        />
                    </div>
                </div>
            </div>
        </nya-container>

        <nya-foot-info title="说明">
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
                {label: "空", val: ''},
            ]
        };
    },
    watch: {
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
        parse() {
            let sourceTag = this.sourceLabels[this.sourceIndex].val;
            let targetTag = this.targetLabels[this.targetIndex].val;
            if (this.oldInput.length > 0) {
                sourceTag = this.oldInput;
                sourceTag = sourceTag.replaceAll('\\\\', '\\');
            }
            if (this.newInput.length > 0) {
                targetTag = this.newInput;
                targetTag = targetTag.replaceAll('\\\\', '\\');
            }
            console.log("source", sourceTag, "target", targetTag);
            try {
                if (this.oldString) {
                    // 左边的转右边
                    const reg = new RegExp(sourceTag, "g");
                    this.newString = this.oldString.replaceAll(reg, targetTag);
                } else {
                    // 右边的转左边
                    const reg = new RegExp(targetTag, "g");
                    this.oldString = this.newString.replaceAll(reg, sourceTag);
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
