
const {
    createPago,
    updatePago,
    getPago,
    getAllPagos,
    getTokenNuibiz,
    tokendeSesion
}=require("../controllers/pagoController");
const traerToken=async (req,res) => {
    try {
        const response=await tokendeSesion();
        return res.status(200).json({message:"Token obtenido sesion correctamente",data:response})
    } catch (error) {
        console.error("WASAWASAAAA");
        return res.status(500).json({message:"YA FUE :(",data:error})
    }
}
module.exports={
    traerToken
}