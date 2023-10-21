import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Row, Col, Card, Avatar, Menu } from "antd";
import { Header } from "antd/es/layout/layout";


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
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
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
