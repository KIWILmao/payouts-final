"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prisma from "@repo/db/client"

export async function p2pTransaction() {
    const session = await getServerSession(authOptions)
    const data = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id),
        },
        include: {
            toUser: {
                select: {
                    number: true,
                },
            },
        },
    })

    console.log(data);
    

    return data.map((item) => {
        return {
            id: item.id,
            amount: item.amount,
            time: item.timestamp,
            toUserNumber: item.toUser.number,
            provider: "p2p",
            status: "succsess",
        }
    })
}
