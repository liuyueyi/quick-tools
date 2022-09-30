export const state = () => {
    const tools = [
        {
            title: '文本',
            tab: 'text',
            icon: 'text-outline',
            list: [
                {
                    name: 'csv格式化',
                    search_keys: 'csv',
                    icon: '#icon-csv',
                    path: '/tools/text/csv',
                    recommend: false,
                    head: {
                        keywords: [
                            'csv',
                            'excel',
                        ],
                        description: 'csv格式化'
                    }
                },
                {
                    name: '文件base64',
                    search_keys: 'file base64',
                    icon: '#icon-file-encode',
                    path: '/tools/code/base64',
                    recommend: false,
                    head: {
                        keywords: [
                            'base64',
                            'image',
                        ],
                        description: '文件base64编码'
                    }
                },
                {
                    name: '文本加密解密',
                    search_keys: 'text encrypt decrypt base64',
                    icon: '#icon-encrypted',
                    path: '/tools/code/crypto',
                    recommend: false,
                    head: {
                        keywords: [
                            '文本加密解密',
                            '文本哈希计算',
                            'MD5加密',
                            'AES',
                            'DES',
                            'HmacMD5',
                            'HmacSHA1',
                            'HmacSHA256',
                            'HmacSHA512',
                            'RC4',
                            'RC4Drop',
                            'RIPEMD160',
                            'Rabbit',
                            'SHA1',
                            'SHA256',
                            'SHA3',
                            'TripleDES'
                        ],
                        description: '在线文本哈希散列计算'
                    }
                },
                {
                    name: '文本编码解码',
                    search_keys: "text encode decode base64",
                    icon: '#icon-encode',
                    path: '/tools/code/encoding',
                    recommend: false,
                    head: {
                        keywords: [
                            '文本编码解码',
                            '文本base64编码',
                            '社会主义核心价值观加密'
                        ],
                        description: 'base64,unicode,url编解码,敏感词过滤'
                    }
                },
                {
                    name: '文本对比',
                    search_keys: 'text compare',
                    icon: '#icon-diff',
                    path: '/tools/text/textdiff',
                    recommend: false,
                    head: {
                        keywords: ['文本对比', '代码对比'],
                        description: '文本在线对比'
                    }
                },
                {
                    name: '文本去重',
                    search_keys: "text remove duplicate",
                    icon: '#icon-text-duplicate',
                    path: '/tools/text/remove_duplicate',
                    recommend: false,
                    head: {
                        keywords: ['文本在线去重', '文本去除重复'],
                        description: '文本在线去重'
                    }
                },
                {
                    name: '文本替换',
                    search_keys: "text replace",
                    icon: '#icon-text-replace',
                    path: '/tools/text/text_replace',
                    recommend: false,
                    head: {
                        keywords: ['文本在线替换', '字符串替换'],
                        description: '文本在线替换'
                    }
                },

                {
                    name: '表格数据格式化',
                    search_keys: "table csv sql format",
                    icon: '#icon-table',
                    path: '/tools/text/table_format',
                    recommend: false,
                    head: {
                        keywords: ['csv', 'table', 'json', 'sql'],
                        description: 'csv/table表格数转json,sql'
                    }
                },

                {
                    name: '字数统计',
                    search_keys: "word count number",
                    icon: '#icon-num-parse',
                    path: '/tools/text/wordcount',
                    recommend: false,
                    head: {
                        keywords: [
                            '字数统计',
                            'word count',
                        ],
                        description: '在线统计有效字符数'
                    }
                },
                {
                    name: '新词释义',
                    search_keys: "zao ci new word",
                    icon: '#icon-word',
                    path: '/tools/text/newWord',
                    recommend: true,
                    head: {
                        keywords: ['造新词', '新词释义'],
                        description: '给成语添加新的解释说明'
                    }
                },

                {
                    name: '摩斯电码转换',
                    search_keys: "Morse code conversion",
                    path: '/tools/text/morse',
                    icon: '#icon-mos-code',
                    recommend: false,
                    head: {
                        keywords: ['摩斯电码转换', '中文摩斯电码转换'],
                        description: '在线摩斯电码转换'
                    }
                },
                {
                    name: '盲人摸象加解密',
                    search_keys: 'blind men and the elephant',
                    icon: '#icon-elephant',
                    path: '/tools/text/sot1_encrypt',
                    recommend: false,
                    head: {
                        keywords: ['盲人摸象', '转码', '加解密'],
                        description: '在线盲人摸象加解密'
                    }
                },

                {
                    name: '中英文加空格',
                    search_keys: "space between chinese",
                    icon: '#icon-zh-en',
                    path: '/tools/text/text_autospace',
                    recommend: false,
                    head: {
                        keywords: ['中英文加空格'],
                        description: '在线中英文加空格'
                    }
                },
            ]
        },
        {
            title: '转换',
            tab: 'convert',
            icon: '',
            list: [
                {
                    name: '汉字转拼音',
                    search_keys: "chinese transfer pinyin zhongwen",
                    icon: '#icon-pinyin',
                    path: '/tools/convert/pinyin',
                    recommend: false,
                    head: {
                        keywords: ['汉字', '中文', '拼音'],
                        description: '中文汉字转拼音'
                    }
                },
                {
                    name: '简繁转换',
                    search_keys: "chinese simple traditional",
                    icon: '#icon-zhong',
                    path: '/tools/convert/zhconvert',
                    recommend: false,
                    head: {
                        keywords: [
                            '简繁转换',
                            '中文简体转繁体',
                            '中文繁体转简体',
                        ],
                        description: '简繁互转'
                    }
                },
                {
                    name: '金额大小写转换',
                    search_keys: "digit to chinese",
                    icon: '#icon-money',
                    path: '/tools/convert/num2zh',
                    recommend: true,
                    head: {
                        keywords: [
                            '数字转大写中文',
                            '中文金额转换',
                            '人民币转中文',
                            '中文转人民币'
                        ],
                        description: '在线人民币转中文'
                    }
                },
                {
                    name: '进制转换',
                    search_keys: 'Binary convert',
                    icon: '#icon-binary',
                    path: '/tools/convert/hexconvert',
                    recommend: false,
                    head: {
                        keywords: [
                            '进制转换',
                            '二进制转换',
                            '八进制转换',
                            '十进制转换',
                            '十六进制转换',
                            '三十二进制转换'
                        ],
                        description: '在线进制转换'
                    },
                    hot: 100
                },
                {
                    name: '大小写转换',
                    search_keys: 'word convert up low',
                    icon: '#icon-word-up',
                    path: '/tools/convert/low2up',
                    recommend: false,
                    head: {
                        keywords: [
                            '英文大小写转换',
                            '首字母大写'
                        ],
                        description: '大小写转换,首字母大写'
                    },
                    hot: 100
                },
                {
                    name: '驼峰下划线',
                    search_keys: 'camel under line convert',
                    icon: '#icon-camel',
                    path: '/tools/convert/camel',
                    recommend: true,
                    head: {
                        keywords: [
                            '驼峰转下换线',
                            '下划线转驼峰'
                        ],
                        description: '驼峰下划线互转'
                    },
                    hot: 100
                },
            ]
        },
        {
            title: '计算',
            tab: 'calculate',
            icon: '',
            list: [
                {
                    name: '集合计算',
                    search_keys: 'set calculate',
                    icon: '#icon-set-collection',
                    path: '/tools/convert/set',
                    recommend: false,
                    head: {
                        keywords: ['集合计算', '交集', '并集', '补集', '差集', '全集'],
                        description: '集合操作计算'
                    }
                },
                {
                    name: '亲戚关系计算器',
                    search_keys: 'relative calculate convert',
                    icon: '#icon-relation',
                    path: '/tools/convert/relative',
                    recommend: false,
                    head: {
                        keywords: ['亲戚关系计算器'],
                        description: '在线亲戚关系计算器'
                    }
                },
                {
                    name: '温度单位转换',
                    search_keys: 'Temperature unit convert',
                    icon: '#icon-temperature',
                    path: '/tools/convert/temperature',
                    recommend: false,
                    head: {
                        keywords: [
                            '温度单位转换',
                            '摄氏度单位转换',
                            '华氏度转单位换',
                            '开氏度单位转换',
                            '兰氏度单位转换',
                            '列氏度单位转换'
                        ],
                        description: '在线国际温度单位转换'
                    }
                },
                {
                    name: '时间转换',
                    search_keys: 'time unit convert',
                    icon: '#icon-time',
                    path: '/tools/convert/time',
                    recommend: false,
                    head: {
                        keywords: [
                            '时间转换',
                            '年周天',
                            '时分秒',
                        ],
                        description: '年、周、天、时分秒、毫秒相互之间的时间单位转换'
                    }
                },
            ]
        },
        {
            title: '编辑器',
            tab: 'editor',
            icon: '',
            list: [
                {
                    name: '富文本编辑器',
                    search_keys: "text editor",
                    icon: '#icon-text-editor',
                    path: '/tools/editor/richText',
                    recommend: false,
                    head: {
                        keywords: ['富文本编辑器'],
                        description: '在线富文本编辑器'
                    }
                },
                {
                    name: 'Markdown 编辑器',
                    search_keys: "markdown editor",
                    icon: '#icon-markdown',
                    path: '/tools/editor/md',
                    recommend: false,
                    head: {
                        keywords: ['Markdown编辑器'],
                        description: '在线Markdown编辑器'
                    }
                },
                {
                    name: 'JSON 编辑器',
                    search_keys: 'json editor',
                    icon: '#icon-json',
                    path: '/tools/editor/json',
                    recommend: true,
                    head: {
                        keywords: ['在线JSON编辑器', 'JSON格式化', 'JSON压缩'],
                        description: '在线JSON编辑器'
                    }
                },
                {
                    name: '微信公众号编辑器',
                    search_keys: "wechat editor markdown",
                    icon: '#icon-wechat',
                    path: 'https://wechat.hhui.top',
                    recommend: true,
                    head: {
                        keywords: ['微信公众号编辑器'],
                        description: '基于markdown生成微信公众号文章的编辑器'
                    }
                },
            ]
        },
        {
            title: '编程',
            tab: 'code',
            icon: 'code-outline',
            list: [
                {
                    name: '时间戳转换',
                    search_keys: "timestamp",
                    icon: '#icon-timestamp',
                    path: '/tools/code/timestamp',
                    recommend: true,
                    head: {
                        keywords: ['时间戳转换', '时间戳获取', "timestamp"],
                        description: '在线时间戳转换|格式化工具'
                    }
                },
                {
                    name: 'Markdown表格格式化',
                    search_keys: "markdown table format",
                    icon: '#icon-format',
                    path: '/tools/code/mdformat',
                    recommend: true,
                    head: {
                        keywords: ['markdown', '表格', "格式化", "表格数据格式化"],
                        description: 'markdown 表格数据格式化'
                    }
                },
                {
                    name: 'Html美化',
                    search_keys: "html js beautify css format",
                    icon: '#icon-beautify',
                    path: '/tools/code/htmlformat',
                    recommend: true,
                    head: {
                        keywords: ['html', 'css', "javascript", "beautify"],
                        description: 'html编码美化工具'
                    }
                },
                {
                    name: 'HTTP解析',
                    search_keys: 'http parse',
                    icon: '#icon-http',
                    path: '/tools/code/http',
                    recommend: false,
                    head: {
                        keywords: ['URL参数查看', 'URL参数解析', 'URL编码', 'URL解码', '请求头转JSON', 'JSON转请求头'],
                        description: 'HTTP参数解析、编解码、请求头处理'
                    }
                },
                {
                    name: 'UserAgent 解析',
                    search_keys: 'UserAgent decode',
                    icon: '#icon-user-agent',
                    path: '/tools/code/ua',
                    recommend: false,
                    head: {
                        keywords: ['在线 UserAgent 解析'],
                        description: 'UserAgent 解析'
                    }
                },
                {
                    name: 'CSS 兼容性处理',
                    search_keys: "css",
                    icon: '#icon-css',
                    path: '/tools/code/autoprefixer',
                    recommend: false,
                    head: {
                        keywords: ['CSS兼容性处理', 'autoprefixer', 'postcss'],
                        description: '在线CSS兼容性处理'
                    }
                },
                {
                    name: 'Linux 命令查询',
                    search_keys: "linux",
                    icon: '#icon-linux',
                    path: '/tools/code/linux',
                    recommend: false,
                    head: {
                        keywords: ['Linux命令查询'],
                        description: '在线Linux命令查询'
                    }
                },
                {
                    name: '执行 Cron 表达式',
                    search_keys: 'cron expression',
                    icon: '#icon-crond',
                    path: '/tools/code/crontab',
                    recommend: true,
                    head: {
                        keywords: ['在线执行Cron表达式', '在线模拟Cron表达式'],
                        description: '在线执行Cron表达式'
                    }
                },
                {
                    name: '前端 CDN 查询',
                    search_keys: 'cdn query',
                    icon: '#icon-cdn',
                    path: '/tools/code/cdnjs',
                    recommend: false,
                    head: {
                        keywords: [
                            '前端CDN',
                            'CDNJS',
                            'BootCDN',
                            'CSS.NET',
                            'Baomitu CDN',
                            'Staticfile CDN'
                        ],
                        description: '前端CDN库查询'
                    }
                },
                {
                    name: '正则实例大全',
                    search_keys: 'regular demo',
                    icon: '#icon-regular',
                    path: '/tools/code/regular',
                    recommend: true,
                    head: {
                        keywords: ['正则大全'],
                        description: '正则实例大全'
                    }
                }
            ]
        },
        {
            title: '设计',
            tab: 'design',
            icon: 'browser-outline',
            list: [
                {
                    name: '中国传统色',
                    search_keys: 'chinese color china',
                    icon: '#icon-color',
                    path: '/tools/design/chinaColors',
                    recommend: false,
                    head: {
                        keywords: ['中国传统色'],
                        description: '中国传统色'
                    }
                },
                {
                    name: '日本传统色',
                    search_keys: 'japan color',
                    icon: '#icon-japan',
                    path: '/tools/design/japanColors',
                    recommend: false,
                    head: {
                        keywords: ['日本传统色', '日本の伝統色'],
                        description: '日本传统色'
                    }
                },
                {
                    name: '颜色提取/转换',
                    search_keys: 'color pick transformation',
                    icon: '#icon-pick',
                    path: '/tools/design/color',
                    recommend: false,
                    head: {
                        keywords: ['hex转rgb', '颜色代码转换', '在线颜色选择'],
                        description: '在线图片颜色提取，颜色格式转换'
                    }
                },
            ]
        },
        {
            title: '图像',
            tab: 'img',
            icon: 'image-outline',
            list: [
                {
                    name: '图片编辑',
                    search_keys: 'image cut operate',
                    icon: '#icon-cut',
                    path: '/tools/image/cut',
                    recommend: true,
                    hot: 1000,
                    head: {
                        keywords: ['image', 'jpg', 'png', 'pdf', 'rotate', 'cut', 'operate', '裁剪', '编辑', '镜像'],
                        description: '图片旋转、裁剪、镜像操作'
                    }
                },
                {
                    name: '水印移除',
                    search_keys: "watermark remove",
                    icon: '#icon-remove',
                    path: '/tools/image/rmwater',
                    recommend: false,
                    head: {
                        keywords: [
                            '移除水印',
                            '删除水印'
                        ],
                        description: '自动移除图片水印'
                    }
                },
                {
                    name: '添加水印',
                    search_keys: "watermark",
                    icon: '#icon-watermark',
                    path: '/tools/image/watermark',
                    recommend: false,
                    head: {
                        keywords: [
                            '身份证加水印',
                            '敏感信息加水印',
                            '图片加水印'
                        ],
                        description: '在线身份证加水印'
                    }
                },
                {
                    name: 'SVG渲染',
                    search_keys: 'svg format conversion render',
                    icon: '#icon-svg',
                    path: '/tools/image/svg',
                    recommend: false,
                    head: {
                        keywords: ['svg', 'jpg', 'png', 'pdf', 'eps'],
                        description: 'svg渲染 & svg转png/jpg/pdf'
                    }
                },
                {
                    name: '图片格式转换',
                    search_keys: 'image format conversion',
                    icon: '#icon-img-mine',
                    path: 'https://svgtopng.com/',
                    recommend: false,
                    head: {
                        keywords: ['svg', 'jpg', 'png', 'pdf', 'eps'],
                        description: 'svg/png/jpg/pdf格式互转'
                    }
                },
                {
                    name: '图片压缩',
                    search_keys: 'image compress',
                    icon: '#icon-compress',
                    path: 'https://squoosh.app/',
                    recommend: false,
                    head: {
                        keywords: ['svg', 'jpg', 'png', 'pdf', 'eps'],
                        description: '图片压缩'
                    }
                },
                {
                    name: '动画4K高清处理',
                    search_keys: 'Anime 4k comic',
                    icon: '#icon-4k',
                    path: '/tools/image/anime4k',
                    recommend: false,
                    head: {
                        keywords: ['anime'],
                        description: '3毫秒放大你老婆，支持视频/图片。'
                    }
                },
                {
                    name: '图片加包浆',
                    search_keys: 'image older',
                    icon: '#icon-image-older',
                    path: '/tools/image/imagePatina',
                    recommend: false,
                    head: {
                        keywords: [
                            '图片做旧',
                            '表情包做旧',
                            '电子包浆',
                            '表情包包浆'
                        ],
                        description: '图片包浆'
                    }
                },
                {
                    name: '九宫格切图',
                    search_keys: 'squared paper for practicing calligraphy nine',
                    icon: '#icon-nine-cell',
                    path: '/tools/image/jiugongge',
                    recommend: false,
                    head: {
                        keywords: ['图片九宫格', '九宫格切图', '九宫格'],
                        description: '图片分割成九宫格'
                    }
                },
                {
                    name: '视频转 GIF',
                    search_keys: "video to gif",
                    icon: '#icon-video',
                    path: '/tools/image/video2gif',
                    recommend: false,
                    head: {
                        keywords: ['视频转换GIF图片'],
                        description: '在线视频转换GIF图片'
                    }
                },
                {
                    name: 'GIF 图片分解',
                    search_keys: "gif to images",
                    icon: '#icon-gif',
                    path: '/tools/image/gifSplitter',
                    recommend: false,
                    head: {
                        keywords: ['GIF图片分解'],
                        description: '在线分解GIF图片'
                    }
                },
                {
                    name: '图片编辑',
                    search_keys: 'image operate editor',
                    icon: '#icon-edit-image',
                    path: '/tools/image/imageEditor',
                    recommend: false,
                    head: {
                        keywords: ['图片编辑器', '图片处理', '表情包制作'],
                        description: '在线图片编辑器'
                    }
                }
            ]
        },
        {
            title: '图片合成',
            tab: 'merge',
            icon: '',
            list: [
                {
                    name: '占位图',
                    search_keys: 'image placeholder',
                    icon: '#icon-place-holder',
                    path: '/tools/merge/imgholder',
                    recommend: false,
                    head: {
                        keywords: ['image', 'placeholder', 'holder', '占位图'],
                        description: '生成占位图'
                    }
                },
                {
                    name: '专栏封面',
                    search_keys: 'image cover blog',
                    icon: '#icon-banner',
                    path: '/tools/merge/blogCover',
                    recommend: false,
                    head: {
                        keywords: ['image', 'blog', 'cover'],
                        description: '博文封面、专栏封面便捷生成器'
                    }
                },
                {
                    name: '赛博朋克2077图片制作',
                    search_keys: 'Cyberpunk 2077 image create',
                    icon: '#icon-cyberpunk',
                    path: '/tools/merge/cyberpunk2077',
                    recommend: false,
                    head: {
                        keywords: [
                            'Cyberpunk2077',
                            '赛博朋克2077',
                            'Cyberpunk 2077 meme'
                        ],
                        description: '在线Cyberpunk 2077风格图片制作'
                    }
                },
                {
                    name: '令和举牌生成',
                    search_keys: 'show image create',
                    icon: '#icon-brand',
                    path: '/tools/merge/linghe',
                    recommend: false,
                    head: {
                        keywords: ['令和举牌风格图片制作'],
                        description: '在线令和举牌风格图片制作'
                    }
                },
                {
                    name: 'ACG 表情包制作',
                    search_keys: 'acg emoticon create ',
                    recommend: true,
                    icon: '#icon-acg',
                    path: '/tools/merge/acg_meme',
                    head: {
                        keywords: [
                            '动漫表情包制作',
                            '表情包制作',
                            '咋百度啊',
                            '啥玩意儿啊'
                        ],
                        description: '在线动漫表情包制作'
                    }
                },
                {
                    name: 'Pornhub 风格Logo',
                    search_keys: 'Pornhub style logo',
                    icon: '#icon-p',
                    path: '/tools/merge/pornhub_logo',
                    recommend: false,
                    head: {
                        keywords: ['PornHub 风格图片制作', 'PornHub Logo 制作'],
                        description: '在线 PornHub 风格图片制作'
                    }
                },
                {
                    name: 'YouTube 风格Logo',
                    search_keys: 'YouTube style logo',
                    icon: '#icon-youtube',
                    path: '/tools/merge/youtube_logo',
                    recommend: false,
                    head: {
                        keywords: ['YouTube 风格图片制作', 'YouTube Logo 制作'],
                        description: '在线 YouTube 风格图片制作'
                    }
                },
                {
                    name: '微博生成器',
                    search_keys: "weibo generate",
                    icon: '#icon-weibo',
                    path: '/tools/merge/weibo',
                    recommend: false,
                    head: {
                        keywords: ['微博生成器', '王思聪微博生成器'],
                        description: '在线微博生成器'
                    }
                },
                {
                    name: '抖音风格文字生成',
                    search_keys: "TikTok style generate ",
                    icon: '#icon-tiktok',
                    path: '/tools/merge/douyin_text',
                    recommend: false,
                    head: {
                        keywords: ['抖音风格文字生成', '抖音样式文字生成'],
                        description: '在线抖音风格文字生成'
                    }
                },
            ]
        },
        {
            title: '二维码',
            tab: 'qrcode',
            icon: '',
            list: [
                {
                    name: '二维码生成/解析',
                    search_keys: 'qrcode generate decode',
                    icon: '#icon-qrcode',
                    path: '/tools/qr/qrcode',
                    recommend: false,
                    head: {
                        keywords: ['在线二维码生成', '在线二维码内容解析'],
                        description: '二维码生成/解析'
                    }
                },
                {
                    name: '收款码合并',
                    search_keys: 'qrcode merge pay credit',
                    icon: '#icon-pay',
                    path: '/tools/qr/universal_pay',
                    recommend: true,
                    hot: 1000,
                    head: {
                        keywords: [
                            '免费收款码合并',
                            '免费三码合一',
                            '支付宝收款码合并',
                            '微信收款码合并',
                            'QQ收款码合并'
                        ],
                        description: '在线免费收款码合并'
                    }
                },
            ]
        },
        {
            title: '运维&站长',
            tab: 'devops',
            icon: '',
            list: [
                {
                    name: '站点地图生成',
                    search_keys: 'sitemap',
                    icon: '#icon-sitemap',
                    path: '/tools/devops/sitemap',
                    recommend: false,
                    head: {
                        keywords: [
                            '站点地图',
                            'sitemap',
                            'SEO'
                        ],
                        description: '站点地图在线生成小工具'
                    }
                },
                {
                    name: 'SSR/V2ray 配置解析',
                    search_keys: 'ssr v2ray config',
                    icon: '#icon-vpn',
                    path: '/tools/devops/ssr_decode',
                    recommend: false,
                    head: {
                        keywords: [
                            'SSR配置解密',
                            'SS配置解密',
                            'V2ray配置解密'
                        ],
                        description: '在线SSR配置解析'
                    }
                },
                {
                    name: '无类别域间路由(CIDR)计算',
                    search_keys: 'CIDR(Classless Inter-Domain Routing)',
                    path: '/tools/devops/cidr',
                    icon: '#icon-cidr',
                    recommend: false,
                    head: {
                        keywords: [
                            'CIDR',
                            'IP',
                            '网络ID',
                            'IP地址',
                            '子网掩码',
                            '广播地址'
                        ],
                        description: '在线CIDR子网计算'
                    }
                },

            ],
        },
        {
            title: '其他工具',
            tab: 'other',
            icon: 'layers-outline',
            list: [
                {
                    name: '屏幕录制',
                    search_keys: 'screen record',
                    path: '/tools/other/screen_record',
                    recommend: true,
                    hot: 1000,
                    head: {
                        keywords: ['屏幕录制', '在线录屏'],
                        description: '在网页上完成录屏'
                    },
                    icon: '#icon-record',
                },
                {
                    name: '番茄时钟',
                    search_keys: 'tomato clock',
                    icon: '#icon-clock',
                    path: '/tools/other/pomodoro_technique',
                    recommend: true,
                    head: {
                        keywords: ['在线番茄时钟', '番茄工作法'],
                        description: '在线番茄时钟'
                    }
                },
                {
                    name: '人生小格',
                    search_keys: 'life cell lattice',
                    icon: '#icon-lattice',
                    path: '/tools/other/lifecount',
                    recommend: true,
                    hot: 1000,
                    head: {
                        keywords: [
                            '人生小格',
                            '人生进度条',
                            'lifecount',
                            '生命进度'
                        ],
                        description: '人生小格'
                    }
                },
                {
                    name: '随机数生成',
                    search_keys: 'random numbers',
                    icon: '#icon-random',
                    path: '/tools/other/random',
                    recommend: false,
                    head: {
                        keywords: ['在线随机数生成'],
                        description: '在线随机数生成'
                    }
                },
                {
                    name: '随机密码生成',
                    search_keys: 'random password pwd',
                    icon: '#icon-key',
                    path: '/tools/other/random_pwd',
                    recommend: true,
                    head: {
                        keywords: ['在线随机密码生成'],
                        description: '在线随机密码生成'
                    }
                },
                {
                    name: 'LINE 贴纸下载',
                    search_keys: 'line downloads',
                    icon: '#icon-line',
                    path: '/tools/other/line_sticker_download',
                    recommend: false,
                    head: {
                        keywords: [
                            '怎么下载LINE表情包',
                            '怎么下载LINE贴纸',
                            '怎么保存LINE表情包',
                            'LINE表情包png'
                        ],
                        description: 'LINE贴纸在线下载'
                    }
                },
                {
                    name: '帮你百度',
                    search_keys: 'baidu',
                    icon: '#icon-baidu',
                    path: '/tools/other/search_help',
                    recommend: false,
                    head: {
                        keywords: ['帮你百度', '怎么用百度', '怎么用谷歌'],
                        description: '帮你百度'
                    }
                },
                {
                    name: '这是什么动漫',
                    search_keys: 'what comic',
                    icon: '#icon-comic',
                    path: '/tools/other/what_anime_is_this',
                    recommend: false,
                    head: {
                        keywords: ['根据截图搜索动漫', 'whatanime'],
                        description: '根据截图搜索动漫'
                    }
                },
                {
                    name: '身份证号码',
                    search_keys: 'id no credit number',
                    icon: '#icon-credit',
                    path: '/tools/other/chinese_id',
                    recommend: false,
                    head: {
                        keywords: [
                            '身份证号码查询',
                            '随机身份证号码生成',
                            '身份证信息查询'
                        ],
                        description: '身份证号码查询/生成'
                    }
                }
            ]
        }
    ];

    tools.forEach(i => {
        i.list.forEach(tool => {
            let head = {
                meta: []
            };
            if (!tool.head) {
                tool.head = head;
            }

            head.title = `${tool.head.title ? tool.head.title : tool.name} - ${
                process.env.title
            }`;
            if (tool.head.other) {
                head.meta = head.meta.concat(tool.head.other);
            }
            if (tool.head.keywords) {
                tool.head.keywords = tool.head.keywords.concat([
                    'Quick工具箱',
                    '在线工具'
                ]);
                head.meta.push({
                    hid: 'keywords',
                    keywords: tool.head.keywords.join(',')
                });
            }
            if (tool.head.description) {
                head.meta.push({
                    hid: 'description',
                    description: tool.head.description
                });
            }
            tool.head = head;
            const pinyin = process.env.pinyin;
            if (pinyin) {
                tool.pinyin = pinyin[tool.name];
            }
        });
    });
    return tools;
};
