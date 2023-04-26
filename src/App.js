import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Nav,Navbar,Row,Col} from 'react-bootstrap';
import data from './data.js';
import { useState } from 'react';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './Detail';
import axios from 'axios';
import Cart from './Cart'
import { useQuery } from 'react-query';

function App() {
  
  let [shoes, setShoes]= useState(data);
  let navigate = useNavigate();
  let [count , setCount] = useState(0);
  let [loading, setLoading] = useState(false)

  function getMoreShoes(url){
    axios.get(url)
          .then((result)=>{
          console.log(result.data)
          setShoes([...shoes,...result.data])
          //로딩중ui 숨기기
          setLoading(false)
          })
          .catch(()=>{
          console.log('실패함ㅅㄱ')
          //로딩중ui 숨기기
          setLoading(false)
        })
  }

 let result = useQuery('작명',()=>{
    return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
    console.log('요청됨') // 다른 페이지 다녀오면, 틈만나면 자동으로 재요청해줌
    return a.data  
    }),
    { staleTime : 2000 } // 재요청을 2초 간격으로, 타이머 같은 기능
  })
  //result.data result가 성공시에 보이는 것
  //result.isLoading result가 로딩시에 보이는 것
  //result.error result가 에러시에 보이는 것

  return (
    <div className="App">

    <br />
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}} >Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}} >Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
          {result.isLoading && '로딩중'}
          {result.error && '에러남'}
          {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

    <Routes>
    <Route path ="/" element ={
    <>
    <div className='main-bg'></div>
    <Container>
      <Row>
        {
          shoes.map((a,i)=>{
          return(
            <Card shoes={shoes[i]} i ={i+1}></Card>
          )
          })
        }
      </Row>
    </Container> 
    <button onClick={()=>{ //버튼 2회 누를때는 7,8,9번 상품을 가져오려면?
      
      if(count === 0){
        //로딩중ui 띄우기
        setLoading(true)
        setTimeout(()=>{
          getMoreShoes('https://codingapple1.github.io/shop/data2.json')
          setCount(1)
        }, 3000)
      }else if(count ===1){
        setLoading(true)
        setTimeout(()=>{
          getMoreShoes('https://codingapple1.github.io/shop/data3.json')
          setCount(1)
        }, 3000)
      }else{
        alert('더 상품이 없다')
      }
      }}>더보기 버튼</button>
      {/* 로딩ui를 보여주는곳 */}
      {
        loading === true ? <LoadingUI/> : null
      }
    </>
   }/>

    <Route path ="/detail/:id" element ={<Detail shoes={shoes}/>}/>
    <Route path ="/cart" element = {<Cart></Cart>}/>

    <Route path="/about" element={<About/>}>
     <Route path="member" element={<div>멤버임</div>}></Route>
     <Route path="location" element={<div>위치정보임</div>}></Route>
    </Route>

   <Route path="/event" element ={<Event/>}>
    <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
    <Route path="two" element ={<div>생일기념 쿠폰받기</div>}></Route>
   </Route>
 
   </Routes>
  
    </div>
  );
}
function LoadingUI(){
  return(
    <div>
      <img src="https://cdn-icons-png.flaticon.com/512/4990/4990502.png" alt="로딩중입니다" />
      <p>로딩중입니다</p>
    </div>
  )
}
function Card(props){
  return (
  <div className="col-md-4">
  <img src={"https://codingapple1.github.io/shop/shoes"+props.i+".jpg"} width="80%" />
  <h4>{ props.shoes.title }</h4>
  <p>{ props.shoes.price }</p>
</div>
)
}

function About(){
  return(
    <div>
    <h4>회사정보임</h4>
    <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}
export default App;
