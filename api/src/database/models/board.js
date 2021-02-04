module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('board', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: '0',
    },
    user_id: DataTypes.INTEGER,
  }, { tableName: 'board' });

  Board.associate = (models) => {
    Board.hasMany(models.list, {
      foreignKey: 'board_id',
      as: 'boardLists',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Board;
};