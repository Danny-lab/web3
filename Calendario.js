const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let currentMonth = 6; // Febrero
let currentYear = 2024;

const today = new Date();
const currentDay = today.getDate();
const currentMonthToday = today.getMonth();
const currentYearToday = today.getFullYear();

function getReservations() {
    const reservations = localStorage.getItem('reservations');
    return reservations ? JSON.parse(reservations) : {};
}

function saveReservations(reservations) {
    localStorage.setItem('reservations', JSON.stringify(reservations));
}

function updateCalendar() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("month-year");
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const reservations = getReservations();

    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    calendar.innerHTML = "";

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = day;

        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
        if (reservations[dateKey]) {
            dayElement.classList.add("reserved");
            dayElement.style.cursor = "not-allowed";
        } else {
            dayElement.addEventListener("click", () => {
                reservations[dateKey] = true;
                dayElement.classList.add("reserved");
                dayElement.style.cursor = "not-allowed";
                saveReservations(reservations);
            });
        }

        if (day === currentDay && currentMonth === currentMonthToday && currentYear === currentYearToday) {
            dayElement.classList.add("current-day");
        }

        calendar.appendChild(dayElement);
    }
}

document.getElementById("prev-month").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

updateCalendar();
