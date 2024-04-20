"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aggregationController_1 = require("../controllers/aggregationController");
const router = (0, express_1.Router)();
router.get('/Max', aggregationController_1.GetMaxData);
router.get('/Min', aggregationController_1.GetMinData);
router.get('/Average', aggregationController_1.GetAverageData);
exports.default = router;
