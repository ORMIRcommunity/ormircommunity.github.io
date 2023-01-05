const monDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const groupColors = {"ORMIR community":"GhostWhite", "SPECTRA":"LemonChiffon", "Knee":"Cyan", "Biomechanics":"LightSalmon", "Muscle":"LightPink"}

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