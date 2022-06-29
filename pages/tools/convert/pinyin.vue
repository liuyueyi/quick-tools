<template>
    <div class="pinyin">
        <nya-container title="汉字转拼音">
            <nya-input v-model="inputText"
                       autofocus
                       autocomplete="off"
                       placeholder="天地玄黄，宇宙洪荒"
                       label="输入任意需要转换的中文"
                       fullwidth
            />
        </nya-container>

        <nya-container v-show="this.textRes" title="转换结果">
            <pre>{{ textRes }}</pre>
            <br/>
            <pre>{{ charRes }}</pre>
        </nya-container>

        <nya-foot-info title="Tips">
            <li>
                部分繁体汉字转拼音可能存在异常，如有疑问，请到留言板提出
            </li>
            <li>
                本功能由 <a href='https://github.com/hotoo/pinyin' target="_blank" rel="noopener noreferrer">pinyin</a>
                提供支持；为大佬开源点赞
            </li>
        </nya-foot-info>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';
import pinyin from 'pinyin';

export default {
    name: 'TextReplace',
    components: {
        Dynamic
    },
    data() {
        return {
            inputText: '',
            textRes: '', // 语句的转换
            charRes: '', // 每个字的转换
        };
    },
    watch: {
        inputText() {
            this.parse();
        }
    },
    methods: {
        parse() {
            let ans = pinyin(this.inputText, {style: pinyin.STYLE_TONE, segment: true});
            this.textRes = '';
            ans.forEach(i => this.textRes += i + " ");

            let cells = pinyin(this.inputText, {heteronym: true, style: pinyin.STYLE_TONE,})
            let chs = '';
            for (let i = 0; i < cells.length; i++) {
                if (i !== 0) chs += "\n";
                chs += this.inputText.charAt(i) + " : " + String(cells[i]);
            }
            this.charRes = chs;
        }
    }
};
</script>

<style lang="scss">
</style>
