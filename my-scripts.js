// An Item has "text" and "state" strings and can be "clicked"
class Item {
	constructor(text, state="none") {
		this.text = text;
		this.state = state;
	}

	// When clicked an item progresses from new to crossed out to removed
	clicked() { 
		if (this.state == "none") {
			this.state = "strike";
		} else if (this.state == "strike") {
			this.state = "invisible";
		}
	}
}

// Gets the Items from localStorage
function getItems() {
	// If localStorage doesn't have items, then add it as a string representing an empty array
	if(localStorage.getItem("items") == null) {
		localStorage.setItem("items", "[]");
	}

	// JSON.parse interprets the string as an array of objects
	string = localStorage.getItem("items");
	parsed = JSON.parse(string);

	// The elements in the array are made into Items
	result = [];
	for (let i=0; i < parsed.length; i++) {
		result.push(new Item(parsed[i].text, parsed[i].state));
	}
	return result;
}

// The user creates a new Item 
function createItem() {
	userInput = prompt("Your new item prompt goes here")
	newItem = new Item(userInput)

	items = getItems();
	items.push(newItem);
	localStorage.setItem("items", JSON.stringify(items))
	update();
}

// Puts Items onto the webpage
function update() {
	// The Items and webpage elements are gathered
	items = getItems();
	list = document.getElementById("list");
	container = document.getElementById("container");

	// The old container is removed and a new one added
	list.removeChild(container);
	container = document.createElement("div");
	container.id = "container";
	list.appendChild(container);

	// Each Item is added
	for (let i=0; i < items.length; i++) {
		// A div representing this item is created
		div = document.createElement("div");
		div.innerHTML = items[i].text;
		div.classList.add(items[i].state);

		// This listener function enacts a click on this Item
		function listener() {
			items[i].clicked()
			localStorage.setItem("items", JSON.stringify(items));
			update();
		}
		// The listener function is used when this div is clicked
		div.addEventListener("click", listener);

		// The div is added to the webpage
		container.appendChild(div);
	}
}

update();
