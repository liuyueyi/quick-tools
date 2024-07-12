<template>
    <div class="blog-cover">
        <nya-container title="图文组图">
            <div class="nya-subtitle mt-15">
                装饰图选择
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
                <span class="text-center" style="margin-right: 1em"> 布局方式 </span>
                <nya-radio-group v-model="layoutIndex">
                    <nya-radio v-for="(label, i) in layoutLables" class="mr-15" :value="i" :key="i" :label="label.label"/>
                </nya-radio-group>
            </div>
            <div class="form-inline top-padding-2em">
                <span class="text-center" style="margin-right: 1em"> 输出大小 </span>
                <input type="text" class="form-control" :placeholder="`960`" v-model="width">
                <span class="text-center no-border" style="margin-left: 1em; margin-right: 1em"> X </span>
                <input type="text" class="form-control" :placeholder="`320`" v-model="height">
            </div>
            <client-only>
                <div class="form-inline top-padding-1em">
                    <span class="text-center"> 背景颜色 </span>
                    <compact-picker v-model="bgColor" class="form-control" style="margin-left: 1em"/>
                    <input type="text" class="text-center" placeholder="自定义#cccccc"
                           style="margin-left: 1em"
                           v-model="bgColorInput"/>
                </div>
            </client-only>

            <div class="form-inline top-padding-1em">
                <span class="text-center" style="margin-right: 1em">图片样式</span>
                <input type="text" class="form-control text-center col-10" v-model="imgStyle"/>
            </div>

            <div class="form-inline top-padding-1em">
                <span class="text-center" style="margin-right: 1em">标题</span>
                <input type="text" class="form-control text-center col-11" v-model="title"/>
                <span class="text-center" style="margin-right: 1em;">标题样式</span>
                <input type="text" class="form-control text-center col-11" v-model="titleStyle"/>
            </div>

            <div class="form-inline top-padding-1em">
                <span class="text-center" style="margin-right: 1em">正文</span>
                <textarea type="text" class="form-control text-center col-11" v-model="contentTxt"/>
                <span class="text-center" style="margin-right: 1em;">正文样式</span>
                <input type="text" class="form-control text-center col-11" v-model="contentStyle"/>
            </div>

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
            height: "640",
            layoutIndex: 0,
            layoutLables: [
                {
                    label: '左图-右文', 
                    imgStyle: `width:30%; height:95%;    margin-left: 1%;
    margin-top: 1.25%;
    border-radius: 12px;
    -webkit-filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, .5));
    filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, .5));`, 
                    txtStyle: `margin-left: 2em; margin-top: 1.25%; width: 98%`,
                    titleStyle: `font-size: 2em;text-align: center;`,
                    contentStyle: `font-size: 1.5em;width: 100%; height: 90%;padding-right:1em; background:transparent; 
      border-style:none;  scrollbar-width: 0;
  scrollbar-color: transparent transparent;
  resize:none;`,
                },
                {
                    label: '右图-左文',
                    imgStyle: `width:30%; height:95%;    margin-right: 1%;
    margin-top: 1.25%;
    border-radius: 12px;
    -webkit-filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, .5));
    filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, .5));`, 
                    txtStyle: `margin-left: 2em; margin-top: 1.25%; width: 98%`,
                    titleStyle: `font-size: 2em;text-align: center;`,
                    contentStyle: `font-size: 1.5em;width: 100%; height: 90%; background:transparent; 
      border-style:none;  scrollbar-width: 0;
  scrollbar-color: transparent transparent;
  resize:none;`,
                },
                {
                    label: '上图-下文', 
                    imgStyle: `width:94%; height:30%;    margin-left: 3%;
    margin-top: 1.25%;
    border-radius: 12px;
    -webkit-filter: drop-shadow(6px 6px 6px rgba(0, 0, 0, .5));
    filter: drop-shadow(6px 6px 6px rgba(0, 0, 0, .5));`,
                    txtStyle: `margin-left: 2em; margin-top: 1.25%; width: 98%; height: 66%`,
                    titleStyle: `font-size: 2em;text-align: center;`,
                    contentStyle: `font-size: 1.5em;width: 98%; height: 90%; background:transparent; 
      border-style:none;  scrollbar-width: 0;
  scrollbar-color: transparent transparent;
  resize:none;`
                }
            ],
            imgStyle: '',
            txtStyle: '',
            titleStyle: '',
            contentStyle: '',

            title: '小猴子的冒险之旅',
            contentTxt: '',

            bgColor: '#16A5A5FF',
            bgColorInput: '#16A5A5FF',
            imgUrl: '',
        };
    },
    watch: {
        bgColor() {
            this.bgColorInput = this.bgColor.hex8;
        },
        layoutIndex() {
            let target = this.layoutLables[this.layoutIndex];
            
            this.imgStyle = target.imgStyle;
            this.txtStyle = target.txtStyle;
            this.titleStyle = target.titleStyle;
            this.contentStyle = target.contentStyle;
        },

    },
    computed: {
        show() {
            let bg = this.bgColorInput.trim();
            if (!this.imgStyle) {
                let target = this.layoutLables[this.layoutIndex];
                this.imgStyle = target.imgStyle;
                this.txtStyle = target.txtStyle;
                this.titleStyle = target.titleStyle;
                this.contentStyle = target.contentStyle;
            }

            if (this.layoutIndex == 0) {
                return `<div style="display:inline-flex; width: ${this.width}px; height: ${this.height}px; background-color:${bg};">
    <image src="${this.bgUrl}" style="${this.imgStyle}">
    </image>
    
    <div style="${this.txtStyle}">
        <div style="${this.titleStyle}"> ${this.title} </div>
        <textarea style="${this.contentStyle}"> ${this.contentTxt} </textarea>
    </div>
</div>`
            } else if(this.layoutIndex == 1) {
                return `<div style="display:inline-flex; width: ${this.width}px; height: ${this.height}px; background-color:${bg};">
    <div style="${this.txtStyle}">
        <div style="${this.titleStyle}"> ${this.title} </div>
        <textarea style="${this.contentStyle}"> ${this.contentTxt} </textarea>
    </div>
     <image src="${this.bgUrl}" style="${this.imgStyle}">
    </image>
</div>`
            } else if (this.layoutIndex == 2) {
                return `<div style="display:inline-flex; flex-direction: column; width: ${this.width}px; height: ${this.height}px; background-color:${bg};">
    <image src="${this.bgUrl}" style="${this.imgStyle}">
    </image>
    
    <div style="${this.txtStyle}">
        <div style="${this.titleStyle}"> ${this.title} </div>
        <textarea style="${this.contentStyle}"> ${this.contentTxt} </textarea>
    </div>
</div>`
            }
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
