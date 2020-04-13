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
    }).then((response)=> { Promise.all([
        dispatch(generateUrls({
            displayLongUrl:response.data.longUrl, 
            displayShortUrl:response.data.shortUrl})),
            dispatch(updateFeedback("Your Short Url Link:"))
        ])}, (error) => Promise.all([
        dispatch(generateUrls({
            displayLongUrl:"", 
            displayShortUrl:""})),
        dispatch(updateFeedback(error.response.data.message))]))
    
    }
}
export function generateCustomUrl (longUrl, shortUrl) {
    return function (dispatch) {
        return Axios.post(`/url/${shortUrl}/`, {
            longUrl:longUrl,
            shortUrl:shortUrl
        }).then((response)=> Promise.all([
            dispatch(generateUrls({
                displayLongUrl:response.data.longUrl, 
                displayShortUrl:response.data.shortUrl})),
                dispatch(updateFeedback("Your Short Url Link:")),
          ]), (error) => Promise.all([
            dispatch(generateUrls({
                displayLongUrl:"", 
                displayShortUrl:""})),
                dispatch(updateFeedback(error.response.data.message))])
          );
    }
}

export function deleteByShortUrl(shortUrl) {
    return function (dispatch) {
        return Axios.delete(`/url/${shortUrl}/`, {
            shortUrl:shortUrl
        }).then(() => { Promise.all([
            dispatch(generateUrls({
                displayLongUrl:"", 
                displayShortUrl:""})),
            dispatch(updateFeedback(`Short Url ${shortUrl} has been successfully deleted.`))
        ])}, (error) => Promise.all([
            dispatch(generateUrls({
                displayLongUrl:"", 
                displayShortUrl:""})),
        dispatch(updateFeedback(error.response.data.message))]))
    }
}

export function retrieveByShortUrl(shortUrl) {
    return function (dispatch) {
        return Axios.get(`/url/${shortUrl}/retrieve/`, {
            shortUrl:shortUrl
        }).then((response)=>{  Promise.all([
            dispatch(generateUrls({
                displayLongUrl:response.data.longUrl, 
                displayShortUrl:response.data.shortUrl})),
                dispatch(updateFeedback(`Your Short URL Link:`))
        ])}, (error) => Promise.all([
            dispatch(generateUrls({
                displayLongUrl:"", 
                displayShortUrl:""})),
            dispatch(updateFeedback(error.response.data.message))])
        )
    }
}

export function editByLongUrl(longUrl, shortUrl) {
    return function (dispatch) {
        return Axios.put(`/url/${shortUrl}/edit/`, {
            longUrl:longUrl
        }).then((response)=>{ Promise.all([
            dispatch(generateUrls({
                displayLongUrl:response.data.longUrl, 
                displayShortUrl:response.data.shortUrl})),
            dispatch(updateFeedback(`Your link was successfully updated.`))])},
            (error) => { dispatch(updateFeedback(error.response.data.message
        ))})
    }
}