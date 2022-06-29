<template>
    <div v-show="$route.path !== '/'" class="float-btn">
        <ul>
            <li title="代码" @click="$modal.show('code')">
                <i class="eva eva-code"></i>
            </li>
            <li title="打赏" @click="$modal.show('pay')">
                <i class="eva eva-gift"></i>
            </li>
            <li title="手机" @click="viewInPhone">
                <i class="eva eva-smartphone-outline"></i>
            </li>
            <li title="分享" @click="share">
                <i class="eva eva-share"></i>
                <span></span>
            </li>
        </ul>
        <div class="main" :title="collected ? '收藏本工具' : '取消收藏'" @click="collect">
            <i v-if="collected" class="eva eva-star"></i>
            <i v-else class="eva eva-star-outline"></i>
        </div>
        <client-only>
            <modal class="code" name="code" height="auto" width="500" reset adaptive>
                <div class="title">
                    将以下代码放到你的网页中
                </div>
                <Dynamic tag="pre" :template="iframeText"/>
            </modal>
            <modal class="pay" name="pay" height="auto" width="300" reset adaptive>
                <div class="title">
                    请作者喝一杯咖啡？
                    <small>支持微信,qq,支付宝</small>
                </div>
                <img src="data:image/png;base64,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DesHMxk6+yivn9q+dpqc6aQjJjuve60mjyiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIInor0QnHpgwnro9NIDXvONEIZwnUlxGbjtg3ChFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUS/m2jdThPok5U2a943GvaNlfUGrN/bdNj6WiaQJuAQRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEv4fopEj1ZasGdVOuyc7X9zZp1EkVfuJMqnoCf11VRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUU0XcSbTa8fuTNITSlmayqGUknhsnkbU0fNPWdVKEZA9HPEKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiugFRCdLmBzC+mfra3/1fpux0pBa3/mJ/Z7osKb/moGPKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogi+k6ikyVMrnutF3hy5a058nUCf4nP+mcnkOpBua8PGvKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiii7yRa50QD1iOk3m8zKCenManM+uh6vsPqFfyLgyiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIInoD0ZpAfUXt08Nqmmi9rA24+iTrZpuM4KYjTgyJfR2BKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogi+j1ET1ynaljsu6pYf996czRNPoG0XpmawL5BeeIqIKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiuhdRBsg9V+j40iaaHIxrWax78Je3dCT76s7tllL07GIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiNxCtG+bE9cD1FTTjp27UCYFJFZpma651TsbP5B0nLnMiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKI3k90cgj1tzRU9r1tsoK6UZsxta9u9TCpq7pec0QRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRR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">
            </modal>
            <modal class="phone" name="phone" height="auto" width="300" reset adaptive>
                <div class="title">
                    在其他设备上使用
                </div>
                <img :src="qrcodeUrl" alt="pay">
            </modal>
            <modal class="share" name="share" height="auto" width="300" reset adaptive>
                <div class="title">
                    分享当前工具到
                </div>
                <div class="list">
                    <a :href="`http://connect.qq.com/widget/shareqq/index.html?url=${shareData.url}&desc=${shareData.title}&pics=${shareData.pic}`"
                       target="_blank" rel="noopener noreferrer">QQ</a>
                    <a :href="`http://qr.liantu.com/api.php?text=${shareData.url}`" target="_blank"
                       rel="noopener noreferrer">微信</a>
                    <a :href="`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareData.url}&title=${shareData.title}&pics${shareData.pic}=&summary=${shareData.content}`"
                       target="_blank" rel="noopener noreferrer">QQ空间</a>
                    <a :href="`http://service.weibo.com/share/share.php?url=${shareData.url}&title=${shareData.title}&pic=${shareData.pic}&searchPic=false`"
                       target="_blank" rel="noopener noreferrer">微博</a>
                    <a :href="`http://www.douban.com/share/service?href=${shareData.url}&name=${shareData.title}&text=${shareData.content}&image=${shareData.pic}`"
                       target="_blank" rel="noopener noreferrer">豆瓣</a>
                    <a :href="`http://widget.renren.com/dialog/share?resourceUrl=${shareData.url}&srcUrl=${shareData.url}&title=${shareData.title}&description=${shareData.content}`"
                       target="_blank" rel="noopener noreferrer">人人</a>
                    <a :href="`https://twitter.com/intent/tweet?text=${shareData.title}&url=${shareData.url}`"
                       target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareData.url}&t=${shareData.title}&pic=${shareData.pic}`"
                       target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a :href="`https://www.linkedin.com/shareArticle?title=${shareData.title}&summary=${shareData.content}&mini=true&url=${shareData.url}&ro=true`"
                       target="_blank" rel="noopener noreferrer">Linkedin</a>
                </div>
            </modal>
        </client-only>
    </div>
