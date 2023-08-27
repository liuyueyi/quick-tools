<template>
    <div class="textdiff">
        <nya-container title="SQL补全">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <nya-input
                        v-model="sql"
                        class-name="mb-15"
                        fullwidth
                        rows="10"
                        type="textarea"
                        autofocus
                        autocomplete="off"
                        label="Sql语句"
                        placeholder="select * from money where user_name = ? limit ?"
                    />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-bg-color custom-by-both">
                    <nya-input
                        v-model="param"
                        class-name="mb-15"
                        fullwidth
                        rows="10"
                        type="textarea"
                        autocomplete="off"
                        label="Sql参数"
                        placeholder="一灰灰(String), 1(Integer)"
                    />
                </div>
            </div>
        </nya-container>
        <nya-container v-if="results.length" title="SQL拼接结果">
            <pre>{{ results }}</pre>
        </nya-container>

        <nya-foot-info title="Tips" />
    </div>
</template>

<script>
import { mergeSql } from '../../../static/js/sqlMerge';

let oo, os;
export default {
    name: 'SqlMerge',
    data() {
        return {
            sql: '',
            param: '',
            results: ''
        };
    },
    watch: {
        sql() {
            if (!this.param) {
                return;
            }

            if (this.sql.trim() === oo) {
                return;
            }

            oo = this.sql.trim();
            this.merge();
        },
        param() {
            if (!this.sql) {
                return;
            }

            if (this.param.trim() === os) {
                return;
            }
            os = this.param.trim();
            this.merge();
        }
    },
    methods: {
        merge() {
            if (!this.sql) {
                this.$noty.error('请输入SQL');
                return;
            } else if (!this.param) {
                this.$noty.error('请输入参数');
                return;
            }

            this.results = mergeSql(this.sql, this.param);
        }
    }
};
</script>

<style>
</style>
