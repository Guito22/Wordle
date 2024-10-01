const setTheme = ()=>{
    const dataTheme = body.getAttribute("data-theme")
    const themeBtn = body.querySelector("#themeBtn")
    if(dataTheme){
        body.setAttribute("data-theme",dataTheme==="light" ? "dark" : "light")

    }
    else{
        if(localStorage.getItem("data-theme")){
            body.setAttribute("data-theme",localStorage.getItem("data-theme"))
        }
        else{
            body.setAttribute("data-theme","light")
        }
    }

    localStorage.setItem("data-theme",body.getAttribute("data-theme"))
    if(body.getAttribute("data-theme")==="light"){
        themeBtn.textContent = "🔆"
    }
    else{
        themeBtn.textContent = "🌙"

    }
}

const createTiles = ()=>{
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("div")
        row.classList.add("row")
        for (let j = 0; j < 5; j++) {
            const div = document.createElement("div")
            if(i===0 && j===0){
                div.id = "selectedTile"
            }
            row.appendChild(div)
        }
        main.appendChild(row)
    }
}

const createKeyBoard = ()=>{
    const keys=[
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L",],
        ["ENTER","Z","X","C","V","B","N","M","DEL"]
]
    for (const i of keys) {
        const div = document.createElement("div")
        for (const j of i) {
            const btn = document.createElement("button")
            btn.textContent = j
            div.appendChild(btn)
        }
        section.appendChild(div)
    }
}

const getNewWord = ()=>{
    
    const index = Math.floor(Math.random()*wordleWords.length)
    
    return wordleWords[index].toUpperCase()
}

const tryWord = ()=>{
    const row = document.querySelectorAll(".row")[attempt]
    let word = "";aux=selectedWord;key = ""
    const correctIndexes = []
    
    for (const i of row.children) {
        word+=i.textContent
    }
    if(word.length!==5){
        return
    }
    //to avoid guesses with non-words
    if(!words.includes(word.toLowerCase())){
        [...row.children].map(i=>{
            //animation to show that is not a valid word
            i.animate([{rotate:"10deg",scale:"0.9"},{rotate:"-10deg",scale:"1"},{rotate:"10deg",scale:"0.9"},{rotate:"-10deg",scale:"1"}],
                {
                    fill: "backwards",
                    iterations:1,
                    duration: 500,
                  },
            )
            
        })
        return
    }

    for (let i = 0; i < 5; i++) {
        if(selectedWord[i]===word[i]){
            row.children[i].classList.add("correct")
            aux = aux.replace(aux[i],"_")
            correctIndexes.push(i)
            key = [...keys].find(el=>el.textContent===selectedWord[i])
            key.classList.remove("misplaced")
            key.classList.add("correct")
        }

    }
    for (let i = 0; i < 5; i++) {
        if(!correctIndexes.includes(i)){
            if(aux.includes(word[i])){
                row.children[i].classList.add("misplaced")
                aux = aux.replace(word[i],"_")
                key = [...keys].find(el=>el.textContent===word[i])
                if(!key.classList.contains("correct")){
                    key.classList.add("misplaced")
                }
            }
            else{
                row.children[i].classList.add("wrong")
                key = [...keys].find(el=>el.textContent===word[i])
                if(!key.classList.contains("correct") && !key.classList.contains("misplaced")){
                    key.classList.add("wrong")
                }

            }
        }
        row.children[i].style.animation = `0.75s linear ${i*0.1}s rotar`

    }
    if(selectedWord===word){
        message.textContent = "You won!"
        message.style.zIndex = "10"
        message.style.opacity = "1"

        setTimeout(() => {
            message.style.zIndex = "-10"
            message.style.opacity = "0" 
        }, 2000);
            
        attempt=10
    }
    else{

        attempt+=1
    }
    const selectedTile = document.querySelector("#selectedTile")
    selectedTile.id=""
    if(attempt<6){

        const nextRow = document.querySelectorAll(".row")[attempt]
        nextRow.children[0].id="selectedTile"
    }
    if(attempt===6){
        message.innerHTML = `The right answer was: <b>${selectedWord}</b>`
        message.style.zIndex = "10"
        message.style.opacity = "1"

        setTimeout(() => {
            message.style.zIndex = "-10"
            message.style.opacity = "0" 
        }, 2000);
    }

}

const newGame = ()=>{
    attempt=0
    main.innerHTML=""
    createTiles()
    const letters = document.querySelectorAll(".row div")

    for (const letter of letters) {
       letter.textContent = "" 
    }
    for (const className of ["correct","misplaced","wrong"]) {
        const elements = document.querySelectorAll(`.${className}`)
        if(elements){
            for (const el of elements) {
                el.classList.remove(className)
            }
        }
    }
    selectedWord = getNewWord()
    for (const i of letters) {
        i.addEventListener("click",(e)=>{
            const rows = document.querySelectorAll(".row")
            if([...rows[attempt].children].includes(i)){
    
                const selectedTile = document.querySelector("#selectedTile")
                
                if(selectedTile){
                    selectedTile.id=""
                }
                i.id="selectedTile"
            }
            
        })
    
    
    }
}