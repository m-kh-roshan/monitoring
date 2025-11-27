import { model, Schema, Types } from "mongoose";

export interface IRefreshToken{
    token: string;
    user_id: Types.ObjectId;
    expiredAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
    token:{
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expiredAt:{
        type: Date,
        default: () => new Date(Date.now() + 7*24*3600*1000)
    }
},{
    timestamps: true
});

refreshTokenSchema.index({token: 1});

export const RefreshToken =  model<IRefreshToken>("RefreshToken", refreshTokenSchema);