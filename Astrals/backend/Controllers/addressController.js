const Address = require("../Models/address");

const getAddressList = async (req, res, next) => {
  try {
    const address = await Address.find({});
    res.status(200).json(address);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Occured");
  }
}

const getUserAddresses = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const address = await Address.find({ user: userId }).populate('user')
    res.status(200).json(address);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Occured");
  }
}

const createAddress =  async (req, res, next) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Occured");
  }
}

const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.addressId);

    await Address.findByIdAndDelete(address);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).send("Error Occured");
  }
}

module.exports = {
    getAddressList,
    getUserAddresses,
    createAddress,
    deleteAddress,
  }