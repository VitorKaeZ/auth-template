import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { adaptRoute } from "../adapters/fastify.route.adapter";
import { makeRegisterUserController } from "../factories/register";
import { makeLoginUserController } from "../factories/login";
import { makePasswordResetController } from "../factories/passwordReset";
import { makeRequestPasswordResetController } from "../factories/requestPasswordReset";
import authenticateJwt from "../middlewares/auth-middleware";
import { z } from "zod";
import { FastifyTypedInstance } from "../../shared/types/Instance";
import { makeGetUsersController } from "../factories/getUsers";
import { makeLoginUserWithOAuthController } from "../factories/login-with-oauth";

export async function userRoutes(fastify: FastifyTypedInstance, options: FastifyPluginOptions) {

    fastify.get("/", { preHandler: [authenticateJwt("ADMIN"), ], schema: {
        tags: ["users"],
        summary: "Get all users",
        description: "Get all users",
        response: {
            200: z.object({
                users: z.array(z.object({
                    email: z.string(),
                    firstname: z.string(),
                    lastname: z.string(),
                    roles: z.array(z.string()),
                }))
            }).describe("Users retrieved successfully"),
            404: z.object({
                message: z.string(),
            }).describe("Users not found"),
        }
        },  }, adaptRoute(makeGetUsersController()))

    fastify.post("/", {
        schema: {
            tags: ["users"],
            summary: "Create a new user",
            description: "Create a new user",
            body: z.object({
                firstname: z.string(),
                lastname: z.string(),
                email: z.email(),
                password: z.string().min(6),
            }),
            response: {
                201: z.object({
                    message: z.string(),
                }).describe("User created successfully"),
                400: z.object({
                    message: z.string(),
                }).describe("Bad request"),
            },
        },
    }, adaptRoute(makeRegisterUserController()))

    fastify.post("/login", {
        schema: {
            tags: ["users"],
            summary: "Login a user",
            description: "Login a user",
            body: z.object({
                email: z.email(),
                password: z.string().min(6),
            }),
            response: {
                201: z.object({
                    message: z.string(),
                    token: z.string(),
                }).describe("User logged in successfully"),
                401: z.object({
                    message: z.string(),
                }).describe("Unauthorized"),
            },
        },

    }, adaptRoute(makeLoginUserController()))

    fastify.post("/request-password-reset",{
        schema: {
            tags: ["users"],
            summary: "Request a password reset",
            description: "Request a password reset",
            body: z.object({
                email: z.email(),
            }),
            response: {
                201: z.object({
                    message: z.string(),
                }).describe("Password reset request sent successfully"),
                404: z.object({
                    message: z.string(),
                }).describe("User not found"),
            },
        },
    },adaptRoute(makeRequestPasswordResetController()))
    fastify.post("/reset-password",{
        schema: {
            tags: ["users"],
            summary: "Reset a password",
            description: "Reset a password",
            body: z.object({
                token: z.string(),
                newPassword: z.string().min(6),
            }),
            response: {
                201: z.object({
                    message: z.string(),
                }).describe("Password changed successfully"),
                404: z.object({
                    message: z.string(),
                }).describe("Invalid or expired token"),
            }
        }
    }, adaptRoute(makePasswordResetController()))

    fastify.get('/google/callback',{
        schema: {
            tags: ["users"],
            summary: "Login with Google",
            description: "Login with Google",
            response: {
                201: z.object({
                    message: z.string(),
                    token: z.string(),
                }).describe("User logged in successfully"),
                404: z.object({
                    message: z.string(),
                }).describe("User not found"),
            },
        },
    }, adaptRoute(makeLoginUserWithOAuthController()))

}