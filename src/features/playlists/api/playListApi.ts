import type {
    CreatePlaylistArgs,
    PlaylistsResponse,
    PlaylistData,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";

export const playListsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchPlaylists: builder.query<PlaylistsResponse, void>({
            query: () => 'playlists',
            providesTags: ['Playlist'],
        }),
        createPlaylist: builder.mutation<{data: PlaylistData}, CreatePlaylistArgs>({
            query: (body) => ({ method: 'POST',
                url: `playlists`,
                body,
            }),
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylist: builder.mutation<void, string>({
            query: (playlistId) => ({method: 'Delete',
                url: `playlists/${playlistId}`,
            }),
            invalidatesTags: ['Playlist'],
        }),
        updatePlaylist: builder.mutation<void, {playlistId: string, body: UpdatePlaylistArgs}>({
            query: ({playlistId, body}) => ({ method: 'put',
                url: `playlists/${playlistId}`,
                body
            }),
            invalidatesTags: ['Playlist'],
        }),
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation, useDeletePlaylistMutation, useUpdatePlaylistMutation} = playListsApi