import Menu from './Menu'
import Utils from './Utils'

import { writeFileSync } from 'fs'

class SanitizeMenu extends Menu {
    unpackObj(obj) {
        if (obj === null) return

        let {
            ItemId: i,
            ItemTitle: t,
            ItemLink: h,
            ItemLevel: level,
            ItemIdString: idString
        } = obj

        if (obj.hasOwnProperty('Menu')) { 
            var {
                Menu: {
                    Menu: menu,
                    Item: items,
                    Link: l,
                    ParentId: pid
                }
            } = obj

            if(items !== undefined && items.hasOwnProperty('Menu')) {
                items['items'] = this.unpackObj(items)
            }
        }

        // Ektron sometimes uses a variation in keys for a menu's href
        // either ItemLink or just Link. This ternary solves that dilemna
        const alias = (!h?l:h)


        // For some reason the Ektron XML does not include a parent ID
        // Instead, the parent ID can be parsed from the ItemIdString prop
        // The parent is always the second element when splitting the string
        // at every _
        if (pid === undefined) {
            pid = idString.split('_')[2]
        }


        let menuObj =  {
            ItemId: i,
            title: t,
            link: alias,
            items: items,
            pid: pid,
            menu: menu,
            level: level
        }

        return menuObj
    }

    makeTree(categories) {
        if (categories === undefined) return

        let node = {}

        categories
            .forEach(c => {
                // prepending _ so keys are not sorted numerically
                const key = `_${c.ItemId}` 

                // first menu node
                node[key] = this.unpackObj(c)

                // subitems
                let items = node[key].items
                if (!items) return

                if (Array.isArray(items) && items !== undefined) {
                    let subItems = this.makeTree(items)
                    node[key].items = subItems
                } else {
                    let subItems = this.unpackObj(items)

                    // key for submenu items. Prepended _ so the sort is not 
                    // numerical as all keys are numbered ID's
                    const subKey = '_' + subItems.ItemId

                    node[key].items = {}
                    node[key].items[subKey] = subItems
                }
            })

        return node
    }
}

export default SanitizeMenu
