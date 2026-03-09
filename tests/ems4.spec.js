import {test, expect} from "@playwright/test"
import logindata from "../testData/emslogin.json"
import loginpage  from "../POM/loginpage.page.js"
import homepage from "../POM/homepage.page.js"
import viewSalary from "../POM/viewSalaryPage.page.js"
test("Employees Salary", async({page})=>{
    let loginpage4=new loginpage(page)
    let home=new homepage(page) 
    let salTable=new viewSalary(page)
    page.on("dialog", async(dialog)=>{
    console.log(await dialog.message())
    await dialog.accept()
  })
   for(let d of logindata.Valid){
   await page.goto(logindata.url)
   let password=d.pwd
   let email=d["email-id"] 
   await loginpage4.adminEmail(email)
   await loginpage4.adminPass(password)
   await loginpage4.adminLogButton()
   }
    await home.salaryTable()
    await expect(salTable.E1Name).toBeVisible()
    let EmpID=await salTable.EID()
    let Empnames=await salTable.totalSalary() 
    let tSal=await salTable.Names()
    let bSal=await salTable.baseSalary()
    let b=await salTable.Bonus()
    for(let i=0;i<EmpID.length;i++)
    {
     console.log(`ID:${EmpID[i]} || ${Empnames[i]} || Total Sal:${tSal[i]} || Base Sal:${bSal[i]} || Bonus:${b[i]} `)
    }
    await page.waitFor()
    await home.adminLogout()
})