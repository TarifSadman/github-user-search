import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Row, Col, Card, Avatar, Empty, Modal, Space, List } from "antd";
import { Header, Footer } from "antd/es/layout/layout";
import { GithubOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import "./App.css"

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const modalStyle = {
    width: "400px",
    margin: "0 auto",
    padding: "20px",
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${username}`);
      setUserData(response.data.items);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const openUserDetailsModal = async (user) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${user.login}`);
      setSelectedUser(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching user details: ", error);
    }
  };

  const openGitHubProfile = (url) => {
    window.open(url, "_blank");
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
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
          background: '#000135',
          color: 'white',
        }}
      >
        <div>
          <GithubOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
        </div>
        <Button type="default">
          About
        </Button>
      </Header>

      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ maxWidth: "900px", width: "100%" }}>
            <Row gutter={16}>
              <Col span={18}>
                <Input
                  onPressEnter={getUserData}
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
                <List
                  grid={{
                    gutter: 16,
                    column: 2,
                  }}
                  dataSource={userData}
                  renderItem={(user) => (
                    <List.Item>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Card key={user.id}>
                          <Card.Meta
                            avatar={<Avatar src={user.avatar_url} />}
                            title={user.login}
                            description={`Name: ${user.login}`}
                          />
                        </Card>
                        <Button
                          type="primary"
                          onClick={() => openUserDetailsModal(user)}
                          style={{ width: "100%" }}
                        >
                          View Details
                        </Button>
                      </Space>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty />
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer style={{ textAlign: "center", marginTop: 8 }}>
        © {new Date().getFullYear()} <Link href="https://github.com/TarifSadman" target="_blank">TarifSadman.</Link> All Rights Reserved.
      </Footer>

      <Modal
  title="User Details"
  visible={modalVisible}
  onCancel={closeModal}
  footer={[
    <Button
      key="github-profile"
      type="primary"
      onClick={() => openGitHubProfile(selectedUser.html_url)}
    >
      GitHub Profile
    </Button>
  ]}
  style={modalStyle} // Apply the modalStyle class
>
  {selectedUser && (
    <div>
      <Avatar src={selectedUser.avatar_url} size={140} />
      <p style={{ fontSize: 18 }} ><span className="modal-label">Name:</span> {selectedUser.name || "Not provided"}</p>
      <p style={{ fontSize: 18 }} ><span className="modal-label">Bio:</span> {selectedUser.bio || "Not Provided"}</p>
      <p style={{ fontSize: 18 }} ><span className="modal-label">Number of Public Repositories:</span> {selectedUser.public_repos || 0}</p>
      <p style={{ fontSize: 18 }} ><span className="modal-label">Location:</span> {selectedUser.location || "Not provided"}</p>
    </div>
  )}
</Modal>

    </div>
  );
}

export default App;
