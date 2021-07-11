import User from "../models/User.js";

export const getUser = async (req, res) => {
    const userName = req.params.userName;

    try {
        const user = await User.findOne({ 'profile.userName': userName }, {
            password: 0,
            email: 0,
            _id: 0,
        });

        res.status(200).json(user);
    } catch (error) {
        return res.status(400).send('Bir sorun var ama dur bakalım her şeyin ilacı zaman');
    }
};