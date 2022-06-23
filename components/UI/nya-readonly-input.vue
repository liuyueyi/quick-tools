<template>
    <div class="input-group readonly-input">
        <input type="text" class="form-control" :value="val" readonly
               @click="copyValue(val)">
        <button class="btn btn-primary" type="button" v-if="copyIcon"
                @click="copyValue(val)">
            <svg width="12" height="12" viewBox="0 0 16 16">
                <path fill-rule="evenodd" fill="#fff"
                      d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
                <path fill-rule="evenodd" fill="#fff"
                      d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        val: {type: String, default: ''},
        copyIcon: {type: Boolean, default: false}
    },
    methods: {
        copyValue(value) {
            if (!value) {
                return;
            }

            this.$copyText(String(value)).then(
                () => {
                    this.$noty.success('复制成功', {timeout: 500});
                },
                () => {
                    this.$noty.error('复制失败，请手动选择复制', {timeout: 500});
                }
            );
        }
    }
};
</script>

<style lang="scss">
.readonly-input {
    margin-bottom: 1em;
    margin-top: 1em;

    input {
        font-size: 12px;
        color: #000;
    }

    button {
        font-size: 12px;
    }

}
</style>
