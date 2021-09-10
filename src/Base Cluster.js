const {BaseCluster} = require("kurasuta");

module.exports = class extends BaseCluster {
    launch() {
        return this.client.login(process.env.TOKEN);
    }
}