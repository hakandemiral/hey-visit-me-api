import User from "../models/User.js";
import { USER_NOT_FOUND, USER_IS_INACTIVE } from "./errorTypes.js";

export const getUser = async (req, res) => {
    const userName = req.params.userName;

    try {
        const user = await User.findOne({ 'profile.userName': userName}, {
            password: 0,
            email: 0,
            _id: 0,
            created_at: 0,
            updated_at: 0,
        });

        if (!user) throw Error(USER_NOT_FOUND);
        if (user.profile.accountStatus === false) throw Error(USER_IS_INACTIVE);

        return res.status(200).json(user);
    } catch (error) {
        if (error.message === USER_NOT_FOUND) return res.status(404).send(error.messages);
        if (error.message === USER_IS_INACTIVE) return res.status(406).send(error.messages);
    }
};