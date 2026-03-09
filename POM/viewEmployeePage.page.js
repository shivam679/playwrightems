import { expect } from "@playwright/test"
import empData from "../testData/emsaddEmployee.json"
class viewEmployeePage
{
    constructor(page)
    {   
        let f_n=empData.First_Name
        let l_n=empData.Last_Name
        let fullname=f_n + " " + l_n
        this.empEditButton=page.getByRole('link', { name:'Edit'}).nth(1)
        this.empEditContact=page.locator('[name="contact"]')
        this.empEditAdd=page.locator('[name="address"]')
        this.empEditSubmit=page.getByRole('button', { name:'Submit'})
        this.VerifyEmp=page.locator("//td[text()='Shiva Kr']")
        this.empDeleteButton=page.getByRole('link', {name:'Delete'}).nth(3)
        this.viewEmp=page.locator(`//td[text()="${fullname}"]`)
    }
    async VerifyEmployee()
    {
        await expect(this.VerifyEmp).not.toBeVisible()
    }
    async viewEmployee()
    {
        await expect(this.viewEmp).toBeVisible()
    }
}
export default viewEmployeePage