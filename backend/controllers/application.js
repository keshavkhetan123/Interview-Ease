const connectToDatabase = require('../config/db.config');
const db = connectToDatabase();

const Application = (req,res) =>{
    // console.log(req.body);
    const { id, firstname ,middlename, lastname , gender , email, contact , address , cover_letter , vacancy_id , resume_path } = req.body;

    db.query('SELECT id FROM vacancy where id = ?' , [vacancy_id] , (error,result) =>{
        if(error){
            console.log(error);
        }else if(result.length == 0){
            //console.log("ldksjhf");
            res.status(403).json({message:"No such vacancy"});
        }else{
            db.query('SELECT email FROM application where vacancy_id = ? ',[vacancy_id],(error,resu)=>{
                console.log(resu)
                var app = false;
                for(var i=0;i<resu.length;i++){
                    if(resu[i].email == email){
                        app = true;
                    }
                }
                if(error){
                    console.log(error);
                }else if(app){
                    console.log("Application already exist");
                    res.status(402).json({message:"Application already exists"});
                }else{
                    const currentDate = new Date();
                    const year = currentDate.getFullYear(); // e.g., 2024
                    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
                    const day = currentDate.getDate(); // e.g., 17
                    const hours = currentDate.getHours(); // e.g., 18
                    const minutes = currentDate.getMinutes(); // e.g., 8
                    const seconds = currentDate.getSeconds(); // e.g., 12
        
                    const customFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
                    console.log(customFormattedDate);
                    db.query('INSERT INTO application SET ?', { id:id ,firstname:firstname,middlename:middlename,email:email,address:address,lastname:lastname,gender:gender,contact:contact,cover_letter:cover_letter,vacancy_id:vacancy_id,resume_path:resume_path,date_created:customFormattedDate} , (error,reult)=>{
                        if(error){
                            console.log(error);
                            return res.status(400).json({message : error});
                        }else{
                            console.log("application form filled successfully");
                            // const interview_id = 
                            return res.status(203).json({message : "application form filled successfully",ok:true});
                        }
                    })
                }
            })
        }
    })
}

const Feedback = (req,res) =>{
    const {interview_id,feedback} = req.body;

    db.query('INSERT INTO interview_feedback SET ?', {interview_id:interview_id,feedback:feedback} , (error,result)=>{
        if(error){
            console.log(error);
            return res.status(400).json({message : error});
        }else{
            console.log("interview feedback done");
            return res.status(203).json({message : "vacancy added"});
        }
    })
}


module.exports = {Application,Feedback};