const userModel = require('../models/user.model');

const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const testingPath = async () => {
  console.log('test');
};


module.exports = { 
  getUserById, 
  testingPath
};