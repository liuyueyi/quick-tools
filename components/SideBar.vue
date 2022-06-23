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
                <li v-if="$store.state.isMobile.any">
                    如果遇到无法使用或者样式问题，请更换浏览器后重试，推荐使用 Chrome 浏览器，对 iOS 设备兼容性可能不太好
                </li>
                <li>
                    <a href="https://github.com/liuyueyi/quick-tools/issues/new/choose">贡献idea</a>
                </li>
                <li>
                    <a href="https://github.com/liuyueyi/quick-tools/issues/new/choose">找BUG</a>
                </li>
            </ul>
        </nya-panel>

        <nya-panel head="打赏" v-if="!$store.state.setting.hidePay">
            <div>
                <img src="/imgs/qq.png" alt="qq">
                <div class="name">
                    QQ
                </div>
            </div>
            <div>
                <img src="/imgs/weixin.png" alt="weixin">
                <div class="name">
                    微信
                </div>
            </div>
            <div>
                <img src="/imgs/alipay.png" alt="alipay">
                <div class="name">
                    支付宝
                </div>
            </div>
            </ul>
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

export default {
    name: 'Panel',
    components: {NyaPanel, NyaReadonlyInput},
    props: {},
    data() {
        return {
            currentPath: process.env.url + this.$route.fullPath,
        }
    }
};
</script>

<style lang="scss">

</style>
