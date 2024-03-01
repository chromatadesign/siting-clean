// PROJECT CA PAGE: TAB EVENT TRIGGERS
// Function to handle the click event on button divs
function handleButtonClick(clickedBtnId, targetTabId) {
  // Simulate a click on the target tab
  const targetTab = document.getElementById(targetTabId);
  if (targetTab) {
    targetTab.click();
  }

  // Apply the 'selected' class to the clicked button
  const clickedBtn = document.getElementById(clickedBtnId);
  if (clickedBtn) {
    clickedBtn.classList.add('selected');
  }

  // Remove the 'selected' class from all other p-tab-sublink divs
  document.querySelectorAll('.p-tab-sublink').forEach(div => {
    if(div.id !== clickedBtnId) {
      div.classList.remove('selected');
    }
  });
}

// Add event listeners to the button divs
const buttonIds = [
  { btn: 'permits-and-approvals-btn', tab: 'permits-and-approvals-tab', hash: '#permits-and-approvals' },
  { btn: 'decision-makers-btn', tab: 'decision-makers-tab', hash: '#decision-makers' },
  { btn: 'power-mapping-btn', tab: 'power-mapping-tab', hash: '#power-mapping' },
  { btn: 'local-media-btn', tab: 'local-media-tab', hash: '#local-media' },
  { btn: 'dev-history-btn', tab: 'dev-history-tab', hash: '#dev-history' },
  { btn: 'census-data-btn', tab: 'census-data-tab', hash: '#census-data' },
  { btn: 'fed-state-rep-btn', tab: 'fed-state-rep-tab', hash: '#fed-state-rep' },
  { btn: 'extra-research-btn', tab: 'extra-research-tab', hash: '#extra-research' },
];

buttonIds.forEach(({ btn, tab }) => {
  document.getElementById(btn).addEventListener('click', () => handleButtonClick(btn, tab));
});

// Function to check the URL hash and trigger the corresponding button action or default action
function checkUrlAndTriggerButton() {
  const currentHash = window.location.hash;
  const matchingButton = buttonIds.find(({ hash }) => hash === currentHash);

  if (matchingButton) {
    handleButtonClick(matchingButton.btn, matchingButton.tab);
  } else {
    // Default to 'permits-and-approvals-btn' if no matching hash is found
    handleButtonClick('permits-and-approvals-btn', 'permits-and-approvals-tab');
  }
}

// Run the check with a slight delay after the page has loaded
window.addEventListener('DOMContentLoaded', (event) => {
  // Introduce a slight delay before executing the function
  setTimeout(checkUrlAndTriggerButton, 500); // Delay of 500 milliseconds
});





// SCORECARD LINK ASSIGNMENT
document.addEventListener('DOMContentLoaded', function() {
    // Base URL (constant part)
    const baseUrl = "www.bantamoneportal.com/project-scorecard/";
    // Variable part of the URL - change this string as needed
    let urlEnding = "{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}";
    
    // Construct the full URL
    const fullUrl = baseUrl + urlEnding;
    
    // Find the link div (assuming it's an anchor tag) and set its href attribute
    const scorecardLink = document.getElementById('scorecard-link');
    if (scorecardLink) {
        scorecardLink.href = `http://${fullUrl}`; // Adding http:// to make it a valid link
    } else {
        console.error('Element with ID "scorecard-link" not found.');
    }
});





// INSTITUIONS AND CIVIL SOCIETY LINK ASSIGNMENT
document.addEventListener('DOMContentLoaded', function() {
    // Base URL (constant part)
    const baseUrl = "www.bantamoneportal.com/institutions-and-civil-society/";
    // Variable part of the URL - change this string as needed
    let urlEnding = "{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}";
    
    // Construct the full URL
    const fullUrl = baseUrl + urlEnding;
    
    // Find the link div (assuming it's an anchor tag) and set its href attribute
    const scorecardLink = document.getElementById('institutions-link');
    if (scorecardLink) {
        scorecardLink.href = `http://${fullUrl}`; // Adding http:// to make it a valid link
    } else {
        console.error('Element with ID "institutions-link" not found.');
    }
});





// OVERVIEW AND CONTACT LINK ASSIGNMENTS
document.addEventListener('DOMContentLoaded', function() {
    // Base URL (constant part)
    const baseUrl = "www.bantamoneportal.com/projects/";
    // Variable part of the URL - change this string as needed
    let urlEnding = "{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}";
    
    // Construct the full URL without fragment
    let fullUrl = baseUrl + urlEnding;

    // Array of objects containing the div IDs and their corresponding fragment identifiers
    const linksWithFragments = [
        { id: "overview-link", fragment: "#overview" },
        { id: "contacts-link", fragment: "#contacts" }
    ];

    // Loop through each item, find the div, and set its href attribute
    linksWithFragments.forEach(function(item) {
        const linkElement = document.getElementById(item.id);
        if (linkElement) {
            linkElement.href = `http://${fullUrl}${item.fragment}`; // Adding http:// to make it a valid link
        } else {
            console.error(`Element with ID "${item.id}" not found.`);
        }
    });
});



// ENGAGEMENT STRATEGY LINK ASSIGNMENTS
document.addEventListener('DOMContentLoaded', function() {
    // Base URL (constant part)
    const baseUrl = "www.bantamoneportal.com/project-engagement-strategy/";
    // Variable part of the URL - easily changeable
    let urlEnding = "{{wf {&quot;path&quot;:&quot;slug&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}";
    
    // Define the full URL without the fragment
    let fullUrl = baseUrl + urlEnding;

    // Define the div IDs and their corresponding fragment identifiers
    const phaseLinks = [
        { id: "es-phase-one-link", fragment: "#es-phase-one" },
        { id: "es-phase-two-link", fragment: "#es-phase-two" },
        { id: "es-phase-three-link", fragment: "#es-phase-three" }
    ];

    // Iterate over each phaseLink object, set the href for each corresponding div
    phaseLinks.forEach(function(link) {
        const linkElement = document.getElementById(link.id);
        if (linkElement) {
            linkElement.href = `http://${fullUrl}${link.fragment}`; // Adding http:// to make it a valid link
        } else {
            console.error(`Element with ID "${link.id}" not found.`);
        }
    });
});




// POWER MAPPING ORGANIZATION CONTATCS RICH TEXT FORMATTING
document.addEventListener('DOMContentLoaded', function() {
    // Select all divs with class 'org-name-list'
    const orgNameListDivs = document.querySelectorAll('.org-name-list');

    orgNameListDivs.forEach(div => {
        // Get the innerHTML of each div
        let innerHTML = div.innerHTML;

        // Replace **text** with <strong>text</strong>
        innerHTML = innerHTML.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Replace /n with a line break
        innerHTML = innerHTML.replace(/\/n/g, '<br>');

        // Update the div's innerHTML with the modified string
        div.innerHTML = innerHTML;
    });
});
