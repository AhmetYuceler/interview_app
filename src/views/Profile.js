// ProfileComponent.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchCharacters, fetchSeries } from "../actions"; // API fonksiyonlarını içeri aktarın
import Datatable from "./Datatable";

Chart.register(ArcElement, Tooltip, Legend);

const ProfileComponent = () => {
  const { user } = useAuth0();

  const [characterCount, setCharacterCount] = useState(0);
  const [seriesCount, setSeriesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API isteklerini kullanarak verileri çekin
        const characterCount = await fetchCharacters();
        const seriesCount = await fetchSeries();

        setCharacterCount(characterCount);
        setSeriesCount(seriesCount);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["Karakterler", "Seriler"],
    datasets: [
      {
        label: "Veri Sayısı",
        data: [characterCount, seriesCount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md={6}>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>

      {/* Yeni Kod Başlangıcı */}
      <Row>
        <Col md={4} style={{marginTop:'7rem'}}>
          <Pie
            width={500}
            height={500}
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  text: "Karakterler ve Seriler Sayısı",
                  display: true,
                },
              },
            }}
          />
        </Col>

        <Col md={8}>
        <Datatable/>
        </Col>
      </Row>
      {/* Yeni Kod Sonu */}
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent);
