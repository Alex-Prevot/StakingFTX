import {
  Box,
  Image,
  Center,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";

const card = (props: any) => {
  const percent = props.percentage;
  const arrow =
    percent < 0 ? <StatArrow type="decrease" /> : <StatArrow type="increase" />;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [checkedItems, setCheckedItems] = React.useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [APIKey, setAPIKey] = React.useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [PrivateKey, setPrivateKey] = React.useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const initialRef = React.useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const finalRef = React.useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setShow] = React.useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();

  const handleClick = () => setShow(!show);

  let id = 10;

  const onClick = async () => {
    const elementStaking = {
      public: APIKey,
      secret: PrivateKey,
      data: {
        size: props.startCoin,
        coin: props.name,
      },
    };
    await axios
      .post("http://localhost:6969/stake", elementStaking)
      .then(function(response) {
        toast({
          title: "Stake transaction",
          description:
            response.status !== 200
              ? response.data.error
              : response.data.success,
          status: response.status !== 200 ? "error" : "success",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const btn =
    checkedItems === false || APIKey === "" || PrivateKey === "" ? (
      <Button colorScheme="blue" mr={3} disabled>
        Stake
      </Button>
    ) : (
      <Button colorScheme="blue" mr={3} onClick={() => onClick()}>
        Stake
      </Button>
    );

  const check =
    checkedItems === false ? (
      <Checkbox
        isInvalid
        w="100%"
        onChange={(e) => setCheckedItems(e.target.checked)}
        key={(id += 1)}
      >
        You will enter in the FTX Staking Pool with {props.coinsFinal}{" "}
        {props.name}
      </Checkbox>
    ) : (
      <Checkbox
        w="100%"
        onChange={(e) => setCheckedItems(e.target.checked)}
        key={(id += 1)}
      >
        You will enter in the FTX Staking Pool with {props.coinsFinal}{" "}
        {props.name}
      </Checkbox>
    );

  return (
    <>
      <Box
        key={(id += 1)}
        bg="whiteAlpha.500"
        w="25%"
        boxShadow="base"
        h="650"
        borderRadius="lg"
      >
        <Center key={(id += 1)}>
          <Box key={(id += 1)} boxSize="115px" h="130">
            <Image key={(id += 1)} src={props.imageUrl} />
          </Box>
        </Center>
        <Center key={(id += 1)}>
          <Box key={(id += 1)}>
            <Stat key={(id += 1)}>
              <HStack key={(id += 1)}>
                <StatNumber key={(id += 1)}>
                  Price {props.name} {props.priceElem}$
                </StatNumber>
                <StatHelpText key={(id += 1)}>
                  {arrow}
                  {props.percentage}%
                </StatHelpText>
              </HStack>
            </Stat>
          </Box>
        </Center>
        <Center key={(id += 1)}>
          <Box boxShadow="base" w="90%" margin="5" key={(id += 1)}>
            <Box key={(id += 1)}>
              <Center fontSize="30" key={(id += 1)}>
                Forcast
              </Center>
            </Box>
            <Center key={(id += 1)}>
              <Box key={(id += 1)}>
                <Center fontSize="20" key={(id += 1)}>
                  {props.money}$ = {props.startCoin} {props.name}
                </Center>
                <Stat key={(id += 1)}>
                  <HStack margin="1" key={(id += 1)}>
                    <StatNumber key={(id += 1)}>
                      Staking/year {props.coinsFinal} {props.name}
                    </StatNumber>
                    <StatHelpText key={(id += 1)}>
                      <StatArrow type="increase" key={(id += 1)} />
                      {props.stakeTokenElem}%
                    </StatHelpText>
                  </HStack>
                </Stat>
                <Center fontSize="20" key={(id += 1)}>
                  {props.coinsFinal} {props.name} = {props.moneyFinal}$
                </Center>
              </Box>
            </Center>
          </Box>
        </Center>
        <Center key={(id += 1)}>
          <Box boxShadow="base" w="90%" margin="5" key={(id += 1)}>
            <Box key={(id += 1)}>
              <Center fontSize="30" key={(id += 1)}>
                Resale
              </Center>
            </Box>
            <Center key={(id += 1)}>
              <Box key={(id += 1)}>
                <Stat key={(id += 1)}>
                  <HStack margin="1" key={(id += 1)}>
                    <StatNumber key={(id += 1)}>
                      No profit at {props.risk}$
                    </StatNumber>
                    <StatHelpText key={(id += 1)}>
                      <StatArrow key={(id += 1)} type="decrease" />
                      {props.riskPourcent}%
                    </StatHelpText>
                  </HStack>
                </Stat>
              </Box>
            </Center>
          </Box>
        </Center>
        <Center key={(id += 1)}>
          <Button onClick={onOpen} size="lg" key={(id += 1)}>
            Staking Pool ({props.name})
          </Button>
        </Center>
        <Modal
          key={(id += 1)}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent key={(id += 1)}>
            <ModalHeader>Enter in Staking Pool (On FTX)</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl key={(id += 1)}>
                <FormLabel>Key API Public</FormLabel>
                <Input
                  key={(id += 1)}
                  id="field-:rp:2"
                  ref={initialRef}
                  placeholder="Your FTX Public Key API"
                  onChange={(e) => setAPIKey(e.target.value)}
                />
                <FormLabel key={(id += 1)}>Key API Private</FormLabel>
                <HStack key={(id += 1)}>
                  <Input
                    key={(id += 1)}
                    id="field-:rp:1"
                    ref={initialRef}
                    placeholder="Your FTX Private Key API"
                    onChange={(e) => setPrivateKey(e.target.value)}
                    type={show ? "text" : "password"}
                  />
                  <Button
                    key={(id += 1)}
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </HStack>
              </FormControl>
            </ModalBody>
            <ModalBody key={(id += 1)}>{check}</ModalBody>
            <ModalFooter key={(id += 1)}>
              {btn}
              <Button key={(id += 1)} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default card;
