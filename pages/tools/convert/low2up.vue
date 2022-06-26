<template>
    <div class="encoding">
        <div class="radio-group">
            <nya-radio-group v-model="index">
                <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
            </nya-radio-group>
        </div>

        <nya-container title="大小写转换">
            <nya-input v-model="content" class="mb-15" fullwidth rows="5" type="textarea" autofocus autocomplete="off"
                       label="待处理的内容" placeholder="请输入要处理的内容"/>
        </nya-container>

        <nya-container v-show="result" title="转换成功">
            <pre>{{ result }}</pre>
        </nya-container>
    </div>
</template>

<script>
export default {
    name: 'LowToUp',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            index: 0,
            labels: [
                {label: '转小写'},
                {label: '转大写'},
                {label: '首字母大写'},
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
                this.toLow();
            } else if (this.index === 1) {
                this.toUp();
            } else {
                this.toFirstUp();
            }
        },
        toUp() {
            this.result = this.content.toUpperCase();
        },
        toLow() {
            this.result = this.content.toLowerCase();
        },
        toFirstUp() {
            let newStr = this.content.split(" ");
            for (let i = 0; i < newStr.length; i++) {
                newStr[i] = newStr[i].slice(0, 1).toUpperCase() + newStr[i].slice(1).toLowerCase();
            }
            this.result = newStr.join(" ");
        }
    }
};
</script>
