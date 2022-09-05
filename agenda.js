var id = 1;
var contacts = [
    {
        id: '0',
        name: "Alisson",
        phone: "19969692424"
    },
];

function loadTable(){
    document.getElementById('contacts-table').innerHTML = "<th id='table-title'>Nome</th><th>Telefone</th><th>Opções</th>";
    if(contacts.length == 0){
        document.getElementById('contacts-table').innerHTML += "<tr><td colspan='3'>Nenhum contato encontrado</td></tr>";
    } else{
        for(var i = 0; i < contacts.length; i++){
            document.getElementById('contacts-table').
            innerHTML += `<tr><td>${contacts[i].name}</td><td>${formatPhone(contacts[i].phone)}</td>
            <td><button class='buttons' id='thrash' onclick='removeContact(${contacts[i].id})'>
            <i class="fa-sharp fa-solid fa-trash"></i></button></td></tr>`
        }
    }
}

function activatePopUp(){
    document.getElementById('popup-section').style.display = 'block';
}

function deactivatePopUp(){
    document.getElementById('popup-section').style.display = 'none';
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-phone').value = '';
    document.getElementById('error-report').innerText = '';

}

function addContact(){
    var name = document.getElementById('contact-name');
    var phone = document.getElementById('contact-phone');

    if(name.value.length == 0 || phone.value.length != 11){
        document.getElementById('error-report').innerText = 'Preencha os campos corretamente!';
    } else{
        contacts.push({"id": `${id}`, "name": name.value, "phone": phone.value});
        alfphabeticalOrder();
        loadTable();
        id++;
        deactivatePopUp();
    }
}

function removeContact(id){
    contacts.splice(id, 1);
    alfphabeticalOrder()
    loadTable();
}

function searchContact(){
    search = document.getElementById('search-input');
    table = document.getElementById('contacts-table');
    table.innerHTML = "<th id='table-title'>Nome</th><th>Telefone</th><th>Opções</th>"
    if(search.value.length == 0){
        loadTable();
    }else {
        var contactPos = contacts.map(function(contacts) {return contacts.name}).indexOf(search.value);
        if(contactPos != -1){
            table.innerHTML += `<tr><td>${contacts[contactPos].name}</td><td>${formatPhone(contacts[contactPos].phone)}</td>
            <td><button class='buttons' id='thrash' onclick='removeContact(${contacts[contactPos].id})'><i class="fa-sharp fa-solid fa-trash"></i></button></td></tr>`
        } else{
            table.innerHTML += "<tr><td colspan='3'>Nenhum contato encontrado</td></tr>";
        }
    }
}

function formatPhone(phone){
    var formatedPhone;
    var j = 0;
    for(var i = 0; i < 15; i++){
        if(i == 0)
            formatedPhone = '(';
        else if(i == 3){
            formatedPhone += ')';
            formatedPhone += ' ';
            i++;
        } else if(i == 10)
            formatedPhone += '-';
        else{
            formatedPhone += phone[j];
            j++;
        }
    }
    return formatedPhone;
}

function alfphabeticalOrder(){
    contacts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    for(var i = 0; i < contacts.length; i++){
        contacts[i].id = i;
    }
}