let duplicateElem = document.getElementsByClassName('present-duplicates')
let totalElem = document.getElementsByClassName('total')
let errorElem = document.getElementsByClassName('error')


var elements = {
    _total: new Set(),
    get total() {
        return this._total
    },
    set total(all) {
        if (Array.isArray(all)) {
            this.duplicates = all.filter(data => this._total.has(data));
            all.forEach(data => {
                this._total.add(data)
            })

            if (totalElem) {
                totalElem[0].innerHTML = Array.from(this._total).join(', ');
            }
        }
    },
    set duplicates(duplicate) {
        if (duplicateElem) {
            duplicateElem[0].innerHTML = duplicate.join(', ')
        }
    },
    set error(str) {
        if (errorElem) {
            errorElem[0].innerHTML = "Errors : " + str
        }
    }
}

function calcDuplicate() {
    let output = [];
    let errors = [];
    let input = document.getElementById("input-field").value.split(",");

    for (let data of input) {
        data = data.trim();

        if (data.match(/^[0-9]+[\s]*[-][\s]*[0-9]+$/)) {
            try {
                output = output.concat(getNumbersInARange(data));
            } catch (error) {
                errors.push('Invalid Range : ' + data);
            }
        } else if (data.match(/^[0-9]+$/)) {
            _numData = Number(data);
            if (isNaN(_numData)) {
                errors.push('Invalid Number : ' + data);
            } else {
                output.push(_numData);
            }
        } else {
            errors.push('Invalid Number : ' + data);
        }
    }

    if(errors.length) {
        var err = '<ul>';
        err = err + errors.map(errmsg => '<li>' + errmsg + '</li>')
        err = err+'</ul>';

        elements.error = err;
    } else {
        elements.total = output;
    }

}

function getNumbersInARange(range) {
    let _range = range.split('-').map(data => String(data).trim()).map(Number);
    let output = [];

    if (isNaN(_range[0]) || isNaN(_range[1]) || _range[0] > _range[1]) {
        throw new Error('INVALID_RANGE');
    }

    for (let i = _range[0]; i <= _range[1]; i++) {
        output.push(i);
    }

    return output;
}