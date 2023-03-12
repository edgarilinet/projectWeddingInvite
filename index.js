let chatid = "-1001667496163";
let token = "6029601858:AAHZ3Bn0d05uXLswYtrDfyzklrotUxAWo7k";
window.onload = getMyLocation;
let latitude;
let longitude;
let radioBudu = document.getElementById('budu');
let radioNeBudu = document.getElementById('!budu');
let family = document.getElementById('family');
let nameFamily = document.getElementById('nameFamily');


function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    }
}

function displayLocation(position) {
    latitude = position.coords.latitude; //широтa
    longitude = position.coords.longitude; //долготa
    console.log(latitude, longitude)
}

function radiocheck(id) {
    if (id === 'budu') {
        radioBudu.checked = true;
        radioNeBudu.checked = false;
    } else if (id === 'neBudu') {
        radioBudu.checked = false;
        radioNeBudu.checked = true;
    }
}


function inform() {
    if ((family.value === '') || (nameFamily.value === '')) {
        alert('Заполните все обязательные поля')
    } else {
        let formValue = `
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
            Другое: ${tfTranslate(document.getElementById('other').checked)}:
            ${document.getElementById('otherText').value}
        `
        let text = formValue;
        console.log(formValue);
        otpravka(token, text, chatid);
    }
};
function otpravka(token, text, chatid) {
    let z = $.ajax({
        type: "POST",
        url: "https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + chatid,
        data: "parse_mode=HTML&text=" + encodeURIComponent(text),
    });
};
function tfTranslate(tf) {
    if (tf) return 'да';
    else return 'нет';
}

function scrollArrow(id) {
    console.log('scroll ok');
    document.getElementById(id).scrollIntoView();
}

// function other(){
//     if(document.getElementById('other').checked){
//         let otherInputText = createElement('input')
//     }
// }
