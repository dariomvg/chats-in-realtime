export const getChatId = async (id) => {
    const response = await fetch("http://localhost:4000/unique-chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({ id })
    });
    return response; 
}