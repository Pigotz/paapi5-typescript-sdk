export type Concat<String1, String2> = `${string & String1}${string & String2}`;
export type Prefix<Source, Prefix = ''> = Concat<Prefix, Source>;
export type Suffix<Source, Suffix = ''> = Concat<Source, Suffix>;

export type NullableKeys<Interface> = {
    [Key in keyof Interface]-?: undefined extends Interface[Key] ? Key : never;
}[keyof Interface];
