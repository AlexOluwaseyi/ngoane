import { PrismaClient } from "@prisma/client";
import { postSchema, putSchema } from "./zodSchema";

const prisma = new PrismaClient().$extends({
    query: {
        diagnosticTest: {
            create({args, query}){
                    args.data = postSchema.parse(args.data);
                    return query(args);
            },
            update({args, query}){
                    args.data = putSchema.parse(args.data);
                    return query(args);
            }
        }
    }
});

export default prisma;
