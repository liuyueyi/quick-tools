<template>
    <div class="vfooter">
        <!--        <span>-->
        <!--    <div class="w">-->
        <!--        <p class="declare">-->
        <!--            <a rel="nofollow" href="https://tool.hhui.top/">首页</a>-->
        <!--            <br>-->
        <!--            Copyright © 2011-2022 @一灰灰 {{ nowTime }}<br>-->
        <!--            <a href="http://www.beian.miit.gov.cn" target="_blank">鄂ICP备18017282号</a>-->
        <!--        </p>-->
        <!--</div>-->
        <!--        </span>-->

        <div id="footer-info" class="inner">
        <span style="margin:4px;font-size:.8em">
                © 2022 <a target="_blank" href="https://github.com/liuyueyi">一灰灰Blog</a> 版权所有 |
            <a href="http://www.beian.miit.gov.cn" target="_blank">鄂ICP备18017282号</a>
        </span>
            <br/>
            <span> {{ this.nowTime }} </span>
        </div>
    </div>
</template>

<script>
if (process.browser) {
    require('../assets/fonts/iconfont/iconfont');
}
export default {
    name: 'Vfooter',
    props: {
        nowTime: {
            type: String,
            default: String(new Date())
        },
    }
};
</script>

<style lang="scss">
.vfooter {
    margin: 20px auto;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        color: #38b7ea;
        text-decoration: none;
    }
}
</style>
