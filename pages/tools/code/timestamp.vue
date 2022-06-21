<template>
    <div class="timestamp">
        <nya-container title="Unix时间戳互转">
            <h4 class="x-wd top-padding-1em">&gt;&gt; >> Unix时间戳定义</h4>
            <div class="inputbtn">
                <nya-input v-model.trim="current" fullwidth autofocus
                           autocomplete="off"/>
                <button type="button" class="nya-btn" @click="autoParse">
                    {{ this.autoPlay ? "暂停" : "开始" }}
                </button>
            </div>
            <div class="input-group top-padding-2em ">
                <span class="form-control"> 现在的unix时间戳：</span>
                <input type="text" class="form-control" :placeholder="`毫秒`" :value="secondResult" readonly>
                <span class="form-control">毫秒</span>
                <input type="text" class="form-control" :placeholder="`秒`" :value="millResult" readonly>
                <span class="form-control">秒</span>
            </div>

            <h4 class="x-wd top-padding-2em">&gt;&gt; Unix时间戳 转 当地时间</h4>
            <div class="input-group">
                <input type="number" class="form-control" :placeholder="`时间戳(eg:1388307215)`"
                       v-model.trim="uInput">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="parseDay">转换</button>
                </div>
                <input type="text" class="form-control" :placeholder="`毫秒`" :value="uOutput" readonly>
                <input type="text" class="form-control" :placeholder="`秒`" :value="uOutput2" readonly>
            </div>

            <h4 class="x-wd top-padding-1em">&gt;&gt;当地时间转Unix时间戳</h4>
            <div class="input-group">
                <input type="text" class="form-control" :placeholder="`时间(eg:2020-02-02 02:02:02.222)`"
                       v-model.trim="tInput">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="parseTime">转换</button>
                </div>
                <input type="text" class="form-control" :placeholder="`毫秒`" :value="tOutput" readonly>
                <input type="text" class="form-control" :placeholder="`秒`" :value="tOutput2" readonly>
            </div>
        </nya-container>
    </div>
</template>

<script>
let DatePicker;
if (process.browser) {
    DatePicker = require('vue2-datepicker').default;
}
import dayjs from 'dayjs';

export default {
    name: 'Timestamp',
    head() {
        return this.$store.state.currentTool.head;
    },
    components: {
        DatePicker
    },
    data() {
        return {
            current: null,
            defaultValue: dayjs().format('YYYY-MM-DD'),
            date: null,
            timer: null,
            autoPlay: true, // 是否自动显示当前时间
            secondResult: null,
            millResult: null,
            nowTimestamp: new Date().getTime(),

            uInput: null, // unix timestamp
            uOutput: null,
            uOutput2: null,
            tInput: null, // date
            tOutput: null,
            tOutput2: null,
        };
    },
    mounted() {
        this.timer = setInterval(() => {
            this.updateDate();
        }, 1000);
        this.updateDate();
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
            this.nowTimestamp = new Date().getTime();
            this.current = dayjs(this.nowTimestamp).format('YYYY-MM-DD HH:mm:ss');
            this.secondResult = String(parseInt(this.nowTimestamp / 1000));
            this.millResult = String(this.nowTimestamp);
        },
        parseDay() {
            if (!this.uInput) {
                return;
            }

            this.uInput = String(this.uInput.trim());
            let time;
            if (this.uInput.len > 10) {
                // 毫秒
                time = parseInt(this.uInput);
            } else {
                time = parseInt(this.uInput) * 1000;
            }

            console.log("time:", time);
            // 时间戳转日期
            this.uOutput2 = dayjs(time).format('YYYY-MM-DD HH:mm:ss');
            // 时间戳转毫秒日期
            this.uOutput = dayjs(time).format('YYYY-MM-DD HH:mm:ss.sss');
        },
        parseTime() {
            if (!this.tInput) {
                return;
            }

            // 日期转时间戳
            let dateTime = this.tInput.trim();
            if (dateTime.indexOf(":") < 0) {
                dateTime += " 00:00:00";
            }
            this.tOutput2 = parseInt(Date.parse(new Date(dateTime)) / 1000)
            this.tOutput = Date.parse(new Date(dateTime));
        }
    }
};
</script>

<style lang="scss">
.timestamp {
    .date-picker {
        width: 100%;
    }

    .nya-input {
        width: 100%;
        box-sizing: border-box;

        .mx-input {
            border-radius: 0;
            height: 100%;
            box-sizing: border-box;
        }
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
}
</style>
