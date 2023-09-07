function mergeSql(sql, params) {
    let cells = params.split(",");
    console.log("cells==>", cells, cells.length);
    let tmpSql = sql;
    for(let i = 0; i < cells.length; i++) {
        console.log("i->", i);
        let cell = cells[i];
        let index = cell.indexOf('(');
        if (index > 0) {
            let type = cell.substring(index + 1, cell.indexOf(')'));
            cell = cell.substring(0, index).trim();
            if (type == 'Integer' || type == 'Long' || type == 'Float' || type == 'Double') {
            } else {
                cell = "'" + cell + "'";
            }
        }
        cell = cell.trim();
        console.log("cell ->", cell);
        tmpSql = tmpSql.replace('?', cell);
    }
    return tmpSql;
}

export { mergeSql };
