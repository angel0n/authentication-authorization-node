import { ErrorMessageOptions } from "zod-error";

export const formaterErrorZod: ErrorMessageOptions = {
    maxErrors: 1,
    transform: ({ messageComponent }) => messageComponent.replace('mensagem:', '')
}