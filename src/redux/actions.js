import { TABLE_RESIZE } from "./type";

//Action Creator
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}