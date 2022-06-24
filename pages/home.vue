<template>
    <div class="home">
        <Welcome/>
        <Search v-model="searchText" @enter="enterFirst">
            <template slot-scope="data">
                <nuxt-link
                    v-for="(tool, index) in data.data"
                    v-show="showBtn(tool)"
                    :key="index"
                    :target="$store.state.setting.inNewTab ? '_blank' : '_self'"
                    :to="tool.path"
                    class="nya-btn"
                >
                    {{ tool.name }}
                </nuxt-link>
            </template>
        </Search>
        <Favorites v-show="!searchText"/>

        <!-- 分类展示   -->
        <template v-show="!searchText">
            <nya-container
                v-for="(item, index) in $store.state.tools"
                v-show="!searchText && showSection(item)"
                :key="index"
                :icon="item.icon"
                :title="item.title"
            >
                <ToolBox :item="item"/>
            </nya-container>
        </template>

        <nya-container v-if="!$store.state.setting.hideNotice" v-show="!searchText" title="公告"
                       icon="volume-down-outline">
            <ul class="nya-list">
                <li>本项目基于 <a href="https://github.com/liuyueyi/quick-tools" target="_blank" rel="noopener noreferrer">QuickTools</a>
                    构建而成
                </li>
                <li>
                    <div class="badge-info">
                        <span class="badge hot">热门</span> <span class="badge vip">VIP</span> <span
                        class="badge new">新功能</span> <span class="badge recommend">推荐</span>
                    </div>
                </li>
                <li><b>欢迎将本站收藏到收藏夹，以便以后使用</b></li>
                <li>
                    本站域名：<a
                    :href="$store.state.env.url"
                    target="_blank"
                    rel="noopener noreferrer"
                >{{ $store.state.env.domain }}</a>
                </li>
                <li v-if="$store.state.isMobile.any">
                    如果遇到无法使用或者样式问题，请更换浏览器后重试，推荐使用 Chrome 浏览器，对 iOS 设备兼容性可能不太好
                </li>
            </ul>
        </nya-container>

        <nya-container v-if="!$store.state.setting.hidePay"
                       v-show="!searchText"
                       title="请作者喝一杯咖啡？"
                       icon="credit-card-outline">
            <div class="title">
                <small>支持微信,小程序,qq,支付宝</small>
            </div>
            <ul class="pay" v-show="!this.showOnePayQrcode">
                <li>
                    <img src="../static/imgs/qq.jpg" alt="qq">
                    <div class="name">
                        QQ
                    </div>
                </li>
                <li>
                    <img src="../static/imgs/weixin.jpg" alt="weixin">
                    <div class="name">
                        微信
                    </div>
                </li>
                <li>
                    <img src="../static/imgs/alipay.jpg" alt="alipay">
                    <div class="name">
                        支付宝
                    </div>
                </li>
            </ul>
            <li v-show="this.showOnePayQrcode">
                <img
                    src="data:image/png;base64,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DesHMxk6+yivn9q+dpqc6aQjJjuve60mjyiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIInor0QnHpgwnro9NIDXvONEIZwnUlxGbjtg3ChFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUS/m2jdThPok5U2a943GvaNlfUGrN/bdNj6WiaQJuAQRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEv4fopEj1ZasGdVOuyc7X9zZp1EkVfuJMqnoCf11VRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUU0XcSbTa8fuTNITSlmayqGUknhsnkbU0fNPWdVKEZA9HPEKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiugFRCdLmBzC+mfra3/1fpux0pBa3/mJ/Z7osKb/moGPKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogi+k6ikyVMrnutF3hy5a058nUCf4nP+mcnkOpBua8PGvKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiii7yRa50QD1iOk3m8zKCenManM+uh6vsPqFfyLgyiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIInoD0ZpAfUXt08Nqmmi9rA24+iTrZpuM4KYjTgyJfR2BKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogi+j1ET1ynaljsu6pYf996czRNPoG0XpmawL5BeeIqIKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiuhdRBsg9V+j40iaaHIxrWax78Je3dCT76s7tllL07GIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiNxCtG+bE9cD1FTTjp27UCYFJFZpma651TsbP5B0nLnMiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKI3k90cgj1tzRU9r1tsoK6UZsxta9u9TCpq7pec0QRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRR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">
            </li>
        </nya-container>
    </div>
</template>

<script>
import Favorites from '~/components/Favorites';
import Search from '~/components/Search';
import isMobile from 'ismobilejs';
import Welcome from '~/components/Welcome';
import ToolBox from "../components/ToolBox";

export default {
    name: 'Home',
    components: {
        Favorites,
        Search,
        Welcome,
        ToolBox,
    },
    head() {
        return {
            title: this.title
        };
    },
    props: {
        showOnePayQrcode: true,
    },
    data() {
        return {
            title: `${process.env.title} - ${process.env.description}`,
            searchText: '',
            isMobile
        };
    },
    computed: {
        toolsList() {
            let arr = [];
            this.$store.state.tools.forEach(tool => {
                arr = arr.concat(tool.list);
            });
            return arr;
        }
    },
    methods: {
        enterFirst(e) {
            if (this.$store.state.setting.inNewTab) {
                window.open(e.path);
            } else {
                this.$router.push(e.path);
            }
        },
        showSection(item) {
            return !(
                item.list.filter(i => {
                    return (
                        this.$store.state.setting.hide.indexOf(i.path) !== -1
                    );
                }).length === item.list.length
            );
        },
        showBtn(tool) {
            return this.$store.state.setting.hide.indexOf(tool.path) === -1;
        },
        updateShowPayWay() {
            this.showOnePayQrcode = !this.showOnePayQrcode;
        }
    }
};
</script>

<style lang="scss">
.home {
    span.mb {
        display: block;
        margin-bottom: 15px;
    }

    table {
        width: 100%;
        table-layout: auto;
    }

    ._ad {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nya-btn {
        position: relative;
        margin: 7px;
        width: calc(20% - 14px);
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.3s ease;
        background-color: transparent;
        font-size: 18px;
        border-radius: 4px;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px 0px rgba(10, 14, 29, 0.04),
            0px 8px 64px 0px rgba(10, 14, 29, 0.08);
        }

        @media (max-width: 1050px) {
            width: calc(25% - 14px);
        }
        @media (max-width: 900px) {
            width: calc(100% / 3 - 14px);
        }
        @media (max-width: 700px) {
            box-shadow: none;
            margin: 5px;
            width: calc(50% - 10px);
        }
    }

    .pay {
        width: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-around;

        li {
            margin: 0;
            list-style: none;
            padding: 10px;

            .name {
                text-align: center;
                font-size: 25px;
                font-weight: bold;
                margin-top: 5px;
            }

            img {
                width: 200px;
                max-width: 100%;
            }
        }
    }

    .badge {
        &::after {
            content: '';
            position: absolute;
            top: 5px;
            right: 5px;
            color: #fff;
            font-weight: lighter;
            text-shadow: 1px 1px 1px rgba($color: #000000, $alpha: 0.2);
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        &.new::after {
            background-color: var(--theme-success);
        }

        &.hot::after {
            background-color: var(--theme-danger);
        }

        &.vip::after {
            background-color: #f79817;
        }

        &.recommend::after {
            background-color: var(--theme);
        }
    }

    .badge-info {
        display: inline-flex;
        align-items: center;

        .badge {
            display: inline-flex;
            margin-right: 10px;
            align-items: center;

            &::after {
                position: relative;
                left: auto;
                margin-left: 10px;
                top: auto;
                display: inline-block;
            }
        }
    }
}
</style>
