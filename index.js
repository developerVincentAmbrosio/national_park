'use strict';

const baseUrl = "https://developer.nps.gov/api/v1/parks";
const apiKey = "bqe6OTlEglcZAXClrTLUPwHffKkd9cn9ixqtuBkU";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        //array[PA, NJ]
        //stateCode=PA&stateCode=NJ
        .map(key => {
            if (key === "stateCode") {
                let multipleStates = "";
                params[key].forEach((state,i) => {
                    if (i < params[key].length -1) {
                        multipleStates += `${encodeURIComponent(key)}=${encodeURIComponent(state.trim())}&`    
                    } else {
                        multipleStates += `${encodeURIComponent(key)}=${encodeURIComponent(state.trim())}`
                    }
                })
                console.log(multipleStates);
                return multipleStates;
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
            }
        })
    return queryItems.join('&');
}

function getParkInfo(query) {
    const params = {
        stateCode: query,
        api_key: apiKey
    }; 
    
    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString;

    fetch (url)
        .then(response => response.json())
        .then(responseJson => displayParkNamesDescriptions(responseJson));
}

function displayParkNamesDescriptions(responseJson) {
    console.log(responseJson.data);
    $('.js-results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
//        for (let j = 0; j < responseJson.data.addresses.length; j++) {
//            const parkAddress = `${responseJson.data[i].addresses[j].type} Address: ${responseJson.data[i].addresses[j].line1} ${responseJson.data[i].addresses[j].line2} ${responseJson.data[i].addresses[j].city} ${responseJson.data[i].addresses[j].stateCode} ${responseJson.data[i].addresses[j].postalCode}`;        
//            console.log(parkAddress);
//        }
        $('.js-results-list').append(`
            <ul class="item">
                <li><h3>${responseJson.data[i].fullName}</h3></li>
                <li><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></li>
                <li><p>${responseJson.data[i].description}</p></li>
                
                <hr>
            </ul>`) // <li>${parkAddress}</li>
        };
    $('.js-results').removeClass('hidden');
}

function submitFormListener() {
    $('#submit').click(event => {
        event.preventDefault();
        const userParkSearch = $('#js-search').val().trim().split(",");
        const userNumberOfResults = $('#js-max-results').val();
        getParkInfo(userParkSearch, userNumberOfResults);
        console.log(userParkSearch);
    });
}

$(submitFormListener);