const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
const nextBtn = document.getElementById('nextBtn')
const previousBtn = document.getElementById('previousBtn')
const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const cards = document.getElementsByClassName('card')

nextUrl = ''
previousUrl = ''

async function callData(url) {
    await fetch(url)
        .then(res => res.json())
        .then(res => {
            nextUrl = res.next
            previousUrl = res.previous
            return res
        })
        .then(res => setElements(res))
}

async function callPokeData(id) {
    pokeUrl = `${baseUrl}/${id}`
    await fetch(pokeUrl)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setImage(res.sprites.front_default, id)
            console.log(res.sprites.front_default)
        })

}

async function searchPoke(id) {
    pokeUrl = `${baseUrl}/${id}`
    await fetch(pokeUrl)
        .then(res => res.json())
        .then(res => {
            console.log(res.name)
            console.log(res.sprites.front_default)
            setSearchRes(res.name, res.sprites.front_default)
        })
}

function setElements({ results }) {

    for (i = 0; i < 20; i++) {
        let poke = results[i]
        let tagLi = document.createElement("li");
        let tagD = document.createElement("div");
        tagD.setAttribute('id', `${poke.name}`)
        tagLi.setAttribute('class', 'card')
        let text = `${poke.name}`;
        text = document.createTextNode(text);
        tagP = document.createElement("p");
        tagP.appendChild(text);
        tagD.appendChild(tagP);
        tagLi.appendChild(tagD);
        var el = document.getElementsByClassName('lista')
        el[0].appendChild(tagLi)

        cards[i].addEventListener('click', (el) => {
            let id = el.target.innerText
            console.log(id)
            callPokeData(id)
        })
    }
}

function setImage(img, id) {
    let image = document.createElement('img')
    image.setAttribute('src', `${img}`)
    document.getElementById(id).appendChild(image)
}

function setSearchRes(name, img) {
    let div = document.createElement('div')
    let image = document.createElement('img')
    let pName = document.createElement('p')
    text = document.createTextNode(name);
    div.setAttribute('id', 'searchRes')
    image.setAttribute('src', `${img}`)
    
    pName.appendChild(text);
    div.appendChild(pName);
    div.appendChild(image);
        
    console.log(image)
    search.appendChild(div)
}

callData(baseUrl)

searchBtn.addEventListener('click', () => {
    searchRes = document.getElementById('searchRes')
    if(searchRes) {
        document.getElementById('search').removeChild(searchRes)
    }

    keySearch = document.getElementById('mySearch').value
    searchPoke(keySearch)
})

previousBtn.addEventListener('click', () => {
    var el = document.getElementsByClassName('lista')
    if (previousUrl) {
        el[0].innerText = ''
        callData(previousUrl)
    }
})

nextBtn.addEventListener('click', () => {
    var el = document.getElementsByClassName('lista')
    el[0].innerText = ''
    callData(nextUrl)
})

