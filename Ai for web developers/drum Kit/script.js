
// ==========================================
// 1. SELECT HTML ELEMENTS
// ==========================================

// Select all nine drum buttons
const drumButtons = document.querySelectorAll(".drum");

// Select the status message
const message = document.getElementById("message");


// ==========================================
// 2. PLAY DRUM SOUND FUNCTION
// ==========================================

// This function plays the selected drum sound
function playDrum(button) {

    // Get the sound name from the button
    const soundName = button.dataset.sound;

    // Find the matching audio element
    const audio = document.getElementById(soundName);

    // Check whether the audio element exists
    if (!audio) {
        console.error("Audio element not found:", soundName);

        // Show an error message on the webpage
        if (message) {
            message.textContent = "Audio element not found!";
        }

        return;
    }

    // Start the sound from the beginning
    audio.currentTime = 0;

    // Play the selected audio file
    audio.play()

        // Run this when audio plays successfully
        .then(() => {

            console.log("Playing:", soundName);

            // Display the playing sound
            if (message) {
                message.textContent =
                    soundName.toUpperCase() + " is playing!";
            }

        })

        // Handle audio playback errors
        .catch((error) => {

            // Print the actual error in Console
            console.error("Audio playback failed:", error.name, error.message);

            // Display an error message
            if (message) {
                message.textContent =
                    "Unable to play " + soundName + ". Check audio file.";
            }

        });

    // Add playing animation to the button
    button.classList.add("playing");

    // Remove animation after 150 milliseconds
    setTimeout(() => {
        button.classList.remove("playing");
    }, 150);
}


// ==========================================
// 3. MOUSE CLICK EVENT
// ==========================================

// Check every drum button
drumButtons.forEach((button) => {

    // Play its sound when clicked
    button.addEventListener("click", () => {

        playDrum(button);

    });

});


// ==========================================
// 4. KEYBOARD EVENT
// ==========================================

// Listen for keyboard key presses
document.addEventListener("keydown", (event) => {

    // Convert the pressed key to lowercase
    const pressedKey = event.key.toLowerCase();

    // Find the button matching the pressed key
    const matchingButton = [...drumButtons].find((button) => {

        return button.dataset.key === pressedKey;

    });

    // Do not replay continuously when a key is held down
    if (event.repeat) {
        return;
    }

    // Play the matching drum sound
    if (matchingButton) {

        playDrum(matchingButton);

    }

});


// ==========================================
// 5. CHECK AUDIO FILE LOADING
// ==========================================

// Select all audio elements
document.querySelectorAll("audio").forEach((audio) => {

    // Listen for audio loading errors
    audio.addEventListener("error", () => {

        // Display the failed audio file in Console
        console.error("Audio loading failed:", audio.src);

        // Display the error on the webpage
        if (message) {
            message.textContent =
                "Unable to load: " + audio.id;
        }

    });

});


// ==========================================
// 6. PROJECT READY MESSAGE
// ==========================================

// Confirm that JavaScript has loaded
console.log("Drum Kit is ready!");
