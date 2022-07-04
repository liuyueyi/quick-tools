<template>
    <div class="timestamp">
        <nya-container title="Unix时间戳互转">
            <h4 class="x-wd top-padding-1em">&gt;&gt; >> Unix时间戳定义</h4>
            <div class="inputbtn">
                <nya-input v-model.trim="currentDayTime" fullwidth autofocus
                           autocomplete="off"/>
                <button type="button" class="nya-btn" @click="autoParse">
                    {{ this.autoPlay ? "暂停" : "开始" }}
                </button>
            </div>
            <div class="input-group top-padding-2em">
                <span class="form-control no-border "> 现在本地unix时间戳：</span>
                <input type="text" class="form-control output" :placeholder="`毫秒`" :value="millisecondResult" readonly
                       @click="copyValue(millisecondResult)">
                <span class="form-control no-border ">毫秒</span>
                <input type="text" class="form-control output" :placeholder="`秒`" :value="secondsResult" readonly
                       @click="copyValue(secondsResult)">
                <span class="form-control no-border">秒</span>
            </div>

            <h4 class="x-wd top-padding-2em">&gt;&gt; Unix时间戳 转 当地时间</h4>
            <div class="input-group row">
                <span class="form-control col-1">时间戳</span>
                <input type="number" class="form-control"
                       v-model.trim="unixTimeInput">
                <div class="input-group-append ">
                    <button class="btn btn-outline-secondary form-control" type="button" @click="parseDay">转换</button>
                </div>
                <input type="text" class="form-control output"
                       :value="unixDateMillisecondOutput"
                       readonly @click="copyValue(unixDateMillisecondOutput)">
                <span class="form-control col-1">毫秒</span>
                <input type="text" class="form-control output"
                       :value="unixDateSecondsOutput" readonly
                       @click="copyValue(unixDateSecondsOutput)">
                <span class="form-control col-1">秒</span>
            </div>

            <h4 class="x-wd top-padding-2em">&gt;&gt;当地时间 转 Unix时间戳</h4>
            <div class="input-group row">
                <span class="form-control col-1">日期</span>
                <input type="text" class="form-control"
                       v-model.trim="dateInput">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary form-control" type="button" @click="parseTime">转换</button>
                </div>
                <input type="text" class="form-control output"
                       :value="dateMillisecondOutput"
                       readonly
                       @click="copyValue(dateMillisecondOutput)">
                <span class="form-control col-1">毫秒</span>
                <input type="text" class="form-control output"
                       :value="dateSecondsOutput"
                       readonly
                       @click="copyValue(dateSecondsOutput)">
                <span class="form-control col-1">秒</span>
            </div>
        </nya-container>

        <nya-container title="世界时钟">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">地区</th>
                    <th scope="col">时间</th>
                    <th scope="col">地区</th>
                    <th scope="col">时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in word_times">
                    <td> {{ item.a1 }}</td>
                    <td> {{ item.t1 }}</td>
                    <td> {{ item.a2 }}</td>
                    <td> {{ item.t2 }}</td>
                </tr>
                </tbody>
            </table>
        </nya-container>

        <nya-container title="各语言获取时间戳">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">language</th>
                    <th scope="col">code</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">Swift</th>
                    <td>
                        <pre>NSDate().timeIntervalSince1970</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Objective-C</th>
                    <td>
                        <pre>[[NSDate date] timeIntervalSince1970]</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Go</th>
                    <td><pre>import (
  "time"
)
int32(time.Now().Unix())</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Java</th>
                    <td><pre>(int) (System.currentTimeMillis() / 1000);
// joda
(int) (DateTime.now().getMillis() / 1000)</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">JavaScript</th>
                    <td>
                        <pre>Math.round(new Date() / 1000)</pre>
                    </td>
                </tr>

                <tr>
                    <th scope="row">MySQL</th>
                    <td>
                        <pre>SELECT unix_timestamp(now())</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">SQLite</th>
                    <td>
                        <pre>SELECT strftime('%s', 'now')</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Erlang</th>
                    <td>
                        <pre>calendar:datetime_to_gregorian_seconds(calendar:universal_time())-719528*24*3600.</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">PHP</th>
                    <td>
                        <pre>time()</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Python</th>
                    <td>
                        <pre>import time
