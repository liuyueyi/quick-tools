function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}

function isObj(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}

function processJsonObj(jsonBody, line) {
    try {
        let keys = Object.keys(jsonBody);
        if (keys.length === 0) {
            return jsonBody;
        }

        // 长整数会转换为对象，做一个兼容
        if (keys.length === 3) {
            let sub = keys[0] + keys[1] + keys[2];
            if (sub == 'sec' || sub == 'sce' || sub == 'esc' || sub == 'ecs' || sub == 'cse' || sub == "ces") {
                return line;
            }
        }

        let result = {};
        for (let key in jsonBody) {
            const ans = formatJsonStr(jsonBody[key]);
            result[key] = ans;
        }
        return result;
    } catch (e) {
        return jsonBody;
    }
}

function processJsonArray(jsonArray) {
    try {
        if (jsonArray.length === 0) {
            return jsonArray;
        }

        let result = [];
        for (let val of jsonArray) {
            // for of 这里的val为数组内容； 如果是 for in, 则val为数组下标
            result.push(formatJsonStr(val));
        }
        console.log("json result:", jsonArray, "--->", result);
        return result;
    } catch (e) {
        return jsonArray;
    }
}

// 实现json对象的平铺
function formatJsonStr(line) {
    try {
        const jsonBody = JSON.parse(line);
        console.log("line:", jsonBody);
        if (isArray(jsonBody)) {
            return processJsonArray(jsonBody);
        } else if (isObj(jsonBody)) {
            return processJsonObj(jsonBody, line);
        } else {
            return line;
        }
    } catch (e) {
        return line;
    }
}

/**
 * json串，平铺为json对象
 * @param jsonStr
 * @returns {*|[]|undefined}
 */
function expandJsonStr2obj(jsonStr, expand = true) {
    jsonStr = jsonStr.replace(/"\w+":\s*\d{16,}/g, function (longVal) {
        let split = longVal.split(":");
        return split[0] + ':' + '"' + split[1].trim() + '"';
    });
    if (expand) {
        return formatJsonStr(jsonStr);
    } else {
        try {
            return JSON.parse(line);
        } catch (e) {
            return jsonStr;
        }
    }
}


/**
 * json串，平铺并输出json字符串
 * @param jsonStr
 * @returns {string}
 */
function expandJsonStr2Str(jsonStr, expand = true, defaultLenSize = 0) {
    let result = expandJsonStr2obj(jsonStr, expand);
    if (typeof (result) == 'string') {
        return result;
    }
    let res = JSON.stringify(result, null, defaultLenSize);
    console.log(res);
    return res;
}

export {expandJsonStr2Str, expandJsonStr2obj}
