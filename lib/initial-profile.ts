import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {db} from  "@/lib/db"


export const initialProfile = async () => {
    const user = await currentUser()
    if (!user) {
        return redirectToSignIn()
    }

    const profile = await db.profile.findUnique({
        where: {
            user_id: user.id,
        },
    })

    if (profile){
        const correctName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.emailAddresses[0].emailAddress;
        if (profile.name !== correctName || profile.imageUrl !== user.imageUrl) {
            return await db.profile.update({
                where: { user_id: user.id },
                data: { name: correctName, imageUrl: user.imageUrl },
            });
        }
        return profile;
    }

    const newProf = await db.profile.create({
        data: {
            user_id: user.id,
            name: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
    }

})
return newProf;
} 