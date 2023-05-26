let btnNode = document.querySelector(".btn");
let resultNode = document.querySelector(".result");

function useRequest(callback) {
    let value = Number(document.querySelector('input').value);
    console.log(value);
    if(!isNaN(value)) {
        value = Math.round(value);
        console.log(value);
        if(0 < value && value < 11) {
            let xhr = new XMLHttpRequest();
            const url = `https://picsum.photos/v2/list?limit=${value}`;
            console.log(url);
            xhr.open('GET', url, true);
            xhr.onload = function() {
                if(xhr.status != 200) {
                    console.log(`Ошибка! Статус ответа: ${xhr.status}`);
                } else {
                    const result = JSON.parse(xhr.response);
                    console.log(result);
                    if(callback) {
                        callback(result);
                    }
                }
            };
            xhr.onerror = function() {
                console.log(`Ошибка! Статус ответа: ${xhr.status}`);
            };
            xhr.send();
        } else {
            const result = 'число вне диапазона от 1 до 10';
            console.log(result);
            if(callback) {
                callback(result);
            }
        };
    } else {
        const result = 'Введите число';
        console.log(result);
        if(callback) {
            callback(result);
        }
    }
};

function displayResult(apiData) {
    let cards = '';
    if(typeof apiData === 'string') {
        cards = `
        <p>${apiData}</p>
        `;
    } else {
        apiData.forEach(item => {
        let cardBlock = `
        <div class='card'>
            <img src='${item.download_url}' class='card-image' width='300'>
            <p>${item.author}</p>
        </div>
        `;
        cards = cards + cardBlock;
    });
    }
    resultNode.innerHTML = cards;

};

btnNode.addEventListener('click',() => {useRequest(displayResult)});
