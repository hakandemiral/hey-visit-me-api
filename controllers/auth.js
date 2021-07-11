import jwt from 'jsonwebtoken';
import yupValidator from '../helpers/yupValidator.js';
import User from '../models/User.js';
import loginTypeDetect from '../helpers/loginTypeDetect.js';
import passwordManager from '../helpers/passwordManager.js'


export const signUp = async (req, res) => {
    const data = req.body;

    // recieved data valdation
    const isValid = yupValidator('signUp', data);
    if (!isValid) return res.status(400).send('This data is not suitable for account creation or is not in a suitable format.');
    
    try {
        const user = await new User({
            profile: {
                userName: data.userName,
            },
            email: data.email,
            password: passwordManager.hash(data.password),
        });
        const newUser = await user.save();

        const payload = { userId: newUser._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        return res.status(201).json({ token });
    } catch (error) {
        console.log(error);
        let errMsg;
        if (error.code == 11000) {
          errMsg = Object.keys(error.keyValue)[0] + " already exists.";
        } else {
          errMsg = error.message;
        }

        return res.status(400).send(errMsg);
    }
};

export const signIn = async (req, res) => {
    const data = req.body;

    // recieved data validation
    const isValid = yupValidator('signIn', data);
    if (!isValid) return res.status(400).send('Authentication failed, username/e-mail and password required!');

    const loginData = loginTypeDetect(data.loginString);
    
    try {
        const user = await User.findOne({ ...loginData });
        if (!user) return res.status(400).send('Authentication failed, email/username or password is incorrect');

        const isCorrectPassword = passwordManager.compare(data.password, user.password);
        if (!isCorrectPassword) return res.status(400).send('Authentication email/username or password is incorrect')

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error!');
    }
};
