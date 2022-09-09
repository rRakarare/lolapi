import {
  Button,
  Container,
  Input,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import prisma from "../lib/prisma";

export async function getServerSideProps(context) {
  const pros = await prisma.lolpro.findMany();
  const prismaPros = pros.map(item => {
    return {
      label: item.name,
      value: item.id
    }
  })
  

  return {
    props: { prismaPros }, // will be passed to the page component as props
  };
}

const Home = ({ prismaPros }) => {
  const apikey = "RGAPI-f5a05fba-98e3-44b1-90d5-8d46ac4b7bf5";
  console.log(prismaPros);
  const [input, setInput] = useState("");
  const [soloqRank, setsoloqRank] = useState(null);
  const [flexRank, setflexRank] = useState(null);
  const [pro, setpro] = useState(null);
  const [assignedPro, setAssignedPro] = useState(null);

  useEffect(() => {
    console.log(assignedPro)
  }, [assignedPro])
  

  const queryPro = async () => {
    const proInfo = await axios.get(
      `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input}?api_key=${apikey}`
    );

    setpro(proInfo.data);

    const puuid = proInfo.data.puuid;
    const summonerid = proInfo.data.id;

    const rankInfo = await axios.get(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerid}?api_key=${apikey}`
    );

    const solo = rankInfo.data.find(
      (item) => item.queueType == "RANKED_SOLO_5x5"
    );
    const flex = rankInfo.data.find(
      (item) => item.queueType == "RANKED_FLEX_SR"
    );

    setsoloqRank(solo);
    setflexRank(flex);
    console.log(pro);
    console.log(solo);
    console.log(flex);
  };

  const queryMatches = async () => {

    const matches = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${pro.puuid}/ids?start=50&count=100&api_key=${apikey}`
    );
    
    const matchIds = matches.data.map(element => ({matchId: element}));


    const data = {
      proid: assignedPro,
      account: {
        name: pro.name,
        puuid: pro.puuid,
      },
      matches: matchIds,
    };

    await axios.post("api/createMatches", data);
  };

  return (
    <>
      <Container my={10}>
        <Input onChange={(e) => setInput(e.target.value)} value={input} />
        <Button onClick={() => queryPro()}>Search</Button>
        {pro != null && soloqRank != null && flexRank != null ? (
          <UnorderedList>
            <ListItem>{pro?.name}</ListItem>
            <ListItem>
              Soloqueue Rank: {soloqRank?.tier} {soloqRank?.rank}
            </ListItem>
            <ListItem>
              Flexqueue Rank: {flexRank?.tier} {flexRank?.rank}
            </ListItem>
          </UnorderedList>
        ) : null}

        <Select
          onChange={pro=> setAssignedPro(pro.value) }
          name="pros"
          options={prismaPros}
          placeholder="Select a Pro"
          closeMenuOnSelect={true}
        />

        <Button onClick={()=>queryMatches()}>
          Assign Matches
        </Button>
      </Container>
    </>
  );
};

export default Home;
