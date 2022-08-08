/**
 * Task.js 
 */
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 
 const TaskSchema = new Schema({     
     taname: {
         type: String,
         required: true, 
         index: true, 
         lowercase: true
     },
     tatype: {
         type: String,
         required: true
     },
     tadate: {
         type: Number,
         requited: true
     },
     taappnum: String,
     tafamrep: String,
     taremark: String
    },
    { 
        timestamps: true
    });
 
 module.exports = mongoose.model('Task', TaskSchema);

 /* 
    CREATE TABLE "TASKS" 
	(	
	 "TAID" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOORDER NOCYCLE NOT NULL ENABLE,
	 "TUID" NUMBER,
	 "TOID" NUMBER,
	 "TADATE" NUMBER,
	 "TAAPPNUM" VARCHAR(12 CHAR), 
	 "TAFAMREP" VARCHAR2(80 CHAR),
	 "TAREMARK" VARCHAR2(80 CHAR)
	); 
*/