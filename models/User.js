import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    profile: {
        fullName: {
            type: String,
        },
        userName: {
            type: String,
            unique: true,
            default: null,
        },
        job: String,
        company: String,
        country: String,
        city: String,
        birthDate: String,
        bio: String,
        photo: String,
        accountStatus: {
            type: Boolean,
            default: false,
        },
    },
    contactInfos: {
        phoneKind: String,
        phoneValue: String,
        emailKind: String,
        emailValue: String,
        websiteKind: String,
        websiteValue: String,
        socialAccounts: [{
            _id: {
                type: Schema.Types.ObjectId,
                index: true,
                required: true,
                auto: true,
              },
            network: String,
            userName: String,
        }],
    },
    experiences: [{
        job: String,
        company: String,
        employmentType: String,
        location: String,
        startMonth: String,
        startYear: String,
        endMonth: String,
        endYear: String,
        currentlyWorking: Boolean,
        description: String,
    }],
    educations: [{
        school: String,
        department: String,
        degree: String,
        startMonth: String,
        startYear: String,
        endMonth: String,
        endYear: String,
        currentlyStudying: Boolean,
        description: String,
    }],
    competencies: {
        skills: [{
            id: String,
            value: String,
        }],
        tools: [{
            id: String,
            value: String,
        }],
        languages: [{
            id: String,
            language: String,
            level: String,
        }],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
}, { timestamps:{ createdAt: 'created_at'} });

export default model('User', userSchema);
