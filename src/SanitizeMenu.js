import Menu from './Menu'

class SanitizeMenu extends Menu {
    unpackObj(obj) {
        if (obj === null) return

        let {
            ItemId: i,
            ItemTitle: t,
            ItemLink: h,
            ItemLevel: level
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

        return {
            ItemId: i,
            title: t,
            link: (!h?l:h),
            items: items,
            pid: pid,
            menu: menu,
            level: level
        }

    }

    makeTree(categories) {
        if (categories === undefined) return

        let node = {}

        categories
            .forEach(c => {
                // first menu node
                node[c.ItemId] = this.unpackObj(c)

                // subitems
                let items = node[c.ItemId].items
                if (!items) return

                if (Array.isArray(items) && items !== undefined) {
                    let subItems = this.makeTree(items)
                    node[c.ItemId].items = subItems
                } else {
                    let subItems = this.unpackObj(items)

                    node[c.ItemId].items = {}
                    node[c.ItemId].items[subItems.ItemId] = subItems
                }
            })

        return node
    }
}

export default SanitizeMenu
