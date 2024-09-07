import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export async function alltransaction() {
    const session = await getServerSession(authOptions)

    const allTransaction = await prisma.user.findUnique({
        where: {
            id: Number(session.user.id),
        },
        select: {
            id: true,
            sentTransfers: {
                select: {
                    id: true,
                    amount: true,
                    timestamp: true,
                    toUser: {
                        select: {
                            number: true,
                        },
                    },
                },
                orderBy: {
                    timestamp: "desc",
                },
            },
            receivedTransfers: {
                select: {
                    id: true,
                    amount: true,
                    timestamp: true,
                    fromUser: {
                        select: {
                            number: true,
                        },
                    },
                },
                orderBy: {
                    timestamp: "desc",
                },
            },
        },
    })

    if (allTransaction) {
        const transformedTransaction = {
            ...allTransaction,
            sentTransfers: allTransaction.sentTransfers.map((transfer) => ({
                ...transfer,
                time: transfer.timestamp,
                status: "sent", // Adding a static status field
            })),
            receivedTransfers: allTransaction.receivedTransfers.map(
                (transfer) => ({
                    ...transfer,
                    time: transfer.timestamp,
                    status: "received", // Adding a static status field
                })
            ),
        }

        return transformedTransaction
    }
}
