  
const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')

usersRouter.post('/register',  async (request, response) => {
    const body = request.body;

    if (await User.findOne({ email: body.email })) {
        return response.status(401).json({error: 'email already registered'})
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        email: body.email,
        passwordHash: passwordHash
    });

    const savedUser = await user.save()

    response.json(savedUser)
});

module.exports = usersRouter;