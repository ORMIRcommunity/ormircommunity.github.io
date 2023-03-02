const monDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
/*const groupColors = {"ORMIR community":"LightSalmon", "SPECTRA":"LemonChiffon", "Knee":"Cyan", "Biomechanics":"GhostWhite", "Muscle":"LightPink", "extra_meeting":"lightgreen"}*/
const groupColors = {"ORMIR community":"#9b5fe0", 
                     "SPECTRA":"#16a4d8", "Knee":"#60dbe8", "Biomechanics":"#8bd346", "Muscle":"#efdf48", 
                     "Community Advisory Board":"#f9a52c", "Technical Advisory Board":"#d64e12",
                     "extra_meeting":"#8dd3c7" }
// Color palette from: https://colorswall.com/palette/171311
//  Lavender Indigo
//  #9b5fe0
//  Battery Charged Blue
//  #16a4d8
//  Sky Blue (Crayola)
//  #60dbe8
//  Kiwi
//  #8bd346
//  Minion Yellow
//  #efdf48
//  Deep Saffron
//  #f9a52c
//  Sinopia
//  #d64e12
function createCalendar(date) {  
    const calDays = [];
    
    first = date.getDay()

    for (let i = 0; i < 35; i++) {
        if (i < first) {
            calDays[i] = -1;
        }
        else {
            calDays[i] = i - first + 1;
        }
        
        let maxDay = monDays[date.getMonth()];
        const elemName = "r" + (Math.floor((i) / 7) + 1) + "c" + (i % 7 + 1)
        const elem = document.getElementById(elemName);
        
        if (i >= 35 && i - first + 1 > maxDay) {
            elem.style.display = "none";
        }
        else if (calDays[i] == -1 || calDays[i] > maxDay) {
            elem.innerHTML = "";
        }
        else {
            elem.innerHTML = calDays[i]
        }
    }

    document.getElementById("month-name").innerHTML = monNames[date.getMonth()] + " " + date.getFullYear()
}

function readEvents(date){
    $.getJSON("./_static/js/events.json", function(json) {
        const jsonData = json;

        for (let i = 0; i < jsonData.length; i++) {
            const event = jsonData[i];

            if (event.year == date.getFullYear() && event.month == date.getMonth() + 1) {
                const elem = document.createElement("button");
                elem.innerHTML = event.name;
                elem.style.backgroundColor = groupColors[event.group]
                elem.addEventListener('click', (func) => {
                    document.getElementById("event-banner").classList.remove("d-none");

                    document.getElementById("event-banner-name").innerHTML = event.name;
                    const dateStr = monNames[event.month - 1] + " " + event.day + ", " + event.year + " from " + event.start + " to " + event.end;
                    document.getElementById("event-banner-time").innerHTML = dateStr;
                    document.getElementById("event-banner-text").innerHTML = event.description;
                })

                const t = "r" + (Math.floor((event.day + date.getDay() - 1) / 7) + 1) + "c" + ((event.day + date.getDay() - 1) % 7 + 1);
                document.getElementById(t).appendChild(document.createElement("br"));
                document.getElementById(t).appendChild(elem);
            }
        }
    });

    
}

let date = new Date();
date.setDate(1);
createCalendar(date);
readEvents(date);

function prevMonth() {
    newMonth = date.getMonth() - 1;
    if (newMonth == -1){
        newMonth = 11;
        newYear = date.getFullYear() - 1;
    }
    else newYear = date.getFullYear();
    
    date.setFullYear(newYear);
    date.setMonth(newMonth);
    createCalendar(date);
    readEvents(date);
    document.getElementById("event-banner").classList.add("d-none");
}

function nextMonth() {
    newMonth = date.getMonth() + 1;
    if (newMonth == 12){
        newMonth = 0;
        newYear = date.getFullYear() + 1;
    }
    else newYear = date.getFullYear();
    
    date.setFullYear(newYear);
    date.setMonth(newMonth);
    createCalendar(date);
    readEvents(date);
    document.getElementById("event-banner").classList.add("d-none");
}