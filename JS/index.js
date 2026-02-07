
// Optional: Focus footer
document.getElementById('contact-link').addEventListener('click', function (e) {
  setTimeout(() => {
    const footer = document.getElementById('footer');
    footer.focus({ preventScroll: true });
  }, 400);
});



function closeSignup() {
  document.getElementById("signupModal").style.display = "none";
}

//Registration password hide show
function togglePassword() {
  const password = document.getElementById('registerPassword');
  const toggleText = document.querySelector('.toggle-password-regis');

  if (password.type === 'password') {
    password.type = 'text';
    toggleText.textContent = " 👁️";

  } else {
    password.type = 'password';
    toggleText.textContent = "🙈"; // Show icon
  }
}

// Registration Form
function openSignup() {
 document.getElementById("signupModal").innerHTML = `
    <div class="modal-content-regis">
      <span class="close-btn-regis" onclick="closeSignup()">&times;</span>
      <h2 class="brand-title">Aditi Study Center - Registration</h2>
      <form id="registrationForm">
        <div class="form-content-regis">
          <div class="details personal">
            <span class="title">Personal Details</span>
            <div class="fields-regis">
              <div class="input-field-regis">
                <label for="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your name" required aria-required="true" />
              </div>
              <div class="input-field">

                <label for="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" required aria-required="true"
                  autocomplete="email" />


              </div>
              <div class="input-field-regis password-field">
                <label for="password">Password</label>
               

                <input type="password" id="registerPassword" placeholder="Enter Password" required aria-required="true"
                  autocomplete="new-password" />

                <span class="toggle-password-regis" onclick="togglePassword()">👁️</span>
              </div>
              <div class="input-field-regis">
                <label for="gender">Gender</label>
                <select id="gender" required aria-required="true">
                  <option disabled selected>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>
              <div class="input-field-regis">
                <label for="mobile">Mobile Number</label>
                <input type="tel" id="mobile" name="mobile" placeholder="Enter mobile number" autocomplete="tel" />


              </div>
              <div class="input-field-regis">
                <label for="dob">Date of Birth</label>
                <input type="date" name="dob" id="dob" required aria-required="true" />

              </div>
            </div>
          </div>
          <div class="details ID">
            <span class="title">Identity Details</span>
            <div class="fields-regis">
              <div class="input-field-regis">
                <label for="idNumber">ID Number</label>
                <input type="text" id="idNumber" placeholder="Enter ID number" required aria-required="true" />
              </div>
              <div class="input-field-regis">
                <label for="addressType">Address </label>
                <input type="text" id="addressType" placeholder="Permanent or Temporary" required
                  aria-required="true" />
              </div>
              <div class="input-field-regis ">
                <label for="course">Coursess</label>
                <input type="text" id="course" placeholder="Enter course" required aria-required="true" />
              </div>
              <div class="input-field-regis">
                <label for="batch">Batch</label>
                <select id="batch" required aria-required="true">
                  <option value="" disabled selected>Select batch</option>
                  <option>A1</option>
                  <option>A2</option>
                  <option>A3</option>
                </select>
              </div>
              <div class="input-field-regis">
                <label for="transportMode">Transport Mode</label>
                <select id="transportMode" required>
                  <option value="" disabled selected>Select mode</option>
                  <option value="By_Walking">By Walking</option>
                  <option value="Bicycle">Bicycle</option>
                  <option value="Personal_Vehicle">Personal Vehicle</option>
                </select>

              </div>
              <div class="input-field-regis">
                <label for="vehicleNo">Vehicle No.</label>
                <input type="text" id="vehicleNo" placeholder="Enter vehicle number" />
              </div>
            </div>
            <button type="submit" class="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div class="back-to-login" onclick="backToLoginFromSignup()">Back to Login</div>
    </div>
 `; 
   document.getElementById("signupModal").style.display = "block";

   document.getElementById("registrationForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const password = document.getElementById("registerPassword"); // ✅ FIX
  const gender = document.getElementById("gender");
  const mobile = document.getElementById("mobile");
  const dob = document.getElementById("dob");
  const idNumber = document.getElementById("idNumber");
  const addressType = document.getElementById("addressType");
  const course = document.getElementById("course");
  const batch = document.getElementById("batch");
  const transportMode = document.getElementById("transportMode");
  const vehicleNo = document.getElementById("vehicleNo");

  const data = {
    username: fullName.value,
    email: email.value,
    password: password.value,
    gender: gender.value.toUpperCase(),
    mobileNumber: mobile.value,
    dob: new Date(dob.value).toISOString().split("T")[0],
    idNumber: Number(idNumber.value),   // 👈 IMPORTANT
    address: addressType.value,
    what: course.value,
    batchCode: batch.value,
    transportMode: transportMode.value,
    vehicleNumber: vehicleNo.value
  };

  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resultText = await response.text(); 

    if (response.ok) {
      alert("Registration successful!");
      closeSignup();
      handleLogin();   
    } else {
      alert("Registration failed: " + resultText);
      
    }
  } catch (e) {
    alert("Error: " + e);
  }
});


}
function backToLoginFromSignup() {
  closeSignup();
  handleLogin();
} 

