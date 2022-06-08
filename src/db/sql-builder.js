// upsert record into MYSQL
const { Op } = require("sequelize");

async function readData(model) {
    const foundItems = await model.findAll({
        where: {
            email_status: {
                [Op.or]: {
                    [Op.not]: 'sent',
                    [Op.eq]: null,
                },
            },
        }
    })
    return foundItems
}

// update record review state into MYSQL
async function updateEmailStatusToMysql(model, submission_uuid) {
    const foundItem = await model.findOne({ where: { uuid: submission_uuid } })
    if (foundItem) {
        const item = await model.update({ email_status: emailStats }, { where: { uuid: submission_uuid } })
        return { item, created: false }
    }
}


module.exports = {
    readData,
    updateEmailStatusToMysql
}