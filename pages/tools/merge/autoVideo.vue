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
                <div class="img-colors">
                    <div class="img-color">
                        <div class="nya-subtitle">
                            主色
                        </div>
                        <div :style="{'background-color': imgColor.color}">
                            {{ imgColor.color }}
                        </div>
                    </div>
                    <div class="img-palette">
                        <div class="nya-subtitle">
                            调色盘
                        </div>
                        <ul>
                            <li v-for="(item, index) in imgColor.palette" :key="index" :style="{'background-color': item}">
                                {{ item }}
                            </li>
                        </ul>
                    </div>

                    <div class="img-palette">
                        <div class="nya-subtitle">
                            背景颜色
                        </div>
                       <div class="form-inline">
                            <compact-picker v-model="bgColor" class="form-control" style="margin-left: 1em"/>
                            <input type="text" class="text-center" placeholder="自定义#cccccc" style="margin-left: 1em" v-model="bgColorInput"/>
                       </div>
                    </div>
                </div>
               
            </client-only>

            <div class="form-inline top-padding-1em">
                <span class="text-center" style="margin-right: 1em">图片样式</span>
                <input type="text" class="form-control text-center col-11" v-model="imgStyle"/>
            </div>

            <div class="form-inline top-padding-1em">
                <nya-input v-model="title"
                       class="top-margin-1em"
                       fullwidth
                       type="text"
                       autofocus
                       label="标题"
            />
                <span class="text-center top-margin-1em" style="margin-right: 1em;">标题样式</span>
                <input type="text" class="form-control top-margin-1em col-11" v-model="titleStyle"/>
            </div>

            <div class="form-inline top-padding-1em">
                <nya-input v-model="contentTxt"
                       class="top-margin-1em"
                       fullwidth
                       rows="5"
                       type="textarea"
                       autofocus
                       label="请输入正文"
            />
                <!-- <textarea type="text" class="form-control text-center col-11" v-model="contentTxt" /> -->
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
import colorThief from '~/utils/color-thief.js';
import TinyColor from 'tinycolor2';

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
            colorthief: new colorThief(),
            imgColor: {
                color: '',
                palette: ''
            },
            width: "1600",
            height: "900",
            layoutIndex: 0,
            layoutLables: [
                {
                    label: '左图-右文', 
                    imgStyle: `width:30%; height:80%; margin-left: 1%; margin-top: 5%; border-radius: 12px;
    -webkit-filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, .5));
    filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, .5));`, 
                    txtStyle: `margin-left: 2em; margin-top: 1.25%; width: 98%`,
                    titleStyle: `font-size: 2em;text-align: center;`,
                    contentStyle: `font-family:  STXinwei;  font-color: white;font-size: 1.5em;width: 100%; height: 90%;padding-right:1em; background:transparent; 
      border-style:none;  scrollbar-width: 0;
  scrollbar-color: transparent transparent;
  resize:none;`,
                },
                {
                    label: '右图-左文',
                    imgStyle: `width:30%; height:80%;    margin-right: 1%;
    margin-top: 5%;
    border-radius: 12px;
    -webkit-filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, .5));
    filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, .5));`, 
                    txtStyle: `margin-left: 2em; margin-top: 1.25%; width: 98%`,
                    titleStyle: `font-size: 2em;text-align: center;`,
                    contentStyle: `font-family:  STXinwei;  font-color: white;font-size: 1.5em;width: 100%; height: 90%; background:transparent; 
      border-style:none;  scrollbar-width: 0;
  scrollbar-color: transparent transparent;
  resize:none;`,
                },
                {
                    label: '上图-下文', 
                    imgStyle: `width:90%; height:30%;    margin-left: 5%;
    margin-top: 1.25%;
    border-radius: 12px;
    -webkit-filter: drop-shadow(6px 6px 6px rgba(0, 0, 0, .5));
    filter: drop-shadow(6px 6px 6px rgba(0, 0, 0, .5));`,
                    txtStyle: `margin-left: 2em; margin-top: 1.25%; width: 98%; height: 66%`,
                    titleStyle: `font-size: 2em;text-align: center;`,
                    contentStyle: `font-family:  STXinwei;  font-color: white;font-size: 1.5em;width: 98%; height: 90%; background:transparent; 
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
        bgUrl() {
            // 背景图片发生了变更
            console.log('背景图片发生了变更');
            if (this.bgUrl.startsWith('http')) {
                const img = new Image();
                img.crossOrigin = "anonymous"
                img.onload = () => {
                    const imgPalette = this.colorthief.getPalette(img).map(color => {
                        console.log('color--->', color);
                        return TinyColor( `rgb(${color.toString()})`).toHexString(); });
                    const imgColor = TinyColor(
                        `rgb(${this.colorthief.getColor(img).toString()})`
                    ).toHexString();
                    this.imgColor.palette = imgPalette;
                    this.imgColor.color = imgColor;
                    this.bgColorInput = this.imgColor.color;
                    console.log('图片识别完成 --> ', this.imgColor);
                };
                img.src = this.bgUrl;
            }
        }
    },
    computed: {
        show() {
            let bg = this.bgColorInput ? this.bgColorInput.trim() : this.imgColor.color;
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

            // 自动识别
            let reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.addEventListener(
                'load',
                async () => {
                    const img = new Image();
                    img.onload = () => {
                        const imgPalette = this.colorthief.getPalette(img).map(color => {
                            console.log('color--->', color);
                            return TinyColor( `rgb(${color.toString()})`).toHexString(); });
                        const imgColor = TinyColor(
                            `rgb(${this.colorthief.getColor(img).toString()})`
                        ).toHexString();
                        this.imgColor.palette = imgPalette;
                        this.imgColor.color = imgColor;
                        this.bgColorInput = this.imgColor.color;
                        console.log('图片识别完成 --> ', this.imgColor);
                    };
                    img.src = reader.result;
                },
                false
            );

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
.img-colors {
    .img-color {
        div:not(.nya-subtitle) {
            padding: 10px;
            display: inline-block;
            color: #ffffff;
            text-shadow: 2px 2px 2px rgba($color: #000000, $alpha: 0.2);
        }
    }
    .img-palette {
        margin-top: 15px;
        ul {
            padding: 0;
            margin: 0;
        }
        li {
            margin: 0;
            display: inline-block;
            font-size: 16px;
            box-sizing: border-box;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            text-shadow: 2px 2px 2px rgba($color: #000000, $alpha: 0.2);
            @media (max-width: 850px) {
                width: 30%;
            }
        }
    }
}
</style>
