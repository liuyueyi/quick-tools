<template>
    <div class="morse">
        <nya-container title="摩斯电码转换">
            <nya-input
                v-model.trim="value"
                label="请输入摩斯电码"
                placeholder="...././.-../.-../---/--/../-.-/..-/-/---/---/.-../..."
                autocomplete="off"
                autofocus
                fullwidth
            />
            <nya-checkbox v-model="type" label="解码" />
        </nya-container>

        <nya-container v-show="result" title="转换结果">
            <pre>{{ result }}</pre>
        </nya-container>

        <nya-container title="Tips" icon="bulb-outline">
            <nya-panel text="电报最早是由美国的摩尔斯在1844年发明的，故也被叫做摩尔斯电码。由两种基本信号和不同的间隔时间组成：短促的点信号' ．，读（Di）；保持一定时间的长信号'—'，读（Da）。">
<pre>
A .－ B －. . . C －. －.
D －. . E . F . .－.
G －－. H . . . . I . .
J .－－－ K －. － L .－. .
M －－ N －. O －－－
P . －－. Q －－.－ R .－.
S . . . T － U . .－
V . . .－ W .－－ X －. .－
Y －.－－ Z －－. .
0 －－－－－
1.－－－－
2 . .－－－
3 . . .－－
4. . . .－
5. . . . .
6 －. . . .
7－－. . .
8－－－. . 9－－－－.
                </pre>

                <ul class="nya-list">
                    <li>注：<b>如果内容包含中文，仅在本平台使用，可能其他人将无法识别</b></li>
                    <li>
                        该工具所有功能直接在浏览器端完成，请放心使用
                    </li>
                </ul>
            </nya-panel>
        </nya-container>
    </div>
</template>

<script>
import morse from '~/utils/morse.js';
export default {
    name: 'Morse',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            value: '',
            downloadUrl: '',
            requestIn: false,
            type: false // true:de false:en
        };
    },
    computed: {
        result() {
            return this.type
                ? morse.decode(this.value)
                : morse.encode(this.value);
        }
    },
    methods: {}
};
</script>

<style lang="scss">
.morse {
    .nya-checkbox {
        margin-top: 15px;
    }
}
</style>
