window.$memberstackDom.getCurrentMember().then((member) => {
    // Check if member data exists
    if (member.data) {
        const planConnections = member.data["planConnections"];
        if (planConnections && planConnections.length > 0) {
            // ALL TEAMS HERE -------------------------------------
            const PlanSitingClean = "pln_siting-clean-ve1f408ec";
            const PlanAllAccess = "pln_new-all-access-i76m01m9";
            const PlanBantamAccess = "pln_new-bantam-access-i700e1m9";
            // ----------------------------------------------------

            const planIds = planConnections.map(connection => connection.planId);
            if (
            // ALL TEAMS HERE -------------------------------------
                planIds.includes(PlanSitingClean) || planIds.includes(PlanAllAccess) 
            // ----------------------------------------------------
            ) {
                // Check if currentPlan div exists
                var currentPlan = document.getElementById('current-plan');
                if (currentPlan) {
                    // Update currentPlan text based on plan ID
                    currentPlan.innerText = planIds.includes(PlanSitingClean) ? 
                    "Siting Clean" : "All Access";
                    
                    // Adjust display of target div based on currentPlan text
                    var targetDiv = document.getElementById(currentPlan.innerText);
                    if (targetDiv) {
                        targetDiv.style.display = "flex";
                    }
                }

                // Additional functionality to set the display of "p-teams-list" to flex
                var pTeamsList = document.getElementById("p-teams-list");
                if (pTeamsList) {
                    pTeamsList.style.display = "flex";
                }

                // URL manipulation part
                if (currentPlan) {
                    var planText = currentPlan.innerText.toLowerCase().replace(/\s+/g, '-');
                    var baseURL = "https://www.bantamoneportal.com/partner/";
                    var fullURL = baseURL + planText;
                    
                    // Check if projectsPageLinkElement exists before setting href
                    var projectsPageLinkElement = document.getElementById('projects-page-link');
                    if (projectsPageLinkElement) {
                        projectsPageLinkElement.href = fullURL;
                    }
                }
            } else {
                // If currentPlan exists but no plan matches, clear its text
                if (document.getElementById('current-plan')) {
                    document.getElementById('current-plan').innerText = "";
                }
            }
        } else {
            console.log('no plan connections');
        }
    } else {
        // Optionally, handle cases where no member data is available, e.g., redirect to login
    }
});

