const express = require('express');
const router = express.Router();

const testRoutes = require('./test.routes');
const userRoutes = require('./user.routes');
const codeRoutes = require('./code.routes');
const subscriptionRoutes = require('./subscription.routes');
const yoomoneyRoutes = require('./yoomoney.routes');
const graphsRoutes = require('./graphs.routes')

router.use('/', testRoutes);
router.use('/user', userRoutes);
router.use('/code', codeRoutes);
router.use('/subscription', subscriptionRoutes);
router.use('/yoomoney', yoomoneyRoutes);
router.use('/graphs', graphsRoutes)

module.exports = router;