import {useState} from "react";
import {
    useDeletePlaylistMutation,
    useFetchPlaylistsQuery,
    useUpdatePlaylistMutation
} from "@/features/playlists/api/playListApi.ts";
import s from './PlaylistsPage.module.css'
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {
    CreatePlaylistArgs,
    PlaylistData,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {PlayListItem} from "@/features/playlists/ui/PlayListItem/PlayListItem.tsx";
import {EditPlaylistForm} from "@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm.tsx";

export const PlaylistsPage = () => {
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

    const {data, isLoading} = useFetchPlaylistsQuery()
    const [deletePlaylist] = useDeletePlaylistMutation()

    const deletePlaylistHandler = (playlistId: string) => {
        if (confirm('Are you sure you want to delete the playlist?')) {
            deletePlaylist(playlistId)
        }
    }
    const updatePlaylistHandler = (playlistId: string) => {

    }
    if (isLoading) return <h1>Loading...</h1>


    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if(playlist) {
            setPlaylistId(playlist.id)
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map(tag => tag.id)
            })
        } else {
            setPlaylistId(null)
        }
    }



    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <div className={s.items}>
                {data?.data.map(playlist => {
                    const isEditing = playlistId === playlist.id
                    return (
                        <div className={s.item} key={playlist.id}>
                            <div>title: {playlist.attributes.title}</div>
                            {
                                isEditing ?
                                    <EditPlaylistForm
                                        register={register}
                                        playlistId={playlistId}
                                        editPlaylist={editPlaylistHandler}
                                        handleSubmit={handleSubmit}
                                        setPlaylistId={setPlaylistId}
                                    />
                                    :
                                    <PlayListItem
                                        playlist={playlist}
                                        editPlaylistHandler={editPlaylistHandler}
                                        deletePlaylistHandler={deletePlaylistHandler}
                                    />
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}