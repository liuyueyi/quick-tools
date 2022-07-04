/**
 * base64数据转为Blob
 * @ {String} base64数据
 * @return {Object} Blob
 */
function dataURLtoBlob(base64Data) {
    let tmp = base64Data.split(',');
    if (tmp.length === 2) { // 如果base64包含头部的话，去掉base64的头
        tmp.shift()
    }
    var bytes = window.atob(tmp) // 转换为byte;
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
    }
    return new window.Blob([ab], {type: 'application/octet-stream'})
}

export {
    dataURLtoBlob
}
