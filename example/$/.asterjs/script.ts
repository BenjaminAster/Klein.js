
// @ts-nocheck

(async () => {
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

		const reduceFunction = (path: number[]) => path.reduce(
			(tree: any, index: number) => tree?.[index], elementTree
		);

		return (...path: number[]): Node => {
			if (path.length) {
				return reduceFunction(path)?._;
			} else {
				return (...path: number[]) => reduceFunction(path);
			}
		};
	})();

	const _A_createVariable = (initialValue: any) => {
		let value: any = initialValue;

		let values: [number[], () => any][] = [];

		let updateFunctions: ((generator: any) => any)[] = [];

		const update = () => {
			for (const [path, valueFunction] of values) {
				const node = _A_getNode(...path);

				if (node?.nodeName === "#comment") {

				} else if (node) {
					node.textContent = valueFunction();
				}
			}

			for (const [
				path,
				updateFunction,
				getElementsRange,
				firstItemFragment,
			] of updateFunctions) {

				const nodes = [..._A_getNode(...path).childNodes].slice(
					...getElementsRange()
				);

				for (const node of nodes) {
					node.remove();
				}

				const fragment = new DocumentFragment();

				updateFunction(
					(function* () {
						while (true) {
							yield ((fragmentFunction?: (setValueInFragment: any) => any) => {
								const itemFragment = firstItemFragment.cloneNode(true);
								fragmentFunction?.(
									(value: any, ...fragmentPath: number[]) => {
										fragmentPath.reduce(
											(fragment: any, index: number) => fragment?.childNodes?.[index],
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
					getElementsRange()[1]
				];

				endComment.parentNode.insertBefore(fragment, endComment);
			}
		};

		return {
			$(updateFunction?: () => any, ...path: number[]) {
				if (!updateFunction) return update();

				values.push([path, updateFunction]);

				return [updateFunction, ...path];
			},
			$$(
				updateFunction: (generator: any) => any,
				startCommentIndex: number,
				firstItemLength: number,
				itemLength: number,
				...path: number[],
			) {
				const containerNodeObject = _A_getNode()(...path);

				const getNodeIndex = ((node: Node): number => (
					[...node.parentNode.childNodes].indexOf(node)
				));

				const getElementsRange = () => ([
					startCommentIndex,
					startCommentIndex + itemLength + 1
				].map(
					(index: number, i: number) => (getNodeIndex(containerNodeObject[index]._) + 1 - i)
				));

				_A_getNode(...path, startCommentIndex).data = itemLength;

				const firstItemFragment: DocumentFragment = new DocumentFragment();

				firstItemFragment.append(...[..._A_getNode(...path).childNodes].slice(
					...getElementsRange()
				).slice(0, firstItemLength).map((node: Node) => node.cloneNode(true)));

				updateFunctions.push([
					path,
					updateFunction,
					getElementsRange,
					firstItemFragment,
				])

				return [
					updateFunction,
					startCommentIndex,
					firstItemLength,
					itemLength,
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
			count.$$(...secondCount.$$(
				(generator: any) => {
					if (count._ > secondCount._) {
						generator.next().value();
					}
				},
				5, 1, 1, 1
			));
		}
		{
			count.$$(...secondCount.$$(
				(generator: any) => {
					for (let i: number = 2; i < count._ + secondCount._; i++) {
						generator.next().value((setValueInFragment: any) => {
							setValueInFragment(i, 0, 2);
						});
					}
				},
				8, 1, 5, 1
			));
		}

		count.$();
		secondCount.$();
	}
})();
