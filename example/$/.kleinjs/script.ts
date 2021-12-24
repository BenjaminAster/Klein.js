
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

		const getNodeIndex = ((node: Node): number => (
			[...node.parentNode.childNodes].indexOf(node)
		));

		const update = () => {
			{
				for (const [
					path,
					updateFunction,
					startCommentIndex,
					firstItemFragment,
					endCommentIndex,
				] of updateFunctions) {
					for (const node of [..._K_getNode(...path).childNodes].slice(
						getNodeIndex(_K_getNode(...path, startCommentIndex)) + 1,
						getNodeIndex(_K_getNode(...path, endCommentIndex)),
					)) {
						node.remove();
					}

					const fragment: DocumentFragment = new DocumentFragment();

					updateFunction(
						(function* () {
							let i: number = 0;
							while (true) {
								const itemFragment = firstItemFragment.cloneNode(true);
								fragment.append(itemFragment);

								yield i++;
							}
						})()
					);

					_K_getNode(...path).insertBefore(fragment, _K_getNode(...path, endCommentIndex));
				}
			}

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
				if (!path) update();
				else if (!param1) values.push([path, updateFunction]);
				else {
					// param1: startCommentIndex
					// param2: firstItemLength
					// param3: itemLength

					let firstItemFragment: DocumentFragment = new DocumentFragment();

					firstItemFragment.append(...[..._K_getNode(...path).childNodes].slice(
						param1 + 1,
						param1 + 1 + param2,
					).map((node: Node) => node.cloneNode(true)));

					updateFunctions.push([
						path,
						updateFunction,
						param1,
						firstItemFragment,
						param1 + 1 + (param3 ?? param2),
					]);
				}

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
						generator.next().value;
					}
				},
				5, 1
			));
		}
		{
			secondCount.$(
				[1],
				(generator: any) => {
					for (let i: number = 2; i < secondCount._ + 10; i++) {
						const _K_index_asdf123: number = generator.next().value;
					}
				},
				8, 1, 5
			);
		}

		count.$();
		secondCount.$();
	}
})();
