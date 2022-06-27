export const state = () => {
    const navs = [
        {
            title: '综合',
            tab: 'total',
            icon: 'text-outline',
            list: [
                {
                    name: "京东",
                    icon: 'https://www.jd.com/favicon.ico',
                    search_keys: 'jd 电商',
                    path: 'https://www.jd.com',
                    hot: 100,
                }
            ]
        },
        {
            title: '社区',
            tab: 'bbs',
            icon: 'text-outline',
            list: [
                {
                    name: "一灰灰Blog",
                    icon: 'https://spring.hhui.top/hexblog/images/avatar.jpg',
                    search_keys: 'blog dev it 一灰灰 教程 java spring 后端 全栈',
                    path: 'https://spring.hhui.top',
                    hot: 10000,
                },
                {
                    name: "博客园",
                    icon: 'https://www.cnblogs.com/favicon.ico',
                    search_keys: 'blog dev it',
                    path: 'https://www.cnblogs.com',
                    hot: 100,
                },
                {
                    name: "CSDN",
                    icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
                    search_keys: 'blog dev it',
                    path: 'https://www.csdn.net',
                    hot: 100,
                }
            ]
        },
    ];

    navs.forEach(i => {
        i.list.forEach(nav => {
            const pinyin = process.env.pinyin;
            if (pinyin) {
                nav.pinyin = pinyin[nav.name];
            }
        });
    });
    return navs;
};
