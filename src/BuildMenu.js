'use strict'

import Utils from './Utils'

const BuildMenu = (function() {
    var _ = {
        depth: 2,

        imgTag: `<img src="/Responsive/images/buttons/grey_arrow.png"
                      alt="Navigation Buttton"
                      title="Navigation Button">`,


        buildTopDiv(id, title, href, pid, level, items = null) {
            if (!id) return ''

            const hasItems = (items !== null)? true : false

            return `
                <div id="${id}" class="accordion">
                    <div class="menu-item level-${level}" data-level="${level}">
                        <div class="arrowFormatting accordion-toggle-collapsed containSubMenu_" 
                                data-toggle="collapse" data-parent="${id}" href="#collapse${id}" pid="${pid}">
                            ${(hasItems)? _.imgTag : ''}
                        </div>
                        <div class="titleFormatting arrow-tag">
                            <a href="${href}">
                                <div class="menu-title">${title}</div>
                            </a>
                        </div>
                    </div>
                    <div id="collapse${id}" class="accordion-body collapse">
                        ${(hasItems)? _.buildSubLevel(items) : ''}
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
                if (!value) return

                const hasItems = (value.items)? true : false
                const containSubMenu = (hasItems)? 'containSubMenu_' : ''

                subMenu += `
                    <div id="${value.ItemId}" class="accordion">
                        <div class="menu-item level-${value.level}" data-level="${value.level}">
                            <div class="arrowFormatting accordion-toggle-collapsed ${containSubMenu}"
                                    data-toggle="collapse"
                                    ${(hasItems)? `data-parent="${value.ItemId}"` : ''}
                                    href="#collapse${value.ItemId}"
                                    pid="${value.pid}">
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
