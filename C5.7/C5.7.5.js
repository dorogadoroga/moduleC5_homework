// работает только через vpn

let btnNode = document.querySelector(".btn");
let resultNode = document.querySelector(".result");

function checkInputValue(value) {
    if(!isNaN(value) && 0 < value && value < 11) {
        return true;
    } else {
        return false;  
    };
};

function useRequest() {
    let page = Number(document.querySelector('#page').value);
    let limit = Number(document.querySelector('#limit').value);
    let result = '';
    if(!checkInputValue(page) && !checkInputValue(limit)) {
        result = `
        <p>Номер страницы и лимит вне диапазона от 1 до 10</p>
        `;
    } if(!checkInputValue(page) && checkInputValue(limit)) {
        result = `
        <p>Номер страницы вне диапазона от 1 до 10</p>
        `;
    } if(checkInputValue(page) && !checkInputValue(limit)) {
        result = `
        <p>Лимит вне диапазона от 1 до 10</p>
        `;
    } if(checkInputValue(page) && checkInputValue(limit)) {
        let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
        return fetch(url)
            .then((response) => {
                return response.json()})
            .then((result) => {
                console.log(result);
                localStorage.setItem('myKey', JSON.stringify(result));
                console.log('local', localStorage.getItem('myKey'));
                return result;
            })
            .catch(() => {console.log('error')});   
    };
    return result;
};

function displayResult(result) {
    cards = '';
    if(typeof result === 'string') {
        cards = result;
    } else {
        console.log(result);
        result.forEach(item => {
            let cardBlock = `
            <div class='card'>
                <img src='${item.download_url}' class='card-image' width = 300>
            </div>
            `;
            cards = cards + cardBlock;
        })
    };
    resultNode.innerHTML = cards;
};

btnNode.addEventListener('click', async() => {
    let data = await useRequest();
    displayResult(data);
});

document.addEventListener('DOMContentLoaded', function() {
    let data = localStorage.getItem('myKey');
    console.log(data);
    data = JSON.parse(data);
    console.log(data);
    if(data) {
        displayResult(data);
    };
})