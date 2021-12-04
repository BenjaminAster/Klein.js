
console.log("hi");

const body = document.body;

HTMLElement.prototype.c = DocumentFragment.prototype.c = function (...indices) {
	return indices.reduce((prev, curr) => prev.childNodes[curr], this);
};

// HTMLElement.prototype.r = function () {
// 	this.remove();
// 	return this;
// }

HTMLElement.prototype.e = function () {
	this.innerHTML = "";
	return this;
}

{
	const increaseButton = body.c(1);

	const decreaseButton = body.c(3);

	const paragraphTemplate = body.c(5);

	const ul = body.c(11);

	const liTemplate = ul.c(1);

	const count = {
		__: 5,
		get _() {
			return this.__;
		},
		set _(value) {
			this.__ = value;
			if (value > 10) {
				body.c(8).replaceWith(paragraphTemplate.content.cloneNode(true).c(1));
				// body.c(8).replaceWith(paragraphTemplate.content.cloneNode(true).children);
				// body.c(8, 2).textContent = value.toString();
			} else {
				body.c(8).replaceWith(document.createTextNode(""));
			}
			increaseButton.c(2).textContent = value.toString();
			decreaseButton.c(2).textContent = value.toString();

			ul.e();

			for (let i = 0; i < value; i++) {
				const newFragment = liTemplate.content.cloneNode(true);

				newFragment.c(1, 0).textContent = i.toString();

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
