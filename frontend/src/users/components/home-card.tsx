import { Card } from "antd";
import React, { ReactNode } from "react";

export interface IHomeCard {
    icon: ReactNode;
    title: string;
    href: string;
}

const HomeCard: React.FC<IHomeCard> = ({ icon, title, href }) => {

    const navigateToAnotherPage = () => {
        window.location.href = href;
    }

    return (
        <Card title={<div style={{ textAlign: "center", margin: "20px 0", border: "1px sold #d3d3d3" }}>{icon}</div>} hoverable onClick={navigateToAnotherPage}>
            <p style={{ fontWeight: 600, textAlign: "center" }}>{title}</p>
        </Card>
    );
}

export default HomeCard;