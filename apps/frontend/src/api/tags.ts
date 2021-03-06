import { ApiError, ITag } from '@galadrim-rooms/shared'
import { fetchBackendJson } from './fetch'

export const fetchTags = async () => {
    const res = await fetchBackendJson<ITag[], ApiError>('/tags')
    if (res.ok) return res.json
    return []
}
