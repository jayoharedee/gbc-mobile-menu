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
                const hasItems = (value.items)? true : false
                const containSubMenu = (hasItems)? 'containSubMenu_' : ''

                subMenu += `
                    <div id="${value.ItemId}" class="accordion">
                        <div class="menu-item level-${_.depth.toString()}">
                            <div class="arrowFormatting accordion-toggle-collapsed ${containSubMenu}"
                                    data-toggle="collapse"
                                    ${(hasItems)? `data-parent="${value.ItemId}"` : ''}
                                    href="#collapse${value.ItemId}">
                                ${(hasItems)? img : '' }
                            </div>
                            <div class="titleFormatting arrow-tag">
                                <a href="${value.link}">
                                    <div class="menu-title">${value.title}</div>
                                </a>
                            </div>
                        </div>
                        <div id="collapse${value.ItemId}" class="accordion-body collapse">
                            ${(hasItems)? _.depth++ && _.buildSubLevel(value.items) : ''}
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
