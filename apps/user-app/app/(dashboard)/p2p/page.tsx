import { OnRampTransactions } from "../../../components/OnRampTransactions"
import { SendCard } from "../../../components/SendCard"
import { p2pTransaction } from "../../../lib/p2pTransaction"

export default async function () {
    const data = await p2pTransaction()


    return (
        <div className="w-full flex justify-center items-center gap-5">
            <SendCard />
            <OnRampTransactions transactions={data}/>
        </div>
    )
}
