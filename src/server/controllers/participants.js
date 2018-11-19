const { Op } = require("sequelize");
const participant = require("../database/models/participant");
const dates = require("../database/models/dates");

// Get all participants
exports.get = async (req, res) => {
  try {
    const getParticipants = await participant.findAll();
    res.send({ getParticipants });
  } catch (err) {
    res.status(500).send({ err });
  }
};

// delete an exist participant
exports.delete = (req, res) => {
  try {
    participant
      .destroy({
        where: {
          id: req.body.participantId
        }
      })
      .then(() => {
        res.status(200).send({
          message: "participant deleted successfully"
        });
      });
  } catch (err) {
    res.status(500).send({
      err
    });
  }
};

// Search for an individual participant by name
exports.searchByName = async (req, res) => {
  try {
    const { participantName } = req.body;
    const searchResult = await participant.findAll({
      where: {
        fullname: {
          [Op.like]: `%${participantName}%`
        }
      }
    });
    if (searchResult[0]) {
      res.send({ searchResult });
    } else {
      res.send({ message: " Can't find participant with this name" });
    }
  } catch (error) {
    res.send({ error });
  }
};

// Search for an individual participant by birth of date
exports.searchBydate = async (req, res) => {
  try {
    const { participantDate } = req.body;
    const searchResult = await participant.findAll({
      where: {
        date_of_birth: {
          [Op.gte]: `%${participantDate}%`
        }
      }
    });
    if (searchResult[0]) {
      res.send({ searchResult });
    } else {
      res.send({ message: "Can't find participant with this birth of date" });
    }
  } catch (error) {
    res.send({ error });
  }
};

// Get the details for an individual participant
exports.getDetails= async (req, res) => {
  try {
    const participantId = req.params.id;
    const result = await participant.findAll({
      where: {
        id: participantId 
      }
    });
    if (result[0]) {
      const details= (result[0].dataValues);
      res.status(200).send(details);
    } else {
      res.status(404).send("Error in finding result");
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
}; 

// Add new participant
exports.post = async (req, res) => {
  try {
    const { participantdata } = req.body;
    const { count } = await participant.findAndCountAll({
      where: {
        email: participantdata.email
      }
    });
    if (count !== 0) throw new TypeError("The email is used");
    await participant.create(participantdata);
    res.send({ message: "Adding participant done" });
  } catch (error) {
    const { message } = error;
    res.send({ error: message });
  }
};

// Get dates for an individual participant
exports.getDates = async (req, res) => {
  try {
    const participantId = req.params.id;
    const participantDates = await dates.findAll({
      where: {
        participant_id: participantId
      }
    });
    res.send({ participantDates });
  } catch (err) {
    res.status(500).send({ err });
  }
};

// delete an exist date for an individual participant
exports.deleteDate = (req, res) => {
  try {
    dates
      .destroy({
        where: {
          id: req.body.dateId
        }
      })
      .then(() => {
        res.status(200).send({
          message: "date deleted successfully"
        });
      });
  } catch (err) {
    res.status(500).send({
      err
    });
  }
};