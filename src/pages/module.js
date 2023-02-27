
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Layout, QueryResult } from "../components";
import ModuleDetail from "../components/module-detail";

/** GET_TRACK_AND_PARENT_TRACK gql query to retrieve a specific module
 *  and its parent track both needed for the ModuleDetail component */
export const GET_MODULE_AND_PARENT_TRACK = gql`
    query GetModuleAndParentTrack($trackId: ID!, $moduleId: ID!) {
        # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # Важно!!! Имя параметра trackIdDemo должно в точности повторять
        # имя, заданное в схеме - Query.track(...) !!!
        track(trackIdDemo: $trackId) {
            id
            title
            modules {
                id
                title
                durationInSeconds
            }
        }
        module(id: $moduleId) {
            id
            title
            content
            videoUrl
        }
    }
`;

/**
 * Module page fetches both parent track and module's data from the
 * gql query GET_MODULE_AND_PARENT_TRACK and feeds them to the
 * Module detail component
 */
const Module = ({ trackId, moduleId }) => {
    const { loading, error, data } = useQuery(
      GET_MODULE_AND_PARENT_TRACK,
      {variables: { trackId, moduleId }},
    );
    return <Layout fullWidth>
        <QueryResult error={error} loading={loading} data={data}>
            <ModuleDetail track={data?.track} module={data?.module} />
        </QueryResult>
    </Layout>;
};

export default Module;

