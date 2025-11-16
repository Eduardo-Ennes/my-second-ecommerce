type Response = {
    status?: boolean
    error?: string
}


class ValidationFieldsRquists {
    async Fields(requisit: string): Promise<Response> {
        if (requisit.length > 75) {
            return {
                status: false,
                error: 'O campo de requisito do curso deve possuir no máximo 75 caracteres.'
            }
        }

        if (requisit.length < 1) {
            return {
                status: false,
                error: 'O campo requisito não pode ser vazio.'
            }
        }

        return {status: true}
    }
}


export default new ValidationFieldsRquists()