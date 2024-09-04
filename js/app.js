const yourHealthEl = document.querySelector('#yourHealth')
const opponentHealthEl = document.querySelector('#opponentHealth')
const yourPokemonEl = document.querySelector('#yourPokemon')
const opponentPokemonEl = document.querySelector('#otherPokemon')
const move1El = document.querySelector('#move1')
const move2El = document.querySelector('#move2')
const move3El = document.querySelector('#move3')
const move4El = document.querySelector('#move4')
let dexnumber = random(1, 151)
let opponentdexnumber = random(1, 151)
let currentHP = 0
let maxHP = 0
let opponentCurrentHP = 0
let opponentMaxHP = 0
let attack = 
    fetch(`https://pokeapi.co/api/v2/pokemon/${dexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[1].base_stat
    })
let defense =
    fetch(`https://pokeapi.co/api/v2/pokemon/${dexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[2].base_stat
    })
let specialAttack =
    fetch(`https://pokeapi.co/api/v2/pokemon/${dexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[3].base_stat
    })
let specialDefense = 
    fetch(`https://pokeapi.co/api/v2/pokemon/${dexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[4].base_stat
    })
let speed = 
    fetch(`https://pokeapi.co/api/v2/pokemon/${dexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[5].base_stat
    })
let opponentAttack = 
    fetch(`https://pokeapi.co/api/v2/pokemon/${opponentdexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[1].base_stat
    })
let opponentDefense = 
    fetch(`https://pokeapi.co/api/v2/pokemon/${opponentdexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[2].base_stat
    })
let opponentSpecialAttack =
    fetch(`https://pokeapi.co/api/v2/pokemon/${opponentdexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[3].base_stat
    })
let opponentSpecialDefense = 
    fetch(`https://pokeapi.co/api/v2/pokemon/${opponentdexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[4].base_stat
    })
let opponentSpeed =     
    fetch(`https://pokeapi.co/api/v2/pokemon/${opponentdexnumber}`).then((response) => response.json()).then((data) => {
        return data.stats[5].base_stat
    })
