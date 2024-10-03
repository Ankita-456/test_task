const mongoose = require('mongoose');

const CourtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    operating_hours: {
        type: String,
        required: false,
    },
    off_days: {
        type: [String],
        required: false,
    },
    sports: {
        type: [String],
        required: false,
    },
});

const VenueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    address: {
        type: String,
        required: true, 
    },
    city: {
        type: String,
        required: true, 
    },
    state: {
        type: String,
        required: true, 
    },
    country: {
        type: String,
        required: true, 
    },
    latitude: {
        type: Number,
        required: true, 
    },
    longitude: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    contact_number: {
        type: String,
        required: true, 
    },
    email_address: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ 
    },
    operating_hours: {
        type: String,
        required: false, 
    },
    off_days: {
        type: [String], 
        required: false,
    },
    bulk_booking_count: {
        type: Number,
        required: false,
    },
    discount_percentage: {
        type: Number,
        required: false,
    },
    slot_availability_period: {
        type: String,
        required: false,
    },
    slot_availability_period_bulk: {
        type: String,
        required: false,
    },
    stripe_account_id: {
        type: String,
        required: false,
    },
    images: {
        type: [String], 
        required: false, 
    },
    sports: {
        type: [String], 
        required: false, 
    },
    courts: [CourtSchema], 
});

const Venue = mongoose.model('Venue', VenueSchema);

module.exports = Venue;
