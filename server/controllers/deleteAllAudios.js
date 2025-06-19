import {cloudinary} from "../options/config.cloudinary.js";

export const deleteAllAudios = async (chatId) => {
    await cloudinary.api.delete_resources_by_prefix(`audios_${chatId}/`, {
  resource_type: "video",
});
}