time.time()</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Ruby</th>
                    <td>
                        <pre>Time.now.to_i</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Shell</th>
                    <td>
                        <pre>date +%s</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Groovy</th>
                    <td>
                        <pre>(new Date().time / 1000).intValue()</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Lua</th>
                    <td>
                        <pre>os.time()</pre>
                    </td>
                </tr>
                <tr>
                    <th scope="row">.NET/C#</th>
                    <td>
                        <pre>(DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000</pre>
                    </td>
                </tr>
                </tbody>
            </table>
        </nya-container>

        <nya-foot-info title="Tips">

        </nya-foot-info>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    name: 'Timestamp',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {},
    data() {
        return {
            currentDayTime: null,
            defaultValue: dayjs().format('YYYY-MM-DD'),
            timer: null, // 定时器，用于更新当前时间
            autoPlay: true, // 是否自动显示当前时间
            secondsResult: null, // 秒时间戳
            millisecondResult: null, // 毫秒时间
            nowTimestamp: new Date().getTime(), // 当前时间戳

            unixTimeInput: null, // unix timestamp
            unixDateMillisecondOutput: null,
            unixDateSecondsOutput: null,
            dateInput: null, // date
            dateMillisecondOutput: null,
            dateSecondsOutput: null,

            word_times: [{
                "a1": "当地时间",
                "t1": "2022-06-21 11:33:26",
                "a2": "格林威治时间（GMT）",
                "t2": "2022-06-21 03:33:26"
            }, {
                "a1": "埃尼威托克岛 (GMT-12)",
                "t1": "2022-06-20 15:33:26",
                "a2": "罗马 (GMT +1)",
                "t2": "2022-06-21 04:33:26"
            }, {
                "a1": "萨摩亚群岛 (GMT-11)",
                "t1": "2022-06-20 16:33:26",
                "a2": "以色列 (GMT +2)",
                "t2": "2022-06-21 05:33:26"
            }, {
                "a1": "夏威夷 (GMT-10)",
                "t1": "2022-06-20 17:33:26",
                "a2": "莫斯科 (GMT +3)",
                "t2": "2022-06-21 06:33:26"
            }, {
                "a1": "阿拉斯加 (GMT-9)",
                "t1": "2022-06-20 18:33:26",
                "a2": "巴库 (GMT +4)",
                "t2": "2022-06-21 07:33:26"
            }, {
                "a1": "太平洋时间 (GMT-8)",
                "t1": "2022-06-20 19:33:26",
                "a2": "New Delhi (GMT +5)",
                "t2": "2022-06-21 08:33:26"
            }, {
                "a1": "山脉时间 (GMT-7)",
                "t1": "2022-06-20 20:33:26",
                "a2": "Dhakar (GMT +6)",
                "t2": "2022-06-21 09:33:26"
            }, {
                "a1": "中央标准时间 (GMT-6)",
                "t1": "2022-06-20 21:33:26",
                "a2": "曼谷 (GMT +7)",
                "t2": "2022-06-21 10:33:26"
            }, {
                "a1": "东部时间 (GMT-5)",
                "t1": "2022-06-20 22:33:26",
                "a2": "北京 (GMT +8)",
                "t2": "2022-06-21 11:33:26"
            }, {
                "a1": "大西洋时间 (GMT-4)",
                "t1": "2022-06-20 23:33:26",
                "a2": "东京 (GMT +9)",
                "t2": "2022-06-21 12:33:26"
            }, {
                "a1": "Brazilia (GMT-3)",
                "t1": "2022-06-21 00:33:26",
                "a2": "悉尼 (GMT +10)",
                "t2": "2022-06-21 13:33:26"
            }, {
                "a1": "大西洋中部时间(GMT-2)",
                "t1": "2022-06-21 01:33:26",
                "a2": "Magadan (GMT +11)",
                "t2": "2022-06-21 14:33:26"
            }, {
                "a1": "亚述尔群岛 (GMT-1)",
                "t1": "2022-06-21 02:33:26",
                "a2": "惠灵顿 (GMT +12)",
                "t2": "2022-06-21 15:33:26"
            }],
        };
    },
    mounted() {
        this.timer = setInterval(() => {
            this.updateDate();
        }, 1000);
        this.updateDate();
        this.unixTimeInput = String(parseInt(String(this.nowTimestamp / 1000)));
        this.dateInput = this.currentDayTime;
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods: {
        autoParse() {
            if (this.autoPlay) {
                clearInterval(this.timer);
                this.autoPlay = false;
            } else {
                this.timer = setInterval(() => this.updateDate(), 1000);
                this.autoPlay = true;
            }
        },
        updateDate() {
            // 当前时间
            const now = new Date();
            this.nowTimestamp = new Date().getTime();
            // 当前的日期
            this.currentDayTime = dayjs(this.nowTimestamp).format('YYYY-MM-DD HH:mm:ss');
            this.secondsResult = String(parseInt(String(this.nowTimestamp / 1000)));
            this.millisecondResult = String(this.nowTimestamp);

            for (let i = 0; i < this.word_times.length; i++) {
                if (i === 0) {
                    this.word_times[i]["t1"] = this.currentDayTime;
                    this.word_times[i]["t2"] = dayjs(this.nowTimestamp + now.getTimezoneOffset() * 60000).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    const zero0Time = this.nowTimestamp + now.getTimezoneOffset() * 60000;
                    this.word_times[i]["t1"] = dayjs(zero0Time + (i - 13) * 60 * 60000).format('YYYY-MM-DD HH:mm:ss');
                    this.word_times[i]["t2"] = dayjs(zero0Time + i * 60 * 60000).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        },
        // 时间戳转日期
        parseDay() {
            if (!this.unixTimeInput) {
                return;
            }

            this.unixTimeInput = String(this.unixTimeInput.trim());
            let time;
            if (this.unixTimeInput.length > 10) {
                // 毫秒
                time = parseInt(this.unixTimeInput);
            } else {
                time = parseInt(this.unixTimeInput) * 1000;
            }
            // 时间戳转日期
            this.unixDateSecondsOutput = dayjs(time).format('YYYY-MM-DD HH:mm:ss');
            // 时间戳转毫秒日期
            this.unixDateMillisecondOutput = dayjs(time).format('YYYY-MM-DD HH:mm:ss.sss');
        },
        // 日期转时间戳
        parseTime() {
            if (!this.dateInput) {
                return;
            }

            // 日期转时间戳
            let dateTime = this.dateInput.trim();
            if (dateTime.indexOf(":") < 0) {
                dateTime += " 00:00:00";
            }
            this.dateSecondsOutput = parseInt(Date.parse(new Date(dateTime)) / 1000)
            this.dateMillisecondOutput = Date.parse(new Date(dateTime));
        },
        copyValue(value) {
            if (!value) {
                return;
            }

            this.$copyText(String(value)).then(
                () => {
                    this.$noty.success('复制成功', {timeout: 500});
                },
                () => {
                    this.$noty.error('复制失败，请手动选择复制', {timeout: 500});
                }
            );
        }
    }
};
</script>

<style lang="scss">
.timestamp {
    .date-picker {
        width: 100%;
    }

    .no-border {
        border: 0 solid #ced4da;
    }

    .time-show {
        display: block;
        color: #3d3737;
        padding-left: 2px;
        padding-right: 2px;
    }

    .x-wd {
        margin-top: 0;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        font-size: 16px;
        color: #428bca;
    }

    .output {
        color: #009a61;
    }
}
</style>
