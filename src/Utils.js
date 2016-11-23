'use strict'

import fs from 'fs'

const Utils = (function() {

    var _ = {
        *forOfGen(obj) {
            for (let key of Object.keys(obj)) {
                yield [key, obj[key]]
            }
        },

        objectLooper(obj, cb) {
            for (let [key, value] of _.forOfGen(obj)) {
                cb(key, value)
            }
        },

        readFileAsync(filename) {
            return new Promise((resolve, reject) => {
                fs.readFile(filename, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err)
                        throw err
                    }

                    resolve(data)
                })
            })
        }
    }

    return Object.freeze({
        loopObj: _.objectLooper,
        readFileAsync: _.readFileAsync
    })
})()



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


// for (let [key, value] of forOfGen(obj)) {

// }

// function* forOfGen(obj) {
//     for (let key of Object.keys(obj)) {
//         yield [key, obj[key]];
//     }
// }

export default Utils
