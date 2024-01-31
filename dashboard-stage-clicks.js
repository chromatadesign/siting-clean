document.addEventListener('DOMContentLoaded', () => {
    // Function to simulate a click
    function simulateClick(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.click();
        }
    }

    // Adding event listeners for each pair of divs
    document.getElementById('client-early-stage-t')?.addEventListener('click', () => simulateClick('client-early-stage'));
    document.getElementById('client-mid-stage-t')?.addEventListener('click', () => simulateClick('client-mid-stage'));
    document.getElementById('client-late-stage-t')?.addEventListener('click', () => simulateClick('client-late-stage'));
    document.getElementById('client-inactive-t')?.addEventListener('click', () => simulateClick('client-inactive'));

    document.getElementById('all-early-stage-t')?.addEventListener('click', () => simulateClick('all-early-stage'));
    document.getElementById('all-mid-stage-t')?.addEventListener('click', () => simulateClick('all-mid-stage'));
    document.getElementById('all-late-stage-t')?.addEventListener('click', () => simulateClick('all-late-stage'));
    document.getElementById('all-inactive-t')?.addEventListener('click', () => simulateClick('all-inactive'));
});
