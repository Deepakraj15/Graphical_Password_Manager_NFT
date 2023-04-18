const fs = require('fs');
const mergeImages = require('merge-images');
const { Canvas, Image } = require('node-canvas');
const path = require('path');
const fs = require('fs');
const { MersenneTwister19937, bool, real } = require('random-js');
const mongoose = require('mongoose');
const  nft = require('./models/nft.js');

const layersPath = path.join(process.cwd(), 'layers')
const outputPath = path.join(process.cwd(), 'output')

async function generateNFTs(num, layersPath, outputPath) {
    const content = require(layersPath + "/content")
    let generated = new Set()

    for (let tokenId = 0; tokenId < num; tokenId++) {
        let randomNumber = Math.floor(10000 + Math.random() * 90000)
        console.log(`Generating NFT #${tokenId} …`)
        let selection = randomlySelectLayers(layersPath, content.layers)
        const traitsStr = JSON.stringify(selection.selectedTraits)

        if (generated.has(traitsStr)) {
            console.log("Duplicate detected. Retry …")
            tokenId--
            continue
        } else {
            generated.add(traitsStr)
            await mergeLayersAndSave(
                selection.images, 
                path.join(outputPath, `${randomNumber}.png`)
            )

            let metadata = generateMetadata(content,randomNumber, selection.selectedTraits,tokenId)
            fs.writeFileSync(path.join(outputPath, `${randomNumber}`), JSON.stringify(metadata))
        }
    }
}

function generateMetadata(content, randomNumber, traits,tokenId) {
    attributes = []
    for (const [trait_type, value] of Object.entries(traits)) {
        attributes.push({trait_type, value})
    } 
    return content.metadataTemplate(tokenId, attributes,randomNumber)
}

function randomlySelectLayers(layersPath, layers) {
    const mt = MersenneTwister19937.autoSeed()

    let images = []
    let selectedTraits = {}

    for (const layer of layers) {
        if (bool(layer.probability)(mt)) {
            let selected = pickWeighted(mt, layer.options)
            selectedTraits[layer.name] = selected.name
            images.push(path.join(layersPath, selected.file))
        }
    }

    return {
        images,
        selectedTraits
    }
}

function pickWeighted(mt, options) {
    const weightSum = options.reduce((acc, option) => {
        return acc + (option.weight ?? 1.0)
    }, 0)

    const r = real(0.0, weightSum, false)(mt)

    let summedWeight = 0.0;
    for (const option of options) {
        summedWeight += option.weight ?? 1.0
        if (r <= summedWeight) {
            return option
        }
    }
}

async function mergeLayersAndSave(layers, outputFile) {
    const image = await mergeImages(layers, { Canvas: Canvas, Image: Image })
    saveBase64Image(image, outputFile)
}

function saveBase64Image(base64PngImage, filename) {
    let base64 = base64PngImage.split(',')[1]
    let imageBuffer = Buffer.from(base64, 'base64')
    fs.writeFileSync(filename, imageBuffer)
}

generateNFTs(3, layersPath, outputPath)
selectedNFT(nftname)
function selectedNFT(nftfilename) {
    fs.readFile(`output/${nftfilename}`, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
    return;
    }
        console.log(data);
        
     
});
}  
    
const Addnft = async (req, res) => {
       

       var nft = new Addnft({ 
           password: req.body.password,
           hashcode:`` ,
       }); // add password from a text field
    try {
        await nft.save();
        console.log(nft);
    } catch (err) {
        res.send(err);
    }
}