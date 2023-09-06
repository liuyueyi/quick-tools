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
                placeholder="[{&quot;ratio&quot;: 95, &quot;deferredDays&quot;: 10}, {&quot;ratio&quot;: 100, &quot;deferredDays&quot;: 400}]"
                autocomplete="off"
                autofocus
                fullwidth
            />
        </nya-container>

        <nya-container v-if="results.length" title="融资信息计算结果">
            {{ formatDate(results) }}
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
            amount: '',
            day: '',
            financing_rate: '',
            financing_service_rate: '',
            radio: ''
        };
    },
    computed: {
        results() {
            let r = [1];
            if (!this.radio) {
                r = [1];
            } else {
                const rs = JSON.parse(this.radio);
                let last = 0;
                for (let i = 0; i < rs; i++) {
                    r.append(rs[i]['ratio'] - last);
                    last = rs[i]['ratio'];
                }
            }

            let res = '';
            for (let i = 0; i < r; i++) {
                let tmp = this.calculate_financing_amount(
                    (this.amount * r[i]) / 100,
                    this.day,
                    this.financing_rate,
                    this.financing_service_rate
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
            financing_service_rate
        ) {
            const apply_amount =
                amount /
                (1 -
                    (day * financing_rate) / 360 -
                    (day * financing_service_rate) / 360);
            const financing_cost = apply_amount - amount;
            const financing_interest =
                (apply_amount * financing_rate * day) / 360;
            const service_amount =
                (apply_amount * financing_service_rate * day) / 360;
            // let ans = {
            //     apply_amount: Math.round(apply_amount, 2),
            //     financing_cost: Math.round(financing_cost, 2),
            //     financing_interest: Math.round(financing_interest, 2),
            //     service_amount: Math.round(service_amount, 2)
            // };
            return (
                '申请金额: ' +
                Math.round(apply_amount, 2) +
                '\n融资成本: ' +
                Math.round(financing_cost, 2) +
                '\n预计融资利息: ' +
                Math.round(financing_interest, 2) +
                '\n预计运维支出: ' +
                Math.round(service_amount, 2)
            );
        }
    }
};
</script>
