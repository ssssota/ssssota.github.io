import { css, cx } from "hono/css";

const defaultSymbol = Symbol("hono-utility-class-default");
const arbitrarySymbol = Symbol("hono-utility-class-arbitrary");

type CssReturn = ReturnType<typeof css>;
type ClassDefinitionObject<T extends string | number> = {
	[defaultSymbol]?: ((value: T) => CssReturn) | undefined;
	[arbitrarySymbol]?: ((value: string) => CssReturn) | undefined;
	// biome-ignore lint/suspicious/noExplicitAny:
	[key: string]: ClassDefinition<any> | undefined;
};
type ClassDefinition<T extends string | number> =
	| CssReturn
	| ClassDefinitionObject<T>;

const styles = {
	flex: css`display: flex;`,
	"justify-between": css`justify-content: space-between;`,
	gap: {
		[defaultSymbol]: (gap: number) => css`gap: ${gap * 4}px;`,
		[arbitrarySymbol]: (gap: string) => css`gap: ${gap};`,
	},
	items: {
		baseline: css`align-items: baseline;`,
	},
	bg: {
		white: css`background-color: white;`,
		black: css`background-color: black;`,
	},
	// biome-ignore lint/suspicious/noExplicitAny:
} as const satisfies Record<string, ClassDefinition<any>>;

type Styles = typeof styles;
type Style<Def> = keyof Def extends infer K
	? K extends keyof Def
		? K extends string
			? Def[K] extends CssReturn
				? K
				: // biome-ignore lint/suspicious/noExplicitAny:
					Def[K] extends ClassDefinitionObject<any>
					? StyleFromObject<Def[K]> extends infer S
						? S extends string
							? `${K}-${S}`
							: never
						: never
					: never
			: never
		: never
	: never;

// biome-ignore lint/suspicious/noExplicitAny:
type StyleFromObject<T extends ClassDefinitionObject<any>> =
	| StyleFromObjectDefault<T>
	| StyleFromObjectArbitrary<T>
	| StyleFromObjectKey<T>
	| StyleFromObjectNested<T>;
// biome-ignore lint/suspicious/noExplicitAny:
type StyleFromObjectDefault<T extends ClassDefinitionObject<any>> =
	T[typeof defaultSymbol] extends (arg: infer Arg) => CssReturn
		? Arg extends string | number
			? `${Arg}`
			: never
		: never;
// biome-ignore lint/suspicious/noExplicitAny:
type StyleFromObjectArbitrary<T extends ClassDefinitionObject<any>> =
	T[typeof arbitrarySymbol] extends (arg: string) => CssReturn
		? `[${string}]`
		: never;
// biome-ignore lint/suspicious/noExplicitAny:
type StyleFromObjectKey<T extends ClassDefinitionObject<any>> =
	keyof T extends infer K
		? K extends keyof T
			? T[K] extends CssReturn
				? K
				: never
			: never
		: never;
// biome-ignore lint/suspicious/noExplicitAny:
type StyleFromObjectNested<T extends ClassDefinitionObject<any>> =
	keyof T extends infer K
		? K extends keyof T
			? // biome-ignore lint/suspicious/noExplicitAny:
				T[K] extends ClassDefinitionObject<any>
				? StyleFromObject<T[K]>
				: never
			: never
		: never;

// biome-ignore lint/suspicious/noExplicitAny:
type Definition = ClassDefinitionObject<any>;

function createUtilityClassComposer<T extends Definition>(definition: T) {
	return (...classNames: Style<T>[]) =>
		cx(...classNames.map((className) => resolve(className, definition)));
}
export const c: (...classNames: Style<typeof styles>[]) => Promise<string> =
	createUtilityClassComposer(styles);

function resolve(className: string, definition: Definition): CssReturn {
	if (className in definition) return definition[className] as CssReturn;
	const [first, ...rest] = className.split("-");
	const restString = rest.join("-");
	if (!(first in definition)) throw new Error(`Invalid style: ${className}`);
	const obj = definition[first] as Definition;
	const arbitrary = restString.startsWith("[") && restString.endsWith("]");
	if (arbitrary) {
		const arbitraryValue = restString.slice(1, -1);
		const fn = obj[arbitrarySymbol] as (arg: string) => CssReturn;
		return fn(arbitraryValue);
	}
	const fn = obj[defaultSymbol];
	if (rest.length === 1 && typeof fn === "function") {
		const valueAsNumber = Number(restString);
		if (Number.isNaN(valueAsNumber)) return fn(restString);
		return fn(valueAsNumber);
	}
	return resolve(restString, obj);
}
