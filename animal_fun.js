const fs = require('fs');
//
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err){
//     console.log(err);
//     return;
//   }
//
//   let dataArr = data.split('\n');
//   let selected = [];
//   let key = process.argv[2];
//   for (let i = 0; i < dataArr.length; i++){
//     if (dataArr[i][0] === key){
//       selected.push(dataArr[i]);
//     }
//   }
//   let toWrite = selected.join('\n');
//   fs.writeFile('./selected.txt', toWrite, error => {
//     if (error){
//       console.log(error);
//     } else {
//       console.log("File was written successfully!");
//     }
//   });
// });


// fs.writeFile('./example.txt','I will be written to example.txt', err => {
//   if (err){
//     console.log(err);
//   } else {
//     console.log("File was written succesfully!");
//   }
// });

// console.log(process.argv);
const http = require('http');

let animals = [];

const server = http.createServer((req, res) => {
  let url = req.url.split("?");
  let letter = url[1];
  if (letter){
    letter = letter.slice(7).toUpperCase();
    if (animals.length > 0){
      console.log("Data already stored!");
      let selected = [];
      for (let i = 0; i < animals.length; i++){
        if (animals[i][0] === letter){
          selected.push(animals[i]);
        }
      }

      let toWrite = selected.join("\n");
      res.write(toWrite);
      res.end();

    } else {
      fs.readFile('./animals.txt', 'utf-8', (err,data) => {
        if (err){
          console.log(err);
          return;
        }

        let dataArr = data.split('\n');
        animals = dataArr;
        let selected = [];
        let key = letter;
        for (let i = 0; i < dataArr.length; i++){
          if (dataArr[i][0] === letter){
            selected.push(dataArr[i]);
          }
        }

        let toWrite = selected.join("\n");
        res.write(toWrite);
        res.end();

      });
    }
  }
  // fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  //   if (err){
  //     console.log(err);
  //     return;
  //   }
  //
  //   let dataArr = data.split('\n');
  //   let selected = [];
  //   let key = url;
  //   for (let i = 0; i < dataArr.length; i++){
  //     if (dataArr[i][0] === key){
  //       selected.push(dataArr[i]);
  //     }
  //   }
  //   let toWrite = selected.join('\n');
  //   fs.writeFile('./new.txt', toWrite, error => {
  //     if (error){
  //       console.log(error);
  //     } else {
  //       console.log("File was written successfully!");
  //     }
  //   });
  // });
});

server.listen(8000, () => console.log("I'm listening on Port 8000!"));
