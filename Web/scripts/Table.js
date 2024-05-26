    var SelectRowData = null;
    var IdSelectRow = '';
    //Api Запросы
    const id = sessionStorage.getItem("userID");
    const accessToken = sessionStorage.getItem("accessToken");
    console.log("AdminId", id);
    console.log('accessToken', accessToken)

    
    //вывод Имени Администратора
    const adminNameElement = document.getElementById('AdminName');
    adminNameElement.textContent = `${sessionStorage.getItem("userName")} ${sessionStorage.getItem("userSurname")}`;


    fetch('http://localhost:3000/order/getOrders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            return response.json(); 
          } 
        })
        .then(data => {
            addDataToTable(data);
        })
        .catch(error => {
          alert('Ошибка: ' + error.message);
        });

    function addDataToTable(data) {
        const tbody = document.getElementById('tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            // Изменения в соответствии с новой структурой данных
            const cell1 = document.createElement('td');
            cell1.textContent = item.id;
            row.appendChild(cell1);
            
            const cell2 = document.createElement('td');
            cell2.textContent = item.uesr.name + ' ' + item.uesr.surname + ' ' + item.uesr.patronymic;
            row.appendChild(cell2);
            
            const cell3 = document.createElement('td');
            cell3.textContent = translatteDate(item.createdAt);
            row.appendChild(cell3);
            
            const cell4 = document.createElement('td');
            cell4.textContent = item.phoneNumber;
            row.appendChild(cell4);

            const cell5 = document.createElement('td');
            cell5.textContent = item.uesr.login;
            row.appendChild(cell5);

            const cell6 = document.createElement('td');
            item.date === null ? cell6.textContent = "-" :  cell6.textContent = translatteDate(item.date);

            row.appendChild(cell6);

            const cell7 = document.createElement('td');
            if(item.status == 1 ){
                const text = "В обработке"
                cell7.textContent = text;
            }if(item.status == 2){
                const text = "Подтвержден"
                cell7.textContent = text;
            }else if(item.status == 3){
                const text = "Отклонен"
                cell7.textContent = text;
            }else if(item.status == 4){
                const text = "Завершен"
                cell7.textContent = text;
            }
            row.appendChild(cell7);
            
            tbody.appendChild(row);
            addListner()
        });
    }
    function translatteDate(date){
        const dateOnly = date.split('T')[0];  // Разбиваем строку по символу 'T' и берем первую часть (дату)
        const parts = dateOnly.split('-');  // Разбиваем дату по символу '-'
        const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;  // Форматируем дату в требуемый формат "дд мм гггг"
        return formattedDate
    }
    function addListner(){
        const rows = document.querySelectorAll("#tbody tr");
        let prevSelectedRow = null;
        const mass = []
        rows.forEach((row,index)=>{
            row.addEventListener('click', () => {
                IdSelectRow = row.children[0].textContent;
                var st = 1;
                if(row.children[6].textContent === "В обработке"){
                    st = 1
                }
                if(row.children[6].textContent === "Подтвержден"){
                    st = 2
                }
                if(row.children[6].textContent === "Отклонен"){
                    st = 3
                }
                if(row.children[6].textContent === "Завершен"){
                    st = 4
                }
                const item = {
                    FIO: row.children[1].textContent,
                    DateAppoint: row.children[2].textContent,
                    Phone: row.children[3].textContent,
                    Email: row.children[4].textContent,
                    dateOfAdmission: row.children[5].textContent,
                    status: st,
                }
                console.log("Выбранная заявка:", IdSelectRow)
                setPopUp(item)
                if (prevSelectedRow) {
                    prevSelectedRow.style.backgroundColor = ''; 
                }
                row.style.backgroundColor = '#cc8ddb';
                prevSelectedRow = row;
            });
            row.addEventListener('mouseover', () => {
                row.style.border = '2px solid #7A0099'; 
            });
        
            row.addEventListener('mouseout', () => {
                row.style.border = '1px solid black'; 
            });
        })
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
        console.log(item['dateOfAdmission'])
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
            console.log("IdSelectRow", IdSelectRow);
            const Data = {
                id: IdSelectRow
            }
            fetch('http://localhost:3000/order/deleteOrder', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${accessToken}`,
                },
                body: JSON.stringify(Data),
              })
                .then(response => {
                  if (response.status === 200) {
                    alert("Удаление прошло успешно")
                    window.location.reload();
                } 
                })
                .catch(error => {
                  alert('Ошибка: ' + error.message);
                });
            SelectRowData = null;
        }else{
            alert("Сначала выберите поле!");
        }
    }
    // Функция для сохранения измененных данных
    function saveData() {
        const updatedData = {
            // "FIO": document.getElementById('fioInput').value,
            "PhoneNumber": document.getElementById('phoneInput').value,
            // "Email": document.getElementById('emailInput').value,
            "status": document.getElementById('statusInput').value,
            // "DateAppoint": document.getElementById('DateAppointInput').value,
            "date": document.getElementById('dateOfAdmissionInput').value
        };
        fetch(`http://localhost:3000/order/updateOrder/${IdSelectRow}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${accessToken}`,
                },
                body: JSON.stringify(updatedData),
              })
                .then(response => {
                  if (response.status === 200) {
                    alert("Обновление прошло успешно")
                    window.location.reload();
                } 
                })
                .catch(error => {
                  alert('Ошибка: ' + error.message);
                });
        console.log('Обновленные данные:', updatedData);
        closePopUp();
    }

    // Вызываем функцию для добавления данных на страницу
    addDataToTable();

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