let users = JSON.parse(localStorage.getItem("users"))

if (!users) {
    users = [
        {
            id: "123456789",
            createdDate: "2021-01-06T00:00:00.000Z",
            status: "En validation",
            firstName: "Mohamed",
            lastName: "Taha",
            userName: "mtaha",
            registrationNumber: "2584",
        },
        {
            id: "987654321",
            createdDate: "2021-07-25T00:00:00.000Z",
            status: "Validé",
            firstName: "Hamid",
            lastName: "Orrich",
            userName: "horrich",
            registrationNumber: "1594",
        },
        {
            id: "852963741",
            createdDate: "2021-09-15T00:00:00.000Z",
            status: "Rejeté",
            firstName: "Rachid",
            lastName: "Mahidi",
            userName: "rmahidi",
            registrationNumber: "3576",
        }
    ]
    localStorage.setItem("users", JSON.stringify(users))
}

let table = document.getElementById("tabusers")
if (table) {
    for (let i = 0; i < users.length; i++) {
        let user = Object.values(users[i])

        let tr = document.createElement("tr")
        tr.style.height = "50px"
        tr.style.borderTop = "1px solid gray"

        for (let j = 0; j < user.length; j++) {
            let td = document.createElement("td");
            td.style.outline = "none"
            let content = ""

            if (j == 1) {
                content = document.createTextNode(`${user[j].split("T")[0]}`)
            } else {
                content = document.createTextNode(`${user[j]}`)
            }

            if (j == 2) {
                let span = document.createElement("span")
                span.style.display = "block"
                span.style.width = "100px"
                span.style.padding = "7px"
                span.style.textAlign = "center"
                span.style.borderRadius = "5px"

                switch (user[j]) {
                    case "Validé":
                        span.classList.add("valide")
                        break
                    case "Rejeté":
                        span.classList.add("rejected")
                        break
                    case "En validation":
                        span.classList.add("on-validation")
                        break
                }

                span.appendChild(content)
                td.appendChild(span)
                tr.appendChild(td)
            } else {
                td.appendChild(content)
                tr.appendChild(td)
            }
        }

        // Action column
        let td = document.createElement("td");
        let icon = document.createElement("i")
        icon.classList.add("fa")
        icon.classList.add("fa-trash")
        td.style.outline = "none"
        td.append(icon)
        tr.append(td)
        table.append(tr)
    }


    // Delete User:
    for (let i = 1; i < table.rows.length; i++) {
        let cell = table.rows[i].cells[table.rows[i].cells.length - 1]
        let trash = cell.firstChild
        trash.onclick = function () {
            let td = this.parentElement
            let index = td.parentElement.rowIndex
            users.splice(index - 1, 1)
            localStorage.setItem("users", JSON.stringify(users))
            table.deleteRow(index)
        }
    }
}

// ADD NEW USER
let add = document.getElementById("save")
if (add) {
    add.addEventListener("click", (e) => {
        let user = {
            id: Math.random() * 100000000,
            createDate: document.getElementById("datecreation").value,
            status: document.getElementById('etat').options[document.getElementById('etat').selectedIndex].text,
            firstName: document.getElementById("prenom").value,
            lastName: document.getElementById("nom").value,
            userName: document.getElementById("nomutilisateur").value,
            registrationNumber: document.getElementById("matricule").value
        }
        users[users.length] = user
        localStorage.setItem("users", JSON.stringify(users))
    }, false)
}