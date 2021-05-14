import elasticsearch from "elasticsearch";

export const config = {
    host: "localhost",
    port: 9200
}

const client = new elasticsearch.Client({
    host: `${config.host}:${config.port}`,
    log: "error",
    //apiVersion: '7.2', // use the same version of your Elasticsearch instance
});
client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.log(error)
        console.log("elasticsearch cluster is down!");
    } else {
        console.log("All is well");
    }
});

export default client;
