"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import { p2pTransfer } from "../lib/p2pTransfer"
import { useRouter } from "next/navigation"

export function SendCard() {
    const router = useRouter()
    const [number, setNumber] = useState("")
    const [amount, setAmount] = useState("")

    return (
        <div className="">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder={"Number"}
                            label="Number"
                            onChange={(value) => {
                                setNumber(value)
                            }}
                        />
                        <TextInput
                            placeholder={"Amount"}
                            label="Amount"
                            onChange={(value) => {
                                setAmount(value)
                            }}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button
                                onClick={async () => {
                                    await p2pTransfer(
                                        number,
                                        Number(amount) * 100
                                    )
                                    router.push("/transfer")
                                }}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    )
}
