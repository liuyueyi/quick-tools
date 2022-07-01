<template>
    <div class="vfooter">
        <div>
            <span class="small-font">
                更新时间: 2022-07-01 | 工具数量: <nya-link to="/">{{ this.toolNum }}</nya-link>
            </span>
        </div>
        <div>
            <span class="small-font">
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
        }
    },
    data() {
        let num = 0;
        this.$store.state.tools.forEach(tool => {
            num += tool.list.length;
        });
        return {
            toolNum: num,
        }
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

    .small-font {
        margin: 4px;
        font-size: .8em;
    }
}
</style>
