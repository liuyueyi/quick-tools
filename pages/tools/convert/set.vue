<template>
    <div class="textdiff">
        <nya-container title="集合运算">
            <div class="input-group ">
                <div class="radio-group">
                    <nya-radio-group v-model="index">
                        <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                    </nya-radio-group>
                </div>
                <span> &nbsp; | &nbsp; </span>
                <nya-checkbox :checked="newLineOutput" label="换行输出"
                              @change="handleChange"/>
            </div>
            <small> {{ labels[index].desc }} </small>


            <div class="row top-margin-1em">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <nya-input
                        v-model="setA"
                        className="mb-15"
                        fullwidth
                        rows="10"
                        type="textarea"
                        autofocus
                        autocomplete="off"
                        label="A集合"
                        placeholder="集合元素以英文逗号或换行分割"
                    />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <nya-input
                        v-model="setB"
                        className="mb-15"
                        fullwidth
                        rows="10"
                        type="textarea"
                        autocomplete="off"
                        label="B集合"
                        placeholder="集合元素以英文逗号或换行分割"
                    />
                </div>
            </div>
        </nya-container>
        <nya-container title="计算结果" :desc="resultDesc" v-show="this.setA || this.setB">
            <nya-copy :copy="results">
                <pre>{{results}}</pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
            <li> 纯JS实现集合运算：计算数组的交、差、并、补</li>
        </nya-foot-info>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';

export default {
    name: 'Set',
    components: {
        Dynamic
    },
    data() {
        return {
            index: 0,
            labels: [
                {label: '交集', desc: '获取同时在AB两个集合中的元素'},
                {label: '并集', desc: 'AB两个集合中的元素合并在一个集合中'},
                {label: '在A,不在B', desc: '在A集合中，但是不在B集合中的元素'},
                {label: '在B，不在A', desc: '在B集合中，但是不在A集合中的元素'},
                {label: '不同时在AB', desc: '要么在A，要么在B集合中的元素'},
            ],
            setA: '',
            setB: '',
            results: '',
            resultDesc: '',
            joinSymbol: ',',
            newLineOutput: false,
        };
    },
    watch: {
        setA() {
            this.diff();
        },
        setB() {
            this.diff();
        },
        index() {
            this.diff();
        },
    },
    methods: {
        toSet(content) {
            let ans = [];
            if (content.indexOf(',') >= 0) {
                ans = content.split(',');
            } else {
                ans = content.split('\n');
            }
            let res = [];
            ans.forEach(i => {
                let cell = i.trim();
                if (cell && !res.includes(cell)) {
                    res.push(cell);
                }
            });
            return res;
        },
        diff() {
            let a = this.toSet(this.setA);
            let b = this.toSet(this.setB);

            let res;
            if (this.index === 0) {
                // 交接
                res = a.filter(v => b.includes(v));
            } else if (this.index === 1) {
                // 并集
                res = a.concat(b.filter(i => !a.includes(i)));
            } else if (this.index === 2) {
                // 在a不在b
                res = a.filter(i => !b.includes(i));
            } else if (this.index === 3) {
                // 在b不在a
                res = b.filter(i => !a.includes(i));
            } else {
                res = a.filter(i => !b.includes(i));
                res = res.concat(b.filter(i => !a.includes(i)));
            }

            this.resultDesc = 'A集合元素: ' + a.length + "个; B集合元素：" + b.length + "个; 返回结果元素: " + res.length;
            this.results = res.join(this.joinSymbol);
        },
        handleChange() {
            this.newLineOutput = !this.newLineOutput
            if (this.newLineOutput) {
                this.joinSymbol = '\n';
            } else {
                this.joinSymbol = ',';
            }
            this.diff();
        },
    }
};
</script>

<style>
</style>
