<template>
    <div class="blog-cover">
        <nya-container title="专栏封面">
            <div class="nya-subtitle mt-15">
                背景图选择
            </div>
            <div class="radio-group">
                <nya-radio-group v-model="index">
                    <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                </nya-radio-group>
            </div>

            <div class="inputbtn">
                <nya-input
                    v-if="index === 0"
                    v-model="n"
                    class="upfile"
                    type="file"
                    accept="image/*"
                    placeholder="点击这里上传文件"
                    @change="handleChange"
                />
                <nya-input v-else
                           v-model="bgUrl"
                           type="text"
                           placeholder="输入图片url"
                />
                <button
                    type="button"
                    class="nya-btn"
                    :disabled="loading"
                    @click="save"
                >
                    {{ loading ? '生成中' : '生成' }}
                </button>
            </div>

            <div class="form-inline top-padding-2em">
                <span class="text-center" style="margin-right: 1em"> 封面大小</span>
                <input type="text" class="form-control" :placeholder="`960`" v-model="width">
                <span class="text-center no-border" style="margin-left: 1em; margin-right: 1em"> X </span>
                <input type="text" class="form-control" :placeholder="`320`" v-model="height">
            </div>
            <div class="form-inline top-padding-1em">
                <span class="text-center" style="margin-right: 1em">主标题</span>
                <input type="text" class="form-control text-center col-6" v-model="text"/>
                <span class="text-center" style="margin-right: 1em; margin-left: 1em">文字倍数</span>
                <input type="number" class="form-control text-center col-2" v-model="fontSize"/>
            </div>

            <div class="form-inline top-padding-1em">
                <span class="text-center" style="margin-right: 1em">副标题</span>
                <input type="text" class="form-control text-center col-6" v-model="secondText"/>
                <span class="text-center" style="margin-right: 1em; margin-left: 1em">文字倍数</span>
                <input type="number" class="form-control text-center col-2" v-model="secondFontSize"/>
            </div>

            <client-only>
                <div class="form-inline top-padding-1em">
                    <span class="text-center"> 主标题颜色 </span>
                    <compact-picker v-model="textColor" class="form-control" style="margin-left: 1em"/>
                    <input type="text" class="form-control text-center" placeholder="自定义#666666"
                           style="margin-left: 1em"
                           v-model="textColorInput"/>
                </div>
                <div class="form-inline top-padding-1em">
                    <span class="text-center"> 副标题颜色 </span>
                    <compact-picker v-model="secondTextColor" class="form-control" style="margin-left: 1em"/>
                    <input type="text" class="form-control text-center" placeholder="自定义#666666"
                           style="margin-left: 1em"
                           v-model="secondTextColorInput"/>
                </div>

                <div class="form-inline top-padding-1em">
                    <span class="text-center"> 纯背景颜色 </span>
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

        <nya-foot-info title="说明">
            <li>预览区图片无法直接使用，请点击生成按钮获取图片</li>
            <li>请不要直接引用图片http地址，如有需要右键保存</li>
        </nya-foot-info>
    </div>
</template>

<script>
import {Compact} from 'vue-color';
import domtoimage from 'dom-to-image';

export default {
    name: 'BlogCover',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        'compact-picker': Compact,
    },
    data() {
        return {
            bgUrl: '', // 封面背景图
            n: null,
            loading: false,
            index: 0,
            labels: [
                {label: '上传图'},
                {label: '请输入网络图片URL'},
            ],

            width: "960",
            height: "320",
            fontSize: 4,
            text: '神奇工具箱的专栏分享',
            secondText: 'by一灰灰',
            secondFontSize: 2,
            bgColor: '#CCCCCC',
            bgColorInput: '#CCCCCC',
            textColor: '#666666',
            textColorInput: '#666666',
            secondTextColor: '#666666',
            secondTextColorInput: '#666666',
            imgUrl: '',
        };
    },
    watch: {
        bgColor() {
            this.bgColorInput = this.bgColor.hex8;
        },
        textColor() {
            this.textColorInput = this.textColor.hex8;
        },
        secondTextColor() {
            this.secondTextColorInput = this.secondTextColor.hex8;
        }
    },
    computed: {
        show() {
            let bg = this.bgColorInput.trim();
            let tc = this.textColorInput.trim();
            let tc2 = this.secondTextColorInput.trim();
            if (this.bgUrl) {
                bg = "url(" + this.bgUrl + ")";
            }
            return `<div style="background: ${bg}; width:${this.width}px; height: ${this.height}px;" class="nav flex-column justify-content-center text-center">
                        <span style="font-size: ${this.fontSize}em; color: ${tc}">${this.text}</span>
                        <span style="font-size: ${this.secondFontSize}em; color: ${tc2}">${this.secondText}</span>
                    </div>`
        }
    },
    methods: {
        handleChange(e) {
            // 背景图
            const files = e.target.files;
            if (!files.length) return false;
            this.file = files[0];
            this.docs = [];
            this.bgUrl = URL.createObjectURL(this.file);
        },
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

</style>
