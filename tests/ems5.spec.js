import {expect, test} from "@playwright/test"
import logindata from "../testData/emslogin.json"
import loginpage from "../POM/loginpage.page.js"
import homepage from "../POM/homepage.page.js"
import data from "../testData/emsAssignProj.json"
import assignProjectPage from "../POM/assignProjPage.page.js"
import data2 from "../testData/emsEmplogin.json"
test("Assign Project", async({page})=>{
    let eID=data.EmpID
    let projectN=data.PName
    let dateAssign=data.Date
    let loginpage4=new loginpage(page)
    let home=new homepage(page) 
    let assignProj=new assignProjectPage(page)
    let empMail1=data2.EMAIL
    console.log(empMail1)
    let empPass1=data2.PASS
    console.log(empPass1)
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
   await home.assignProj()
   await assignProj.assignProjectEmp(eID, projectN, dateAssign)
   await page.waitForLoadState('domcontentloaded')
   let ProjectID=await page.locator(`//td[text()="${projectN}"]/preceding-sibling::td[2]`).first().innerText()
   console.log(ProjectID)
   await home.adminLogout()
   await page.waitForLoadState('domcontentloaded')
   await loginpage4.empLogin(empMail1, empPass1)
   await home.myProjLink()
   await page.locator(`//tr[td[text()="${ProjectID}"]]//a[text()="Submit"]`).click()
   await expect(page.locator(`//tr[td[text()="${ProjectID}"]]//td[text()="Submitted"]`)).toHaveText("Submitted")
   await home.adminLogout()
  })