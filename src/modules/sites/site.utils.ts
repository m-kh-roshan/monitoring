import type { Types } from "mongoose";
import { siteSirvices, siteUserServices } from "./site.service.js";

export async function deleteNoUserSites(id: Types.ObjectId) {
    const associatedUsers = await siteUserServices.siteUsers(id);
        if (associatedUsers.length === 0) {
            await siteSirvices.delete(id);
        }
}