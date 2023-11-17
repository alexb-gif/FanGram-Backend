const FAQsModel = require("../models/faqsModel");



module.exports.addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const newFAQ = new FAQsModel({
      question,
      answer,
    });

    await newFAQ.save();

    return res.json({ status: true, message: 'FAQ added successfully', data: newFAQ });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};


module.exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQsModel.find();
    return res.json({ status: true, data: faqs });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};