import * as yup from 'yup';

export default (type, data) => {
    let schema;

    switch (type) {
    case 'signUp':
        schema = yup.object().shape({
            userName: yup.string().min(2).max(50).required(),
            email: yup.string().email().required(),
            password: yup.string().min(8).max(50).required(),
        });
        break;
    case 'signIn':
        schema = yup.object().shape({
            loginString: yup.string().min(2).max(50).required(),
            password: yup.string().min(8).max(50).required(),
        });
        break;
    case 'setProfile':
        schema = yup.object().shape({
            fullName: yup.string().min(3).max(55),
            userName: yup.string().min(3).max(22).required('Required'),
            job: yup.string(),
            company: yup.string(),
            country: yup.string(),
            city: yup.string(),
            birthDate: yup.string(),
            accountStatus: yup.boolean(),
            photo: yup.string(),
        });
        break;
    case 'setContactInfos':
        schema = yup.object().shape({
            emailKind: yup.string().max(25),
            emailValue: yup.string().max(150),
            phoneKind: yup.string().max(35),
            phoneValue: yup.string().max(25),
            websiteKind: yup.string().max(25),
            websiteValue: yup.string().max(128),
            socialAccounts: yup.array(),

        });
        break;
    case 'updateExperience':
        schema = yup.object().shape({
            company: yup.string().max(120),
            currentlyWorking: yup.bool(),
            description: yup.string().max(1000),
            employmentType: yup.string(),
            endMonth: yup.string().max(10),
            endYear: yup.string().min(4).max(4),
            job: yup.string().max(35),
            location: yup.string().max(35),
            startMonth: yup.string().max(10),
            startYear: yup.string().min(4).max(4),
        });
        break;
    case 'updateEducation':
        schema = yup.object().shape({
            school: yup.string().max(120),
            department: yup.string().max(34),
            degree: yup.string().max(20),
            description: yup.string().max(1000),
        });
        break;
    default:
        console.error('yup validator type not found!');
        return false;
    }
    return schema.isValidSync(data);
};
