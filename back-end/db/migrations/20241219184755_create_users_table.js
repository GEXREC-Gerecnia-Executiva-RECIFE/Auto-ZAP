/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

exports.up = function(knex) {
    return knex.schema.createTable('user', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('password').notNullable();
      table.integer('value').defaultTo(0);
      table.timestamps(true, true);
    });
  };
