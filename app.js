const sqlite3 = require('sqlite3').verbose();
let i =  1;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
  readline.question('Pls Provide Product id?', id => {
    readline.close();
    let db = new sqlite3.Database('productsDb.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the productsDb database.');
    });

      db.serialize(() => {
            db.each(`SELECT * FROM products WHERE ID=${id}`, (err,row) => {
                if (err) 
                  console.error(err);
                console.log('Selected Product by User:')
                console.table(row);
               });
            
            db.each(`SELECT * FROM products`, (err, row) => {
                if (err) {
                console.error(err.message);
              }
              console.log(`Product number ${i++}`)
              console.table(row);
            });
        
        });  

        // close connector
        db.close((err) => {
            if (err) {
            console.error(err.message);
            }
            console.log('Close the database connection.');
        });  
            
  });


    
    
