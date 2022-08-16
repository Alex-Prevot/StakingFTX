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
import axios, { AxiosResponse } from "axios";
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
  }
  const [Element, setElement] = useState<SchemaRequest[]>([]);
  const [Amount, setAmount] = useState("0");

  const onClickPost = async() => {
    await axios.post("http://localhost:6969/amount", Amount)
    .then(function (response) {
      setElement(response.data)
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const Info = Element.map((element) => (
    <Card
      name={element.name}
      priceElem={(Math.round(element.priceElem * 100) / 100).toFixed(3)}
      startCoin={(Math.round(element.startCoin * 100) / 100).toFixed(2)}
      money={Amount}
      coinsFinal={(Math.round(element.coinsFinal* 100) / 100).toFixed(2)}
      urlImage="https://ftx.com/static/media/ftt-staking-banner.a6546d0d.png"
      stakeTokenElem={(Math.round(element.stakeTokenElem * 100) / 100).toFixed(2)}
    />
  ));

  return (
    <>
      <Box bg="blackAlpha.800">
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
                bg="whiteAlpha.400"
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button onClick={() => onClickPost()}></Button>
            </InputGroup>
          </Box>
        </Center>
      </Box>
      <Box
        bgGradient="linear(to-t, blackAlpha.600, blackAlpha.700, blackAlpha.800)"
        h="780"
      >
        <Box marginLeft="13%">
          <HStack>{Info}</HStack>
        </Box>
      </Box>
    </>
  );
};

export default Home;
