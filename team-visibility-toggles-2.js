document.addEventListener("DOMContentLoaded", function() {
    window.$memberstackDom.getCurrentMember().then((member) => {
        // Initialize currentPlanID with a default or null value
        let currentPlanID = null;

        // Check if member data exists
        if (member.data) {
            const planConnections = member.data["planConnections"];
            if (planConnections && planConnections.length > 0) {
                // Extract planIds from planConnections
                const planIds = planConnections.map(connection => connection.planId);

                // Check if there are any planIds and set the first one as the currentPlanID
                if (planIds.length > 0) {
                    currentPlanID = planIds[0];
                }
            }
        }

        // Proceed if currentPlanID has been set
        if (currentPlanID) {
            // Search for the div that matches the currentPlanID
            var planDiv = document.getElementById(currentPlanID);
            if (planDiv) {
                // Set the div's display to flex
                planDiv.style.display = "flex";

                // Find the child div with class 'team-slug-value' and get its text
                var teamSlugDiv = planDiv.querySelector(".team-slug-value");
                if (teamSlugDiv) {
                    var teamSlugValue = teamSlugDiv.innerText;
                    // Combine the teamSlugValue with the base URL
                    var newURL = "https://www.bantamoneportal.com/partner/" + teamSlugValue;

                    // Find the div with ID 'projects-page-link' and set the new URL
                    var projectsPageLinkDiv = document.getElementById("projects-page-link");
                    if (projectsPageLinkDiv) {
                        projectsPageLinkDiv.setAttribute("href", newURL);
                    }
                }

                // Find the child div with class 'team-type-value' and get its text
        var teamTypeDiv = planDiv.querySelector(".team-type-value");
        if (teamTypeDiv) {
            var teamTypeValue = teamTypeDiv.innerText;
            // Check if the team type is SOURCE
            if (teamTypeValue === "SOURCE") {
                // If the team type is SOURCE, find the div with ID 'p-teams-list'
                var pTeamsListDiv = document.getElementById("p-teams-list");
                if (pTeamsListDiv) {
                    // Set the div's display to flex
                    pTeamsListDiv.style.display = "flex";
                }
            } else {
                // If the team type is not SOURCE, find the div with ID 'p-teams-list'
                var pTeamsListDiv = document.getElementById("p-teams-list");
                if (pTeamsListDiv) {
                    // Set the div's display to none
                    pTeamsListDiv.style.display = "none";
                }
            }
        }
    });
});