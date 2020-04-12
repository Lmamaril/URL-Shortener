import Axios from 'axios';

export const GENERATE_URLS = "GENERATE URLS";
export const UPDATE_FEEDBACK = "UPDATE FEEDBACK";


export const generateUrls = (urls) => ({
    type: GENERATE_URLS,
    payload: urls
});

export function generateRandomUrl (longUrl, shortUrl) {

 return function (dispatch) {
    console.log("GEN RANDOM");
    return Axios.post('/url/', {
        longUrl: longUrl,
        shortUrl: shortUrl
    }).then((response)=> {
        return dispatch(generateUrls({displayLongUrl:response.data.longUrl, displayShortUrl:response.data.shortUrl}))
    })
    
    }
}
export function generateCustomUrl (longUrl, shortUrl) {
    return function (dispatch) {
        console.log("GEN Custom")
        return Axios.post(`/url/${shortUrl}/`, {
            longUrl:longUrl,
            shortUrl:shortUrl
        }).then((response)=>{
            return dispatch(generateUrls({
                displayLongUrl:response.data.longUrl, 
                displayShortUrl:response.data.shortUrl}))
        })
        
        }
}