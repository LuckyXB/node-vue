const {
   getTestSync,
   gettestdata
} = require('./mongo_database');

// database.getDb(function(testdb){
//     testdb.collection('xuebiao').find({}).toArray(function (err, result) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(result);

//     });;
// });

async function main() {

   // 如果出错 使用try  catch
   try {

      const db = await getTestSync('test');

      const xuebiao_table = db.collection('xuebiao');

      const testdata = await gettestdata(xuebiao_table, {});

      console.log(testdata);
   } catch (err) {
      console.log(err);
   }
}
main();
