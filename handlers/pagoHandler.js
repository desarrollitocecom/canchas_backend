
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
const respuestadeNuibiz = async (req, res) => {
    try {
        console.log("Datos recibidos en el webhook:", req.body);

        // const { transactionCode, customerEmail, channel } = req.body;
      
        // if (!transactionCode || !customerEmail || !channel ) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Faltan datos esenciales en la respuesta de Niubiz.",
        //     });
        // }

        // console.log("Datos validados:", { transactionCode, customerEmail, channel });

        // // Procesa la transacción aquí...
        // return res.status(200).json({
        //     success: true,
        //     message: "Transacción procesada con éxito.",
        // });
    } catch (error) {
        // console.error("Error procesando respuesta de Niubiz:", error);

        // return res.status(500).json({
        //     success: false,
        //     message: "Error interno al procesar la respuesta de Niubiz.",
        // });
    }
};


module.exports={
    traerToken,
    respuestadeNuibiz
}