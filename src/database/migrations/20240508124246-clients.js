'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      citizen_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      minority: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      guardian_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      guardian_phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      guardian_citizen_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      professional: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      package_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      active_reminder: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }
    )
  },

  async down (queryInterface) {
    await queryInterface.dropTable('clients');
  }
};
