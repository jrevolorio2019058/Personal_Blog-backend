export const existentEmail = async () => {
    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
        throw new Error(`The Email ${email} was register`);
    }
}

export const existentUsername = async () => {
    const existUsername = await User.findOne({ username: username });

    if (existUsername) {
        throw new Error(`The Username ${username} was register`);
    }
}