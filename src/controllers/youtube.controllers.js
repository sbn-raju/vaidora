const { pool } = require("../database/connect.db.js");
const ErrorHandler = require("../helpers.js/errorHelpers.js");



//This controller will add the link of the youtube videos
const youtubeLinkCreate = async(req,res,next)=>{
    try {
        const{link_iframe} = req.body
        const created_by = req.user;
        if(!(link_iframe || created_by)){
            return res.status(302).json({
                success:false,
                message:"Provide the link of the iFrame of your youtube Viedo"
            })
        }
        const youtubeLinkCreateQuery = "INSERT INTO youtube_links (link_iframe, created_by) VALUES ($1,$2) RETURNING *"
        const youtubeLinkCreateValue = [link_iframe, created_by]


        try {
            const youtubeLinkCreateResult = await pool.query(youtubeLinkCreateQuery, youtubeLinkCreateValue);
            if(youtubeLinkCreateResult.rowCount != 0){
                return res.status(200).json({
                    success:true,
                    message:"Youtube link is Successfully created",
                    data:youtubeLinkCreateResult.rows[0]
                })
            }
        } catch (error) {
            return next (new ErrorHandler(false,`Error in creating row due to: ${error.message}` ,402))
        }


    } catch (error) {
        return next (new ErrorHandler(false, `Internal server error due to: ${error.message}` ,500))

    }
}


//This controller will return the youtube links only top four
const youtubeLinkGet = async(req,res,next)=>{
    try {
        let limit = 4;
        const youtubeLinkGetQuery = "SELECT * FROM youtube_links ORDER BY created_at DESC LIMIT $1"
        const youtubeLinkGetValues = [limit]
        
        try {
            const youtubeLinkGetResults = await pool.query(youtubeLinkGetQuery, youtubeLinkGetValues);
            if(youtubeLinkGetResults.rowCount!=0){
                return res.status(200).json({
                    success:true,
                    message:"Top 4 latest Videos",
                    data:youtubeLinkGetResults.rows
                })
            }
            else{
                return res.stauts({
                    success:true,
                    message:"No videos have been added yet, but stay tuned—great content is on the way",
                    data:[]
                })
            }
        } catch (error) {
            return next (new ErrorHandler(false, `Error in fetching Data due to ${error.message}` ,409))
        }

    } catch (error) {
        return next (new ErrorHandler(false, `Internal server error due to: ${error.message}` ,500))
    }
}



//This controller will fetch all the videos
const youtubeLinkGetAllVideos = async(req,res,next)=>{
    try {
        const youtubeLinkGetAllVideosQuery = "SELECT * FROM youtube_links ORDER BY  created_at  DESC"
        try {
            const youtubeLinkGetAllVideosResults = await pool.query(youtubeLinkGetAllVideosQuery)
            if(youtubeLinkGetAllVideosResults.rowCount != 0){
                return res.status(200).json({
                    success:true,
                    message:"All the data is Fetched Successfully",
                    data:youtubeLinkGetAllVideosResults.rows
                })
            }
            else{
                return res.stauts({
                    success:true,
                    message:"No videos have been added yet, but stay tuned—great content is on the way",
                    data:[]
                })
            }
        } catch (error) {
            return next(new ErrorHandler(false, `Error in fetching the data ${error.message}`))
        }
    } catch (error) {
        return next(new ErrorHandler(false, `Internal server Error due to ${error.message}`))
    }
}



const youtubeLinkDeleteById = async(req,res,next)=>{
    try {
        const {id} = req.query
        if(!id){
            return res.status(302).json({
                success:false,
                message:"Id is not provided"
            })
        }
        const youtubeLinkDeleteQuery = "DELETE FROM youtube_links WHERE id = $1"
        const youtubeLinkDeleteValue = [id]
        try {
            const youtubeLinkDeleteResult = await pool.query(youtubeLinkDeleteQuery, youtubeLinkDeleteValue);
            if(youtubeLinkDeleteResult.rowCount != 0){
                return res.status(200).json({
                    success:true,
                    message:"Youtube link is Successfully Deleted",
                    data:youtubeLinkDeleteResult.rows[0]
                })
            }
            else{
                return res.status(409).json({
                    success:false,
                    message:"Id not found in the table",
                    data:youtubeLinkDeleteResult.rows[0]
                })
            }
        } catch (error) {
            return next (new ErrorHandler(false,`Error in deleting the row due to: ${error.message}` ,402))

        }

    } catch (error) {
        return next (new ErrorHandler(false, `Internal server error due to: ${error.message}`  ,500))
    }
}



