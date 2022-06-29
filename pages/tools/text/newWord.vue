<template>
    <client-only>
        <div class="new_word">
            <nya-container title="新词释义">
                <nya-input
                    label="请输入新词"
                    autoheight
                    fullwidth
                    type="text"
                    v-model="newWord"
                />
                <nya-input
                    label="请输入词语说明"
                    autoheight
                    fullwidth
                    type="textarea"
                    row="5"
                    v-model="newWordDesc"
                    class="top-margin-1em"
                />
                <nya-input
                    label="输入词语拼音，使用空格分隔"
                    class="top-margin-1em"
                    autoheight
                    fullwidth
                    type="text"
                    v-model="newWordPinyin"
                />

                <div class="top-margin-1em">
                    <div class="btn btn-danger top-margin-1em" @click="reset">
                        清空
                    </div>

                    <div class="btn btn-info top-margin-1em" @click="convert">
                        {{ requestIn ? '生成中' : '立即生成' }}
                    </div>
                </div>
            </nya-container>

            <nya-container title="预览" v-show="this.newWord">
                <div class="preview">
                    <div ref="preview" class="box" :style="`width: ` + this.wordWidth + `px`">
                        <div class="pinyin">
                            <div class="text" v-for="(item, i) in this.wordCells">
                                {{ item.pinyin }}
                            </div>
                        </div>
                        <div class="words">
                            <div class="word" v-for="(item, i) in this.wordCells">
                                <span class="line"></span>
                                <span class="line"></span>
                                <span class="text">{{ item.word }}</span>
                            </div>
                        </div>
                        <div class="paraphrase">
                            {{ newWordDesc }}
                        </div>
                    </div>
                </div>
            </nya-container>

            <nya-container v-if="results" title="生成成功">
                <img :src="results" alt="results">
            </nya-container>

            <nya-foot-info title="说明">
                <li>本工具基于 <a href="https://github.com/tsayen/dom-to-image" target="_blank">dom-to-image</a> 实现，感谢大佬开源 </li>
                <li>如果生成时间过长或生成失败，请使用其他浏览器，推荐使用 Chrome</li>
            </nya-foot-info>
        </div>
    </client-only>
</template>

<script>
import 'vue-slider-component/theme/default.css';
import domtoimage from 'dom-to-image';
import pinyin from 'pinyin';
import createDownload from '~/utils/createDownload.js';

let VueSlider;
if (process.browser) {
    VueSlider = require('vue-slider-component');
}
export default {
    name: 'NewWord',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        VueSlider
    },
    data() {
        return {
            newWord: '随薪锁欲',
            newWordDesc: '指当代年轻人原本有许多想做的事情，但奈何薪资可怜从而变得无欲可求',
            newWordPinyin: 'suí xīn suǒ yù',
            wordCells: [
                {word: '随', pinyin: 'suí'},
                {word: '薪', pinyin: 'xīn'},
                {word: '锁', pinyin: 'suǒ'},
                {word: '欲', pinyin: 'yù'},
            ],
            wordWidth: 468,
            results: '',
            requestIn: false
        };
    },
    watch: {
        newWord() {
            // 自动生成拼音
            let ans = pinyin(this.newWord, {style: pinyin.STYLE_TONE, segment: true});
            console.log("pinyin:", ans);
            let wordPinyin = '';

            // 长度
            this.wordWidth = this.newWord.length < 4 ? 468 : 117 * this.newWord.length;

            // 自动更新预览的文字
            let cells = [];
            for (let index = 0; index < this.newWord.length; index++) {
                let py = ans[index] ? ans[index][0] : ' ';
                wordPinyin += py + ' ';

                cells.push({
                    word: this.newWord.charAt(index),
                    pinyin: py,
                })
            }
            this.newWordPinyin = wordPinyin;
            this.wordCells = cells;
        }
    },
    methods: {
        convert() {
            this.requestIn = true;
            domtoimage
                .toPng(this.$refs.preview)
                .then(e => {
                    this.results = e;
                    this.requestIn = false;
                    createDownload(e, 'newWord.png');
                })
                .catch(err => {
                    this.requestIn = false;
                    this.$modal.show('dialog', {
                        title: '生成失败',
                        text: `ERROR: ${err}`
                    });
                });
        },
        reset() {
            this.newWord = '';
            this.newWordDesc = '';
            this.newWordPinyin = '';
            this.wordWidth = 468;
        }
    }
};
</script>

<style lang="scss">
.new_word {
    .preview {
        border-radius: .25rem;
        justify-content: center;
        box-sizing: border-box;
        overflow-x: auto;
        text-align: center
    }

    .box, .preview {
        background-color: #efebec;
        color: #020107
    }

    .box {
        display: inline-block;
        position: relative;
        padding: 1.875rem;
        text-align: left
    }

    .pinyin {
        margin-bottom: .625rem;
        font-size: 0;

        .text {
            font-size: 1.875rem;
            display: inline-block;
            width: 6.25rem;
            border: .125rem solid transparent;
            text-align: center;
            font-weight: 400;
            color: #756d63
        }

        .text:not(:last-child) {
            border-right: 0
        }
    }

    .words {
        font-size: 0;

        .word {
            position: relative;
            width: 6.25rem;
            height: 6.25rem;
            border: .125rem solid #e60b09;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 4.375rem;
            font-weight: 700;

            .text {
                position: absolute;
                z-index: 1;
                font-family: cursive, SimSun, NSimSun, FangSong, KaiTi
            }

            .line {
                position: absolute;
                transform-origin: center;
                border-left: .0625rem dashed #e60b09;
                height: 8.83883rem
            }

            .line:first-child {
                transform: rotate(45deg)
            }

            .line:nth-child(2) {
                transform: rotate(-45deg)
            }
        }

        .word:not(:last-child) {
            border-right: 0
        }

        .word:after {
            z-index: 0;
            content: "";
            position: absolute;
            background-color: #e60b09
        }

        .word:before {
            z-index: 0;
            content: "";
            position: absolute;
            background-color: #e60b09
        }

    }

    .words .word:after {
        left: 50%;
        width: .125rem;
        height: 100%
    }

    .words .word:before {
        top: 50%;
        width: 100%;
        height: .125rem
    }

    .paraphrase {
        position: relative;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        margin-top: .9375rem;
        display: inline-block;
        font-size: 1.125rem;
        line-height: 1.5
    }

    .paraphrase:before {
        content: "【释义】";
        display: inline-block;
        color: #867f77
    }
}
</style>
