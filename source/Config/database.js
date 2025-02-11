const mongoose = require('mongoose');


const DBuser = process.env.DB_USER;
const DBpassword = process.env.DB_PASSWORD;
const DBname = process.env.DB_NAME;
const DBhost = process.env.DB_HOST;
const DBport = process.env.DB_PORT;

const connect = async () => {

    try {
        await mongoose.connect(`mongodb://${DBuser}:${DBpassword}@${DBhost}:${DBport}/${DBname}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("🔥 MongoDB conectado com sucesso!");
    } catch (err) {
        console.error("❌ Erro ao conectar ao MongoDB:", err);
    }

    const connection = mongoose.connection;

    connection.on("error", () => console.error("Erro ao conectar no MongoDB"));
    connection.once("open", () => console.log("Conectado no MongoDB"));


    };

    const  disconnect = async () => {
        await mongoose.disconnect();
    };

//  funcão para conectar ao banco de dados
    connect();


module.exports = { connect};



