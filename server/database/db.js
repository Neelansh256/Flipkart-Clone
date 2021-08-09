import mongoose from 'mongoose';

const Connection = async (username,password) => {
    const URL = `mongodb://${username}:${password}@flipkart-clone-shard-00-00.6cem6.mongodb.net:27017,flipkart-clone-shard-00-01.6cem6.mongodb.net:27017,flipkart-clone-shard-00-02.6cem6.mongodb.net:27017/FLIPKART-CLONE?ssl=true&replicaSet=atlas-6vn3h1-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false});
        console.log('Database connected successfully!')
    }
    catch(error) {
        console.log('Error: ', error.message);
    }
}

export default Connection;