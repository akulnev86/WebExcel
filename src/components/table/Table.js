import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import {$} from '../../core/dom'
import {CODES} from './table.template'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(30)
    }

    onMousedown(event) {
        const typeOfResize = event.target.dataset.resize
        if(typeOfResize)
        {
            console.log(typeOfResize)
            const $resizer = $(event.target)
            console.log('Event target = ', event.target)
            console.log('Event target dataset resize = ',
            event.target.dataset.resize)
            const $parent = $resizer.closest('[data-type="resizable"]')
            console.log('Parent', $parent)
            const coords = $parent.getCoords()
            console.log($parent.getCoords())
            document.onmousemove = e => {
                if(typeOfResize === 'row')
                {
                    const delta = e.pageY - coords.bottom
                    const value = coords.height + delta
                    $parent.$el.style.height = value + 'px'
                    console.log(delta)
                }
                else
                {
                    const delta = e.pageX - coords.right
                    const value = coords.width + delta
                    $parent.$el.style.width = value + 'px'
                    const cells = document.getElementsByClassName('cell')
                    console.log($parent.$el)
                    console.log(cells)
                    console.log(0, (CODES.Z - CODES.A))
                    const start = ($parent.$el.innerText.charCodeAt(0) - CODES.A)
                    console.log(cells.length - (CODES.Z - CODES.A) + start - 1)
                    for(let i = start;i <= cells.length - (CODES.Z - CODES.A) + start - 1;i += CODES.Z - CODES.A + 1)
                    {
                        cells[i].style.width = value + 'px'
                    }
                    console.log(start)
                    console.log(delta)
                }
                
            }

            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}

