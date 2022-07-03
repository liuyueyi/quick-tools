import pinyin from './pinyin';

export default {
    title: '神奇工具箱',
    domain:
        process.env.NODE_ENV === 'development'
            ? 'localhost:3000'
            : 'tool.hhui.top',
    description: '小工具集合',
    url:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://tool.hhui.top',
    apiUrl:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001'
            : 'https://media.hhui.top',
    pinyin: pinyin,
    development: process.env.NODE_ENV === 'development',
    axios:
        process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:3001'
            : 'https://media.hhui.top'
};
