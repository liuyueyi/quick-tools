<template>
    <div class="img-holder">
        <nya-container title="图片占位">
            <div class="form-inline top-padding-2em">
                <span class="text-center" style="margin-right: 1em"> 图片大小</span>
                <input type="text" class="form-control" :placeholder="`960`" v-model="width">
                <span class="text-center no-border" style="margin-left: 1em; margin-right: 1em"> X </span>
                <input type="text" class="form-control" :placeholder="`320`" v-model="height">
                <button class="btn btn-outline-primary" style="margin-left: 1em" @click="save">生成</button>
            </div>
            <div class="form-inline top-padding-1em">
                <span class="text-center" style="margin-right: 1em">显示文字</span>
                <input type="text" class="form-control text-center col-6" v-model="text"/>
                <span class="text-center" style="margin-right: 1em; margin-left: 1em">文字倍数</span>
                <input type="number" class="form-control text-center col-2" v-model="fontSize"/>

            </div>

            <client-only>
                <div class="form-inline top-padding-1em">
                    <span class="text-center"> 文字颜色 </span>
                    <compact-picker v-model="textColor" class="form-control" style="margin-left: 1em"/>
                    <input type="text" class="form-control text-center" placeholder="自定义#666666"
                           style="margin-left: 1em"
                           v-model="textColorInput"/>
                </div>

                <div class="form-inline top-padding-1em">
                    <span class="text-center"> 背景颜色 </span>
                    <compact-picker v-model="bgColor" class="form-control" style="margin-left: 1em"/>
                    <input type="text" class="form-control text-center" placeholder="自定义#cccccc"
                           style="margin-left: 1em"
                           v-model="bgColorInput"/>
                </div>
            </client-only>



            <div class="nya-subtitle top-margin-1em">
                <p>实时预览：</p>
                <div ref="preview" v-html="show" id="preview" :style="`width:` + width + `px;height:` + height + `px;`">
                </div>
            </div>

        </nya-container>

        <nya-container v-show="imgUrl" title="生成成功" class="preview">
            <a :href="imgUrl" target="_blank" rel="noopener noreferrer">
                <img :src="imgUrl" alt="image">
            </a>
        </nya-container>

        <nya-foot-info title="Tips">
            <li>预览区图片无法直接使用，请点击生成按钮获取图片</li>
            <li>请不要直接引用图片http地址，如有需要右键保存</li>
        </nya-foot-info>
    </div>
</template>

<script>
import {Compact} from 'vue-color';
import domtoimage from 'dom-to-image';

export default {
    name: 'ImgHolder',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        'compact-picker': Compact,
    },
    data() {
        return {
            width: "960",
            height: "320",
            fontSize: 4,
            text: '一灰灰的占位图片',
            bgColor: '#CCCCCC',
            bgColorInput: '#CCCCCC',
            textColor: '#666666',
            textColorInput: '#666666',
            imgUrl: '',
        };
    },
    watch: {
        bgColor() {
            this.bgColorInput = this.bgColor.hex8;
        },
        textColor() {
            this.textColorInput = this.textColor.hex8;
        }
    },
    computed: {
        show() {
            let bg = this.bgColorInput.trim();
            let tc = this.textColorInput.trim();

            return "<div style=\"background: " + bg + "; width:" + this.width + "px; height: " + this.height + "px;\"\n" +
                "                 class=\"nav flex-column justify-content-center text-center\">\n" +
                "                <span style='font-size: " + this.fontSize + "em; color: " + tc + "'>" + this.text + "</span>\n" +
                "   </div>";
        }
    },
    methods: {
        save() {
            domtoimage
                .toBlob(this.$refs.preview)
                .then(e => {
                    // createDownload(e, 'holderImage.jpg');
                    console.log("e:", e, URL.createObjectURL(e));
                    this.imgUrl = URL.createObjectURL(e);
                })
                .catch(err => {
                    this.$modal.show('dialog', {
                        title: '生成失败',
                        text: `ERROR: ${err}`
                    });
                });

        },
    }
};
</script>

<style lang="scss">
.img-holder {
}
</style>
