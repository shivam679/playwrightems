class assignProjectPage
{
    constructor(page)
    {
      this.empId=page.locator('//input[@name="eid"]')
      this.projName=page.locator('//input[@name="pname"]')
      this.assignDate=page.locator('//input[@name="duedate"]')  
      this.assignButton=page.getByRole('button', {name:'Assign'})
    }
    async assignProjectEmp(eID, projectN, dateAssign)
    {
     await this.empId.fill(eID)
     await this.projName.fill(projectN)
     await this.assignDate.fill(dateAssign)
     await this.assignButton.click()
    }
}
export default assignProjectPage