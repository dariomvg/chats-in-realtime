export const getChats = async () => {
    const response = await fetch("http://localhost:4000/chats");
    const res = await response.json(); 
    return res;
}