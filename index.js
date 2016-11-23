import fs from 'fs'
import fetch from 'fetch'

import SanitizeMenu from './src/SanitizeMenu'
import BuildMenu from './src/BuildMenu'
import Utils from './src/Utils'

const Sanitize = new SanitizeMenu()
const mobileJson = Sanitize.writeJson()

Utils.readFileAsync(mobileJson).then((data) => {
    let mobileJson = JSON.parse(data)

    Utils.loopObj(mobileJson, (key, value) => {
        const items = (value.items)? value.items : null

        BuildMenu.buildLevel1(
            value.ItemId, value.title, value.link, items
        )

    })
})
