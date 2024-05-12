import Post from './post.model.js'

export const addPost = async (req, res) => {

    const {postName, postDescription, postImage, proyectLink, nameComments} = req.body;

    const post = new Post({

        postName, 
        postDescription,
        postImage,
        proyectLink,
        nameCreator: req.user.username,
        nameComments

    });

    await post.save();

    res.status(200).json({

        msg: `${req.user.username} you created the post ${post.postName} successfully`

    });

}