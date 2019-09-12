const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const crypto = require('crypto');
const shortId = require('shortid');

// User Schema

var UsersSchema = new Schema({
    email: {
        type: String
        // required: true,
        // unique: true
    },
    dateOfBirth: Date,
    age: Number,
    googleId: String,
    googlepProfile: {
        type: Schema.Types.Mixed
    },
    gender: String,
    name: String,
    hashed_password: {
        type: String
    },
    salt: String,
    phone: String,
    tags: [String],
    loyalitypoints: 0,
    history: {
        "products": [],
        "recipes": []
    },
    interest: {
        "products": [],
        "recipes": []
    },
    uniqueCode: {
        type: String,
        unique: true,
        'default': shortId.generate
    }
});


/**
 * Virtuals
 */
UsersSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// The below 5 validations only apply if you are signing up traditionally
UsersSchema.path('email').validate(function(email) {
    if (this.provider !== 'local') return true;
    else return email.length;
}, 'Email cannot be blank');
UsersSchema.path('hashed_password').validate(function(hashed_password) {
    if (this.provider !== 'local') return true;
    else return hashed_password.length;
}, 'Password cannot be blank');

/**
 * Pre-save hook
 */
UsersSchema.pre('save', function(next) {

    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password) && this.provider === 'local') next(new Error('Invalid password'));
    else next();
});

/**
 * Methods
 */
UsersSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};




UsersSchema.plugin(require('mongoose-timestamp'));
module.exports = mongoose.model('Users', UsersSchema);
