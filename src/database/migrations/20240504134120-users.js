'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      work_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      work_phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      citizen_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      professional_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      business: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pix: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Users');
  }
};
