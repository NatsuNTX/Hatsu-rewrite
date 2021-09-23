const {
    ActivityWord,
    Bot_Status,
    Bot_IsStream,
    Bot_LiveUrl,
    Update_Activity
} = require('../../../../activity.json');

const {hatsuLogger} = require('../../Logger');

const hatsuActivity = async (client) => {
    switch (Bot_IsStream) {
        case true:
            try {
                await client.user.setStatus(Bot_Status);
                client.user.setActivity({name:`${wordList(ActivityWord)}`, type:"STREAMING", url:Bot_LiveUrl});
                setInterval(() => {
                    client.user.setActivity({name:`${wordList(ActivityWord)}`, type:"STREAMING", url:Bot_LiveUrl});
                }, Update_Activity);
            } catch (e) {
                console.log(e);
                return hatsuLogger.errorLog("Hatsu Activity", "Error When Load Activity");
            }
            break
        case false:
            try {
                await client.user.setStatus(Bot_Status);
                client.user.setActivity({name:`${wordList(ActivityWord)}`, type:"LISTENING"});
                setInterval(() => {
                    client.user.setActivity({name:`${wordList(ActivityWord)}`, type:"LISTENING"});
                }, Update_Activity);
            } catch (e) {
                console.log(e);
                return hatsuLogger.errorLog("Hatsu Activity", "Error When Load Activity");
            }
            break
    }
}
const wordList = (word) => {
    return word[Math.floor(Math.random() * word.length -1) + 1]
}
exports.hatsuActivity = hatsuActivity