import {
  Box,
  Image,
  Center,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
} from "@chakra-ui/react";

const card = (props: any) => {
  return (
    <>
      <Box
        bg="whiteAlpha.500"
        w="25%"
        boxShadow="base"
        h="550"
        borderRadius="lg"
      >
        <Center>
          <Box boxSize="240px" h="130">
            <Image src={props.imageUrl} boxSize="90%" />
          </Box>
        </Center>
        <Center>
          <Box>
            <Stat>
              <HStack>
                <StatNumber>
                  Price {props.name} {props.priceElem}$
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {props.percentage}%
                </StatHelpText>
              </HStack>
            </Stat>
          </Box>
        </Center>
        <Center>
          <Box boxShadow="base" w="90%" margin="5">
            <Box>
              <Center fontSize="30">Forcast</Center>
            </Box>
            <Center>
              <Box>
                <Center fontSize="20">
                  {props.money}$ = {props.startCoin} {props.name}
                </Center>
                <Stat>
                  <HStack margin="1">
                    <StatNumber>
                      Staking/year {props.coinsFinal} {props.name}
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      {props.stakeTokenElem}%
                    </StatHelpText>
                  </HStack>
                </Stat>
                <Center fontSize="20">
                  {props.coinsFinal} {props.name} = {props.moneyFinal}$
                </Center>
              </Box>
            </Center>
          </Box>
        </Center>
        <Center>
          <Box boxShadow="base" w="90%" margin="5">
            <Box>
              <Center fontSize="30">Resale</Center>
            </Box>
            <Center>
              <Box>
                <Stat>
                  <HStack margin="1">
                    <StatNumber>
                      Staking/year {props.risk}$
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="decrease" />
                      {props.riskPourcent}%
                    </StatHelpText>
                  </HStack>
                </Stat>
              </Box>
            </Center>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default card;
