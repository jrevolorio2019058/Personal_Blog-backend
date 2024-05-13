import User from '../user/user.model.js';

import Post from '../post/post.model.js';

export const existentEmail = async (email = '') => {
    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
        throw new Error(`The Email ${email} was register`);
    }
}

export const existentUsername = async (username = '') => {
    const existUsername = await User.findOne({ username: username });

    if (existUsername) {
        throw new Error(`The Username ${username} was register`);
    }
}

export const existentPost = async (postName = '') => {
    const existPost = await Post.findOne({ postName: postName });

    if (!existPost) {
        throw new Error(`The Post ${postName} not exist in DB.`);
    }
}

export const existenUser = async (nameComments= []) => {

    for (const integrant of nameComments) {

        if(integrant == ""){

        }else if(integrant.includes('@')){

            throw new Error(`You can't add a user with an email.`);

        }else{

            const existUsername = await User.findOne({ username: integrant });

            if (!existUsername) {
                throw new Error(`We dont find a username with the name ${integrant}.`);
            }
            
        }
    }

}