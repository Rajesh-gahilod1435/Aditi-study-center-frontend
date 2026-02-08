


// 🔐 Admin Access Protection
const role = localStorage.getItem("role");
const token = localStorage.getItem("token");

if (!token || role !== "ADMIN") {
  alert("Unauthorized Access! Please login as Admin.");
  window.location.href = "../index.html"; // login / home page
}
 


 function openForm() {
  document.getElementById("addFroms").style.display = "block";

  document.getElementById("addFroms").innerHTML = `
   <div class="BatchUpdate-contenair">
    <h2>Batch Update</h2> 
     
    <form id="myForm" class="batch-form">
      
      <div class="form-group">
            <label for="batchCode">Batch Code</label>
            <select id="batchCode" name="batchCode">
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="A3">A3</option>
              <option value="A4">A4</option>
            </select>
          </div>
      

      <div class="form-group">
        <label for="timing">Batch Timing</label>
        <textarea id="timing" rows="4" required>
Monday - Saturday: 08:00 AM - 02:00 PM
Sunday: 08:00 AM - 01:00 PM
        </textarea>
      </div>

      <div class="form-group">
        <label for="fee">Fees</label>
        <input type="number" id="fee" min="0" required />
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn btn-submit">Update</button>
        <button type="button" class="btn btn-close" onclick="closeForm()">Close</button>
      </div>
    </form>
    </div>
  `;

  document.getElementById("myForm").addEventListener("submit", updateBatch);
}
      
function updateBatch(e) {
  e.preventDefault();

  const formData = {
    batchCode: document.getElementById("batchCode").value,
    // status: document.getElementById("status").value,
    timing: document.getElementById("timing").value.trim(),
    fee: document.getElementById("fee").value
  };

  fetch("http://localhost:8080/batchApi/updateBatch", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => {
      if (!res.ok) throw new Error("Update failed");
      return res.text();
    })
    .then(msg => {
      alert(msg);
      closeForm();
    })
    .catch(err => alert(err.message));
}

        function closeForm() {
          const closebtn= document.getElementById("addFroms");
            closebtn.style.display = "none";    
           closebtn.innerHTML = "";
            
        
        }

// new page add new js file



fetch("http://localhost:8080/adminApi/totalFee")
  .then(res => res.json())
  .then(count => {
     document.getElementById("fees").innerText = `₹ ${count}`;
  });
 

            fetch("http://localhost:8080/adminApi/studentCount")
  .then(res => res.json())
  .then(count => {
     document.getElementById("studentCount").innerText = count;
  });


  fetch("http://localhost:8080/api/users/getAllStudents")
                .then(response => {

                    // 204 No Content handle
                    if (response.status === 204) {
                        alert("No students found");
                        return [];
                    }

                    if (!response.ok) {
                        throw new Error("Failed to fetch students");
                    }

                    return response.json();
                })
                .then(students => {

                    const tbody = document.querySelector("#studentTable tbody");
                    tbody.innerHTML = "";

                    students.forEach(student => {
                        const row = `
                         <table id="studentTable" >
    
                        <tbody id="tableBody">
                    <tr>
                        <td>${student.idNumber}</td>
                        <td>${student.username}</td>
                        <td>${student.batchCode}</td>
                        <td>${student.mobileNumber}</td>
                        <td>${student.fee}</td>
                        <td><button class="btn btn-outline">View</button></td>
                    </tr>
                      </tbody>
                </table>
                `;
                        tbody.innerHTML += row;
                    });
                })
                .catch(error => {
                    console.error(error);
                    alert("Error while loading students");
                });


                 fetch("http://localhost:8080/batchApi/getAllBatches")
                .then(response => {
                    if (response.status === 204) {
                        alert("No Batch found");
                        return [];
                    }
                    if (!response.ok) {
                        throw new Error("Failed to fetch batch");
                    }
                    return response.json();
                }).then(batches => {
                    const tbody = document.querySelector("#BatchTable tbody");
                    tbody.innerHTML = "";

                    batches.forEach(batch => {
                        const row = `
                    <tr>
                        <td>${batch.id}</td>
                        <td>${batch.batchCode}</td>
                        <td>${batch.timing}</td>
                        <td>${batch.fee}</td>
                        <td>Active</td>

                    </tr>
                `;
                        tbody.innerHTML += row;
                    });
                })

  fetch("http://localhost:8080/batchApi/Batchcount")
  .then(res =>res.json())
  .then(count => {
        document.getElementById("batchCount").innerText = count;
  });






    
        
