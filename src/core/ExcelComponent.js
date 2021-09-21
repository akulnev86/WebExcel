import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''

        this.emitter = options.emitter

        this.prepare()
    }

    prepare() {
        
    }

    //returns template of component
    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners()
    }

    deleteBeta() {
        this.removeDOMListenersBeta()
    }

    destroy() {
        this.removeDOMListeners()
    }
}