const youtubeLinkTestimonialsCreate = async(req,res,next)=>{
    try {
        const {links_iframe_testimonials} = req.body
        const created_by = req.user
        if(!(links_iframe_testimonials || created_by)){
            return res.status(302).json({
                success:true,
                message:"Provide with the iFrame of your Youtube Video"
            })
        }


        const youtubeLinkCreateTestQuery = "INSERT INTO youtube_links_testimonials (links_iframe_testimonials, created_by) VALUES ($1,$2) RETURNING *"
        const youtubeLinkCreateTestValues = [links_iframe_testimonials, created_by];
        try {
            const youtubeLinkCreateTestResult = await pool.query(youtubeLinkCreateTestQuery, youtubeLinkCreateTestValues);
            if(youtubeLinkCreateTestResult.rowCount != 0){
                return res.status(200).json({
                    success:true,
                    message:"Successfully created the Youtube Link Testimonials",
                    data:youtubeLinkCreateTestResult.rows[0]
                })
            }
        } catch (error) {
            return next(new ErrorHandler(false, `Error in creating row due to ${error.message}`, 409))
        }

    } catch (error) {
        return next(new ErrorHandler(false, `Internal Server Error due to ${error.message}`, 500))
    }
}


const youtubeLinkTestimonialsGet = async(req,res,next)=>{
   try {
    const limit = 3;
    const youtubeLinkTestimonialsGetQuery = "SELECT * FROM youtube_links_testimonials ORDER BY  created_at  DESC LIMIT $1"
    const youtubeLinkTestimonialsGetValue = [limit]

    try {
        const youtubeLinkTestimonialsGetResult = await pool.query(youtubeLinkTestimonialsGetQuery, youtubeLinkTestimonialsGetValue);
        if(youtubeLinkTestimonialsGetResult.rowCount != 0){
            return res.status(200).json({
                success:true,
                message:"Fetched all thr Testimonials",
                data:youtubeLinkTestimonialsGetResult.rows
            })
        }
    } catch(error){
        return next(new ErrorHandler(false, `Error in fetching the data due to ${error.message}`, 500))
    } 
    
   } catch (error) {
       return next(new ErrorHandler(false, `Internal Server Error due to ${error.message}`, 500))
   }
}

const youtubeLinkTestimonialsGetAllVideos = async(req,res,next)=>{
    try {
        const youtubeLinkTestimonialsGetAllVideosQuery = "SELECT * FROM youtube_links_testimonials ORDER BY created_at  DESC"
        try {
            const youtubeLinkGetAllVideosResults = await pool.query(youtubeLinkTestimonialsGetAllVideosQuery)
            if(youtubeLinkGetAllVideosResults.rowCount != 0){
                return res.status(200).json({
                    success:true,
                    message:"All the data is Fetched Successfully",
                    data:youtubeLinkGetAllVideosResults.rows
                })
            }
        } catch (error) {
            return next(new ErrorHandler(false, `Error in fetching the data ${error.message}`))
        }
    } catch (error) {
        return next(new ErrorHandler(false, `Internal server Error due to ${error.message}`))
    }
}




const youtubeLinkTestimonialsDeleteById = async(req,res,next)=>{
    try {
        const {id} = req.query
        if(!id){
            return res.status(200).json({
                success:false,
                message:"Id is not Provided"
            })
        }

        const youtubeLinkTestimonialsDeleteQuery = "DELETE FROM youtube_links_testimonials WHERE id = $1"
        const youtubeLinkTestimonialsDeleteValues = [id];

        try {
            const youtubeLinkTestimonialsDeleteResult = await pool.query(youtubeLinkTestimonialsDeleteQuery, youtubeLinkTestimonialsDeleteValues)
            if(youtubeLinkTestimonialsDeleteResult.rowCount != 0){
                return res.status(200).json({
                    success:true,
                    message:"Youtube Testimonials is Deleted Successfully",
                    data:youtubeLinkTestimonialsDeleteResult.rows[0]
                })
            }
            else{
                return res.status(409).json({
                    success:false,
                    message:"Id not found in the table",
                    data:youtubeLinkTestimonialsDeleteResult.rows[0]
                })
            }
        } catch (error) {
            return next(new ErrorHandler(false, `Error in fetching the data ${error.message}`, 409)) 
        }

    } catch (error) {
        return next(new ErrorHandler(false, `Internal Server Error due to ${error.message}`, 500)) 
    }
}




module.exports = {
    youtubeLinkCreate,
    youtubeLinkGet,
    youtubeLinkGetAllVideos,
    youtubeLinkDeleteById,
    youtubeLinkTestimonialsCreate,
    youtubeLinkTestimonialsGet,
    youtubeLinkTestimonialsDeleteById,
    youtubeLinkTestimonialsGetAllVideos
}