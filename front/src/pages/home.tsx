import {
  Box,
  Center,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
} from "@chakra-ui/react";
import Card from "componnent/card";
import axios from "axios";
import { useEffect, useState } from "react";

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
    imageUrl: string;
  }
  const [Element, setElement] = useState<SchemaRequest[]>([]);
  const [Amount, setAmount] = useState("1");
  const [AmountNew, setAmountNew] = useState(Amount);
  const [BoolUpdate, setBoolUpdate] = useState(false);
  const [BoolSpiner, setBoolSpiner] = useState(false);
  const format = (val: string) => `$ ` + val;
  const parse = (val: string) => val.replace(/^\$/, "");

  const MINUTE_MS = 1000;

  let id = 500;

  useEffect(() => {
    const interval = setInterval(async () => {
      if (Amount.length > 0) {
        await axios
          .post("http://localhost:6969", Amount)
          .then(function(response) {
            setElement(response.data);
            setBoolSpiner(false);
            if (AmountNew !== Amount) {
              setBoolUpdate(true);
              setBoolSpiner(false);
              setAmountNew(Amount);
            } else setBoolUpdate(false);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [AmountNew, Amount]);

  const Info = Element.map((element) => (
    <Card
      key={(id += 1)}
      name={element.name}
      priceElem={(Math.round(element.priceElem * 100) / 100).toFixed(3)}
      startCoin={(Math.round(element.startCoin * 100) / 100).toFixed(2)}
      money={Amount}
      coinsFinal={(Math.round(element.coinsFinal * 100) / 100).toFixed(2)}
      stakeTokenElem={(Math.round(element.stakeTokenElem * 100) / 100).toFixed(
        2
      )}
      moneyFinal={(Math.round(element.moneyFinal * 100) / 100).toFixed(2)}
      risk={(Math.round(element.risk * 100) / 100).toFixed(2)}
      riskPourcent={(Math.round(element.riskPourcent * 100) / 100).toFixed(2)}
      percentage={(Math.round(element.percentage * 100) / 100).toFixed(2)}
      imageUrl={element.imageUrl}
    />
  ));

  const btn = BoolSpiner ? <Button isLoading /> : <></>;

  return (
    <>
      <Box bg="gr" key={(id += 1)}>
        <Center h="200px" key={(id += 1)}>
          <Box key={(id += 1)}>
            <HStack key={(id += 1)}>
              <NumberInput
                key={(id += 1)}
                size="lg"
                color="black"
                placeholder="Enter amount"
                _placeholder={{ opacity: 0.8, color: "black" }}
                bg={BoolUpdate ? "green.400" : "white"}
                onChange={(valueString) => {
                  setAmount(parse(valueString));
                  setBoolSpiner(true);
                }}
                value={format(Amount)}
                min={1}
              >
                <NumberInputField />
                <NumberInputStepper key={(id += 1)}></NumberInputStepper>
              </NumberInput>
              {btn}
            </HStack>
          </Box>
        </Center>
      </Box>
      <Box
        key={(id += 1)}
        bgGradient="linear(to-t, gray.300, gray.300, white)"
        h="780"
      >
        <Box key={(id += 1)} marginLeft="0.5%">
          <HStack key={(id += 1)}>{Info}</HStack>
        </Box>
      </Box>
    </>
  );
};

export default Home;
