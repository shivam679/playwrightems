import {expect, test} from "@playwright/test"
import logindata from "../testData/emslogin.json"
import loginpage from "../POM/loginpage.page.js"
import datas from "../testData/emsaddEmployee.json"
import homepage from "../POM/homepage.page.js"
import addEmployeePage from "../POM/addEmployeePage.page.js"
import viewEmployeePage from "../POM/viewEmployeePage.page.js"
import assignProjectPage from "../POM/assignProjPage.page.js"
import assignProjData from "../testData/emsAssignProj.json"
import viewSalary from "../POM/viewSalaryPage.page.js"
test("Admin Daily Activity", async({page})=>{
    let firstname=datas.First_Name
    let lastname=datas.Last_Name
    let empEmail=datas.Email
    let dob=datas.DOB
    let ContactN=datas.CN
    let nid=datas.NID
    let address=datas.Add
    let dept=datas.Dept
    let degree=datas.Degree
    let sal=datas.Salary
    let projectN=assignProjData.PName
    let dateAssign=assignProjData.Date
   let loginpage7=new loginpage(page)
   let home=new homepage(page)
   let addEmployee=new addEmployeePage(page)
   let viewEmp=new viewEmployeePage(page)
   let assignProj=new assignProjectPage(page)
   let viewsalary=new viewSalary(page)
   page.on("dialog", async(dialog)=>{
   console.log(await dialog.message())
    await dialog.accept()
   })
   for(let d of logindata.Valid){
   let Url=logindata.url
   let password=d.pwd
   let email=d["email-id"] 
   await page.goto(Url)
   await loginpage7.adminEmail(email)
   await loginpage7.adminPass(password)
   await loginpage7.adminLogButton()
   }
    await home.employeeLink()
    await page.waitForLoadState('domcontentloaded')
    await addEmployee.addEmp(firstname, lastname, empEmail, dob, ContactN, nid, address, dept, degree, sal)  
    await home.viewEmployeeLink()
    await viewEmp.viewEmployee()
    let empid=await page.locator(`//td[text()="${ContactN}"]/../td[1]`).innerText()
    console.log(empid)
    await home.assignProj()
    await assignProj.assignProjectEmp(empid, projectN, dateAssign)
    await page.waitForLoadState('domcontentloaded')
    await home.salaryTable()
    let salary=await page.locator(`//td[text()="${empid}"]/../td[5]`).innerText()
    console.log(salary)
    await home.adminLogout()
    await page.waitForSelector('//input[@name="mailuid"]', {
    state: 'attached',
    timeout: 6000
})
})