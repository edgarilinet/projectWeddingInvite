// 1. лучше избавляться от переменных и переходить к константам, это относится и к константам ссылочного типа (объекты, массивы, только в этом случае не нужно менять
// сам объект/массив)
// изменяемое состояние - плохо, потому что код, при росте проекта, становится трудно поддерживаемым, его сложно дебажить и новому разработчику, который
// будет смотреть твой код, придется держать в голове слишком много, чтобы понять весь код и исполнение этого кода.
// Посмотри в сторону функционального программирования и  философию, которой придерживатеся реакт, редакс (на странице Get started обычно ее описывают)
// 2. не нужно держать переменные вне модулей, оберток ( - функции например), аргументы те же, что и в пункте 1. старайся изолировать их в тех же функциях
let chatid = "-1001667496163";
let token = "6029601858:AAHZ3Bn0d05uXLswYtrDfyzklrotUxAWo7k";
window.onload = getMyLocation;
let latitude;
let longitude;
let radioBudu = document.getElementById('budu');
let radioNeBudu = document.getElementById('!budu');
let family = document.getElementById('family');
let nameFamily = document.getElementById('nameFamily');

// --My-- не нравится нейминг, my - чей? разработчика или того кто юзает? приходится читать код, чтобы понять - время, силы, а представь что таких функций будет много
// - тяжело.
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    }
    /*
    // легче читается - но это уже по личному вкусу
    //  if (navigator.geolocation) return;
    //  navigator.geolocation.getCurrentPosition(displayLocation);
    */
}

function displayLocation(position) {
    latitude = position.coords.latitude; //широтa
    longitude = position.coords.longitude; //долготa
    // консильки нужно удалять, это рудимент для конечного пользователя
    console.log(latitude, longitude)
}

// нейминг не очень, что такое inform? чем информирует?
function inform() {
    console.log('inform ok');
    if ((family.value === '') || (nameFamily.value === '')) {
        alert('Заполните все обязательные поля')
    } else {
        let formValue = formRead();
        // лучше использовать английский
        otpravka(token, formValue, chatid);
        allClean();
        thx4Form();
    }
};
// radioCheck - camelcase
function radiocheck(id) {
    if (id === 'budu') {
        radioBudu.checked = true;
        radioNeBudu.checked = false;
//else - в данном случае - рудимент, он не нужен, у тебя и так два условия, значит при не исполнении первого, второе выполнится
    } else if (id === 'neBudu') {
        radioBudu.checked = false;
        radioNeBudu.checked = true;
    }
//     if (id === 'budu') {
//         radioBudu.checked = true;
//         radioNeBudu.checked = false;
//         return;
//     } 
//     radioBudu.checked = false;
//     radioNeBudu.checked = true;
//     
}

function formRead(){
    return(`
    **Новый ответ:**
    от: ${latitude} : ${longitude},
    Фамилия: ${family.value};
    Имя: ${nameFamily.value};
    Буду: ${tfTranslate(document.getElementById('budu').checked)}; 
    Напитки: 
        вино: ${tfTranslate(document.getElementById('wine').checked)};
        Шампанское: ${tfTranslate(document.getElementById('spar').checked)}; 
        Водка: ${tfTranslate(document.getElementById('vodka').checked)}; 
        Виски: ${tfTranslate(document.getElementById('wiskey').checked)}; 
        Без алкоголя: ${tfTranslate(document.getElementById('no-alko').checked)};
        Комментарий: ${document.getElementById('otherText').value}
    `
    )
}
// предлагаю sendForm
function otpravka(token, text, chatid) {
    let z = $.ajax({
        type: "POST",
        url: "https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + chatid,
        data: "parse_mode=HTML&text=" + encodeURIComponent(text),
    });
};
// при чтении не понятно что значит tf
function tfTranslate(tf) {
    if (tf) return 'да';
    else return 'нет';
}

function scrollArrow(id) {
    console.log('scroll ok');
    document.getElementById(id).scrollIntoView();
}

function other(){
    if(document.getElementById('other').checked){
        let otherInputText = createElement('input');
        let pole = document.getElementById('otherDiv');
        pole.appendChild(otherInputText);
        
    }
}

function allClean(){
    family.value = '';
    nameFamily.value = '';
    document.getElementById('budu').checked = false;
    document.getElementById('!budu').checked = false;
    document.getElementById('wine').checked = false;
    document.getElementById('spar').checked = false;
    document.getElementById('vodka').checked = false;
    document.getElementById('wiskey').checked = false;
    document.getElementById('no-alko').checked = false;
    document.getElementById('otherText').value = '';
    console.log('allClean ok');
}
// thx4Form -?
function thx4Form(){
    let formDiv = document.getElementById("formBoard");
    formDiv.remove();
    let thxBoard = document.createElement('div');
    thxBoard.textContent = "Спасибо за Ваш ответ!";
    thxBoard.setAttribute('class', 'forma');
    document.getElementById('formAll').
            appendChild(thxBoard);

}
