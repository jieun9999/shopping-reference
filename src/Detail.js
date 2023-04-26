import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Detail.css';
import {Nav} from 'react-bootstrap';
import {addItem} from './store.js'
import { useDispatch } from "react-redux";


function Detail(props){
  
  let {id} = useParams(); // id라는 변수에 url파라미터를 남겨줌
  //현재 url에 입력한 번호와 같은 번호를 가진 상품을 찾아서
  let [alert2, setAlert2] = useState(true)
  let [input,setInput]= useState('')
  let [tab, setTab] = useState(0) 
  let [end, setEnd] = useState('') 
  let [end2, setEnd2] = useState('') 
  let dispatch = useDispatch()

  let 찾은상품 = props.shoes.find((x)=> x.id == id);
  console.log(props.shoes)
  console.log(찾은상품)
  console.log(id)
  // app.js 파일에서 <Route path ="/detail/:id" element ={<Detail shoes={shoes}/>}/>
  // 또한 상단에 let {id} = useParams()

  useEffect(()=>{
    //여기적은 코드는 컴포넌트 로드& 업데이트시 코드 실행
    setTimeout(()=>{
      setAlert2(false)
    },3000)
  })

  useEffect(()=>{ 
    if(isNaN(input)===true){
    alert('경고: 숫자로 입력하세요')
    }
  }, [input])
  //end라는 state가 바뀔때마다 재렌더링됨
  useEffect(()=>{
    setTimeout(() => {
      setEnd('end') //붙였다 == 보임
    }, 100);
  return ()=>{
  //useEffect {}안에보다 먼저 실행하고 싶은 코드넣기
  setEnd('') // 떼었다가
  }
  },[tab])

  useEffect(()=>{
    setTimeout(()=>{
      setEnd2('end') 
  },500)
    return ()=>{
     setEnd2('')
    }  
  },[])

  useEffect(()=>{
    //이전에 저장된 localStorage의 watched 배열을 가져옵니다
    let Watched = JSON.parse(localStorage.getItem('watched') || '[]') 
    //localStorage에서 'Watched'배열을 가져와서 파싱하여 할당하거나, 
    // 만약 localStorage 이 없다면 Watched는 빈배열을 기본값으로 사용합니다

    //새로운 요소를 추가합니다
    Watched.push(찾은상품.id)
    //중복된 값을 제거하기 위해 Set 객체를 활용합니다
    const uniqueWatched = Array.from(new Set(Watched))
    //업데이트된 watched 배열을 저장합니다. 저장은 맨 마지막에
    localStorage.setItem('watched', JSON.stringify(uniqueWatched))
    
  },[찾은상품.id])

 
  return(
        // Detail 컴포넌트 로드시 투명도가 0에서 1로 서서히 증가하는 애니메이션을 주려면?
        <div className={'container start' + end2}>
          {
          alert2 === true ?  
          <div className="alert alert-warning" style={{height:'100px' , backgroundColor : '#FBFFB1'}}>
          3초이내 구매시 할인쿠폰!</div> 
          : null
          }
         

        {/*{count}
        <button onClick={()=>{setCount(count+1)}}>버튼</button>*/}
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes"+(Number(id)+1)+".jpg"} width="100%" />
          </div>
          <div className="col-md-6">
          
            {/* input에 숫자말고 다른 거 입력하면 경고창 띄우기*/}
            
            {/*<input onChange={(e)=>{setInput(e.target.value)}}></input>*/}
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}원</p>
            <button onClick={()=>{dispatch(addItem({id : 1, name : 'White and Black', count : 1}))}}className="btn btn-danger">주문하기</button> 
          </div>
        </div>
    {/*동적인 UI 만드는법
    1. html, css 로 디자인 미리 완성해놓고
    2. UI의 현재상태를 저장할 state 하나 만들고
    3. state에 따라 UI가 어떻게 보일지 작성 */}

    {/* 애니메이션 만들고 싶으면
    1. 애니메이션 동작 전 스타일을 담을 className을 만들기
    2. 애니메이션 동작 후 스타일을 담을 className을 만들기
    3. transition 속성도 추가
    4. 원할 때 2번 탈부착 
    end를 처음부터 붙이면 애니메이션 작동 X
    end를 떼었다가 붙여보자 */}
    
    
<Nav variant="tabs"  defaultActiveKey="link0">
    <Nav.Item> {/*버튼0을 클릭하면 내용0이 나오고(선택되고), 내용0에서 클래스네임을 end로 바꿔줌 */}
      <Nav.Link onClick ={()=>{ setTab(0)}} eventKey="link0">버튼0</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick ={()=>{ setTab(1)}} eventKey="link1">버튼1</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick ={()=>{ setTab(2)}} eventKey="link2">버튼2</Nav.Link>
    </Nav.Item>
</Nav>
<TabContent tab ={tab} end={end}/>


      </div>
    )
} 

function TabContent(props){
// return 을 생략하면 undefined가 뜹니다.
// 컴포넌트가 렌더링되는 동안 무언가를 반환해주어야 합니다
if(props.tab === 0){
 return <div className={"start" +props.end}>내용0</div>
}
if(props.tab === 1){
 return <div className={"start" +props.end}>내용1</div>
}
if(props.tab === 2){
 return <div className={"start" +props.end}>내용2</div>
}
}


export default Detail;