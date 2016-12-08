'use strict'

import fs from 'fs'
import https from 'https'

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
        },

        getIdByAlias(alias) {
            const postData = JSON.stringify({alias: alias})
            let contentId = 'a'

            const postOptions = {
                hostname: 'dmzcms12u.georgebrown.ca',
                port: '443',
                path: '/_sand/jordan/webHandlers/WebServices.aspx/GetContentId',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }

            const postReq = https.request(postOptions, (response) => {
                response.setEncoding('utf8')

                response
                    .on('data', (chunk) => {
                        const jsonResponse = JSON.parse(chunk)

                        if (!jsonResponse.hasOwnProperty('d')) {
                            return
                        }

                        const json = JSON.parse(chunk).d
                        const id = JSON.parse(json).id

                        if (id > 0 && parseInt(id)) {
                            contentId = id
                        }
                    })
                    .on('error', (err) => {
                        console.error('error retrieving POST:', err)
                    })
                    .on('end', response => {
                        contentId = response
                    })
            })

            postReq.write(postData)
            postReq.end()

            return contentId
        }
    }

    return Object.freeze({
        loopObj: _.objectLooper,
        readFileAsync: _.readFileAsync,
        getIdByAlias: _.getIdByAlias
    })
}())

export default Utils
