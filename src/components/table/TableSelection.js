export class TableSelection {

    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    //$el instanceof DOM === true
    select($el) {
        this.clear()
        this.group.push($el)
        $el.focus().addClass('selected')
        this.current = $el
    }

    clear() {
        this.group.forEach($c => {
            $c.removeClass(TableSelection.className)
        })
        this.group = []
    }

    selectWithShift($el)
    {
        //console.log('First = ' + this.group[0].$el.getAttribute('data-id'))
        //console.log($el.$el)
        if(this.group.length > 0)
        {
            for(let i = 0;i < this.group.length;i++)
            {
                if(this.group[i].$el.getAttribute('data-id') === $el.$el.getAttribute('data-id'))
                {
                    //console.log($el.$el.getAttribute('data-id'))
                    this.group[i].removeClass(TableSelection.className)
                    this.group.splice(i, 1)
                    return
                }
            }
        }
        
        //this.group.find((g) => g.$el.getAttribute['data-id'].value === $el.getAttribute['data-id'].value)
        //console.log($els)
        this.group.push($el)
        $el.addClass('selected')
    }

    selectGroup($group = []) {
        this.clear()

        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }
}