const main = document.querySelector("main")
const body = document.body
const section = document.querySelector("section")
const selectedTile = document.querySelector("#selectedTile")
const themeBtn = document.querySelector("#themeBtn")
const newGameBtn = document.querySelector("#newGameBtn")
const message = document.querySelector("#message")


let attempt = 0
let selectedWord = getNewWord()
setTheme()
createTiles()
createKeyBoard()


let tiles = document.querySelectorAll(".row div")
const keys = document.querySelectorAll("section button")

themeBtn.addEventListener("click",()=>{
    setTheme()
    themeBtn.blur()
})

newGameBtn.addEventListener("click",(e)=>{
    newGame()
    newGameBtn.blur()
})

body.addEventListener("click",(e)=>{
    const selectedTile = document.querySelector("#selectedTile")

    if(selectedTile){
        selectedTile.id=""
    }
})

body.addEventListener("keydown",(e)=>{
    const selectedTile = document.querySelector("#selectedTile")
    const specialChars = ['á','é','í','ó','ú','Á','É','Í','Ó','Ú','ñ','Ñ']
    if(selectedTile){
        if(e.keyCode>=65 && e.keyCode<=90){
            if(specialChars.includes(e.key)){
                return
            }
            e.preventDefault()
            if(e.key.toUpperCase()!==selectedTile.textContent){

                selectedTile.textContent=e.key.toUpperCase()
                if(selectedTile.nextSibling){
                    selectedTile.nextSibling.id="selectedTile"
                    selectedTile.id=""
                }
            }
            else{
                selectedTile.textContent=""
            }
        }
        if(e.key==="Backspace"){
            selectedTile.textContent=""
        }
        if(e.key==="ArrowRight"){
            if(selectedTile.nextSibling){
                selectedTile.nextSibling.id="selectedTile"
                selectedTile.id=""
            }
        }
        if(e.key==="ArrowLeft" || e.key==="Backspace"){
            if(selectedTile.previousSibling){
                selectedTile.previousSibling.id="selectedTile"
                selectedTile.id=""
            }
        }
        if(e.key==="Enter"){
            tryWord()
        }
        
    }
})

//to keep selection when clicking inside these elements
for (const i of [main,section,themeBtn,newGameBtn]) {
    i.addEventListener("click",(e)=>{
        e.stopPropagation()
    })
}


for (const i of tiles) {
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

for (const i of keys) {
   i.addEventListener("click",(e)=>{
    const selectedTile = document.querySelector("#selectedTile")
    if(selectedTile){
        if(i.textContent!=="ENTER" && i.textContent!=="DEL"){
            if(i.textContent!==selectedTile.textContent){

                selectedTile.textContent = i.textContent
                if(selectedTile.nextSibling){
                    selectedTile.nextSibling.id="selectedTile"
                    selectedTile.id=""
                }
            }
            else{
                selectedTile.textContent=""
            }
        }
        if(i.textContent==="DEL"){
            selectedTile.textContent=""
            if(selectedTile.previousSibling){
                selectedTile.previousSibling.id="selectedTile"
                selectedTile.id=""
            }
        }
        if(i.textContent==="ENTER"){
            tryWord()
        }
    }
   }) 
}

