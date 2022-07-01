<template>
    <div class="svg">
        <nya-container title="SVG渲染">
            <div class="input-group ">
                <div class="radio-group">
                    <nya-radio-group v-model="index">
                        <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                    </nya-radio-group>
                </div>
                <button class="btn btn-outline-danger" @click="saveSvg">保存</button>
            </div>

            <div v-show="svg_content" class="nya-subtitle">
                预览
            </div>
            <div v-show="svg_content" ref="preview" class="preview" v-html="svg_content">
            </div>

            <nya-input v-model="svg_content"
                       fullwidth
                       rows="5"
                       type="textarea"
                       autofocus
                       label="svg内容"
                       autoheight
            />
        </nya-container>

        <nya-foot-info title="说明">
            <li>通过dom-to-image实现图片下载，当svg中引入外部图片时，可能下载失败!</li>
        </nya-foot-info>
    </div>
</template>

<script>
import domtoimage from "dom-to-image";
import createDownload from '~/utils/createDownload.js';

export default {
    name: 'Svg',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
    },
    data() {
        return {
            index: 0,
            labels: [
                {label: 'png'},
                {label: 'jpeg'},
            ],
            svg_content: '',
            results: '',
            requestIn: false,
        };
    },
    computed: {
        svg() {
            return (
                'data:image/svg+xml;base64,' +
                Buffer.from(this.svg_content).toString('base64')
            );
        }
    },
    methods: {
        saveSvg() {
            this.requestIn = true;
            if (this.index === 0) {
                domtoimage
                    .toPng(this.$refs.preview)
                    .then(e => {
                        this.results = e;
                        this.requestIn = false;
                        createDownload(e, 'svg.jpg');
                    })
                    .catch(err => {
                        this.requestIn = false;
                        this.$modal.show('dialog', {
                            title: '生成失败',
                            text: `ERROR: ${err}`
                        });
                    });
            } else if (this.index === 1) {
                domtoimage
                    .toJpeg(this.$refs.preview)
                    .then(e => {
                        this.results = e;
                        this.requestIn = false;
                        createDownload(e, 'svg.png');
                    })
                    .catch(err => {
                        this.requestIn = false;
                        this.$modal.show('dialog', {
                            title: '生成失败',
                            text: `ERROR: ${err}`
                        });
                    });
            }

        },
    }
};
</script>

<style lang="scss">
.svg {
    .nya-subtitle {
        margin-top: 15px;
    }

    .preview {
        position: relative;
        max-width: 800px;

        img {
            width: 100%;
            height: 100%;
        }

        .svg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }

    .results {
        max-width: 100%;
    }

    .inputbtn {
        margin-bottom: 15px;
    }
}
</style>