// Login Form
function handleLogin() {
  document.getElementById("AdminLogin").innerHTML = `
    <form id="loginForm"   class=" forms_Box" method="post">

    <span class="close-btn" onclick="closelogin()">&times;</span>


      <h2 class="brand-title">Aditi Study Center</h2>

        <div class="form-group">

          <label for="username" class="label_log">Username or Email</label>

           <input type="text" name="username" id="usernameEmail" class="input_log" required placeholder="Enter your email"
          autocomplete="username" />

        </div>

        <div class="form-group">
         <label for="password" class="label_log">Password</label>
        <input type="password" name="password" class="input_log" id="password" required
          placeholder="Enter your password" autocomplete="current-password" />
        </div>

        <button type="submit" id="submitBtn">Login</button>
      </form>
      <div class="forgot-password " onclick="openForgot()">Forgot Password?
      </div>

    `;
  document.getElementById("AdminLogin").style.display = "block";

  document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("usernameEmail").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:8080/loginapi/studentLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(async res => {
    const text = await res.text();
    let body;

    try {
      body = JSON.parse(text);
    } catch {
      throw new Error(text);
    }

    if (!res.ok) {
      throw new Error(body.message || "Login failed");
    }

    console.log("LOGIN RESPONSE:", body);

    // ✅ SHOW IN (Dashboard)
    localStorage.setItem("user", JSON.stringify(body));
    localStorage.setItem("username", body.username);
    localStorage.setItem("email", body.email);
    localStorage.setItem("mobile", body.mobileNumber);
    localStorage.setItem("batch", body.batchCode);
    localStorage.setItem("batchCode", body.batchCode);
    localStorage.setItem("Amount", body.fee);
    localStorage.setItem("batchTiming", body.timing);


  localStorage.setItem("studentId", body.id); 
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("role", "STUDENT"); 

  
  alert("Login Successful!");
  window.location.href = "/HTML/Dashboard.html";

  })
  .catch(err => {
    console.error("Login failed:", err.message);
    alert(err.message);
  });


});
}
localStorage.getItem("studentId")

