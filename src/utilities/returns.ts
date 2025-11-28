export function answer(code: string, message: string, data?: any) {
    if(data){
        return {
            code,
            message,
            data
        }
    }
    return {
        code,
        message
    }
}