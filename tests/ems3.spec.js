import {test} from "@playwright/test"
import logindata from "../testData/emslogin.json"
import loginpage from "../POM/loginpage.page.js"
import homepage from "../POM/homepage.page.js"
import viewEmployeePage from "../POM/viewEmployeePage.page" 
test("Delete Employee", async({page})=>{
    let loginpage3=new loginpage(page)
    let home=new homepage(page)
    let deleteEmp=new viewEmployeePage(page)
    page.on("dialog", async(dialog)=>{
    console.log(await dialog.message())
    await dialog.accept()
  })
   for(let d of logindata.Valid){
   await page.goto(logindata.url)
   let password=d.pwd
   let email=d["email-id"] 
   await loginpage3.adminEmail(email)
   await loginpage3.adminPass(password)
   await loginpage3.adminLogButton()
   }
   await home.viewEmployeeLink()
   await deleteEmp.empDeleteButton.click()
   await deleteEmp.VerifyEmployee()
   await home.adminLogout()
   await page.waitForTimeout(2000)
})