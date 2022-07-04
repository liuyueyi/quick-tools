<template>
    <div class="cut">
        <nya-container title="文件base64">
            <div class="form-row">
                <div class="custom-file col-md-3">
                    <input
                        ref="input"
                        type="file"
                        name="image"
                        class="form-control"
                        accept="*/*"
                        @change="loadImg"
                    />
                </div>
            </div>
        </nya-container>

        <nya-container v-show="result" title="转换成功">
            <nya-copy :copy="result">
                <pre>{{ result }}</pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
            <li>文件base64编码便于网络传输，注意不要选择太大的文件哦</li>
        </nya-foot-info>
    </div>
</template>

<script>
// Local
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    name: 'ImageCut',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        VueCropper,
    },
    data() {
        return {
            n: null,
            result: '',
        };
    },
    methods: {
        loadImg(e) {
            const file = e.target.files[0];
            if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.result = event.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                this.$noty.error('文件阅读API权限未开哦~', {timeout: 500});
            }
        },
    }
};
</script>

<style lang="scss">

</style>
