const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "users", deps: []
 * createTable() => "tokens", deps: [users]
 *
 */

const info = {
  revision: 1,
  name: "initial",
  created: "2021-12-25T18:59:04.989Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          unique: true,
          primaryKey: true,
          autoIncrement: true,
        },
        username: { type: Sequelize.STRING, field: "username" },
        email: { type: Sequelize.STRING, field: "email", unique: true },
        password: { type: Sequelize.STRING, field: "password" },
        picture: { type: Sequelize.BLOB, field: "picture" },
        given_name: { type: Sequelize.STRING(100), field: "given_name" },
        family_name: { type: Sequelize.STRING, field: "family_name" },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "tokens",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          unique: true,
          primaryKey: true,
          autoIncrement: true,
        },
        refresh_token: { type: Sequelize.STRING(500), field: "refresh_token" },
        user_id: {
          type: Sequelize.INTEGER,
          field: "user_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["tokens", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
