import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { nextSelector, shouldResize } from './table.functions';
import { TableSelection } from './TableSelection';
import {isCell} from './table.functions'
import {$} from '../../core/dom'
import {matrix} from './table.functions'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    rowsQuantity = 30

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
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
        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', text => {
          this.selection.current.text(text)
        })

        this.$on('formula:done', () => {
          this.selection.current.focus()
        })

        this.$subscribe( state => {
          console.log('TableState', state)
        } )
    }

    selectCell($cell)
    {
      this.selection.select($cell)
      this.$emit('table:select', $cell)
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
            this.selectCell($target)
          }
        }
    }

    onKeydown(event)
    {
      const keys = [
        'Enter', 
        'Tab', 
        'ArrowLeft', 
        'ArrowLeft',
        'ArrowRight', 
        'ArrowDown', 
        'ArrowUp']

      const {key} = event
      if( keys.includes(event.key) && !event.shiftKey )
      {
        event.preventDefault()
        const id = this.selection.current.id(true)
        const $next = this.$root.find(nextSelector(key, id))
        this.selectCell($next)
      }
    }

    onInput(event)
    {
      this.$emit('table:input', $(event.target))
    }
}


