<template>
    <div class="table_format">
        <nya-container title="CSV格式化">
            <div class="nya-subtitle mt-15">
                <nya-checkbox :checked="selectFile" label="上传csv文件" @change="updateChooseFile"/>

                <nya-radio-group v-model="index">
                    <nya-radio v-for="(label, i) in labels" class="mr-15" :value="i" :key="i" :label="label.label"/>
                    <small> {{ labels[index].desc }} </small>
                </nya-radio-group>
            </div>

            <nya-input
                v-if="selectFile"
                v-model="n"
                class="upfile op-margin-2em"
                type="file"
                accept="*/*.csv"
                placeholder="点击这里上传文件（取消复选框，可直接在输入框中粘贴csv文本）"
                @change="handleChange"
            />

            <nya-input
                v-else
                v-model="tableString"
                className="mb-15"
                class="top-margin-2em"
                fullwidth
                rows="10"
                type="textarea"
                autofocus
                autocomplete="off"
                label="请输入csv格式数据"
                placeholder="id ,uname ,age
1,yihui, 18
2,一灰灰,19
3,yihui,20
"
            />
        </nya-container>
        <nya-container v-if="results.length" title="转换结果">
            <button class="btn btn-primary" @click="download">
                {{ !this.inProcess ? '下载': '正在保存,请等待...'}}
            </button>
            <nya-copy :copy="results">
                <pre>  <Dynamic :template="results"/> </pre>
            </nya-copy>
        </nya-container>

        <nya-foot-info title="Tips">
            <li>
                插件源码：<a
                href="https://github.com/liuyueyi/quick-jsdemo"
                target="_blank"
                rel="noopener noreferrer"
            >quick-jsdemo</a> 表格数据格式化
            </li>
        </nya-foot-info>

    </div>
</template>

<script>

import Dynamic from '@/components/Dynamic';
import Papa from 'papaparse';

let oo, os;
export default {
    name: 'TableFormat',
    components: {
        Dynamic
    },
    data() {
        return {
            selectFile: true,
            n: '',
            file: '',
            tableString: '',
            results: '',
            index: 0,
            inProcess: false,
            labels: [
                {label: "数字转字符串", desc: '避免长数字在excel打开时，最后几位显示0或科学计算显示问题'},
            ]
        };
    },
    watch: {
        index() {
            this.tableFormat();
        },
        tableString() {
            if (this.tableString.trim() === oo) {
                return;
            }

            oo = this.tableString.trim();
            this.tableString = oo;
            this.tableFormat();
        }
    },
    methods: {
        updateChooseFile() {
            this.selectFile = !this.selectFile;
        },
        handleChange(e) {
            const files = e.target.files;
            if (!files.length) return false;
            let file = files[0];
            this.file = file;
            const reader = new FileReader();
            reader.readAsText(file, 'utf-8');
            this.tableString = '';
            reader.onload = (event) => {
                this.tableString = event.target.result;
            };
        },
        tableFormat() {
            if (!this.tableString) {
                return;
            }
            const res = Papa.parse(this.tableString);
            console.log(res);
            let result = '';
            let index = 0;
            res.data.forEach(i => {
                if (index === 0) {
                    result += "\"" + i.join("\",\"") + "\"\n";
                } else {
                    result += "'" + i.join("','") + "'\n";
                }
                index += 1;
            })

            this.results = result;
        },
        download() {
            function download(strData, strFileName, strMimeType) {
                var D = document,
                    A = arguments,
                    a = D.createElement("a"),
                    d = A[0],
                    n = A[1],
                    t = A[2] || "text/plain";
                //build download link:
                a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);
                if (window.MSBlobBuilder) { // IE10
                    var bb = new MSBlobBuilder();
                    bb.append(strData);
                    return navigator.msSaveBlob(bb, strFileName);
                } /* end if(window.MSBlobBuilder) */
                if ('download' in a) { //FF20, CH19
                    a.setAttribute("download", n);
                    a.innerHTML = "downloading...";
                    D.body.appendChild(a);
                    setTimeout(function () {
                        var e = D.createEvent("MouseEvents");
                        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        a.dispatchEvent(e);
                        D.body.removeChild(a);
                    }, 66);
                    return true;
                }
                ; /* end if('download' in a) */
                //do iframe dataURL download: (older W3)
                var f = D.createElement("iframe");
                D.body.appendChild(f);
                f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
                setTimeout(function () {
                    D.body.removeChild(f);
                }, 333);
                return true;
            }
            try {
                this.inProcess = true;
                download(this.results, "res.csv", 'text/plain');
                this.inProcess = false;
            } catch (e) {
                this.inProcess = false;
            }
        }

    }
};
</script>

<style lang="scss">

.table_format {
    .no-border {
        border: 0 solid #ced4da;
    }

}

</style>
