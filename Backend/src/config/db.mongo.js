const { MongoClient} = require('mongodb');
require('dotenv').config();

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DATABASE,
    MONGO_PORT,
} = process.env;


//const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

const uri = `mongodb://root:M1A2024.@localhost:27017`;

const insertData = async(database, data) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Usuarios');
        const coleccion = dbmongo.collection(database);
        const result = await coleccion.insertOne(data);
        return result;
    } catch (error) {
        console.error('Error insertData: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
};

// Funcion para obtener datos de la base de datos por atributo usuario
const getData = async(database, data) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Usuarios');
        const coleccion = dbmongo.collection(database);
        const result = await coleccion.findOne(data);
        return result;
    } catch (error) {
        console.error('Error getData: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
};

const appendToViajes = async (username, newViaje) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Usuarios');
        const coleccion = dbmongo.collection('Usuarios');
        
        // Busca el usuario y hace append a 'viajes'
        const result = await coleccion.updateOne(
            { usuario: username }, // filtro para buscar al usuario
            { $push: { viajesComprados: newViaje } } // operador para hacer append al array 'viajes'
        );
        
        return result;
    } catch (error) {
        console.error('Error appendToViajes: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
};

const appendToAutosAlquilados = async (username, newAuto) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Usuarios');
        const coleccion = dbmongo.collection('Usuarios');
        
        // Busca el usuario y hace append a 'autosAlquilados'
        const result = await coleccion.updateOne(
            { usuario: username }, // filtro para buscar al usuario
            { $push: { autosAlquilados: newAuto } } // operador para hacer append al array 'autosAlquilados'
        );
        
        return result;
    } catch (error) {
        console.error('Error appendToAutosAlquilados: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
};

const eliminarUsuario = async (database, data) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Usuarios');
        const coleccion = dbmongo.collection(database);
        const result = await coleccion.deleteOne(data);
        return result;
    } catch (error) {
        console.error('Error eliminarUsuario: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
}

module.exports = {
    insertData,
    getData,
    appendToViajes,
    appendToAutosAlquilados,
    eliminarUsuario
};