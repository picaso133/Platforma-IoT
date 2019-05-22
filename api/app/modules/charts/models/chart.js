import mongoose, { Schema } from 'mongoose';
import uuid from 'uuid/v4';

const ChartSchema = new Schema({
    name: {
        type: String,
        required: 'Numele este obligatoriu',
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
    type: {
        type: String,
        enum: ['line', 'bar', 'radar', 'doughnut', 'pie', 'boolean', 'now'],
        required: 'Tipul este obligatorie',

    },
    params: {
        type: String,
        enum: ['all', 'day', 'week', 'month', 'now'],
        required: 'Tipul este obligatorie',
        trim: true,
    },
    description: {
        type: String,
        // required: 'Description is required',
        trim: true,
    },
    hash: {
        type: String,
        unique: 'UUID mast be unique',
    },
    fieldHash: {
        type: String,
        required: 'Campul este obligatorie',
    },
    boardHash: {
        type: String,
        required: 'Tabloul de bord este obligatorie',
    },
    userHash: {
        type: String,
        required: 'User hash is required',
    },
}, { timestamps: true });

ChartSchema.statics.createFields = [
    'name',
    'description',
    'icon',
    'color',
    'type',
    'params',
    'boardHash',
    'fieldHash',
    'hash',
    'createdAt',
    'updatedAt',
];

ChartSchema.pre('save', function(next) {
    if (!this.hash) {
        this.hash = uuid();
    }

    next();
});
export default mongoose.model('chart', ChartSchema);
