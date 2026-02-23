// CREATE AN ARRAY OF 5 EMPLOYEES
var employees = [
    { id: 1, name: "A", extension: 123, email: "a@example.com", department: "Engineering" },
    { id: 2, name: "B", extension: 234, email: "b@example.com", department: "Engineering" },
    { id: 3, name: "C", extension: 345, email: "c@example.com", department: "Administrative" },
    { id: 4, name: "D", extension: 456, email: "d@example.com", department: "Marketing" },
    { id: 5, name: "E", extension: 567, email: "e@example.com", department: "Sales" }
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
var storedEmployees = localStorage.getItem('employees');
if (storedEmployees) {
    employees = JSON.parse(storedEmployees);
}

// GET DOM ELEMENTS
var form = document.getElementById('addForm');
var empTable = document.getElementById('empTable');
var employeeCount = document.getElementById('empCount');
var count = employees.length;
employeeCount.value = count;

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
document.addEventListener("DOMContentLoaded", function () {
    buildGrid();
});

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    var s = e.target;
    var id = s.id.value;
    var name = s.name.value;
    var ext = s.extension.value;
    var email = s.email.value;
    var department = s.department.value;
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    var newEmployee = { id: id, name: name, extension: ext, email: email, department: department };
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);
    // BUILD THE GRID
    buildGrid();
    // RESET THE FORM
    form.reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    s.id.focus();
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (e.target.textContent === 'X') {
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROW USING THE .target PROPERTY
            var row = e.target.parentNode.parentNode;
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            var rowIndex = row.rowIndex;
            // REMOVE EMPLOYEE FROM ARRAY
            employees.splice(rowIndex - 1, 1);
            // BUILD THE GRID
            buildGrid();
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    var tbody = empTable.querySelector('tbody');
    if (tbody) {
        empTable.removeChild(tbody);
    }

    // REBUILD THE TBODY FROM SCRATCH
    var newTbody = document.createElement('tbody');

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (var emp of employees) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.extension}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td><button class="btn btn-danger btn-sm">X</button></td>
        `;
        newTbody.appendChild(row);
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(newTbody);

    // UPDATE EMPLOYEE COUNT
    empCount.value = employees.length;
    

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(employees));

};