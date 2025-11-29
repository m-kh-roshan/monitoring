import type { Types } from "mongoose";
import { siteUserServices } from "./site.service.js";
import { AppError } from "../../utilities/appError.js";
import got, { RequestError } from "got";

export const checkUserHasSite = async(site_id: Types.ObjectId, user_id: Types.ObjectId) => {
    const siteUser = await siteUserServices.findBySiteAndUser(site_id, user_id);
    if(siteUser) return true;

    return false;
}

export async function urlValidation(url: string) {
    try {
        const res = got(url, {
            method: "GET",
            timeout: {request: 2000 },
            throwHttpErrors: false
        });

        return {
            ok: true as const,
            statusCode: (await res).statusCode
        }
    } catch (error) {
        if (error instanceof RequestError) {
            const errorCode = error.code ?? "UNKNOWN";
            return {
                ok: false as const,
                error: errorCode
            };
        }
        const message = error instanceof Error ? error.message : "UNKWON_ERROR";
        return {
            ok: false as const,
            error: message
        };
    }
}