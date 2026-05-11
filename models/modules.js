const { query } = require('../database');
const { EMPTY_RESULT_ERROR, SQL_ERROR_CODE, UNIQUE_VIOLATION_ERROR } = require('../errors');

module.exports.create = function create(code, name, credit) {
return query('CALL create_module($1, $2, $3)', [code, name, credit])
.then(function (result) {
console.log('Module created successfully');
})
.catch(function (error) {
throw error;
});
};

module.exports.retrieveByCode = function retrieveByCode(code) {
    const sql = `SELECT * FROM module WHERE mod_code = $1`;
    return query(sql, [code]).then(function (result) {
        const rows = result.rows;

        if (rows.length === 0) {
            // Note: result.rowCount returns the number of rows processed instead of returned
            // Read more: https://node-postgres.com/apis/result#resultrowcount-int--null
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }

        return rows[0];
    });
};

module.exports.updateByCode = function updateByCode(code, credit) {
    // Now using stored procedure instead of raw SQL
    // Error handling is done in the stored procedure itself
    return query('CALL update_module($1, $2)', [code, credit])
        .then(function (result) {
            console.log('Module updated successfully');
        })
        .catch(function (error) {
            throw error;
        });
};

module.exports.deleteByCode = function deleteByCode(code) {
    // Now using stored procedure instead of raw SQL
    // Error handling is done in the stored procedure itself
    return query('CALL delete_module($1)', [code])
        .then(function (result) {
            console.log('Module deleted successfully');
        })
        .catch(function (error) {
            throw error;
        });
};

module.exports.retrieveAll = function retrieveAll() {
// retrieve students via stored procedure
const sql = `SELECT adm_no, stud_name, gender, crse_code, gpa, gpa_last_updated FROM student`;
return query(sql).then(function (result) {
return result.rows;
});
};

module.exports.retrieveBulk = function retrieveBulk(codes) {
    const sql = 'SELECT * FROM module WHERE code IN ($1)';
    return query(sql, [codes]).then(function (response) {
        const rows = response.rows;
        const result = {};
        for (let i = 0; i < rows.length; i += 1) {
            const row = rows[i];
            const code = row.code;
            result[code] = row;
        }
        return result;
    });
};
