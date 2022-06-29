<template>
    <div class="text_word_count">
        <nya-container title="字数统计">
            <nya-input v-model="content"
                       fullwidth
                       rows="5"
                       type="textarea"
                       autofocus
                       label="待统计内容"
            />
        </nya-container>

        <nya-container v-if="results" title="统计结果">
            <pre>{{ results }}</pre>
        </nya-container>

        <nya-foot-info title="Tips">
        </nya-foot-info>
    </div>
</template>

<script>
export default {
    name: 'WordCount',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            content: ''
        };
    },
    computed: {
        results() {
            return "有效字符数:" + this.content.length;
        }
    },
    methods: {}
};
</script>
