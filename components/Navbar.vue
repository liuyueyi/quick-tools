<template>
    <nav class="navbar navbar-expand-md fixed-top" :class="$store.state.dark ? ' navbar-dark bg-dark' : ' navbar-light bg-light'">
        <a class="navbar-brand" href="/static">
            <img src="/icon.svg" width="30" height="30" alt="" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item selected-domain">
                    <a class="nav-link" href="/">工具箱</a>
                </li>
                <li
                    class="nav-item">
                    <a class="nav-link" href="/wechat">微信公众号编辑器</a>
                </li>
<!--                <li-->
<!--                    class="nav-item">-->
<!--                    <a class="nav-link" href="/interest">收藏</a>-->
<!--                </li>-->
            </ul>
<!--            <form class="form-inline my-md-0" action="/search" method="get" target="_blank">-->
<!--                <input name="key" required class="form-control mr-sm-2" type="text" placeholder="搜索">-->
<!--            </form>-->
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

export default {
    name: 'Navbar',
    components: {
        Panel
    }
};
</script>


<style lang="scss">
.selected-domain {
    border-bottom: 1px solid #28a745;
}
</style>
