<template>
    <div>
        <NyaReadonlyInput v-if="this.$route.path !== '/'"
                          :val="currentPath"
                          :copy-icon="true">
        </NyaReadonlyInput>

        <nya-panel
            title="站长"
            text="一个神奇的百宝箱，收集各路小工具">
            <div class="form-control" style="border: 0">
                @一灰灰 &nbsp;
                <a href="mailto:bangzewu@126.com" style="text-decoration: none;"><i class="eva eva-email-outline"/></a>
                <a href="https://github.com/liuyueyi/quick-tools" target="_blank"><i
                    class="eva eva-github-outline"/></a>
            </div>
        </nya-panel>


        <nya-panel head="公告" v-if="!$store.state.setting.hideNotice">
            <ul class="nya-list">
                <li>本项目基于 <a href="https://github.com/liuyueyi/quick-tools" target="_blank" rel="noopener noreferrer">QuickTools</a>
                    构建而成
                </li>
                <li>
                    首页组件展示可到设置页面调整哦
                </li>
                <li>
                    对于常用的工具，加入收藏之后可再收藏页面直接查看
                </li>
                <li><b>欢迎将本站收藏到收藏夹，以便以后使用</b></li>
                <li>
                    本站域名：<a
                    :href="$store.state.env.url"
                    target="_blank"
                    rel="noopener noreferrer"
                >{{ $store.state.env.domain }}</a>
                </li>
                <li>
                    友链：
                    <nya-link :to="`/links`">维护人员 & 引用技术栈</nya-link>
                </li>
                <li v-if="$store.state.isMobile.any">
                    如果遇到无法使用或者样式问题，请更换浏览器后重试，推荐使用 Chrome 浏览器，对 iOS 设备兼容性可能不太好
                </li>
                <li>
                    重在参与：
                    <a href="https://github.com/liuyueyi/quick-tools/issues/new/choose">贡献idea</a>
                    <a href="https://github.com/liuyueyi/quick-tools/issues/new/choose">找BUG</a>
                </li>
            </ul>
        </nya-panel>

        <nya-panel head="请作者喝一杯咖啡？" v-if="!$store.state.setting.hidePay" class="text-center"
                   :sub-title="this.showOnePayQrcode ? '聚合收款码': '打赏码'">
            <button class="nya-btn " @click="updateShowPayWay">切换</button>
            <div class="text-center" v-if="this.showOnePayQrcode">
                <img
                    src="data:image/png;base64,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DesHMxk6+yivn9q+dpqc6aQjJjuve60mjyiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIInor0QnHpgwnro9NIDXvONEIZwnUlxGbjtg3ChFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUS/m2jdThPok5U2a943GvaNlfUGrN/bdNj6WiaQJuAQRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEv4fopEj1ZasGdVOuyc7X9zZp1EkVfuJMqnoCf11VRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUU0XcSbTa8fuTNITSlmayqGUknhsnkbU0fNPWdVKEZA9HPEKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiugFRCdLmBzC+mfra3/1fpux0pBa3/mJ/Z7osKb/moGPKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogi+k6ikyVMrnutF3hy5a058nUCf4nP+mcnkOpBua8PGvKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiii7yRa50QD1iOk3m8zKCenManM+uh6vsPqFfyLgyiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIInoD0ZpAfUXt08Nqmmi9rA24+iTrZpuM4KYjTgyJfR2BKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogi+j1ET1ynaljsu6pYf996czRNPoG0XpmawL5BeeIqIKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiuhdRBsg9V+j40iaaHIxrWax78Je3dCT76s7tllL07GIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiNxCtG+bE9cD1FTTjp27UCYFJFZpma651TsbP5B0nLnMiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKI3k90cgj1tzRU9r1tsoK6UZsxta9u9TCpq7pec0QRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFNHvJtpcdJs05YnmODFgGsqTVqzHRQOpvpZYX9w8W19EEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRTRG4hOGr8mcKIVJ42wrynrFdSrb8BNzmVfBesLmYgiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKJvIvrpIey7JlW3cfPNk9Zp+NQXGSdvm4zqesDUQ2K9r5o+QBRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEb2faFOas005WfO+wbZvTNUX2BpcE+hNd54YsogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKJvJ1pfBmtaomn3esBMTmMCqb66N1nBZMTV1+/2/Ww0PzmIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiii9xONXpdsaXIVa51Z3Z6T82uw1uNnUsHn2U5479svoogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKK6NuJ1q3YNHl9jbAm1ax+X90mlwz39Utz9XHyI7DxRwVRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUX0KqKTQ50sv/lsfT1rfZjU+60v4k3aswb310f6kdNAFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRvYDopxv+SbK+ufqSV72WCYtmpfXVuMl4bBCeGMtPXRhFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRvZ9o3XbrDdOMkEkDnqAyGXGTEz8xbvedy3rNnx/GiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIoooom8ius6noVIX6cT/1Y06GaP7qlBf56vP5W8ORUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFNH7idb5OZCzBdnXvFGpY+jr7XliBDdnMOkcRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUU0W8kug9D83/rx1uzqC+InRg69bidVGH91JpqNc/qAY0ooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCJ6F9F6c3XbTUZNc9D7BlHddvVIWv/rhHxThcmOJl2HKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogi+k6i+468OcDJ/+1ricmAaZptH9t6b2fHyuTs13eOKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogi+naidSbln6BpBsdTq5oUfZ1es996xJ1g2+y3wYoooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCJ6A9Hnr0Stl2syEJpRs76C+lv2YW1O96mRtK+WzVoQRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEbyX6bzlNYzXlqj+x7wLg5P8ahPWFuH3/Nxna9QhpfpAQRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFE7yfabPNEo06Od0JvAmkCvf5ss9+zq6p5N7tEFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRfSTI2q22ZSmaY4TA6Ymv36ST61q3wg5u8tf7AhRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUU0V8yawDXLbY+Gibf0oyfpu0m/9dUsDnJs+tDFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRfSfR5rMNpLolJsWsB0yzghME1vc76at6aDfrq/eGKKKIIooooogiiiiiiCKKKKKIIooooogiiiiiiCKKKKKIIooooogiehfR5uJcc8Xq0/U1O5oMjnq/TXs+ddlvUsHm2t/kp2Qygn+xKkQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFFFEEUUUUUQRRRRRRBFFFNELiIrIE0FUBFERQVQEURFBVEQQFUFURBAVQVREEBURREUQFRFERRAVEURFBFERREUEURFERQRREUFUBFERQVQEUUcggqiIICqCqIggKiKIiiAqIoiKICoiiIoIoiKIigiiIoiKCKIigqjI1fkfthkdK6lPXiAAAAAASUVORK5CYII=">
            </div>
            <div v-else class="text-center">
                <div>
                    <div class="name">微信</div>
                    <img src="/imgs/weixin.jpg" alt="weixin">
                </div>
                <div>
                    <div class="name">小程序</div>
                    <img src="/imgs/wxpay.jpg" alt="weixin">
                </div>
                <div>
                    <div class="name">支付宝</div>
                    <img src="/imgs/alipay.jpg" alt="alipay">
                </div>
                <div>
                    <div class="name">QQ</div>
                    <img src="/imgs/qq.jpg" alt="qq">
                </div>
            </div>
        </nya-panel>

        <no-ssr>
            <!-- 谷歌广告不采用服务器渲染 -->
            <div class="nya-container">
                <script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5592000528061748"
                        crossorigin="anonymous"></script>
                <!-- quick-tool-sidebar-ads -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-5592000528061748"
                     data-ad-slot="5535461110"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
        </no-ssr>
    </div>
</template>

<script>
import NyaPanel from "./UI/nya-panel";
import NyaReadonlyInput from "./UI/nya-readonly-input";
import isMobile from 'ismobilejs';
import Template from "../pages/tools/code/cdnjs";

export default {
    name: 'Panel',
    components: {Template, NyaPanel, NyaReadonlyInput},
    props: {
        showOnePayQrcode: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            currentPath: process.env.url + this.$route.fullPath,
            isMobile
        }
    },
    methods: {
        updateShowPayWay() {
            this.showOnePayQrcode = !this.showOnePayQrcode;
        }
    }
};
</script>

<style lang="scss">

</style>
