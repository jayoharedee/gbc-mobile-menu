import fs from 'fs'

class Menu {
    constructor() {
        this.MOBILE_MENU_JSON = 'mobile-menu.json'
        this.EKTRON_MENU_JSON = 'menu.json'
    }

    parseMenuJson() {
        let menuJson = fs.readFileSync(this.EKTRON_MENU_JSON, 'utf-8')
        return JSON.parse(menuJson)[0].MenuDataResult.Item.Item
    }

    writeJson() {
        const menuJson = this.parseMenuJson()
        
        const node = this.makeTree(menuJson)
        const jsonOutput = JSON.stringify(node, null, 4)
        
        fs.writeFile(this.MOBILE_MENU_JSON, jsonOutput)

        return this.MOBILE_MENU_JSON
    }
}

export default Menu
