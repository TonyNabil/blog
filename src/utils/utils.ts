
export const handleErrors = (error) => {
    const statusCode = error.statusCode ? error.statusCode : 500
    const status = error.status ? error.status : "SERVER_ERROR"
    const message = error.message ? error.message : "Internal Server Error!"
    return { statusCode, status, message }
};