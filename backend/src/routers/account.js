const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const Account = require('../models/Account');
const Order = require('../models/Order');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const accounts = await Account.findAll({ where: { status: 'available' } });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/:id/buy', auth, async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    
    if (!account || account.status !== 'available') {
      return res.status(404).json({ error: 'Аккаунт не найден' });
    }
    
    const user = await User.findByPk(req.user.id);
    
    if (user.balance < account.price) {
      return res.status(400).json({ error: 'Недостаточно средств' });
    }
    
    
    const order = await Order.create({
      userId: user.id,
      accountId: account.id,
      amount: account.price,
      status: 'completed'
    });
    
  
    user.balance -= account.price;
    await user.save();
  
    account.status = 'sold';
    await account.save();
    
    res.json({
      message: 'Аккаунт успешно куплен',
      order,
      accountDetails: { login: account.login, password: account.password }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/', adminAuth, async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;