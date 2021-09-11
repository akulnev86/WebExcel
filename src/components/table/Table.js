import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';
import {isCell} from './table.functions'
import {$} from '../../core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    toHTML() {
        return createTable(30)
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
    }

    onMousedown(event) {
        if(shouldResize(event))
        {
            resizeHandler(this.$root, event)
        }
        else if(isCell(event))
        {
            if(event.shiftKey)
            {
                const $target = $(event.target)
                this.selection.selectWithShift($target)
            }
            else if(!event.shiftKey)
            {
                const $target = $(event.target)
                this.selection.select($target)
            }
        }
        
    }
}

