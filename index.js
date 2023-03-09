let chatid = "-1001667496163";
    let token = "6029601858:AAHZ3Bn0d05uXLswYtrDfyzklrotUxAWo7k";
    

function inform() {
    let formValue = {
        family: document.getElementById('family').value,
        name: document.getElementById('nameFamily').value,
        budu: document.getElementById('budu').checked,
        drinks: {
            wine: document.getElementById('wine').checked,
            champaine: document.getElementById('spar').checked,
            vodka: document.getElementById('vodka').checked,
            wiskey: document.getElementById('wiskey').checked,
            noAlko: document.getElementById('no-alko').checked,
            other: document.getElementById('other').checked,
        }
    }
    let text = JSON.stringify(formValue);
    console.log(JSON.stringify(formValue));
    otpravka(token, text, chatid);
};
function otpravka(token, text, chatid) {
    let z = $.ajax({
        type: "POST",
        url: "https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + chatid,
        data: "parse_mode=HTML&text=" + encodeURIComponent(text),
    });
};

