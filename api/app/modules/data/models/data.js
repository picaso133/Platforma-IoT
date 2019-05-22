import mongoose, { Schema } from 'mongoose';
import uuid from 'uuid/v4';

const DataSchema = new Schema({
    userHash: {
        type: String,
        required: 'User hash is required',
    },
    fieldHash: {
        type: String,
        required: 'Field hash is required',
    },
    value: {
        type: String,
        required: 'Value is required',
        trim: true,
    },
    hash: {
        type: String,
        unique: 'UUID mast be unique',
    },
}, { timestamps: true });

DataSchema.statics.createFields = ['value', 'fieldHash'];

DataSchema.pre('save', function(next) {
    if (!this.hash) {
        this.hash = uuid();
    }

    // try {
    //     JSON.parse(this.value);
    // } catch (e) {
    //     throw new AppError({ status: 400, message: 'JSON format error' });
    // }

    next();
});
export default mongoose.model('data', DataSchema);
