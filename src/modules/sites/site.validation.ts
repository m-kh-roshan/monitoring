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
        new URL(url);
        return { ok: true as const };
    } catch (error) {
        return { ok: false as const, error: (error as Error).message };
    }
}