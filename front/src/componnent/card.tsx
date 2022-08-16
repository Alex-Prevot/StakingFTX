import { Box, Image, Center } from "@chakra-ui/react";

const card = (props: any): JSX.Element => {
  return (
    <>
      <Box
        bg="whiteAlpha.500"
        w="20%"
        boxShadow="dark-lg"
        h="500"
        borderRadius="lg"
      >
        <Center>
          <Box boxSize="240px" h="130">
            <Image src={props.urlImage} />
          </Box>
        </Center>
        <Center fontSize="20">   
          Price {props.name} {props.priceElem}$
        </Center>
        <Center fontSize="20">Staking rewards per year {props.stakeTokenElem}%</Center>
        <Center fontSize="20">
          With {props.money}$ you have {props.startCoin} {props.name}
        </Center>
        <Center fontSize="20">Forecast on one year {props.coinsFinal}$</Center>
      </Box>
    </>
  );
};

export default card;
