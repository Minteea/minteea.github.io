declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"live": {
"2023C/carto/20230828_21C.md": {
	id: "2023C/carto/20230828_21C.md";
  slug: "2023c/carto/20230828_21c";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
"2023C/carto/20230830_21C.md": {
	id: "2023C/carto/20230830_21C.md";
  slug: "2023c/carto/20230830_21c";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
"2023C/carto/20230901_21C.md": {
	id: "2023C/carto/20230901_21C.md";
  slug: "2023c/carto/20230901_21c";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
"2023C/fall-guys/20230821_21C.md": {
	id: "2023C/fall-guys/20230821_21C.md";
  slug: "2023c/fall-guys/20230821_21c";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
"2024A/crossing-guard-joe/20240205_20C.md": {
	id: "2024A/crossing-guard-joe/20240205_20C.md";
  slug: "2024a/crossing-guard-joe/20240205_20c";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
"2024A/crossing-guard-joe/20240206_21C.md": {
	id: "2024A/crossing-guard-joe/20240206_21C.md";
  slug: "2024a/crossing-guard-joe/20240206_21c";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
"2024A/little-shark/20240216_21C.md": {
	id: "2024A/little-shark/20240216_21C.md";
  slug: "2024a/little-shark/20240216_21c";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
"2024C/fishing/20240831_18C.md": {
	id: "2024C/fishing/20240831_18C.md";
  slug: "2024c/fishing/20240831_18c";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
"2024C/minecraft/20240818_23C.md": {
	id: "2024C/minecraft/20240818_23C.md";
  slug: "2024c/minecraft/20240818_23c";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
"2024C/minecraft/20240824_15B.md": {
	id: "2024C/minecraft/20240824_15B.md";
  slug: "2024c/minecraft/20240824_15b";
  body: string;
  collection: "live";
  data: any
} & { render(): Render[".md"] };
};
"post": {
"hello-world.mdx": {
	id: "hello-world.mdx";
  slug: "hello-world";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".mdx"] };
"live-audience-funny-rule.md": {
	id: "live-audience-funny-rule.md";
  slug: "live-audience-funny-rule";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"live-audience-instruction-appendix.md": {
	id: "live-audience-instruction-appendix.md";
  slug: "live-audience-instruction-appendix";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
"live-audience-instruction.md": {
	id: "live-audience-instruction.md";
  slug: "live-audience-instruction";
  body: string;
  collection: "post";
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] };
};
"video": {
"202112-architecture-daily.mdx": {
	id: "202112-architecture-daily.mdx";
  slug: "202112-architecture-daily";
  body: string;
  collection: "video";
  data: InferEntrySchema<"video">
} & { render(): Render[".mdx"] };
"202212-fall-guys-gift.mdx": {
	id: "202212-fall-guys-gift.mdx";
  slug: "202212-fall-guys-gift";
  body: string;
  collection: "video";
  data: InferEntrySchema<"video">
} & { render(): Render[".mdx"] };
"202302-turn-on-the-light.mdx": {
	id: "202302-turn-on-the-light.mdx";
  slug: "202302-turn-on-the-light";
  body: string;
  collection: "video";
  data: InferEntrySchema<"video">
} & { render(): Render[".mdx"] };
"202304-trolleybot.mdx": {
	id: "202304-trolleybot.mdx";
  slug: "202304-trolleybot";
  body: string;
  collection: "video";
  data: InferEntrySchema<"video">
} & { render(): Render[".mdx"] };
"202307-wechat-group.mdx": {
	id: "202307-wechat-group.mdx";
  slug: "202307-wechat-group";
  body: string;
  collection: "video";
  data: InferEntrySchema<"video">
} & { render(): Render[".mdx"] };
"202309-puppy-and-stars.mdx": {
	id: "202309-puppy-and-stars.mdx";
  slug: "202309-puppy-and-stars";
  body: string;
  collection: "video";
  data: InferEntrySchema<"video">
} & { render(): Render[".mdx"] };
"202402-birthday-0229.mdx": {
	id: "202402-birthday-0229.mdx";
  slug: "202402-birthday-0229";
  body: string;
  collection: "video";
  data: InferEntrySchema<"video">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../src/content/config.js");
}
