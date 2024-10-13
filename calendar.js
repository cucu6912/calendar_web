let display = document.querySelector('.display'),
    prveBtn = document.querySelector('.left'),
    nextBtn = document.querySelector('.right'),
    days = document.querySelector('.days'),
    selected = document.querySelector('.selected');

let dateToday = new Date();

// console.log(dateToday.getFullYear()); // 년
// console.log(dateToday.getMonth()+1); // 월
// console.log(dateToday.getDate()); // 일
// console.log(dateToday.getHours()); // 시
// console.log(dateToday.getMinutes()); // 분
// console.log(dateToday.getSeconds()); // 초
// console.log(dateToday.getDay()); // 요일 0 ~ 6

    let year = dateToday.getFullYear();
    let month = dateToday.getMonth();

function displayCalendar() {
    const firstDay = new Date(year,month,1); // 첫날
    const firstDayIndx = firstDay.getDay(); // 요일 월=1
    const lastDay = new Date(year,month+1,0); // 현월의 마지막 날
    const numberOfDays = lastDay.getDate(); // 31일
    // console.log(firstDay);
    // console.log(firstDayIndx);
    // console.log(lastDay);
    // console.log(numberOfDays);

    let formattedDate = dateToday.toLocaleString('en-US', {
        year : "numeric",
        month : "long",
        timeZone : "Asia/Seoul"
    })
    display.innerHTML = formattedDate;

    // 빈칸 출력
    for (let x = 1;x <= firstDayIndx; x++){
        let div = document.createElement('div');
        div.innerHTML += '';
        days.appendChild(div);
    }
    // 날짜 출력
    for (let i = 1;i<=numberOfDays;i++) {
        let div = document.createElement('div');
        let currenDate = new Date(year,month,i);
        // div.setAttribute('data-date',날짜);
        // div.dataset.date = 날짜;
        div.dataset.date = currenDate.toDateString();
        div.innerText += i;
        days.appendChild(div);
        // 오늘날짜 확인
        if (
            currenDate.getFullYear() === new Date().getFullYear() &&
            currenDate.getMonth() === new Date().getMonth() &&
            currenDate.getDate() === new Date().getDate()
        ) {
            div.classList.add('current-date');
        }
        
    }
}

displayCalendar();
displaySelected();

function displaySelected() {
    const daysEL = document.querySelectorAll('.days div');
    daysEL.forEach(day=>{
        day.addEventListener('click',(e)=> {
            const selectedDate = e.target.dataset.date;
            selected.innerText = `선택일 : ${selectedDate}`;
        })
    });
}

prveBtn.addEventListener('click',()=>{
    days.innerHTML = '';
    selected.innerHTML = '';
    if(month < 0) {
        month = 11;
        year = year -1;
    }
    month = month - 1;
    dateToday.setMonth(month);
    displayCalendar();
    displaySelected();
});

nextBtn.addEventListener('click',()=>{
    days.innerHTML = '';
    selected.innerHTML = '';
    if(month > 11) {
        month = 0;
        year = year + 1;
    }
    month = month + 1;
    dateToday.setMonth(month);
    displayCalendar();
    displaySelected();
});