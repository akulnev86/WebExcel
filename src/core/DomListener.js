import { TableSelection } from "../components/table/TableSelection"
import { capitalize } from "./utils"

export class DomListener {
    constructor($root, listeners = []){
        if(!$root)
        {
            throw new Error('No $root provided for DomListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners()
    {
        this.listeners.forEach(listener => {
            console.log(listener)
            const method = getMethodName(listener)
            console.log(listener)
            if(!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners()
    {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }

    removeDOMListenersBeta() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.removeBeta(listener, this[method])
        })
    }
}

//input => onInput
function  getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}