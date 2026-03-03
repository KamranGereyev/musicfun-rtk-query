import {SubmitHandler, UseFormHandleSubmit, UseFormRegister} from "react-hook-form";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import {useUpdatePlaylistMutation} from "@/features/playlists/api/playlistApi.ts";

type Props = {
    playlistId: string | null
    setPlaylistId: (playlistId: string | null) => void
    editPlaylist: (playlist: PlaylistData | null) => void
    register: UseFormRegister<UpdatePlaylistArgs>
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
}
export const EditPlaylistForm = ({
     register,
     playlistId,
     setPlaylistId,
     editPlaylist,
     handleSubmit
}: Props) => {

    const [updatePlaylist] = useUpdatePlaylistMutation()

    const onSubmit: SubmitHandler<UpdatePlaylistArgs> = data => {
        if (!playlistId) return
        updatePlaylist({ playlistId, body: data }).then(() => {
            setPlaylistId(null)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'}/>
            </div>
            <div>
                <input {...register('description')} placeholder={'description'}/>
            </div>
            <button type={'submit'}>save</button>
            <button type={'button'} onClick={() => editPlaylist(null)}>
                cancel
            </button>
        </form>
    )
}
