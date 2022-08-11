/**
 * Option.js 
 */
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 const OptionSchema = new Schema({     
        tord: {
            type: Number,
            default: 9999
        },
        totype: { 
            type: String, 
            required: true
        }
    });
 
module.exports = mongoose.model('Option', OptionSchema);

/*
    db.options.insertMany([
        { tord: 50, totype: "工作五"}, 
        { tord: 40, totype: "工作四"}, 
        { tord: 30, totype: "工作三"}, 
        { tord: 20, totype: "工作二"}, 
        { tord: 10, totype: "工作一"}, 
    ])
    db.options.find().sort({tord: 1})
*/
/* 
	CREATE TABLE "TAOPTIONS" 
	(	
	 "TOID" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999 INCREMENT BY 1 START WITH 1 NOORDER NOCYCLE NOT NULL ENABLE,
	 "TORD" NUMBER,
	 "TOTYPE" NVARCHAR2(80 CHAR)
	);
*/
/*
    Mongoose Guides | Validation
    https://mongoosejs.com/docs/validation.html
*/
