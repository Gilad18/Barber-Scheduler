const slots = require("../models/slots.model");
const utility = require("./utility");
const daysoff = require("../models/daysOff.model");
var moment = require("moment");
moment().format();

const createNewSlot = async (req, res) => {
  const { name, phone, threat, price, date, hour } = req.body;
  const exsited = await slots.findOne({ date: date, hour: hour });
  if (exsited) {
    return res
      .status(400)
      .json({ error: "Slot is already taken, please find a diffrent one" });
  }
  try {
    const newSlot = new slots({
      name,
      phone,
      threat,
      price,
      date,
      hour,
    });

    await newSlot.save();
    const bookedSlots = await slots.find({ date: date }, { hour: 1 });
    if (bookedSlots.length === utility.avaiabilty.length ||
       [bookedSlots.length === utility.avaiabilty.length - utility.closingHoursFriday.length &&
          new Date(date).getDay() === 5])
    {
      const theday = moment(date).format("DD-MM-YYYY");
      await daysoff.updateOne({ $push: { fullyBooked: theday } });
    }
    res
      .status(200)
      .json({ succes: "Your slot is booked succesfully!", newSlot });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getTodaySlots = async (req, res) => {
  const theDay = req.params.day;
  try {
    const theDaySlots = await slots.find({ date: theDay }, { hour: 1 });
    res.status(200).json({ success: " amazing", theDaySlots });
  } catch (err) {
    res.json(err);
  }
};

const getDaySchedule = async (req, res) => {
  const theDay = req.params.day;
  try {
    const theDaySlots = await slots.find({ date: theDay });
    res.status(200).json({ success: " amazing", theDaySlots });
  } catch (err) {
    res.json(err);
  }
};

const deleteSlot = async (req, res) => {
  const slotID = req.body.slotID;
  try {
    const deltetTheSlot = await slots.findByIdAndDelete({ _id: slotID });
    res
      .status(200)
      .json({ success: "The Appoinment has been deleted", deltetTheSlot });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateSlot = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowupdates = ["name", "phone", "threat", "price", "date", "hour"];
  const isValidProps = updates.every((item) => allowupdates.includes(item));
  if (!isValidProps) {
    return res.status(406).send({ error: " Invalid Updates" });
  }
  try {
    const existed = await slots.findOne(
      { _id: req.params.id },
      { date: 1, hour: 1 }
    );
    if (existed.date !== req.body.date || existed.hour !== req.body.hour) {
      const avalable = await slots.findOne({
        date: req.body.date,
        hour: req.body.hour,
      });
      if (avalable) {
        return res
          .status(400)
          .json({ error: "Slot is already taken, please find a diffrent one" });
      }
    }
    const updatedSlot = await slots.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSlot) {
      return res.status(404).send();
    }
    updatedSlot.save();
    res
      .status(200)
      .json({ succes: "Slot is succesfully edited!", updatedSlot });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getNext7Days = async (req, res) => {
  var days = [];
  let day = moment().add(2, "d");
  for (let i = 0; i < 7; i++) {
    const numberOfSlots = await slots.find({ date: day.format("LL") });
    const dayItem = { day: day.format("LL"), booked: numberOfSlots.length };
    days.push(dayItem);
    day = day.clone().add(1, "d");
  }
  res.status(200).json({ days });
};

module.exports = {
  createNewSlot,
  getTodaySlots,
  getDaySchedule,
  deleteSlot,
  updateSlot,
  getNext7Days,
};