</template>

<script>
import QR from 'qr-image';
import _ from 'lodash';
import Dynamic from './Dynamic';

export default {
    name: 'FloatBtn',
    components: {
        Dynamic
    },
    data() {
        return {
            qrcodeUrl: ''
        };
    },
    computed: {
        iframeText() {
            return `<span style="color: #a1a8b5;">&lt;</span><span style="color: rgb(224, 108, 117);">iframe</span> <span style="color: rgb(209, 154, 102);">src</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"${
                this.$store.state.env.url
            }${
                this.$route.path
            }"</span> <span style="color: rgb(209, 154, 102);">width</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"100%"</span> <span style="color: rgb(209, 154, 102);">height</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"400px"</span> <span style="color: rgb(209, 154, 102);">scrolling</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"no"</span> <span style="color: rgb(209, 154, 102);">style</span><span style="color: #a1a8b5;">=</span><span style="color: rgb(152, 195, 121);">"border:0px;"</span><span style="color: #a1a8b5;">&gt;</span><span style="color: #a1a8b5;">&lt;</span><span style="color: #a1a8b5;">/</span><span style="color: rgb(224, 108, 117);">iframe</span><span style="color: #a1a8b5;">&gt;</span>`;
        },
        collected() {
            const path = this.$route.path;
            let flag = this.$store.state.setting.favorites.indexOf(path);
            return flag !== -1;
        },
        shareData() {
            if (this.$route.path === '/') return {};
            if (!this.$store.state.currentTool) return {};
            let description = this.$store.state.currentTool.head.meta.filter(
                e => e.description
            );
            if (description.length) {
                description = description[0].description;
            }
            return {
                url: process.env.url + this.$route.path,
                title: this.$store.state.currentTool.name,
                content: description,
                pic: process.env.url + '/icon.png'
            };
        }
    },
    methods: {
        collect() {
            const path = this.$route.path;
            if (path === '/') {
                return false;
            }
            let favorites = _.chain(this.$store.state.setting.favorites);
            let flag = favorites.indexOf(path).value();
            if (flag === -1) {
                favorites.push(path).value();
                this.$noty.success('收藏成功');
            } else {
                favorites.pull(path).value();
                this.$noty.success('取消收藏成功');
            }
            this.$store.commit('SET_STORE', {
                key: 'setting.favorites',
                value: favorites.value()
            });
        },
        viewInPhone() {
            const QRData = QR.imageSync(process.env.url + this.$route.path, {
                type: 'jpg',
                size: 10,
                margin: 0
            });
            this.qrcodeUrl =
                `data:image/jpg;base64,` + QRData.toString('base64');
            this.$modal.show('phone');
        },
        share() {
            this.$modal.show('share');
        }
    }
};
</script>


<style lang="scss">
.float-btn {
    position: relative;
    z-index: 999;
    position: fixed;
    right: 20px;
    bottom: 30px;

    &:hover {
        ul {
            opacity: 1;
        }
    }

    .code {
        pre {
            margin-bottom: 0;
            margin-top: 0;
            border: none;
            background-color: #282c34;
        }
    }

    ul {
        margin: 0 auto;
        padding: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        opacity: 0;
        transition: all 0.3s ease;
        @media (max-width: 600px) {
            display: none;
        }

        li {
            cursor: pointer;
            list-style: none;
            margin-bottom: 15px;
            padding: 0;
            font-size: 25px;
            background-color: var(--theme);
            color: #ffffff;
            width: 40px;
            height: 40px;
            box-sizing: border-box;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .main {
        cursor: pointer;
        width: 55px;
        height: 55px;
        background-color: var(--theme);
        border-radius: 50%;
        box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
        1px 3px 8px rgba(39, 44, 49, 0.03);
        display: flex;
        align-items: center;
        justify-content: center;

        i {
            font-size: 20px;
            color: #eeeeee;
        }
    }

    .title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #d8d8d8;
        color: #222831;
    }

    .pay,
    .phone {
        img {
            padding: 20px;
            box-sizing: border-box;
            width: 100%;
        }
    }

    .share {
        .list {
            padding: 8px;

            a {
                display: inline-block;
                margin: 8px;
                font-size: 18px;
            }
        }
    }
}
</style>
