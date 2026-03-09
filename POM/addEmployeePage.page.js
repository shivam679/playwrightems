class addEmployeePage
{
    constructor(page)
    {
        this.addEmpFN=page.locator('//input[@name="firstName"]')
        this.addEmpLN=page.getByRole('textbox', { name: 'Last Name' })
        this.addEmpETF=page.getByRole('textbox', { name: 'Email' })
        this.addEmpDOB=page.locator('[name="birthday"]')
        this.addEmpGen=page.locator('[name="gender"]')
        this.addEmpContact=page.getByPlaceholder('Contact Number')
        this.addEmpNID=page.getByPlaceholder('NID')
        this.addEmpAdd=page.getByRole('textbox', { name: 'Address'})
        this.addEmpDept=page.getByRole('textbox', { name:'Department'})
        this.addEmpDegree=page.getByRole('textbox', { name:'Degree'})
        this.addEmpSal=page.locator('[name="salary"]')
        this.addEmpDoc=page.locator('[type="file"]')
        this.addEmpSubmit=page.getByRole('button', { name:'Submit'})
    }
    async addEmp(firstname, lastname, empEmail, dob, cn, nid, address, dept, degree, sal)
    {
        await this.addEmpFN.fill(firstname)
        await this.addEmpLN.fill(lastname)
        await this.addEmpETF.fill(empEmail)
        await this.addEmpDOB.fill(dob)
        await this.addEmpGen.selectOption({value:'Male'})
        await this.addEmpContact.fill(cn)
        await this.addEmpNID.fill(nid)
        await this.addEmpAdd.fill(address) 
        await this.addEmpDept.fill(dept) 
        await this.addEmpDegree.fill(degree) 
        await this.addEmpSal.fill(sal)
        await this.addEmpDoc.setInputFiles("c:/Users/Hp/Downloads/Resume_Shivam.docx")
        await this.addEmpSubmit.click() 
    }
}
export default addEmployeePage