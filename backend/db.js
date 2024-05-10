require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');


const uri = process.env.MONGODB_URI;


const mongoDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log('Connected 3');
      let fetched_data = await mongoose.connection.db.collection("food_items");
      let data=await fetched_data.find({}).toArray() 
      global.food_items = data;
    //    console.log(data);
      
    const foodCategory = await mongoose.connection.db.collection("foodCategory");
      let catData=await foodCategory.find({}).toArray() 
      global.foodCategory = catData;
    //   console.log(catData);
        
    } catch (error) {
      console.log('err: ', error);
    }
  };
//   finally {
//     await client.close();
//     console.log('Disconnected from MongoDB');
//   }
// }

module.exports = mongoDB;



// const mongoose = require('mongoose');

// //mongoose connecting

// const mongoDB=()=>{


//     main().catch(err=>
//         console.log(err)
//     );
//     async function main(){
//         await mongoose.connect('mongodb://127.0.0.1:27017/indiancurrymern');
//         const fetched_data = mongoose.connection("food_items");
//         fetched_data.find({}).toArray(function(err,data){
//             if(err)console.log(err);
//             else console.log(data);
//         })
//     }
//     main().then(()=>{
//         console.log("MongoDB connected 3");
        
//     });

// };

// module.exports = mongoDB;



// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://127.0.0.1:27017/indiancurrymern';

// const mongoDB=async()=>{
//     await mongoose.connect(mongoURI,{useNewUrlParser:true} , async(err,result)=>{
//         if(err)console.log(err);
//         else{
//             console.log("connected3");
//             // const fetched_data = await mongoose.Connection.db.collection("food_items");
//             // fetched_data.find({}).toArray(function(err,data){
//             //     if(err)console.log(err);
//             //     else console.log(data);
//             // })
//         }
//     })
// };

// module.exports = mongoDB;