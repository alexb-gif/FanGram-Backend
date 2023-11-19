const FAQsController = require("../controllers/faqsController");
const { isAuthenticatedUser, authorizeAdmin } = require("../utils/authMiddlewares");




const router = require("express").Router();



router.post('/api/faq/create', isAuthenticatedUser, authorizeAdmin, FAQsController.addFAQ);
router.get('/api/faqs', FAQsController.getAllFAQs);
router.get('/api/faq/:id', FAQsController.getFAQById);
router.put('/api/faq/edit/:id', isAuthenticatedUser, authorizeAdmin, FAQsController.editFAQById);


module.exports = router;