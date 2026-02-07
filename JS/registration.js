
/******************
    NAV + MODAL
******************/

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function openEditProfile() {
  openModal('editProfileModal');
}

/******************
   LOGIN STATUS
******************/
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  const loginBtn = document.getElementById("loginBtn");
  const adminLoginBtn = document.getElementById("AdminloginBtn");
  const signupBtn = document.getElementById("signupBtn");

  const dashboardBtn = document.getElementById("dashboardBtn"); // Student
  const adminDashboardBtn = document.getElementById("Admin_dashboardBtn"); // Admin
  const logoutBtn = document.getElementById("logoutBtn");

  // 🔴 Hide all
  [loginBtn, adminLoginBtn, signupBtn, dashboardBtn, adminDashboardBtn, logoutBtn]
    .forEach(el => el && (el.style.display = "none"));

  // 🔵 Not logged in
  if (!isLoggedIn) {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (adminLoginBtn) adminLoginBtn.style.display = "inline-block";
    if (signupBtn) signupBtn.style.display = "inline-block";
    return;
  }

  // 🟢 Logged in
  if (logoutBtn) logoutBtn.style.display = "inline-block";

  if (role === "STUDENT") {
    if (dashboardBtn) dashboardBtn.style.display = "inline-block";
  }

  if (role === "ADMIN") {
    if (adminDashboardBtn) adminDashboardBtn.style.display = "inline-block";
  }
}


function setLoggedIn() {
  localStorage.setItem("isLoggedIn", "true");
  checkLoginStatus();
}

function handleLogout() {
  localStorage.clear();
  checkLoginStatus();
  alert("You have been logged out.");
  window.location.href = "index.html";
}

/******************
   PAGE LOAD
******************/
window.onload = function () {
  checkLoginStatus();

  // Dashboard load
  if (window.location.pathname.includes("Dashboard.html")) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/HTML/Login.html";
      return;
    }
    // Welcome name
    document.getElementById("usernameDisplay").innerText =
      "Welcome, " + user.username + "!";

    // Details
    document.getElementById("username").innerText = user.username;
    document.getElementById("email").innerText = user.email;
    document.getElementById("mobile").innerText = user.mobileNumber;
    document.getElementById("batch").innerText = user.batchCode || "N/A";
      document.getElementById("batchCode").innerText = user.batchCode || "N/A";
    document.getElementById("batchTiming").innerText = user.timing || "N/A";
    document.getElementById("Amount").innerText = user.fee || "N/A";


    // console.log(user);


  }
};



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

function closeform() {
  const container = document.getElementById("paymentContenair");
  container.style.display = "none";
  container.innerHTML = "";   // purana form clear

  const EditProfile = document.getElementById("editProfileModal");
  EditProfile.style.display = "none";
  EditProfile.innerHTML = ""; 
  
  const viewFullSchedule = document.getElementById("viewFullSchedule");
  viewFullSchedule.style.display = "none";
  viewFullSchedule.innerHTML = "";

    const Resources = document.getElementById("Resources");
  Resources.style.display = "none";
  Resources.innerHTML = "";
}


let selectedFee = 0;

async function openpaymentfrom() {

  
   
  const container = document.getElementById("paymentContenair");
  container.style.display = "flex";
   
   container.innerHTML = `
   <div class="pay_container">
  <div class="container_Payment">
    <div class="header_Payment">
      <h1>Complete Your Payment</h1>
      <p>Select Batch & Pay Now</p>
    </div>
     <span class="close-btn" onclick="closeform()">&times;</span>


    <div class="Payment_form-content">
      <form id="paymentForm">

        <label>Payment Method</label>
        <select disabled>
          <option>UPI</option>
          <option>Credit / Debit Card</option>
          <option>Net Banking</option>
          <option>Wallets</option>
        </select>

        <label>Select Batch</label>
        <select id="batchSelect" required>
          <option value="">-- Select Batch --</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="A3">A3</option>
          <option value="A4">A4</option>
        </select>

        <button type="submit" class="pay-btn" id="payButton">
          Pay Now
        </button>

      </form>

      <div class="info">
        Secure payment • SSL Encrypted
      </div>
    </div>
  </div>
  </div>
  `;

  


  // batch change
  document.getElementById("batchSelect")
    .addEventListener("change", loadBatchFee);

  // form submit
  document.getElementById("paymentForm")
    .addEventListener("submit", handlePayment);
}
// 🔹 Batch Fee Load
async function loadBatchFee() {

  const batchCode = document.getElementById("batchSelect").value;
  if (!batchCode) return;

  const res = await fetch(
    `http://localhost:8080/batchApi/${batchCode}/fee`
  );
  selectedFee = parseInt(await res.text());

  document.getElementById("Amount").innerText = selectedFee; // not use
  document.querySelector(".pay-btn").innerText =
    `Pay ₹${selectedFee} Now`;
}



