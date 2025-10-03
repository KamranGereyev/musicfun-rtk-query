import type {
    PlaylistData,
    PlaylistsResponse,
    FetchPlaylistsArgs,
    UpdatePlaylistArgs,
    CreatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";
import type {Images} from "@/common/types";

export const playListsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchPlaylists: builder.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: (params) => ({ url: 'playlists', params }),
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
        uploadPlaylistCover: builder.mutation<Images, { playlistId: string; file: File }>({
            query: ({ playlistId, file }) => {
                const formData = new FormData()
                formData.append('file', file)
                return {
                    url: `playlists/${playlistId}/images/main`,
                    method: 'Post',
                    body: formData,
                }
            },
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylistCover: builder.mutation<void, { playlistId: string }>({
            query: ({ playlistId }) => ({
                    url: `playlists/${playlistId}/images/main`,
                    method: 'Delete',
            }),
            invalidatesTags: ['Playlist'],
        }),
    }),
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation,
} = playListsApi