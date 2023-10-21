import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Row, Col, Card, Avatar } from "antd";
import { Header } from "antd/es/layout/layout";
import { GithubOutlined } from "@ant-design/icons";


const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${username}`);
      setUserData(response.data.items);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const openGitHubProfile = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          background: '#001529', // Set the background color as desired
          color: 'white', // Set the text color
        }}
      >
        <div>
          <GithubOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
          {/* Add an icon on the left (GitHub icon) */}
        </div>
        <Button type="default">
          About
        </Button>
      </Header>

      <div style={{ padding: "20px" }}>
        <Row gutter={16}>
          <Col span={18}>
            <Input
              placeholder="Enter a GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={getUserData}>
              Search
            </Button>
          </Col>
        </Row>
        <div style={{ marginTop: "20px" }}>
          {userData.length > 0 ? (
            userData.map((user) => (
              <Card key={user.id}>
                <Card.Meta
                  avatar={<Avatar src={user.avatar_url} />}
                  title={user.login}
                  description={`Name: ${user.login}`}
                />
                <p>Number of Repositories: {user.public_repos}</p>
                <Button
                  type="primary"
                  onClick={() => openGitHubProfile(user.html_url)}
                >
                  Open GitHub Profile
                </Button>
              </Card>
            ))
          ) : (
            <p>No matching users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
