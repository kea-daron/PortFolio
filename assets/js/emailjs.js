// Wait for DOM and EmailJS to be ready
(function () {
  // Initialize EmailJS with your Public Key
  emailjs.init("G6klRK4mTY95MQPMT");

  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Get form elements
    const form = document.getElementById("contact-form");
    const loading = document.querySelector(".loading");
    const errorMessage = document.querySelector(".error-message");
    const sentMessage = document.querySelector(".sent-message");
    const submitBtn = form.querySelector(".btn");

    // Handle form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Hide all messages
      loading.style.display = "none";
      errorMessage.style.display = "none";
      sentMessage.style.display = "none";

      // Show loading message
      loading.style.display = "block";
      submitBtn.disabled = true;

      // Get form data
      const formData = {
        from_name: form.from_name.value,
        from_email: form.from_email.value,
        subject: form.subject.value,
        message: form.message.value,
        to_email: "daron3327@gmail.com", // Add recipient email
      };

      // EmailJS Service ID and Template ID
      const serviceID = "service_m7buphs";
      const templateID = "template_osujpnk";

      // Send email using EmailJS
      emailjs
        .send(serviceID, templateID, formData)
        .then(function (response) {
          console.log("SUCCESS!", response.status, response.text);

          // Hide loading, show success message
          loading.style.display = "none";
          sentMessage.style.display = "block";
          submitBtn.disabled = false;

          // Reset form
          form.reset();

          // Hide success message after 5 seconds
          setTimeout(function () {
            sentMessage.style.display = "none";
          }, 5000);
        })
        .catch(function (error) {
          console.log("FAILED...", error);

          // Hide loading, show error message
          loading.style.display = "none";
          errorMessage.textContent =
            "Failed to send message. Please try again later.";
          errorMessage.style.display = "block";
          submitBtn.disabled = false;

          // Hide error message after 5 seconds
          setTimeout(function () {
            errorMessage.style.display = "none";
          }, 5000);
        });
    });
  });
})();
