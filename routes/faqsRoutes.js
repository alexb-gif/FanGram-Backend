const { getAllFAQs, addFAQ } = require("../controllers/faqsController");
const { isAuthenticatedUser, authorizeAdmin } = require("../utils/authMiddlewares");




const router = require("express").Router();



router.post('/api/faq/create', isAuthenticatedUser, authorizeAdmin, addFAQ);
router.get('/api/faqs', getAllFAQs);


module.exports = router;