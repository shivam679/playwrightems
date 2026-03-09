class viewSalary
{
    constructor(page)
    {
     this.ID=page.locator('//table//tr/td[1]')
     this.totalSal=page.locator('//table//tr/td[5]')
     this.names=page.locator('//table//tr/td[2]')
     this.baseSal=page.locator('//table//tr/td[3]')
     this.bonus=page.locator('//table//tr/td[4]')
     this.E1Name=page.locator('//td[text()="John Smith"]')
}
async EID()
{
 return await this.ID.allTextContents()
}
async totalSalary()
{
 return await this.totalSal.allTextContents()
}
async Names()
{
 return await this.names.allTextContents()
}
async baseSalary()
{
 return await this.baseSal.allTextContents()
}
async Bonus()
{
 return await this.bonus.allTextContents()
}
}
export default viewSalary