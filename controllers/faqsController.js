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



module.exports.getFAQById = async (req, res) => {
  try {
    const faqID = req.params.id;

    const faq = await FAQsModel.findById(faqID);

    if (!faq) {
      return res.status(404).json({ status: false, message: 'FAQ not found' });
    }

    return res.json({ status: true, data: faq });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports.editFAQById = async (req, res) => {
  try {
    const faqID = req.params.id;
    const { question, answer } = req.body;

    const faq = await FAQsModel.findById(faqID);

    if (!faq) {
      return res.status(404).json({ status: false, message: 'FAQ not found' });
    }

    faq.question = question;
    faq.answer = answer;

    const updatedFAQ = await faq.save();

    return res.json({ status: true, message: 'FAQ updated successfully', data: updatedFAQ });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};