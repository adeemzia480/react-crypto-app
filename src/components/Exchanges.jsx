import React, { useEffect, useState } from 'react';
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import ErrorContainer from './ErrorContainer';

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(()=>{

    const fetchExchanges = async()=>{
    try{
      const {data} = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
    }catch(error){
    setError(true);
    setLoading(false);
  }
}

    fetchExchanges();
  },[])


  if(error) return <ErrorContainer message={"ERROR 404... Error while fetching"}/>


  return <>
  <Container maxW={'container.xl'}>
    {loading? <Loader/>: <>
    <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
      {exchanges.map((i)=>(
        <div>
          <ExchangeCard
          key={i.id}
          name = {i.name}
          img = {i.image}
          rank = {i.trust_score_rank}
          url = {i.url}
          />
          </div>
      ))}
    </HStack>
    </>}
  </Container>
  </>
}

export default Exchanges;


const ExchangeCard = ({name, img, rank, url})=>(
<a href={url} target={'blank'}>
  <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'}
  css={{"&:hover":{
    transform:"scale(1.1)",
  },
  }}>
    <Image
    src={img}
    w={'10'}
    h={'10'}
    objectFit={'contain'}
    alt={'Exchange'}
    />

    <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>
    <Text noOfLines={'1'}>{name}</Text>
  </VStack>
</a>);