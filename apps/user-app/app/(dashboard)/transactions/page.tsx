import { OnRampTransactions } from "../../../components/OnRampTransactions"
import Transactions from "../../../components/Transactions"
import { alltransaction } from "../../../lib/alltransaction"

export default async function () {
    const data = await alltransaction()
    console.log(data)

    if (!data) {
        return <div>loading...</div>
    }

    if (data.receivedTransfers.length <= 0 && data.sentTransfers.length <= 0) {
        return <div>loding...</div>
    }

    return (
        <div>
            <Transactions
                id={data?.id}
                receivedTransfers={data?.receivedTransfers}
                sentTransfers={data?.sentTransfers}
            />
        </div>
    )
}
