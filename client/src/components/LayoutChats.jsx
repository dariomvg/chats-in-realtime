import { Outlet } from "react-router-dom";
import { Chats } from "../pages/Chats";
import "../styles/layout-chats.css";

export const LayoutChats = () => {
  return (
    <section className="layout-chats">
        <Chats />
        <section className="section-chat-layout">
            <Outlet />
        </section>
    </section>
  )
}
