import type { Types } from "mongoose";

interface ISite {
    url: string;
    lastChecked: Date;
    DownTime: number;
}

