<template>
    <div class="textdiff">
        <nya-container title="文本对比">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <nya-input
                        v-model="oldString"
                        className="mb-15"
                        fullwidth
                        rows="10"
                        type="textarea"
                        autofocus
                        autocomplete="off"
                        label="旧文本"
                        placeholder="welcome to use quick-tools -->by 一灰灰blog"
                    />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <nya-input
                        v-model="newString"
                        className="mb-15"
                        fullwidth
                        rows="10"
                        type="textarea"
                        autocomplete="off"
                        label="新文本"
                        placeholder="欢迎使用神奇工具箱 -->by 一灰灰blog"
                    />
                </div>
            </div>
        </nya-container>
        <nya-container v-if="results.length" title="对比结果">
            <Dynamic :template="results"/>
        </nya-container>

        <nya-foot-info title="Tips">
            <li>
                使用：<a
                href="https://github.com/kpdecker/jsdiff"
                target="_blank"
                rel="noopener noreferrer"
            >jsdiff</a>生成对比数据
            </li>
            <li>
                使用：<a
                href="https://github.com/rtfpessoa/diff2html"
                target="_blank"
                rel="noopener noreferrer"
            >diff2html</a>渲染对比结果
            </li>
        </nya-foot-info>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';

import {createPatch} from 'diff';
import * as Diff2Html from 'diff2html';

import 'diff2html/bundles/css/diff2html.min.css';

let oo, os;
export default {
    name: 'TextDiff',
    components: {
        Dynamic
    },
    data() {
        return {
            oldString: '',
            newString: '',
            results: ''
        };
    },
    watch: {
        oldString() {
            if (!this.newString) {
                return;
            }

            if (this.oldString.trim() === oo) {
                return;
            }

            oo = this.oldString.trim();
            this.diff();
        },
        newString() {
            if (!this.oldString) {
                return
            }

            if (this.newString.trim() === os) {
                return;
            }
            os = this.newString.trim();
            this.diff();
        }
    },
    methods: {
        diff() {
            if (!this.oldString) {
                this.$noty.error('请输入旧文本');
                return;
            } else if (!this.newString) {
                this.$noty.error('请输入新文本');
                return;
            }
            const input = createPatch('文件', this.oldString, this.newString);
            const diffhtml = Diff2Html.html(input, {
                drawFileList: false,
                matching: 'lines',
                outputFormat: 'side-by-side',
                diffTooBigMessage: '文本差异过大'
            });
            if (diffhtml.includes('File without changes')) {
                // this.$noty.error('没有找到差异');
                console.log(diffhtml);
            }
            this.results = diffhtml;
        }
    }
};
</script>

<style>
</style>
