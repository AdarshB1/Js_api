var selectedRow = null

function onFormSubmit() {
    if (validate()) {                             //if validate true submit from
        var formData = readFormData();
        if (selectedRow == null)                  //create new record
            insertNewRecord(formData);
        else                                      //update record
            updateRecord(formData);
        resetForm();                              //empty form field
    }
}

// Read form
function readFormData() {
    var formData = {};
    formData["emp_id"] = document.getElementById("femp_id").value;
    formData["fullName"] = document.getElementById("fname").value;
    formData["age"] = document.getElementById("fage").value;
    formData["gender"] = document.getElementById("fgender").value;
    return formData;
}
// 
// After HTML form submission, create a 
// new record dynamically in HTML table with the following function

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.emp_id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.fullName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.age;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.gender;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

//Reset the HTML form with the following JavaScript function

function resetForm() {
    document.getElementById("femp_id").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("fage").value = "";
    document.getElementById("fgender").value = "";
    selectedRow = null;
}

//Handle edit operation for each row i
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("femp_id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("fname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("fage").value = selectedRow.cells[2].innerHTML;
    document.getElementById("fgender").value = selectedRow.cells[3].innerHTML;
}
//After edit operation, we need to show updated data 
function updateRecord(formData) {

    selectedRow.cells[0].innerHTML = formData.emp_id;
    selectedRow.cells[1].innerHTML = formData.fullName;
    selectedRow.cells[2].innerHTML = formData.age;
    selectedRow.cells[3].innerHTML = formData.gender;
}

//Handled delete operation
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function seterror(id, error) {
    element = document.getElementById(id);
    element.getElementsByClassName('nnnn')[0].innerHTML = error;
}

function validate() {
    isValid = true;
    //performing validation and if validation false return isvalid false
    // if (document.getElementById("fname").value == "") {
    //     isValid = false;
    //     document.getElementById("fullNameValidationError").classList.remove("hide");
    // } else {
    //     isValid = true;
    //     if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
    //         document.getElementById("fullNameValidationError").classList.add("hide");
    // }
    
    var nAge= document.forms['myForm']["fage"].value;
    
    //age validation
    if(nAge > 19 && nAge < 60){
        isValid=true;
    } else {
        document.getElementById('ageError').style.display="block";        
        isValid=false;
    }
    //user name is alpha
    var letters = /^[a-zA-Z]*$/;
    var name= document.forms['myForm']["fname"].value;
    if(!name.match(letters))
    {
        document.getElementById('nameError').style.display="block";
        isValid=false;
    }


    return isValid;
}