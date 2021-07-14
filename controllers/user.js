import User from '../models/User.js'
import yupValidator from '../helpers/yupValidator.js';

export const getFullProfile = async (req, res) => {
    const userId = req.decoded.userId;

    try {
        const user = await User.findById(userId, {
            _id: 0,
            password: 0,
            created_at: 0,
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error!');
    }
};

export const setProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const isValid = yupValidator('setProfile', req.body);
    if (!isValid) return res.status(400).send('Data sent is not in valid format');

    try {
        const user = await User.findByIdAndUpdate(userId, 
            { $set: {
                profile : { ...req.body },
            } }, 
            { runValidators: true, new: true });

        return res.status(201).json(user.profile);
    } catch (error) {
        console.log(error);
        let errMsg;

        if (error.code == 11000) {
          errMsg = 'Username already taken, please try another.';
        } else {
            errMsg ='Error!';
        }

        return res.status(400).send(errMsg);
    }
};

export const setContactInfos = async (req, res) => {
    const userId = req.decoded.userId;
    const isValid = yupValidator('setContactInfos', req.body);
    if (!isValid) return res.status(400).send('Data sent is not in valid format');

    try {
        const user = await User.findByIdAndUpdate(userId,
            { $set: {
                contactInfos: { ...req.body },
            }},
            { runValidators: true, new: true })

        return res.status(201).json(user.contactInfos);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error!');
    }
};

export const newExperience = async (req, res) => {
    const userId = req.decoded.userId;

    try {
        const user = await User.findOneAndUpdate({ _id: userId },
            { $push: { experiences: { } } },
            { new: true }
        );

        return res.status(201).send(user.experiences.pop());
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error!')
    }
};

export const deleteExperience = async (req, res) => {
    const userId = req.decoded.userId;
    const experienceId = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(userId,
            { $pull: { experiences: { _id: experienceId } } }
        );

        return res.status(200).send(experienceId);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error!')
    };
};

export const updateExperience = async (req, res) => {
    const userId = req.decoded.userId;
    const experienceId = req.params.id;

    const isValid = yupValidator('updateExperience', req.body);
    if (!isValid) return res.status(400).send('Data sent is not in valid format');

    try {
        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                experiences: { $elemMatch: { _id: experienceId } }
            },
            {
                $set: {
                    'experiences.$.company': req.body.company,
                    'experiences.$.currentlyWorking': req.body.currentlyWorking,
                    'experiences.$.description': req.body.description,
                    'experiences.$.employmentType': req.body.employmentType,
                    'experiences.$.endMonth': req.body.endMonth,
                    'experiences.$.endYear': req.body.endYear,
                    'experiences.$.startMonth': req.body.startMonth,
                    'experiences.$.startYear': req.body.startYear,
                    'experiences.$.job': req.body.job,
                    'experiences.$.location': req.body.location,
                }
            },
            { new: true, safe: true, upsert: true }
        );

        return await res.status(200).json(user.experiences.find((item) => item._id.toString() === experienceId.toString()));
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error!')
    }
};

export const newEducation = async (req, res) => {
    const userId = req.decoded.userId;

    try {
        const user = await User.findOneAndUpdate({ _id: userId },
            { $push: { educations: { } } },
            { new: true }
        );

        return res.status(201).send(user.educations.pop());
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error!')
    }
};

export const deleteEducation = async (req, res) => {
    const userId = req.decoded.userId;
    const educationId = req.params.id;

    try {
        await User.findByIdAndUpdate(userId,
            { $pull: { educations: { _id: educationId } } }
        );

        return res.status(200).send(educationId);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error!')
    };
};

export const updateEducation = async (req, res) => {
    const userId = req.decoded.userId;
    const educationId = req.params.id;

    const isValid = yupValidator('updateEducation', req.body);
    if (!isValid) return res.status(400).send('Data sent is not in valid format');

    try {
        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                educations: { $elemMatch: { _id: educationId } }
            },
            {
                $set: {
                    'educations.$.school': req.body.school,
                    'educations.$.department': req.body.department,
                    'educations.$.degree': req.body.degree,
                    'educations.$.startMonth': req.body.startMonth,
                    'educations.$.endMonth': req.body.endMonth,
                    'educations.$.startYear': req.body.startYear,
                    'educations.$.endYear': req.body.endYear,
                    'educations.$.currentlyStudying': req.body.currentlyStudying,
                    'educations.$.description': req.body.description,
                }
            },
            { new: true, safe: true, upsert: true }
        );

        return await res.status(200).json(user.educations.find((item) => item._id.toString() === educationId.toString()));
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error!')
    }
};

export const setCompetencies = async (req, res) => {
    const userId = req.decoded.userId;
    console.log(req.body);

    try {
        const user = await User.findByIdAndUpdate(userId, 
            { $set: {
                competencies : { ...req.body },
            } }, 
            { runValidators: true, new: true });

        return res.status(201).json(user.competencies);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error!');
    }
};
