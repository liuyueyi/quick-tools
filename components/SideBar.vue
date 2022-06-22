<template>
    <div>
        <NyaReadonlyInput v-if="this.$route.path !== '/'"
                          :val="copyVal"
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
                <!--                <li>-->
                <!--                    <div class="badge-info">-->
                <!--                        <span class="badge hot">热门</span> <span class="badge vip">VIP</span> <span-->
                <!--                        class="badge new">新功能</span> <span class="badge recommend">推荐</span>-->
                <!--                    </div>-->
                <!--                </li>-->
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
        </nya-panel>
    </div>
</template>

<script>
import NyaPanel from "./UI/nya-panel";
import NyaReadonlyInput from "./UI/nya-readonly-input";

export default {
    name: 'Panel',
    components: {NyaPanel, NyaReadonlyInput},
    props: {
        copyVal: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.copyVal = process.env.url + this.$route.fullPath;
    },
    methods: {
        copyValue(value) {
            if (!value) {
                return;
            }

            this.$copyText(String(value)).then(
                () => {
                    this.$noty.success('复制成功', {timeout: 500});
                },
                () => {
                    this.$noty.error('复制失败，请手动选择复制', {timeout: 500});
                }
            );
        }
    }
};
</script>

<style lang="scss">

</style>
