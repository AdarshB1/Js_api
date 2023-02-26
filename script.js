//gloaba variable to check row is null or not if null create record else update record
var selectedRow = null;
//global array to store id because it will carry even after remove from local
let idArray = [];

function onFormSubmit() {
    if (validate()) {                             //if validate true submit from
        var formData = readFormData();
        if (selectedRow == null && verifyId())                  //create new record
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
    formData["gender"] = document.getElementById("gender").value;
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
    document.getElementById("gender").value = "";
    selectedRow = null;
}

//Handle edit operation for each row i
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("femp_id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("fname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("fage").value = selectedRow.cells[2].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[3].innerHTML;
}
//After edit operation, we need to show updated data 
function updateRecord(formData) {

    // selectedRow.cells[0].innerHTML = formData.emp_id;
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

//verify id not repeted
function verifyId(){
    let id= document.forms['myForm']["femp_id"].value;
    if(id<0){
        document.getElementById('posNO').style.display="block";
    } else if(idArray.some((val) => val == id)){
        document.getElementById('empError').style.display="block";
        return false;
    } else {
        idArray.push(id);
        document.getElementById('empError').style.display="none";
        document.getElementById('posNO').style.display="none";
        return true;
    }
}

function validate() {
    isValid = true;
    
    //age validation
    var nAge= document.forms['myForm']["fage"].value;
    if(nAge >= 19 && nAge <= 60){
        document.getElementById('ageError').style.display="none";
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
    } else {
        document.getElementById('nameError').style.display="none";
        
    }

    return isValid;
}