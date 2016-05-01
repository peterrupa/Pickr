export default function (sequelize, DataTypes) {
    let Note = sequelize.define("Note", {
		 note: DataTypes.STRING
    });

    return Note;
};
