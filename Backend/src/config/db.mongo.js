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

const insertViajes = async(database, data) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Viajes');
        const coleccion = dbmongo.collection(database);
        const result = await coleccion.insertOne(data);
        return result;
    }
    catch (error) {
        console.error('Error insertData: ', error);
        return error;
    }
    finally {

        await mongoClient.close();
    }
};

const insertAutos = async(database, data) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Autos');
        const coleccion = dbmongo.collection(database);
        const result = await coleccion.insertOne(data);
        return result;
    }
    catch (error) {
        console.error('Error insertData: ', error);
        return error;
    }
    finally {

        await mongoClient.close();
    }
}

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
        result2 = null;
        
        if (newViaje?.length || 0  > 0) {
            for (let i = 0; i < newViaje?.length || 0; i++) {

                //verificar si el viaje ya existe en viajesNoAprobados o viajesComprados,si existe continuar con el siguiente viaje
                const resultData = await getData('Usuarios', { usuario: username });
                if (resultData instanceof Error) {
                    return res.json({
                        status: false,
                        message: 'Error al obtener datos de la base de datos',
                    });
                }
                if (resultData == null) {
                    return res.json({
                        status: false,
                        message: 'El usuario no existe',
                    });

                }

                if (resultData.viajesNoAprobados?.length || 0 > 0) {
                    for (let j = 0; j < resultData.viajesNoAprobados?.length || 0; j++) {
                        if (resultData.viajesNoAprobados[j].ciudadOrigen == newViaje[i].ciudadOrigen && resultData.viajesNoAprobados[j].ciudadDestino == newViaje[i].ciudadDestino) {
                            return res.json({
                                status: false,
                                message: 'El viaje ya existe en viajesNoAprobados',
                            });
                        }
                    }
                }

                if (resultData.viajesComprados?.length || 0 > 0) {
                    for (let j = 0; j < resultData.viajesComprados?.length || 0; j++) {
                        if (resultData.viajesComprados[j].ciudadOrigen == newViaje[i].ciudadOrigen && resultData.viajesComprados[j].ciudadDestino == newViaje[i].ciudadDestino) {
                            return res.json({
                                status: false,
                                message: 'El viaje ya existe en viajesComprados',
                            });
                        }
                    }
                }



                
                

                



                // Busca el usuario y hacer append a 'newViaje'
                const result = await coleccion.updateOne(
                    { usuario: username }, // filtro para buscar al usuario
                    { $push: { viajesNoAprobados: newViaje[i] } } // operador para hacer append al array 'viajes'
                );  
    
            }
            //cambiar el atributo a viajesPendientes a true
            const result2 = await coleccion.updateOne(
                { usuario: username }, // filtro para buscar al usuario
                { $set: { viajesPendientes: true } } // operador para hacer append al array 'viajes'
            );
        }
        
        
        return result2;
    } catch (error) {
        console.error('Error appendToViajes: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
};

const appendToAutos = async (username, newAuto) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Usuarios');
        const coleccion = dbmongo.collection('Usuarios');
        result2 = null;

        if (newAuto?.length || 0 > 0) {
            for (let i = 0; i < newAuto?.length || 0; i++) {

                //verificar si el auto ya existe en autosAlquilados,si existe continuar con el siguiente auto
                const resultData = await getData('Usuarios', { usuario: username });
                if (resultData instanceof Error) {
                    return res.json({
                        status: false,
                        message: 'Error al obtener datos de la base de datos',
                    });
                }
                if (resultData == null) {
                    return res.json({
                        status: false,
                        message: 'El usuario no existe',
                    });

                }

                if (resultData.autosNoAprobados?.length || 0 > 0) {
                    for (let j = 0; j < resultData.autosNoAprobados?.length || 0; j++) {
                        if (resultData.autosNoAprobados[j].marca == newAuto[i].marca && resultData.autosNoAprobados[j].modelo == newAuto[i].modelo) {
                            console.log('El auto ya existe en autosNoAprobados');
                        }
                    }
                }

                
                if (resultData.autosComprados && resultData.autosComprados.length > 0) {
                    for (let j = 0; j < resultData.autosComprados.length; j++) {
                        if (resultData.autosComprados[j].placa == newAuto[i].placa) {
                           console.log('El auto ya existe en autosComprados');
                        }
                    }
                }
                
                


                // Busca el usuario y hacer append a 'newAuto'
                const result = await coleccion.updateOne(
                    { usuario: username }, // filtro para buscar al usuario
                    { $push: { autosNoAprobados: newAuto[i] } } // operador para hacer append al array 'autosAlquilados'
                );

            }
        }

        
        return result2;
    } catch (error) {
        console.error('Error appendToAutos: ', error);
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

const getUsuarios = async(database) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Usuarios');
        const coleccion = dbmongo.collection(database);
        const result = await coleccion.find().toArray();
        return result;
    } catch (error) {
        console.error('Error getUsuarios: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
};

const getViajes = async(database) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Viajes');
        const coleccion = dbmongo.collection(database);
        const result = await coleccion.find().toArray();
        return result;
    } catch (error) {
        console.error('Error getViajes: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
};

const getAutos = async(database) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Autos');
        const coleccion = dbmongo.collection(database);
        const result = await coleccion.find().toArray();
        return result;
    } catch (error) {
        console.error('Error getAutos: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
};


// una funcion que verifique el atributo viajesPendientes y si es true, que liste los viajes de viajesComprados y que permita eliminarlo segun ciudadOrigen y ciudadDestino
const eliminarViaje = async (username, ciudadOrigen, ciudadDestino) => {
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Usuarios');
        const coleccion = dbmongo.collection('Usuarios');
        
        // Busca el usuario y obtener los viajes comprados y eliminar el viaje segun ciudadOrigen y ciudadDestino
        const result = await coleccion.updateOne(
            { usuario: username }, // filtro para buscar al usuario
            { $pull: { viajesComprados: { ciudadOrigen: ciudadOrigen, ciudadDestino: ciudadDestino } } } // operador para eliminar un elemento del array 'viajesComprados'
        );
        
        return result;
    } catch (error) {
        console.error('Error eliminarViaje: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }
}

const eliminarAuto = async (username, marca, modelo) => {

    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
        const dbmongo = mongoClient.db('Usuarios');
        const coleccion = dbmongo.collection('Usuarios');
        
        // Busca el usuario y obtener los autos alquilados y eliminar el auto segun marca y modelo
        const result = await coleccion.updateOne(
            { usuario: username }, // filtro para buscar al usuario
            { $pull: { autosAlquilados: { marca: marca, modelo: modelo } } } // operador para eliminar un elemento del array 'autosAlquilados'
        );
        
        return result;
    } catch (error) {
        console.error('Error eliminarAuto: ', error);
        return error;
    } finally {
        await mongoClient.close();
    }

}


const aceptarViajes = async (viajes) => {
    //recorrer el array de viajes y hacer append a viajesComprados y eliminar de viajesNoAprobados
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    console.log('Viajes DB --> ', viajes);
    try{

        //recorrer el array de viajes y hacer append a viajesComprados y eliminar de viajesNoAprobados
        for(let i=0;i<viajes?.length || 0;i++){
            let username = viajes[i].usuario;
            let viaje = viajes[i];

            


            await mongoClient.connect();
            const dbmongo = mongoClient.db('Usuarios');
            const coleccion = dbmongo.collection('Usuarios');
            const result = await coleccion.updateOne(
                { usuario: username }, // filtro para buscar al usuario
                { $push: { viajesComprados: viaje } } // operador para hacer append al array 'viajesComprados'
            );

            const result2 = await coleccion.updateOne(
                { usuario: username }, // filtro para buscar al usuario
                { $pull: { viajesNoAprobados: { ciudadOrigen: viaje.ciudadOrigen, ciudadDestino: viaje.ciudadDestino } } } // operador para eliminar un elemento del array 'viajesNoAprobados'
            );
            



        }
        
        return {
            status: true,
            message: 'Viajes aceptados correctamente'
        }

    }catch(error){
        console.error('Error aceptarViajes: ', error);
        return error;
    }


}


const aceptarAutos = async (autos) => {
    //recorrer el array de autos y hacer append a autosComprados y eliminar de autosNoAprobados
    console.log('uri', uri);
    const mongoClient = new MongoClient(uri);
    console.log('Autos DB --> ', autos);
    try{

        //recorrer el array de autos y hacer append a autosComprados y eliminar de autosNoAprobados
        for(let i=0;i<autos?.length || 0;i++){
            let username = autos[i].usuario;
            let auto = autos[i];


            await mongoClient.connect();
            const dbmongo = mongoClient.db('Usuarios');
            const coleccion = dbmongo.collection('Usuarios');
            const result = await coleccion.updateOne(
                { usuario: username }, // filtro para buscar al usuario
                { $push: { autosComprados: auto } } // operador para hacer append al array 'autosComprados'
            );

            const result2 = await coleccion.updateOne(
                { usuario: username }, // filtro para buscar al usuario
                { $pull: { autosNoAprobados: { marca: auto.marca, modelo: auto.modelo } } } // operador para eliminar un elemento del array 'autosNoAprobados'
            );

        }

        return {
            status: true,
            message: 'Autos aceptados correctamente'
        }

    }
    catch(error){
        console.error('Error aceptarAutos: ', error);
        return error;
    }
}

module.exports = {
    insertData,
    getData,
    appendToViajes,
    appendToAutosAlquilados,
    eliminarUsuario,
    getUsuarios,
    insertViajes,
    insertAutos,
    getViajes,
    aceptarViajes,
    getAutos,
    appendToAutos,
    aceptarAutos
};