<template>
    <div class="search_help">
        <nya-container title="语音选择">

            <div class="radio-group">
                <nya-radio-group v-model="index">
                    <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                </nya-radio-group>
            </div>
            <div v-if="labels[index]['type'] == 1">
                <nya-select v-model="type" class="mt-15" :items="lanList" label="选择语言" @change="changeType()"/>
                <nya-select v-model="areaType" class="mt-15" :items="areaList" label="选择适用地区" />
                <nya-select v-model="voiceType" class="mt-15" :items="voiceList" label="选择语音" />
            </div>

            

            <div class="top-margin-1em">
                <div class="btn btn-info top-margin-1em" :class="loading ? 'btn-danger' : '' " @click="go"   :disabled="loading">
                    {{ loading ? '合成中...' : '语音合成' }}
                </div>
            </div>

            <nya-input v-model="contentTxt"
                class="mb-15 top-margin-1em" fullwidth rows="6" type="textarea" autofocus
                       autocomplete="off"
                       label="待处理的文本"
                    placeholder="请输入要转语音的文本"/>

        </nya-container>

        <nya-container title="合成结果">
            <div v-if="url">音频地址: {{  url  }} </div>
            <audio v-if="url">
                <source :src="url" type="audio/MP3" v-if="url">
                Your browser does not support this audio format.
            </audio>
        </nya-container>

        <nya-container title="Tips">
            <ul class="nya-list">
                <li>TTS-文本转语音</li>
            </ul>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'SearchHelp',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            index: 0,
            labels: [
                {label: '中文-晓悠-儿童场景', voice: 'zh_CN_XiaoyouNeural', type: 0},
                {label: '中文-晓双-儿童场景', voice: 'zh_CN_XiaoshuangNeural', type: 0},
                {label: '中文-晓墨-音频书籍', voice: 'zh_CN_XiaomoNeural', type: 0},
                {label: '中文-晓萱-音频书籍', voice: 'zh_CN_XiaoxuanNeural', type: 0},
                {label: '中文-云野-音频书籍', voice: 'zh_CN_YunyeNeural', type: 0},
                {label: '中文-晓睿-客户服务', voice: 'zh_CN_XiaoruiNeural', type: 0},
                {label: '中文-云泽-老年', voice: 'zh_CN_YunzeNeural', type: 0},
                {label: '中文-晓秋-舒适', voice: 'zh_CN_XiaoqiuNeural', type: 0},
                {label: '中文-晓辰-会议', voice: 'zh_CN_XiaochenNeural', type: 0},
                {label: '英语-Aria-女', voice: 'en_US_AriaNeural', type: 0},
                {label: '英语-Ana-女', voice: 'en_US_AnaNeural', type: 0},
                {label: '英语-Christopher-男', voice: 'en_US_ChristopherNeural', type: 0},
                {label: '英语-Eric-男', voice: 'en_US_EricNeural', type: 0},
                {label: '英语-Guy-男', voice: 'en_US_GuyNeural', type: 0},
                {label: '英语-Jenny-女', voice: 'en_US_JennyNeural', type: 0},
                {label: '英语-Michelle-女', voice: 'en_US_MichelleNeural', type: 0},
                {label: '英语-Roger-男', voice: 'en_US_RogerNeural', type: 0},
                {label: '英语-Steffan-男', voice: 'en_US_SteffanNeural', type: 0},
                {label: '自定义', voice: '', type: 1},
            ],
            keyword: '',
            results: '',
            contentTxt: '',
            loading: false,
            type: '',
            areaType: "",
            voiceType: '',
            lanList: [],
            areaList: [],
            voiceList: [],
            voiceTotalMap: {},
            url: '',
        };
    },
    created() {
        this.loadTtsList()
    },
    // computed: {
    //     url() {
    //         return 'https://story.hhui.top/ql/tts/stream?voice=' + this.voiceType + "&rate=1&content=" + this.content
    //     }
    // },
    watch: {
        content() {
            console.log('内容发生变更', this.contentTxt);
            this.url = 'https://story.hhui.top/ql/tts/stream?voice=' + this.voiceType + "&rate=1&content=" + this.contentTxt
        }
    },
    methods: {
        changeType() {
            console.log('type 发生变更', this.type);
            this.areaList = this.voiceTotalMap[this.type]['area']
            for(let key of this.areaList) {
                this.areaType = key;
                break;
            }

            this.voiceList = this.voiceTotalMap[this.type][this.areaType]['voices'];
            for(let key of this.voiceList) {
                this.voiceType = key;
                break;
            }
        },
        changeAreaType() {
            console.log('areaType 发生变更', this.areaType);

            this.voiceList = this.voiceTotalMap[this.type][this.areaType]['voices'];
            for(let key of this.voiceList) {
                this.voiceType = key;
                break;
            }
        },
        changeVoiceType() {
            console.log('voiceList 变更', this.voiceType);

        },
        go() {
            let voice;
            if (this.labels[this.index]['type'] == 0) {
                voice = this.labels[this.index]['voice']
            } else {
                voice = this.voiceType
            }

            if (!voice) {
                this.$noty.error('请选择语音', {timeout: 500});
                return;
            }

            if (this.loading) return false;
            this.loading = true;

            let url = "https://story.hhui.top/ql/tts/convert"
            const params = new URLSearchParams();
            params.append('content', this.contentTxt);
            params.append('voice', voice);
            params.append('rate', '1');
            // this.$axios.post(url, params, 
            //     {headers: {'content-type': 'application/x-www-form-urlencoded'}}
            // )
            this.$axios.get(url + `?voice=${voice}&rate=1&content=${this.contentTxt}`)
            .then(e => {
                if(e.data.status.code == 200) {
                    this.$noty.success('转换成功', {timeout: 500});
                    this.url = e.data.result
                    console.log('更新url --> ', this.url);
                } else {
                    this.$noty.error('转换失败' + e.data.status.msg, {timeout: 500});
                }
                this.loading = false;
            }).catch(error => {
                this.loading = false;
                this.$noty.error(`转换失败${error}`, {timeout: 500});
                return false;
            })
        },
      
        loadTtsList() {
            const url = 'https://story.hhui.top/ql/tts/voiceList'
            this.$axios
                .get(url)
                .then(e => {
                    let r = e.data;
                    if (r.status.code === 200) {
                        r = r.result;
                        let res = {}
                        let lList = {}
                        for (let item of r) {
                            let aList = {}
                            for (let sub of item['voiceList']) {
                                item[sub['area']] = sub;
                                aList[sub['area']] = sub['area'];

                                let vM = {}
                                for(let v of sub['voiceList']) {
                                    vM[v] = v;
                                }
                                sub['voices'] = vM;
                            }
                            item['area'] = aList;

                            res[item['lan']] = item;
                            lList[item['lan']] = item['lan']
                        }
                        this.voiceTotalMap = res;
                        this.lanList = lList;
                        this.type = '中文';
                        this.areaType = '普通话，简体';
                        this.areaList = this.voiceTotalMap[this.type]['area']
                        this.voiceList = this.voiceTotalMap[this.type][this.areaType]['voices']
                        console.log('音频列表初始化完成：', this.voiceTotalMap, this.type, this.lanList, this.areaType, this.areaList, this.voiceList);
                    }
                    return r;
                })
                .catch(error => {
                    console.log('some error:', error);
                    return false;
                });
        }
    }
};
</script>
