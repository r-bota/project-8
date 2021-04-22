let emplpoyeeDiv = document.getElementById("employees");
let modalOverlay = document.getElementById("modal");
let overlay = document.getElementById("overlay");
const fetchURL = "https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US";
let employee = null;
let closeButton = null;
let modalHTML = null;

async function fetchEmployee() {
    let response = await fetch(fetchURL);
    if (response.status === 200) {
        return await response.json()
    }
}

async function addEmployee() {
    employee = await fetchEmployee();
    emp = employee.results;
    let empHTML = ``;
    emp.forEach((emp, index) => {
        let newEmpHTML = `
        <div class="employees-div" data-index="${index}">
        <img src="${emp.picture.medium}">
        <div class="wrap">
        <h3 class="name">${emp.name.first} ${emp.name.last}</h3>
        <p class="email">${emp.email}<p>
        <p class="city">${emp.location.city}</p>
        </div>
        </div>
        `;
        empHTML += newEmpHTML;
        index++;
    })
    emplpoyeeDiv.innerHTML = empHTML;
}

addEmployee();

emplpoyeeDiv.addEventListener("click", e => {
    if (e.target !== emplpoyeeDiv) {
        const div = e.target.closest(".employees-div");
        const indexD = div.getAttribute("data-index")
        modalCreate(indexD)
    }
})

function modalCreate(indexD) {

    modalHTML = `
    <div class="modal-box">
    <button id="modal-close">X</button>
    <img src="${emp[indexD].picture.large}">
    <h3>${emp[indexD].name.first} ${emp[indexD].name.last}</h3>
    <p>${emp[indexD].email}</p>
    <p>${emp[indexD].location.city}</p>
    <hr />
    <p>${emp[indexD].phone}</p>
    <p>${emp[indexD].location.street.number} ${emp[indexD].location.street.name}, ${emp[indexD].location.state} ${emp[indexD].location.postcode}</p>

    `;
    displayModal()
    closeModalListener()
}

function displayModal() { 
    overlay.style.zIndex = "3";
    overlay.style.display = "block";
    modalOverlay.innerHTML = modalHTML;
    closeButton = document.getElementById("modal-close")
}

function closeModalListener() {
    document.addEventListener("click", e => {
        if (e.target.id === "modal-close" || e.target.id === "overlay") {
            modalOverlay.innerHTML = `<div id="modal"></div>`;
        overlay.style.zIndex = "0";
        overlay.style.display = "none";
        }
    })
}

