// Defines an Item as an object with text and state
class Item {
	constructor(text, state="none") {
		this.text = text;
		this.state = state;
	}

	// When clicked an item progresses from new to crossed out to removed
	clicked() { 
		if (this.state == "none") {
			this.state = "line-through";
		} else if (this.state == "line-through") {
			this.state = "removed";
		}
	}
}

// Gets the list from storage
function getItems() {
	// If items isn't in localStorage then make it as an array
	if(localStorage.getItem("items") == null) {
		localStorage.setItem("items", "[]");
	}

	// The items are kept as a string
	// JSON.parse turns the string into an array of objects
	string = localStorage.getItem("items");
	parsed = JSON.parse(string);

	// The parsed array is recreated as Item objects
	result = [];
	for (let i=0; i < parsed.length; i++) {
		result.push(new Item(parsed[i].text, parsed[i].state));
	}
	return result;
}

// Puts items from localStorage onto the webpage
function update() {
	// The items and webpage elements are gathered
	items = getItems();
	list = document.getElementById("list");
	container = document.getElementById("container");

	// The old container is removed and a new one added
	list.removeChild(container);
	container = document.createElement("div");
	container.id = "container";
	list.appendChild(container);

	// Each item that hasn't been removed is added
	for (let i=0; i < items.length; i++) {
		if (items[i].state !== "removed") {

			// A div representing this item is created
			div = document.createElement("div");
			div.innerHTML = items[i].text;
			div.style.textDecoration = items[i].state;

			// A listener function is called if the item is clicked
			div.addEventListener("click", function() {
				items[i].clicked()
				localStorage.setItem("items", JSON.stringify(items));
				update();
			})

			// The item is added to the list
			container.appendChild(div);
		}
	}
}

update();

// The user creates a new item
function createItem() {
	// The new item is created
	text = prompt("What would you like to add to the list?");
	item = new Item(text);

	// The new item is added to local storage
	items = getItems();
	items.push(item);
	localStorage.setItem("items", JSON.stringify(items));
	update();
}
