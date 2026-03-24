const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/YOUR_DEPLOYED_WEB_APP_ID/exec";

const form = document.getElementById("enquiryForm");
const submitBtn = document.getElementById("submitBtn");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  const formData = new FormData(this);

  const data = {
    studentName: formData.get("student_name"),
    className: formData.get("student_class"),
    board: formData.get("student_board"),
    phone: formData.get("student_contact")
  };

  if (!GOOGLE_SHEETS_WEB_APP_URL.includes("https://script.google.com/macros/s/")) {
    statusMsg.innerText = "❌ Configure GOOGLE_SHEETS_WEB_APP_URL in script.js with the deployed Apps Script endpoint.";
    statusMsg.style.color = "red";
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Enquiry";
    return;
  }

  fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("HTTP " + res.status + " " + res.statusText);
    }
    return res.json();
  })
  .then(response => {
    if (response.status === "success") {
      statusMsg.innerText = "✅ Enquiry submitted successfully!";
      statusMsg.style.color = "green";
      form.reset();
    } else {
      throw new Error(response.message || "Unknown response from server");
    }
  })
  .catch(error => {
    statusMsg.innerText = `❌ Submission failed: ${error.message}`;
    statusMsg.style.color = "red";
    console.error("Form submit error:", error);
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Enquiry";
  });
});