"use strict";
import { Model, QueryInterface, DataTypes } from "sequelize";
import { Imatches } from '../../Interfaces/IMaches';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Imatches>>("matches", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        field: "home_team_id",
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        field: "home_team_goals",
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        field: "away_team_id",
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        field: "away_team_goals",
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        field: "in_progress",
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("matches");
  },
};