/******************/
// Mobile Menu Toggle
/******************/
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('navMenu');

if (mobileMenu && navMenu) {
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    console.log("dj");

  });

  // Close menu when any link is clicked (on mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  });
}


   let currentSort = { column: -1, direction: 1 }; // direction: 1 = asc, -1 = desc

        // Sort when dropdown changes
        function sortTable() {
            const selectValue = document.getElementById("sortSelect").value;
            if (selectValue === "none") return;

            let colIndex, isAsc;

            if (selectValue.startsWith("id-")) {
                colIndex = 0;
                isAsc = selectValue === "id-asc";
            } else if (selectValue.startsWith("name-")) {
                colIndex = 1;
                isAsc = selectValue === "name-az";
            } else if (selectValue.startsWith("batch-")) {
                colIndex = 8;
                isAsc = selectValue === "batch-az";
            }

            performSort(colIndex, isAsc ? 1 : -1);
        }

        // Sort when header clicked
        function sortByColumn(colIndex) {
            if (currentSort.column === colIndex) {
                currentSort.direction *= -1; // toggle direction
            } else {
                currentSort.column = colIndex;
                currentSort.direction = 1; // new column → start ascending
            }

            performSort(currentSort.column, currentSort.direction);

            // Sync dropdown
            updateDropdown();
        }

        // Actual sorting logic
        function performSort(colIndex, direction) {
            const tbody = document.getElementById("tableBody");
            const rows = Array.from(tbody.rows);

            rows.sort((a, b) => {
                let valA = a.cells[colIndex].textContent.trim();
                let valB = b.cells[colIndex].textContent.trim();

                // Numeric sort for ID
                if (colIndex === 0) {
                    valA = parseInt(valA) || 0;
                    valB = parseInt(valB) || 0;
                    return direction * (valA - valB);
                }
                // Alphabetical for others
                else {
                    valA = valA.toUpperCase();
                    valB = valB.toUpperCase();
                    return direction * valA.localeCompare(valB);
                }
            });

            tbody.innerHTML = "";
            rows.forEach(row => tbody.appendChild(row));
        }

        // Sync dropdown with current sort state
        function updateDropdown() {
            const select = document.getElementById("sortSelect");

            if (currentSort.column === 0) {
                select.value = currentSort.direction === 1 ? "id-asc" : "id-desc";
            } else if (currentSort.column === 1) {
                select.value = currentSort.direction === 1 ? "name-az" : "name-za";
            } else if (currentSort.column === 3) {
                select.value = currentSort.direction === 1 ? "batch-az" : "batch-za";
            } else {
                select.value = "none";
            }
        }





function handleLogout() {
  localStorage.clear();
//   checkLoginStatus();
  alert("You have been logged out.");
  window.location.href = "../index.html";
}



function studyMaterial() {
     document.getElementById("addFroms").style.display = "block";
    document.getElementById("addFroms").innerHTML = `
    <div class="studyMaterial-contenair ">
     <span class="close-From" onclick="closeForm()">&times; </span>
    <h2>Upload Study Material</h2>
   
    <form id="uploadForm" enctype="multipart/form-data">
  <label>Subject</label>
  <input type="text" name="subject" required />

  <label>Uploaded By</label>
  <input type="text" name="uploadedBy" required />

  <label>Select PDF</label>
  <input type="file" name="file" accept=".pdf,.jpg,.jpeg,.png"required />

  <button type="submit">Upload</button>
</form>
</div>
    `;
    document.getElementById("addFroms").classList.remove("hide");
    
}

function addSpecialEvent() {
     document.getElementById("addFroms").style.display = "block";
    document.getElementById("addFroms").innerHTML = `
    <div class="studyMaterial-contenair ">
    <span class="close-From" onclick="closeForm()">&times; </span>
    <h2>Add Special Event</h2>
    <form id="eventForm">
  <label>Event Name</label>
  <input type="text" name="eventName" required />

  <label>Uploaded By</label>
  <input type="text" name="uploadedBy" required />

  <label>Select PDF</label>
  <input type="file" name="file" accept=".pdf,.jpg,.jpeg,.png"required />

  <button type="submit">Upload</button>
</form>
</div>   `;
    document.getElementById("addFroms").classList.remove("hide");

}

function AddStudent() {
    alert("Add Student From Registration Page. Go to Home Page");
}