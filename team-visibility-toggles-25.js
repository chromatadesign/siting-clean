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

                // Find the child div with class 'team-type-value' and decide what to do
                var teamTypeDiv = planDiv.querySelector(".team-type-value");
                if (teamTypeDiv) {
                    // Handle SOURCE and Bantam logic
                    if (teamTypeDiv.innerText === "SOURCE" || teamTypeDiv.innerText === "Bantam") {
                        var pTeamsListDiv = document.getElementById("p-teams-list");
                        if (pTeamsListDiv) {
                            pTeamsListDiv.style.display = "flex";
                        }

                        var developerFilter = document.getElementById("developer-dropdown-filter");
                        if (developerFilter) {
                            developerFilter.style.display = "flex";
                        }
                    } else {
                        var pTeamsListDiv = document.getElementById("p-teams-list");
                        if (pTeamsListDiv) {
                            pTeamsListDiv.style.display = "none";
                        }
                    }

                    if (teamTypeDiv.innerText === "Bantam") {
                        var developerProjectsLinkDiv = document.getElementById("developer-projects-link");
                        var developerNameDiv = document.getElementById("developer-name");
                        if (developerProjectsLinkDiv && developerNameDiv) {
                            var developerNameValue = developerNameDiv.innerText;
                            var developerURL = "https://www.bantamoneportal.com/partner/" + developerNameValue;
                            developerProjectsLinkDiv.setAttribute("href", developerURL);
                        }

                        // NEW FUNCTIONALITY: Set all elements with class "bantam-edit-wrapper" to display: flex
                        var bantamEditWrappers = document.querySelectorAll(".bantam-edit-wrapper");
                        bantamEditWrappers.forEach(wrapper => {
                            wrapper.style.display = "flex";
                        });
                    }

                    var bantamLogoDiv = document.getElementById("bantam-logo");
                    var bantamIconDiv = document.getElementById("bantam-icon");

                    if (bantamLogoDiv) {
                        bantamLogoDiv.style.display = teamTypeDiv.innerText !== "SOURCE" ? "flex" : "none";
                    }

                    if (bantamIconDiv) {
                        bantamIconDiv.style.display = teamTypeDiv.innerText !== "SOURCE" ? "flex" : "none";
                    }

                    // Handle client-group opacity based on team type
                    var clientGroupDiv = document.getElementById("client-group");
                    if (clientGroupDiv) {
                        if (teamTypeDiv.innerText === "SOURCE") {
                            clientGroupDiv.style.opacity = "0";
                        } else {
                            clientGroupDiv.style.opacity = "1"; // 100%
                        }
                    }

                    // Handle SOURCE-specific logic
                    if (teamTypeDiv.innerText === "SOURCE") {
                        var sourceLogoDiv = document.getElementById("source-logo");
                        if (sourceLogoDiv) {
                            sourceLogoDiv.style.display = "flex";
                        }

                        var sourceIconDiv = document.getElementById("source-icon");
                        if (sourceIconDiv) {
                            sourceIconDiv.style.display = "flex";
                        }
                    }
                }
            }
        }
    });

    // SET VISIBILITY OF EDIT BUTTONS
    const accessStatus = document.getElementById('access-status-id');

    // Check if the 'access-status-id' div exists
    if (accessStatus) {
        const statusText = accessStatus.innerText;
        
        // Find all divs with class 'edit-wrapper' and 'client-edit-wrapper'
        const editWrappers = document.querySelectorAll('.edit-wrapper');
        const clientEditWrappers = document.querySelectorAll('.client-edit-wrapper');
        
        // Additional div elements
        const editFormWrapper = document.getElementById('edit-form-wrapper');
        const clientEditForm = document.getElementById('client-edit-form');

        if (statusText === 'Edit') {
            // Set display of 'edit-wrapper' divs to 'flex'
            editWrappers.forEach(wrapper => {
                wrapper.style.display = 'flex';
            });

            // Set display of 'client-edit-wrapper' divs to 'none'
            clientEditWrappers.forEach(wrapper => {
                wrapper.style.display = 'none';
            });

            // Set 'edit-form-wrapper' display to 'flex' and 'client-edit-form' to 'none'
            if (editFormWrapper) editFormWrapper.style.display = 'flex';
            if (clientEditForm) clientEditForm.style.display = 'none';
        } else if (statusText === 'View') {
            // Set display of both 'edit-wrapper' and 'client-edit-wrapper' divs to 'none'
            editWrappers.forEach(wrapper => {
                wrapper.style.display = 'none';
            });

            clientEditWrappers.forEach(wrapper => {
                wrapper.style.display = 'none';
            });

            // Set both 'edit-form-wrapper' and 'client-edit-form' to 'none'
            if (editFormWrapper) editFormWrapper.style.display = 'none';
            if (clientEditForm) clientEditForm.style.display = 'none';
        } else {
            // Set display of 'edit-wrapper' divs to 'none'
            editWrappers.forEach(wrapper => {
                wrapper.style.display = 'none';
            });

            // Set display of 'client-edit-wrapper' divs to 'flex'
            clientEditWrappers.forEach(wrapper => {
                wrapper.style.display = 'flex';
            });

            // Set 'edit-form-wrapper' display to 'none' and 'client-edit-form' to 'flex'
            if (editFormWrapper) editFormWrapper.style.display = 'none';
            if (clientEditForm) clientEditForm.style.display = 'flex';
        }
    }
});
