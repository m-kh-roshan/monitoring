import { model, Schema, Types } from "mongoose";


// ==========
// SITES
// ==========
export interface ISite {
    url: string;
    lastChecked?: Date;
    lastNotified?: Date;
    isDown?: boolean;
    error?: string | null;
}

const siteSchema = new Schema<ISite>({
    url: {
        type: String,
        required: true,
        unique: true
    },
    lastChecked: {
        type: Date
    },
    lastNotified: {
        type: Date
    },
    isDown: {
        type: Boolean,
        default: false
    },
    error: {
        type: String
    }
});

export const Site = model<ISite>("Site", siteSchema);

// ===============
// SITE USERS
// ===============

export interface ISiteUsers {
    site_id: Types.ObjectId;
    user_id: Types.ObjectId;
    title?: string;
    downTime?: number;
}

const SiteUserSchena = new Schema<ISiteUsers>({
    site_id: {
        type: Schema.Types.ObjectId,
        ref: "Site",
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
    },
    downTime: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

SiteUserSchena.index({site_id: 1, user_id: 1}, {unique: true});
SiteUserSchena.index({ user_id: 1, title: 1 }, { unique: true, sparse: true });

export const SiteUsers = model<ISiteUsers>("SiteUsers", SiteUserSchena);