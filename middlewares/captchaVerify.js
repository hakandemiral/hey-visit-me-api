import axios from 'axios';

export default async (req, res, next) => {
    const captcha = req.header('captcha');
    const secret = process.env.G_CAPTCHA_SECRET;

    try {
        const googleResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha}`);
        if (googleResponse.data.success) next();
        else res.status(401).send('Google reCaptcha verifiying failed.1');
    } catch (error) {
        res.status(401).send('Google reCaptcha verifiying failed.2');
    }
};
