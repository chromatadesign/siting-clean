
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
        
        else if (planIds.includes(PlanAllAccess)) {
          currentPlan.innerText = "All Access";}
    // ----------------------------------------------------- 
    
    
        var targetDiv = document.getElementById(currentPlan.innerText);
        if (targetDiv) {
          targetDiv.style.display = "flex";
        }
        
    
        
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
