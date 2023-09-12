<template>
    <div>
        <nya-container title="融资成本计算">
            <nya-input
                v-model.trim="amount"
                label="预计放款"
                placeholder="9,905.62"
                autocomplete="off"
                class="mb-15"
                autofocus
            />
            <nya-input
                v-model.trim="otherAmount"
                label="其他费用"
                placeholder="0"
                autocomplete="off"
                class="mb-15"
                autofocus
            />
            <nya-input
                v-model.trim="day"
                label="融资账期"
                type="number"
                placeholder="141"
                autocomplete="off"
                class="mb-15"
                autofocus
            />
            <nya-input
                v-model.trim="financing_rate"
                label="预计融资利率"
                type="number"
                placeholder="0.025"
                autocomplete="off"
                class="mb-15"
                autofocus
            />
            <nya-input
                v-model.trim="financing_service_rate"
                label="预计运维利率"
                type="number"
                placeholder="0.0008"
                autocomplete="off"
                class="mb-15"
                autofocus
            />
            <nya-input
                v-model.trim="radio"
                label="分期比例(规则如一次付完，输入1； 一期付90%，两期付完: 90,100; 三期付完: 60,90,100)"
                placeholder="90,100"
                autocomplete="off"
                autofocus
                fullwidth
            />
        </nya-container>

        <nya-container v-show="results" title="融资信息计算结果">
            <pre>{{ results }}</pre>
        </nya-container>

        <nya-container title="计算公式如下">
            <pre><code>
申请金额 = 预计放款 / (1 - 融资账期 * 预计融资利率 / 360 - 融资账期 * 预计运维利率 / 360)
融资成本 = 申请金额 - 预计放款
预计运维支出 = 申请金额 * 预计运维利率 * day / 360
预计融资利息 = 申请金额 - 融资成本
</code></pre>
        </nya-container>

        <nya-foot-info title="Tips" />
    </div>
</template>

<script>
export default {
    name: 'Amount',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            amount: '9,905.62',
            otherAmount: '0',
            day: '141',
            financing_rate: '0.025',
            financing_service_rate: '0.0008',
            radio: '1',
            results: ''
        };
    },
    mounted() {
        this.update_result();
    },
    watch: {
        amount() {
            this.results = this.update_result();
        },
        otherAmount() {
            this.results = this.update_result();
        },
        day() {
            this.results = this.update_result();
        },
        financing_rate() {
            this.results = this.update_result();
        },
        financing_service_rate() {
            this.results = this.update_result();
        },
        radio() {
            this.results = this.update_result();
        }
    },
    methods: {
        update_result() {
            let r = [];
            if (this.radio.trim() && this.radio.startsWith('[')) {
                try {
                    const rs = JSON.parse(this.radio.trim());
                    let last = 0;
                    console.log('解析数据:', rs);
                    for (let i = 0; i < rs.length; i++) {
                        r.push(rs[i]['ratio'] - last);
                        last = rs[i]['ratio'];
                    }
                } catch (e) {
                    console.log(e);
                    r.push(100);
                }
            } else if (!this.radio.trim()) {
                r.push(100);
            } else if (this.radio.indexOf(',') >= 0) {
                let cells = this.radio.trim().split(',');
                for (let i = 0; i < cells.length; i++) {
                    r.push(parseFloat(cells[i]));
                }
            } else {
                let ra = parseFloat(this.radio.trim());
                if (ra < 1) {
                    r.push(ra * 100);
                } else if (ra == 1 || ra >= 100) {
                    r.push(100);
                } else {
                    r.push(ra);
                }
            }

            if (r.length === 0) {
                r.push(100);
            }

            console.log('计算成本', r);

            let res = '';
            let totalAmounts =
                parseFloat(this.amount.trim().replaceAll(',', '')) +
                parseFloat(this.otherAmount.trim().replace(',', ''));
            for (let i = 0; i < r.length; i++) {
                let tmp = this.calculate_financing_amount(
                    (totalAmounts * r[i]) / 100,
                    this.day.trim(),
                    this.financing_rate.trim(),
                    this.financing_service_rate.trim(),
                    parseFloat(r[i]) / 100
                );
                res +=
                    '第' +
                    (i + 1) +
                    '期:\n比例:' +
                    r[i] +
                    '\n' +
                    tmp +
                    '\n-----------\n';

                console.log(res);
            }
            this.results = res;
            return res;
        },
        calculate_financing_amount(
            amount,
            day,
            financing_rate,
            financing_service_rate,
            radio
        ) {
            // 账期百分比
            const financing_period_percent = (day / 360.0).toFixed(8);
            const apply_amount = (amount / (1 - financing_rate * financing_period_percent - financing_service_rate * financing_period_percent)).toFixed(2);
            const financing_cost = apply_amount - amount;
            const service_amount = (apply_amount * financing_service_rate * financing_period_percent).toFixed(2);
            const financing_interest = financing_cost - service_amount;
            const expect_financing_amount = apply_amount - financing_cost;

            // 本期申请支付金额
            const payment_apply_amount = amount * radio + financing_cost;
            return (
                '申请金额: ' +
                apply_amount.toFixed(2) +
                '\n预计融资金额: ' +
                expect_financing_amount.toFixed(2) +
                '\n融资成本: ' +
                financing_cost.toFixed(2) +
                '\n预计融资利息: ' +
                financing_interest.toFixed(2) +
                '\n预计运维支出: ' +
                service_amount.toFixed(2) +
                '\n本期申请支付金额: ' +
                payment_apply_amount.toFixed(2)
            );
        }
    }
};
</script>
