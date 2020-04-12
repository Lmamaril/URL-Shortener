const express = require('express');
const router = express.Router();
const { uuid } = require('uuidv4');

const UrlAccessor = require('./url.model');

// Get all Urls
router.get('/', (req, res) => {
        return UrlAccessor.getAllUrlPairs()
            .then((response) => res.status(200).send(response),
                (error) =>  res.status(404).send({message:` Error finding the Urls:${error}`}));
});

// Get an existing url pair
router.get('/:shortUrl', (req,res) => {
    const shortUrl = req.params.shortUrl;
    return UrlAccessor.findUrlPairByShortUrl(shortUrl)
    .then((response) => {
        if(!response) {
            res.status(404).send({message:`Error finding: ${shortUrl}`});
        } else {
            res.status(200).send(response);
        }
    }) 
})

// generate a random short url
router.post('/', (req, res) => {
    // Retrieve long url
    const longUrl = req.body.longUrl;
    // check if the long url already exists in the database
    return UrlAccessor.findUrlPairByLongUrl(longUrl)
    .then((response) => {
        // if the long url doesn't exist in the db,
        // insert a unique short url with long url into the db
        if(!response) {
            return UrlAccessor.insertUrlPair(makeNewUrlPair(longUrl));
        } // if the long url already exists, return the response
        return response;
    }).then((response) => res.status(200).send(response), 
    (error) => res.status(404).send({message:`Error posting Url:${error}`}));
});

// generate a custom short url
router.post('/:shortUrl', (req, res) => {
    const longUrl = req.body.longUrl;
    const shortUrl = req.params.shortUrl;

    return UrlAccessor.findUrlPairByShortUrl(shortUrl).then((response)=>{
        if(!response) {
            // short url doesn't exist, check if long url exists
            return UrlAccessor.findUrlPairByLongUrl(longUrl).then((response) =>{
                if (!response) {
                    return UrlAccessor.insertUrlPair({ longUrl:longUrl, shortUrl:shortUrl })
                    .then((response)=>{
                        res.status(200).send(response);
                    })
                } else {
                    res.status(400).send({message:`Your long url already exists with` +
                ` the short url ${response.shortUrl}`}) //TODO find out hot to access short url
                }
            })
        } else {
            if (response.longUrl === longUrl ) { //TODO find out hot to access response.Url
                res.status(200).send({ message: "This url was already made" });
            } else {
                res.status(400).send({ message: "Short url is already taken" });
            }
        }
    })
});

// generate random key and return a new key pair
const makeNewUrlPair = function(longUrl){
        let key = uuid();
        // Keep generating a new key if a short url already exists in the db
        while (UrlAccessor.findUrlPairByShortUrl(key).length) {
            key =  uuid();
        }
        return ({
            longUrl: longUrl,
            shortUrl: key
        })
}

// update the long url of an existing url pair
router.put('/:shortUrl/edit',function (req, res){
    const shortUrl = req.params.shortUrl;
    const newLongUrl = req.body.longUrl;
    // Check if the short Url exists
    return UrlAccessor.findUrlPairByShortUrl(shortUrl)
    .then((response) => {
        // update the short key
        if (!response) {
            res.status(404).send({message:`Error finding: ${shortUrl}`});
        } else {
            UrlAccessor.findUrlPairByLongUrl(newLongUrl)
            .then((response)=> {
                if (!response) {
                    UrlAccessor.updateLongUrl(shortUrl, newLongUrl).then(()=>{
                        res.status(200).send({message:"Successfully updated"})
                    })
                } else {
                    if (response.shortUrl === shortUrl) {
                        res.status(404).send(`Short url is already made.`)
                    } else {
                        res.status(404).send({message:`Cannot update.${newLongUrl} `+
                        `already exists using ${response.shortUrl}`});
                    }
                    
                }
            })
        }
    })
});

router.delete('/:shortUrl', function (req, res) {
    const shortUrl = req.params.shortUrl;
    return UrlAccessor.deleteUrlPairByShortUrl(shortUrl)
    .then((response) => res.status(200).send(response),
        (error) => res.status(404).send({message:`Error deleting Url:${error}`}))
});

module.exports = router;