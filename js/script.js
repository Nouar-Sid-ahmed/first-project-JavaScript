let golds = 0
let gps_global = 0
let minions = [
    {id: 0, name: "Slime", cost: 100, gps: 1, owned: 0},
    {id: 1, name: "Undead", cost: 1000, gps: 10, owned: 0},
    {id: 2, name: "Bongo", cost: 1500, gps: 15, owned: 0},
    {id: 3, name: "Imp", cost: 5000, gps: 50, owned: 0},
    {id: 4, name: "Jarode", cost: 10000, gps: 100, owned: 0}
]
let click_to_up = 50
let click_gold = 1
if (localStorage['golds']) {
    golds = JSON.parse(localStorage.getItem('golds'))
}
if (localStorage['gps_global']) {
    gps_global = JSON.parse(localStorage.getItem('gps_global'))
}
if (localStorage['minions']) {
    minions = JSON.parse(localStorage.getItem('minions'))
}
if (localStorage['click_to_up']){
    click_to_up = JSON.parse(localStorage.getItem('click_to_up'))
}
if (localStorage['click_gold']){
    click_gold = JSON.parse(localStorage.getItem('click_gold'))
}

function addGold(x) {
    golds += x
    displayGolds()
}

function displayGolds() {
    document.getElementById("gold").innerHTML = golds + " GOLDS"
}

function automatiser() {
    getGPS()
    setInterval('addGold(gps_global)', 1000)
}

function getGPS() {
    let somme = 0
    minions.forEach(minion => somme += minion.owned*minion.gps)
    gps_global = somme
    return gps_global
}

function count() {
    let chaine = "minions "
    for (const j in minions) {
        chaine += minions[j].owned+" "+minions[j].name+" "
    }
    return (chaine)
}

function displayGPS() {
    document.getElementById("gps").innerHTML = count()+"/GPS Global: "+getGPS()+" /Golds per click: "+click_gold
}

function displayMarket() {
    for (const t in minions) {
        let tmp = minions[t].name+" cost"
        document.getElementById(tmp).innerHTML = minions[t].cost
        tmp = minions[t].name+" gps"
        document.getElementById(tmp).innerHTML = minions[t].gps
    }
}

function buyMinion(id) {
    if (minions[id].cost <= golds) {
        addGold(-minions[id].cost)
        minions[id].owned++
        minions[id].cost= Math.round(minions[id].cost*1.15)
        evolution(id)
        click_g()
        getGPS()
        displayGPS()
        displayMarket()
    }
    else {
        alert("vous n'avais pas asser de GOLDS pour effectuer cette achat")
    }
}
function storageD() {
    localStorage.setItem("golds", JSON.stringify(golds))
    localStorage.setItem("gps_global", JSON.stringify(gps_global))
    localStorage.setItem("click_to_up",JSON.stringify(click_to_up))
    localStorage.setItem("click_gold",JSON.stringify(click_gold))
    localStorage.setItem("minions", JSON.stringify(minions))
}
setInterval(function (){storageD();},2000)

function resetGame() {
    if (confirm('Attention la progretion sera perdu et le jeux vas etre reinitialiser')){
        localStorage.clear()
        location.reload()
    }
}
function evolution(id) {
    if (minions[id].owned === 25){
        minions[id].gps*=2
    }
    if (minions[id].owned === 50){
        minions[id].gps*=2
    }
    if (minions[id].owned === 100){
        minions[id].gps*=2
    }
    if (minions[id].owned === 250){
        minions[id].gps*=2
    }
    if (minions[id].owned === 100){
        minions[id].gps*=2
    }
}
function click_g() {
    let some = 0
    for ( const s in minions) {
        some+= minions[s].owned
    }
    if (some === click_to_up) {
        click_gold *= 2
        click_to_up += 50
    }
}