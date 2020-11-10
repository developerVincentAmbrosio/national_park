const baseUrl = "https://developer.nps.gov/api/v1/parks";
const apiKey = "bqe6OTlEglcZAXClrTLUPwHffKkd9cn9ixqtuBkU";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    $('.js-results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.js-results-list').append(`
            <ul>
                <li><h3>${responseJson.data[i].fullName}</h3></li>
                <li><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>
                <li><p>${responseJson.data[i].description}</p></li>   
                <li><p><b>${responseJson.data[i].addresses[0].type} Address: </b>
                          ${responseJson.data[i].addresses[0].line1} 
                          ${responseJson.data[i].addresses[0].line2} 
                          ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p></li>
                <li><p><b>${responseJson.data[i].addresses[1].type} Address: </b>
                          ${responseJson.data[i].addresses[1].line1} 
                          ${responseJson.data[i].addresses[1].line2} 
                          ${responseJson.data[i].addresses[1].city}, ${responseJson.data[i].addresses[1].stateCode} ${responseJson.data[i].addresses[1].postalCode}</p></li>
            </ul>
            <hr>`
            )};
    $('.js-results').removeClass('hidden');
}

function getParkInfo(query, maxResults=10) {
    const params = {
        api_key: apiKey,
        q: query,
        limit: maxResults
    };

    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString;

    fetch (url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson));
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