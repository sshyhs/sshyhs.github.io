const meta1 = [
        {
            code: 1,
            name: "1인분"
        },
        {
            code: 2,
            name: "1.5인분"
        },
        {
            code: 3,
            name: "2인분"
        }
    ]
const meta2 = [
        {
            code: 1,
            name: "60도"
        },
        {
            code: 2,
            name: "90도"
        }
    ]
const meta3 = [
        {
            code: 1,
            name: "0도"
        },
        {
            code: 2,
            name: "90도"
        },
        {
            code: 3,
            name: "180도"
        },
        {
            code: 4,
            name: "270도"
        }
    ]
const meta4 = [
        {
            code: 1,
            name: "흰색계열"
        },
        {
            code: 2,
            name: "블루계열"
        },
        {
            code: 3,
            name: "검정계열"
        },
        {
            code: 4,
            name: "핑크계열"
        }
    ]
const meta5 = [
        {
            code: 1,
            name: "멜라민"
        },
        {
            code: 2,
            name: "무광도자기"
        },
        {
            code: 3,
            name: "유광도자기"
        }
    ]
const meta6 = [
        {
            code: 1,
            name: "500lux"
        },
        {
            code: 2,
            name: "750lux"
        },
        {
            code: 3,
            name: "1000lux"
        },
        {
            code: 4,
            name: "1250lux"
        }
    ]

function genRow(fileName, foodName, foodCode, quantity, angle1, angle2, color, material, lux) {
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    td1.textContent = fileName
    const td2 = document.createElement('td')
    td2.textContent = foodName
    const td3 = document.createElement('td')
    td3.textContent = foodCode
    const td4 = document.createElement('td')
    td4.textContent = quantity
    const td5 = document.createElement('td')
    td5.textContent = angle1
    const td6 = document.createElement('td')
    td6.textContent = angle2
    const td7 = document.createElement('td')
    td7.textContent = color
    const td8 = document.createElement('td')
    td8.textContent = material
    const td9 = document.createElement('td')
    td9.textContent = lux

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)
    tr.appendChild(td8)
    tr.appendChild(td9)

    return tr
}

const table = document.querySelector('table')
const form = document.querySelector("form")

function ExportExcel() {
    const formData = new FormData(form)
    const fileName = formData.get("food-name")
    var elt = document.getElementById('data-table');
    console.log(elt)
    var wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
    return XLSX.writeFile(wb, `${fileName}.xlsx`);

}



form.onsubmit = (ev) => {
    ev.preventDefault()
    const formData = new FormData(ev.target)
    const foodName = formData.get("food-name")
    const foodCode = formData.get("code")
    const colorOpt = formData.get('colorOpt')
    let new_meta4

    const legacy_tbody = document.querySelector('tbody')
    if (legacy_tbody) {
        table.removeChild(legacy_tbody)
    }


    if (colorOpt == 1) {
        new_meta4 = meta4.filter(item => item.code != 4)
    } else if (colorOpt == 2) {
        new_meta4 = meta4.filter(item => item.code != 3)
    } else if (colorOpt == 3) {
        new_meta4 = meta4.filter(item => item.code != 1)
    } else {
        return
    }
    console.log(new_meta4)

    const tbody = document.createElement('tbody')

    let num = 1
    for (const _1st of meta1) {
        for (const _2nd of meta2) {
            for (const _3rd of meta3) {
                for (const _4th of new_meta4) {
                    for (const _5th of meta5) {
                        for (const _6th of meta6) {
                            const numStr = num.toString().padStart(4, "0")
                            const filename = `${foodCode}_${_1st.code}${_2nd.code}${_3rd.code}${_4th.code}${_5th.code}${_6th.code}_${numStr}`
                            const tr = genRow(filename, foodName, foodCode, _1st.name, _2nd.name, _3rd.name, _4th.name, _5th.name, _6th.name)
                            tbody.appendChild(tr)
                            num++
                        }
                    }
                }
            }
        }
    }
    table.appendChild(tbody)
}


