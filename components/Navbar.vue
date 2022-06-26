<template>
    <nav class="navbar navbar-expand-md fixed-top"
         :class="$store.state.dark ? ' navbar-dark nav-bg-dark' : ' navbar-light nav-bg-light'">
        <a class="navbar-brand" href="/">
            <img src="/icon.svg" width="30" height="30" alt="" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"
                @click="showOrHide">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" :class="getTabActivatedClz('/')">
                    <a class="nav-link" href="/"> 工具箱</a>
                </li>
                <li v-for="(item, i) in tabLinks" class="nav-item" :class="getTabActivatedClz(item['path'])">
                    <a class="nav-link" :href="item['path']"> {{ item.tab }} </a>
                </li>
            </ul>
            <!-- 搜索，只有非主页以及主页且隐藏搜索框时才显示 -->
            <form class="form-inline my-md-0" action="/search" method="get"
                  :target="this.$route.path !== '/' ? '_blank' : '_self'"
                  v-show="this.$route.path !== '/' || this.$store.state.setting.hideHomeSearch">
                <input name="key" required class="form-control mr-sm-2" type="text" placeholder="搜索">
            </form>

            <!--   登录功能   -->
            <ul class="navbar-nav my-md-0">
                <li class="nav-item" @click="login">
                    <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">登录</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import Panel from '~/components/Panel';
import Search from "./Search";

export default {
    name: 'Navbar',
    components: {
        Search,
        Panel
    },
    data() {
        return {
            tabLinks: [
                {path: "/favorite", tab: "收藏"},
                {path: "/setting", tab: "设置"},
            ],
        }
    },
    methods: {
        inTabLink(path) {
            for (let i = 0; i < this.tabLinks.length; i++) {
                if (this.tabLinks[i]["path"] === path) {
                    return true;
                }
            }
            return false;
        },
        /**
         * 除了首页外，只有当前路径与当前tab相同，才表示这个tab被选中；
         * 对于不匹配的场景，全部当作是工具箱被选中
         * @param path
         * @returns {string}
         */
        getTabActivatedClz(path) {
            const localPath = this.$route.path;
            let res;
            if (this.inTabLink(path)) {
                // 对于tabLinks 中的菜单，必须是当前path与它相同时，才表示选中
                res = localPath.startsWith(path) ? 'active' : '';
            } else {
                let otherTabChoose = false;
                for (let i = 0; i < this.tabLinks.length; i++) {
                    if (localPath.startsWith(this.tabLinks[i]['path'])) {
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
        },
        login() {
            this.$noty.success('登录功能尚未完成，敬请期待');
        },
        showOrHide() {
            let display = document.getElementById('collapsibleNavbar').style.display;
            if (display && display == 'block') {
                document.getElementById('collapsibleNavbar').style.display = 'none';
            } else {
                document.getElementById('collapsibleNavbar').style.display = 'block';
            }
            console.log('dis', display);
        },
    }
};
</script>


<style lang="scss">
.nav-bg-light {
    background-color: #fff;
    border-bottom: 1px solid #f2f6fc;
}

.nav-bg-dark {
    background-color: #333;
    border-bottom: 1px solid #32363c;
}

nav {
    .selected-domain {
        border-bottom: 1px solid #28a745;
    }

    .selected-domain a .nav-link {
        color: #004fc4;
    }

    a {
        font-weight: bold;
        font-size: .9em;
    }

    .active {
        font-size: 1.1em;
    }
}
</style>
