const inputBtn = document.querySelector("#input-btn")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")
const input = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
let myLeads = []

function release(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
}

const leadsStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsStorage){
    myLeads = leadsStorage
    render(myLeads)
}
function clear(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
}
function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
    listItems += `<li><a href="${leads[i]}" target="_blank">${leads[i]}<a><li> `  
    }
    ulEl.innerHTML = listItems
}

function arrayPush(){
    myLeads.push(input.value)
    input.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    
}

inputBtn.addEventListener("click", arrayPush)

tabBtn.addEventListener("click", release)

deleteBtn.addEventListener("dblclick", clear)