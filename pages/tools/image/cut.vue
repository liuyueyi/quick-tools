<template>
    <div class="cut">
        <nya-container title="图片裁剪">
            <div class="form-row">
                <div class="custom-file col-md-3">
                    <input
                        ref="input"
                        type="file"
                        name="image"
                        class="form-control"
                        accept="image/*"
                        @change="setImage"
                    />
                </div>
                <div class="form-group col-md-9">
                    <button class="btn btn-outline-primary" @click="zoom(0.2)">放大</button>
                    <button class="btn btn-outline-primary " @click="zoom(-0.2)">缩小</button>
                    <button class="btn btn-outline-primary " @click="move(-10, 0)">左移</button>
                    <button class="btn btn-outline-primary " @click="move(10, 0)">右移</button>
                    <button class="btn btn-outline-primary " @click="move(0, -10)">上移</button>
                    <button class="btn btn-outline-primary " @click="move(0, 10)">下移</button>
                    <button class="btn btn-outline-primary " @click="flipX">左右镜像°</button>
                    <button class="btn btn-outline-primary " @click="flipY">上下镜像°</button>
                </div>
            </div>

            <div class="form-group">
                <span class="form-label required"><b>裁剪框(回车确认)</b></span>
                <span class="form-label required">宽(像素)</span>
                <input type="number" class="form-control-sm" v-model="width" @keyup.enter="updateCropperWH"
                       @blur="updateCropperWH"/>
                <span>高(像素)</span>
                <input type="number" class="input form-control-sm" v-model="height" @keyup.enter="updateCropperWH"
                       @blur="updateCropperWH"/>

                <span class="form-label required">旋转度数</span>
                <input type="number" class="form-control-sm" v-model="r">
                <button class="btn btn-outline-primary btn-sm" @click="rotate(-1)">左转{{ r }}°</button>
                <button class="btn btn-outline-primary btn-sm" @click="rotate(1)">右转{{ r }}°</button>
            </div>
            <div class="form-group">
                <button class="btn btn-outline-primary" @click="reset">重置</button>
                <button class="btn btn-outline-danger col-2" @click="cropImage">保存</button>
            </div>


            <div class="content top-padding-1em">
                <section class="cropper-area">
                    <div class="img-cropper">
                        <client-only>
                            <vue-cropper
                                ref="cropper"
                                :aspect-ratio="radio"
                                :src="imgSrc"
                                @zoom="cropMove"
                                @ready="cropMove"
                                @cropmove="cropMove"
                                preview=".preview"
                            />
                        </client-only>
                        <small>
                            原图宽 = {{ this.maxW }} 高 = {{ this.maxH }} <br/>
                            裁剪宽 = {{ this.width }} 高 = {{ this.height }}
                        </small>
                    </div>
                </section>
                <section class="preview-area">
                    <p>预览</p>
                    <div class="preview"/>
                    <p>裁剪结果<small>(右键保存)</small></p>

                    <div class="cropped-image">
                        <img
                            v-if="cropImg"
                            :src="cropImg"
                            alt="裁剪图"
                        />
                        <div v-else class="crop-placeholder"/>
                    </div>
                </section>
            </div>
        </nya-container>

        <nya-foot-info title="说明">
            <li>图片裁剪功能基于<a href="https://github.com/fengyuanchen/cropperjs" target="_blank">cropperjs</a>实现，请右键保存裁剪后的图片
            </li>
            <li>如果生成时间过长或生成失败，请使用其他浏览器，推荐使用 Chrome</li>
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
            imgSrc: "data:image/jpeg;base64,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",
            cropImg: '',
            data: null,
            containData: null,
            imgData: null,
            width: 960,
            height: 320,
            maxW: 960,
            maxH: 320,
            r: 90,
            radio: NaN,
        };
    },
    methods: {
        init() {
            this.data = this.$refs.cropper.getData();
            this.imgData = this.$refs.cropper.getImageData();
            this.containData = this.$refs.cropper.getContainerData();
            this.maxW = this.imgData.naturalWidth;
            this.maxH = this.imgData.naturalHeight;
            console.log('img', JSON.stringify(this.imgData), "container", JSON.stringify(this.containData));
        },
        updateCropperWH() {
            // 调整裁剪框大小
            try {
                this.init();
                this.width = parseInt(this.width);
                this.height = parseInt(this.height);
                if (this.width > this.maxW) {
                    this.width = this.maxW;
                }
                if (this.height > this.maxH) {
                    this.height = this.maxH;
                }

                this.data.width = this.width;
                this.data.height = this.height;
                this.$refs.cropper.setData(this.data);
            } catch (e) {
                console.log("some error", e);
            }
        },
        cropMove() {
            this.init();
            if (this.data.width !== this.width) {
                this.width = parseInt(this.data.width);
            }
            if (this.data.height !== this.height) {
                this.height = parseInt(this.data.height);
            }

        },
        cropImage() {
            let img = this.$refs.cropper.getCroppedCanvas().toDataURL();
            this.cropImg = img;
            // this.cropImg = URL.createObjectURL(dataURLtoBlob(img));
        },
        flipX() {
            const dom = this.$refs.flipX;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleX(scale);
            dom.setAttribute('data-scale', scale);
        },
        flipY() {
            const dom = this.$refs.flipY;
            let scale = dom.getAttribute('data-scale');
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleY(scale);
            dom.setAttribute('data-scale', scale);
        },

        getData() {
            this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
        },
        move(offsetX, offsetY) {
            this.$refs.cropper.move(offsetX, offsetY);
        },
        reset() {
            this.$refs.cropper.reset();
            this.r = 90;
            this.init();
            this.cropMove();
        },
        rotate(deg) {
            if (deg > 0) {
                this.$refs.cropper.rotate(parseInt(this.r));
            } else {
                this.$refs.cropper.rotate(0 - parseInt(this.r));
            }
        },
        setImage(e) {
            const file = e.target.files[0];
            if (file.type.indexOf('image/') === -1) {
                this.$noty.success('请选择需要编辑的图片', {timeout: 500});
                return;
            }
            if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.imgSrc = event.target.result;
                    this.$refs.cropper.replace(event.target.result);
                    this.init();
                };
                reader.readAsDataURL(file);
            } else {
                this.$noty.error('文件阅读API权限未开哦~', {timeout: 500});
            }
        },
        zoom(percent) {
            this.$refs.cropper.relativeZoom(percent);
        },
    }
};
</script>

<style lang="scss">

.cut {
    .form-group {
        input {
            border: 1px solid #ced4da;
        }
    }
}


.content {
    display: flex;
    justify-content: space-between;
}

.cropper-area {
    width: 614px;
}

.preview-area {
    width: 307px;
    margin-top: -3rem;
}

.preview-area p {
    font-size: 1.25rem;
    margin: 0;
    margin-bottom: 1rem;
}

.preview-area p:last-of-type {
    margin-top: 1rem;
}

.preview {
    width: 100%;
    height: calc(372px * (9 / 16));
    overflow: hidden;
}

.crop-placeholder {
    width: 100%;
    height: 200px;
    background: #ccc;
}

.cropped-image img {
    max-width: 100%;
}
</style>
