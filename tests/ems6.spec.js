import {expect, test} from "@playwright/test"
import logindata from "../testData/emslogin.json"
import loginpage from "../POM/loginpage.page.js"
import emplogin from "../testData/emsEmplogin.json"
import homepage from "../POM/homepage.page.js"
import leaveData from "../testData/emsApplyLeave.json"
import leavePage from "../POM/applyLeavePage.page.js"
import addEmployeeData from "../testData/emsaddEmployee.json"
import assignProjData from "../testData/emsAssignProj.json"
test("Employee Leave", async({page})=>{
    let Url=emplogin.URL
    let Pass=emplogin.PASS
    let Email=emplogin.EMAIL 
    let Reason=leaveData.REASON
    let Start=leaveData["START-DATE"]
    let End=leaveData["END-DATE"] 
    let f_n=addEmployeeData.First_Name
    let l_n=addEmployeeData.Last_Name
    let fullname=f_n + " " + l_n
    let eid=assignProjData.EmpID
    let loginpage5=new loginpage(page)
    let home=new homepage(page)
    let LeaveP=new leavePage(page)
    page.on("dialog", async(dialog)=>{
    console.log(await dialog.message())
    await dialog.accept()
    })
   await page.goto(Url)
   await loginpage5.empLogin(Email, Pass)
   await home.applyLeave()
   await page.waitForSelector('//button[@type="submit"]')
   await LeaveP.applyingLeave(Reason, Start, End)
   await home.empLogout()
   await loginpage5.adminLoginLink()
   for(let d of logindata.Valid){
   await page.goto(logindata.url)
   let password=d.pwd
   let email=d["email-id"] 
   await loginpage5.adminEmail(email)
   await loginpage5.adminPass(password)
   await loginpage5.adminLogButton()
   }
   await home.empLeavLink()
   let token=await page.locator(`(//td[text()='${eid}'])/ancestor::tr//td[text()='${fullname}']/preceding-sibling::td[1]`).last().innerText()
   console.log(token)
   await page.locator(`(//td[text()="${token}"])/..//a[text()="Approve"]`).click()
   expect(await page.locator(`//td[text()="${token}"]/following-sibling::td[text()="Approved"]`)).toHaveText("Approved")
   await home.adminLogout()
})