let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
    function getMoney() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.open('GET', 'js/current.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();

            request.addEventListener('readystatechange', function () {
                if (request.readyState === 4 && request.status == 200) {
                    let data = JSON.parse(request.response);
                    resolve(data);
                } else if (request.status !== 200) {
                    reject();
                }
            });
        });
    }
    getMoney()
        .then((data) => inputUsd.value = inputRub.value / data.usd.toFixed())
        .catch(() => inputUsd.value = "Что-то пошло не так!");
});