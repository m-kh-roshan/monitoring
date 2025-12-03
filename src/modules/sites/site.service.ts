import type { Types } from "mongoose";
import { Site, SiteUsers, type ISite, type ISiteUsers } from "./site.model.js"

export const siteSirvices = {
    async create(url: string) {
        return Site.create({url});
    },

    async findByUrl(url: string) {
        return Site.findOne({url}).lean();
    },

    async find(id: string) {
        return Site.findById(id).lean();
    },

    async findSitesCheckNeeded() {
        return Site.find({$or: [
            {lastChecked: {$lte: (new Date(Date.now() - Number(process.env.SCHEDULE_TIME || 30) * 60 * 1000)) }},
            {lastChecked: {$exists: false}}
        ]}).lean();
    },

    async update(id: Types.ObjectId, data: Partial<ISite>) {
        return Site.findByIdAndUpdate(id, data);
    },

    async findReportableSites() {
        const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
        return Site.find({
            isDown: true,
            lastNotified: {$lte: thirtyMinsAgo}
        }).lean();
    }
};

export const siteUserServices = {
    async create(data: ISiteUsers) {
        return SiteUsers.create(data);
    },

    async siteUsers(site_id: Types.ObjectId) {
        return SiteUsers.find({site_id}).lean();
    },

    async userSites(user_id: Types.ObjectId) {
        return SiteUsers.find({user_id}).lean();
    },

    async findBySiteAndUser(site_id: Types.ObjectId, user_id: Types.ObjectId) {
        return SiteUsers.findOne({site_id, user_id}).lean();
    },

    async update(id: Types.ObjectId, data: Partial<ISiteUsers>) {
        return SiteUsers.findByIdAndUpdate(id, data);
    },

    findByUserAndTitle(user_id: Types.ObjectId, title: string) {
        return SiteUsers.findOne({user_id, title}).lean();
    },

    delete(id: Types.ObjectId) {
        return SiteUsers.findByIdAndDelete(id);
    }
}