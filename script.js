const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwIQFmxiAY1Jo2KwX8QiegE0EVyWT9RYZWU9SFnNNwo2S-mVOmoAIlKxkqWrIW57A5m/exec";

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

  fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  })
  .then(() => {
    statusMsg.innerText = "✅ Enquiry submitted successfully!";
    statusMsg.style.color = "green";
    form.reset();
  })
  .catch(error => {
    statusMsg.innerText = "❌ Submission failed!";
    statusMsg.style.color = "red";
    console.error(error);
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Enquiry";
  });
});