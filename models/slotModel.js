// models/Slot.js

const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    venue_external_id: {
        type: String,
        required: true
    },
    court_external_id: {
        type: String,
        required: true
    },
    slot_start_time: {
        type: Date,
        required: true
    },
    slot_end_time: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,  
        required: true
    },
    buffer_between_slots: {
        type: Number,
        required: true,
        default: 0
    },
    amount: {
        type: Number,
        required: true
    },
    booking_amount: {
        type: Number,
        required: true
    },
    vat: {
        type: Number,
        required: true
    },
    platform_fees: {
        type: Number,
        required: true
    }
});

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;  