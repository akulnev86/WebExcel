class Dom {
    constructor(selector) {
        //#app
        this.$el = typeof selector === 'string' ?
        document.querySelector(selector) : selector
    }

    html(html) {
        if(typeof html === 'string')
        {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHtml.trim()
    }

    text(text)
    {
        if(typeof text === 'string')
        {
            this.$el.textContent = text
            return this
        }
        if(this.$el.tagName.toLowerCase() === 'input')
        {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    removeBeta(eventType, callback)
    {
        this.$el.removeEventListener(eventType, callback)
    }

    off(eventType, callback)
    {
        this.$el.removeEventListener(eventType, callback)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    //Elememnt
    append(node) {
        if(node instanceof Dom) {
            node = node.$el
        }
        if(Element.prototype.append) {
            this.$el.append(node)
        }
        else {
            this.$el.appendChild(node)
        }
        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    get data() {
        return this.$el.dataset
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    /*
        {
            height: '30px',
            width: '42px',
            backgroundColor: red
        }
    */
    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
            //console.log(this.$el.style[key])
        })
    }

    id(parse)
    {
        if(parse)
        {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    focus()
    {
        this.$el.focus()
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }
}

//event.target
export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if(classes) {
        el.classList.add(classes)
    }

    return $(el)
}