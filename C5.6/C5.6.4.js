let btnNode = document.querySelector(".btn");
let resultNode = document.querySelector(".result");

function checkInputValue(className) {
    return new Promise((resolve, reject) => {
        let value = Number(document.querySelector(className).value);
        if(!isNaN(value)) {
            value = Math.round(value);
            if(99 < value && value < 301) {
            resolve(value);
            } else {
                reject('одно из чисел вне диапазона от 100 до 300');
            }
        } else {
            reject('одно из чисел вне диапазона от 100 до 300');
        }
    });
};

function useRequest(callback) {
    Promise.all([checkInputValue('#input1'), checkInputValue('#input2')])
        .then((value) => {
            let url = `https://picsum.photos/${value[0]}/${value[1]}`;
            fetch(url)
                .then((response) => {
                    return response.blob()
                .then((data) => {
                    callback(data)})
                .catch(() => {console.log('error')});
                })
        })
        .catch((error) => {
            console.log(error);
            let result = `
            <p>${error}</p>
            `;
            resultNode.innerHTML = result;
        })      
}

function displayResult(apiData) {
    let objectURL = URL.createObjectURL(apiData);
    let cardBlock = `
    <div class='card'>
        <img src='${objectURL}' class='card-image'>
    </div>
    `;
    resultNode.innerHTML = cardBlock;
};

btnNode.addEventListener('click',() => {useRequest(displayResult)});