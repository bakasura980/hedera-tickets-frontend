import { BigNumber } from 'bignumber.js';
import {
    ContractCallQuery,
    ContractExecuteTransaction,
    Hbar
} from "@hashgraph/sdk";

export class BaseContract {

    constructor (provider, contractID) {
        this.provider = provider;
        this.contractID = contractID;
    }

    async read (name, args) {
        return new ContractCallQuery()
            .setContractId(this.contractID)
            .setGas(200000)
            .setFunction(name, args)
            .execute(this.provider.client)
    }

    async broadcast (name, args, payableAmount = 0) {
        await (await new ContractExecuteTransaction()
            .setGas(200000)
            .setFunction(name, args)
            .setContractId(this.contractID)
            .setPayableAmount(Hbar.fromTinybar(new BigNumber(payableAmount)))
            .execute(this.provider.client))
            .getReceipt(this.provider.client);
    }
}
