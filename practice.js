selectedNFT('15935')
function selectedNFT(nftfilename) {
    const fs = require('fs');

fs.readFile(`output/${nftfilename}`, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(data);
});

    
 }  