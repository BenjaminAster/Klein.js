
console.log("hi");

const body = document.body;

HTMLBodyElement.prototype.c = () => {

};

{
	const increaseButton = body.childNodes[1];

	const decreaseButton = body.childNodes[3];

	const paragraph = body.childNodes[5];

	const ul = body.childNodes[7];

	const liTemplate = ul.childNodes[1];

	const count = {
		__: 5,
		get _() {
			return this.__;
		},
		set _(value) {
			this.__ = value;
			paragraph.hidden = value <= 10;
			increaseButton.childNodes[2].textContent = value.toString();
			decreaseButton.childNodes[2].textContent = value.toString();
			paragraph.childNodes[2].textContent = value.toString();

			ul.innerHTML = "";

			for (let i = 0; i < value; i++) {
				// const li = liTemplate.cloneNode(true);
				// li.textContent = i.toString();
				// ul.appendChild(li);

				const newFragment = liTemplate.content.cloneNode(true);

				newFragment.childNodes[1].childNodes[0].textContent = i.toString();

				ul.appendChild(newFragment);
			}
		},
	};

	increaseButton.addEventListener("click", () => {
		count._++;
	});

	decreaseButton.addEventListener("click", () => {
		count._--;
	});
}
