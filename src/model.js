const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

export const Profile = sequelize.define("Profile", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profession: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: Sequelize.DECIMAL(12, 2),
  },
  type: {
    type: Sequelize.ENUM("client", "contractor"),
  },
});
// class Profile extends Sequelize.Model {}
// Profile.init(
//   {

//   },
//   {
//     sequelize,
//     modelName: 'Profile'
//   }
// );

export const Contract = sequelize.define("Contract", {
  terms: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("new", "in_progress", "terminated"),
  },
});

// class Contract extends Sequelize.Model {}
// Contract.init(
//   {

//   },
//   {
//     sequelize,
//     modelName: 'Contract'
//   }
// );

export const Job = sequelize.define("Job", {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
  },
  paid: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  paymentDate: {
    type: Sequelize.DATE,
  },
});
// class Job extends Sequelize.Model {}
// Job.init(
//   {

//   },
//   {
//     sequelize,
//     modelName: 'Job'
//   }
// );

Profile.hasMany(Contract, { as: "Contractor", foreignKey: "ContractorId" });
Contract.belongsTo(Profile, { as: "Contractor" });
Profile.hasMany(Contract, { as: "Client", foreignKey: "ClientId" });
Contract.belongsTo(Profile, { as: "Client" });
Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
};
