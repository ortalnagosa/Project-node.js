const Card = require("../models/mongodb/Card");
const lodash = require("lodash");
const handleBadRequest = require("../../utils/errorHandler");

const generateBizNumber = async () => {
     try {
       const random = lodash.random(1000000, 9000000);
       const card = await Card.findOne({
         bizNumber: random,
       });
       if (card) {
         return generateBizNumber();
       }
       return random;
     } catch (error) {
       error.status = 400;
       return handleBadRequest("generateBizNumber", error);
     }
}
module.exports = generateBizNumber;
