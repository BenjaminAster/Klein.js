
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
			path.reduce((tree: any, index: number) => tree?.[index], elementTree)?._
		);
	})();

	const _A_nodeIndex = ((node: Node): number => (
		[...node.parentNode.childNodes].indexOf(node)
	));

	const _A_createVariable = (initialValue: any) => {
		let value: any = initialValue;

		let values: [number[], () => any][] = [];

		let callbackFunctions: (() => any)[] = [];

		let loopFunctions: ((generator: any) => any)[] = [];

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

			for (const [
				path,
				loopFunction,
				getLoopElementsRange,
				firstItemFragment,
			] of loopFunctions) {

				const loopNodes = [..._A_getNode(...path).childNodes].slice(
					...getLoopElementsRange()
				);

				for (const node of loopNodes) {
					node.remove();
				}

				const fragment = new DocumentFragment();

				loopFunction(
					(function* () {
						while (true) {
							yield ((fragmentFunction: (setValueInFragment: any) => any) => {
								const itemFragment = firstItemFragment.cloneNode(true);
								fragmentFunction(
									(value: any, ...fragmentPath: number[]) => {
										fragmentPath.reduce(
											(fragment: any, index: number) => fragment.childNodes?.[index],
											itemFragment
										).textContent = value;
									}
								);
								fragment.append(itemFragment);
							});
						}
					})()
				);

				const endComment: Node = _A_getNode(...path).childNodes[
					getLoopElementsRange()[1]
				];

				endComment.parentNode.insertBefore(fragment, endComment);
			}
		};

		return {
			$(updateFunction?: () => any, ...path: number[]) {
				if (!updateFunction) return update();

				if (path.length) {
					values.push([path, updateFunction]);
				} else {
					callbackFunctions.push(updateFunction);
				}

				return [updateFunction, ...path];
			},
			f(
				loopFunction: (generator: any) => any,
				startCommentIndex: number,
				firstItemLength: number,
				endCommentIndex: number,
				...path: number[]
			) {
				// const loopNodes = [..._A_getNode(...path).childNodes].slice(
				// 	startCommentIndex + 1, endCommentIndex
				// );
				// const firstItemNodes = loopNodes.slice(0, firstItemLength).map(
				// 	(node) => node.cloneNode(true)
				// );

				// for (const node of loopNodes) {
				// 	node.remove();
				// }

				// loopFunctions.push([path, loopFunction]);

				const getLoopElementsRange = () => ([startCommentIndex, endCommentIndex].map(
					(index: number, i: number) => (_A_nodeIndex(_A_getNode(...path, index)) + 1 - i)
				));

				const firstItemFragment: DocumentFragment = new DocumentFragment();

				firstItemFragment.append(...[..._A_getNode(...path).childNodes].slice(
					...getLoopElementsRange()
				).slice(0, firstItemLength).map((node: Node) => node.cloneNode(true)));

				loopFunctions.push([
					path,
					loopFunction,
					getLoopElementsRange,
					firstItemFragment,
				])

				return [
					loopFunction,
					startCommentIndex,
					firstItemLength,
					endCommentIndex,
					...path,
				];
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

	// const _A_forLoop = (
	// 	startCommentIndex: number,
	// 	firstItemLength: number,
	// 	endCommentIndex: number,
	// 	...path: number[]
	// ) => {

	// 	const loopNodes = [..._A_getNode(...path).childNodes].slice(
	// 		startCommentIndex + 1, endCommentIndex
	// 	);
	// 	const firstItemNodes = loopNodes.slice(0, firstItemLength);

	// 	for (const node of loopNodes) {
	// 		node.remove();
	// 	}

	// 	return (loopFunction: (generator: any) => void) => {
	// 		loopFunction(
	// 			(function* () {
	// 				while (true) {
	// 					yield ((value: number) => {
	// 						console.log(value);
	// 					});
	// 				}
	// 			})()
	// 		)
	// 	};

	// };

	{
		let count = _A_createVariable(5);
		let secondCount = _A_createVariable(0);

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
			count.f(...secondCount.f(
				(generator: any) => {
					for (let i: number = 2; i < count._ + secondCount._; i++) {
						generator.next().value((setValueInFragment: any) => {
							setValueInFragment(i, 0, 2);
						});
					}
				},
				5, 1, 11, 1
			));
		}
		// {
		// 	_A_forLoop(5, 1, 11, 1)((generator: any) => {
		// 		for (let i = 0; i < count._; i++) {
		// 			generator.next().value();
		// 		}
		// 		generator.return();
		// 	});
		// }
		// {
		// 	{
		// 		count.$(...secondCount.$(() => {
		// 			if (count._ > secondCount._) {
		// 				_A_getNode(1, 5)
		// 			}
		// 		}));
		// 	}
		// }

		count.$();
		secondCount.$();
	}
})();
