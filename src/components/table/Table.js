import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { moveCursor, shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';
import {isCell} from './table.functions'
import {$} from '../../core/dom'
import {matrix} from './table.functions'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    rowsQuantity = 30

    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'keydown']
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    toHTML() {
        return createTable(this.rowsQuantity)
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) 
        {
          resizeHandler(this.$root, event)
        } else if (isCell(event))
        {
          const $target = $(event.target)
          if (event.shiftKey) 
          {
            const $cells = matrix($target, this.selection.current)
                .map(id => this.$root.find(`[data-id="${id}"]`))
            this.selection.selectGroup($cells)
          } else 
          {
            this.selection.select($target)
          }
        }
    }

    onKeydown(e)
    {
      if (isCell(e))
      {
        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
            moveCursor(e, this.$root, this.selection, 'row-', this.rowsQuantity, 25)
        }
        else if (e.keyCode == '40') {
            // down arrow
            moveCursor(e, this.$root, this.selection, 'row+', this.rowsQuantity, 25)
        }
        else if (e.keyCode == '37') {
          // left arrow
          moveCursor(e, this.$root, this.selection, 'col-', this.rowsQuantity, 25)
        }
        else if (e.keyCode == '39' || e.keyCode == '9') {
          // right arrow
          e.preventDefault()
          moveCursor(e, this.$root, this.selection, 'col+', this.rowsQuantity, 25)
        }
      }
      
    }
}



