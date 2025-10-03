import type {ChangeEvent} from "react";
import s from "@/features/playlists/ui/PlayListItem/PlayListCover/PlayListCover.module.css";
import defaultCover from "@/assets/images/default-playlist-cover.png";
import {useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation} from "@/features/playlists/api/playListApi.ts";
import type {Images} from "@/common/types";
import {toast} from "react-toastify";

type PlayListCoverProps = {
    playlistId: string,
    images: Images
}

export const PlayListCover = ({playlistId, images}: PlayListCoverProps) => {
    const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
    const [deletePlayListCover] = useDeletePlaylistCoverMutation()

    const originalCover = images.main?.find(img => img.type === 'original')
    const src = originalCover ? originalCover?.url : defaultCover

    const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const maxSize = 1024 * 1024
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
        const file = event.target.files?.length && event.target.files[0]
        if(!file) return

        if (!allowedTypes.includes(file.type)) {
            toast('Only JPEG, PNG or GIF images are allowed', {type: "error", theme: 'colored'});
            return
        }

        if (file.size > maxSize) {
            toast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`, {type: "error", theme: 'colored'})
            return
        }

        uploadPlaylistCover({playlistId, file,})
    }

    const deleteCoverHandler = () => deletePlayListCover({playlistId})

    return (
        <>
            <img className={s.cover} width="240" src={src} alt="No Cover" />
            <input type="file" accept={'image/jpeg, image/png, image/gif'} onChange={uploadCoverHandler}/>
            {originalCover && <button onClick={deleteCoverHandler}>delete</button>}
        </>
    )
}