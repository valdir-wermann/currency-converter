const key = "";// key for https://free.currencyconverterapi.com/

const currencies = document.querySelectorAll(".currency");
const from = document.querySelector("#currency_from");
const to = document.querySelector("#currency_to");
const input = document.querySelector("#amount_from");
const output = document.querySelector("#output");
const button = document.querySelector("#convert");

const convert = () => {
    fetch(`https://free.currconv.com/api/v7/convert?q=${from.value}_${to.value}&compact=ultra&apiKey=${key}`)
        .then(_ => _.json())
        .then(_ => result(Object.values(_)[0]));
}

const result = (k) => {
    if (input.value <= 0) return alert("Please, input an valid value for your from amount.")
    output.value = (input.value * k).toFixed(2);
}

const listCurrencies = () => {
    fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${key}`)
        .then(_ => _.json())
        .then(_ => render(_.results))
        .catch(_ => { console.error(_); alert("Sorry, something went wrong while converting!") })
}

const render = (list) => {
    let html = "";

    Object.values(list).forEach(_ => {
        html += `<option title="${_.currencyName}" value="${_.id}">${_.id}</option>`;
    });

    currencies.forEach(c => c.innerHTML = html);
}

listCurrencies();
button.addEventListener("click", convert);
input.addEventListener("input", (e) => { if (e.target.value != "") { convert() } })
from.addEventListener("change", (e) => { if (e.target.value != "") { convert() } });
to.addEventListener("change", (e) => { if (e.target.value != "") { convert() } });
