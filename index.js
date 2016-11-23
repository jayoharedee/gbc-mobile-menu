import fs from 'fs'
import fetch from 'fetch'

import SanitizeMenu from './SanitizeMenu'
import BuildMenu from './BuildMenu'
import Utils from './Utils'

const Sanitize = new SanitizeMenu()
const mobileJson = Sanitize.writeJson()

// const readFileAsync = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filename, 'utf-8', (err, data) => {
//             if (err) {
//                 reject(err)
//                 throw err
//             }

//             resolve(data)
//         })
//     })
// }

Utils.readFileAsync(mobileJson).then((data) => {
    let mobileJson = JSON.parse(data)





    Utils.loopObj(mobileJson, (key, value) => {
        const items = (value.items)? value.items : null

        BuildMenu.buildLevel1(
            value.ItemId, value.title, value.link, items
        )

    })




    // for (let [key, value] of entries(mobileJson)) {
    //     // console.log(value.ItemId, value.title, value.link, value.pid)
    //     const items = (value.items)? value.items : null

    //     // console.log(
    //     BuildMenu.buildLevel1(
    //         value.ItemId, value.title, value.link, items
    //     )
    //     // )
    // }
})

// using a generator function
// function* entries(obj) {
//     for (let key of Object.keys(obj)) {
//         yield [key, obj[key]];
//     }
// }
