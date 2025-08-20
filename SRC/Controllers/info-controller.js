import statusCodes from "http-status-codes";
const info = (req, res) => {
    return res.status(statusCodes.OK).json({
        "name": "API IS ALIVE AND RUNNING",
        "version": "1.0.0",
        success: true,
        data:{},
        error:{}    
    });
}

export default info;