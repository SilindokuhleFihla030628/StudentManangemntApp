// UPDATED
const firstName = document.getElementById("name")
const surname = document.getElementById("surname")
const marks = document.getElementById("marks")
const submit = document.getElementById("submit-button")
const bubbleSortButton = document.getElementById("bubblesort-button")
const students = JSON.parse(localStorage.getItem('students')) ||[];
const canva = document.getElementById("PieChart");
const chartbutton= document.getElementById("igrafu");

document.addEventListener('DOMContentLoaded', updateTable)

bubbleSortButton.addEventListener("click", () => {
 bubbleSort();
 updateTable()
});

 

// ADD A STUDENT 
function addStudent() {
     if(firstName.value.trim()===''||surname.value.trim()===''||marks.value.trim()===''){
        return;
    }
    const student= {
        firstName:firstName.value,
        surname: surname.value,
        marks: parseFloat(marks.value),
    };
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    document.getElementById("form").reset();
    
    updateTable();
    }

    submit.addEventListener("click", addStudent);

    function bubbleSort() {
        const sort = students.length;
        for (let i = 0; i < sort - 1; i++) {
            for (let k = 0; k < sort - i - 1; k++) {
                if (parseFloat(students[k].marks) > parseFloat(students[k + 1].marks)) {
                    let temp = students[k];
                    students[k] = students[k + 1];
                    students[k + 1] = temp;
                }
            }
        }        
    }

    function percMarks(marks){
        return marks + '%';
    }

    function updateTable() {
        const table = document.getElementById('studentTable');
    
       
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
    
        students.forEach((student, index) => {
            const row = table.insertRow(-1);
    
            
            row.insertCell(0).textContent = student.firstName;
            row.insertCell(1).textContent = student.surname;
            row.insertCell(2).textContent = percMarks(student.marks);
    
           
            const actionCell = row.insertCell(3);
            const deleteButton = createActionButton('Delete', () => deleteData(index));
            deleteButton.style.borderRadius = '10px';
            deleteButton.style.backgroundColor = 'red';
            const editButton = createActionButton('Edit', () => editData(index));
            editButton.style.borderRadius = '10px';
            editButton.style.backgroundColor = 'blue';
    
            actionCell.appendChild(deleteButton);
            actionCell.appendChild(editButton);
        });
    }
    
    
    function createActionButton(text, action) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', action);
        return button;
    }

    function editData(index) {
        const student = students[index];
    
        
        const firstNameInput = createInputField(student.firstName);
        const surnameInput = createInputField(student.surname);
        const marksInput = createInputField(student.marks);
    
       
        const table = document.getElementById('studentTable');
        const row = table.rows[index + 1];
      
        row.cells[0].innerHTML = '';
        row.cells[0].appendChild(firstNameInput);
        row.cells[1].innerHTML = '';
        row.cells[1].appendChild(surnameInput);
        row.cells[2].innerHTML = '';
        row.cells[2].appendChild(marksInput);
        
        localStorage.setItem('students', JSON.stringify(students));
        const actionCell = row.cells[3];
        actionCell.innerHTML = '';
        const saveButton = createActionButton('Save', () => saveData(index, firstNameInput, surnameInput, marksInput));
        actionCell.appendChild(saveButton);
    }
    
    function createInputField(value) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        return input;
    }
    
    function saveData(index, firstNameInput, surnameInput, marksInput) {
        
        students[index].firstName = firstNameInput.value;
        students[index].surname = surnameInput.value;
        students[index].marks = marksInput.value;
       
        
        localStorage.setItem('students', JSON.stringify(students));
        
        updateTable();
    } 
    function deleteData(index){
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));

        updateTable()
    }
function searchStudent(){

    const input = document.getElementById("search")
    const table = document.getElementById("studentTable")
    const filter = input.value.toUpperCase();
    const tr = table.getElementsByTagName("tr")

    for (i=1; i < tr.length; i++){
        const tdName = tr[i].getElementsByTagName("td")[0];
        const tdSurname =tr[i].getElementsByTagName("td")[1];
        if (tdName || tdSurname){
            const txtValueName =tdName.textContent || tdName.innerText;
            const txtValueSurname = tdSurname.textContent || tdSurname.innerText;

            if (txtValueName.toUpperCase().indexOf(filter)> -1 || txtValueSurname.toUpperCase().indexOf(filter)> -1){
                tr[i].style.display ="";
            } else {
                tr[i].style.display = "none";
            }
        }
    } 
}

function revealChart(){
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    const ranges =[0,0,0,0];

    storedStudents.forEach(student => {
        if(student.marks <=24) {
            ranges[0]++;
    }else if(student.marks <=50) {
           ranges[1]++;
    }else if(student.marks <=74) {
          ranges[2]++;
     }else if(student.marks >=75) {
           ranges[3]++;
     }

    });

    new Chart("PieChart", {
        type: "pie",
        data:{
            labels:["0-24%","25-50%","51-74%","75%+"],
            datasets:[{
                backgroundColor:["red","blue","aqua","purple"],
                data:ranges
            }]
        },
        options:{
            title: {
                display:true,
                text:"Student PieChart"
            }
        }
    });
    canva.style.display='block';

}
 chartbutton.addEventListener('click',revealChart);