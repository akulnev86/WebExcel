import {range} from '../../core/utils'
import {$} from '../../core/dom'

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)
  
    return cols.reduce((acc, col) => {
      rows.forEach(row => acc.push(`${row}:${col}`))
      return acc
    }, [])
  }

  export function moveCursor(e, $root, selection, direction, rowsQuantity, colsQuantity) 
  {
    const $target = $(e.target)
    const s = $target.$el.getAttribute('data-id').trim()
    const colAndRow = s.split(':')
    //console.log(colAndRow)
    if(direction === 'row-')
    {
      colAndRow[0]--;
    }
    else if(direction === 'row+')
    {
      colAndRow[0]++
    }
    else if(direction === 'col-')
    {
      colAndRow[1]--
    }
    else if(direction === 'col+')
    {
      colAndRow[1]++
    }
    if(  colAndRow[0] < 0 
      || colAndRow > rowsQuantity 
      || colAndRow[1] < 0 
      || colAndRow[1] > colsQuantity  )
    {
      return
    }
    //console.log(colAndRow)
    const str = `${colAndRow[0]}:${colAndRow[1]}`
    const $current = $root.find( `[data-id="${str}"]` )
    selection.select($current)
    //console.log( document.getElementsByClassName("selected")[0] );
    //console.log($current.$el['outerHTML'])
    $current.$el.focus()
    //document.getElementsByClassName('selected')[0].focus()
  }

export function nextSelector(key, {col, row})
{
  const MIN_VALUE = 0
  switch(key)
  {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    
  }

  return `[data-id="${row}:${col}"]`
}