import {test} from "@playwright/test"
import logindata from "../testData/emslogin.json"
import loginpage from "../POM/loginpage.page.js" 
import homepage from "../POM/homepage.page.js"
import viewEmployeePage from "../POM/viewEmployeePage.page.js"
import newData from "../testData/emseditEmployee.json"
test("View Employee", async({page})=>{
 let loginpage2=new loginpage(page)
 let home=new homepage(page)
 let updateEmp=new viewEmployeePage(page)
 let newContact=newData["New CN"]
 let newAdd=newData["New Add"]
  page.on("dialog", async(dialog)=>{
   console.log(await dialog.message())
    await dialog.accept()
  })
  for(let d of logindata.Valid){
   await page.goto(logindata.url)
   let password=d.pwd
   let email=d["email-id"] 
   await loginpage2.adminEmail(email)
   await loginpage2.adminPass(password)
   await loginpage2.adminLogButton()
   }
   await page.waitForTimeout(2000)
   await home.viewEmployeeLink()
   await page.waitForTimeout(2000) 
   await updateEmp.empEditButton.click()
   await page.waitForTimeout(2000)
   await updateEmp.empEditContact.fill(newContact)
   await page.waitForTimeout(2000)
   await updateEmp.empEditAdd.fill(newAdd)
   await page.waitForTimeout(2000)
   await updateEmp.empEditSubmit.click()
   await home.adminLogout()
})