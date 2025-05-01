import { Rpc, RpcGroup } from "@effect/rpc"
import { Schema } from "effect"
import { User } from "../Domain/User.js"

export class UserRpcs extends RpcGroup.make(
  // Request to retrieve a list of users
  Rpc.make("UserList", {
    success: User, // Succeed with a stream of users
    stream: true
  }),
  Rpc.make("UserById", {
    success: User,
    error: Schema.String, // Indicates that errors, if any, will be returned as strings
    payload: {
      id: Schema.String
    }
  }),
  Rpc.make("UserByName", {
    success: Schema.Array(User),
    payload: {
      name: Schema.String
    }
  }),
  Rpc.make("UserCreate", {
    success: User,
    payload: {
      name: Schema.String
    }
  })
) {}
