const {DataTypes} = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'TypeRelationship',
    {
      relationshipType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'type_relationship',
      timestamps: false,
    },
  );
};
