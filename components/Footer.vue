<template>
    <div class="vfooter">
        <div>
            <span class="small-font">
                更新时间: 2022-09-30 | 工具数量: <nya-link to="/">{{ this.toolNum }}</nya-link>
            </span>
        </div>
        <div>
            <span class="small-font">
                    © 2022 <a target="_blank" href="https://github.com/liuyueyi">一灰灰Blog</a> 版权所有 |
                <a href="http://beian.miit.gov.cn" target="_blank">鄂ICP备18017282号</a>
            </span>
        </div>
        <div>
            <span> {{ this.nowTime }} </span>
        </div>
        <div id="self_count_cnt" v-if="visit" v-html="visit">
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
            visit: "",
        }
    },
    mounted() {
        this.cnt();
    },
    methods: {
        cnt() {
            let site = this.$store.state.env.url + this.$route.path;
            this.$axios
                .get('https://story.hhui.top/count/ncc?appKey=tool&referer=' + decodeURI(site))
                .then(e => {
                    let result = e.data;
                    console.log(result);
                    if (result.status.code === 200) {
                        result = result.result;
                        this.visit = '本站总访量: <span class="visit_cnt">' + result.appVO.hot + '</span> &nbsp;| 总访问人次: <span class="visit_cnt">' + result.appVO.uv + '</span> &nbsp;| 恭喜您为第 <span class="visit_cnt">' + result.appVO.rank + '</span>&nbsp; 访问者';

                        let node = document.getElementById("tool_visit_count")
                        if (node) {
                            node.innerHTML = '当前工具访问次数：' + result.uriVO.hot;
                        }
                    }
                })
                .catch(err => {
                    this.$swal({
                        type: 'error',
                        title: '计数失败',
                        text: `ERROR: 获取数据失败，请刷新页面重试 ${err}`
                    });
                });
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

    .small-font {
        margin: 4px;
        font-size: .8em;
    }


    .visit_cnt {
        color: #e96900;
        font-size: 1.4em;
    }
}
</style>
