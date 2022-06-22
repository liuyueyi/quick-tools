<template>
    <nav class="navbar navbar-expand-md fixed-top"
         :class="$store.state.dark ? ' navbar-dark bg-dark' : ' navbar-light bg-light'">
        <a class="navbar-brand" href="/">
            <img src="/icon.svg" width="30" height="30" alt="" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" :class="subTitleChecked('/')">
                    <a class="nav-link" href="/"> 工具箱</a>
                </li>
                <li class="nav-item" :class="subTitleChecked('/wechat')">
                    <a class="nav-link" href="/wechat">微信公众号编辑器</a>
                </li>
                <li class="nav-item" :class="subTitleChecked('/favorite')">
                    <a class="nav-link" href="/favorite">收藏</a>
                </li>
                <li class="nav-item" :class="subTitleChecked('/setting')">
                    <a class="nav-link" href="/setting">设置</a>
                </li>
                <li class="nav-item" :class="subTitleChecked('/links')">
                    <a class="nav-link" href="/links">友链</a>
                </li>
            </ul>
            <!-- 搜索，只有非主页时才显示 -->
            <form class="form-inline my-md-0" action="/search" method="get" target="_blank"
                  v-if="this.$route.path !== '/'">
                <input name="key" required class="form-control mr-sm-2" type="text" placeholder="搜索">
            </form>
            <ul class="navbar-nav my-md-0">
                <li class="nav-item">
                    <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">登录</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import Panel from '~/components/Panel';
import Search from "./Search";

const TAB_LINK = [
    "/setting", "/links", "/wechat", "/favorite"
];
export default {
    name: 'Navbar',
    components: {
        Search,
        Panel
    },
    methods: {
        inTabLink(path) {
            for (let i = 0; i < TAB_LINK.length; i++) {
                if (TAB_LINK[i] === path) {
                    return true;
                }
            }
            return false;
        },
        subTitleChecked(path) {
            const localPath = this.$route.path;
            let res;
            if (this.inTabLink(path)) {
                res = localPath.startsWith(path) ? 'active' : '';
            } else {
                let otherTabChoose = false;
                for (let i = 0; i < TAB_LINK.length; i++) {
                    if (localPath.startsWith(TAB_LINK[i])) {
                        res = '';
                        otherTabChoose = true;
                        break
                    }
                }
                if (!otherTabChoose) {
                    // 若当前路径非TAB_LINK中页面，则将工具箱设置为选中
                    res = 'active';
                }
            }
            return res;
        }
    }
};
</script>


<style lang="scss">
.selected-domain {
    border-bottom: 1px solid #28a745;
}

.selected-domain a .nav-link {
    color: #004fc4;
}

</style>
