<template>
    <div class="random">
        <nya-container title="随机密码生成器">
            <div class="nya-input mb-15">
                <label class="input-title">
                    <span style="padding-right: 1em"> 使用字符： </span>
                    <nya-checkbox v-model="lowAlpha" label="a-z"/>
                    <nya-checkbox v-model="upAlpha" label="A-Z"/>
                    <nya-checkbox v-model="numAlpha" label="0-9"/>
                    <nya-checkbox v-model="specialAlpha" label="!@#$%^&*"/>
                    <span style="padding: 0 1em; color:gray"> | </span>
                </label>
            </div>

            <nya-input v-model.trim="alphaTxt" class="mb-15" fullwidth label="密码簿" placeholder="abcABC0-9"
                       autocomplete="off"/>
            <nya-input v-model.trim="len" class="mb-15" type="number" label="密码长度" placeholder="16"
                       autocomplete="off"/>
            <nya-input v-model.trim="num" class="mb-15" type="number" label="生成数量" placeholder="10"
                       autocomplete="off"/>
            <div class="nya-btn btn-danger" @click="gen">
                生成密码
            </div>
        </nya-container>

        <nya-container v-if="results.length" title="随机密码如下">
            <nya-copy :copy="results">
                <pre>{{ results }}</pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
        </nya-foot-info>
    </div>
</template>

<script>
const L_A = 'abcdefjhijklmnopqrstufwxyz';
const U_A = 'ABCDEFJHIJKLMNOPQRSTUFWXYZ';
const N_A = '0123456789';
const O_A = '!@#$%^&*.?|\'"';
import Dynamic from '@/components/Dynamic';

export default {
    name: 'Random',
    components: {
        Dynamic
    },
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            lowAlpha: true,
            upAlpha: true,
            numAlpha: true,
            specialAlpha: false,
            alphaTxt: L_A + U_A + N_A,
            num: 4, // 密码个数
            len: 16, // 密码长度
            results: "",
            br: true,
            index: 0,
            labels: [
                {label: "a-z"},
                {label: "A-Z"},
                {label: "0-9"},
                {label: "!@#$%^&*"},
            ]
        };
    },
    watch: {
        lowAlpha() {
            this.alphaTxt = this.upAlphaTxt();
        },
        upAlpha() {
            this.alphaTxt = this.upAlphaTxt();
        },
        numAlpha() {
            this.alphaTxt = this.upAlphaTxt();
        },
        specialAlpha() {
            this.alphaTxt = this.upAlphaTxt();
        }
    },
    methods: {
        upAlphaTxt() {
            let txt = '';
            if (this.lowAlpha) {
                txt += L_A;
            }
            if (this.upAlpha) {
                txt += U_A;
            }
            if (this.numAlpha) {
                txt += N_A;
            }
            if (this.specialAlpha) {
                txt += O_A;
            }
            return txt;
        },
        gen() {
            let pwds = [];
            for (let i = 0; i < this.num; i++) {
                pwds.push(this.genOnePwd());
            }
            this.results = pwds.join("\n");
        },
        genOnePwd() {
            let max = this.alphaTxt.length;
            let pwd = '';
            for (let i = 0; i < this.len; i++) {
                const index = Math.floor(Math.random() * max);
                pwd += this.alphaTxt.charAt(index);
            }
            return pwd;
        }
    }
};
</script>
