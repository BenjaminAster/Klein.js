
// @ts-nocheck

(async () => {
	const root: HTMLHtmlElement = document.documentElement;
	const head: HTMLHeadElement = document.head;
	const body: HTMLBodyElement = document.body;

	Object.defineProperty(HTMLTemplateElement.prototype, "childNodes", {
		get() {
			return this.content.childNodes;
		},
	});

	const getNode = (() => {
		const recursiveElementTree = (node: Node): any => {
			let branch: any = node;

			for (const [i, childNode] of [...node.childNodes].entries()) {
				branch[i] = recursiveElementTree(childNode);
			}

			return branch;
		}

		const elementTree = recursiveElementTree(document.documentElement);

		return (...path: number[]): Node => (
			path.reduce((tree: any, index: number) => tree[index], elementTree)
		);
	})();

	{
		
	}

	// {
	// 	const increaseButton = body.c(1);

	// 	const decreaseButton = body.c(3);

	// 	const paragraphTemplate = body.c(5);

	// 	const ul = body.c(11);

	// 	const liTemplate = ul.c(1);

	// 	const count = {
	// 		__: 5,
	// 		get _() {
	// 			return this.__;
	// 		},
	// 		set _(value) {
	// 			this.__ = value;
	// 			if (value > 10) {
	// 				body.c(8).replaceWith(paragraphTemplate.content.cloneNode(true).c(1));
	// 				// body.c(8).replaceWith(paragraphTemplate.content.cloneNode(true).children);
	// 				// body.c(8, 2).textContent = value.toString();
	// 			} else {
	// 				body.c(8).replaceWith(document.createTextNode(""));
	// 			}
	// 			increaseButton.c(2).textContent = value.toString();
	// 			decreaseButton.c(2).textContent = value.toString();

	// 			ul.e();

	// 			for (let i = 0; i < value; i++) {
	// 				const newFragment = liTemplate.content.cloneNode(true);

	// 				newFragment.c(1, 0).textContent = i.toString();

	// 				ul.appendChild(newFragment);
	// 			}
	// 		},
	// 	};

	// 	increaseButton.addEventListener("click", () => {
	// 		count._++;
	// 	});

	// 	decreaseButton.addEventListener("click", () => {
	// 		count._--;
	// 	});
	// }
})();