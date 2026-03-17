
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model subscriptions
 * 
 */
export type subscriptions = $Result.DefaultSelection<Prisma.$subscriptionsPayload>
/**
 * Model debiting_subscriptions
 * 
 */
export type debiting_subscriptions = $Result.DefaultSelection<Prisma.$debiting_subscriptionsPayload>
/**
 * Model category
 * 
 */
export type category = $Result.DefaultSelection<Prisma.$categoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriptions`: Exposes CRUD operations for the **subscriptions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscriptions.findMany()
    * ```
    */
  get subscriptions(): Prisma.subscriptionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.debiting_subscriptions`: Exposes CRUD operations for the **debiting_subscriptions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Debiting_subscriptions
    * const debiting_subscriptions = await prisma.debiting_subscriptions.findMany()
    * ```
    */
  get debiting_subscriptions(): Prisma.debiting_subscriptionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.categoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    subscriptions: 'subscriptions',
    debiting_subscriptions: 'debiting_subscriptions',
    category: 'category'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "subscriptions" | "debiting_subscriptions" | "category"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      subscriptions: {
        payload: Prisma.$subscriptionsPayload<ExtArgs>
        fields: Prisma.subscriptionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.subscriptionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.subscriptionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          findFirst: {
            args: Prisma.subscriptionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.subscriptionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          findMany: {
            args: Prisma.subscriptionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          create: {
            args: Prisma.subscriptionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          createMany: {
            args: Prisma.subscriptionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.subscriptionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          delete: {
            args: Prisma.subscriptionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          update: {
            args: Prisma.subscriptionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          deleteMany: {
            args: Prisma.subscriptionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.subscriptionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.subscriptionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          upsert: {
            args: Prisma.subscriptionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptions>
          }
          groupBy: {
            args: Prisma.subscriptionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.subscriptionsCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionsCountAggregateOutputType> | number
          }
        }
      }
      debiting_subscriptions: {
        payload: Prisma.$debiting_subscriptionsPayload<ExtArgs>
        fields: Prisma.debiting_subscriptionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.debiting_subscriptionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.debiting_subscriptionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload>
          }
          findFirst: {
            args: Prisma.debiting_subscriptionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.debiting_subscriptionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload>
          }
          findMany: {
            args: Prisma.debiting_subscriptionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload>[]
          }
          create: {
            args: Prisma.debiting_subscriptionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload>
          }
          createMany: {
            args: Prisma.debiting_subscriptionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.debiting_subscriptionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload>[]
          }
          delete: {
            args: Prisma.debiting_subscriptionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload>
          }
          update: {
            args: Prisma.debiting_subscriptionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload>
          }
          deleteMany: {
            args: Prisma.debiting_subscriptionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.debiting_subscriptionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.debiting_subscriptionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload>[]
          }
          upsert: {
            args: Prisma.debiting_subscriptionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$debiting_subscriptionsPayload>
          }
          aggregate: {
            args: Prisma.Debiting_subscriptionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDebiting_subscriptions>
          }
          groupBy: {
            args: Prisma.debiting_subscriptionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Debiting_subscriptionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.debiting_subscriptionsCountArgs<ExtArgs>
            result: $Utils.Optional<Debiting_subscriptionsCountAggregateOutputType> | number
          }
        }
      }
      category: {
        payload: Prisma.$categoryPayload<ExtArgs>
        fields: Prisma.categoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findFirst: {
            args: Prisma.categoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findMany: {
            args: Prisma.categoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          create: {
            args: Prisma.categoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          createMany: {
            args: Prisma.categoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          delete: {
            args: Prisma.categoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          update: {
            args: Prisma.categoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          deleteMany: {
            args: Prisma.categoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          upsert: {
            args: Prisma.categoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.categoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    subscriptions?: subscriptionsOmit
    debiting_subscriptions?: debiting_subscriptionsOmit
    category?: categoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    debiting_subscriptions: number
    subscriptions: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debiting_subscriptions?: boolean | UsersCountOutputTypeCountDebiting_subscriptionsArgs
    subscriptions?: boolean | UsersCountOutputTypeCountSubscriptionsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountDebiting_subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: debiting_subscriptionsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriptionsWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    debiting_subscriptions: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debiting_subscriptions?: boolean | CategoryCountOutputTypeCountDebiting_subscriptionsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountDebiting_subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: debiting_subscriptionsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    surname: string | null
    created_at: Date | null
    access_token_yoomoney: string | null
    email_ym: string | null
    password_ym: string | null
    is_enter_ym: boolean | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    surname: string | null
    created_at: Date | null
    access_token_yoomoney: string | null
    email_ym: string | null
    password_ym: string | null
    is_enter_ym: boolean | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    surname: number
    created_at: number
    access_token_yoomoney: number
    cookies: number
    email_ym: number
    password_ym: number
    is_enter_ym: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    surname?: true
    created_at?: true
    access_token_yoomoney?: true
    email_ym?: true
    password_ym?: true
    is_enter_ym?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    surname?: true
    created_at?: true
    access_token_yoomoney?: true
    email_ym?: true
    password_ym?: true
    is_enter_ym?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    surname?: true
    created_at?: true
    access_token_yoomoney?: true
    cookies?: true
    email_ym?: true
    password_ym?: true
    is_enter_ym?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    surname: string
    created_at: Date
    access_token_yoomoney: string | null
    cookies: JsonValue | null
    email_ym: string | null
    password_ym: string | null
    is_enter_ym: boolean | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    surname?: boolean
    created_at?: boolean
    access_token_yoomoney?: boolean
    cookies?: boolean
    email_ym?: boolean
    password_ym?: boolean
    is_enter_ym?: boolean
    debiting_subscriptions?: boolean | users$debiting_subscriptionsArgs<ExtArgs>
    subscriptions?: boolean | users$subscriptionsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    surname?: boolean
    created_at?: boolean
    access_token_yoomoney?: boolean
    cookies?: boolean
    email_ym?: boolean
    password_ym?: boolean
    is_enter_ym?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    surname?: boolean
    created_at?: boolean
    access_token_yoomoney?: boolean
    cookies?: boolean
    email_ym?: boolean
    password_ym?: boolean
    is_enter_ym?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    surname?: boolean
    created_at?: boolean
    access_token_yoomoney?: boolean
    cookies?: boolean
    email_ym?: boolean
    password_ym?: boolean
    is_enter_ym?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "surname" | "created_at" | "access_token_yoomoney" | "cookies" | "email_ym" | "password_ym" | "is_enter_ym", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debiting_subscriptions?: boolean | users$debiting_subscriptionsArgs<ExtArgs>
    subscriptions?: boolean | users$subscriptionsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      debiting_subscriptions: Prisma.$debiting_subscriptionsPayload<ExtArgs>[]
      subscriptions: Prisma.$subscriptionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string
      surname: string
      created_at: Date
      access_token_yoomoney: string | null
      cookies: Prisma.JsonValue | null
      email_ym: string | null
      password_ym: string | null
      is_enter_ym: boolean | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    debiting_subscriptions<T extends users$debiting_subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, users$debiting_subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends users$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, users$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
    readonly surname: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly access_token_yoomoney: FieldRef<"users", 'String'>
    readonly cookies: FieldRef<"users", 'Json'>
    readonly email_ym: FieldRef<"users", 'String'>
    readonly password_ym: FieldRef<"users", 'String'>
    readonly is_enter_ym: FieldRef<"users", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.debiting_subscriptions
   */
  export type users$debiting_subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    where?: debiting_subscriptionsWhereInput
    orderBy?: debiting_subscriptionsOrderByWithRelationInput | debiting_subscriptionsOrderByWithRelationInput[]
    cursor?: debiting_subscriptionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Debiting_subscriptionsScalarFieldEnum | Debiting_subscriptionsScalarFieldEnum[]
  }

  /**
   * users.subscriptions
   */
  export type users$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    where?: subscriptionsWhereInput
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    cursor?: subscriptionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model subscriptions
   */

  export type AggregateSubscriptions = {
    _count: SubscriptionsCountAggregateOutputType | null
    _avg: SubscriptionsAvgAggregateOutputType | null
    _sum: SubscriptionsSumAggregateOutputType | null
    _min: SubscriptionsMinAggregateOutputType | null
    _max: SubscriptionsMaxAggregateOutputType | null
  }

  export type SubscriptionsAvgAggregateOutputType = {
    id: number | null
    category_id: number | null
    period: number | null
    price: Decimal | null
    id_user: number | null
  }

  export type SubscriptionsSumAggregateOutputType = {
    id: number | null
    category_id: number | null
    period: number | null
    price: Decimal | null
    id_user: number | null
  }

  export type SubscriptionsMinAggregateOutputType = {
    id: number | null
    name: string | null
    category_id: number | null
    period: number | null
    end_date: Date | null
    price: Decimal | null
    flag_auto: boolean | null
    img: Bytes | null
    url: string | null
    id_user: number | null
  }

  export type SubscriptionsMaxAggregateOutputType = {
    id: number | null
    name: string | null
    category_id: number | null
    period: number | null
    end_date: Date | null
    price: Decimal | null
    flag_auto: boolean | null
    img: Bytes | null
    url: string | null
    id_user: number | null
  }

  export type SubscriptionsCountAggregateOutputType = {
    id: number
    name: number
    category_id: number
    period: number
    end_date: number
    price: number
    flag_auto: number
    img: number
    url: number
    id_user: number
    _all: number
  }


  export type SubscriptionsAvgAggregateInputType = {
    id?: true
    category_id?: true
    period?: true
    price?: true
    id_user?: true
  }

  export type SubscriptionsSumAggregateInputType = {
    id?: true
    category_id?: true
    period?: true
    price?: true
    id_user?: true
  }

  export type SubscriptionsMinAggregateInputType = {
    id?: true
    name?: true
    category_id?: true
    period?: true
    end_date?: true
    price?: true
    flag_auto?: true
    img?: true
    url?: true
    id_user?: true
  }

  export type SubscriptionsMaxAggregateInputType = {
    id?: true
    name?: true
    category_id?: true
    period?: true
    end_date?: true
    price?: true
    flag_auto?: true
    img?: true
    url?: true
    id_user?: true
  }

  export type SubscriptionsCountAggregateInputType = {
    id?: true
    name?: true
    category_id?: true
    period?: true
    end_date?: true
    price?: true
    flag_auto?: true
    img?: true
    url?: true
    id_user?: true
    _all?: true
  }

  export type SubscriptionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriptions to aggregate.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned subscriptions
    **/
    _count?: true | SubscriptionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionsMaxAggregateInputType
  }

  export type GetSubscriptionsAggregateType<T extends SubscriptionsAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptions[P]>
      : GetScalarType<T[P], AggregateSubscriptions[P]>
  }




  export type subscriptionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriptionsWhereInput
    orderBy?: subscriptionsOrderByWithAggregationInput | subscriptionsOrderByWithAggregationInput[]
    by: SubscriptionsScalarFieldEnum[] | SubscriptionsScalarFieldEnum
    having?: subscriptionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionsCountAggregateInputType | true
    _avg?: SubscriptionsAvgAggregateInputType
    _sum?: SubscriptionsSumAggregateInputType
    _min?: SubscriptionsMinAggregateInputType
    _max?: SubscriptionsMaxAggregateInputType
  }

  export type SubscriptionsGroupByOutputType = {
    id: number
    name: string
    category_id: number | null
    period: number | null
    end_date: Date | null
    price: Decimal | null
    flag_auto: boolean | null
    img: Bytes | null
    url: string | null
    id_user: number | null
    _count: SubscriptionsCountAggregateOutputType | null
    _avg: SubscriptionsAvgAggregateOutputType | null
    _sum: SubscriptionsSumAggregateOutputType | null
    _min: SubscriptionsMinAggregateOutputType | null
    _max: SubscriptionsMaxAggregateOutputType | null
  }

  type GetSubscriptionsGroupByPayload<T extends subscriptionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionsGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionsGroupByOutputType[P]>
        }
      >
    >


  export type subscriptionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category_id?: boolean
    period?: boolean
    end_date?: boolean
    price?: boolean
    flag_auto?: boolean
    img?: boolean
    url?: boolean
    id_user?: boolean
    users?: boolean | subscriptions$usersArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category_id?: boolean
    period?: boolean
    end_date?: boolean
    price?: boolean
    flag_auto?: boolean
    img?: boolean
    url?: boolean
    id_user?: boolean
    users?: boolean | subscriptions$usersArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category_id?: boolean
    period?: boolean
    end_date?: boolean
    price?: boolean
    flag_auto?: boolean
    img?: boolean
    url?: boolean
    id_user?: boolean
    users?: boolean | subscriptions$usersArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectScalar = {
    id?: boolean
    name?: boolean
    category_id?: boolean
    period?: boolean
    end_date?: boolean
    price?: boolean
    flag_auto?: boolean
    img?: boolean
    url?: boolean
    id_user?: boolean
  }

  export type subscriptionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category_id" | "period" | "end_date" | "price" | "flag_auto" | "img" | "url" | "id_user", ExtArgs["result"]["subscriptions"]>
  export type subscriptionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | subscriptions$usersArgs<ExtArgs>
  }
  export type subscriptionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | subscriptions$usersArgs<ExtArgs>
  }
  export type subscriptionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | subscriptions$usersArgs<ExtArgs>
  }

  export type $subscriptionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subscriptions"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      category_id: number | null
      period: number | null
      end_date: Date | null
      price: Prisma.Decimal | null
      flag_auto: boolean | null
      img: Prisma.Bytes | null
      url: string | null
      id_user: number | null
    }, ExtArgs["result"]["subscriptions"]>
    composites: {}
  }

  type subscriptionsGetPayload<S extends boolean | null | undefined | subscriptionsDefaultArgs> = $Result.GetResult<Prisma.$subscriptionsPayload, S>

  type subscriptionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<subscriptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionsCountAggregateInputType | true
    }

  export interface subscriptionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['subscriptions'], meta: { name: 'subscriptions' } }
    /**
     * Find zero or one Subscriptions that matches the filter.
     * @param {subscriptionsFindUniqueArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends subscriptionsFindUniqueArgs>(args: SelectSubset<T, subscriptionsFindUniqueArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscriptions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {subscriptionsFindUniqueOrThrowArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends subscriptionsFindUniqueOrThrowArgs>(args: SelectSubset<T, subscriptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindFirstArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends subscriptionsFindFirstArgs>(args?: SelectSubset<T, subscriptionsFindFirstArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriptions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindFirstOrThrowArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends subscriptionsFindFirstOrThrowArgs>(args?: SelectSubset<T, subscriptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscriptions.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscriptions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends subscriptionsFindManyArgs>(args?: SelectSubset<T, subscriptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscriptions.
     * @param {subscriptionsCreateArgs} args - Arguments to create a Subscriptions.
     * @example
     * // Create one Subscriptions
     * const Subscriptions = await prisma.subscriptions.create({
     *   data: {
     *     // ... data to create a Subscriptions
     *   }
     * })
     * 
     */
    create<T extends subscriptionsCreateArgs>(args: SelectSubset<T, subscriptionsCreateArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {subscriptionsCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscriptions = await prisma.subscriptions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends subscriptionsCreateManyArgs>(args?: SelectSubset<T, subscriptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {subscriptionsCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscriptions = await prisma.subscriptions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends subscriptionsCreateManyAndReturnArgs>(args?: SelectSubset<T, subscriptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscriptions.
     * @param {subscriptionsDeleteArgs} args - Arguments to delete one Subscriptions.
     * @example
     * // Delete one Subscriptions
     * const Subscriptions = await prisma.subscriptions.delete({
     *   where: {
     *     // ... filter to delete one Subscriptions
     *   }
     * })
     * 
     */
    delete<T extends subscriptionsDeleteArgs>(args: SelectSubset<T, subscriptionsDeleteArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscriptions.
     * @param {subscriptionsUpdateArgs} args - Arguments to update one Subscriptions.
     * @example
     * // Update one Subscriptions
     * const subscriptions = await prisma.subscriptions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends subscriptionsUpdateArgs>(args: SelectSubset<T, subscriptionsUpdateArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {subscriptionsDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscriptions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends subscriptionsDeleteManyArgs>(args?: SelectSubset<T, subscriptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscriptions = await prisma.subscriptions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends subscriptionsUpdateManyArgs>(args: SelectSubset<T, subscriptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {subscriptionsUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscriptions = await prisma.subscriptions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends subscriptionsUpdateManyAndReturnArgs>(args: SelectSubset<T, subscriptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscriptions.
     * @param {subscriptionsUpsertArgs} args - Arguments to update or create a Subscriptions.
     * @example
     * // Update or create a Subscriptions
     * const subscriptions = await prisma.subscriptions.upsert({
     *   create: {
     *     // ... data to create a Subscriptions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscriptions we want to update
     *   }
     * })
     */
    upsert<T extends subscriptionsUpsertArgs>(args: SelectSubset<T, subscriptionsUpsertArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscriptions.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends subscriptionsCountArgs>(
      args?: Subset<T, subscriptionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionsAggregateArgs>(args: Subset<T, SubscriptionsAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionsAggregateType<T>>

    /**
     * Group by Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends subscriptionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: subscriptionsGroupByArgs['orderBy'] }
        : { orderBy?: subscriptionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, subscriptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the subscriptions model
   */
  readonly fields: subscriptionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for subscriptions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__subscriptionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends subscriptions$usersArgs<ExtArgs> = {}>(args?: Subset<T, subscriptions$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the subscriptions model
   */
  interface subscriptionsFieldRefs {
    readonly id: FieldRef<"subscriptions", 'Int'>
    readonly name: FieldRef<"subscriptions", 'String'>
    readonly category_id: FieldRef<"subscriptions", 'Int'>
    readonly period: FieldRef<"subscriptions", 'Int'>
    readonly end_date: FieldRef<"subscriptions", 'DateTime'>
    readonly price: FieldRef<"subscriptions", 'Decimal'>
    readonly flag_auto: FieldRef<"subscriptions", 'Boolean'>
    readonly img: FieldRef<"subscriptions", 'Bytes'>
    readonly url: FieldRef<"subscriptions", 'String'>
    readonly id_user: FieldRef<"subscriptions", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * subscriptions findUnique
   */
  export type subscriptionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions findUniqueOrThrow
   */
  export type subscriptionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions findFirst
   */
  export type subscriptionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriptions.
     */
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions findFirstOrThrow
   */
  export type subscriptionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriptions.
     */
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions findMany
   */
  export type subscriptionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions create
   */
  export type subscriptionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to create a subscriptions.
     */
    data: XOR<subscriptionsCreateInput, subscriptionsUncheckedCreateInput>
  }

  /**
   * subscriptions createMany
   */
  export type subscriptionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many subscriptions.
     */
    data: subscriptionsCreateManyInput | subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscriptions createManyAndReturn
   */
  export type subscriptionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to create many subscriptions.
     */
    data: subscriptionsCreateManyInput | subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * subscriptions update
   */
  export type subscriptionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to update a subscriptions.
     */
    data: XOR<subscriptionsUpdateInput, subscriptionsUncheckedUpdateInput>
    /**
     * Choose, which subscriptions to update.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions updateMany
   */
  export type subscriptionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update subscriptions.
     */
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which subscriptions to update
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to update.
     */
    limit?: number
  }

  /**
   * subscriptions updateManyAndReturn
   */
  export type subscriptionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to update subscriptions.
     */
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which subscriptions to update
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * subscriptions upsert
   */
  export type subscriptionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * The filter to search for the subscriptions to update in case it exists.
     */
    where: subscriptionsWhereUniqueInput
    /**
     * In case the subscriptions found by the `where` argument doesn't exist, create a new subscriptions with this data.
     */
    create: XOR<subscriptionsCreateInput, subscriptionsUncheckedCreateInput>
    /**
     * In case the subscriptions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<subscriptionsUpdateInput, subscriptionsUncheckedUpdateInput>
  }

  /**
   * subscriptions delete
   */
  export type subscriptionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter which subscriptions to delete.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions deleteMany
   */
  export type subscriptionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriptions to delete
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to delete.
     */
    limit?: number
  }

  /**
   * subscriptions.users
   */
  export type subscriptions$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * subscriptions without action
   */
  export type subscriptionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
  }


  /**
   * Model debiting_subscriptions
   */

  export type AggregateDebiting_subscriptions = {
    _count: Debiting_subscriptionsCountAggregateOutputType | null
    _avg: Debiting_subscriptionsAvgAggregateOutputType | null
    _sum: Debiting_subscriptionsSumAggregateOutputType | null
    _min: Debiting_subscriptionsMinAggregateOutputType | null
    _max: Debiting_subscriptionsMaxAggregateOutputType | null
  }

  export type Debiting_subscriptionsAvgAggregateOutputType = {
    category_id: number | null
    user_id: number | null
    price: Decimal | null
  }

  export type Debiting_subscriptionsSumAggregateOutputType = {
    category_id: number | null
    user_id: number | null
    price: Decimal | null
  }

  export type Debiting_subscriptionsMinAggregateOutputType = {
    date: Date | null
    category_id: number | null
    user_id: number | null
    price: Decimal | null
  }

  export type Debiting_subscriptionsMaxAggregateOutputType = {
    date: Date | null
    category_id: number | null
    user_id: number | null
    price: Decimal | null
  }

  export type Debiting_subscriptionsCountAggregateOutputType = {
    date: number
    category_id: number
    user_id: number
    price: number
    _all: number
  }


  export type Debiting_subscriptionsAvgAggregateInputType = {
    category_id?: true
    user_id?: true
    price?: true
  }

  export type Debiting_subscriptionsSumAggregateInputType = {
    category_id?: true
    user_id?: true
    price?: true
  }

  export type Debiting_subscriptionsMinAggregateInputType = {
    date?: true
    category_id?: true
    user_id?: true
    price?: true
  }

  export type Debiting_subscriptionsMaxAggregateInputType = {
    date?: true
    category_id?: true
    user_id?: true
    price?: true
  }

  export type Debiting_subscriptionsCountAggregateInputType = {
    date?: true
    category_id?: true
    user_id?: true
    price?: true
    _all?: true
  }

  export type Debiting_subscriptionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which debiting_subscriptions to aggregate.
     */
    where?: debiting_subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of debiting_subscriptions to fetch.
     */
    orderBy?: debiting_subscriptionsOrderByWithRelationInput | debiting_subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: debiting_subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` debiting_subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` debiting_subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned debiting_subscriptions
    **/
    _count?: true | Debiting_subscriptionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Debiting_subscriptionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Debiting_subscriptionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Debiting_subscriptionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Debiting_subscriptionsMaxAggregateInputType
  }

  export type GetDebiting_subscriptionsAggregateType<T extends Debiting_subscriptionsAggregateArgs> = {
        [P in keyof T & keyof AggregateDebiting_subscriptions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDebiting_subscriptions[P]>
      : GetScalarType<T[P], AggregateDebiting_subscriptions[P]>
  }




  export type debiting_subscriptionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: debiting_subscriptionsWhereInput
    orderBy?: debiting_subscriptionsOrderByWithAggregationInput | debiting_subscriptionsOrderByWithAggregationInput[]
    by: Debiting_subscriptionsScalarFieldEnum[] | Debiting_subscriptionsScalarFieldEnum
    having?: debiting_subscriptionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Debiting_subscriptionsCountAggregateInputType | true
    _avg?: Debiting_subscriptionsAvgAggregateInputType
    _sum?: Debiting_subscriptionsSumAggregateInputType
    _min?: Debiting_subscriptionsMinAggregateInputType
    _max?: Debiting_subscriptionsMaxAggregateInputType
  }

  export type Debiting_subscriptionsGroupByOutputType = {
    date: Date
    category_id: number
    user_id: number
    price: Decimal
    _count: Debiting_subscriptionsCountAggregateOutputType | null
    _avg: Debiting_subscriptionsAvgAggregateOutputType | null
    _sum: Debiting_subscriptionsSumAggregateOutputType | null
    _min: Debiting_subscriptionsMinAggregateOutputType | null
    _max: Debiting_subscriptionsMaxAggregateOutputType | null
  }

  type GetDebiting_subscriptionsGroupByPayload<T extends debiting_subscriptionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Debiting_subscriptionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Debiting_subscriptionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Debiting_subscriptionsGroupByOutputType[P]>
            : GetScalarType<T[P], Debiting_subscriptionsGroupByOutputType[P]>
        }
      >
    >


  export type debiting_subscriptionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    category_id?: boolean
    user_id?: boolean
    price?: boolean
    category?: boolean | categoryDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debiting_subscriptions"]>

  export type debiting_subscriptionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    category_id?: boolean
    user_id?: boolean
    price?: boolean
    category?: boolean | categoryDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debiting_subscriptions"]>

  export type debiting_subscriptionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    date?: boolean
    category_id?: boolean
    user_id?: boolean
    price?: boolean
    category?: boolean | categoryDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debiting_subscriptions"]>

  export type debiting_subscriptionsSelectScalar = {
    date?: boolean
    category_id?: boolean
    user_id?: boolean
    price?: boolean
  }

  export type debiting_subscriptionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"date" | "category_id" | "user_id" | "price", ExtArgs["result"]["debiting_subscriptions"]>
  export type debiting_subscriptionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | categoryDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type debiting_subscriptionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | categoryDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type debiting_subscriptionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | categoryDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $debiting_subscriptionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "debiting_subscriptions"
    objects: {
      category: Prisma.$categoryPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      date: Date
      category_id: number
      user_id: number
      price: Prisma.Decimal
    }, ExtArgs["result"]["debiting_subscriptions"]>
    composites: {}
  }

  type debiting_subscriptionsGetPayload<S extends boolean | null | undefined | debiting_subscriptionsDefaultArgs> = $Result.GetResult<Prisma.$debiting_subscriptionsPayload, S>

  type debiting_subscriptionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<debiting_subscriptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Debiting_subscriptionsCountAggregateInputType | true
    }

  export interface debiting_subscriptionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['debiting_subscriptions'], meta: { name: 'debiting_subscriptions' } }
    /**
     * Find zero or one Debiting_subscriptions that matches the filter.
     * @param {debiting_subscriptionsFindUniqueArgs} args - Arguments to find a Debiting_subscriptions
     * @example
     * // Get one Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends debiting_subscriptionsFindUniqueArgs>(args: SelectSubset<T, debiting_subscriptionsFindUniqueArgs<ExtArgs>>): Prisma__debiting_subscriptionsClient<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Debiting_subscriptions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {debiting_subscriptionsFindUniqueOrThrowArgs} args - Arguments to find a Debiting_subscriptions
     * @example
     * // Get one Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends debiting_subscriptionsFindUniqueOrThrowArgs>(args: SelectSubset<T, debiting_subscriptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__debiting_subscriptionsClient<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Debiting_subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {debiting_subscriptionsFindFirstArgs} args - Arguments to find a Debiting_subscriptions
     * @example
     * // Get one Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends debiting_subscriptionsFindFirstArgs>(args?: SelectSubset<T, debiting_subscriptionsFindFirstArgs<ExtArgs>>): Prisma__debiting_subscriptionsClient<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Debiting_subscriptions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {debiting_subscriptionsFindFirstOrThrowArgs} args - Arguments to find a Debiting_subscriptions
     * @example
     * // Get one Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends debiting_subscriptionsFindFirstOrThrowArgs>(args?: SelectSubset<T, debiting_subscriptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__debiting_subscriptionsClient<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Debiting_subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {debiting_subscriptionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.findMany()
     * 
     * // Get first 10 Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.findMany({ take: 10 })
     * 
     * // Only select the `date`
     * const debiting_subscriptionsWithDateOnly = await prisma.debiting_subscriptions.findMany({ select: { date: true } })
     * 
     */
    findMany<T extends debiting_subscriptionsFindManyArgs>(args?: SelectSubset<T, debiting_subscriptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Debiting_subscriptions.
     * @param {debiting_subscriptionsCreateArgs} args - Arguments to create a Debiting_subscriptions.
     * @example
     * // Create one Debiting_subscriptions
     * const Debiting_subscriptions = await prisma.debiting_subscriptions.create({
     *   data: {
     *     // ... data to create a Debiting_subscriptions
     *   }
     * })
     * 
     */
    create<T extends debiting_subscriptionsCreateArgs>(args: SelectSubset<T, debiting_subscriptionsCreateArgs<ExtArgs>>): Prisma__debiting_subscriptionsClient<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Debiting_subscriptions.
     * @param {debiting_subscriptionsCreateManyArgs} args - Arguments to create many Debiting_subscriptions.
     * @example
     * // Create many Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends debiting_subscriptionsCreateManyArgs>(args?: SelectSubset<T, debiting_subscriptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Debiting_subscriptions and returns the data saved in the database.
     * @param {debiting_subscriptionsCreateManyAndReturnArgs} args - Arguments to create many Debiting_subscriptions.
     * @example
     * // Create many Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Debiting_subscriptions and only return the `date`
     * const debiting_subscriptionsWithDateOnly = await prisma.debiting_subscriptions.createManyAndReturn({
     *   select: { date: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends debiting_subscriptionsCreateManyAndReturnArgs>(args?: SelectSubset<T, debiting_subscriptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Debiting_subscriptions.
     * @param {debiting_subscriptionsDeleteArgs} args - Arguments to delete one Debiting_subscriptions.
     * @example
     * // Delete one Debiting_subscriptions
     * const Debiting_subscriptions = await prisma.debiting_subscriptions.delete({
     *   where: {
     *     // ... filter to delete one Debiting_subscriptions
     *   }
     * })
     * 
     */
    delete<T extends debiting_subscriptionsDeleteArgs>(args: SelectSubset<T, debiting_subscriptionsDeleteArgs<ExtArgs>>): Prisma__debiting_subscriptionsClient<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Debiting_subscriptions.
     * @param {debiting_subscriptionsUpdateArgs} args - Arguments to update one Debiting_subscriptions.
     * @example
     * // Update one Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends debiting_subscriptionsUpdateArgs>(args: SelectSubset<T, debiting_subscriptionsUpdateArgs<ExtArgs>>): Prisma__debiting_subscriptionsClient<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Debiting_subscriptions.
     * @param {debiting_subscriptionsDeleteManyArgs} args - Arguments to filter Debiting_subscriptions to delete.
     * @example
     * // Delete a few Debiting_subscriptions
     * const { count } = await prisma.debiting_subscriptions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends debiting_subscriptionsDeleteManyArgs>(args?: SelectSubset<T, debiting_subscriptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Debiting_subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {debiting_subscriptionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends debiting_subscriptionsUpdateManyArgs>(args: SelectSubset<T, debiting_subscriptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Debiting_subscriptions and returns the data updated in the database.
     * @param {debiting_subscriptionsUpdateManyAndReturnArgs} args - Arguments to update many Debiting_subscriptions.
     * @example
     * // Update many Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Debiting_subscriptions and only return the `date`
     * const debiting_subscriptionsWithDateOnly = await prisma.debiting_subscriptions.updateManyAndReturn({
     *   select: { date: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends debiting_subscriptionsUpdateManyAndReturnArgs>(args: SelectSubset<T, debiting_subscriptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Debiting_subscriptions.
     * @param {debiting_subscriptionsUpsertArgs} args - Arguments to update or create a Debiting_subscriptions.
     * @example
     * // Update or create a Debiting_subscriptions
     * const debiting_subscriptions = await prisma.debiting_subscriptions.upsert({
     *   create: {
     *     // ... data to create a Debiting_subscriptions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Debiting_subscriptions we want to update
     *   }
     * })
     */
    upsert<T extends debiting_subscriptionsUpsertArgs>(args: SelectSubset<T, debiting_subscriptionsUpsertArgs<ExtArgs>>): Prisma__debiting_subscriptionsClient<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Debiting_subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {debiting_subscriptionsCountArgs} args - Arguments to filter Debiting_subscriptions to count.
     * @example
     * // Count the number of Debiting_subscriptions
     * const count = await prisma.debiting_subscriptions.count({
     *   where: {
     *     // ... the filter for the Debiting_subscriptions we want to count
     *   }
     * })
    **/
    count<T extends debiting_subscriptionsCountArgs>(
      args?: Subset<T, debiting_subscriptionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Debiting_subscriptionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Debiting_subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Debiting_subscriptionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Debiting_subscriptionsAggregateArgs>(args: Subset<T, Debiting_subscriptionsAggregateArgs>): Prisma.PrismaPromise<GetDebiting_subscriptionsAggregateType<T>>

    /**
     * Group by Debiting_subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {debiting_subscriptionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends debiting_subscriptionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: debiting_subscriptionsGroupByArgs['orderBy'] }
        : { orderBy?: debiting_subscriptionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, debiting_subscriptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebiting_subscriptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the debiting_subscriptions model
   */
  readonly fields: debiting_subscriptionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for debiting_subscriptions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__debiting_subscriptionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends categoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, categoryDefaultArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the debiting_subscriptions model
   */
  interface debiting_subscriptionsFieldRefs {
    readonly date: FieldRef<"debiting_subscriptions", 'DateTime'>
    readonly category_id: FieldRef<"debiting_subscriptions", 'Int'>
    readonly user_id: FieldRef<"debiting_subscriptions", 'Int'>
    readonly price: FieldRef<"debiting_subscriptions", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * debiting_subscriptions findUnique
   */
  export type debiting_subscriptionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which debiting_subscriptions to fetch.
     */
    where: debiting_subscriptionsWhereUniqueInput
  }

  /**
   * debiting_subscriptions findUniqueOrThrow
   */
  export type debiting_subscriptionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which debiting_subscriptions to fetch.
     */
    where: debiting_subscriptionsWhereUniqueInput
  }

  /**
   * debiting_subscriptions findFirst
   */
  export type debiting_subscriptionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which debiting_subscriptions to fetch.
     */
    where?: debiting_subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of debiting_subscriptions to fetch.
     */
    orderBy?: debiting_subscriptionsOrderByWithRelationInput | debiting_subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for debiting_subscriptions.
     */
    cursor?: debiting_subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` debiting_subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` debiting_subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of debiting_subscriptions.
     */
    distinct?: Debiting_subscriptionsScalarFieldEnum | Debiting_subscriptionsScalarFieldEnum[]
  }

  /**
   * debiting_subscriptions findFirstOrThrow
   */
  export type debiting_subscriptionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which debiting_subscriptions to fetch.
     */
    where?: debiting_subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of debiting_subscriptions to fetch.
     */
    orderBy?: debiting_subscriptionsOrderByWithRelationInput | debiting_subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for debiting_subscriptions.
     */
    cursor?: debiting_subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` debiting_subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` debiting_subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of debiting_subscriptions.
     */
    distinct?: Debiting_subscriptionsScalarFieldEnum | Debiting_subscriptionsScalarFieldEnum[]
  }

  /**
   * debiting_subscriptions findMany
   */
  export type debiting_subscriptionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which debiting_subscriptions to fetch.
     */
    where?: debiting_subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of debiting_subscriptions to fetch.
     */
    orderBy?: debiting_subscriptionsOrderByWithRelationInput | debiting_subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing debiting_subscriptions.
     */
    cursor?: debiting_subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` debiting_subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` debiting_subscriptions.
     */
    skip?: number
    distinct?: Debiting_subscriptionsScalarFieldEnum | Debiting_subscriptionsScalarFieldEnum[]
  }

  /**
   * debiting_subscriptions create
   */
  export type debiting_subscriptionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to create a debiting_subscriptions.
     */
    data: XOR<debiting_subscriptionsCreateInput, debiting_subscriptionsUncheckedCreateInput>
  }

  /**
   * debiting_subscriptions createMany
   */
  export type debiting_subscriptionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many debiting_subscriptions.
     */
    data: debiting_subscriptionsCreateManyInput | debiting_subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * debiting_subscriptions createManyAndReturn
   */
  export type debiting_subscriptionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to create many debiting_subscriptions.
     */
    data: debiting_subscriptionsCreateManyInput | debiting_subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * debiting_subscriptions update
   */
  export type debiting_subscriptionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to update a debiting_subscriptions.
     */
    data: XOR<debiting_subscriptionsUpdateInput, debiting_subscriptionsUncheckedUpdateInput>
    /**
     * Choose, which debiting_subscriptions to update.
     */
    where: debiting_subscriptionsWhereUniqueInput
  }

  /**
   * debiting_subscriptions updateMany
   */
  export type debiting_subscriptionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update debiting_subscriptions.
     */
    data: XOR<debiting_subscriptionsUpdateManyMutationInput, debiting_subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which debiting_subscriptions to update
     */
    where?: debiting_subscriptionsWhereInput
    /**
     * Limit how many debiting_subscriptions to update.
     */
    limit?: number
  }

  /**
   * debiting_subscriptions updateManyAndReturn
   */
  export type debiting_subscriptionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to update debiting_subscriptions.
     */
    data: XOR<debiting_subscriptionsUpdateManyMutationInput, debiting_subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which debiting_subscriptions to update
     */
    where?: debiting_subscriptionsWhereInput
    /**
     * Limit how many debiting_subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * debiting_subscriptions upsert
   */
  export type debiting_subscriptionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    /**
     * The filter to search for the debiting_subscriptions to update in case it exists.
     */
    where: debiting_subscriptionsWhereUniqueInput
    /**
     * In case the debiting_subscriptions found by the `where` argument doesn't exist, create a new debiting_subscriptions with this data.
     */
    create: XOR<debiting_subscriptionsCreateInput, debiting_subscriptionsUncheckedCreateInput>
    /**
     * In case the debiting_subscriptions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<debiting_subscriptionsUpdateInput, debiting_subscriptionsUncheckedUpdateInput>
  }

  /**
   * debiting_subscriptions delete
   */
  export type debiting_subscriptionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    /**
     * Filter which debiting_subscriptions to delete.
     */
    where: debiting_subscriptionsWhereUniqueInput
  }

  /**
   * debiting_subscriptions deleteMany
   */
  export type debiting_subscriptionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which debiting_subscriptions to delete
     */
    where?: debiting_subscriptionsWhereInput
    /**
     * Limit how many debiting_subscriptions to delete.
     */
    limit?: number
  }

  /**
   * debiting_subscriptions without action
   */
  export type debiting_subscriptionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
  }


  /**
   * Model category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    color: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    color: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    color: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which category to aggregate.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type categoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoryWhereInput
    orderBy?: categoryOrderByWithAggregationInput | categoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: categoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string | null
    color: string | null
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends categoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type categorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    debiting_subscriptions?: boolean | category$debiting_subscriptionsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type categorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
  }, ExtArgs["result"]["category"]>

  export type categorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
  }, ExtArgs["result"]["category"]>

  export type categorySelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
  }

  export type categoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color", ExtArgs["result"]["category"]>
  export type categoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debiting_subscriptions?: boolean | category$debiting_subscriptionsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type categoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type categoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $categoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "category"
    objects: {
      debiting_subscriptions: Prisma.$debiting_subscriptionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      color: string | null
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type categoryGetPayload<S extends boolean | null | undefined | categoryDefaultArgs> = $Result.GetResult<Prisma.$categoryPayload, S>

  type categoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface categoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['category'], meta: { name: 'category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {categoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoryFindUniqueArgs>(args: SelectSubset<T, categoryFindUniqueArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoryFindUniqueOrThrowArgs>(args: SelectSubset<T, categoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoryFindFirstArgs>(args?: SelectSubset<T, categoryFindFirstArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoryFindFirstOrThrowArgs>(args?: SelectSubset<T, categoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends categoryFindManyArgs>(args?: SelectSubset<T, categoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {categoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends categoryCreateArgs>(args: SelectSubset<T, categoryCreateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoryCreateManyArgs>(args?: SelectSubset<T, categoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {categoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoryCreateManyAndReturnArgs>(args?: SelectSubset<T, categoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {categoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends categoryDeleteArgs>(args: SelectSubset<T, categoryDeleteArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {categoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoryUpdateArgs>(args: SelectSubset<T, categoryUpdateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoryDeleteManyArgs>(args?: SelectSubset<T, categoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoryUpdateManyArgs>(args: SelectSubset<T, categoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {categoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends categoryUpdateManyAndReturnArgs>(args: SelectSubset<T, categoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {categoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends categoryUpsertArgs>(args: SelectSubset<T, categoryUpsertArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoryCountArgs>(
      args?: Subset<T, categoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoryGroupByArgs['orderBy'] }
        : { orderBy?: categoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the category model
   */
  readonly fields: categoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    debiting_subscriptions<T extends category$debiting_subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, category$debiting_subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$debiting_subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the category model
   */
  interface categoryFieldRefs {
    readonly id: FieldRef<"category", 'Int'>
    readonly name: FieldRef<"category", 'String'>
    readonly color: FieldRef<"category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * category findUnique
   */
  export type categoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findUniqueOrThrow
   */
  export type categoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findFirst
   */
  export type categoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findFirstOrThrow
   */
  export type categoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findMany
   */
  export type categoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category create
   */
  export type categoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to create a category.
     */
    data?: XOR<categoryCreateInput, categoryUncheckedCreateInput>
  }

  /**
   * category createMany
   */
  export type categoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * category createManyAndReturn
   */
  export type categoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * category update
   */
  export type categoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to update a category.
     */
    data: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
    /**
     * Choose, which category to update.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category updateMany
   */
  export type categoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * category updateManyAndReturn
   */
  export type categoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * category upsert
   */
  export type categoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The filter to search for the category to update in case it exists.
     */
    where: categoryWhereUniqueInput
    /**
     * In case the category found by the `where` argument doesn't exist, create a new category with this data.
     */
    create: XOR<categoryCreateInput, categoryUncheckedCreateInput>
    /**
     * In case the category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
  }

  /**
   * category delete
   */
  export type categoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter which category to delete.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category deleteMany
   */
  export type categoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * category.debiting_subscriptions
   */
  export type category$debiting_subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the debiting_subscriptions
     */
    select?: debiting_subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the debiting_subscriptions
     */
    omit?: debiting_subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: debiting_subscriptionsInclude<ExtArgs> | null
    where?: debiting_subscriptionsWhereInput
    orderBy?: debiting_subscriptionsOrderByWithRelationInput | debiting_subscriptionsOrderByWithRelationInput[]
    cursor?: debiting_subscriptionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Debiting_subscriptionsScalarFieldEnum | Debiting_subscriptionsScalarFieldEnum[]
  }

  /**
   * category without action
   */
  export type categoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    surname: 'surname',
    created_at: 'created_at',
    access_token_yoomoney: 'access_token_yoomoney',
    cookies: 'cookies',
    email_ym: 'email_ym',
    password_ym: 'password_ym',
    is_enter_ym: 'is_enter_ym'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SubscriptionsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category_id: 'category_id',
    period: 'period',
    end_date: 'end_date',
    price: 'price',
    flag_auto: 'flag_auto',
    img: 'img',
    url: 'url',
    id_user: 'id_user'
  };

  export type SubscriptionsScalarFieldEnum = (typeof SubscriptionsScalarFieldEnum)[keyof typeof SubscriptionsScalarFieldEnum]


  export const Debiting_subscriptionsScalarFieldEnum: {
    date: 'date',
    category_id: 'category_id',
    user_id: 'user_id',
    price: 'price'
  };

  export type Debiting_subscriptionsScalarFieldEnum = (typeof Debiting_subscriptionsScalarFieldEnum)[keyof typeof Debiting_subscriptionsScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    surname?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    access_token_yoomoney?: StringNullableFilter<"users"> | string | null
    cookies?: JsonNullableFilter<"users">
    email_ym?: StringNullableFilter<"users"> | string | null
    password_ym?: StringNullableFilter<"users"> | string | null
    is_enter_ym?: BoolNullableFilter<"users"> | boolean | null
    debiting_subscriptions?: Debiting_subscriptionsListRelationFilter
    subscriptions?: SubscriptionsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    created_at?: SortOrder
    access_token_yoomoney?: SortOrderInput | SortOrder
    cookies?: SortOrderInput | SortOrder
    email_ym?: SortOrderInput | SortOrder
    password_ym?: SortOrderInput | SortOrder
    is_enter_ym?: SortOrderInput | SortOrder
    debiting_subscriptions?: debiting_subscriptionsOrderByRelationAggregateInput
    subscriptions?: subscriptionsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    surname?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    access_token_yoomoney?: StringNullableFilter<"users"> | string | null
    cookies?: JsonNullableFilter<"users">
    email_ym?: StringNullableFilter<"users"> | string | null
    password_ym?: StringNullableFilter<"users"> | string | null
    is_enter_ym?: BoolNullableFilter<"users"> | boolean | null
    debiting_subscriptions?: Debiting_subscriptionsListRelationFilter
    subscriptions?: SubscriptionsListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    created_at?: SortOrder
    access_token_yoomoney?: SortOrderInput | SortOrder
    cookies?: SortOrderInput | SortOrder
    email_ym?: SortOrderInput | SortOrder
    password_ym?: SortOrderInput | SortOrder
    is_enter_ym?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    name?: StringWithAggregatesFilter<"users"> | string
    surname?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    access_token_yoomoney?: StringNullableWithAggregatesFilter<"users"> | string | null
    cookies?: JsonNullableWithAggregatesFilter<"users">
    email_ym?: StringNullableWithAggregatesFilter<"users"> | string | null
    password_ym?: StringNullableWithAggregatesFilter<"users"> | string | null
    is_enter_ym?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
  }

  export type subscriptionsWhereInput = {
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    id?: IntFilter<"subscriptions"> | number
    name?: StringFilter<"subscriptions"> | string
    category_id?: IntNullableFilter<"subscriptions"> | number | null
    period?: IntNullableFilter<"subscriptions"> | number | null
    end_date?: DateTimeNullableFilter<"subscriptions"> | Date | string | null
    price?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    flag_auto?: BoolNullableFilter<"subscriptions"> | boolean | null
    img?: BytesNullableFilter<"subscriptions"> | Bytes | null
    url?: StringNullableFilter<"subscriptions"> | string | null
    id_user?: IntNullableFilter<"subscriptions"> | number | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type subscriptionsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrderInput | SortOrder
    period?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    flag_auto?: SortOrderInput | SortOrder
    img?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    id_user?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type subscriptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    name?: StringFilter<"subscriptions"> | string
    category_id?: IntNullableFilter<"subscriptions"> | number | null
    period?: IntNullableFilter<"subscriptions"> | number | null
    end_date?: DateTimeNullableFilter<"subscriptions"> | Date | string | null
    price?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    flag_auto?: BoolNullableFilter<"subscriptions"> | boolean | null
    img?: BytesNullableFilter<"subscriptions"> | Bytes | null
    url?: StringNullableFilter<"subscriptions"> | string | null
    id_user?: IntNullableFilter<"subscriptions"> | number | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type subscriptionsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrderInput | SortOrder
    period?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    flag_auto?: SortOrderInput | SortOrder
    img?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    id_user?: SortOrderInput | SortOrder
    _count?: subscriptionsCountOrderByAggregateInput
    _avg?: subscriptionsAvgOrderByAggregateInput
    _max?: subscriptionsMaxOrderByAggregateInput
    _min?: subscriptionsMinOrderByAggregateInput
    _sum?: subscriptionsSumOrderByAggregateInput
  }

  export type subscriptionsScalarWhereWithAggregatesInput = {
    AND?: subscriptionsScalarWhereWithAggregatesInput | subscriptionsScalarWhereWithAggregatesInput[]
    OR?: subscriptionsScalarWhereWithAggregatesInput[]
    NOT?: subscriptionsScalarWhereWithAggregatesInput | subscriptionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"subscriptions"> | number
    name?: StringWithAggregatesFilter<"subscriptions"> | string
    category_id?: IntNullableWithAggregatesFilter<"subscriptions"> | number | null
    period?: IntNullableWithAggregatesFilter<"subscriptions"> | number | null
    end_date?: DateTimeNullableWithAggregatesFilter<"subscriptions"> | Date | string | null
    price?: DecimalNullableWithAggregatesFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    flag_auto?: BoolNullableWithAggregatesFilter<"subscriptions"> | boolean | null
    img?: BytesNullableWithAggregatesFilter<"subscriptions"> | Bytes | null
    url?: StringNullableWithAggregatesFilter<"subscriptions"> | string | null
    id_user?: IntNullableWithAggregatesFilter<"subscriptions"> | number | null
  }

  export type debiting_subscriptionsWhereInput = {
    AND?: debiting_subscriptionsWhereInput | debiting_subscriptionsWhereInput[]
    OR?: debiting_subscriptionsWhereInput[]
    NOT?: debiting_subscriptionsWhereInput | debiting_subscriptionsWhereInput[]
    date?: DateTimeFilter<"debiting_subscriptions"> | Date | string
    category_id?: IntFilter<"debiting_subscriptions"> | number
    user_id?: IntFilter<"debiting_subscriptions"> | number
    price?: DecimalFilter<"debiting_subscriptions"> | Decimal | DecimalJsLike | number | string
    category?: XOR<CategoryScalarRelationFilter, categoryWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type debiting_subscriptionsOrderByWithRelationInput = {
    date?: SortOrder
    category_id?: SortOrder
    user_id?: SortOrder
    price?: SortOrder
    category?: categoryOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type debiting_subscriptionsWhereUniqueInput = Prisma.AtLeast<{
    date_category_id_user_id?: debiting_subscriptionsDateCategory_idUser_idCompoundUniqueInput
    AND?: debiting_subscriptionsWhereInput | debiting_subscriptionsWhereInput[]
    OR?: debiting_subscriptionsWhereInput[]
    NOT?: debiting_subscriptionsWhereInput | debiting_subscriptionsWhereInput[]
    date?: DateTimeFilter<"debiting_subscriptions"> | Date | string
    category_id?: IntFilter<"debiting_subscriptions"> | number
    user_id?: IntFilter<"debiting_subscriptions"> | number
    price?: DecimalFilter<"debiting_subscriptions"> | Decimal | DecimalJsLike | number | string
    category?: XOR<CategoryScalarRelationFilter, categoryWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "date_category_id_user_id">

  export type debiting_subscriptionsOrderByWithAggregationInput = {
    date?: SortOrder
    category_id?: SortOrder
    user_id?: SortOrder
    price?: SortOrder
    _count?: debiting_subscriptionsCountOrderByAggregateInput
    _avg?: debiting_subscriptionsAvgOrderByAggregateInput
    _max?: debiting_subscriptionsMaxOrderByAggregateInput
    _min?: debiting_subscriptionsMinOrderByAggregateInput
    _sum?: debiting_subscriptionsSumOrderByAggregateInput
  }

  export type debiting_subscriptionsScalarWhereWithAggregatesInput = {
    AND?: debiting_subscriptionsScalarWhereWithAggregatesInput | debiting_subscriptionsScalarWhereWithAggregatesInput[]
    OR?: debiting_subscriptionsScalarWhereWithAggregatesInput[]
    NOT?: debiting_subscriptionsScalarWhereWithAggregatesInput | debiting_subscriptionsScalarWhereWithAggregatesInput[]
    date?: DateTimeWithAggregatesFilter<"debiting_subscriptions"> | Date | string
    category_id?: IntWithAggregatesFilter<"debiting_subscriptions"> | number
    user_id?: IntWithAggregatesFilter<"debiting_subscriptions"> | number
    price?: DecimalWithAggregatesFilter<"debiting_subscriptions"> | Decimal | DecimalJsLike | number | string
  }

  export type categoryWhereInput = {
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    id?: IntFilter<"category"> | number
    name?: StringNullableFilter<"category"> | string | null
    color?: StringNullableFilter<"category"> | string | null
    debiting_subscriptions?: Debiting_subscriptionsListRelationFilter
  }

  export type categoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    debiting_subscriptions?: debiting_subscriptionsOrderByRelationAggregateInput
  }

  export type categoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    name?: StringNullableFilter<"category"> | string | null
    color?: StringNullableFilter<"category"> | string | null
    debiting_subscriptions?: Debiting_subscriptionsListRelationFilter
  }, "id">

  export type categoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    _count?: categoryCountOrderByAggregateInput
    _avg?: categoryAvgOrderByAggregateInput
    _max?: categoryMaxOrderByAggregateInput
    _min?: categoryMinOrderByAggregateInput
    _sum?: categorySumOrderByAggregateInput
  }

  export type categoryScalarWhereWithAggregatesInput = {
    AND?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    OR?: categoryScalarWhereWithAggregatesInput[]
    NOT?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"category"> | number
    name?: StringNullableWithAggregatesFilter<"category"> | string | null
    color?: StringNullableWithAggregatesFilter<"category"> | string | null
  }

  export type usersCreateInput = {
    email: string
    password: string
    name: string
    surname: string
    created_at?: Date | string
    access_token_yoomoney?: string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: string | null
    password_ym?: string | null
    is_enter_ym?: boolean | null
    debiting_subscriptions?: debiting_subscriptionsCreateNestedManyWithoutUsersInput
    subscriptions?: subscriptionsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    surname: string
    created_at?: Date | string
    access_token_yoomoney?: string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: string | null
    password_ym?: string | null
    is_enter_ym?: boolean | null
    debiting_subscriptions?: debiting_subscriptionsUncheckedCreateNestedManyWithoutUsersInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_token_yoomoney?: NullableStringFieldUpdateOperationsInput | string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: NullableStringFieldUpdateOperationsInput | string | null
    password_ym?: NullableStringFieldUpdateOperationsInput | string | null
    is_enter_ym?: NullableBoolFieldUpdateOperationsInput | boolean | null
    debiting_subscriptions?: debiting_subscriptionsUpdateManyWithoutUsersNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_token_yoomoney?: NullableStringFieldUpdateOperationsInput | string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: NullableStringFieldUpdateOperationsInput | string | null
    password_ym?: NullableStringFieldUpdateOperationsInput | string | null
    is_enter_ym?: NullableBoolFieldUpdateOperationsInput | boolean | null
    debiting_subscriptions?: debiting_subscriptionsUncheckedUpdateManyWithoutUsersNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    surname: string
    created_at?: Date | string
    access_token_yoomoney?: string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: string | null
    password_ym?: string | null
    is_enter_ym?: boolean | null
  }

  export type usersUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_token_yoomoney?: NullableStringFieldUpdateOperationsInput | string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: NullableStringFieldUpdateOperationsInput | string | null
    password_ym?: NullableStringFieldUpdateOperationsInput | string | null
    is_enter_ym?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_token_yoomoney?: NullableStringFieldUpdateOperationsInput | string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: NullableStringFieldUpdateOperationsInput | string | null
    password_ym?: NullableStringFieldUpdateOperationsInput | string | null
    is_enter_ym?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type subscriptionsCreateInput = {
    name: string
    category_id?: number | null
    period?: number | null
    end_date?: Date | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    flag_auto?: boolean | null
    img?: Bytes | null
    url?: string | null
    users?: usersCreateNestedOneWithoutSubscriptionsInput
  }

  export type subscriptionsUncheckedCreateInput = {
    id?: number
    name: string
    category_id?: number | null
    period?: number | null
    end_date?: Date | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    flag_auto?: boolean | null
    img?: Bytes | null
    url?: string | null
    id_user?: number | null
  }

  export type subscriptionsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    period?: NullableIntFieldUpdateOperationsInput | number | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    flag_auto?: NullableBoolFieldUpdateOperationsInput | boolean | null
    img?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneWithoutSubscriptionsNestedInput
  }

  export type subscriptionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    period?: NullableIntFieldUpdateOperationsInput | number | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    flag_auto?: NullableBoolFieldUpdateOperationsInput | boolean | null
    img?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type subscriptionsCreateManyInput = {
    id?: number
    name: string
    category_id?: number | null
    period?: number | null
    end_date?: Date | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    flag_auto?: boolean | null
    img?: Bytes | null
    url?: string | null
    id_user?: number | null
  }

  export type subscriptionsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    period?: NullableIntFieldUpdateOperationsInput | number | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    flag_auto?: NullableBoolFieldUpdateOperationsInput | boolean | null
    img?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscriptionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    period?: NullableIntFieldUpdateOperationsInput | number | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    flag_auto?: NullableBoolFieldUpdateOperationsInput | boolean | null
    img?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    id_user?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type debiting_subscriptionsCreateInput = {
    date: Date | string
    price: Decimal | DecimalJsLike | number | string
    category: categoryCreateNestedOneWithoutDebiting_subscriptionsInput
    users: usersCreateNestedOneWithoutDebiting_subscriptionsInput
  }

  export type debiting_subscriptionsUncheckedCreateInput = {
    date: Date | string
    category_id: number
    user_id: number
    price: Decimal | DecimalJsLike | number | string
  }

  export type debiting_subscriptionsUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: categoryUpdateOneRequiredWithoutDebiting_subscriptionsNestedInput
    users?: usersUpdateOneRequiredWithoutDebiting_subscriptionsNestedInput
  }

  export type debiting_subscriptionsUncheckedUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type debiting_subscriptionsCreateManyInput = {
    date: Date | string
    category_id: number
    user_id: number
    price: Decimal | DecimalJsLike | number | string
  }

  export type debiting_subscriptionsUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type debiting_subscriptionsUncheckedUpdateManyInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type categoryCreateInput = {
    name?: string | null
    color?: string | null
    debiting_subscriptions?: debiting_subscriptionsCreateNestedManyWithoutCategoryInput
  }

  export type categoryUncheckedCreateInput = {
    id?: number
    name?: string | null
    color?: string | null
    debiting_subscriptions?: debiting_subscriptionsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoryUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    debiting_subscriptions?: debiting_subscriptionsUpdateManyWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    debiting_subscriptions?: debiting_subscriptionsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoryCreateManyInput = {
    id?: number
    name?: string | null
    color?: string | null
  }

  export type categoryUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type Debiting_subscriptionsListRelationFilter = {
    every?: debiting_subscriptionsWhereInput
    some?: debiting_subscriptionsWhereInput
    none?: debiting_subscriptionsWhereInput
  }

  export type SubscriptionsListRelationFilter = {
    every?: subscriptionsWhereInput
    some?: subscriptionsWhereInput
    none?: subscriptionsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type debiting_subscriptionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type subscriptionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    created_at?: SortOrder
    access_token_yoomoney?: SortOrder
    cookies?: SortOrder
    email_ym?: SortOrder
    password_ym?: SortOrder
    is_enter_ym?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    created_at?: SortOrder
    access_token_yoomoney?: SortOrder
    email_ym?: SortOrder
    password_ym?: SortOrder
    is_enter_ym?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    created_at?: SortOrder
    access_token_yoomoney?: SortOrder
    email_ym?: SortOrder
    password_ym?: SortOrder
    is_enter_ym?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type subscriptionsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrder
    period?: SortOrder
    end_date?: SortOrder
    price?: SortOrder
    flag_auto?: SortOrder
    img?: SortOrder
    url?: SortOrder
    id_user?: SortOrder
  }

  export type subscriptionsAvgOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    period?: SortOrder
    price?: SortOrder
    id_user?: SortOrder
  }

  export type subscriptionsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrder
    period?: SortOrder
    end_date?: SortOrder
    price?: SortOrder
    flag_auto?: SortOrder
    img?: SortOrder
    url?: SortOrder
    id_user?: SortOrder
  }

  export type subscriptionsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category_id?: SortOrder
    period?: SortOrder
    end_date?: SortOrder
    price?: SortOrder
    flag_auto?: SortOrder
    img?: SortOrder
    url?: SortOrder
    id_user?: SortOrder
  }

  export type subscriptionsSumOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    period?: SortOrder
    price?: SortOrder
    id_user?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CategoryScalarRelationFilter = {
    is?: categoryWhereInput
    isNot?: categoryWhereInput
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type debiting_subscriptionsDateCategory_idUser_idCompoundUniqueInput = {
    date: Date | string
    category_id: number
    user_id: number
  }

  export type debiting_subscriptionsCountOrderByAggregateInput = {
    date?: SortOrder
    category_id?: SortOrder
    user_id?: SortOrder
    price?: SortOrder
  }

  export type debiting_subscriptionsAvgOrderByAggregateInput = {
    category_id?: SortOrder
    user_id?: SortOrder
    price?: SortOrder
  }

  export type debiting_subscriptionsMaxOrderByAggregateInput = {
    date?: SortOrder
    category_id?: SortOrder
    user_id?: SortOrder
    price?: SortOrder
  }

  export type debiting_subscriptionsMinOrderByAggregateInput = {
    date?: SortOrder
    category_id?: SortOrder
    user_id?: SortOrder
    price?: SortOrder
  }

  export type debiting_subscriptionsSumOrderByAggregateInput = {
    category_id?: SortOrder
    user_id?: SortOrder
    price?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type categoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type categoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type categoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type categoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
  }

  export type categorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type debiting_subscriptionsCreateNestedManyWithoutUsersInput = {
    create?: XOR<debiting_subscriptionsCreateWithoutUsersInput, debiting_subscriptionsUncheckedCreateWithoutUsersInput> | debiting_subscriptionsCreateWithoutUsersInput[] | debiting_subscriptionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: debiting_subscriptionsCreateOrConnectWithoutUsersInput | debiting_subscriptionsCreateOrConnectWithoutUsersInput[]
    createMany?: debiting_subscriptionsCreateManyUsersInputEnvelope
    connect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
  }

  export type subscriptionsCreateNestedManyWithoutUsersInput = {
    create?: XOR<subscriptionsCreateWithoutUsersInput, subscriptionsUncheckedCreateWithoutUsersInput> | subscriptionsCreateWithoutUsersInput[] | subscriptionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUsersInput | subscriptionsCreateOrConnectWithoutUsersInput[]
    createMany?: subscriptionsCreateManyUsersInputEnvelope
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
  }

  export type debiting_subscriptionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<debiting_subscriptionsCreateWithoutUsersInput, debiting_subscriptionsUncheckedCreateWithoutUsersInput> | debiting_subscriptionsCreateWithoutUsersInput[] | debiting_subscriptionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: debiting_subscriptionsCreateOrConnectWithoutUsersInput | debiting_subscriptionsCreateOrConnectWithoutUsersInput[]
    createMany?: debiting_subscriptionsCreateManyUsersInputEnvelope
    connect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
  }

  export type subscriptionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<subscriptionsCreateWithoutUsersInput, subscriptionsUncheckedCreateWithoutUsersInput> | subscriptionsCreateWithoutUsersInput[] | subscriptionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUsersInput | subscriptionsCreateOrConnectWithoutUsersInput[]
    createMany?: subscriptionsCreateManyUsersInputEnvelope
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type debiting_subscriptionsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<debiting_subscriptionsCreateWithoutUsersInput, debiting_subscriptionsUncheckedCreateWithoutUsersInput> | debiting_subscriptionsCreateWithoutUsersInput[] | debiting_subscriptionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: debiting_subscriptionsCreateOrConnectWithoutUsersInput | debiting_subscriptionsCreateOrConnectWithoutUsersInput[]
    upsert?: debiting_subscriptionsUpsertWithWhereUniqueWithoutUsersInput | debiting_subscriptionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: debiting_subscriptionsCreateManyUsersInputEnvelope
    set?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    disconnect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    delete?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    connect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    update?: debiting_subscriptionsUpdateWithWhereUniqueWithoutUsersInput | debiting_subscriptionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: debiting_subscriptionsUpdateManyWithWhereWithoutUsersInput | debiting_subscriptionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: debiting_subscriptionsScalarWhereInput | debiting_subscriptionsScalarWhereInput[]
  }

  export type subscriptionsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<subscriptionsCreateWithoutUsersInput, subscriptionsUncheckedCreateWithoutUsersInput> | subscriptionsCreateWithoutUsersInput[] | subscriptionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUsersInput | subscriptionsCreateOrConnectWithoutUsersInput[]
    upsert?: subscriptionsUpsertWithWhereUniqueWithoutUsersInput | subscriptionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: subscriptionsCreateManyUsersInputEnvelope
    set?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    disconnect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    delete?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    update?: subscriptionsUpdateWithWhereUniqueWithoutUsersInput | subscriptionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: subscriptionsUpdateManyWithWhereWithoutUsersInput | subscriptionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type debiting_subscriptionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<debiting_subscriptionsCreateWithoutUsersInput, debiting_subscriptionsUncheckedCreateWithoutUsersInput> | debiting_subscriptionsCreateWithoutUsersInput[] | debiting_subscriptionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: debiting_subscriptionsCreateOrConnectWithoutUsersInput | debiting_subscriptionsCreateOrConnectWithoutUsersInput[]
    upsert?: debiting_subscriptionsUpsertWithWhereUniqueWithoutUsersInput | debiting_subscriptionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: debiting_subscriptionsCreateManyUsersInputEnvelope
    set?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    disconnect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    delete?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    connect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    update?: debiting_subscriptionsUpdateWithWhereUniqueWithoutUsersInput | debiting_subscriptionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: debiting_subscriptionsUpdateManyWithWhereWithoutUsersInput | debiting_subscriptionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: debiting_subscriptionsScalarWhereInput | debiting_subscriptionsScalarWhereInput[]
  }

  export type subscriptionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<subscriptionsCreateWithoutUsersInput, subscriptionsUncheckedCreateWithoutUsersInput> | subscriptionsCreateWithoutUsersInput[] | subscriptionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUsersInput | subscriptionsCreateOrConnectWithoutUsersInput[]
    upsert?: subscriptionsUpsertWithWhereUniqueWithoutUsersInput | subscriptionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: subscriptionsCreateManyUsersInputEnvelope
    set?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    disconnect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    delete?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    update?: subscriptionsUpdateWithWhereUniqueWithoutUsersInput | subscriptionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: subscriptionsUpdateManyWithWhereWithoutUsersInput | subscriptionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<usersCreateWithoutSubscriptionsInput, usersUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutSubscriptionsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableBytesFieldUpdateOperationsInput = {
    set?: Bytes | null
  }

  export type usersUpdateOneWithoutSubscriptionsNestedInput = {
    create?: XOR<usersCreateWithoutSubscriptionsInput, usersUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutSubscriptionsInput
    upsert?: usersUpsertWithoutSubscriptionsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutSubscriptionsInput, usersUpdateWithoutSubscriptionsInput>, usersUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type categoryCreateNestedOneWithoutDebiting_subscriptionsInput = {
    create?: XOR<categoryCreateWithoutDebiting_subscriptionsInput, categoryUncheckedCreateWithoutDebiting_subscriptionsInput>
    connectOrCreate?: categoryCreateOrConnectWithoutDebiting_subscriptionsInput
    connect?: categoryWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutDebiting_subscriptionsInput = {
    create?: XOR<usersCreateWithoutDebiting_subscriptionsInput, usersUncheckedCreateWithoutDebiting_subscriptionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutDebiting_subscriptionsInput
    connect?: usersWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type categoryUpdateOneRequiredWithoutDebiting_subscriptionsNestedInput = {
    create?: XOR<categoryCreateWithoutDebiting_subscriptionsInput, categoryUncheckedCreateWithoutDebiting_subscriptionsInput>
    connectOrCreate?: categoryCreateOrConnectWithoutDebiting_subscriptionsInput
    upsert?: categoryUpsertWithoutDebiting_subscriptionsInput
    connect?: categoryWhereUniqueInput
    update?: XOR<XOR<categoryUpdateToOneWithWhereWithoutDebiting_subscriptionsInput, categoryUpdateWithoutDebiting_subscriptionsInput>, categoryUncheckedUpdateWithoutDebiting_subscriptionsInput>
  }

  export type usersUpdateOneRequiredWithoutDebiting_subscriptionsNestedInput = {
    create?: XOR<usersCreateWithoutDebiting_subscriptionsInput, usersUncheckedCreateWithoutDebiting_subscriptionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutDebiting_subscriptionsInput
    upsert?: usersUpsertWithoutDebiting_subscriptionsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutDebiting_subscriptionsInput, usersUpdateWithoutDebiting_subscriptionsInput>, usersUncheckedUpdateWithoutDebiting_subscriptionsInput>
  }

  export type debiting_subscriptionsCreateNestedManyWithoutCategoryInput = {
    create?: XOR<debiting_subscriptionsCreateWithoutCategoryInput, debiting_subscriptionsUncheckedCreateWithoutCategoryInput> | debiting_subscriptionsCreateWithoutCategoryInput[] | debiting_subscriptionsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: debiting_subscriptionsCreateOrConnectWithoutCategoryInput | debiting_subscriptionsCreateOrConnectWithoutCategoryInput[]
    createMany?: debiting_subscriptionsCreateManyCategoryInputEnvelope
    connect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
  }

  export type debiting_subscriptionsUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<debiting_subscriptionsCreateWithoutCategoryInput, debiting_subscriptionsUncheckedCreateWithoutCategoryInput> | debiting_subscriptionsCreateWithoutCategoryInput[] | debiting_subscriptionsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: debiting_subscriptionsCreateOrConnectWithoutCategoryInput | debiting_subscriptionsCreateOrConnectWithoutCategoryInput[]
    createMany?: debiting_subscriptionsCreateManyCategoryInputEnvelope
    connect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
  }

  export type debiting_subscriptionsUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<debiting_subscriptionsCreateWithoutCategoryInput, debiting_subscriptionsUncheckedCreateWithoutCategoryInput> | debiting_subscriptionsCreateWithoutCategoryInput[] | debiting_subscriptionsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: debiting_subscriptionsCreateOrConnectWithoutCategoryInput | debiting_subscriptionsCreateOrConnectWithoutCategoryInput[]
    upsert?: debiting_subscriptionsUpsertWithWhereUniqueWithoutCategoryInput | debiting_subscriptionsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: debiting_subscriptionsCreateManyCategoryInputEnvelope
    set?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    disconnect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    delete?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    connect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    update?: debiting_subscriptionsUpdateWithWhereUniqueWithoutCategoryInput | debiting_subscriptionsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: debiting_subscriptionsUpdateManyWithWhereWithoutCategoryInput | debiting_subscriptionsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: debiting_subscriptionsScalarWhereInput | debiting_subscriptionsScalarWhereInput[]
  }

  export type debiting_subscriptionsUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<debiting_subscriptionsCreateWithoutCategoryInput, debiting_subscriptionsUncheckedCreateWithoutCategoryInput> | debiting_subscriptionsCreateWithoutCategoryInput[] | debiting_subscriptionsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: debiting_subscriptionsCreateOrConnectWithoutCategoryInput | debiting_subscriptionsCreateOrConnectWithoutCategoryInput[]
    upsert?: debiting_subscriptionsUpsertWithWhereUniqueWithoutCategoryInput | debiting_subscriptionsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: debiting_subscriptionsCreateManyCategoryInputEnvelope
    set?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    disconnect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    delete?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    connect?: debiting_subscriptionsWhereUniqueInput | debiting_subscriptionsWhereUniqueInput[]
    update?: debiting_subscriptionsUpdateWithWhereUniqueWithoutCategoryInput | debiting_subscriptionsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: debiting_subscriptionsUpdateManyWithWhereWithoutCategoryInput | debiting_subscriptionsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: debiting_subscriptionsScalarWhereInput | debiting_subscriptionsScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBytesNullableFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableFilter<$PrismaModel> | Bytes | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBytesNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel> | null
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel> | null
    not?: NestedBytesNullableWithAggregatesFilter<$PrismaModel> | Bytes | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBytesNullableFilter<$PrismaModel>
    _max?: NestedBytesNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type debiting_subscriptionsCreateWithoutUsersInput = {
    date: Date | string
    price: Decimal | DecimalJsLike | number | string
    category: categoryCreateNestedOneWithoutDebiting_subscriptionsInput
  }

  export type debiting_subscriptionsUncheckedCreateWithoutUsersInput = {
    date: Date | string
    category_id: number
    price: Decimal | DecimalJsLike | number | string
  }

  export type debiting_subscriptionsCreateOrConnectWithoutUsersInput = {
    where: debiting_subscriptionsWhereUniqueInput
    create: XOR<debiting_subscriptionsCreateWithoutUsersInput, debiting_subscriptionsUncheckedCreateWithoutUsersInput>
  }

  export type debiting_subscriptionsCreateManyUsersInputEnvelope = {
    data: debiting_subscriptionsCreateManyUsersInput | debiting_subscriptionsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type subscriptionsCreateWithoutUsersInput = {
    name: string
    category_id?: number | null
    period?: number | null
    end_date?: Date | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    flag_auto?: boolean | null
    img?: Bytes | null
    url?: string | null
  }

  export type subscriptionsUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    category_id?: number | null
    period?: number | null
    end_date?: Date | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    flag_auto?: boolean | null
    img?: Bytes | null
    url?: string | null
  }

  export type subscriptionsCreateOrConnectWithoutUsersInput = {
    where: subscriptionsWhereUniqueInput
    create: XOR<subscriptionsCreateWithoutUsersInput, subscriptionsUncheckedCreateWithoutUsersInput>
  }

  export type subscriptionsCreateManyUsersInputEnvelope = {
    data: subscriptionsCreateManyUsersInput | subscriptionsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type debiting_subscriptionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: debiting_subscriptionsWhereUniqueInput
    update: XOR<debiting_subscriptionsUpdateWithoutUsersInput, debiting_subscriptionsUncheckedUpdateWithoutUsersInput>
    create: XOR<debiting_subscriptionsCreateWithoutUsersInput, debiting_subscriptionsUncheckedCreateWithoutUsersInput>
  }

  export type debiting_subscriptionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: debiting_subscriptionsWhereUniqueInput
    data: XOR<debiting_subscriptionsUpdateWithoutUsersInput, debiting_subscriptionsUncheckedUpdateWithoutUsersInput>
  }

  export type debiting_subscriptionsUpdateManyWithWhereWithoutUsersInput = {
    where: debiting_subscriptionsScalarWhereInput
    data: XOR<debiting_subscriptionsUpdateManyMutationInput, debiting_subscriptionsUncheckedUpdateManyWithoutUsersInput>
  }

  export type debiting_subscriptionsScalarWhereInput = {
    AND?: debiting_subscriptionsScalarWhereInput | debiting_subscriptionsScalarWhereInput[]
    OR?: debiting_subscriptionsScalarWhereInput[]
    NOT?: debiting_subscriptionsScalarWhereInput | debiting_subscriptionsScalarWhereInput[]
    date?: DateTimeFilter<"debiting_subscriptions"> | Date | string
    category_id?: IntFilter<"debiting_subscriptions"> | number
    user_id?: IntFilter<"debiting_subscriptions"> | number
    price?: DecimalFilter<"debiting_subscriptions"> | Decimal | DecimalJsLike | number | string
  }

  export type subscriptionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: subscriptionsWhereUniqueInput
    update: XOR<subscriptionsUpdateWithoutUsersInput, subscriptionsUncheckedUpdateWithoutUsersInput>
    create: XOR<subscriptionsCreateWithoutUsersInput, subscriptionsUncheckedCreateWithoutUsersInput>
  }

  export type subscriptionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: subscriptionsWhereUniqueInput
    data: XOR<subscriptionsUpdateWithoutUsersInput, subscriptionsUncheckedUpdateWithoutUsersInput>
  }

  export type subscriptionsUpdateManyWithWhereWithoutUsersInput = {
    where: subscriptionsScalarWhereInput
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyWithoutUsersInput>
  }

  export type subscriptionsScalarWhereInput = {
    AND?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
    OR?: subscriptionsScalarWhereInput[]
    NOT?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
    id?: IntFilter<"subscriptions"> | number
    name?: StringFilter<"subscriptions"> | string
    category_id?: IntNullableFilter<"subscriptions"> | number | null
    period?: IntNullableFilter<"subscriptions"> | number | null
    end_date?: DateTimeNullableFilter<"subscriptions"> | Date | string | null
    price?: DecimalNullableFilter<"subscriptions"> | Decimal | DecimalJsLike | number | string | null
    flag_auto?: BoolNullableFilter<"subscriptions"> | boolean | null
    img?: BytesNullableFilter<"subscriptions"> | Bytes | null
    url?: StringNullableFilter<"subscriptions"> | string | null
    id_user?: IntNullableFilter<"subscriptions"> | number | null
  }

  export type usersCreateWithoutSubscriptionsInput = {
    email: string
    password: string
    name: string
    surname: string
    created_at?: Date | string
    access_token_yoomoney?: string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: string | null
    password_ym?: string | null
    is_enter_ym?: boolean | null
    debiting_subscriptions?: debiting_subscriptionsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutSubscriptionsInput = {
    id?: number
    email: string
    password: string
    name: string
    surname: string
    created_at?: Date | string
    access_token_yoomoney?: string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: string | null
    password_ym?: string | null
    is_enter_ym?: boolean | null
    debiting_subscriptions?: debiting_subscriptionsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutSubscriptionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutSubscriptionsInput, usersUncheckedCreateWithoutSubscriptionsInput>
  }

  export type usersUpsertWithoutSubscriptionsInput = {
    update: XOR<usersUpdateWithoutSubscriptionsInput, usersUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<usersCreateWithoutSubscriptionsInput, usersUncheckedCreateWithoutSubscriptionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutSubscriptionsInput, usersUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type usersUpdateWithoutSubscriptionsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_token_yoomoney?: NullableStringFieldUpdateOperationsInput | string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: NullableStringFieldUpdateOperationsInput | string | null
    password_ym?: NullableStringFieldUpdateOperationsInput | string | null
    is_enter_ym?: NullableBoolFieldUpdateOperationsInput | boolean | null
    debiting_subscriptions?: debiting_subscriptionsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutSubscriptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_token_yoomoney?: NullableStringFieldUpdateOperationsInput | string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: NullableStringFieldUpdateOperationsInput | string | null
    password_ym?: NullableStringFieldUpdateOperationsInput | string | null
    is_enter_ym?: NullableBoolFieldUpdateOperationsInput | boolean | null
    debiting_subscriptions?: debiting_subscriptionsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type categoryCreateWithoutDebiting_subscriptionsInput = {
    name?: string | null
    color?: string | null
  }

  export type categoryUncheckedCreateWithoutDebiting_subscriptionsInput = {
    id?: number
    name?: string | null
    color?: string | null
  }

  export type categoryCreateOrConnectWithoutDebiting_subscriptionsInput = {
    where: categoryWhereUniqueInput
    create: XOR<categoryCreateWithoutDebiting_subscriptionsInput, categoryUncheckedCreateWithoutDebiting_subscriptionsInput>
  }

  export type usersCreateWithoutDebiting_subscriptionsInput = {
    email: string
    password: string
    name: string
    surname: string
    created_at?: Date | string
    access_token_yoomoney?: string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: string | null
    password_ym?: string | null
    is_enter_ym?: boolean | null
    subscriptions?: subscriptionsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutDebiting_subscriptionsInput = {
    id?: number
    email: string
    password: string
    name: string
    surname: string
    created_at?: Date | string
    access_token_yoomoney?: string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: string | null
    password_ym?: string | null
    is_enter_ym?: boolean | null
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutDebiting_subscriptionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutDebiting_subscriptionsInput, usersUncheckedCreateWithoutDebiting_subscriptionsInput>
  }

  export type categoryUpsertWithoutDebiting_subscriptionsInput = {
    update: XOR<categoryUpdateWithoutDebiting_subscriptionsInput, categoryUncheckedUpdateWithoutDebiting_subscriptionsInput>
    create: XOR<categoryCreateWithoutDebiting_subscriptionsInput, categoryUncheckedCreateWithoutDebiting_subscriptionsInput>
    where?: categoryWhereInput
  }

  export type categoryUpdateToOneWithWhereWithoutDebiting_subscriptionsInput = {
    where?: categoryWhereInput
    data: XOR<categoryUpdateWithoutDebiting_subscriptionsInput, categoryUncheckedUpdateWithoutDebiting_subscriptionsInput>
  }

  export type categoryUpdateWithoutDebiting_subscriptionsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type categoryUncheckedUpdateWithoutDebiting_subscriptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUpsertWithoutDebiting_subscriptionsInput = {
    update: XOR<usersUpdateWithoutDebiting_subscriptionsInput, usersUncheckedUpdateWithoutDebiting_subscriptionsInput>
    create: XOR<usersCreateWithoutDebiting_subscriptionsInput, usersUncheckedCreateWithoutDebiting_subscriptionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutDebiting_subscriptionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutDebiting_subscriptionsInput, usersUncheckedUpdateWithoutDebiting_subscriptionsInput>
  }

  export type usersUpdateWithoutDebiting_subscriptionsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_token_yoomoney?: NullableStringFieldUpdateOperationsInput | string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: NullableStringFieldUpdateOperationsInput | string | null
    password_ym?: NullableStringFieldUpdateOperationsInput | string | null
    is_enter_ym?: NullableBoolFieldUpdateOperationsInput | boolean | null
    subscriptions?: subscriptionsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutDebiting_subscriptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_token_yoomoney?: NullableStringFieldUpdateOperationsInput | string | null
    cookies?: NullableJsonNullValueInput | InputJsonValue
    email_ym?: NullableStringFieldUpdateOperationsInput | string | null
    password_ym?: NullableStringFieldUpdateOperationsInput | string | null
    is_enter_ym?: NullableBoolFieldUpdateOperationsInput | boolean | null
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type debiting_subscriptionsCreateWithoutCategoryInput = {
    date: Date | string
    price: Decimal | DecimalJsLike | number | string
    users: usersCreateNestedOneWithoutDebiting_subscriptionsInput
  }

  export type debiting_subscriptionsUncheckedCreateWithoutCategoryInput = {
    date: Date | string
    user_id: number
    price: Decimal | DecimalJsLike | number | string
  }

  export type debiting_subscriptionsCreateOrConnectWithoutCategoryInput = {
    where: debiting_subscriptionsWhereUniqueInput
    create: XOR<debiting_subscriptionsCreateWithoutCategoryInput, debiting_subscriptionsUncheckedCreateWithoutCategoryInput>
  }

  export type debiting_subscriptionsCreateManyCategoryInputEnvelope = {
    data: debiting_subscriptionsCreateManyCategoryInput | debiting_subscriptionsCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type debiting_subscriptionsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: debiting_subscriptionsWhereUniqueInput
    update: XOR<debiting_subscriptionsUpdateWithoutCategoryInput, debiting_subscriptionsUncheckedUpdateWithoutCategoryInput>
    create: XOR<debiting_subscriptionsCreateWithoutCategoryInput, debiting_subscriptionsUncheckedCreateWithoutCategoryInput>
  }

  export type debiting_subscriptionsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: debiting_subscriptionsWhereUniqueInput
    data: XOR<debiting_subscriptionsUpdateWithoutCategoryInput, debiting_subscriptionsUncheckedUpdateWithoutCategoryInput>
  }

  export type debiting_subscriptionsUpdateManyWithWhereWithoutCategoryInput = {
    where: debiting_subscriptionsScalarWhereInput
    data: XOR<debiting_subscriptionsUpdateManyMutationInput, debiting_subscriptionsUncheckedUpdateManyWithoutCategoryInput>
  }

  export type debiting_subscriptionsCreateManyUsersInput = {
    date: Date | string
    category_id: number
    price: Decimal | DecimalJsLike | number | string
  }

  export type subscriptionsCreateManyUsersInput = {
    id?: number
    name: string
    category_id?: number | null
    period?: number | null
    end_date?: Date | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    flag_auto?: boolean | null
    img?: Bytes | null
    url?: string | null
  }

  export type debiting_subscriptionsUpdateWithoutUsersInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: categoryUpdateOneRequiredWithoutDebiting_subscriptionsNestedInput
  }

  export type debiting_subscriptionsUncheckedUpdateWithoutUsersInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category_id?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type debiting_subscriptionsUncheckedUpdateManyWithoutUsersInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category_id?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type subscriptionsUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    period?: NullableIntFieldUpdateOperationsInput | number | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    flag_auto?: NullableBoolFieldUpdateOperationsInput | boolean | null
    img?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscriptionsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    period?: NullableIntFieldUpdateOperationsInput | number | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    flag_auto?: NullableBoolFieldUpdateOperationsInput | boolean | null
    img?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type subscriptionsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    period?: NullableIntFieldUpdateOperationsInput | number | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    flag_auto?: NullableBoolFieldUpdateOperationsInput | boolean | null
    img?: NullableBytesFieldUpdateOperationsInput | Bytes | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type debiting_subscriptionsCreateManyCategoryInput = {
    date: Date | string
    user_id: number
    price: Decimal | DecimalJsLike | number | string
  }

  export type debiting_subscriptionsUpdateWithoutCategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    users?: usersUpdateOneRequiredWithoutDebiting_subscriptionsNestedInput
  }

  export type debiting_subscriptionsUncheckedUpdateWithoutCategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type debiting_subscriptionsUncheckedUpdateManyWithoutCategoryInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: IntFieldUpdateOperationsInput | number
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}