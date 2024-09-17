export const createNewChat = async (data) => {
    const response = await fetch("http://localhost:4000/create-chat", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data),
    });
    return response.ok
}