    var SelectRowData = null;
    const data = [
        {
            Id: 1,
            FIO: 'Иванов Иван Иванович',
            DateAppoint: "07.10.2003",
            Phone: '123-456-7890',
            Email: 'ivanov@example.com',
            dateOfAdmission: "28.05.2024",
            status: 'В обработке'
        },
        {
            Id: 2,
            FIO: 'Петрова Мария Сергеевна',
            DateAppoint: "07.05.2024",
            Phone: '987-654-3210',
            Email: 'petrova@example.com',
            dateOfAdmission: "29.05.2024",
            status: 'Завершен'
        }
    ];

    // Функция для добавления данных на страницу
    function addDataToTable() {
        const tbody = document.getElementById('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            for (const key in item) {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            }
            row.addEventListener('click', () => {
                setPopUp(item);
            });
            tbody.appendChild(row);
        });
    }

    function showPopUp(){
        const checkValue = document.getElementById('fioInput').value;
        if( checkValue.length > 0 ){
            document.querySelector('.popUp').style.display = 'block';
        }else{
            alert("Сначала выберите поле!");
        }
    }
    function closePopUp(){
        document.querySelector('.popUp').style.display = 'none';
    }
    function setPopUp(item) {
        document.getElementById('fioInput').value = item['FIO'];
        document.getElementById('phoneInput').value = item['Phone'];
        document.getElementById('emailInput').value = item['Email'];
        document.getElementById('statusInput').value = item['status'];
        document.getElementById('DateAppointInput').value = item['DateAppoint'];
        document.getElementById('dateOfAdmissionInput').value = item['dateOfAdmission'];
        SelectRowData = {
            "FIO": item['FIO'],
            "Phone":item['Phone'],
            "Email": item['Email'],
            "status": item['status'],
            "DateAppoint": item['DateAppoint'],
            "dateOfAdmission": item['dateOfAdmission'],
        };
    }
    function DeleteRowAppoint(){
        if(SelectRowData != null){
            console.log("SelectRowData", SelectRowData);
            SelectRowData = null;
        }else{
            alert("Сначала выберите поле!");
        }
    }
    // Функция для сохранения измененных данных
    function saveData() {
        const updatedData = {
            "FIO": document.getElementById('fioInput').value,
            "Phone": document.getElementById('phoneInput').value,
            "Email": document.getElementById('emailInput').value,
            "status": document.getElementById('statusInput').value,
            "DateAppoint": document.getElementById('DateAppointInput').value,
            "dateOfAdmission": document.getElementById('dateOfAdmissionInput').value
        };
        console.log('Обновленные данные:', updatedData);
        closePopUp();
    }

    // Вызываем функцию для добавления данных на страницу
    addDataToTable();

const rows = document.querySelectorAll('#tbody tr');
let prevSelectedRow = null;
rows.forEach((row, index) => {
    row.addEventListener('mouseover', () => {
        row.style.border = '2px solid #7A0099'; 
    });

    row.addEventListener('mouseout', () => {
        row.style.border = '1px solid black'; 
    });

    row.addEventListener('click', () => {
        if (prevSelectedRow) {
            prevSelectedRow.style.backgroundColor = ''; 
        }
        row.style.backgroundColor = '#cc8ddb';
        // const rowNum = index + 1; 
        // console.log('Номер выделенной строки:', rowNum);
        prevSelectedRow = row;
    });
});


    // Add this function to your JS code
    function searchTable() {
        let input = document.querySelector("#search__input");
        let filter = input.value.toUpperCase();
        let rows = document.querySelectorAll('#tbody tr');
        
        for (let i = 0; i < rows.length; i++) {
            let td = rows[i].getElementsByTagName('td');
            let matched = false;
            
            for (let j = 0; j < td.length; j++) {
                let cell = td[j];
                if (cell) {
                    if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        matched = true;
                        break;
                    }
                }
            }
            
            if (matched) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }

    // Add an event listener to your search input field
    document.querySelector("#search__input").addEventListener('keyup', searchTable);


    //Api Запросы
    const id = sessionStorage.getItem("userID");
    const accessToken = sessionStorage.getItem("accessToken");
    console.log("AdminId", id);
    console.log('accessToken', accessToken)

    
    //вывод Имени Администратора
    const adminNameElement = document.getElementById('AdminName');
    adminNameElement.textContent = `${sessionStorage.getItem("userName")} ${sessionStorage.getItem("userSurname")}`;
