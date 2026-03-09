import addEmployeeData from "../testData/emsaddEmployee.json"
class ProjectsPage
{   
    constructor(page)
    { 
        let gmailid1=addEmployeeData.Email  
        this.EmpID=page.locator(`//td[text()='${gmailid1}']/preceding-sibling::td[3]`)
        this.ProjID=page.locator(`//td[text()="${EmpID}"]/preceding-sibling::td`)
    }
    async empID()
    {
        await this.EmpID.innerText()
    }
    async ProjectID()
    {
        await this.ProjID.innerText()
    }
}
export default ProjectsPage