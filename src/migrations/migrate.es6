import db from '../config/db';
import Schema from './schema';

import _ from 'lodash';
import async from 'async';


function createTable(tableName) {
    return db.schema.createTable(tableName, (table) => {
        let column;
        const columnKeys = _.keys(Schema[tableName]);

        _.each(columnKeys, (key) => {
            if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
            } else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
            } else {
                column = table[Schema[tableName][key].type](key);
            }

            if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
                column.nullable();
            } else {
                column.notNullable();
            }

            if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
                column.primary();
            }
            if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
                column.unique();
            }
            if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
                column.unsigned();
            }
            if (Schema[tableName][key].hasOwnProperty('references')) {
                column.references(Schema[tableName][key].references);
            }
            if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
                column.defaultTo(Schema[tableName][key].defaultTo);
            }
        });
    });
}

const initDb = () => {
    let calls = [];
    const tableNames = _.keys(Schema);

    tableNames.forEach(tableName => {
        const createOrSkip = (callback) => {
            db.schema.hasTable(tableName)
            .then((exists) => {
                if (!exists) {
                    console.log(`Creating database table ${tableName}...`);
                    createTable(tableName)
                    .then((result) => {
                        console.log(`--> Created table ${tableName}.`);
                        callback(null, result);
                    })
                    .catch((error) => {
                        console.log(`--! Error creating table ${tableName}.`);
                        callback(error, null);
                    });
                } else {
                    callback(null, exists);
                }
            })
            .catch((error) => {
                console.log(`--! Error creating table ${tableName}.`);
                callback(error, null);
            });
        };
        calls.push(createOrSkip);
    });

    async.series(calls, (error, result) => {
        if (!error) {
            console.log('Finished initialising database table.\n');
            process.exit(0);
        } else {
            console.log(`Error initialising table: ${error}\n`);
            process.exit(1);
        }
    });
};

initDb();
