class updatePage
{
    constructor(page)
    {
        this.updateButton=page.getByRole('button', {name:'Update Info'})
        this.updateCont=page.locator('//input[@name="contact"]')
        this.updateAdd=page.locator('//input[@name="address"]')
        this.updateSubmit=page.getByRole('button', {name:'Submit'})
    }
    async updateInfo(page, newContact, newAdd)
    {
        await this.updateButton.click()
        await this.updateCont.click()
        await page.keyboard.press('Control+A')
        await page.keyboard.press('Backspace')
        await page.keyboard.type(newContact)
        await this.updateAdd.click()
        await page.keyboard.press('Control+A')
        await page.keyboard.press('Backspace')
        await page.keyboard.insertText(newAdd)
        await this.updateSubmit.click()
    }
}
export default updatePage