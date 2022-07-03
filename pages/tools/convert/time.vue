<template>
    <div class="time-convert">
        <nya-container title="时间转换">
            <div class="input-group top-padding-1em" v-for="(item, i) in times">
                <span class="form-control no-border col-2"> {{ item.label }}</span>
                <input type="number" class="form-control output"
                       v-model="item.val"
                       @change="$emit('change', $event)"
                       @input="$emit('input', $event.target.value, $event)"
                       @keyup="$emit('keyup', $event)"
                />

            </div>

            <div class="top-margin-1em">
                <button class="btn btn-outline-danger col-4" @click="clear">重置</button>
                <button class="btn btn-outline btn-primary col-4" @click="convert">转换</button>
            </div>

        </nya-container>

        <nya-foot-info title="Tips">
            <li>按1年365天计算</li>
        </nya-foot-info>
    </div>
</template>

<script>
import Template from "../code/cdnjs";

export default {
    name: 'NumberToZh',
    components: {Template},
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            times: [
                {label: '年(y)', val: ''},
                {label: '周(w)', val: ''},
                {label: '天(d)', val: ''},
                {label: '时(h)', val: ''},
                {label: '分(m)', val: ''},
                {label: '秒(s)', val: ''},
                {label: '毫秒(ms)', val: ''},
            ],
        };
    },
    computed: {},
    methods: {
        convert() {
            let y = this.times[0].val;
            let w = this.times[1].val;
            let d = this.times[2].val;
            let h = this.times[3].val;
            let m = this.times[4].val;
            let s = this.times[5].val;
            let ms = this.times[6].val;

            if (y) {
                y = parseFloat(y);
                ms = y * 365 * 24 * 60 * 60 * 1000;
            } else if (w) {
                w = parseFloat(w);
                ms = w * 7 * 24 * 60 * 60 * 1000;
            } else if (d) {
                d = parseFloat(d);
                ms = d * 24 * 60 * 60 * 1000;
            } else if (h) {
                h = parseFloat(h);
                ms = h * 60 * 60 * 1000;
            } else if (m) {
                m = parseFloat(h);
                ms = m * 60 * 1000;
            } else if (s) {
                s = parseFloat(s);
                ms = s * 1000;
            } else if (ms) {
                ms = parseFloat(ms);
            } else {
                return;
            }

            if (!y) y = ms / (365 * 24 * 60 * 60 * 1000);
            if (!w) w = ms / (7 * 24 * 60 * 60 * 1000);
            if (!d) d = ms / (24 * 60 * 60 * 1000);
            if (!h) h = ms / (60 * 60 * 1000);
            if (!m) m = ms / (60 * 1000);
            if (!s) s = ms / 1000;

            this.times[0].val = String(y);
            this.times[1].val = String(w);
            this.times[2].val = String(d);
            this.times[3].val = String(h);
            this.times[4].val = String(m);
            this.times[5].val = String(s);
            this.times[6].val = String(ms);
        },
        clear() {
            this.times[0].val = '';
            this.times[1].val = '';
            this.times[2].val = '';
            this.times[3].val = '';
            this.times[4].val = '';
            this.times[5].val = '';
            this.times[6].val = '';
        }
    }
};
</script>

<style lang='scss'>
.time-convert {
    .no-border {
        border: 0 solid #ced4da;
    }
}
</style>
