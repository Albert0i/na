/**
 * User.js 
 */
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 const UserSchema = new Schema({     
     tunamec: {
         type: String,
         required: true
     },
     tunamep: {
         type: String,
         required: true,
         lowercase: true
     },
     tupwdhash: String, 
     tulevel: { type: Number, 
                required: true 
        }, 
     username: String
 });
 
 module.exports = mongoose.model('User', UserSchema);

 /* 
    CREATE TABLE "TAUSERS" 
	(	
	 "TUID" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999 INCREMENT BY 1 START WITH 1 NOORDER NOCYCLE NOT NULL ENABLE,
	 "TUNAMEC" VARCHAR2(60 CHAR),
	 "TUNAMEP" VARCHAR2(60 CHAR),
	 "TUPWDHASH" VARCHAR2(80 CHAR),
	 "TULEVEL" NUMBER, 
	 "USERNAME" VARCHAR2(20 CHAR)
	);
*/