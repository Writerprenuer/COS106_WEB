
const contactForm = document.getElementById("contact-form");
const feedback = document.getElementById("contact-feedback");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    feedback.style.color = "#A32121";

    if (!name || !email || !subject || !message) {
        feedback.textContent = "Please complete all required fields.";
        return;
    }

    if (name.length < 2) {
        feedback.textContent = "Please enter a valid name.";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        feedback.textContent = "Please enter a valid email address, e.g. name@example.com.";
        return;
    }
    const phonePattern = /^[0-9]{7,15}$/;

    if (phone && !phonePattern.test(phone)) {
    feedback.textContent = "Please enter a phone number containing 7 to 15 digits only.";
    return;
    }

    if (phone && !phonePattern.test(phone)) {
        feedback.textContent = "Phone number must contain digits only.";
        return;
    }

    if (message.length < 10) {
        feedback.textContent = "Your message must contain at least 10 characters.";
        return;
    }

    feedback.style.color = "#236B38";
    feedback.textContent = "Your form has been validated successfully!";

    contactForm.reset();
});
