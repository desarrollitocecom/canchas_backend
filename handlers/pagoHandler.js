
const {
    createPago,
    updatePago,
    getPago,
    getAllPagos,
    getTokenNuibiz,
    tokendeSesion,
    capturarPago
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
const respuestadeNuibiz = async (req, res) => {
    try {
        console.log("Datos recibidos en el webhook:", req.body);

        const transactionCode = req.body.transactionCode || req.body.transactionToken;
        
        const { customerEmail, channel } = req.body;
        

       const response=await capturarPago(transactionCode);

        // Procesa la transacción aquí...
        return res.status(200).json({
            success: true,
            message: "Transacción procesada con éxito.",
            data:response.data
        });
    } catch (error) {
        console.error("Error procesando respuesta de Niubiz:", error);

        return res.status(500).json({
            success: false,
            message: "Error interno al procesar la respuesta de Niubiz.",
        });
    }
};

module.exports={
    traerToken,
    respuestadeNuibiz
}