let move1
let move2 
let move3 
let move4 
let move1Damage
let move2Damage
let move3Damage
let move4Damage
let fetchData
let opponentFetchData
function random(min,max) {
    return Math.floor((Math.random())*(max-min+1))+min;
}
let move1Rand = random(0, 350)
let move2Rand = random(0, 350)
let move3Rand = random(0, 350)
let move4Rand = random(0, 350)
function PokemonSelect() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${dexnumber}`).then((response) => response.json()).then((data) => {
        yourPokemonEl.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${dexnumber}.png`
        maxHP = (((data.stats[0].base_stat * 2 + 100) * 50) / 100) + 10
        currentHP = maxHP
        yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
    })
    fetch(`js/moves.json`).then((response) => response.json()).then((moves) => {
        move1 = moves[move1Rand]
        move2 = moves[move2Rand]
        move3 = moves[move3Rand]
        move4 = moves[move4Rand]
        move1El.innerText = move1.ename
        move2El.innerText = move2.ename
        move3El.innerText = move3.ename
        move4El.innerText = move4.ename 
    })
    fetch(`https://pokeapi.co/api/v2/pokemon/${opponentdexnumber}`).then((response) => response.json()).then((opponentData) => {
        opponentPokemonEl.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${opponentdexnumber}.png`
        opponentMaxHP = (((opponentData.stats[0].base_stat * 2 + 100) * 50) / 100) + 10
        opponentCurrentHP = opponentMaxHP
        opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
        opponentAttack = opponentData.stats[1].base_stat
        opponentDefense = opponentData.stats[2].base_stat
        opponentSpecialAttack = opponentData.stats[3].base_stat
        opponentSpecialDefense = opponentData.stats[4].base_stat
        opponentSpeed = opponentData.stats[5].base_stat
    })
}
function gameStatusCheck() {
    Promise.all([opponentCurrentHP, currentHP])
    if(opponentCurrentHP <= 0 || currentHP <= 0) {
        document.querySelector('h1').style.display = 'inline'
    }
}
function move1DamageCalc() {
    fetch(`js/moves.json`).then((response) => response.json()).then((moves) => {
        Promise.all([attack, defense, specialAttack, specialDefense, speed, opponentAttack, opponentDefense, opponentSpecialAttack, opponentSpecialDefense, opponentSpeed]).then((stats) => {
        move1 = moves[move1Rand]
        if(speed > opponentSpeed){
            if (move1.type === "normal" || move1.type === "fighting" || move1.type === "flying" || move1.type === "poison" || move1.type === "ground" || move1.type === "rock" || move1.type === "bug" || move1.type === "ghost" || move1.type === "steel"){
                move1Damage = Math.ceil((((22 * move1.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                opponentCurrentHP -= move1Damage
                opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
            } else{
                move1Damage = Math.ceil((((22 * move1.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                opponentCurrentHP -= move1Damage
                opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
            } gameStatusCheck()
            let opponentMove = moves[random(0,350)]
            if (opponentMove.type === "normal" || opponentMove.type === "fighting" || opponentMove.type === "flying" || opponentMove.type === "poison" || opponentMove.type === "ground" || opponentMove.type === "rock" || opponentMove.type === "bug" || opponentMove.type === "ghost" || opponentMove.type === "steel"){
                opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                currentHP -= opponentMoveDamage
                yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
            } else{
                opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                currentHP -= opponentMoveDamage
                yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
            } gameStatusCheck()
    } else { 
        if (move1.type === "normal" || move1.type === "fighting" || move1.type === "flying" || move1.type === "poison" || move1.type === "ground" || move1.type === "rock" || move1.type === "bug" || move1.type === "ghost" || move1.type === "steel"){
            move1Damage = Math.ceil((((22 * move1.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
            opponentCurrentHP -= move1Damage
            opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
        } else{
            move1Damage = Math.ceil((((22 * move1.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
            opponentCurrentHP -= move1Damage
            opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
    } gameStatusCheck()
        let opponentMove = moves[random(0,350)]
        if (opponentMove.type === "normal" || opponentMove.type === "fighting" || opponentMove.type === "flying" || opponentMove.type === "poison" || opponentMove.type === "ground" || opponentMove.type === "rock" || opponentMove.type === "bug" || opponentMove.type === "ghost" || opponentMove.type === "steel"){
            opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
            opponentCurrentHP -= opponentMoveDamage
            opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
        } else{
            opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
            currentHP -= opponentMoveDamage
            yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
        } gameStatusCheck()

    }})})}
    function move2DamageCalc() {
        fetch(`js/moves.json`).then((response) => response.json()).then((moves) => {
            Promise.all([attack, defense, specialAttack, specialDefense, speed, opponentAttack, opponentDefense, opponentSpecialAttack, opponentSpecialDefense, opponentSpeed]).then((stats) => {
            move2 = moves[move2Rand]
            if(speed > opponentSpeed){
                if (move2.type === "normal" || move2.type === "fighting" || move2.type === "flying" || move2.type === "poison" || move2.type === "ground" || move2.type === "rock" || move2.type === "bug" || move2.type === "ghost" || move2.type === "steel"){
                    move2Damage = Math.ceil((((22 * move2.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                    opponentCurrentHP -= move2Damage
                    opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
                } else{
                    move2Damage = Math.ceil((((22 * move2.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                    opponentCurrentHP -= move2Damage
                    opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
                } gameStatusCheck()
                let opponentMove = moves[random(0,350)]
                if (opponentMove.type === "normal" || opponentMove.type === "fighting" || opponentMove.type === "flying" || opponentMove.type === "poison" || opponentMove.type === "ground" || opponentMove.type === "rock" || opponentMove.type === "bug" || opponentMove.type === "ghost" || opponentMove.type === "steel"){
                    opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                    currentHP -= opponentMoveDamage
                    yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
                } else{
                    opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                    currentHP -= opponentMoveDamage
                    yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
                } gameStatusCheck()
        } else { 
            if (move2.type === "normal" || move2.type === "fighting" || move2.type === "flying" || move2.type === "poison" || move2.type === "ground" || move2.type === "rock" || move2.type === "bug" || move2.type === "ghost" || move2.type === "steel"){
                move2Damage = Math.ceil((((22 * move2.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                opponentCurrentHP -= move2Damage
                opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
            } else{
                move2Damage = Math.ceil((((22 * move2.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                opponentCurrentHP -= move2Damage
                opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
        } gameStatusCheck()
            let opponentMove = moves[random(0,350)]
            if (opponentMove.type === "normal" || opponentMove.type === "fighting" || opponentMove.type === "flying" || opponentMove.type === "poison" || opponentMove.type === "ground" || opponentMove.type === "rock" || opponentMove.type === "bug" || opponentMove.type === "ghost" || opponentMove.type === "steel"){
                opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                opponentCurrentHP -= opponentMoveDamage
                opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
            } else{
                opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                currentHP -= opponentMoveDamage
                yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
            } gameStatusCheck()
    
        }})})}
    function move3DamageCalc() {
        fetch(`js/moves.json`).then((response) => response.json()).then((moves) => {
            Promise.all([attack, defense, specialAttack, specialDefense, speed, opponentAttack, opponentDefense, opponentSpecialAttack, opponentSpecialDefense, opponentSpeed]).then((stats) => {
            move3 = moves[move3Rand]
            if(speed > opponentSpeed){
                if (move3.type === "normal" || move3.type === "fighting" || move3.type === "flying" || move3.type === "poison" || move3.type === "ground" || move3.type === "rock" || move3.type === "bug" || move3.type === "ghost" || move3.type === "steel"){
                    move3Damage = Math.ceil((((22 * move3.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                    opponentCurrentHP -= move3Damage
                    opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
                } else{
                    move3Damage = Math.ceil((((22 * move3.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                    opponentCurrentHP -= move3Damage
                    opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
                } gameStatusCheck()
                let opponentMove = moves[random(0,350)]
                if (opponentMove.type === "normal" || opponentMove.type === "fighting" || opponentMove.type === "flying" || opponentMove.type === "poison" || opponentMove.type === "ground" || opponentMove.type === "rock" || opponentMove.type === "bug" || opponentMove.type === "ghost" || opponentMove.type === "steel"){
                    opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                    currentHP -= opponentMoveDamage
                    yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
                } else{
                    opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                    currentHP -= opponentMoveDamage
                    yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
                } gameStatusCheck()
        } else { 
            if (move3.type === "normal" || move3.type === "fighting" || move3.type === "flying" || move3.type === "poison" || move3.type === "ground" || move3.type === "rock" || move3.type === "bug" || move3.type === "ghost" || move3.type === "steel"){
                move3Damage = Math.ceil((((22 * move3.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                opponentCurrentHP -= move3Damage
                opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
            } else{
                move3Damage = Math.ceil((((22 * move3.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                opponentCurrentHP -= move3Damage
                opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
        } gameStatusCheck()
            let opponentMove = moves[random(0,350)]
            if (opponentMove.type === "normal" || opponentMove.type === "fighting" || opponentMove.type === "flying" || opponentMove.type === "poison" || opponentMove.type === "ground" || opponentMove.type === "rock" || opponentMove.type === "bug" || opponentMove.type === "ghost" || opponentMove.type === "steel"){
                opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                opponentCurrentHP -= opponentMoveDamage
                opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
            } else{
                opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                currentHP -= opponentMoveDamage
                yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
            } gameStatusCheck()
    
        }})})}
        function move4DamageCalc() {
            fetch(`js/moves.json`).then((response) => response.json()).then((moves) => {
                Promise.all([attack, defense, specialAttack, specialDefense, speed, opponentAttack, opponentDefense, opponentSpecialAttack, opponentSpecialDefense, opponentSpeed]).then((stats) => {
                move4 = moves[move4Rand]
                if(speed > opponentSpeed){
                    if (move4.type === "normal" || move4.type === "fighting" || move4.type === "flying" || move4.type === "poison" || move4.type === "ground" || move4.type === "rock" || move4.type === "bug" || move4.type === "ghost" || move4.type === "steel"){
                        move4Damage = Math.ceil((((22 * move4.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                        opponentCurrentHP -= move4Damage
                        opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
                    } else{
                        move4Damage = Math.ceil((((22 * move4.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                        opponentCurrentHP -= move4Damage
                        opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
                    } gameStatusCheck()
                    let opponentMove = moves[random(0,350)]
                    if (opponentMove.type === "normal" || opponentMove.type === "fighting" || opponentMove.type === "flying" || opponentMove.type === "poison" || opponentMove.type === "ground" || opponentMove.type === "rock" || opponentMove.type === "bug" || opponentMove.type === "ghost" || opponentMove.type === "steel"){
                        opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                        currentHP -= opponentMoveDamage
                        yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
                    } else{
                        opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                        currentHP -= opponentMoveDamage
                        yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
                    } gameStatusCheck()
            } else { 
                if (move4.type === "normal" || move4.type === "fighting" || move4.type === "flying" || move4.type === "poison" || move4.type === "ground" || move4.type === "rock" || move4.type === "bug" || move4.type === "ghost" || move4.type === "steel"){
                    move4Damage = Math.ceil((((22 * move4.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                    opponentCurrentHP -= move4Damage
                    opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
                } else{
                    move4Damage = Math.ceil((((22 * move4.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                    opponentCurrentHP -= move4Damage
                    opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
            } gameStatusCheck()
                let opponentMove = moves[random(0,350)]
                if (opponentMove.type === "normal" || opponentMove.type === "fighting" || opponentMove.type === "flying" || opponentMove.type === "poison" || opponentMove.type === "ground" || opponentMove.type === "rock" || opponentMove.type === "bug" || opponentMove.type === "ghost" || opponentMove.type === "steel"){
                    opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[0]/stats[6]))/50) + 2) * (random(85, 100)/100))
                    opponentCurrentHP -= opponentMoveDamage
                    opponentHealthEl.innerText = `HP: ${opponentCurrentHP}/${opponentMaxHP}`
                } else{
                    opponentMoveDamage = Math.ceil((((22 * opponentMove.power * (stats[2]/stats[8]))/50) + 2) * (random(85, 100)/100))
                    currentHP -= opponentMoveDamage
                    yourHealthEl.innerText = `HP: ${currentHP}/${maxHP}`
                } gameStatusCheck()
        
            }})})}
function reload() {
    location.reload()
}
move1El.addEventListener('click', move1DamageCalc)
move2El.addEventListener('click', move2DamageCalc)
move3El.addEventListener('click', move3DamageCalc)
move4El.addEventListener('click', move4DamageCalc)
document.querySelector('#reset').addEventListener('click', reload)
PokemonSelect()