interface Transfer {
    id: number
    amount: number
    timestamp: Date
    toUser?: {
        number: string
    }
    fromUser?: {
        number: string
    }
}

interface TransferPageProps {
    id: number
    sentTransfers: Transfer[]
    receivedTransfers: Transfer[]
}

export default function Transactions({
    id,
    sentTransfers,
    receivedTransfers,
}: TransferPageProps) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString()
    }

    const TransferTable = ({
        transfers,
        type,
    }: {
        transfers: Transfer[]
        type: "sent" | "received"
    }) => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        {/* <th className="py-2 px-4 text-left">ID</th> */}
                        <th className="py-2 px-4 text-left">Amount</th>
                        <th className="py-2 px-4 text-left">Timestamp</th>
                        <th className="py-2 px-4 text-left">
                            {type === "sent" ? "To" : "From"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transfers.map((transfer) => (
                        <tr key={transfer.id} className="border-b">
                            {/* <td className="py-2 px-4">{transfer.id}</td> */}
                            <td className="py-2 px-4">
                                Rs {((transfer.amount)/100).toFixed(2)}
                            </td>
                            <td className="py-2 px-4">
                                {formatDate(transfer.timestamp)}
                            </td>
                            <td className="py-2 px-4">
                                {type === "sent"
                                    ? transfer.toUser?.number
                                    : transfer.fromUser?.number}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">User ID: {id}</h1>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                    <h2 className="text-xl font-semibold">Sent Transfers</h2>
                </div>
                <div className="p-4">
                    <TransferTable transfers={sentTransfers} type="sent" />
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                    <h2 className="text-xl font-semibold">
                        Received Transfers
                    </h2>
                </div>
                <div className="p-4">
                    <TransferTable
                        transfers={receivedTransfers}
                        type="received"
                    />
                </div>
            </div>
        </div>
    )
}
