document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    // Переключение вкладок
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });

    // Элементы для вкладки 180 дней назад
const selectedDateInput = document.getElementById('selected-date');
const result180Days = document.getElementById('result-180-days');

selectedDateInput.addEventListener('change', () => {
    const selectedDate = new Date(selectedDateInput.value);
    if (!isNaN(selectedDate)) {
        selectedDate.setDate(selectedDate.getDate() - 180);

        // Форматирование даты в формате дд.мм.гггг
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const year = selectedDate.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;

        result180Days.textContent = `Результат: ${formattedDate}`;
    } else {
        result180Days.textContent = 'Результат: Неверная дата';
    }
});

    // Функционал калькулятора
    const dateContainer = document.getElementById('date-container');
    const addDateButton = document.getElementById('add-date');
    const calculateButton = document.getElementById('calculate');
    const resetButton = document.getElementById('reset');
    const totalDaysElement = document.getElementById('total-days');

    const createDateGroup = () => {
        const dateGroup = document.createElement('div');
        dateGroup.classList.add('date-group');

        dateGroup.innerHTML = `
            <label>Дата въезда:</label>
            <input type="date" class="entry-date">
            <label>Дата выезда:</label>
            <input type="date" class="exit-date">
            <span class="result-box">0</span>
            <button class="remove">Удалить</button>
        `;

        const entryDateInput = dateGroup.querySelector('.entry-date');
        const exitDateInput = dateGroup.querySelector('.exit-date');
        const resultBox = dateGroup.querySelector('.result-box');

        const calculateDays = () => {
            const entryDate = new Date(entryDateInput.value);
            const exitDate = new Date(exitDateInput.value);

            if (!isNaN(entryDate) && !isNaN(exitDate) && exitDate >= entryDate) {
                const days = Math.ceil((exitDate - entryDate) / (1000 * 60 * 60 * 24)) + 1;
                resultBox.textContent = days;
                calculateTotalDays();
            } else if (entryDate > exitDate) {
                resultBox.textContent = 'Ошибка';
            } else {
                resultBox.textContent = '0';
            }
        };

        entryDateInput.addEventListener('change', calculateDays);
        exitDateInput.addEventListener('change', calculateDays);

        dateGroup.querySelector('.remove').addEventListener('click', () => {
            dateContainer.removeChild(dateGroup);
            calculateTotalDays();
        });

        return dateGroup;
    };

    addDateButton.addEventListener('click', () => {
        const newGroup = createDateGroup();
        dateContainer.appendChild(newGroup);
    });

    const calculateTotalDays = () => {
        let totalDays = 0;

        const dateGroups = document.querySelectorAll('.date-group');
        dateGroups.forEach(group => {
            const resultBox = group.querySelector('.result-box');
            const days = parseInt(resultBox.textContent, 10);
            if (!isNaN(days)) {
                totalDays += days;
            }
        });

        totalDaysElement.textContent = totalDays;
    };

    calculateButton.addEventListener('click', calculateTotalDays);

    resetButton.addEventListener('click', () => {
        dateContainer.innerHTML = '';
        totalDaysElement.textContent = '0';
    });
});
