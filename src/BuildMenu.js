'use strict'

import Utils from './Utils'

const BuildMenu = (function() {
    var _ = {
        depth: 2,

        buildTopDiv(id, title, href, items = null) {
            if (!id) return ''
            return `
                <div id="${id}" class="accordion">
                    <div class="menu-item level-1">
                        <div class="arrowFormatting accordion-toggle-collapsed containSubMenu_" 
                                data-toggle="collapse" data-parent="${id}" href="#collapse${id}">

                            <img src="/Responsive/images/buttons/grey_arrow.png"
                                 alt="Navigation Button" 
                                 title="Navigation Button">

                        </div>
                        <div class="titleFormatting arrow-tag">
                            <a href="${href}">
                                <div class="menu-title">${title}</div>
                            </a>
                        </div>
                    </div>
                    <div id="collapse${id}" class="accordion-body collapse">
                        ${(items === null)? '<span>No Sub Items</span>' : _.buildSubLevel(items)}
                    </div>
                </div>
            `
        },

        buildSubLevel(items) {
            if (!items) return ''

            let subMenu = ``
            const img = `<img src="/Responsive/images/buttons/grey_arrow.png"
                              alt="Navigation Buttton"
                              title="Navigation Button">`

            Utils.loopObj(items, (key, value) => {
                const nullItems = (value.items)? true : false

                subMenu += `
                    <div id="${value.ItemId}" class="accordion">
                        <div class="menu-item level-${_.depth.toString()}">
                            <div class="arrowFormatting accordion-toggle-collapsed"
                                    ${(nullItems)? '' : 
                                    `data-parent="${value.ItemIid}"`}
                                    data-href="#collapse${value.ItemId}">
                                ${(!nullItems)? img : '' }
                            </div>
                            <div class="titleFormatting arrow-tag">
                                <a href="${value.link}">
                                    <div class="menu-title">${value.title}</div>
                                </a>
                            </div>
                        </div>
                        <div id="collapse${value.ItemId}" class="accordion-body collapse">
                            ${(nullItems)? '' : _.depth++ && _.buildSubLevel(value.items)}
                        </div>
                    </div>
                `
                _.depth = 2
            })

            return subMenu
        }
    } 

    return Object.freeze({
        build: _.buildTopDiv
    })

}())

export default BuildMenu
