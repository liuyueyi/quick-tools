<template>
    <div class="url_format">
        <nya-container title="HTTP解析">
            <div class="nya-subtitle mt-15">
                选择
            </div>
            <div class="radio-group">
                <nya-radio-group v-model="index">
                    <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                </nya-radio-group>
            </div>

            <nya-input
                v-model.trim="context"
                label="请输入"
                :placeholder="labels[index].place"
                rows="5"
                type="textarea"
                autocomplete="on"
                autofocus
                fullwidth
            />
            <div class="top-padding">
                <nya-container v-if="results" title="解析结果">
                    <nya-copy :copy="results">
                        <pre v-text="results"></pre>
                    </nya-copy>
                </nya-container>

            </div>
        </nya-container>

        <nya-foot-info title="Tips"></nya-foot-info>
    </div>
</template>

<script>
import formatUrl from '~/utils/formatUrl.js';

export default {
    name: 'UrlFormat',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            context: '',
            index: 0,
            labels: [
                {label: "URL参数解析", place: this.$store.state.env.url + '?a=1&b=2'},
                {
                    label: "请求头转JSON", place: 'accept-encoding: gzip, deflate, br\n' +
                        'accept-language: zh-CN,zh;q=0.9,en;q=0.8\n' +
                        'cache-control: no-cache'
                },
                {
                    label: "JSON转请求头", place: '{\n' +
                        '  "accept-encoding": "gzip, deflate, br",\n' +
                        '  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",\n' +
                        '  "cache-control": "no-cache"\n' +
                        '}'
                },
                {label: "URL编码", place: this.$store.state.env.url + '?name=一灰灰blog'},
                {label: "URL解码", place: this.$store.state.env.url + '?name%3D%E4%B8%80%E7%81%B0%E7%81%B0blog'},
                {
                    label: 'Cookie格式化',
                    place: '_ga=GA1.2.1056273789.1628510837; _t2=d990caf1-fdc5-4397-92e8-843f1e6e97d6;'
                },
            ]
        };
    },
    watch: {
        index() {
            this.context = "";
        }
    },
    computed: {
        results() {
            if (!this.context) {
                return "";
            }

            let result;
            if (this.index === 0) {
                result = this.format_args();
            } else if (this.index === 1) {
                result = this.header_to_json();
            } else if (this.index === 2) {
                result = this.json_to_header();
            } else if (this.index === 3) {
                result = this.url_encode();
            } else if (this.index === 4) {
                result = this.url_decode();
            } else if (this.index === 5) {
                result = this.cookie_parse();
            }

            if (result instanceof String || typeof (result) === 'string') {
                return result;
            } else {
                return JSON.stringify(result, null, 2);
            }
        }
    },
    methods: {
        format_args() {
            if (this.context.startsWith("http")) {
                const regex = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
                return regex.test(this.context) ? formatUrl(this.context) : false;
            } else {
                const regex = /[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
                return regex.test(this.context) ? formatUrl(this.context) : false;
            }
        },

        header_to_json() {
            let cells = this.context.split("\n");
            let ans = {}
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                let index = 0;
                if (cell.startsWith(":")) {
                    index = cell.indexOf(":", 1);
                } else {
                    index = cell.indexOf(":");
                }
                let left = cell.substring(0, index);
                let right = cell.substring(index + 1);
                ans[left.trim()] = right.trim();
            }
            return ans;
        },

        json_to_header() {
            try {
                const obj = JSON.parse(this.context);
                let res = "";
                let first = true;
                for (let v in obj) {
                    if (first) {
                        first = false;
                    } else {
                        res += "\n";
                    }
                    res += v + ":" + obj[v];
                }
                return res;
            } catch (e) {
                return "非法的json串";
            }
        },

        url_encode() {
            // 会对所有符号进行编解码
            return encodeURIComponent(this.context);
        },

        url_decode() {
            return decodeURIComponent(this.context);
        },

        cookie_parse() {
            // cookie 解析
            return this.context.replaceAll(";", "\n").replaceAll(" ", '');
        }
    }
};
</script>

<style>
.top-padding {
    padding-top: 1em;
}
</style>
