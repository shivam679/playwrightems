import {test, expect} from "@playwright/test"
import logindata from "../testData/emsEmplogin.json"
import loginpage from "../POM/loginpage.page.js"
import homepage  from "../POM/homepage.page.js"
import updatePage from "../POM/empUpdatePage.page.js"
import updateData from "../testData/updateEmpPage.page.json"
test("Profile Update", async({page})=>
{ 
    let url=logindata.URL
    let emailid=logindata.EMAIL
    let password=logindata.PASS
    let newContact=updateData.CN
    let newAdd=updateData.ADDRESS
    let loginpage6=new loginpage(page)
    let home=new homepage(page)
    let updateProf=new updatePage(page)
    page.on("dialog", async(dialog)=>{
    console.log(await dialog.message())
    await dialog.accept()
    })
    await page.goto(url)
    await loginpage6.empLogin(emailid, password)
    await home.empProfile()
    await updateProf.updateInfo(page, newContact, newAdd) 
    const locator = updateProf.updateCont
    await expect(locator).toBeEnabled()
    await home.empLogout()
    await page.waitForTimeout(2000)
    
})