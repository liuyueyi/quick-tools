/***
 * 表格，csv数据转为json数组
 */

// ----------------

function toCells(line) {
    line = line.trim();
    if (line.indexOf(',') >= 0) {
        return line.split(',');
    } else if (line.indexOf('\t') >= 0) {
        return line.split('\t',);
    } else {
        return line.split(' ');
    }
}

const FIELD_TAG = "field";
const VALUE_TAG = "value";

function cell2str(cells, tag, expect_len) {
    var res = [];
    var resIndex = 0;

    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if (FIELD_TAG === tag) {
            // 移除双引号
            if (cell.startsWith('"')) {
                cell = cell.replaceAll('"', '');
            }
        } else {
            // 内容解析
            if (!cell.startsWith('"')) {
                if (cell.indexOf("'") >= 0) {
                    cell = cell.replace("'", "\\'");
                }
            }
        }

        res[resIndex++] = cell;
    }

    if (expect_len > cells.length) {
        let i = cells.length;
        while (i < expect_len) {
            res[resIndex++] = "";
            i += 1;
        }
    }
    return res;
}

/**
 * 表格头的个数
 * @param lines
 * @returns {number}
 */
function getTitleNums(lines) {
    // 获取key的个数，主要用于兼容表头粘贴出来之后，出现某个单元格都换行的场景
    var max_len = 0;
    for (var i = 0; i < lines.length; i++) {
        var cells = toCells(lines[i]);
        if (cells.length > max_len) {
            max_len = cells.length;
        }
    }
    return max_len;
}

/**
 * 表格数据格式化
 * @param content
 * @returns {{values: [], fields: null}}
 */
function formatTable(content) {
    var result = {
        "fields": null,
        "values": []
    };
    const lines = content.split('\n');
    const fields_size = getTitleNums(lines);
    let index = 0;
    let field_names = [];
    while (true) {
        const sub_cells = toCells(lines[index]);
        index += 1;
        field_names = field_names.concat(sub_cells);
        if (field_names.length === fields_size) {
            result['fields'] = cell2str(field_names, FIELD_TAG, fields_size);
            break;
        }
    }

    let valIndex = 0;
    for (; index < lines.length; index++) {
        const target = lines[index].trim();
        if (target.length === 0) {
            // 忽略空行
            continue;
        }

        const cells = toCells(target);
        const values = cell2str(cells, VALUE_TAG, fields_size);
        result['values'][valIndex++] = values;
    }
    return result;
}

/**
 * 表格内容转json数组
 * @param content
 */
function table2jsonStr(content, groupKey) {
    let table_content = formatTable(content);
    let i = 0;
    let result = [];
    for (let index = 0; index < table_content['values'].length; index++) {
        let kv = {};
        const keys = table_content['fields'];
        const vals = table_content['values'][index];
        for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            kv[keys[keyIndex]] = vals[keyIndex];
        }
        result[i++] = kv;
    }

    if (typeof (groupKey) === 'undefined' || groupKey == null || groupKey.trim().length === 0) {
        table_content['str'] = JSON.stringify(result);
    } else {
        groupKey = groupKey.trim();
        let ans = {}
        for (let index = 0; index < result.length; index++) {
            const target = result[index];
            const key = target[groupKey];
            if (typeof (key) === "undefined") {
                // 不存在时，返回json数组
                table_content['str'] = JSON.stringify(result);
                return table_content;
            }

            if (typeof (ans[key]) === 'undefined') {
                ans[key] = [target];
            } else {
                ans[key][ans[key].length] = target;
            }
        }
        table_content['str'] = JSON.stringify(ans);
    }
    return table_content;
}

function table2insertSql(content, tableName, ignoreColumn) {
    const table_content = formatTable(content);
    let sql = "insert into `" + tableName + "` (";
    let first = true;
    let ignoreColumnIndex = -1;
    for (let fi = 0; fi < table_content['fields'].length; fi++) {
        if (table_content['fields'][fi] === ignoreColumn) {
            ignoreColumnIndex = fi;
            continue;
        }
        if (first) first = false; else sql += ",";
        sql += "`" + table_content['fields'][fi] + "`";
    }

    sql += ") values ";
    for (let valIndex = 0; valIndex < table_content['values'].length; valIndex++) {
        if (valIndex !== 0) {
            sql += ",";
        }
        sql += "\n(";
        const val = table_content['values'][valIndex];
        first = true;
        for (let vi = 0; vi < val.length; vi++) {
            if (vi === ignoreColumnIndex) continue;
            if (first) first = false; else sql += ",";

            const target = String(val[vi]);
            if (target.indexOf("'") >= 0) {
                sql += "'" + target.replaceAll("'", "\\'") + "'";
            } else {
                sql += "'" + target + "'";
            }
        }
        sql += ")";
    }
    sql += ";";
    table_content['str'] = sql;
    return table_content;
}

function table2markdown(content, ignoreColumn) {
    let ignoreColumnIndex = [];
    let ignoreColumns = ignoreColumn.split(',');

    let res = "| ";
    const table_content = formatTable(content);
    for (let i = 0; i < table_content['fields'].length; i++) {
        let field = table_content['fields'][i];
        if (ignoreColumns.indexOf(field) >= 0) {
            ignoreColumnIndex.push(i);
        } else {
            res += field + " | ";
        }
    }
    res += "\n| ";
    for (let i = 0; i < table_content['fields'].length - ignoreColumnIndex.length; i++) {
        res += "--- | ";
    }

    table_content['values'].forEach(val => {
        res += "\n| ";
        for (let i = 0; i < val.length; i++) {
            if (i in ignoreColumnIndex) {
                continue;
            }

            res += val[i] + " | ";
        }
    })
    table_content['str'] = res;
    return table_content;
}

export {table2jsonStr, table2insertSql, table2markdown};
