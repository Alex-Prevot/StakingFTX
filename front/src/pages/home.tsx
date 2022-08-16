import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Card from "componnent/card";
import axios from "axios";
import { useState } from "react";

const Home = (): JSX.Element => {
  interface SchemaRequest {
    name: string;
    priceElem: number;
    stakeTokenElem: number;
    startCoin: number;
    coinsFinal: number;
    moneyFinal: number;
    risk: number;
    riskPourcent: number;
    percentage: number;
    imageUrl: number;
  }
  const [Element, setElement] = useState<SchemaRequest[]>([]);
  const [Amount, setAmount] = useState("0");

  const onClickPost = async () => {
    await axios
      .post("http://localhost:6969/amount", Amount)
      .then(function(response) {
        setElement(response.data);
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const Info = Element.map((element) => (
    <Card
      name={element.name}
      priceElem={(Math.round(element.priceElem * 100) / 100).toFixed(3)}
      startCoin={(Math.round(element.startCoin * 100) / 100).toFixed(2)}
      money={Amount}
      coinsFinal={(Math.round(element.coinsFinal * 100) / 100).toFixed(2)}
      urlImage="https://ftx.com/static/media/ftt-staking-banner.a6546d0d.png"
      stakeTokenElem={(Math.round(element.stakeTokenElem * 100) / 100).toFixed(2)}
      moneyFinal={(Math.round(element.moneyFinal * 100) / 100).toFixed(2)}
      risk={(Math.round(element.risk * 100) / 100).toFixed(2)}
      riskPourcent={(Math.round(element.riskPourcent * 100) / 100).toFixed(2)}
      percentage={(Math.round(element.percentage * 100) / 100).toFixed(2)}
      imageUrl={element.imageUrl}
    />
  ));

  return (
    <>
      <Box bg="gr">
        <Center h="200px">
          <Box w="35%">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="$"
              />
              <Input
                color="white"
                placeholder="Enter amount"
                _placeholder={{ opacity: 0.8, color: "white" }}
                bg="blackAlpha.600"
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button onClick={() => onClickPost()}></Button>
            </InputGroup>
          </Box>
        </Center>
      </Box>
      <Box bgGradient="linear(to-t, gray.300, gray.300, white)" h="780">
        <Box marginLeft="0.5%">
          <HStack>{Info}</HStack>
        </Box>
      </Box>
    </>
  );
};

export default Home;
