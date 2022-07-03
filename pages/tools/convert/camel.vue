<template>
    <div class="encoding">
        <nya-container title="驼峰下划线互转">
            <div class="radio-group">
                <nya-radio-group v-model="index">
                    <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                </nya-radio-group>
            </div>
            <nya-input v-model="content" class="mb-15 top-margin-1em" fullwidth rows="5" type="textarea" autofocus
                       autocomplete="off"
                       label="待处理的内容" placeholder="请输入要处理的内容"/>

        </nya-container>

        <nya-container v-show="result" title="转换成功">
            <pre>{{ result }}</pre>
        </nya-container>

        <nya-foot-info title="Tips"></nya-foot-info>
    </div>

</template>

<script>

export default {
    name: 'CamelUnderline',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            index: 0,
            labels: [
                {label: '驼峰转下划线'},
                {label: '下划线转驼峰'}
            ],
            content: '', //要处理的内容
            result: '' //输出的结果

        };
    },
    watch: {
        index() {
            this.convert();
        },
        content() {
            this.convert();
        }
    },
    methods: {
        convert() {
            if (this.index === 0) {
                this.toUnderLine();
            } else {
                this.toCamel();
            }
        },
        toUnderLine() {
            let cells = this.content.split(' ');
            let res = this.convert2UnderLine(cells);
            this.result = res.join(' ');
        },
        toCamel() {
            let cells = this.content.split(' ');
            let res = this.convert2Camel(cells);
            this.result = res.join(' ');
        },
        convert2Camel(data) {
            if (!data) return data;
            if (typeof data === 'string') {
                return data.replace(/_([a-z])/g, res => res[1].toUpperCase());
            }
            if (Array.isArray(data)) {
                return data.map(item => this.convert2Camel(item))
            }

            let newObj = {}
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    let newKey = key.replace(/_([a-z])/g, res => res[1].toUpperCase())
                    newObj[newKey] = this.convert2Camel(data[key])
                }
            }
            return newObj
        },
        convert2UnderLine(data) {
            if (!data) return data;
            if (typeof data === 'string') {
                return data.replace(/([A-Z])/g, (res) => {
                    return '_' + res.toLowerCase()
                })
            }
            if (Array.isArray(data)) {
                return data.map((item) => this.convert2UnderLine(item))
            }

            let newObj = {}
            for (let key in data) {
                let newKey = key.replace(/([A-Z])/g, (res) => {
                    return '_' + res.toLowerCase()
                })
                newObj[newKey] = this.convert2UnderLine(data[key])
            }
            return newObj
        }
    }
};
</script>
