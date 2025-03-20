import { executeAction } from "./executeAction";
import { prisma } from "./prisma";
import { schema } from "./zod";

const signUp = async (formData: FormData) => {
    return executeAction({
actionFn: async () => {
    const email = formData.get("email");
    const password = formData.get("password");
    const validatedData = schema.parse({ email, password });
    
    await prisma.user.create({
        data: {
            email: validatedData.email.toLowerCase(),
            password: validatedData.password,
        },
    });
}
    })
};

export { signUp };