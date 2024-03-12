
window.$memberstackDom.getCurrentMember().then((member) => {
  if (member.data) {
    var currentPlan = document.getElementById('current-plan');
    const planConnections = member.data["planConnections"];
    if (planConnections && planConnections.length > 0) {
      
      // PLAN IDs -------------------------------------------
      const PlanSitingClean = "pln_siting-clean-ve1f408ec"; 
      const PlanAllAccess = "pln_new-all-access-i76m01m9"; 
      // ----------------------------------------------------
      
      const planIds = planConnections.map(connection => connection.planId);
      if (

      //PLAN SEARCH ------------------------------------------
             planIds.includes(PlanSitingClean) 
          || planIds.includes(PlanAllAccess)
      // -----------------------------------------------------   
         
         ) {

        
       //PLAN NAMES TO DISPLAY -------------------------------
        
        if (planIds.includes(PlanSitingClean)) {
          currentPlan.innerText = "Siting Clean";}
        
        if (planIds.includes(PlanAllAccess)) {
          currentPlan.innerText = "All Access";}

       // ----------------------------------------------------- 
        
      } else {
          currentPlan.innerText = "";
      }
    } else {
      console.log('no plan connections');

    }

  } else {

    window.location.href = '/login';

  }

})

// Code to match the text value of "current-plan" div with team logo div ID
document.addEventListener('DOMContentLoaded', function () {
    // Get the text value of the div with ID "current-plan"
    var planId = document.getElementById("current-plan").textContent.trim();

    // Use setTimeout to delay the execution of the next block of code by 1000 milliseconds (1 second)
    setTimeout(function() {
        // Try to find a div on the page with an ID that matches the text value
        var targetDiv = document.getElementById(planId);

        // If a matching div is found, set its display to "flex"
        if (targetDiv) {
            targetDiv.style.display = "flex";
        }
    }, 2000); 
});


