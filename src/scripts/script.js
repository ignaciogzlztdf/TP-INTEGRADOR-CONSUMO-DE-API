async function getAndShowData(){
  const RESPONSE = await fetch("https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados/");
  const DATA = await RESPONSE.json();
  console.log(DATA);
  // a loop that inserts the data of every employee in the table
  DATA.forEach(element => {
    document.getElementById('data').innerHTML+=`
      <tr>
        <td>${element.nombre} ${element.apellido}</td>
        <td>${element.area}</td>
        <td>${element.domicilio}</td>
        <td><button class="btn-employee-see" id="${element.id}">See Employee</button></td>
      </tr>
      `});
  // buttons to see employee
  let btns = document.querySelectorAll(".btn-employee-see");
  btns.forEach(item => {
  item.addEventListener('click', (e) => {
      seeEmployee(e.target.id);
      document.getElementById('bottom-page').scrollIntoView();
  });
  });
}

async function seeEmployee(id){
  const RESPONSE = await fetch("https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados/"+id);
  const EMPLOYEE_DATA = await RESPONSE.json();
  console.log(EMPLOYEE_DATA);

  // the clear button is created
  let containerBtnClear = document.getElementById("container-btn-clear");
  containerBtnClear.innerHTML = `<button id="btn-clear">Clear</button>`;

  // button to clear employee detailed view
  let btnClear = document.getElementById("btn-clear");
  btnClear.addEventListener("click", () => {
  let employeeSection = document.getElementById("employee-section");
  employeeSection.innerHTML = "";
  employeeSection.classList.remove("employee-view");
  containerBtnClear.innerHTML = "";
  });

  let employeeSection = document.getElementById("employee-section");

  // before showing the employee's info in the employee-section, I initialize it empty.
  // that means when you click the button the section is cleaned
  // and then the info of the employee you selected is showed
  // that's why you won't see the info of the employees stacked
  // just one at a time
  employeeSection.innerHTML = "";

  employeeSection.classList.add("employee-view");

  let fullName = document.createElement("h4");
  fullName.innerHTML = `${EMPLOYEE_DATA.nombre} ${EMPLOYEE_DATA.apellido}`;

  let photo = document.createElement("div");
  photo.innerHTML = `<img alt="The photo of an employee" src="${EMPLOYEE_DATA.foto}"></img>`;

  let area = document.createElement("h4");
  area.innerHTML = EMPLOYEE_DATA.area;

  let address = document.createElement("h4");
  address.innerHTML = EMPLOYEE_DATA.domicilio;

  employeeSection.appendChild(fullName);
  employeeSection.appendChild(photo);
  employeeSection.appendChild(area);
  employeeSection.appendChild(address);
}

async function modifyData() {
  const MY_DATA = {
    "nombre":"Ignacio",
    "apellido":"González",
    "area":"Programmer",
    "domicilio":"123 Ushuaia, Tierra del Fuego",
    "foto":"https://i.pinimg.com/236x/55/f1/52/55f152d495ed47303e87d52196757d7d.jpg",
    "id":"99"
  }
  const RESPONSE = await fetch("https://6398b453fe03352a94dbe15d.mockapi.io/api/empleados/"+MY_DATA.id, {
    method: "PUT",
    body:JSON.stringify(MY_DATA),
    headers:{"Content-type":"application/json"}
  });
  const DATA = await RESPONSE.json();
  console.log(DATA);
}
// button to go to top of the page
let btnToTop = document.getElementById("bottom-page");
btnToTop.addEventListener("click", () => {
  document.getElementById('top-page').scrollIntoView();
});

// I call the functions
getAndShowData();
modifyData();