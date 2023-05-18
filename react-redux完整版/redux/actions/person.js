import { ADDPERSON } from "../constant";

export function createAddPersonAction(personobj) {
    return {
        type: ADDPERSON, data: personobj
    }
}