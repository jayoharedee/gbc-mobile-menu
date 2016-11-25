import { writeFileSync } from 'fs'
import posthtml from 'posthtml'
import beautify from 'posthtml-beautify'
import fetch from 'fetch'

import SanitizeMenu from './src/SanitizeMenu'
import BuildMenu from './src/BuildMenu'
import Utils from './src/Utils'

const Sanitize = new SanitizeMenu()
const mobileJson = Sanitize.writeJson()

Utils
    .readFileAsync(mobileJson)
    .then(data => {
        let mobileJson = JSON.parse(data)
        let menuHtml = ''

        Utils.loopObj(mobileJson, (key, value) => {
            const items = (value.items)? value.items : null

            // Builds an HTML string containing the mobile menu
            menuHtml += BuildMenu.build(value.ItemId, value.title, value.link, value.pid, value.level, items)
        })
        
        return menuHtml
    })
    .then(html => {
        // HTML beautifier
        // will also create a minifier TODO: <--- that
        posthtml()
            .use(beautify({rules: {indent: 4}}))
            .process(html)
            .then(result => {
                writeFileSync('mobile-menu.html', result.html)
            })
    })

