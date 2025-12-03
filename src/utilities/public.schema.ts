import { Type, type Static, type TObject } from "@sinclair/typebox"



export const answerObjectSchema = (data?: TObject) => {
        if(!data){
                return Type.Object({
                                code: Type.String(),
                                message: Type.String()
                        });
        }
        return Type.Object({
                        code: Type.String(),
                        message: Type.String(),
                        data: Type.Optional(data)
                });
} 


export const ResponseTokenData = Type.Object({
    accessToken: Type.String(),
    refreshToken: Type.String()
});

export const idObjectParams = Type.Object({
        id: Type.String()
});

export type idParamsDto = Static<typeof idObjectParams>;