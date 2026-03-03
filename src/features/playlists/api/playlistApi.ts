import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {
    CreatePlaylistArgs,
    FetchPlaylistsArgs, PlaylistData,
    PlaylistsResponse, UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/api/baseApi.ts";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: () =>  'playlists',
                providesTags: ['Playlists']
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
            }), invalidatesTags: ['Playlists']
        }),
        deletePlaylist: build.mutation<void, string>({
            query: playlistId => ({
                url: `playlists/${playlistId}`,
                method: 'delete',
            }),
            invalidatesTags: ['Playlists']
        }),
        updatePlaylist: build.mutation<{ data: PlaylistData }, { playlistId: string; body: UpdatePlaylistArgs }>({
            query: ({ playlistId, body }) => ({
                url: `playlists/${playlistId}`,
                method: 'put', // или 'patch' — зависит от API
                body: {
                    data: {
                        type: 'playlists',
                        id: playlistId,
                        attributes: {
                            title: body.title,
                            description: body.description,
                            tagIds: body.tagIds,
                        },
                    },
                },
            }), invalidatesTags: ['Playlists']
        }),
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation, useDeletePlaylistMutation, useUpdatePlaylistMutation } = playlistsApi
