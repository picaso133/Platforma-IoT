import mongoose, { Schema } from 'mongoose';
import uuid from 'uuid/v4';

const FieldSchema = new Schema({
    userHash: {
        type: String,
        required: 'User hash is required',
    },
    deviceHash: {
        type: String,
        required: 'Device hash is required',
    },
    name: {
        type: String,
        required: 'Name is required',
        trim: true,
    },
    description: {
        type: String,
        required: 'Description is required',
        trim: true,
    },
    hash: {
        type: String,
        unique: 'UUID mast be unique',
    },
    type: {
        type: String, // ['string', 'number', 'object', 'array', 'boolean']
        required: 'Type is required',
        trim: true,
    },
    icon: {
        type: String, // ['string', 'number', 'object', 'array', 'boolean']
        required: 'Pictograma este obligatorie',
        trim: true,
    },
    color: {
        type: String, // ['string', 'number', 'object', 'array', 'boolean']
        required: 'Culoarea este obligatorie',
        trim: true,
    },
}, { timestamps: true });

FieldSchema.statics.createFields = ['name', 'description', 'type', 'icon', 'color', 'hash', 'deviceHash', 'createdAt', 'updatedAt'];

FieldSchema.virtual('device', {
    ref: 'device',
    localField: 'deviceHash',
    foreignField: 'hash',
    justOne: true,
});

FieldSchema.pre('save', function(next) {
    if (!this.hash) {
        this.hash = uuid();
    }

    const types = ['string', 'number', 'object', 'array', 'boolean'];
    if (types.indexOf(this.type) === -1) {
        throw new AppError({ status: 400, message: 'Invalid field Type' });
    }

    next();
});
export default mongoose.model('field', FieldSchema);