// Forgot Password - Step 1: Enter Email
function openForgot() {
   document.getElementById("AdminLogin").innerHTML =`

  <form id="forgotForm" class="forms_Box" novalidate onsubmit="sendOTP(); return false;">

        <span class="close-btn" onclick="closeForgot()">&times;</span>

        <h2 class="brand-title">Forgot Password</h2>

        <div class="form-group">
          <label for="forgot-email" class="label_log">
            Enter your registered Email
          </label>
          <input id="forgot-email" name="forgot-email" type="email" class="input_log" placeholder="you@example.com"
            autocomplete="email" required />
        </div>

        <button type="submit">Submit</button>

        <div class="forgot-password" onclick="backToLogin()">
          Back to Login
        </div>
      </form>
  `;
  document.getElementById("AdminLogin").style.display = "block";

    

}
function backToLogin() {
  handleLogin();
}
function sendOTP() {

   const email = document.getElementById("forgot-email").value.trim();
 if (!email || !email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  localStorage.setItem("resetEmail", email);

  fetch(`http://localhost:8080/api/users/forgot-password?email=${encodeURIComponent(email)}`, {
    method: "POST"
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed");
      return res.text();
    })
    .then(data => {
      document.getElementById("sentTo").textContent = email;
      console.log(data); // OTP sent
    })
    .catch(err => {
      console.error(err);
      alert("OTP send failed");
    });
   

  document.getElementById("AdminLogin").innerHTML =`
  <form id="resetForm" class="forms_Box" novalidate onsubmit="resetPassword(event)">

      <h2 class="brand-title">Reset Password</h2>

      <label class="otp-info label_log" for="otpInput"> OTP sent to: <strong id="sentTo"></strong>
      </label>

      <div class="form-group">
        <input type="text" id="otpInput" name="otpInput" class="Otp_log input_log" placeholder="Enter 6-digit OTP"
          maxlength="6" required autocomplete="one-time-code" />
      </div>

      <div class="form-group">
        <input type="password" id="newPass" class="Otp_log input_log" placeholder="New Password" required
          autocomplete="new-password" />
      </div>

      <div class="form-group">
        <input type="password" id="confirmPass" class="Otp_log input_log" placeholder="Confirm Password" required
          autocomplete="new-password" />
      </div>

      <button type="submit">Reset Password</button>

      <div id="message" class="msg"></div>

      <span class="change-email" onclick="backToEmail()">
        ← Change Email
      </span>
    </form>
  `;
  document.getElementById("AdminLogin").style.display = "block";
}
// STEP BACK → Change Email
function backToEmail() {
  openForgot();
  // Last entered email refill
  document.getElementById("forgot-email").value =
    localStorage.getItem("resetEmail") || "";
}
// Forgot Password - Step 2: Reset Password
    function resetPassword(event) {
  event.preventDefault(); // 🔥 must

  const otp = document.getElementById("otpInput").value.trim();
  const pass = document.getElementById("newPass").value.trim();
  const confirm = document.getElementById("confirmPass").value.trim();
  const msg = document.getElementById("message");

  const email = localStorage.getItem("resetEmail");

  console.log("RESET DATA:", { email, otp, pass });

  msg.textContent = "";

  if (!email) return err("Session expired. Try again.");
  if (!/^\d{6}$/.test(otp)) return err("Enter valid 6-digit OTP");
  if (pass.length < 6) return err("Password must be at least 6 characters");
  if (pass !== confirm) return err("Passwords do not match");


  fetch("http://localhost:8080/api/users/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      otp: parseInt(otp),   // 🔥 correct
      newPassword: pass
    })
  })
    .then(res => {
      console.log("STATUS:", res.status);
      return res.text();
    })
    .then(data => {
      msg.className = "msg success";
      msg.textContent = data;

      setTimeout(() => {
        localStorage.removeItem("resetEmail");
        handleLogin();
        console.log("login page ");

      }, 800);
    })
    .catch(err => {
      console.error("RESET ERROR:", err);
      msg.className = "msg error";
      msg.textContent = "Reset failed. Try again.";
    });
}


// Admin Login Form
function AdminLogin() {

  document.getElementById("AdminLogin").innerHTML = `
    <form id="LoginAdmin" class="forms_Box">
      <span class="close-btn" onclick="closelogin()">&times;</span>

      <h3 class="brand-title">Admin Login</h3>
      
      <div class="form-group">
        <label for="adminUsername" class="label_log">Admin Username</label>
        <input type="text" id="adminUsername" name="adminUsername" class="input_log" required />
      </div>

      <div class="form-group">
        <label for="adminPassword" class="label_log">Admin Password</label>
        <input type="password" id="adminPassword" name="adminPassword" class="input_log" required />
      </div>

      <button type="submit" class="btn btn-submit">Login</button>
    </form>
  `;

  document.getElementById("AdminLogin").style.display = "block";

  document.getElementById("LoginAdmin").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    fetch("http://localhost:8080/loginapi/adminlogin", { // ✅ Correct URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userAdmin: username, passwordAdmin: password })
    })
    .then(async res => {
        const text = await res.text();
        let data;
        try { data = JSON.parse(text); } 
        catch { throw new Error(text); }

        if (!res.ok) throw new Error(data.message || "Login failed");
        return data;
      



    })
    .then(data => {
      console.log("ADMIN LOGIN RESPONSE:", data);

      // ✅ Save JWT + admin info
      localStorage.setItem("token", data.token); // must be returned from backend
      localStorage.setItem("role", data.role);
      localStorage.setItem("admin", JSON.stringify(data));
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem("isAdminLoggedIn", "true");
    
  localStorage.setItem("role", "ADMIN");
  // localStorage.setItem("isLoggedIn", "true"); 

      alert("Admin Login Successful!");
      window.location.href = "/HTML/Admin.html";
     

    

      
    })
    .catch(err => {
      console.error("Admin login failed", err);
      alert(err.message);
    });

  });

}

function closelogin() {
  const adminlogin = document.getElementById("AdminLogin");
  adminlogin.style.display = "none"
  adminlogin.innerHTML = "";

    const studentlogin = document.getElementById("AdminLogin");
  studentlogin.style.display = "none"
  studentlogin.innerHTML = "";

}

function closeForgot() {
    const closeForgotFrom = document.getElementById("AdminLogin");
  closeForgotFrom.style.display = "none"
  closeForgotFrom.innerHTML = "";
  
}



