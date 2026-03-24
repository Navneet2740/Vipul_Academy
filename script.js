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

  fetch("YOUR_WEB_APP_URL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    if (response.status === "success") {
      statusMsg.innerText = "✅ Enquiry submitted successfully!";
      statusMsg.style.color = "green";
      form.reset();
    } else {
      statusMsg.innerText = "❌ Something went wrong!";
      statusMsg.style.color = "red";
    }
  })
  .catch(error => {
    statusMsg.innerText = "❌ Failed to connect!";
    statusMsg.style.color = "red";
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Enquiry";
  });
});