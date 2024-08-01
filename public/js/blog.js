let createBtn = document.getElementById("createBtn")
let overlay = document.getElementById("overlay")
let cancelBtn = document.getElementById("cancel")
let card = document.getElementById("card")

createBtn.addEventListener("click",()=>{
    overlay.style.display = "block"
    card.style.display = "block"
    
})
cancelBtn.addEventListener("click",()=>{
    overlay.style.display = "none"
    card.style.display = "none"
})



