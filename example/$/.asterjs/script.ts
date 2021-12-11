
// @ts-nocheck

(async () => {
	Object.defineProperty(HTMLTemplateElement.prototype, "childNodes", {
		get() {
			return this.content.childNodes;
		},
	});

	// Object.defineProperty(HTMLElement.prototype, "on", {
	// 	get() {
	// 		return this.addEventListener;
	// 	},
	// });

	HTMLElement.prototype.on = function (...args: any[]) { return this.addEventListener(...args) };

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

	const createVariable = (initialValue: any) => {
		let value: any = initialValue;

		let values: [number[], () => any][] = [];

		let callbackFunctions: (() => any)[] = [];

		const update = () => {

			for (const [path, valueFunction] of values) {
				const node = getNode(...path);

				if (node) {
					node.textContent = valueFunction();
				}
			}

			for (const callbackFunction of callbackFunctions) {
				callbackFunction();
			}
		};

		window.setTimeout(update);

		return {
			$(updateFunction: () => any, ...path: number[]) {
				if (path.length) {
					values.push([path, updateFunction]);
				} else {
					callbackFunctions.push(updateFunction);
				}

				return [updateFunction, ...path];
			},
			get _() {
				return value;
			},
			set _(newValue: any) {
				value = newValue;

				update();
			},
		}
	};
	{
		// let count = createVariable(5, (newValue: any) => ({
		// 	[[1, 0, 2]]: (newValue),
		// 	[[1, 1, 2]]: (newValue),
		// 	[[1, 4, 2]]: (newValue),
		// 	[[1, 4, 10]]: (newValue * secondCount._),
		// }));

		// let secondCount = createVariable(10, (newValue: any) => ({
		// 	[[1, 2, 2]]: (newValue),
		// 	[[1, 3, 2]]: (newValue),
		// 	[[1, 4, 6]]: (newValue),
		// 	[[1, 4, 10]]: (newValue * count._),
		// }));

		let count = createVariable(5);

		let secondCount = createVariable(10);

		console.log(count._, secondCount._);

		{
			count.$(() => count._, 1, 0, 2);

			getNode(1, 0).on("click", () => {
				count._++;
			});
		}
		{
			count.$(() => count._, 1, 1, 2);

			getNode(1, 1).on("click", () => {
				count._--;
			});
		}
		{
			secondCount.$(() => secondCount._, 1, 2, 2);

			getNode(1, 2).on("click", () => {
				secondCount._++;
			});
		}
		{
			secondCount.$(() => secondCount._, 1, 3, 2);

			getNode(1, 3).on("click", () => {
				secondCount._--;
			});
		}
		{
			count.$(() => count._, 1, 4, 2);
			secondCount.$(() => secondCount._, 1, 4, 6);
			count.$(...secondCount.$(() => count._ * secondCount._, 1, 4, 10));
		}
		{
			// {
			// 	count.$(...secondCount.$(() => {
			// 		if (count._ > secondCount._) {

			// 		}
			// 	}));
			// }
		}
	}

	// {
	// 	const increaseButton = body.c(1);

	// 	const decreaseButton = body.c(3);

	// 	const paragraphTemplate = body.c(5);

	// 	const ul = body.c(11);

	// 	const liTemplate = ul.c(1);

	// 	const count = {
	// 		$: 5,
	// 		get _() {
	// 			return this.$;
	// 		},
	// 		set _(value) {
	// 			this.$ = value;
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