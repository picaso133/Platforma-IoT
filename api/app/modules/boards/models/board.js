import mongoose, { Schema } from 'mongoose';
import uuid from 'uuid/v4';

const BoardSchema = new Schema({
    userHash: {
        type: String,
        required: 'User hash is required',
    },
    name: {
        type: String,
        required: 'Name is required',
        trim: true,
    },
    icon: {
        type: String,
        required: 'Icon este obligatoriu',
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
}, { timestamps: true });

BoardSchema.statics.createFields = ['name', 'description', 'hash', 'icon', 'color', 'createdAt', 'updatedAt'];

BoardSchema.pre('save', function(next) {
    if (!this.hash) {
        this.hash = uuid();
    }

    next();
});
export default mongoose.model('board', BoardSchema);
