<template>
    <div class="crontab">
        <nya-container title="融资成本计算">
            <nya-input
                v-model.trim="amount"
                label="预计放款"
                placeholder="9,905.62"
                autocomplete="off"
                autofocus
                fullwidth
            />
            <nya-input
                v-model.trim="day"
                label="融资账期"
                type="number"
                placeholder="141"
                autocomplete="off"
                autofocus
                fullwidth
            />
            <nya-input
                v-model.trim="financing_rate"
                label="预计融资利率"
                placeholder="0.025"
                autocomplete="off"
                autofocus
                fullwidth
            />
            <nya-input
                v-model.trim="financing_service_rate"
                label="预计运维利率"
                placeholder="0.0008"
                autocomplete="off"
                autofocus
                fullwidth
            />
            <nya-input
                v-model.trim="radio"
                label="分期比例"
                placeholder="1"
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
预计融资利息 = 申请金额 * 预计融资利率 * day / 360
预计运维支出 = 申请金额 * 预计运维利率 * day / 360
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
            day: '141',
            financing_rate: '0.025',
            financing_service_rate: '0.0008',
            radio: '[{"ratio": 95}, {"ratio": 100}]'
        };
    },
    computed: {
        results() {
            let r = [1];
            if (!this.radio.trim()) {
                r = [1];
            } else {
                const rs = JSON.parse(this.radio.trim());
                let last = 0;
                for (let i = 0; i < rs; i++) {
                    r.append(rs[i]['ratio'] - last);
                    last = rs[i]['ratio'];
                }
            }

            let res = '';
            for (let i = 0; i < r; i++) {
                let tmp = this.calculate_financing_amount(
                    (this.amount.trim().replaceAll(',', '') * r[i]) / 100,
                    this.day.trim(),
                    this.financing_rate.trim(),
                    this.financing_service_rate.trim(),
                    r[i] / 100
                );
                res +=
                    '第' +
                    i +
                    '期:\n比例:' +
                    r[i] +
                    '\n' +
                    tmp +
                    '\n-----------\n';
            }
            return res;
        }
    },
    methods: {
        calculate_financing_amount(
            amount,
            day,
            financing_rate,
            financing_service_rate,
            radio
        ) {
            const apply_amount =
                amount /
                (1 -
                    (day * financing_rate) / 360.0 -
                    (day * financing_service_rate) / 360.0);
            const financing_cost = apply_amount - amount;
            const financing_interest =
                (apply_amount * financing_rate * day) / 360.0;
            const service_amount =
                (apply_amount * financing_service_rate * day) / 360.0;

            // 本期申请支付金额
            const payment_apply_amount = amount * radio + financing_cost
            return (
                '申请金额: ' +
                apply_amount.toFixed(2) +
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
