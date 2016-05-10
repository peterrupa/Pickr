import sequelize from './sequelize';

export default function (req, res, next) {
    const query = 'SELECT AccountId FROM Classes where id = ?';

    if (new RegExp('^/classroom/').test(req.originalUrl)) {
        sequelize.query(query, {
            replacements: [req.originalUrl.substring(11)],
            type: sequelize.QueryTypes.SELECT
        })
        .then((id) => {
            if (id[0].AccountId === req.session.key) {
                next();
            }
            else {
                res.status(403)
                .send({ACCESS_DENIED: 'You do not have permission to view' +
                ' this page'});
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
    }
    else {
        next();
    }
}
