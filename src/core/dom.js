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

    addClass(className) {
        this.$el.classList.add(className)
    }

    removeClass(className) {
        this.$el.classList.remove(className)
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