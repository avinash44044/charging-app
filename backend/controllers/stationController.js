const Station = require("../models/Station");

exports.getAll = async (_, res) => res.json(await Station.find());

exports.create = async (req, res) => {
  const station = await Station.create(req.body);
  res.json(station);
};

exports.update = async (req, res) => {
  const updated = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Station.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
