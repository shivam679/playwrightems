import ProjectsPage from "../POM/statProjectsPage.page.js"
class myProjectsPage
{
    constructor(page)
    {
      this.page=page  
    }
    async submitEmpProj(ProjectID)
    {
     let submitProj=this.page.locator(`//td[text()="${ProjectID}"]/../descendant::a[text()="Submit"]`)
     await submitProj.click()   
    }
}
export default myProjectsPage