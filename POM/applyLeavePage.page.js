class leavePage
{
    constructor(page)
    {
        this.liveReason=page.getByPlaceholder('Reason')
        this.startDate=page.locator('//input[@name="start"]')
        this.endDate=page.locator('//input[@name="end"]')
        this.leaveSubmit=page.getByRole('button', {name:'Submit'})
    }
    async applyingLeave(Reason, Start, End)
    {
        await this.liveReason.fill(Reason)
        await this.startDate.fill(Start)
        await this.endDate.fill(End)
        await this.leaveSubmit.click()
    }
}
export default leavePage