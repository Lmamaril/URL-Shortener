const mongoose = require("mongoose")
const Schema = require('mongoose').Schema;

const UrlSchema = new Schema({
    longUrl: String,
    shortUrl: String
}, { collection : 'urls' });

const UrlModel = mongoose.model("Url", UrlSchema);

function insertUrlPair(url) {
    return UrlModel.create(url);
}

function getAllUrlPairs() {
    return UrlModel.find().exec();
}

function findUrlPairByLongUrl(longUrl) {
    return UrlModel.findById(longUrl).exec();
}

function findUrlPairByShortUrl(shortUrl) {
    return UrlModel.findById(shortUrl).exec();
}

module.exports = {
    insertUrlPair,
    getAllUrlPairs,
    findUrlPairByLongUrl,
    findUrlPairByShortUrl
};