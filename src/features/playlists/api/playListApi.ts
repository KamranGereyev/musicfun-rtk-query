import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {CreatePlaylistArgs, PlaylistsResponse, PlaylistData} from "@/features/playlists/api/playlistsApi.types.ts";

export const playListsApi = createApi({
    reducerPath: 'playListsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: headers => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        },
    }),
    endpoints: (builder) => ({
        fetchPlaylists: builder.query<PlaylistsResponse, void>({
            query: () => 'playlists'
        }),
        createPlaylist: builder.mutation<{data: PlaylistData}, CreatePlaylistArgs>({
            query: (body) => {
                return {
                    method: 'POST',
                    url: `playlists`,
                    body,
                }
            }
        }),
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation} = playListsApi