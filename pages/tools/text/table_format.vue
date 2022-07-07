<template>
    <div class="table_format">
        <nya-container title="表格数据格式化">
            <div class="nya-subtitle mt-15">
                转换类型
            </div>
            <div class="radio-group form-control no-border">
                <nya-radio-group v-model="index">
                    <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                </nya-radio-group>
            </div>
            <div class="input-group" style="padding-bottom: 1em">
                <span class="form-control no-border col-1"> {{ labels[index]['t1'] }} </span>
                <nya-input
                    v-model.trim="t1"
                    label=""
                    :placeholder="labels[index].place"
                    type="text"
                    autocomplete="on"
                    autofocus
                    fullwidth
                    class=" output col-3"/>
                &nbsp;
                <span v-if="labels[index]['t2']" class="form-control no-border col-1"> {{ labels[index]['t2'] }} </span>
                <nya-input v-if="labels[index]['t2']"
                           v-model.trim="t2"
                           label=""
                           :placeholder="labels[index]['t2']"
                           type="text"
                           autocomplete="on"
                           autofocus
                           fullwidth
                           class="output col-3"/>
            </div>

            <nya-input
                v-model="tableString"
                className="mb-15"
                fullwidth
                rows="10"
                type="textarea"
                autofocus
                autocomplete="off"
                label="请输入csv|excel|table格式数据"
                placeholder="id uname age
1 yihui 18
2 一灰灰 19
3 yihui 20
"
            />
        </nya-container>
        <nya-container v-if="results.length" title="对比结果">
            <nya-copy :copy="results">
                <pre>  <Dynamic :template="results"/> </pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
            <li>
                直接拷贝表格/excel/csv中的数据，即可转换为插入sql,json对象,markdown表格
            </li>
            <li>
                插件源码：<a
                href="https://github.com/liuyueyi/quick-jsdemo"
                target="_blank"
                rel="noopener noreferrer"
            >quick-jsdemo</a> 表格数据格式化
            </li>
        </nya-foot-info>

    </div>
</template>

<script>

import Dynamic from '@/components/Dynamic';
import {table2insertSql, table2jsonStr, table2markdown} from '/static/js/tableDataFormat.js';


let oo, os;
export default {
    name: 'TableFormat',
    components: {
        Dynamic
    },
    data() {
        return {
            tableString: '',
            t1: '',
            t2: '',
            results: '',
            index: 0,
            labels: [
                {label: "sql", t1: '表名', t2: '排除列'},
                {label: "json", t1: '分组字段', t2: ''},
                {label: "markdown", t1: '排除列', t2: ''},
            ]
        };
    },
    watch: {
        index() {
            this.t1 = '';
            this.t2 = '';
            this.tableFormat();
        },
        t1() {
            this.tableFormat();
        },
        t2() {
            this.tableFormat();
        },
        tableString() {
            if (this.tableString.trim() === oo) {
                return;
            }

            oo = this.tableString.trim();
            this.tableFormat();
        }
    },
    methods: {
        tableFormat() {
            if (!this.tableString) {
                return;
            }
            if (this.index === 0) {
                this.results = table2insertSql(this.tableString, this.t1 ? this.t1 : "替换表名", this.t2).str;
            } else if (this.index === 1) {
                this.results = table2jsonStr(this.tableString, this.t1).str;
            } else {
                this.results = table2markdown(this.tableString, this.t1).str;
            }
        }
    }
};
</script>

<style lang="scss">

.table_format {
    .no-border {
        border: 0 solid #ced4da;
    }

}

</style>
