import express from 'express';
import { 
    getFullProfile, 
    setProfile, 
    setContactInfos, 
    newExperience, deleteExperience, updateExperience,
    newEducation, deleteEducation, updateEducation,
    setCompetencies,
} from '../controllers/user.js';

const user = express.Router();

user.get('/getFullProfile', getFullProfile);
user.post('/setProfile', setProfile);
user.post('/setContactInfos', setContactInfos);

user.post('/experiences/new', newExperience);
user.delete('/experiences/:id', deleteExperience);
user.put('/experiences/:id', updateExperience);

user.post('/educations/new', newEducation);
user.delete('/educations/:id', deleteEducation);
user.put('/educations/:id', updateEducation);

user.post('/setCompetencies', setCompetencies);


export default user;