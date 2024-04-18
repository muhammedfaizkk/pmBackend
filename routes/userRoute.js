const express = require("express");
const router = express.Router();
const { Login, addProjects, getAllprojects, removeItem,
    Expences, getAllexpenses, Income, getIncomes, updateProjects,
    UpdateExpences, UpdateIncome, prayerDelete, Adddepts,
    removeExpense, Incomeremove, Prayers, getAllprayers,Adddeptsopp,
    getDepts,getDeptsopp,deptsDelete,deptsoppDelete

} = require("../controllers/userController");

router.route('/login').post(Login);
router.route('/addprojects').post(addProjects);
router.route('/updateProjects/:id').put(updateProjects);
router.route('/getAllprojects').get(getAllprojects);
router.route('/proremove/:id').delete(removeItem);
router.route('/expences').post(Expences);
router.route('/updateExpence/:id').put(UpdateExpences);
router.route('/getAllexpenses').get(getAllexpenses);
router.route('/income').post(Income);
router.route('/getIncomes').get(getIncomes);
router.route('/updateIncome/:id').put(UpdateIncome);
router.route('/Exremove/:id').delete(removeExpense);
router.route('/Incomeremove/:id').delete(Incomeremove);
router.route('/addPrayers').post(Prayers);
router.route('/getprayers').get(getAllprayers);
router.route('/prayerDelete/:id').delete(prayerDelete);
router.route('/Adddepts').post(Adddepts);
router.route('/Adddeptsopp').post(Adddeptsopp);
router.route('/getDepts').get(getDepts);
router.route('/getDeptsopp').get(getDeptsopp);
router.route('/deptsDelete/:id').delete(deptsDelete);
router.route('/deptsoppDelete/:id').delete(deptsoppDelete);

module.exports = router;