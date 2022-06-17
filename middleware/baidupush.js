export default ({ route }) => {
    if (process.browser) {
        // https://zz.bdstatic.com/linksubmit/push.js
        const r = `${window.location.origin}${route.path}`;
        const t = document.referrer;
        const i = new Image();
        let o = 'http://data.zz.baidu.com/urls?site=https://tool.hhui.top&token=DbPaLSuo7eeltFdy';
        t
            ? ((o += '?r=' + encodeURIComponent(document.referrer)),
              r && (o += '&l=' + r))
            : r && (o += '?l=' + r);

        i.src = o;
    }
};
