<template>
    <div class="vfooter">
        <div>
            <span style="margin:4px;font-size:.8em">
                    © 2022 <a target="_blank" href="https://github.com/liuyueyi">一灰灰Blog</a> 版权所有 |
                <a href="http://www.beian.miit.gov.cn" target="_blank">鄂ICP备18017282号</a>
            </span>
        </div>
        <div>
            <span> {{ this.nowTime }} </span>
        </div>
    </div>
</template>

<script>
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
    flex-direction: column;
    flex-wrap: wrap;

    a {
        color: #38b7ea;
        text-decoration: none;
    }
}
</style>
