
// @ts-nocheck

(async () => {
	// Object.defineProperty(HTMLTemplateElement.prototype, "childNodes", {
	// 	get() {
	// 		return this.content.childNodes;
	// 	},
	// });

	HTMLElement.prototype.on = function (...args: any[]) { return this.addEventListener(...args) };

	const _A_getNode = (() => {
		const recursiveElementTree = (node: Node): any => {
			let branch: Record<string, any> = {
				_: node,
			};

			for (const [i, childNode] of [...(() => {
				if (node.nodeName === "TEMPLATE") {
					node.remove();
					return node.content.childNodes;
				}
				return node.childNodes;
			})()].entries()) {
				branch[i] = recursiveElementTree(childNode);
			}

			return branch;
		}

		const elementTree = recursiveElementTree(document.documentElement);

		return (...path: number[]): Node => (
			path.reduce((tree: any, index: number) => tree?.[index], elementTree)._
		);
	})();

	const _A_createVariable = (initialValue: any) => {
		let value: any = initialValue;

		let values: [number[], () => any][] = [];

		let callbackFunctions: (() => any)[] = [];

		const update = () => {

			for (const [path, valueFunction] of values) {
				const node = _A_getNode(...path);

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

	const _A_forLoop = (
		startCommentIndex: number,
		firstItemLength: number,
		endCommentIndex: number,
		...path: number[]
	) => {

		const loopNodes = [..._A_getNode(...path).childNodes].slice(
			startCommentIndex + 1, endCommentIndex
		);
		const firstItemNodes = loopNodes.slice(0, firstItemLength);

		for (const node of loopNodes) {
			node.remove();
		}

		return (loopFunction: (generator: any) => void) => {
			loopFunction(
				(function* () {
					while (true) {
						yield ((value: number) => {
							console.log(value);
						});
					}
				})()
			)
		};

	};

	{
		let count = _A_createVariable(5);

		let secondCount = _A_createVariable(0);

		console.log(count._, secondCount._);

		{
			count.$(() => count._, 1, 0, 2);

			_A_getNode(1, 0).on("click", () => {
				count._++;
			});
		}
		{
			count.$(() => count._, 1, 1, 2);

			_A_getNode(1, 1).on("click", () => {
				count._--;
			});
		}
		{
			secondCount.$(() => secondCount._, 1, 2, 2);

			_A_getNode(1, 2).on("click", () => {
				secondCount._++;
			});
		}
		{
			secondCount.$(() => secondCount._, 1, 3, 2);

			_A_getNode(1, 3).on("click", () => {
				secondCount._--;
			});
		}
		{
			count.$(() => count._, 1, 4, 2);
			secondCount.$(() => secondCount._, 1, 4, 6);
			count.$(...secondCount.$(() => count._ * secondCount._, 1, 4, 10));
		}
		{
			_A_forLoop(5, 1, 11, 1)((generator: any) => {
				for (let i = 0; i < count._; i++) {
					generator.next().value();
				}
				generator.return();
			});
		}
		// {
		// 	{
		// 		count.$(...secondCount.$(() => {
		// 			if (count._ > secondCount._) {
		// 				_A_getNode(1, 5)
		// 			}
		// 		}));
		// 	}
		// }
	}
})();