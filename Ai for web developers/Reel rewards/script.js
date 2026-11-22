// Find the promo code input element
const promoCodeInput = document.getElementById("promoCode");

// Find the element that displays the ticket price
const finalPriceElement = document.getElementById("finalPrice");

// Find the promo form
const promoForm = document.getElementById("promoForm");

// Find the message element
const messageElement = document.getElementById("message");

// Store the original ticket price as a number
const basePrice = 50;

// Check whether all required HTML elements exist
if (promoCodeInput && finalPriceElement && promoForm && messageElement) {

    // Display the original ticket price
    finalPriceElement.textContent = `Ticket Price: $${basePrice}`;

    // Create a function to calculate the discount
    function applyDiscount(basePrice, userCode) {

        // Remove extra spaces and convert code to uppercase
        const cleanedCode = userCode.trim().toUpperCase();

        // Check whether the entered code is HALF
        if (cleanedCode === "HALF") {

            // Calculate 50% discount
            const discountRate = 0.5;

            // Calculate final price after discount
            const finalPrice = basePrice - (basePrice * discountRate);

            // Return discounted price
            return finalPrice;
        }

        // Return null when promo code is invalid
        return null;
    }

    // Listen for form submission
    promoForm.addEventListener("submit", function(event) {

        // Stop the page from refreshing
        event.preventDefault();

        // Get the entered promo code
        const userCode = promoCodeInput.value;

        // Calculate the discounted price
        const finalPrice = applyDiscount(basePrice, userCode);

        // Check whether the promo code is valid
        if (finalPrice !== null) {

            // Display the final discounted price
            finalPriceElement.textContent = `Final Ticket Price: $${finalPrice.toFixed(2)}`;

            // Display success message
            messageElement.textContent = "Success! 50% discount applied.";

            // Show success message in green
            messageElement.style.color = "green";

            // Disable input after successful application
            promoCodeInput.disabled = true;

        } else {

            // Display invalid promo code message
            messageElement.textContent = "Invalid Promo Code! Try HALF.";

            // Show error message in red
            messageElement.style.color = "red";

        }

        // Clear the input field
        promoCodeInput.value = "";

    });

} else {

    // Display an error if an HTML element is missing
    console.error("Error: One or more HTML elements were not found.");

}