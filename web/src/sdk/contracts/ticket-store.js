import { BigNumber } from "bignumber.js";
import { ContractFunctionParams } from "@hashgraph/sdk";

import { BaseContract } from "./base-contract";

const FUNCTION_NAMES = {
    // Broadcast functions
    DEFINE_GROUP: 'defineGroup',
    BUY: 'buy',
    RESELL: 'resell',
    REFUND: 'refund',
    WITHDRAW: 'withdraw',
    // Read functions
    WITHDRAWERS: 'withdrawers',
    TICKET_OWNER: 'getOwnedTickets',
}


export class TicketsStore extends BaseContract {

    /* --------- Read functions ------- */
    async withdrawalBalance () {
        const fnParams = new ContractFunctionParams()
            .addAddress(this.provider.accountAddress);

        const result = await super.read(FUNCTION_NAMES.WITHDRAWERS, fnParams);
        return result.getUint256(0).div(10000000000000000).toFixed(5)
    }

    async ownedTickets () {
        const result = await super.read(FUNCTION_NAMES.TICKET_OWNER, null);

        const ownedTickets = [];

        for (let i = 2; i > -1; i++) {
            const group = Number(toHexString(result.getBytes32(i)));
            ownedTickets.push([]);

            const numberOfTickets = Number(toHexString(result.getBytes32(++i)));
            if (numberOfTickets == 0) {
                break;
            }

            for (let ticketIndex = 1; ticketIndex < numberOfTickets + 1; ticketIndex++) {
                ownedTickets[group].push(
                    new BigNumber(
                        toHexString(result.getBytes32(ticketIndex + i))
                    ).div(100000000).toString());
            }

            i += numberOfTickets;
        }

        return ownedTickets;
    }


    /* --------- Broadcast functions ------- */
    async defineGroup (maxAvailable, price) {
        const fnParams = new ContractFunctionParams()
            .addUint256(new BigNumber(maxAvailable))
            .addUint256(new BigNumber(price));


        await super.broadcast(FUNCTION_NAMES.DEFINE_GROUP, fnParams);
    }

    async buy (amount, ticketGroupID) {
        const fnParams = new ContractFunctionParams()
            .addUint256(new BigNumber(ticketGroupID));

        await super.broadcast(FUNCTION_NAMES.BUY, fnParams, amount);
    }

    async resell (groupID, ticketID, desiredPrice) {
        console.log(ticketID)
        console.log(desiredPrice)
        const fnParams = new ContractFunctionParams()
            .addUint256(new BigNumber(groupID))
            .addUint256(new BigNumber(ticketID))
            .addUint256(new BigNumber(desiredPrice));


        await super.broadcast(FUNCTION_NAMES.RESELL, fnParams);
    }

    async refund (groupID, ticketID) {
        console.log(groupID)
        console.log(ticketID)
        const fnParams = new ContractFunctionParams()
            .addUint256(new BigNumber(groupID))
            .addUint256(new BigNumber(ticketID));


        await super.broadcast(FUNCTION_NAMES.REFUND, fnParams);
    }

    async withdraw () {
        await super.broadcast(FUNCTION_NAMES.WITHDRAW, null);
    }
}

function toHexString (array) {
    let value = '0x';
    for (let i = 0; i < array.length; i++) {
        let hex = Number(array[i]).toString(16);
        if (hex.length == 1) {
            hex = '0' + hex;
        }
        value += hex;
    }

    return value;
}
