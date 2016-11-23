'use strict'

const BuildMenu = (function() {
    var _ = {
        level: '1',

        buildTopDiv(id, title, href, items = null) {
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
                        <!-- Sub Menu Items Go Here 
                             Use a method similar to this one to recursively build 
                             the items out 
                             subMenu() -->
                        ${(items === null)? '<span>No Sub Items</span>' : _.builLevel2(items)}
                    </div>
                </div>
            `
        },

        builLevel2(items) {
            console.log(items)
        }
    }

    return Object.freeze({
        buildLevel1: _.buildTopDiv
    })
})()

export default BuildMenu
