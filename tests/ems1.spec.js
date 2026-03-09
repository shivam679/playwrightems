import {test} from "@playwright/test"
import data from "../testData/emslogin.json"
import loginpage from "../POM/loginpage.page.js"
import homepage from "../POM/homepage.page.js"
import datas from "../testData/emsaddEmployee.json"
import addEmployeePage from "../POM/addEmployeePage.page.js"
//Functional->Login
test.describe("Admin Login",()=>{
    let url1=data.url
    test("Admin Email", async({page})=>{
    let loginpage1=new loginpage(page)
    for(let d of data.Valid){
        let email=d["email-id"]
        await page.goto(url1)
        await loginpage1.adminEmail(email)
    }
    for(let d of data.Invalid){
        let email=d["email-id"]
        await page.goto(url1)
        await loginpage1.adminEmail(email)
     }
})  
    test("Admin Password", async({page})=>{
     let loginpage1=new loginpage(page)
     for(let d of data.Valid){
        let password=d.pwd
        await page.goto(url1)
        await loginpage1.adminPass(password)
     }
     for(let d of data.Invalid){
        let password=d.pwd
        await page.goto(url1)
        await loginpage1.adminPass(password)
     }
})  
    test("Admin Login Button", async({browser})=>{
        let context=await browser.newContext()
        let page=await context.newPage()
        page.on("dialog", async(dialog)=>{
        console.log(await dialog.message())
        await dialog.accept()
    })
        let loginpage1=new loginpage(page)
        for(let d of data.Valid){
         await page.goto(url1)
         let password=d.pwd
         let email=d["email-id"]
         await loginpage1.adminEmail(email)
         await loginpage1.adminPass(password)
         await loginpage1.adminLogButton()
        }
        for(let d of data.ValInval){
         let password=d.pwd
         let email=d["email-id"]
         await page.goto(url1)
         await loginpage1.adminEmail(email)
         await loginpage1.adminPass(password)
         await loginpage1.adminLogButton()
        }
        for(let d of data.Invalid){
         let password=d.pwd
         let email=d["email-id"] 
         await loginpage1.adminEmail(email)
         await loginpage1.adminPass(password)
         await loginpage1.adminLogButton()
        }
        await page.close()
    })
})
//End To End - Login->Add Employee -> Logout
    test.only("Add Employee", async({page})=>{
        let loginpage1 = new loginpage(page)
        let home=new homepage(page)
        page.on("dialog", async(dialog)=>{
         console.log(await dialog.message())
         await dialog.accept()
     })
        for(let d of data.Valid){
         await page.goto(data.url)
         let password=d.pwd
         let email=d["email-id"] 
         await loginpage1.adminEmail(email)
         await loginpage1.adminPass(password)
         await loginpage1.adminLogButton()
        }
        await home.employeeLink()
        await page.waitForLoadState('load')
        await page.waitForTimeout(2000)
        let addEmployee=new addEmployeePage(page)
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
        await addEmployee.addEmp(firstname, lastname, empEmail, dob, ContactN, nid, address, dept, degree, sal)
        await home.adminLogout()
        await page.waitForTimeout(4000)  
    })