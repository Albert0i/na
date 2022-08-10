/**
 * User.js 
 */
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 const UserSchema = new Schema({     
        username: {
            type: String,
            required: [true, "User must have a username"],
            minLength: [6, 'Must be at least 6 of length, got {VALUE}'],
            lowercase: true, 
            trim: true, 
            unique: [true, "User must be unique"],
            immutable: true
        },
        password: { 
            type: String, 
            required: true
        },

        tunamec: String, 
        tunamep: String,
        tulevel: { 
            type: String, 
            enum: ['Disabled', 'Enabled', 'User', 'Assistant', 'Admin'],
            default: 'User'
        }, 
    },
    { 
        timestamps: true
    });
 
module.exports = mongoose.model('User', UserSchema);

/* 
    CREATE TABLE "TAUSERS" 
    (	
        "TUID" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999 INCREMENT BY 1 START   WITH 1 NOORDER NOCYCLE NOT NULL ENABLE,
        "TUNAMEC" VARCHAR2(60 CHAR),
        "TUNAMEP" VARCHAR2(60 CHAR),
        "TUPWDHASH" VARCHAR2(80 CHAR),
        "TULEVEL" NUMBER, 
        "USERNAME" VARCHAR2(20 CHAR)
    );
*/
/*
    Mongoose Guides
    https://mongoosejs.com/docs/guides.html
*/
