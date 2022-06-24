export const state = () => {
    const tools = [
        {
            title: '文字处理',
            en_title: 'text',
            icon: 'text-outline',
            list: [
                {
                    name: '文本对比',
                    search_keys: 'text compare',
                    icon: '#icon-diff',
                    path: '/tools/text/textdiff',
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
                    head: {
                        keywords: ['csv', 'table', 'json', 'sql'],
                        description: 'csv/table表格数转json,sql'
                    }
                },
                {
                    name: '数字转大写中文',
                    search_keys: "digit to chinese",
                    icon: '#icon-num-parse',
                    path: '/tools/text/number_to_zh',
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
                    name: '富文本编辑器',
                    search_keys: "text editor",
                    icon: '#icon-text-editor',
                    path: '/tools/text/rich_text_editor',
                    head: {
                        keywords: ['富文本编辑器'],
                        description: '在线富文本编辑器'
                    }
                },
                {
                    name: 'Markdown 编辑器',
                    search_keys: "markdown editor",
                    icon: '#icon-markdown',
                    path: '/tools/text/markdown',
                    head: {
                        keywords: ['Markdown编辑器'],
                        description: '在线Markdown编辑器'
                    }
                },
                {
                    name: '摩斯电码转换',
                    search_keys: "Morse code conversion",
                    path: '/tools/text/morse',
                    icon: '#icon-mos-code',
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
                    head: {
                        keywords: ['中英文加空格'],
                        description: '在线中英文加空格'
                    }
                }
            ]
        },
        {
            title: '编程开发',
            en_title: 'code',
            icon: 'code-outline',
            list: [
                {
                    name: '微信公众号编辑器',
                    search_keys: "wechat edit",
                    icon: '#icon-wechat',
                    path: 'https://wechat.hhui.top',
                    head: {
                        keywords: ['微信公众号编辑器'],
                        description: '基于markdown生成微信公众号文章的编辑器'
                    }
                },
                {
                    name: 'CSS 兼容性处理',
                    search_keys: "css",
                    icon: '#icon-css',
                    path: '/tools/code/autoprefixer',
                    head: {
                        keywords: ['CSS兼容性处理', 'autoprefixer', 'postcss'],
                        description: '在线CSS兼容性处理'
                    }
                },
                {
                    name: '时间戳转换',
                    search_keys: "timestamp",
                    icon: '#icon-timestamp',
                    path: '/tools/code/timestamp',
                    head: {
                        keywords: ['时间戳转换', '时间戳获取', "timestamp"],
                        description: '在线时间戳转换|格式化工具'
                    }
                },
                {
                    name: 'HTTP解析',
                    search_keys: 'http parse',
                    icon: '#icon-http',
                    path: '/tools/code/http_format',
                    head: {
                        keywords: ['URL参数查看', 'URL参数解析', 'URL编码', 'URL解码', '请求头转JSON', 'JSON转请求头'],
                        description: 'HTTP参数解析、编解码、请求头处理'
                    }
                },
                {
                    name: '文本加密解密',
                    search_keys: 'text encrypt decrypt',
                    icon: '#icon-encrypted',
                    path: '/tools/code/crypto',
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
                    name: 'Linux 命令查询',
                    search_keys: "linux",
                    icon: '#icon-linux',
                    path: '/tools/code/linux_command',
                    head: {
                        keywords: ['Linux命令查询'],
                        description: '在线Linux命令查询'
                    }
                },
                {
                    name: '文本编码解码',
                    search_keys: "text encode decode",
                    icon: '#icon-encode',
                    path: '/tools/code/encoding',
                    head: {
                        keywords: [
                            '文本编码解码',
                            '文本base64编码',
                            '社会主义核心价值观加密'
                        ],
                        description: '在线文本编码解码'
                    }
                },
                {
                    name: '执行 Cron 表达式',
                    search_keys: 'cron expression',
                    icon: '#icon-crond',
                    path: '/tools/code/crontab',
                    head: {
                        keywords: ['在线执行Cron表达式', '在线模拟Cron表达式'],
                        description: '在线执行Cron表达式'
                    }
                },
                {
                    name: '进制转换',
                    search_keys: 'Binary conversion',
                    icon: '#icon-binary',
                    path: '/tools/code/hexconvert',
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
                    name: '无类别域间路由(CIDR)计算',
                    search_keys: 'CIDR(Classless Inter-Domain Routing)',
                    path: '/tools/code/cidr',
                    icon: '#icon-cidr',
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
                {
                    name: 'UserAgent 解析',
                    search_keys: 'UserAgent decode',
                    icon: '#icon-user-agent',
                    path: '/tools/code/ua_parser',
                    head: {
                        keywords: ['在线 UserAgent 解析'],
                        description: 'UserAgent 解析'
                    }
                },
                {
                    name: '前端 CDN 查询',
                    search_keys: 'cdn query',
                    icon: '#icon-cdn',
                    path: '/tools/code/cdnjs',
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
                    name: 'JSON 编辑器',
                    search_keys: 'json editor',
                    icon: '#icon-json',
                    path: '/tools/code/json_editor',
                    head: {
                        keywords: ['在线JSON编辑器', 'JSON格式化', 'JSON压缩'],
                        description: '在线JSON编辑器'
                    }
                },
                {
                    name: '正则实例大全',
                    search_keys: 'regular demo',
                    icon: '#icon-regular',
                    path: '/tools/code/any_rule',
                    head: {
                        keywords: ['正则大全'],
                        description: '正则实例大全'
                    }
                }
            ]
        },
        {
            title: '图片相关',
            en_title: 'images',
            icon: 'image-outline',
            list: [
                {
                    name: '图片格式转换',
                    search_keys: 'image format conversion',
                    icon: '#icon-img-mine',
                    path: 'https://svgtopng.com/',
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
                    head: {
                        keywords: ['svg', 'jpg', 'png', 'pdf', 'eps'],
                        description: '图片压缩'
                    }
                },
                {
                    name: '二维码生成/解析',
                    search_keys: 'qrcode generate decode',
                    icon: '#icon-qrcode',
                    path: '/tools/image/qrcode_generation',
                    head: {
                        keywords: ['在线二维码生成', '在线二维码内容解析'],
                        description: '二维码生成/解析'
                    }
                },
                {
                    name: '图片加包浆',
                    search_keys: 'image older',
                    icon: '#icon-image-older',
                    path: '/tools/image/image_patina',
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
                    search_keys: 'squared paper for practicing calligraphy',
                    icon: '#icon-nine-cell',
                    path: '/tools/image/img_jiugongge',
                    head: {
                        keywords: ['图片九宫格', '九宫格切图', '九宫格'],
                        description: '图片分割成九宫格'
                    }
                },
                {
                    name: 'Anime 4K高清处理',
                    search_keys: 'Anime 4k',
                    icon: '#icon-4k',
                    path: '/tools/image/anime4k',
                    head: {
                        keywords: ['anime'],
                        description: '3毫秒放大你老婆，支持视频/图片。'
                    }
                },
                {
                    name: '赛博朋克2077图片制作',
                    search_keys: 'Cyberpunk 2077 image create',
                    icon: '#icon-cyberpunk',
                    path: '/tools/image/cyberpunk2077',
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
                    path: '/tools/image/linghe',
                    head: {
                        keywords: ['令和举牌风格图片制作'],
                        description: '在线令和举牌风格图片制作'
                    }
                },
                {
                    name: 'ACG 表情包制作',
                    search_keys: 'acg emoticon create ',
                    icon: '#icon-acg',
                    path: '/tools/image/acg_meme',
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
                    path: '/tools/image/pornhub_logo',
                    head: {
                        keywords: ['PornHub 风格图片制作', 'PornHub Logo 制作'],
                        description: '在线 PornHub 风格图片制作'
                    }
                },
                {
                    name: 'YouTube 风格Logo',
                    search_keys: 'YouTube style logo',
                    icon: '#icon-youtube',
                    path: '/tools/image/youtube_logo',
                    head: {
                        keywords: ['YouTube 风格图片制作', 'YouTube Logo 制作'],
                        description: '在线 YouTube 风格图片制作'
                    }
                },
                {
                    name: '视频转 GIF',
                    search_keys: "video to gif",
                    icon: '#icon-video',
                    path: '/tools/image/video2gif',
                    head: {
                        keywords: ['视频转换GIF图片'],
                        description: '在线视频转换GIF图片'
                    }
                },
                {
                    name: 'GIF 图片分解',
                    search_keys: "gif to images",
                    icon: '#icon-gif',
                    path: '/tools/image/gif_splitter',
                    head: {
                        keywords: ['GIF图片分解'],
                        description: '在线分解GIF图片'
                    }
                },
                {
                    name: '微博生成器',
                    search_keys: "weibo generate",
                    icon: '#icon-weibo',
                    path: '/tools/image/meme-weibo',
                    head: {
                        keywords: ['微博生成器', '王思聪微博生成器'],
                        description: '在线微博生成器'
                    }
                },
                {
                    name: '抖音风格文字生成',
                    search_keys: "TikTok style generate ",
                    icon: '#icon-tiktok',
                    path: '/tools/image/douyin_text',
                    head: {
                        keywords: ['抖音风格文字生成', '抖音样式文字生成'],
                        description: '在线抖音风格文字生成'
                    }
                },
                {
                    name: '图片编辑',
                    search_keys: 'image operate edit',
                    icon: '#icon-edit-image',
                    path: '/tools/image/image_editor',
                    head: {
                        keywords: ['图片编辑器', '图片处理', '表情包制作'],
                        description: '在线图片编辑器'
                    }
                },
                {
                    name: '水印',
                    search_keys: "watermark",
                    icon: '#icon-watermark',
                    path: '/tools/image/watermark',
                    head: {
                        keywords: [
                            '身份证加水印',
                            '敏感信息加水印',
                            '图片加水印'
                        ],
                        description: '在线身份证加水印'
                    }
                }
            ]
        },
        {
            title: '其他工具',
            en_title: 'other',
            icon: 'layers-outline',
            list: [
                {
                    name: '屏幕录制',
                    search_keys: 'screen record',
                    path: '/tools/other/screen_record',
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
                    search_keys: 'rand numbers',
                    icon: '#icon-random',
                    path: '/tools/other/random',
                    head: {
                        keywords: ['在线随机数生成'],
                        description: '在线随机数生成'
                    }
                },

                {
                    name: 'LINE 贴纸下载',
                    search_keys: 'line downloads',
                    icon: '#icon-line',
                    path: '/tools/other/line_sticker_download',
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
                    head: {
                        keywords: ['帮你百度', '怎么用百度', '怎么用谷歌'],
                        description: '帮你百度'
                    }
                },
                {
                    name: 'SSR/V2ray 配置解析',
                    search_keys: 'ssr v2ray config',
                    icon: '#icon-vpn',
                    path: '/tools/other/ssr_decode',
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
                    name: '亲戚关系计算器',
                    search_keys: 'relative calculate',
                    icon: '#icon-relation',
                    path: '/tools/other/relatives_name',
                    head: {
                        keywords: ['亲戚关系计算器'],
                        description: '在线亲戚关系计算器'
                    }
                },
                {
                    name: '这是什么动漫',
                    search_keys: 'what comic',
                    icon: '#icon-comic',
                    path: '/tools/other/what_anime_is_this',
                    head: {
                        keywords: ['根据截图搜索动漫', 'whatanime'],
                        description: '根据截图搜索动漫'
                    }
                },
                {
                    name: '中国传统色',
                    search_keys: 'chinese color',
                    icon: '#icon-color',
                    path: '/tools/other/china_colors',
                    head: {
                        keywords: ['中国传统色'],
                        description: '中国传统色'
                    }
                },
                {
                    name: '日本传统色',
                    search_keys: 'japan color',
                    icon: '#icon-japan',
                    path: '/tools/other/japan_colors',
                    head: {
                        keywords: ['日本传统色', '日本の伝統色'],
                        description: '日本传统色'
                    }
                },
                {
                    name: '颜色处理',
                    search_keys: 'color pick',
                    icon: '#icon-pick',
                    path: '/tools/other/color',
                    head: {
                        keywords: ['hex转rgb', '颜色代码转换', '在线颜色选择'],
                        description: '在线图片选择'
                    }
                },
                {
                    name: '收款码合并',
                    search_keys: 'qrcode merge',
                    icon: '#icon-pay',
                    path: '/tools/other/universal_pay',
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
                {
                    name: '温度单位转换',
                    search_keys: 'Temperature unit conversion',
                    icon: '#icon-temperature',
                    path: '/tools/other/temperature_conversion',
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
                    name: '身份证号码',
                    search_keys: 'id no credit number',
                    icon: '#icon-credit',
                    path: '/tools/other/chinese_id',
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
        },
        // {
        //     title: '网站相关',
        //     en_title: 'website settings',
        //     icon: 'settings-2-outline',
        //     list: [
        //         {
        //             name: '网站设置',
        //             search_keys: 'setting',
        //             path: '/setting',
        //             icon: 'settings-2-outline'
        //         },
        //         {
        //             name: '工具隐藏',
        //             search_keys: 'tool hide',
        //             path: '/hide_tool',
        //             icon: 'scissors-outline'
        //
        //         },
        //         {
        //             name: '友情链接',
        //             search_keys: 'links',
        //             path: '/links',
        //             icon: 'link-outline'
        //         }
        //     ]
        // }
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
