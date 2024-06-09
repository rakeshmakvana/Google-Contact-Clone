let isEdit = false;
let index;


const getData = () => {

    const datas = JSON.parse(localStorage.getItem('users'));

    if (datas != null) {
        return datas;
    } else {
        return [];
    };

};


const data = getData();


const display = () => {

    const myData = getData();
    
    if (myData.length != 0) {
        
        myData.forEach(arr=> {

            dataList.innerHTML += `<td>${arr.id}</td><td>${arr.name}&nbsp;&nbsp;${arr.lastname}</td><td>${arr.email}</td><td>${arr.phone}</td><td><button class="btn fr-icn-2 pe-3 ps-4" onclick="return handleEdit(${arr.id})" type="button" data-bs-toggle="modal"
            data-bs-target="#exampleModal"><span class="material-symbols-outlined">edit</span></button><button class="btn fr-icn-2" onclick="return handleDelet(${arr.id})"><span class="material-symbols-outlined">delete</span></button></td>`;

        });

    } else {

        dataList.innerHTML += `<h4 class="p-3 text-danger">No Numbers Found !!</h4>`;

    };

};


display();


const formSubmit = () => {

    event.preventDefault();

    let fname = nm.value;
    let lname = surname.value;
    let uemail = gmail.value;
    let umobile = number.value;

    const users = getData();

    if (isEdit) {

        let obj = {
            id: index,
            name: fname,
            lastname: lname,
            email: uemail,
            phone: umobile
        };

        const updatedData = users.map((user) => {

            if (index == user.id) {
                return user = obj
            } else {
                return user
            };

        });

        isEdit = false;
        localStorage.setItem("users", JSON.stringify(updatedData));

    } else {

        let uid = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        let dataObje = {
            id: uid,
            name: fname,
            lastname: lname,
            email: uemail,
            phone: umobile
        }

        users.push(dataObje);

        localStorage.setItem("users", JSON.stringify(users));

    };

    dataList.innerHTML = '';
    display();

    nm.value = '';
    surname.value = '';
    gmail.value = '';
    number.value = '';

};


const clearData = () => {

    localStorage.removeItem('users');
    dataList.innerHTML = '';
    display();

};


const handleEdit = (id) => {

    const users = getData();

    const sigleRecord = users.filter((user) => {
        return id == user.id;
    });

    const record = sigleRecord[0];

    nm.value = record.name;
    surname.value = record.lastname;
    gmail.value = record.email;
    number.value = record.phone;

    isEdit = true;
    index = id;

};


const handleDelet = (id) => {

    const users = getData();

    const deletedData = users.filter((user) => {
        return id != user.id;
    })

    localStorage.setItem('users', JSON.stringify(deletedData));

    dataList.innerHTML = '';
    display();

}

