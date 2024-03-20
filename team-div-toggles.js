document.addEventListener("DOMContentLoaded", function() {
    // Search for the div with ID 'current-plan'
    var currentPlanDiv = document.getElementById("current-plan");

    // If the div exists
    if (currentPlanDiv) {
        var currentPlanID = currentPlanDiv.innerText; // Get the currentPlanID

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
            if (teamTypeDiv && teamTypeDiv.innerText === "SOURCE") {
                // If the team type is SOURCE, find the div with ID 'p-teams-list'
                var pTeamsListDiv = document.getElementById("p-teams-list");
                if (pTeamsListDiv) {
                    // Set the div's display to flex
                    pTeamsListDiv.style.display = "flex";
                }
            }
        }
    }
});
