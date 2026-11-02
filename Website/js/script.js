document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. NAVIGATION LINK HIGHLIGHTING
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ==========================================
    // 2. FEE CALCULATOR WITH ERROR HANDLING
    // ==========================================
    const feesForm = document.getElementById('fees-form');

    if (feesForm) {
        feesForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous error styles
            const resultBox = document.getElementById('fees-result');
            const totalDisplay = document.getElementById('total-price-display');
            const breakdownDetails = document.getElementById('breakdown-details');

            const activityVal = document.getElementById('activity').value;
            const participantsVal = document.getElementById('participants').value;
            const dateVal = document.getElementById('date').value;

            // ERROR HANDLING: Check for empty required fields
            if (!activityVal || !participantsVal || !dateVal) {
                alert('Error: Please fill in all required fields (Activity, Participants, and Date).');
                return;
            }

            const activityPrice = parseFloat(activityVal);
            const participants = parseInt(participantsVal, 10);
            const accommodationCost = parseFloat(document.getElementById('accommodation').value) || 0;
            const equipmentCost = parseFloat(document.getElementById('equipment').value) || 0;

            // ERROR HANDLING: Validate participant range
            if (isNaN(participants) || participants <= 0) {
                alert('Error: Number of participants must be at least 1.');
                document.getElementById('participants').focus();
                return;
            }

            // Calculations
            const baseActivityTotal = activityPrice * participants;
            const addOnsTotal = (accommodationCost + equipmentCost) * participants;
            const finalTotal = baseActivityTotal + addOnsTotal;

            // Display Results successfully
            totalDisplay.textContent = `R${finalTotal.toFixed(2)}`;
            breakdownDetails.innerHTML = `
                <p><strong>Base Activity Cost:</strong> R${baseActivityTotal.toFixed(2)} (${participants} participant/s)</p>
                <p><strong>Add-ons & Equipment:</strong> R${addOnsTotal.toFixed(2)}</p>
                <p style="color: green; margin-top: 5px;">✓ Booking calculation generated successfully!</p>
            `;
            
            resultBox.style.display = 'block';
            resultBox.style.borderLeft = '4px solid #28a745';
        });
    }
});