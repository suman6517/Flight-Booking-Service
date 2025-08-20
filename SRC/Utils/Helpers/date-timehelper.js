function ComapreTime(timeString1 , timeString2)
{
    let datetime1 = new Date(timeString1);
    console.log(datetime1);
    
    let datetime2 = new Date(timeString2);
    console.log(datetime2);
    
    if(datetime1.getTime() > datetime2.getTime())
    {
        console.log("I am Working the first block");
        return true;  
        
    }
    else
    {
        console.log("I am Not Working");
        return false;
        
        
    }
}
export {
    ComapreTime
}