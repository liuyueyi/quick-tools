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
 * @param excludeColumns 排除列
 * @param selectColumns 选择列
 * @returns {{values: *[], fields: *[]}}
 */
function formatTable(content, excludeColumns, selectColumns) {
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

    for (; index < lines.length; index++) {
        const target = lines[index].trim();
        if (!target) {
            // 忽略空行
            continue;
        }

        const cells = toCells(target);
        result['values'].push(cell2str(cells, VALUE_TAG, fields_size));
    }

    let includeIndex = [];
    let fields = [];
    for (let i = 0; i < result.fields.length; i++) {
        const field = result.fields[i];
        if (excludeColumns && excludeColumns.indexOf(field) >= 0) {
            continue;
        }
        if (!selectColumns || selectColumns.length === 0 || selectColumns.indexOf(field) >= 0) {
            includeIndex.push(i);
            fields.push(field);
        }
    }
    console.log("old keys:", result.fields, " select keys:", fields, "select Columns:", selectColumns);

    let values = [];
    result.values.forEach(val => {
        const subValue = []
        for (let i = 0; i < val.length; i++) {
            if (includeIndex.indexOf(i) >= 0) {
                subValue.push(val[i]);
            }
        }
        values.push(subValue);
    })
    return {
        "fields": fields,
        "values": values
    }
}

/**
 * 表格内容转json数组
 * @param content
 * @param groupKey 分组key
 * @param excludeColumns 排除列
 * @param selectColumns 选择列
 */
function table2jsonStr(content, groupKey, excludeColumns, selectColumns) {
    let table_content = formatTable(content, excludeColumns, selectColumns);
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

function table2insertSql(content, tableName, ignoreColumn, selectColumn) {
    const table_content = formatTable(content, ignoreColumn, selectColumn);
    let sql = "insert into `" + tableName + "` (";
    let first = true;
    for (let fi = 0; fi < table_content['fields'].length; fi++) {
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

function table2markdown(content, ignoreColumn, selectColumn) {
    let res = "| ";
    const table_content = formatTable(content, ignoreColumn, selectColumn);
    for (let i = 0; i < table_content['fields'].length; i++) {
        let field = table_content['fields'][i];
        res += field + " | ";
    }
    res += "\n| ";
    for (let i = 0; i < table_content['fields'].length; i++) {
        res += "--- | ";
    }

    table_content['values'].forEach(val => {
        res += "\n| ";
        for (let i = 0; i < val.length; i++) {
            res += val[i] + " | ";
        }
    })
    table_content['str'] = res;
    return table_content;
}

function table2csv(content, ignoreColumn, selectColumn) {
    const table_content = formatTable(content, ignoreColumn, selectColumn);
    let res = "";
    table_content.fields.forEach(f => res += f + ",");
    res = res.substring(0, res.length - 1) + "\n";
    table_content.values.forEach(val => {
        let row = "";
        let first = true;
        for (let i = 0; i < val.length; i++) {
            if (first) first = false; else row += ",";
            row += val[i];
        }
        row += "\n";
        res += row;
    })
    table_content['str'] = res;
    return table_content;
}

export {formatTable, table2jsonStr, table2insertSql, table2markdown, table2csv};
