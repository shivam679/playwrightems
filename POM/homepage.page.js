class homepage
{
    constructor(page){
        this.addEmployeeLink=page.locator('//a[text()="Add Employee"]')
        this.adminLogoutButton=page.getByRole('link', { name:'Log Out'})
        this.viewEmpLink=page.getByRole('link', { name:'View Employee'})
        this.salaryTab=page.getByRole('link', { name:'Salary Table'})
        this.assignProject=page.getByRole('link', { name:'Assign Project'})
        this.statProj=page.getByRole('link', {name:'Project Status'})
        this.myProj=page.getByRole('link', {name:'My Projects'})
        this.appLeave=page.getByRole('link', {name:"Apply Leave"})
        this.empLeav=page.getByRole('link', {name:'Employee Leave'})
        this.empProf=page.getByRole('link', {name:"My Profile"})
        this.empLogoutButton=page.getByRole('link',{name:'Log Out'})
    }
    async employeeLink()
    {
        await this.addEmployeeLink.click()
    }
    async adminLogout()
    {
        await this.adminLogoutButton.click()
    }
    async viewEmployeeLink()
    {
        await this.viewEmpLink.click()
    }
    async salaryTable()
    {
        await this.salaryTab.click()
    }
    async assignProj()
    {
        await this.assignProject.click()
    }
    async statusProj()
    {
        await this.statProj.click()
    }
    async myProjLink()
    {
        await this.myProj.click()
    }
    async applyLeave()
    {
        await this.appLeave.click()
    }
    async empLeavLink()
    {
        await this.empLeav.click()
    }
    async empProfile()
    {
        await this.empProf.click()
    }
    async empLogout()
    {
      await this.empLogoutButton.click()
    }
}
export default homepage