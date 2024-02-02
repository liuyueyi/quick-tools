<template>
    <div class="html-format">
        <nya-container title="Sql转MongoDB">
            <nya-input v-model="content"
                       class="top-margin-1em"
                       fullwidth
                       rows="5"
                       type="textarea"
                       autofocus
            />
        </nya-container>

        <nya-container v-if="results" title="格式化输出">
            <nya-copy :copy="results">
                <pre>{{ results }}</pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
            <li> 底层使用 <a href="https://github.com/orgoldfus/sql2mongo">sql2mongo</a> 实现格式化</li>
        </nya-foot-info>
    </div>
</template>

<script>
const { getMongoQuery } = require("sql2mongo");

export default {
    name: 'sql2mongodb',
    data() {
        return {
            content: '',
            results: ''
        };
    },
    watch: {
        content() {
            console.log("开始进行转换11!");
            this.format_sql();
        }
    },
    methods: {
        format_sql() {
            console.log("开始进行转换!");
            if (!this.content) {
                return;
            }

            // sql 转 mongodb
            console.log('this content:', this.content);
            try {
                this.results = getMongoQuery(this.content);
            } catch (e) {
                this.results = '不支持的转换语法';
            }
        }
    }
}
</script>

<style lang="scss">
.html-format {
    pre {
        font-family: sans-serif;
    }
}

</style>
