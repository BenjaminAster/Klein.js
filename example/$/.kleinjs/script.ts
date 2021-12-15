
// @ts-nocheck

(async () => {
	HTMLElement.prototype.on = function (...args: any[]) { return this.addEventListener(...args) };

	const _K_getNode = (() => {
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

		return (...path: number[]) => path.reduce(
			(tree: any, index: number) => tree?.[index], elementTree
		)?._;
	})();

	const _K_createVariable = (initialValue: any) => {
		let value: any = initialValue;

		let values: [number[], () => any][] = [];

		let updateFunctions: any[] = [];

		let items: any[] = [];

		const getNodeIndex = ((node: Node): number => (
			[...node.parentNode.childNodes].indexOf(node)
		));

		const update = () => {
			const newItems = [];

			console.log("update", updateFunctions);

			for (const [
				path,
				updateFunction,
				getElementsRange,
				firstItemFragment,
				startCommentIndex,
			] of updateFunctions) {

				const nodes = [..._K_getNode(...path).childNodes].slice(
					...getElementsRange()
				);

				for (const node of nodes) {
					node.remove();
				}

				const fragment = new DocumentFragment();

				const currentItems = items.filter(
					([path]) => console.log(path),
				);

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

				const endComment: Node = _K_getNode(...path).childNodes[
					getElementsRange()[1]
				];

				endComment.parentNode.insertBefore(fragment, endComment);
			}

			// for (const [
			// 	path,
			// 	updateFunction,
			// 	itemPath,
			// ] of items) {
			// 	const comment = _K_getNode(...path);

			// 	const commentIndex = getNodeIndex(comment);

			// 	const node = itemPath.reduce(
			// 		(node: any, index: number) => node?.childNodes?.[index],
			// 		comment.parentNode.childNodes[commentIndex + 1 + itemPath[0]]
			// 	)
			// }

			for (const [path, valueFunction] of values) {
				const node = _K_getNode(...path);

				if (node) {
					node.textContent = valueFunction();
				}
			}
		};

		return {
			$(
				path?: number[],
				updateFunction?: () => any,
				param1?: number,
				param2?: number,
				param3?: number,
			) {
				(() => {

					if (!path) return update();

					if (!param1) {
						values.push([path, updateFunction]);

						return;
					}

					if (!param2) {
						items.push([path, updateFunction, param1]);

						return;
					}

					const getElementsRange = () => ([
						param1,
						param1 + param3 + 1
					].map(
						(index: number, i: number) => (getNodeIndex(_K_getNode(...path, index)) + 1 - i)
					));

					_K_getNode(...path, param1).data = param3;

					const firstItemFragment: DocumentFragment = new DocumentFragment();

					firstItemFragment.append(...[..._K_getNode(...path).childNodes].slice(
						...getElementsRange()
					).slice(0, param2).map((node: Node) => node.cloneNode(true)));

					updateFunctions.push([
						path,
						updateFunction,
						getElementsRange,
						firstItemFragment,
						param1,
					]);
				})();

				return [
					path,
					updateFunction,
					param1,
					param2,
					param3,
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
		let count = _K_createVariable(5);
		let secondCount = _K_createVariable(0);

		{
			count.$([1, 0, 2], () => count._);

			_K_getNode(1, 0).on("click", () => {
				count._++;
			});
		}
		{
			count.$([1, 1, 2], () => count._);

			_K_getNode(1, 1).on("click", () => {
				count._--;
			});
		}
		{
			secondCount.$([1, 2, 2], () => secondCount._);

			_K_getNode(1, 2).on("click", () => {
				secondCount._++;
			});
		}
		{
			secondCount.$([1, 3, 2], () => secondCount._);

			_K_getNode(1, 3).on("click", () => {
				secondCount._--;
			});
		}
		{
			count.$([1, 4, 2], () => count._);
			secondCount.$([1, 4, 6], () => secondCount._);
			count.$(...secondCount.$([1, 4, 10], () => count._ * secondCount._));
		}
		{
			count.$(...secondCount.$(
				[1],
				(generator: any) => {
					if (count._ > secondCount._) {
						generator.next().value();
					}
				},
				5, 1, 1
			));
		}
		{
			secondCount.$(
				[1],
				(generator: any) => {
					for (let i: number = 2; i < secondCount._ + 10; i++) {
						count.$([1, 8], () => count._, 1);

						generator.next().value((setValueInFragment: any) => {
							setValueInFragment(i, 0, 2);
						});
					}
				},
				8, 1, 5
			);
		}

		count.$();
		secondCount.$();
	}
})();
