import {$} from '../../core/dom'
import { Emitter } from '../../core/Emitter'
export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    render() {
        this.$el.append(this.getRoot())
        
        this.components.forEach(component => component.init())
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter
        }
        
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}
