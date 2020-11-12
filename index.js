'use strict';

const baseUrl = "https://developer.nps.gov/api/v1/parks";
const apiKey = "bqe6OTlEglcZAXClrTLUPwHffKkd9cn9ixqtuBkU";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayParkNamesDescriptions(responseJson) {
    console.log(responseJson.data);
    $('.js-results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
//        for (let j = 0; j < responseJson.data.length; j++) {
//            const parkAddress = `${responseJson.data[i].addresses[j].type} Address: ${responseJson.data[i].addresses[j].line1} ${responseJson.data[i].addresses[j].line2} ${responseJson.data[i].addresses[j].city} ${responseJson.data[i].addresses[j].stateCode} ${responseJson.data[i].addresses[j].postalCode}`;
            
//            console.log(parkAddress);
//        }
        $('.js-results-list').append(`
            <ul class="item">
                <li><h3>${responseJson.data[i].fullName}</h3></li>
                <li><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>
                <li><p>${responseJson.data[i].description}</p></li>
            </ul>`) //<li>${parkAddress}</li>
        };
    $('.js-results').removeClass('hidden');
}

function getParkInfo(stateCode, maxResults=10) {
    const params = {
        api_key: apiKey,
        stateCode: stateCode.trim().split(",") ,
        limit: maxResults
    };

    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString;

    fetch (url)
        .then(response => response.json())
        .then(responseJson => displayParkNamesDescriptions(responseJson));
}

function submitFormListener() {
    $('#submit').click(event => {
        event.preventDefault();
        const userParkSearch = $('#js-search').val();
        const maxResults = $('#js-max-results').val();
        getParkInfo(userParkSearch, maxResults);
    });
}

$(submitFormListener);