// 🔹 Payment Flow
async function handlePayment(e) {
  e.preventDefault();
    const batchCode = document.getElementById("batchSelect").value;
  const studentId = localStorage.getItem("studentId");

  if (!studentId) {
    alert("Please login again");
    return;
  }

  if (selectedFee <= 0) {
    alert("Please select batch first");
    return;
  }

  // 1️⃣ Create order
  const orderResponse = await fetch(
    "http://localhost:8080/api/payments/create-order",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: selectedFee })
    }
  );

  const order = await orderResponse.json();

  // 2️⃣ Razorpay
  const options = {
    key: "rzp_test_SA1Y2HXyFwaozZ",
    amount: order.amount,
    currency: "INR",
    name: "Aditi Study Center",
    description: "Batch Fees",
    order_id: order.id,

      handler: async function () {

      // 3️⃣ Save Payment in DB
      await fetch("http://localhost:8080/api/payment/make-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          studentId: studentId,
          batchCode: batchCode,
          paymentMode: "RAZORPAY"
        })
      });

      alert("Payment Successful 🎉");
    }
  };

  new Razorpay(options).open();

}

function showUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;
      document.getElementById("usernameDisplay").innerText =
    "Welcome, " + user.username + "!";

    // Details
    document.getElementById("username").innerText = user.username;
    document.getElementById("email").innerText = user.email;
    document.getElementById("mobile").innerText = user.mobileNumber;
     document.getElementById("batch").innerText = user.batchCode || "N/A";
      document.getElementById("batchCode").innerText = user.batchCode || "N/A";
    document.getElementById("batchTiming").innerText = user.timing || "N/A";
    document.getElementById("Amount").innerText = user.fee || "N/A";
}


// showUserProfile();
function openEditProfile(e) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    alert("User not found. Please login again.");
    return;
  }

  const EditProfile = document.getElementById("editProfileModal");
  EditProfile.style.display = "flex";

  EditProfile.innerHTML = `
  <div class="EditProfile-modal">
    <form class="edit-profile-form" id="editProfileForm">
      <span class="close-btn" onclick="closeform()">&times;</span>
      <h2 class="form-title">Edit Profile</h2>

      <div class="form-group">
        <label>Name</label>
        <input class="form-input" id="editUsername" value="${user.username || ""}" required>
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" id="editEmail" class="form-input"
               value="${user.email || ""}" required>
      </div>

      <div class="form-group">
        <label>Mobile</label>
        <input type="tel" id="editMobile" class="form-input"
               value="${user.mobileNumber || ""}" pattern="[0-9]{10}" required>
      </div>

      <div class="form-group">
        <label>Batch Code</label>
        <select class="form-select" id="editBatch">
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="A3">A3</option>
          <option value="A4">A4</option>
        </select>
      </div>

      <button type="submit" class="btn-submit">Update Profile</button>
    </form>
    </div>
  `;

  document.getElementById("editBatch").value = user.batchCode || "";

  const form = document.getElementById("editProfileForm");

  form.onsubmit = function (e) {
    e.preventDefault();

    const editFormData = {
      username: document.getElementById('editUsername').value,
      email: document.getElementById('editEmail').value,
      mobileNumber: document.getElementById('editMobile').value,
      batchCode: document.getElementById('editBatch').value
    };

    fetch(`http://localhost:8080/api/users/studentsUpdate/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editFormData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Profile update failed");
        return res.json();
      })
      .then(updatedUser => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        showUserProfile();
        closeform();
        alert("Profile updated successfully ✅");
      })
      .catch(err => alert(err.message));
  };
// });


}


   function openSchedule() {

  const BatchSchedule = document.getElementById('viewFullSchedule');
  BatchSchedule.style.display = 'block';

  fetch("http://localhost:8080/batchApi/batches/schedule")
    .then(res => res.json())
    .then(data => {

      let rows = "";

      data.forEach(batch => {
        rows += `
          <tr>
            <td>${batch.batchCode}</td>
            <td>${batch.timing}</td>
          </tr>
        `;
      });

      BatchSchedule.innerHTML = `
        <div id="batchModal" class="modal">
          <div class="modal-content">
            <span class="modal-close" onclick="closeform()">&times;</span>
            <h3>Batch Codes & Timings</h3>
            <table>
              ${rows}
            </table>
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      alert("Schedule not available");
    });
}


function openAllResources() {
  
   const Resources = document.getElementById('Resources');
  Resources.style.display = 'block';
    fetch("http://localhost:8080/batchApi/batches/schedule")
    .then(res => res.json())
    .then(data => {

      let rows = "";

      data.forEach(batch => {
        rows += `
          <tr>
            <td>${batch.studeymaterial}</td>
            <td>${batch.studeymaterial}</td>
          </tr>
        `;
      });

      Resources.innerHTML = `
        <div id="batchModal" class="modal">
          <div class="modal-content">
            <span class="modal-close" onclick="closeform()">&times;</span>
            <h3>Study Resources</h3>
            <table>
              ${rows}
            </table>
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      alert("Study Resources ");
    });

}


function openPaymentHistory() {
  
   const Resources = document.getElementById('paymentContenair');
  Resources.style.display = 'block';
    fetch("http://localhost:8080/batchApi/batches/schedule")
    .then(res => res.json())
    .then(data => {

      let rows = "";

      data.forEach(batch => {
        rows += `
          <tr>
            <td>${batch.studeymaterial}</td>
            <td>${batch.studeymaterial}</td>
          </tr>
        `;
      });

      Resources.innerHTML = `
        <div id="batchModal" class="modal">
          <div class="modal-content">
            <span class="modal-close" onclick="closeform()">&times;</span>
            <h3>Payment History </h3>
            <table>
              ${rows}
            </table>
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      alert("Study Resources ");
    });

}


