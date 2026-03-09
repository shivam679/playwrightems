class loginpage
{
    constructor(page)
    {   this.adminLogin=page.getByRole('link', {name:"Admin Login"})
        this.adminEmailTF=page.locator('//input[@name="mailuid"]')
        this.adminPassTF=page.locator('//input[@name="pwd"]')
        this.adminLoginButton=page.locator('//input[@name="login-submit"]')
        this.empLoginLink=page.getByRole('link', {name:'Employee Login'})
        this.empEmailTF=page.locator('//input[@name="mailuid"]')
        this.empPassTF=page.locator('//input[@name="pwd"]')
        this.empLoginButton=page.locator('//input[@name="login-submit"]')
    }
    async adminLoginLink()
    {
        await this.adminLogin.click()
    }
    async adminEmail(adminemailID){
     await this.adminEmailTF.fill(adminemailID);
    }
    async adminPass(adminPwd){
     await this.adminPassTF.fill(adminPwd)
    }
    async adminLogButton(){
     await this.adminLoginButton.click()
    }
    async empLogin(empMail, empPass){
        await this.empLoginLink.click()
        await this.empEmailTF.fill(empMail)
        await this.empPassTF.fill(empPass)
        await this.empLoginButton.click()
    }
    }
export default loginpage