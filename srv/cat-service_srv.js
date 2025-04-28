

module.exports = async srv =>{
    srv.before(["CREATE"],'PLANT_INFO',async (req,res)=>{
        try {
            if (req.data.PLANT_NAME=="") {
               req.data.PLANT_NAME="External"
            }
        } catch (error) {
            console.log(error)
        }
    })
}