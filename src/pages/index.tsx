import {
  AspectRatio,
  Box,
  Flex,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { getAllFoods } from '@/lib/api';
import { FoodInterface } from '@/types/food.interface';
import FoodPreview from '@/components/food.preview';
import Layout from '@/components/layout';
import MyMeta from '@/components/my-meta';
import Header from '@/components/header';

type Props = {
  foods: FoodInterface[];
};

const Index = ({ foods }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todayFood, setTodayFood] = useState<FoodInterface>();

  const handleModalFood = () => {
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    setTodayFood(randomFood);
    onOpen();
  };

  return (
    <Layout>
      <MyMeta
        title={'Hôm nay ăn gì?'}
        description={'Có rất nhiều món để có thể lựa chọn...'}
        imageUrl={
          'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=562&q=80'
        }
        url={'https://whattoeattoday.vercel.app'}
      />
      <Header onClick={handleModalFood} />
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        w={{ base: '95%', xl: '1216px' }}
        m="auto"
      >
        {foods.map((food) => (
          <FoodPreview
            title={food.title}
            coverImage={food.coverImage}
            excerpt={food.excerpt}
            key={food.path}
          />
        ))}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={{ base: '95%', sm: '608px' }} maxH="90vh">
          <ModalCloseButton color="gray.300" w={6} h={6} />
          <ModalHeader mt={2} textAlign="center">
            <Box>Món ăn hôm nay: {todayFood?.title}</Box>
          </ModalHeader>
          <ModalBody>
            <AspectRatio ratio={4 / 3} w="100%">
              <Img src={todayFood?.coverImage} alt={todayFood?.title} w="100%" />
            </AspectRatio>
            <Box maxH="30vh" overflowY="auto" my={3}>
              <Box d="flex" alignItems="baseline">
                <Box letterSpacing="wide">{todayFood?.excerpt}</Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const foods = getAllFoods(['title', 'path', 'coverImage', 'excerpt']);
  return {
    props: { foods },
  };
};
