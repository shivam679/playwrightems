import {expect, test} from "@playwright/test"
import logindata from "../testData/emsEmplogin.json"
import loginpage from "../POM/loginpage.page.js"
import homepage  from "../POM/homepage.page.js"
import updatePage from "../POM/empUpdatePage.page.js"
import updateData from "../testData/updateEmpPage.page.json"
import adminLoginData from "../testData/emslogin.json"
import assignProjData from "../testData/emsAssignProj.json"
import assignProjectPage from "../POM/assignProjPage.page.js"
import addEmpData from "../testData/emsaddEmployee.json"
import addEmployeePage from "../POM/addEmployeePage.page.js"
import ProjectsPage from "../POM/statProjectsPage.page.js"
import myProjectsPage from "../POM/myProjectsPage.page.js"
import leavePage from "../POM/applyLeavePage.page.js"
import leaveData from "../testData/emsApplyLeave.json"
import addEmployeeData from "../testData/emsaddEmployee.json"
test("Employee Daily Activity", async({page})=>{
    let url=logindata.URL
    let emailid=logindata.EMAIL
    let password=logindata.PASS
    let newContact=updateData.CN
    let newAdd=updateData.ADDRESS
    let projname=assignProjData.PName2
    let assigndate=assignProjData.Date2
    let gmailid=addEmpData.Email
    let home=new homepage(page)
    let loginpage8=new loginpage(page)
    let addemp=new addEmployeePage(page)
    let projAssign=new assignProjectPage(page)
    let updateProf=new updatePage(page)
    let Projects=new ProjectsPage(page)
    let myProjects=new myProjectsPage(page)
    let leave=new leavePage(page)
    let reason=leaveData.REASON1
    let startdate=leaveData["START-DATE1"]
    let enddate=leaveData["END-DATE1"]
    let f_n=addEmployeeData.First_Name
    let l_n=addEmployeeData.Last_Name
    let fullname=f_n + " " + l_n
    let eid=assignProjData.EmpID
    page.on("dialog", async(dialog)=>{
    console.log(await dialog.message())
    await dialog.accept()
    })
    await page.goto(url)
    await loginpage8.empLogin(emailid, password)
    await home.empProfile()
    await updateProf.updateInfo(page, newContact, newAdd) 
    const locator = updateProf.updateCont
    await expect(locator).toHaveValue('7481926755')
    await home.empLogout()
    for(let d of adminLoginData.Valid){
   let Url=adminLoginData.url
   let password=d.pwd
   let email=d["email-id"] 
   await page.goto(Url)
   await loginpage8.adminEmail(email)
   await loginpage8.adminPass(password)
   await loginpage8.adminLogButton()
   }
   await home.viewEmployeeLink()
   //let EmpID=await page.locator(`//td[text()='${gmailid}']/preceding-sibling::td[3]`).innerText()
   let EmployeeID=await Projects.empID()
   console.log(EmployeeID)
   await home.assignProj()
   await projAssign.assignProjectEmp(EmployeeID, projname, assigndate) 
   await home.statusProj()
   //let ProjectID=await page.locator(`//td[text()="${EmpID}"]/preceding-sibling::td`).innerText()
   let projectID=await Projects.ProjectID()
   console.log(projectID)
   await home.adminLogout()
   await loginpage8.empLogin(emailid, password)
   await home.myProjLink()
   await myProjects.submitEmpProj(projectID)
   await home.applyLeave()
   await leave.applyingLeave(reason, startdate, enddate)
   await home.empLogout()
   for(let d of adminLoginData.Valid){
   let Url=adminLoginData.url
   let password=d.pwd
   let email=d["email-id"] 
   await page.goto(Url)
   await loginpage8.adminEmail(email)
   await loginpage8.adminPass(password)
   await loginpage8.adminLogButton()
   }
   await home.empLeavLink()
   let Token=await page.locator(`(//td[text()='${EmployeeID}'])/ancestor::tr//td[text()='${fullname}']/preceding-sibling::td[1]`).last().innerText()
   console.log(Token)
   await page.locator(`(//td[text()="${Token}"])/..//a[text()="Approve"]`).click()
   await page.waitForLoadState('load')
   expect(await page.locator(`//td[text()="${token}"]/following-sibling::td[text()="Approved"]`)).toHaveText("Approved")
   await home.adminLogout()
})