import mongoose, { Schema } from 'mongoose';
import uuid from 'uuid/v4';

const DeviceSchema = new Schema({
    userHash: {
        type: String,
        required: 'User hash is required',
    },
    boardHash: {
        type: String,
    },
    name: {
        type: String,
        required: 'Name is required',
        trim: true,
    },
    mac: {
        type: String,
        required: 'MAC este obligatoriu',
        trim: true,
    },
    vendor: {
        type: String,
        // required: 'Vendor este obligatoriu',
        trim: true,
    },
    location: {
        type: String,
        // required: 'MAC este obligatoriu',
        trim: true,
    },
    icon: {
        type: String,
        required: 'Pictograma este obligatorie',
        trim: true,
    },
    color: {
        type: String,
        required: 'Culoarea este obligatorie',
        trim: true,
    },
    hash: {
        type: String,
        unique: 'UUID mast be unique',
    },
    description: {
        type: String,
        required: 'Description is required',
        trim: true,
    },
}, { timestamps: true, toJSON: { virtuals: true } });

DeviceSchema.statics.createFields = [
    'name',
    'description',
    'mac',
    'vendor',
    'location',
    'icon',
    'color',
    'boardHash',
    'hash',
    'createdAt',
    'updatedAt',
];

DeviceSchema.pre('save', function(next) {
    if (!this.hash) {
        this.hash = uuid();
    }

    next();
});
export default mongoose.model('device', DeviceSchema);
