import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.unsubscribers = []

        this.emitter = options.emitter

        this.prepare()
    }

    //Setting up our component before init
    prepare() {
        
    }

    //returns template of component
    toHTML() {
        return ''
    }
    //Initialize component
    //Add DOM Listener
    init() {
        this.initDOMListeners()
    }

    //Notify listeners about event
    $emit(event, ...args)
    {
        this.emitter.emit(event, ...args)
    }

    //Subscribe on event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    deleteBeta() {
        this.removeDOMListenersBeta()
    }

    //Delete component
    //Clean listeners
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
