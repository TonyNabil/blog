import client from "../config/elasticSearch";
import esb from "elastic-builder";



export default class ElasticSearch {


    async search(queryString) {
        let formatedResponse = []
        const query = this.buildElasticQuery(queryString);

        const searchResponse = await client.search({
            body: query
        });

        for (const oneResult of searchResponse?.hits?.hits) {

            formatedResponse.push({
                id: oneResult._id,
                title: oneResult._source.title,
                body: oneResult._source.body,
                authorName: oneResult._source.author.name,
                authorJob: oneResult._source.author.job,
                comments: oneResult._source.comments.map(comment => {
                    return {
                        body: comment.body,
                        commentor: comment.author.name
                    }
                }),
                thumbsUp: oneResult._source.thumbsUp.length
            });

        }


        return { result: formatedResponse, total: searchResponse?.hits?.total.value };
    }

    buildElasticQuery = function (queryString) {

        if (!queryString) {
            const query = esb.requestBodySearch()
                .query(
                    esb.matchAllQuery()
                )
                .minScore(.1)
                //.explain(true)
                .toJSON();
            return query;

        }
        const query = esb.requestBodySearch()
            .query(
                new esb.QueryStringQuery(`*${queryString}*`)
                    .fields(['title^5', 'body^3'])
                    .defaultOperator("AND")
                    .fuzziness(0)
            )
            .minScore(.1)
            //.explain(true)
            .toJSON();

        return query;

    }

}
