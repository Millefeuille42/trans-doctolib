// let browser = require("webextension-polyfill")

const allEqual = (arr,x) => arr.every(val => x.includes(val))
const normalizeString = (str) =>
	str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const nameElement = document.getElementById("profile-name-with-title")
const PERSON_COLOR = {true: "green", false: "red"}
const ICONS_URL = 'https://fonts.googleapis.com/icon?family=Material+Icons'
const JSON_ASSET_URL = 'static/doctolib.json'

const iconsLoader = () => {
	const lien = document.createElement('link')
	lien.rel = 'stylesheet'
	lien.href = ICONS_URL
	document.head.appendChild(lien)
}

const fetchList = async () => {
	const jsonUrl = browser.runtime.getURL(JSON_ASSET_URL)
	const response = await fetch(jsonUrl)
	return await response.json()
}

const main = async () => {
	const persons = await fetchList()
	const currentPerson = persons.find(person => allEqual(
		normalizeString(person.noms).split( ' '),
		normalizeString(nameElement.querySelector("span").textContent)
	))
	if (!currentPerson) return

	const color = PERSON_COLOR[currentPerson.transfriendly]
	const icon = document.createElement('span')
	const link = document.createElement('a')

	nameElement.style.color = color
	icon.style.color = color
	icon.setAttribute("class","material-icons")
	icon.style.paddingLeft = "20px"
	icon.textContent = "newspaper"
	link.href = currentPerson.source

	link.appendChild(icon)
	nameElement.appendChild(link)
}

iconsLoader()
main().catch((err) => {
	console.error(err)
})
