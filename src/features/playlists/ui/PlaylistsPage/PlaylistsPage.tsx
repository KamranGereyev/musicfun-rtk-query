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
    PlaylistData,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {PlayListItem} from "@/features/playlists/ui/PlayListItem/PlayListItem.tsx";
import {EditPlaylistForm} from "@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm.tsx";

export const PlaylistsPage = () => {
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const [search, setSearch] = useState<string>('')
    const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()


    const {data, isLoading} = useFetchPlaylistsQuery({ search })
    const [deletePlaylist] = useDeletePlaylistMutation()

    const deletePlaylistHandler = (playlistId: string) => {
        if (confirm('Are you sure you want to delete the playlist?')) {
            deletePlaylist(playlistId)
        }
    }


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
            <input
                type="search"
                placeholder={'Search playlist by title'}
                onChange={e => setSearch(e.currentTarget.value)}
            />
            <div className={s.items}>
                {!data?.data.length && !isLoading && <h1>Playlists not found</h1>}
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