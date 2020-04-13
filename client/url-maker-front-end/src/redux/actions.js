import Axios from 'axios';

export const GENERATE_URLS = "GENERATE URLS";
export const UPDATE_FEEDBACK = "UPDATE FEEDBACK";


export const generateUrls = (urls) => ({
    type: GENERATE_URLS,
    payload: urls
});

export const updateFeedback = (message) => ({
    type: UPDATE_FEEDBACK,
    payload: message
})

export function generateRandomUrl (longUrl, shortUrl) {

 return function (dispatch) {
    return Axios.post('/url/', {
        longUrl: longUrl,
        shortUrl: shortUrl
    }).then((response)=> {
        return dispatch(generateUrls({
            displayLongUrl:response.data.longUrl, 
            displayShortUrl:response.data.shortUrl}))
    }, (error) => console.log("Error", error) )
    
    }
}
export function generateCustomUrl (longUrl, shortUrl) {
    return function (dispatch) {
        return Axios.post(`/url/${shortUrl}/`, {
            longUrl:longUrl,
            shortUrl:shortUrl
        }).then((response)=>{
            console.log(response.data)
            return dispatch(generateUrls({
                displayLongUrl:response.data.longUrl, 
                displayShortUrl:response.data.shortUrl}))
        }, (error) => console.log("Error", error));
    }
}

export function deleteByShortUrl(shortUrl) {
    return function (dispatch) {
        return Axios.delete(`/url/${shortUrl}/`, {
            shortUrl:shortUrl
        }).then((response)=>{
            console.log(response.data)
        })
    }
}

export function retrieveByShortUrl(shortUrl) {
    return function (dispatch) {
        return Axios.get(`/url/${shortUrl}/retrieve/`, {
            shortUrl:shortUrl
        }).then((response)=>{
            dispatch(generateUrls({
                displayLongUrl:response.data.longUrl, 
                displayShortUrl:response.data.shortUrl}));   

        }).catch( (error) => {
            console.log("Error", error.response.data.message)
            dispatch(updateFeedback(error.response.data.message));
        });
    }
}

export function editByLongUrl(longUrl, shortUrl) {
    return function (dispatch) {
        return Axios.put(`/url/${shortUrl}/edit/`, {
            longUrl:longUrl
        }).then((response)=>{
            console.log(response.data) })
    }
}