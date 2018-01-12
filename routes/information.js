/**
 * Created by antonhorl on 11.01.18.
 */

module.exports = {
    getInformation: function (req, res, db) {


        console.log("tables get called");

        //Get guests from Mongo DB

        db.newInformation.find(function (err, information) {
            if (err) {
                res.send(err);
            }
            res.json(information);
        });
    },

    newInformationToTable: function (req, res, db) {

        //JSON string is parsed to a JSON object
        console.log("Delete request made to /deleteInformationElement");
        let informationElementToDelete = req.body;
        console.log(JSON.stringify(informationElementToDelete));
        db.newInformation.remove({

                roomNumber: informationElementToDelete.roomNumber
            },
            {
                justOne: true,
            });
        res.json(informationElementToDelete);
    },

    deleteInformation: function (req, res, db) {


        console.log("newInformationToTables post called");

        let newInformation = req.body;

        //console.log(req.body);
        //Get guests from Mongo DB

        setTimeout(function () {
            db.tables.findOne(
                {
                    "tables.number": newInformation.tableNumber
                },
                {
                    "tables.$": 1,
                },
                function (err, tablesfirst) {
                    if (err) {
                        res.send(err);
                    }
                    if (tablesfirst === null) {
                        console.log("tablesfirst is null");
                        return;
                    }
                    console.log("Länge tables firstplace" + JSON.stringify(tablesfirst.tables[0]).length);
                    if (!("newTraceText" in tablesfirst.tables[0])) {
                        db.tables.update(
                            {
                                "tables.number": newInformation.tableNumber,
                            },
                            {
                                $set: {
                                    "tables.$.newTraceText": newInformation.text,
                                    "tables.$.newTraceRoomNumber": newInformation.roomNumber,
                                    "tables.$.newTraceName": newInformation.name,
                                    "tables.$.newTraceEmployee": newInformation.employee,
                                    "tables.$.newTraceDate": newInformation.date,
                                    "tables.$.newTraceTableNumber": newInformation.tableNumber
                                }
                            }, function (err, tables) {
                                if (err) {
                                    console.log("Error");
                                }
                                console.log("addInformationToTable updated successfully");
                            });
                    } else if (!("newTraceText1" in tablesfirst.tables[0])) {

                        db.tables.update(
                            {
                                "tables.number": newInformation.tableNumber,
                            },
                            {
                                $set: {
                                    "tables.$.newTraceText1": newInformation.text,
                                    "tables.$.newTraceRoomNumber1": newInformation.roomNumber,
                                    "tables.$.newTraceName1": newInformation.name,
                                    "tables.$.newTraceEmployee1": newInformation.employee,
                                    "tables.$.newTraceDate1": newInformation.date,
                                    "tables.$.newTraceTableNumber1": newInformation.tableNumber
                                }
                            }, function (err, tables) {
                                if (err) {
                                    console.log("Error");
                                }
                                console.log("addInformationToTable updated successfully");
                            });
                    } else if (!("newTraceText2" in tablesfirst.tables[0])) {

                        db.tables.update(
                            {
                                "tables.number": newInformation.tableNumber,
                            },
                            {
                                $set: {
                                    "tables.$.newTraceText2": newInformation.text,
                                    "tables.$.newTraceRoomNumber2": newInformation.roomNumber,
                                    "tables.$.newTraceName2": newInformation.name,
                                    "tables.$.newTraceEmployee2": newInformation.employee,
                                    "tables.$.newTraceDate2": newInformation.date,
                                    "tables.$.newTraceTableNumber2": newInformation.tableNumber

                                }
                            }, function (err, tables) {
                                if (err) {
                                    console.log("Error");
                                }
                                console.log("addInformationToTable updated successfully");
                            });
                    }
                });
        }, 300);

        setTimeout(function () {
            db.tables.findOne(
                {
                    "tables.number": newInformation.tableNumber
                },
                {
                    "tables.$": 1,
                },
                function (err, tables) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(tables);
                    //console.log(JSON.stringify(tables));
                });
        }, 500);
    },

    newInformationToBox: function (req, res, db) {

        console.log("newInformationToBox post called");
//Get guests from Mongo DB

        console.log(req.body);
        let newInformation = req.body;


        db.newInformation.save(newInformation, function (err, newInformation) {
            if (err) {
                res.send(err);
            }
            res.json(newInformation);
        });
    }
};