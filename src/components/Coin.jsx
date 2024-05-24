import React, { useEffect, useState } from 'react';
import { Container, HStack, VStack, Image, Heading, Text, Button, RadioGroup, Radio } from '@chakra-ui/react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import ErrorContainer from './ErrorContainer';
import CoinCard from './CoinCard';

const Coin = () => {

  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('pkr')


  const currencySymbol = currency === 'pkr' ? 'PKR' : currency === 'eur' ? '€' : '$';

  const changePage = (page)=>{
    setPage(page);
    setLoading(true);
  }

  const btns = new Array(132).fill(1);

  useEffect(()=>{

    const fetchCoin = async()=>{
    try{
      const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      setCoin(data);
      setLoading(false);
      console.log(data);
    }catch(error){
    setError(true);
    setLoading(false);
  }
}

    fetchCoin();
  },[currency, page])


  if(error) return <ErrorContainer message={"ERROR 404... Error while fetching coins"}/>


  return <>
  <Container maxW={'container.xl'}>
    {loading? <Loader/>: <>

    <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
      <HStack spacing={'4'}>
        <Radio value={'pkr'}>PKR</Radio>
        <Radio value={'usd'}>USD</Radio>
        <Radio value={'eur'}>EUR</Radio>
      </HStack>
    </RadioGroup>
    <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
      {coin.map((i)=>(
        <div>
          <CoinCard
          id={i.id}
          key={i.id}
          name = {i.name}
          price={i.current_price}
          img = {i.image}
          symbol={i.symbol}
          rank = {i.trust_score_rank}
          url = {i.url}
          currencySymbol= {currencySymbol}
          />
          </div>
      ))}
    </HStack>
    <HStack w={'full'} overflow={'auto'} p={'8'}>
      {
        btns.map((item, index)=>(<Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}>{index+1}</Button>))
      }
    </HStack>
    </>}
  </Container>
  </>
}

export default Coin;