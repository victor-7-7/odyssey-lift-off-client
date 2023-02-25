import React from 'react';
import { Layout, QueryResult } from '../components';
import { gql, useQuery } from "@apollo/client";
import TrackCard from "../containers/track-card";

/** TRACKS gql query to retrieve all tracks */
const TRACKS = gql`
  query GetTracks {
    tracksForHome {
      id
      title
      length
      modulesCount
      thumbnail
      author {
        photo
        name
      }
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);
  // ====== Вариант без QueryResult =======
  // Пока loading имеет значение true компонент будет
  // отображать Loading... message
  // if (loading) return "Loading...";
  // В этой точке loading==false. Если сервер вернул ошибку
  // то кидаем в компонент описание ошибки
  // if (error) return `Error! ${error.message}`;
  // Ошибки нет, тогда отдаем необходимые данные в компонент
  // =======================================
  return <Layout grid>
    <QueryResult error={error} loading={loading} data={data}>
      {data?.tracksForHome?.map((track, index) => (
          <TrackCard key={track.id} track={track} />
      ))}
    </QueryResult>
  </Layout>;
};

export default Tracks;
