import { Effect, Ref } from "effect"
import { User } from "../Domain/User.js"

export class UserRepository extends Effect.Service<UserRepository>()(
  "UserRepository",
  {
    effect: Effect.gen(function*() {
      const ref = yield* Ref.make<Array<User>>([
        new User({ id: "1", name: "Alice" }),
        new User({ id: "2", name: "Bob" }),
        new User({ id: "3", name: "Charlie" }),
        new User({ id: "4", name: "Diana" }),
        new User({ id: "5", name: "Ethan" }),
        new User({ id: "6", name: "Fiona" }),
        new User({ id: "7", name: "George" }),
        new User({ id: "8", name: "Hannah" }),
        new User({ id: "9", name: "Isaac" }),
        new User({ id: "10", name: "Jasmine" }),
        new User({ id: "11", name: "Kai" }),
        new User({ id: "12", name: "Lily" }),
        new User({ id: "13", name: "Marcus" }),
        new User({ id: "14", name: "Nina" }),
        new User({ id: "15", name: "Owen" }),
        new User({ id: "16", name: "Paige" }),
        new User({ id: "17", name: "Quinn" }),
        new User({ id: "18", name: "Riley" }),
        new User({ id: "19", name: "Sophie" }),
        new User({ id: "20", name: "Tyler" }),
        new User({ id: "21", name: "Uma" }),
        new User({ id: "22", name: "Victor" }),
        new User({ id: "23", name: "Willow" }),
        new User({ id: "24", name: "Xander" }),
        new User({ id: "25", name: "Zoe" })
      ])

      return {
        findMany: ref.get,
        findById: (id: string) =>
          Ref.get(ref).pipe(
            Effect.andThen((users) => {
              const user = users.find((user) => user.id === id)
              return user
                ? Effect.succeed(user)
                : Effect.fail(`User not found: ${id}`)
            })
          ),
        findByName: (name: string) =>
          Ref.get(ref).pipe(
            Effect.andThen((users) =>
              users
                .filter((user) => user.name.toLowerCase().includes(name.toLowerCase()))
            )
          ),
        create: (name: string) =>
          Ref.updateAndGet(ref, (users) => [
            ...users,
            new User({ id: String(users.length + 1), name })
          ]).pipe(Effect.andThen((users) => users[users.length - 1]))
      }
    })
  }
) {}
