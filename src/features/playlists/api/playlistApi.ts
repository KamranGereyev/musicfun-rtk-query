import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {
    CreatePlaylistArgs,
    FetchPlaylistsArgs, PlaylistData,
    PlaylistsResponse
} from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY
        },
        prepareHeaders: headers => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        },
    }),
    endpoints: (build) => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: () =>  'playlists',
        }),
        createPlaylist: build.mutation<{data: PlaylistData}, CreatePlaylistArgs>({
            query: (body) =>  ({
                method: 'post',
                url: 'playlists',
                body: {
                    data: {
                        type: 'playlists',
                        attributes: {
                            title: body.title,
                            description: body.description
                        }
                    }
                }
            })
        })
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation } = playlistsApi
