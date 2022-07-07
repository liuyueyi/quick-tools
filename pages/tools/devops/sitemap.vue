<template>
    <div class="sitemap">
        <nya-container title="站点地图SiteMap生成">
            <nya-input v-model="modDay" type="text" autofocus label="修改时间/lastMod"/>
            <nya-input v-model="content"
                       class="top-margin-1em"
                       fullwidth
                       rows="5"
                       type="textarea"
                       autofocus
                       label="URL列表，每行一个"
            />
        </nya-container>

        <nya-container v-if="results" title="生成结果">
            <nya-copy :copy="results">
                <pre>{{ results }}</pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
        </nya-foot-info>
    </div>
</template>

<script>
import Dynamic from '@/components/Dynamic';
import dayjs from "dayjs";

export default {
    name: 'sitemap',
    components: {
        Dynamic
    },
    data() {
        let nowTimestamp = new Date().getTime();
        // 当前的日期
        let today = dayjs(nowTimestamp).format('YYYY-MM-DD');
        return {
            content: '',
            results: '',
            modDay: today,
        };
    },
    watch: {
        content() {
            this.parse();
        }
    },
    methods: {
        parse() {
            let urls = this.content.split("\n");
            let res = "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
            urls.forEach(url => {
                let loc = url.trim();
                if (loc) {
                    res += "    <url>\n";
                    res += "        <loc>" + loc + "</loc>\n";
                    res += "        <lastmod>" + this.modDay + "</lastmod>\n"
                    res += "    </url>\n";
                }
            });
            res += "</urlset>";

            this.results = res;
        }
    }
};
</script>

<style>
</style>
