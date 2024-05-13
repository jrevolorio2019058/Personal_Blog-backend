import Comment from './comment.model.js';

export const listComment = async (req, res = response) => {

    const { limit, from } = req.query;
    const query = { };

    const [total, comment] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        comment
    });

}

export const addComment = async (req, res) => {

    const {creatorComment, titleComment, descriptionComment, postName} = req.body;

    const comment = new Comment({

        creatorComment, 
        titleComment,
        descriptionComment,
        postName

    });

    await comment.save();

    res.status(200).json({

        msg: `You created the post ${comment.titleComment} successfully`

    });

}